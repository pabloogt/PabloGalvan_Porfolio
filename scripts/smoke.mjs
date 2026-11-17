// Prueba de humo contra un servidor en marcha (dev o preview): las páginas clave deben
// responder 200 y no contener un error de renderizado.
// Uso: npm run smoke            → http://localhost:4321
//      npm run smoke -- http://localhost:4322
const base = (process.argv[2] ?? 'http://localhost:4321').replace(/\/$/, '');
const rutas = ['/', '/proyectos/', '/ciberseguridad/', '/experiencia/', '/sobre-mi/', '/contacto/', '/formacion/', '/competencias/', '/documentacion/', '/proyectos/webtrustscan/', '/proyectos/piscinas-fama/', '/proyectos/termlifepicks/', '/proyectos/pill-express/', '/proyectos/tcg-radar/', '/proyectos/siem-elk-snort/'];
const errores = /TypeError|Cannot read properties|ReferenceError|An error occurred|astro-error-overlay|vite-error-overlay/i;

let fallos = 0;
for (const ruta of rutas) {
  try {
    const res = await fetch(base + ruta);
    const html = await res.text();
    const mal = res.status !== 200 || errores.test(html) || !/<h1[\s>]/.test(html);
    if (mal) fallos++;
    console.log(`${mal ? '✗' : '✓'} ${res.status} ${ruta}${mal ? '  ' + (html.match(errores)?.[0] ?? 'sin <h1>') : ''}`);
  } catch (e) {
    fallos++;
    console.log(`✗ --- ${ruta}  ${e.message}`);
  }
}
if (fallos) {
  console.error(`\n${fallos} página(s) con problemas en ${base}`);
  process.exit(1);
}
console.log(`\nLas ${rutas.length} páginas responden correctamente en ${base}`);
