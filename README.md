# Portfolio técnico · Pablo Galván Tejada

Web estática con mis proyectos de ciberseguridad, sistemas, redes y desarrollo. Cada proyecto es un fichero Markdown con una ficha técnica tipada; las páginas de listado, la biblioteca de documentación y el mapa de competencias se generan solos a partir de esas fichas.

## Tecnología

| Pieza | Uso |
|---|---|
| Astro 7 (salida estática) | Framework y generación de páginas |
| TypeScript 6 (`strictest`) | Tipado del código y del esquema de contenido |
| Content Collections + Markdown | Una ficha por proyecto en `src/content/proyectos/` |
| `astro:assets` + sharp | Capturas convertidas a WebP en varios tamaños |
| `@astrojs/sitemap` | `sitemap-index.xml`; `robots.txt` generado |
| CSS nativo con variables | `src/styles/global.css`; modo claro y oscuro automático |

Sin React, Tailwind, base de datos, backend ni scripts de terceros. El único JavaScript es el que abre y cierra el menú en móvil.

## Puesta en marcha

Requiere Node.js 22.23 o superior.

```bash
npm install
npm run dev        # http://localhost:4321
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga |
| `npm run build` | `astro check` (tipos y esquema) + build estático en `dist/` |
| `npm run preview` | Sirve `dist/` en local |
| `npm test` | Tests de coherencia del contenido (`tests/`) |
| `npm run test:links` | Comprueba enlaces y anclas internas del build |
| `npm run test:secrets` | Busca contraseñas, claves y datos personales conocidos en `src/`, `public/` y `dist/` |
| `npm run verify` | Todo lo anterior en orden |

## Estructura

```
src/
  content.config.ts        Esquema de las fichas (qué campos existen y cuáles son obligatorios)
  content/proyectos/*.md   Una ficha por proyecto; el nombre del fichero es la URL
  data/perfil.ts           Datos personales, formación, evaluaciones y tecnologías
  data/taxonomia.ts        Categorías, tipos, estados A–D y competencias
  assets/evidencias/       Capturas saneadas, una carpeta por proyecto
  assets/diagramas/        Diagramas reconstruidos (SVG)
  components/              Cabecera, pie, tarjeta, insignia de estado, figura de evidencia
  layouts/Base.astro       HTML base, SEO, Open Graph y JSON-LD
  pages/                   Inicio, áreas, ficha dinámica, documentación, competencias, formación, sobre mí
public/
  documentos/              PDF saneados (nunca los originales)
  cv/                      CV público (sin teléfono)
scripts/                   Comprobación de enlaces y de secretos
tests/                     Tests de contenido con node:test
docs/                      Guía de mantenimiento
INVENTARIO_EVIDENCIAS.md   Qué documento respalda cada ficha y qué falta
```

## Despliegue en Vercel

`vercel.json` ya define el build, la carpeta `dist` y cabeceras de seguridad (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy).

1. Importa el repositorio en Vercel (framework: Astro).
2. Añade la variable de entorno `SITE_URL` con la URL definitiva (por ejemplo, `https://tu-dominio.com`). Se usa para las URL canónicas y el sitemap.
3. Despliega.

Nada se ha desplegado todavía.

## Mantenimiento

Ver [docs/GUIA_MANTENIMIENTO.md](docs/GUIA_MANTENIMIENTO.md): cómo añadir un proyecto, una evidencia o un PDF, y el procedimiento de saneado.
