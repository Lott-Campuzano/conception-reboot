/* ═══════════════════════════════════════════════════════
   Conception · script
   Solo mejoras: nada esencial depende de aquí. Sin JS el
   sitio muestra la lista de proyectos en el <noscript>.
   - PROYECTOS: el arreglo que genera todas las tarjetas de
     trabajo. Añadir un sitio = añadir un objeto aquí.
   - cinta: duplica la pista para el bucle continuo
   - reveals al hacer scroll
   - subrayado de la sección activa en la navegación
   - menú móvil · formulario local · año del pie
   ═══════════════════════════════════════════════════════ */
(() => {
  'use strict';

  /* ── los proyectos ──────────────────────────────────────
     img: captura en assets/ · si falta o falla, la tarjeta
     muestra un azulejo con la inicial (ver fallback abajo) */
  const PROYECTOS = [
    {
      titulo: 'Conception v1',
      tipo: 'identidad + landing',
      desc: 'La primera versión del estudio: comunidad, productos y equipo.',
      tags: ['landing', 'branding', 'comunidad'],
      url: 'https://conception-v1.vercel.app/',
      img: 'assets/case-conception-v1.jpg',
      color: 'var(--azul)'
    },
    {
      titulo: 'Tiendas Peon',
      tipo: 'e-commerce',
      desc: 'Tienda de material escolar: catálogo, novedades y reseñas.',
      tags: ['e-commerce', 'catálogo', 'redes'],
      url: 'https://tiendaspeon.vercel.app/',
      img: 'assets/case-tiendas-peon.jpg',
      color: 'var(--naranja)'
    },
    {
      titulo: 'Historias Vivas',
      tipo: 'sitio cultural',
      desc: 'Teatro independiente en Tenancingo: temporada, repertorio y boletos.',
      tags: ['web', 'cultura', 'contenido'],
      url: 'https://historias-vivas.vercel.app/',
      img: 'assets/case-historias-vivas.jpg',
      color: 'var(--morado)'
    },
    {
      titulo: 'Galería Campuzano',
      tipo: 'galería digital',
      desc: 'Archivo de 30 obras con selección que cambia en cada visita.',
      tags: ['galería', 'js puro', 'archivo'],
      url: 'https://galeria-campuzano.vercel.app/',
      img: 'assets/case-galeria-campuzano.jpg',
      color: 'var(--celeste)'
    }
  ];

  /* ── plantilla de tarjeta: una sola pieza para todos los casos ── */
  const tarjeta = (p, i) => {
    const n = String(i + 1).padStart(2, '0');
    return `
      <article class="case reveal">
        <a class="case-art" href="${p.url}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">
          <img src="${p.img}" alt="" loading="lazy" width="800" height="600" data-color="${p.color}" data-letra="${p.titulo[0]}">
        </a>
        <div class="case-meta">
          <p class="mono-label">caso ${n} · ${p.tipo}</p>
          <h3>${p.titulo}</h3>
          <p class="case-desc">${p.desc}</p>
          <p class="case-tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</p>
          <a class="case-link mono-label" href="${p.url}" target="_blank" rel="noopener">ver sitio ↗</a>
        </div>
      </article>`;
  };

  /* si la captura no carga, azulejo del color del proyecto con la inicial */
  const alFallar = (img) => {
    const azulejo = document.createElement('span');
    azulejo.className = 'case-fallback';
    azulejo.style.background = img.dataset.color;
    azulejo.textContent = img.dataset.letra;
    img.replaceWith(azulejo);
  };

  const grid = document.querySelector('.work-grid');
  if (grid) {
    grid.innerHTML = PROYECTOS.map(tarjeta).join('');
    grid.querySelectorAll('img').forEach((img) => {
      img.addEventListener('error', () => alFallar(img), { once: true });
    });
  }

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
        return;
      }
      form.reset(); // demo local: aquí iría el POST real
      estado.textContent = 'Recibido. Te respondemos en menos de 24 h.';
    });
  }

  /* ── año del pie ── */
  const anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
