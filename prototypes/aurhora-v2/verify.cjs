/* Local QA: node verify.cjs <path-to-playwright> [output-directory] */
const { chromium } = require(process.argv[2] || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const output = process.argv[3] || path.join(__dirname, 'review');
fs.mkdirSync(output, {recursive:true});
const base = process.env.AURHORA_PREVIEW_URL || 'http://127.0.0.1:3100/';
const pages = ['index.html','mantenimiento.html','digital.html','integra.html','aire-acondicionado.html','electricidad.html','reparaciones.html','contacto.html'];
(async()=>{
 const browser = await chromium.launch({channel:'chrome',headless:true});
 try {
 const errors=[], outside=[], results=[];
 const context = await browser.newContext();
 await context.route('**/*', route => { if(!route.request().url().startsWith(base)){outside.push(route.request().url());return route.abort();}return route.continue(); });
 const page = await context.newPage();
 page.on('pageerror', e=>errors.push(e.message));
 page.on('response', r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const file of pages){
   await page.goto(base+file);await page.evaluate(()=>document.fonts.ready);
   const state = await page.evaluate(()=>({title:document.title,lang:document.documentElement.lang,main:document.querySelectorAll('main').length,h1:document.querySelectorAll('h1').length,scroll:document.documentElement.scrollWidth,width:innerWidth,duplicates:[...document.querySelectorAll('[id]')].map(x=>x.id).filter((id,i,a)=>a.indexOf(id)!==i),badFragments:[...document.querySelectorAll('a[href^="#"]')].filter(a=>a.hash.length<2||!document.getElementById(a.hash.slice(1))).map(a=>a.getAttribute('href')),brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)}));
   results.push({file,width,...state});
   assert.equal(state.main,1,file+' main');assert.equal(state.h1,1,file+' h1');assert.equal(state.lang,'es-MX');assert.ok(state.scroll<=width+1,`${file} at ${width}: overflow ${state.scroll}`);assert.deepEqual(state.duplicates,[]);assert.deepEqual(state.badFragments,[]);assert.deepEqual(state.brokenImages,[]);
   if(width===1440 && ['index.html','mantenimiento.html','integra.html','digital.html'].includes(file)) await page.screenshot({path:path.join(output,file.replace('.html','-desktop.png')),fullPage:true});
   if(width===390 && ['mantenimiento.html','contacto.html'].includes(file)) await page.screenshot({path:path.join(output,file.replace('.html','-mobile.png')),fullPage:true});
  }
 }
 // Validate all local links across generated pages, including cross-page fragments.
 for(const file of pages){
  await page.goto(base+file);
  const links=await page.locator('a').evaluateAll(nodes=>nodes.map(a=>a.getAttribute('href')).filter(Boolean));
  for(const href of links){const url=new URL(href,base+file);if(url.origin!==new URL(base).origin)continue;const response=await page.request.get(url.href);assert.equal(response.status(),200,'Broken link '+file+' -> '+href);if(url.hash){const body=await response.text();assert.ok(body.includes('id="'+url.hash.slice(1)+'"'),'Missing fragment '+href);}}
 }
 await page.setViewportSize({width:390,height:568});await page.goto(base+'mantenimiento.html');
 const menu=page.getByRole('button',{name:/Menú/});await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');assert.equal(await page.evaluate(()=>document.activeElement.className),'menu-toggle');
 await page.goto(base+'integra.html');await page.getByRole('button',{name:'Negocio',exact:true}).click();assert.equal(await page.locator('#space-title').textContent(),'Tecnología que acompaña tu operación.');assert.ok((await page.locator('#space-contact').getAttribute('href')).includes('negocio'));
 await page.goto(base+'aire-acondicionado.html?utm_source=qa&utm_campaign=revision');
 await page.getByRole('link',{name:'Solicitar este servicio'}).click(); await page.waitForLoadState('load');
 assert.equal(await page.locator('#unit').inputValue(),'Mantenimiento');assert.equal(await page.locator('#service').inputValue(),'Aire acondicionado');
 await page.locator('#zone').fill('Naucalpan');await page.locator('#description').fill('Equipo que requiere limpieza.');await page.getByLabel('Tengo una fecha en mente',{exact:true}).check();await page.locator('#date').fill('2099-12-15');await page.locator('#time').selectOption('Mañana');
 await page.evaluate(()=>{window.__outgoing=[];window.open=(...args)=>{window.__outgoing.push(args);return null;};});
 await page.getByRole('button',{name:'Continuar en WhatsApp'}).click();
 const outgoing=await page.evaluate(()=>window.__outgoing);assert.equal(outgoing.length,1);const target=new URL(outgoing[0][0]);assert.equal(target.hostname,'wa.me');assert.equal(target.pathname,'/525582991282');const msg=target.searchParams.get('text');for(const text of ['Aire acondicionado','Naucalpan','2099-12-15','Mañana','utm_source: qa','aire-acondicionado.html','Pendiente de confirmar'])assert.ok(msg.includes(text),'Missing message field '+text);
 await page.getByLabel('Lo antes posible',{exact:true}).check();assert.ok(await page.locator('#date-fields').isHidden());assert.ok(!(await page.locator('#message-preview').textContent()).includes('2099-12-15'));
 await page.locator('#unit').selectOption('Digital');await page.locator('#service').selectOption('GoDigital Suite');assert.equal(await page.locator('#summary-service').textContent(),'GoDigital Suite');
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const plain=await nojs.newPage();await plain.goto(base+'index.html');assert.ok(await plain.locator('h1').isVisible());assert.equal(await plain.locator('h1').evaluate(e=>getComputedStyle(e).opacity),'1');assert.ok(await plain.getByRole('navigation').isVisible());await nojs.close();
 assert.deepEqual(errors,[],'Browser errors');assert.deepEqual(outside,[],'Unexpected external requests');
 const report={status:'passed',pages:pages.length,viewportChecks:results.length,checks:['headings and language','no horizontal overflow','no duplicate IDs','local links and anchors','images loaded','mobile menu and Escape focus','Integra segment','service and campaign handoff','WhatsApp target and message (intercepted, not sent)','date preference excluded when hidden','no-JavaScript content and navigation','no external requests'],results};
 fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({status:report.status,pages:report.pages,viewportChecks:report.viewportChecks,checks:report.checks,output},null,2));
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

