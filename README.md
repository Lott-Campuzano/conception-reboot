# conception-reboot

Web de **CONCEPTION** — agencia de diseño gráfico y desarrollo web (mi primer negocio).

Sitio estático: HTML, CSS y JavaScript puro. Sin build, sin frameworks, sin dependencias.

## Inspiración

- [teenage.engineering](https://teenage.engineering/) — retícula plana, etiquetas técnicas en monoespaciado, superficies sin sombras.
- [nike.com/mx](https://www.nike.com/mx/) — display condensado en mayúsculas, cinta (marquee) y energía.
- [frame.work](https://frame.work/) — fichas con tablas de especificaciones y matriz comparativa transparente.

## Estructura

```
index.html   · todo el contenido (portada, trabajo, servicios, proceso,
               comparativa, precios, contacto)
styles.css   · tokens de diseño en :root; el resto del archivo los consume
app.js       · mejoras progresivas: marquee, reveals, nav activa, menú
               móvil, formulario local y año del pie
```

## Decisiones

- Dos fuentes: **Archivo** variable (eje de anchura → display condensado) y **JetBrains Mono** para lo técnico.
- Tema claro/oscuro decidido por el sistema (`prefers-color-scheme`), sin selector.
- Las viñetas de los casos son SVG planos inline: cero imágenes externas.
- Accesible: skip-link, foco visible, `aria-live` en el formulario y `prefers-reduced-motion` respetado.
- El formulario no envía datos aún: sustituye el bloque de demo en `app.js` por tu endpoint.

## Uso

Abre `index.html` en el navegador, o sirve la carpeta:

```sh
python3 -m http.server 8000
```

Licencia CC0-1.0.
