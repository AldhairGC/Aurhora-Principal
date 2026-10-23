const {chromium}=require(process.argv[2]);
const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({channel:'chrome',headless:true});
 const p=await b.newPage({viewport:{width:1440,height:1000}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:3100');await p.waitForLoadState('load');
 for(const id of ['digital','integra','mantenimiento']){await p.locator(`[data-unit-choice="${id}"]`).click();assert.equal(await p.locator('[data-group-panel]:visible').count(),1);assert(await p.locator(`#g-panel-${id}`).isVisible());assert.equal(await p.locator(`[data-unit-choice="${id}"]`).getAttribute('aria-pressed'),'true');}
 await p.locator('[data-unit-choice="digital"]').click();
 const pause=p.locator('[data-motion-toggle]');await pause.click();assert.equal(await pause.getAttribute('aria-pressed'),'true');assert(await p.locator('.g-system').evaluate(e=>e.classList.contains('motion-stopped')));await pause.press('Enter');assert.equal(await pause.getAttribute('aria-pressed'),'false');
 await p.emulateMedia({reducedMotion:'reduce'});await p.waitForFunction(()=>document.querySelector('[data-motion-toggle]').disabled);assert(await pause.isDisabled());assert.equal(await p.locator('.g-node-digital').evaluate(e=>getComputedStyle(e).animationName),'none');
 await p.emulateMedia({reducedMotion:'no-preference'});await p.waitForFunction(()=>!document.querySelector('[data-motion-toggle]').disabled);
 assert(await p.locator('.g-film-poster').isVisible());assert.equal(await p.locator('#group-film').getAttribute('src'),null);
 await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:'prototypes/aurhora-v2/review/group-hero-desktop.png'});
 await p.setViewportSize({width:390,height:844});await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:'prototypes/aurhora-v2/review/group-hero-mobile.png'});
 await p.locator('#presentacion').scrollIntoViewIfNeeded();await p.screenshot({path:'prototypes/aurhora-v2/review/group-film-mobile.png'});
 const nojs=await b.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto('http://127.0.0.1:3100');assert.equal(await nojs.locator('[data-group-panel]:visible').count(),3);assert.equal(await nojs.locator('.g-node-digital').evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
 const file=await b.newPage();await file.goto('file:///D:/Aurhora%20Agency/prototypes/aurhora-v2/index.html');await file.locator('[data-unit-choice="integra"]').click();assert(await file.locator('#g-panel-integra').isVisible());
 assert.deepEqual(errors,[]);console.log('PASS: three units, keyboard pause/resume, reduced motion, honest film fallback, no-JS static content and motion, direct file access, no page errors.');await b.close();
})().catch(e=>{console.error(e);process.exitCode=1});
