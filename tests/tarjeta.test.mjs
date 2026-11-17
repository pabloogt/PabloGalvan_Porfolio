// Regresión del error «Cannot read properties of undefined (reading 'map')» en ProjectFeature.astro.
// Prueba la lógica que decide qué pinta una tarjeta con cualquier combinación de datos opcionales,
// y que las fichas reales que salen en Inicio y Proyectos tienen lo que la tarjeta necesita.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { CAMPOS_LISTA, iniciales, lista, medioTarjeta, nombreCorto, normalizar } from '../src/lib/tarjeta.ts';

const DIR = 'src/content/proyectos';
const fichas = readdirSync(DIR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ id: f.replace(/\.md$/, ''), data: parse(readFileSync(join(DIR, f), 'utf8').split(/^---$/m)[1]) }));

// --- Escenarios de la tarjeta ---------------------------------------------------------------

test('proyecto con portada: se muestra la portada, haya o no cifras', () => {
  assert.equal(medioTarjeta({ portada: { src: '/x.png' }, cifras: [] }), 'portada');
  assert.equal(medioTarjeta({ portada: { src: '/x.png' }, cifras: [{ valor: '1', etiqueta: 'a' }] }), 'portada');
  assert.equal(medioTarjeta({ portada: { src: '/x.png' } }), 'portada');
});

test('proyecto sin portada y con cifras: se muestran las cifras', () => {
  assert.equal(medioTarjeta({ cifras: [{ valor: '24', etiqueta: 'controles' }] }), 'cifras');
});

test('proyecto sin portada ni cifras: se muestra el emblema, nunca cifras inventadas', () => {
  assert.equal(medioTarjeta({}), 'emblema');
  assert.equal(medioTarjeta({ cifras: [] }), 'emblema');
  assert.equal(medioTarjeta({ cifras: undefined }), 'emblema');
  assert.equal(medioTarjeta({ portada: undefined, cifras: null }), 'emblema');
});

test('proyecto sin herramientas: la lista queda vacía y no falla', () => {
  assert.deepEqual(lista(undefined), []);
  assert.deepEqual(lista(null), []);
  assert.deepEqual(lista('no es una lista'), []);
  assert.doesNotThrow(() => lista(undefined).slice(0, 6).map((h) => h));
  assert.deepEqual(lista(['React']), ['React']);
});

test('una ficha de la caché con un esquema anterior (sin listas) se normaliza sin inventar datos', () => {
  // Así llegaban las fichas al componente cuando se produjo el error: sin `cifras`.
  const antigua = { titulo: 'WebTrustScan — análisis', herramientas: ['Next.js'], rol: 'Proyecto propio' };
  const n = normalizar(antigua);
  for (const campo of CAMPOS_LISTA) assert.ok(Array.isArray(n[campo]), `${campo} debería ser una lista`);
  assert.deepEqual(n.cifras, []);
  assert.deepEqual(n.herramientas, ['Next.js']);
  assert.equal(n.titulo, antigua.titulo);
  assert.equal(n.rol, antigua.rol);
  assert.equal(antigua.cifras, undefined, 'no debe modificar el objeto original');
  assert.doesNotThrow(() => n.cifras.map((c) => c.valor));
});

test('el emblema usa solo el nombre del proyecto', () => {
  assert.equal(nombreCorto('TCG Radar — monitor privado de productos'), 'TCG Radar');
  assert.equal(nombreCorto('Simulador de operaciones bancarias en COBOL'), 'Simulador de operaciones bancarias en COBOL');
  assert.equal(iniciales('TCG Radar — monitor privado'), 'TR');
  assert.equal(iniciales('WebTrustScan — análisis externo'), 'WT');
  assert.equal(iniciales('Papelo'), 'PA');
});

// --- Fichas reales -------------------------------------------------------------------------

test('todas las fichas se pueden pintar como tarjeta, tengan los campos que tengan', () => {
  for (const f of fichas) {
    const d = normalizar(f.data);
    assert.ok(['portada', 'cifras', 'emblema'].includes(medioTarjeta(d)), f.id);
    assert.doesNotThrow(() => d.cifras.map((c) => c.valor + c.etiqueta), `${f.id}: cifras`);
    assert.doesNotThrow(() => d.herramientas.slice(0, 6).map((h) => h), `${f.id}: herramientas`);
    for (const c of d.cifras) assert.ok(c.valor && c.etiqueta, `${f.id}: cifra incompleta`);
  }
});

test('las tarjetas destacadas de Inicio y Proyectos tienen el medio esperado', () => {
  const destacados = fichas.filter((f) => f.data.area === 'desarrollo' && f.data.destacado);
  assert.ok(destacados.length >= 4, 'debería haber al menos cuatro proyectos destacados');
  const medios = Object.fromEntries(destacados.map((f) => [f.id, medioTarjeta(normalizar(f.data))]));
  assert.equal(medios['webtrustscan'], 'cifras');
  assert.equal(medios['pill-express'], 'cifras');
  assert.equal(medios['piscinas-fama'], 'portada');
  assert.equal(medios['termlifepicks'], 'portada');
});

test('existen fichas reales para cada escenario (portada, cifras, ni una ni otra)', () => {
  const medios = new Set(fichas.map((f) => medioTarjeta(normalizar(f.data))));
  for (const m of ['portada', 'cifras', 'emblema']) assert.ok(medios.has(m), `ninguna ficha cubre el escenario «${m}»`);
});

// --- Resultado del build ------------------------------------------------------------------

test('el build contiene Inicio y Proyectos con todas sus tarjetas', { skip: !existsSync('dist') && 'ejecuta antes npm run build' }, () => {
  const inicio = readFileSync('dist/index.html', 'utf8');
  const proyectos = readFileSync('dist/proyectos/index.html', 'utf8');
  for (const [nombre, html] of [['Inicio', inicio], ['Proyectos', proyectos]]) {
    assert.ok(!/TypeError|Cannot read properties|>undefined</.test(html), `${nombre} contiene un error de renderizado`);
    for (const f of fichas.filter((x) => x.data.area === 'desarrollo' && x.data.destacado)) {
      assert.ok(html.includes(`/proyectos/${f.id}/`), `${nombre} no enlaza a ${f.id}`);
    }
    assert.ok(html.includes('class="figures'), `${nombre} no pinta las cifras`);
    assert.ok(html.includes('324'), `${nombre} no muestra las cifras de WebTrustScan`);
  }
  // Proyectos lista también los no destacados (filas), con o sin herramientas.
  for (const f of fichas.filter((x) => x.data.area === 'desarrollo')) assert.ok(proyectos.includes(`/proyectos/${f.id}/`), `Proyectos no enlaza a ${f.id}`);
});
