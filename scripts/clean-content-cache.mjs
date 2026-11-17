// Borra la caché de contenido de Astro (.astro/data-store.json) antes de `dev` y `build`.
// Motivo: tras cambiar el esquema de src/content.config.ts, el servidor de desarrollo puede
// conservar fichas procesadas con el esquema anterior (sin los campos nuevos ni sus valores
// por defecto). Regenerarla cuesta menos de un segundo con este número de fichas.
import { rmSync } from 'node:fs';

for (const fichero of ['.astro/data-store.json', 'node_modules/.astro/data-store.json']) {
  rmSync(fichero, { force: true });
}
console.log('Caché de contenido limpia.');
