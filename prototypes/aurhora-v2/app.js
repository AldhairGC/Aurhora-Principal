/* Progressive enhancement only: all pages and primary navigation are static HTML. */
(() => {
  const $ = (s) => document.querySelector(s);
  const menu = $('.menu-toggle');
  const nav = $('#site-nav');
  document.documentElement.classList.add('js');
  function closeMenu(restore = false) { menu?.setAttribute('aria-expanded', 'false'); nav?.classList.remove('open'); if (restore) menu?.focus(); }
  menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav?.classList.contains('open')) closeMenu(true); });
  document.addEventListener('click', e => { if (nav?.classList.contains('open') && !e.target.closest('.site-header')) closeMenu(); });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu()));
  matchMedia('(min-width: 801px)').addEventListener('change', () => closeMenu());
  // Preserve a bounded campaign context across local pages; never store form data.
  const params = new URLSearchParams(location.search);
  const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  let campaign = {};
  try { campaign = JSON.parse(sessionStorage.getItem('aurhora_campaign') || '{}'); } catch {}
  if (!campaign || typeof campaign !== 'object' || Array.isArray(campaign)) campaign = {};
  if (campaignKeys.some(k => params.has(k))) {
    campaign = {};
    campaignKeys.forEach(k => { if (params.has(k)) campaign[k] = params.get(k).slice(0, 120); });
    campaign.entrada = location.pathname.split('/').pop() || 'index.html';
    try { sessionStorage.setItem('aurhora_campaign', JSON.stringify(campaign)); } catch {}
  }
  document.querySelectorAll('a[href*="contacto.html"]').forEach(a => {
    const url = new URL(a.getAttribute('href'), location.href);
    if (location.pathname.endsWith('contacto.html')) return;
    url.searchParams.set('origen', location.pathname.split('/').pop() || 'index.html');
    for (const key of campaignKeys) if (typeof campaign[key] === 'string') url.searchParams.set(key, campaign[key]);
    a.setAttribute('href', 'contacto.html' + url.search);
  });
  const spaces = {
    residencia: { eyebrow: 'TU CASA, MEJOR CONECTADA', title: 'Tranquilidad que puedes controlar.', description: 'Consulta tus cámaras, mejora la conexión y simplifica los accesos de tu residencia con una solución pensada para tu día a día.', items: ['Cámaras y accesos', 'WiFi para tus espacios', 'Audio e iluminación'] },
    negocio: { eyebrow: 'TU NEGOCIO, MEJOR CONECTADO', title: 'Tecnología que acompaña tu operación.', description: 'Conecta tu local, supervisa sus accesos y crea la experiencia que quieres ofrecer. Evaluamos la instalación según tu actividad y tu espacio.', items: ['Seguridad y control de acceso', 'Red para tu operación', 'Audio y video para tu local'] }
  };
  document.querySelectorAll('[data-space]').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.space, data = spaces[key];
    document.querySelectorAll('[data-space]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    $('#space-eyebrow').textContent = data.eyebrow; $('#space-title').textContent = data.title; $('#space-description').textContent = data.description;
    $('#space-list').replaceChildren(...data.items.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
    const url = new URL($('#space-contact').href); url.searchParams.set('servicio', 'Solución para ' + key); $('#space-contact').href = url.href;
  }));
  const form = $('#request-form');
  if (!form) return;
  const unit = $('#unit'), service = $('#service');
  const catalog = {
    'Por definir': ['Necesito orientación'],
    Mantenimiento: ['Aire acondicionado', 'Electricidad', 'Instalaciones y reparaciones', 'Pintura', 'Plomería', 'Tablaroca', 'Impermeabilización', 'Otro servicio'],
    Integra: ['Seguridad y accesos', 'Redes y conectividad', 'Audio, video y control', 'Solución para residencia', 'Solución para negocio', 'Otro proyecto'],
    Digital: ['Desarrollo de software', 'Automatización e IA', 'Consultoría', 'Marketing', 'GoDigital Suite', 'Otro proyecto']
  };
  const initialUnit = Object.keys(catalog).find(k => k.toLowerCase() === (params.get('unidad') || '').toLowerCase());
  if (initialUnit) unit.value = initialUnit;
  function populate(selected) {
    service.replaceChildren(...catalog[unit.value].map(text => new Option(text, text)));
    if (catalog[unit.value].includes(selected)) service.value = selected;
  }
  populate(params.get('servicio'));
  const localDateParts = new Intl.DateTimeFormat('en-CA', {timeZone: window.AURHORA_CONFIG.timeZone, year:'numeric', month:'2-digit', day:'2-digit'}).formatToParts(new Date());
  const datePart = kind => localDateParts.find(p => p.type === kind).value;
  $('#date').min = `${datePart('year')}-${datePart('month')}-${datePart('day')}`;
  function message() {
    const data = new FormData(form);
    const lines = ['Hola, Aurhora. Me gustaría solicitar atención.', '', 'Unidad: ' + unit.value, 'Servicio: ' + service.value];
    if (data.get('espacio')) lines.push('Espacio: ' + data.get('espacio'));
    if (data.get('zona')?.trim()) lines.push('Zona: ' + data.get('zona').trim());
    if (data.get('detalle')?.trim()) lines.push('Necesidad: ' + data.get('detalle').trim());
    lines.push('Preferencia: ' + data.get('prioridad'));
    if (data.get('prioridad') === 'Tengo una fecha en mente') {
      if (data.get('fecha')) lines.push('Día solicitado: ' + data.get('fecha'));
      lines.push('Horario solicitado: ' + data.get('horario'));
      lines.push('(Pendiente de confirmar disponibilidad y cita.)');
    }
    const origin = (params.get('origen') || '').replace(/[^a-z0-9._-]/gi, '').slice(0, 80);
    if (origin) lines.push('', 'Página de origen: ' + origin);
    const attribution = campaignKeys.filter(k => typeof campaign[k] === 'string').map(k => k + ': ' + campaign[k]);
    if (attribution.length) lines.push('Referencia de campaña: ' + attribution.join(' / '));
    return lines.join('\n');
  }
  function update() {
    const requestedDate = form.elements.prioridad.value === 'Tengo una fecha en mente';
    $('#date-fields').hidden = !requestedDate;
    $('#date').disabled = !requestedDate; $('#time').disabled = !requestedDate;
    $('#summary-unit').textContent = unit.value; $('#summary-service').textContent = service.value;
    $('#summary-when').textContent = form.elements.prioridad.value + (requestedDate && $('#date').value ? ' · ' + $('#date').value : '');
    $('#message-preview').textContent = message(); $('#copy-status').textContent = '';
  }
  unit.addEventListener('change', () => { populate(); update(); });
  form.addEventListener('input', update); form.addEventListener('change', update); update(); document.querySelector('.submit-request').disabled = false; document.querySelector('#copy-request').disabled = false;
  form.addEventListener('submit', e => { e.preventDefault(); if (!form.reportValidity()) return; const number = window.AURHORA_CONFIG.whatsappNumber; window.open('https://wa.me/' + number + '?text=' + encodeURIComponent(message()), '_blank', 'noopener,noreferrer'); });
  $('#copy-request').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(message()); $('#copy-status').textContent = 'Solicitud copiada.'; }
    catch { $('.message-preview').open = true; const selection = getSelection(); const range = document.createRange(); range.selectNodeContents($('#message-preview')); selection.removeAllRanges(); selection.addRange(range); $('#copy-status').textContent = 'Seleccionamos el mensaje para que puedas copiarlo.'; }
  });
})();

