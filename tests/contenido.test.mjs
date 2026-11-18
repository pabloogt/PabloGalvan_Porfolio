// Tests de coherencia del contenido. Se ejecutan con: npm test (node --test, sin dependencias extra).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { parse } from 'yaml';

const DIR = 'src/content/proyectos';
const proyectos = readdirSync(DIR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const src = readFileSync(join(DIR, f), 'utf8');
    const [, fm, ...body] = src.split(/^---$/m);
    return { f, data: parse(fm), body: body.join('---') };
  });

test('hay proyectos en las dos áreas', () => {
  assert.ok(proyectos.some((p) => p.data.area === 'ciberseguridad'));
  assert.ok(proyectos.some((p) => p.data.area === 'desarrollo'));
});

test('los proyectos prioritarios existen y están destacados', () => {
  const prioritarios = ['webtrustscan', 'piscinas-fama', 'termlifepicks', 'pill-express', 'siem-elk-snort', 'snort-dmz', 'snort-deteccion-nmap', 'wazuh-suricata-pfsense', 'auditoria-wifi'];
  for (const id of prioritarios) {
    const p = proyectos.find((x) => x.f === `${id}.md`);
    assert.ok(p, `falta ${id}`);
    assert.equal(p.data.destacado, true, `${id} debería estar destacado`);
  }
});

test('no queda contenido de la financiación de Cüimo', () => {
  assert.ok(!proyectos.some((p) => /cuimo|cüimo/i.test(p.f)), 'existe una ficha de Cüimo');
  for (const p of proyectos) {
    assert.ok(!/financiaci[oó]n/i.test(JSON.stringify(p.data) + p.body), `${p.f} menciona la financiación`);
    assert.ok(!/cuimo\.com/i.test(JSON.stringify(p.data) + p.body), `${p.f} enlaza a cuimo.com`);
  }
  if (existsSync('dist')) {
    assert.ok(!existsSync('dist/proyectos/cuimo-financiacion'), 'la ruta antigua sigue generándose');
  }
});

test('los proyectos con web pública indican mi papel y tienen portada o cifras', () => {
  for (const p of proyectos.filter((x) => x.data.web)) {
    assert.ok(p.data.rol, `${p.f}: falta indicar mi papel`);
    assert.ok(p.data.portada || (p.data.cifras ?? []).length > 0, `${p.f}: necesita portada o cifras para la tarjeta`);
  }
  // Toda portada debe existir y llevar texto alternativo.
  for (const p of proyectos.filter((x) => x.data.portada)) {
    assert.ok(p.data.portadaAlt, `${p.f}: falta el texto alternativo de la portada`);
    assert.ok(existsSync(resolve(dirname(join(DIR, p.f)), p.data.portada)), `${p.f}: no existe la portada`);
  }
});

test('se distinguen proyectos profesionales, personales y académicos', () => {
  const tipos = new Set(proyectos.filter((p) => p.data.area === 'desarrollo').map((p) => p.data.tipo));
  for (const t of ['profesional', 'personal', 'academico']) assert.ok(tipos.has(t), `no hay proyectos de tipo ${t}`);
});

test('todas las imágenes de evidencia existen', () => {
  for (const p of proyectos) {
    for (const e of p.data.evidencias ?? []) {
      const ruta = resolve(dirname(join(DIR, p.f)), e.imagen);
      assert.ok(existsSync(ruta), `${p.f}: no existe ${e.imagen}`);
      assert.ok(e.alt && e.alt.length > 15, `${p.f}: texto alternativo insuficiente en ${e.imagen}`);
    }
  }
});

test('todos los documentos enlazados existen en public/', () => {
  for (const p of proyectos) {
    for (const d of p.data.documentos ?? []) {
      if (d.href.startsWith('/')) assert.ok(existsSync(join('public', d.href)), `${p.f}: no existe ${d.href}`);
    }
  }
});

test('no quedan fichas en categoría D y todas usan A, B o C', () => {
  for (const p of proyectos) assert.ok(['A', 'B', 'C'].includes(p.data.estado), `${p.f}: estado ${p.data.estado}`);
});

test('las fichas antes pendientes se documentan como C o se han eliminado', () => {
  for (const id of ['android-jadx-mobsf', 'dns-cdn-cloudflare']) {
    const p = proyectos.find((x) => x.f === `${id}.md`);
    assert.ok(p, `falta ${id}`);
    assert.equal(p.data.estado, 'C');
    assert.ok((p.data.enlaces ?? []).length > 0, `${id}: debe citar las fuentes públicas usadas`);
    assert.equal((p.data.pendiente ?? []).length, 0, `${id}: no debe mostrar pendientes`);
  }
  assert.ok(!proyectos.some((p) => p.f === 'simulador-bancario-cobol.md'), 'el simulador COBOL no se pudo documentar y debía eliminarse');
});

test('las fichas A y B no publican «Falta por recuperar»', () => {
  const ficha = readFileSync('src/pages/proyectos/[...slug].astro', 'utf8');
  assert.match(ficha, /d\.estado === 'C' \? d\.pendiente : \[\]/);
  if (existsSync('dist')) {
    for (const p of proyectos.filter((x) => x.data.estado !== 'C')) {
      const html = readFileSync(`dist/proyectos/${p.f.replace(/\.md$/, '')}/index.html`, 'utf8');
      assert.ok(!/Falta por recuperar|Ficha incompleta/.test(html), `${p.f} muestra el aviso de pendientes`);
    }
    const doc = readFileSync('dist/documentacion/index.html', 'utf8');
    for (const p of proyectos.filter((x) => x.data.estado !== 'C')) {
      assert.ok(!(p.data.pendiente ?? []).some((x) => doc.includes(x)), `${p.f}: sus pendientes aparecen en Documentación`);
    }
  }
});

test('las fichas con evidencia parcial (B) explican sus límites', () => {
  for (const p of proyectos.filter((x) => x.data.estado === 'B')) {
    assert.ok((p.data.limitaciones ?? []).length > 0 || (p.data.pendiente ?? []).length > 0, `${p.f}: falta indicar límites o pendientes`);
  }
});

test('las herramientas estudiadas no se presentan también como usadas', () => {
  for (const p of proyectos) {
    const usadas = new Set(p.data.herramientas ?? []);
    for (const h of p.data.herramientasEstudiadas ?? []) assert.ok(!usadas.has(h), `${p.f}: ${h} aparece como usada y estudiada`);
  }
});

test('los originales no están dentro de la carpeta pública', () => {
  const nombresOriginales = /galvan|tarea|Galván/i;
  for (const f of readdirSync('public/documentos')) assert.ok(!nombresOriginales.test(f), `public/documentos/${f} parece un original sin sanear`);
});
