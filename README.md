# conception-reboot

Web de **Conception** — diseño gráfico y desarrollo web (mi primer negocio).

Filosofía: *aseguramos la experiencia de quien interactúa desde el hardware hasta el software*.

Sitio estático: HTML, CSS y JavaScript puro. Sin build, sin frameworks, sin dependencias.

## Lenguaje de diseño: "Minimalismo analógico"

Elementos ya existentes de UI/UX con toques retro futuristas, tomando del
minimalismo, Bauhaus, De Stijl, el constructivismo y el pop art.

- **Tipografía única:** JetBrains Mono, de fina a extra negrita
  (opcionales del lenguaje: Fira Code, Montserrat, Poppins).
- **Geometría:** rectángulos de radio amplio (24 px), círculos y cápsulas.
- **Paleta:** blanco, negro, azul `#1e9bf0`, celeste `#5bc2f4`,
  naranja `#f97316`, morado `#a855f7` y grises — igual en modo
  claro y modo oscuro; el tema lo decide el sistema.
- **Recursos del lenguaje:** IconScout / EOS Icons, Unsplash / Freepik.

## Estructura

```
index.html   · todo el contenido (portada, trabajo, servicios, proceso,
               comparativa, precios, contacto)
styles.css   · tokens de diseño en :root; el resto del archivo los consume
app.js       · PROYECTOS (arreglo que genera las tarjetas de trabajo),
               reveals, menú móvil, ticker y formulario
assets/      · capturas de pantalla de los proyectos
```

## Añadir un proyecto nuevo

Añade un objeto al arreglo `PROYECTOS` en `app.js`:

```js
{
  titulo: 'Nombre del proyecto',
  tipo: 'e-commerce',
  desc: 'Una frase que diga qué es.',
  tags: ['e-commerce', 'web'],
  url: 'https://…',
  img: 'assets/case-nombre.jpg',   // captura 16:10; si falta, círculo con la inicial
  color: 'var(--azul)'             // color del respaldo
}
```

La tarjeta se genera sola: plantilla única, sin tocar el HTML.

## Decisiones

- Sin JS el sitio sigue siendo usable: `<noscript>` lista los proyectos.
- Accesible: skip-link, foco visible, `aria-live` en el formulario,
  `prefers-reduced-motion` respetado y contraste AA verificado con Lighthouse.
- Fondo de portada animado con CSS puro (nieblas de acento + banda de luz).
- El formulario no envía datos aún: sustituye el bloque de demo en `app.js`.

## Uso

```sh
python3 -m http.server 8000
```

Licencia CC0-1.0. Hecho por Lott Campuzano.
