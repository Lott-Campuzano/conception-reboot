/* ═══════════════════════════════════════════════════════
   CONCEPTION · script
   Solo mejoras: nada esencial depende de aquí. El sitio es
   legible y navegable sin JavaScript.
   - cinta: duplica la pista para el bucle continuo
   - reveals al hacer scroll (IntersectionObserver)
   - subrayado de la sección activa en la navegación
   - menú móvil
   - formulario: validación y confirmación local
   - año del pie
   ═══════════════════════════════════════════════════════ */
(() => {
  'use strict';

  /* ── cinta: la pista se duplica para que el marquee nunca se acabe ── */
  const track = document.querySelector('.ticker-track');
  if (track) track.innerHTML += track.innerHTML; // translateX(-50%) encaja exacto

  /* ── reveals: cada .reveal entra cuando entra en pantalla ── */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target); // entra una sola vez
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ── navegación activa: resalta la sección visible ── */
  const links = [...document.querySelectorAll('.nav a')];
  const secciones = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window && secciones.length) {
    const ioNav = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) =>
          a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    secciones.forEach((s) => ioNav.observe(s));
  }

  /* ── menú móvil: abrir/cerrar y cerrar al elegir ── */
  const btn = document.querySelector('.menu-btn');
  const panel = document.querySelector('.mobile-nav');
  if (btn && panel) {
    const set = (abierto) => {
      panel.hidden = !abierto;
      btn.setAttribute('aria-expanded', String(abierto));
      btn.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    };
    btn.addEventListener('click', () => set(panel.hidden));
    panel.addEventListener('click', (e) => { if (e.target.matches('a')) set(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  }

  /* ── formulario: valida y confirma en el sitio (sin backend) ──
     Sustituye el envío real por tu endpoint o servicio de correo. */
  const form = document.querySelector('.contact-form');
  if (form) {
    const estado = form.querySelector('.form-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        estado.textContent = 'Revisa los campos marcados.';
        estado.classList.remove('ok');
        return;
      }
      // demo local: confirma y limpia. Aquí iría el POST real.
      form.reset();
      estado.textContent = '✔ Recibido. Te respondemos en menos de 24 h.';
      estado.classList.add('ok');
    });
  }

  /* ── año del pie ── */
  const anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
