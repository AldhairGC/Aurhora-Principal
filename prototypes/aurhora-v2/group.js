/* Group v3: progressive enhancement, manual exploration, shared motion control. */
document.addEventListener('DOMContentLoaded',()=>{
 const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
 const choices=all('[data-unit-choice]'),panels=all('[data-group-panel]'),infos=all('[data-unit-info]');
 function selectUnit(id){choices.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.unitChoice===id)));panels.forEach(p=>p.hidden=p.dataset.groupPanel!==id);infos.forEach(p=>p.hidden=p.dataset.unitInfo!==id);$('.a-scene-index').textContent=String(choices.findIndex(b=>b.dataset.unitChoice===id)+1).padStart(2,'0')+' / 03';}
 $('.a-unit-nav').hidden=false;selectUnit('digital');
 choices.forEach(b=>b.addEventListener('click',()=>selectUnit(b.dataset.unitChoice)));
 all('[data-rail-unit]').forEach(a=>a.addEventListener('click',()=>selectUnit(a.dataset.railUnit)));
 const journey=[
  ['01 / PREPARAR','Todo listo para abrir.','Electricidad, climatización e instalaciones para empezar con un espacio que funciona.','Mantenimiento','mantenimiento.html'],
  ['02 / CONECTAR','Tecnología que cuida tu espacio.','Cámaras, red y accesos conectados. Una infraestructura pensada para la forma en que trabajas.','Integra','integra.html'],
  ['03 / HACER CRECER','Más tiempo para tu negocio.','Pedidos, seguimiento y automatizaciones que conectan tu operación y liberan a tu equipo de tareas repetitivas.','Digital','digital.html']
 ];
 $('.a-journey-controls').hidden=false;
 all('[data-journey]').forEach(b=>b.addEventListener('click',()=>{const i=Number(b.dataset.journey),d=journey[i];all('[data-journey]').forEach(v=>v.setAttribute('aria-pressed',String(v===b)));$('#journey-label').textContent=d[0];$('#journey-title').textContent=d[1];$('#journey-copy').textContent=d[2];const link=$('#journey-link');link.firstChild.textContent='Conoce '+d[3]+' ';link.href=d[4];$('.a-journey-visual').dataset.journeyPhase=String(i);}));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),button=$('[data-motion-toggle]');let paused=false,heroVisible=true,sceneVisible=false;
 const sculpture=window.AurhoraSculpture?new window.AurhoraSculpture($('#aurhora-sculpture')):null;
 const sync=()=>{const off=paused||reduced.matches||document.hidden;sculpture?.setRunning(!off&&heroVisible);document.body.classList.toggle('a-motion-active',!off&&sceneVisible);button.setAttribute('aria-pressed',String(paused||reduced.matches));button.querySelector('[data-motion-label]').textContent=reduced.matches?'Movimiento reducido':paused?'Reanudar animación':'Pausar animación';button.disabled=reduced.matches;button.firstElementChild.textContent=paused?'▷':'Ⅱ';};
 button.hidden=false;button.addEventListener('click',()=>{paused=!paused;sync()});reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
 if('IntersectionObserver'in window){new IntersectionObserver(([e])=>{heroVisible=e.isIntersecting;sync()},{threshold:0}).observe($('.a-hero'));new IntersectionObserver(([e])=>{sceneVisible=e.isIntersecting;sync()},{threshold:.1}).observe($('.a-explorer-scenes'));}else sceneVisible=true;
 sync();
 const film=$('#group-film'),media=window.AURHORA_CONFIG?.groupVideo;
 if(media?.src){film.src=media.src;if(media.poster)film.poster=media.poster;if(media.captions){const track=document.createElement('track');Object.assign(track,{kind:'captions',label:'Español',srclang:'es',src:media.captions,default:true});film.append(track);}film.hidden=false;$('.a-film-poster').hidden=true;film.addEventListener('play',()=>{paused=true;sync()});film.addEventListener('error',()=>{film.hidden=true;$('.a-film-poster').hidden=false;});}
});
