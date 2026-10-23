/* Group-only interactions. Core content and links remain available without JS. */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.g-unit-nav');
  const choices = [...document.querySelectorAll('[data-unit-choice]')];
  const panels = [...document.querySelectorAll('[data-group-panel]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const select = key => {
    choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.unitChoice === key)));
    panels.forEach(panel => { panel.hidden = panel.dataset.groupPanel !== key; });
  };
  if (nav) { nav.hidden = false; select('digital'); }
  choices.forEach(button => button.addEventListener('click', () => select(button.dataset.unitChoice)));
  const scene = document.querySelector('[data-motion-region]');
  const toggle = document.querySelector('[data-motion-toggle]');
  let paused = reduced.matches, visible = true;
  const sync = () => {
    scene?.classList.toggle('motion-stopped', paused || !visible || document.hidden || reduced.matches);
    if (toggle) { toggle.textContent = reduced.matches ? 'Movimiento reducido' : paused ? 'Reanudar movimiento' : 'Pausar movimiento'; toggle.setAttribute('aria-pressed', String(paused || reduced.matches)); toggle.disabled = reduced.matches; }
  };
  if (toggle) { toggle.hidden = false; scene?.classList.add('motion-ready'); toggle.addEventListener('click', () => { paused = !paused; sync(); }); }
  reduced.addEventListener('change', () => { paused = reduced.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  if (scene && 'IntersectionObserver' in window) new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, {threshold:0}).observe(scene);
  sync();
  // Add the approved media paths to config.js when the final film is available.
  const film = document.querySelector('#group-film');
  const media = window.AURHORA_CONFIG?.groupVideo;
  if (film && media?.src) {
    film.src = media.src;
    if (media.poster) film.poster = media.poster;
    if (media.captions) { const track = document.createElement('track'); Object.assign(track, {kind:'captions',label:'Español',srclang:'es',src:media.captions,default:true}); film.append(track); }
    film.hidden = false;
    document.querySelector('.g-film-poster').hidden = true;
    film.addEventListener('play', () => { paused = true; sync(); });
    film.addEventListener('error', () => { film.hidden = true; document.querySelector('.g-film-poster').hidden = false; });
  }
});
