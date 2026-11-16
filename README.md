# conception-reboot

Web de **Conception** — diseño gráfico y desarrollo web (mi primer negocio).

Filosofía: *aseguramos la experiencia de quien interactúa desde el hardware hasta el software*.

Sitio estático: HTML, CSS y JavaScript puro. Sin build, sin frameworks, sin dependencias.

## Identidad

Estética Nothing / teenage.engineering: tipografía dot-matrix (**Doto**) para el
display, **JetBrains Mono** para lo técnico, base crema + tinta y cuatro acentos
neón funcionales (cian, naranja, magenta, verde). Cada sección lleva su color
con `data-accent`; el texto que va sobre neón siempre es tinta (`--on-neon`).
El tema claro/oscuro lo decide el sistema (`prefers-color-scheme`).

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
  img: 'assets/case-nombre.jpg',   // captura 4:3; si falta, azulejo con la inicial
  color: 'var(--cyan)'             // color del azulejo de respaldo
}
```

La tarjeta se genera sola: plantilla única, sin tocar el HTML.

## Decisiones

- Sin JS el sitio sigue siendo usable: `<noscript>` lista los proyectos.
- Accesible: skip-link, foco visible, `aria-live` en el formulario,
  `prefers-reduced-motion` respetado y contraste AA verificado con Lighthouse.
- Fondo de portada animado con CSS puro (nieblas neón + banda de luz).
- El formulario no envía datos aún: sustituye el bloque de demo en `app.js`.

## Uso

```sh
python3 -m http.server 8000
```

Licencia CC0-1.0.
