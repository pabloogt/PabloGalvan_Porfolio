// Comprueba que todos los enlaces y recursos internos del build existen.
// Uso: npm run build && npm run test:links
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
if (!existsSync(DIST)) {
  console.error('No existe dist/. Ejecuta primero npm run build.');
  process.exit(1);
}

const html = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) html.push(p);
  }
})(DIST);

const roto = [];
const externos = new Set();
for (const file of html) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/\s(?:href|src|srcset)="([^"]+)"/g)) {
    for (const raw of m[1].split(',').map((s) => s.trim().split(/\s+/)[0])) {
      if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('data:')) continue;
      if (/^https?:\/\//.test(raw)) { if (!raw.includes('.vercel.app')) externos.add(raw); continue; }
      const [path, hash] = raw.split('#');
      let target = join(DIST, decodeURI(path));
      if (path.endsWith('/')) target = join(target, 'index.html');
      if (!existsSync(target)) { roto.push(`${relative(DIST, file)} → ${raw}`); continue; }
      // Anclas dentro de otra página
      if (hash && target.endsWith('.html')) {
        const dest = readFileSync(target, 'utf8');
        if (!dest.includes(`id="${hash}"`)) roto.push(`${relative(DIST, file)} → ${raw} (ancla inexistente)`);
      }
    }
  }
  // Anclas en la propia página
  for (const m of src.matchAll(/href="#([^"]+)"/g)) {
    if (m[1] !== 'contenido' && !src.includes(`id="${m[1]}"`)) roto.push(`${relative(DIST, file)} → #${m[1]} (ancla inexistente)`);
  }
}

console.log(`Páginas revisadas: ${html.length}`);
console.log(`Enlaces externos (no comprobados automáticamente): ${externos.size}`);
for (const e of [...externos].sort()) console.log(`  · ${e}`);
if (roto.length) {
  console.error(`\n${roto.length} enlace(s) interno(s) roto(s):`);
  for (const r of roto) console.error(`  ✗ ${r}`);
  process.exit(1);
}
console.log('\nTodos los enlaces internos funcionan.');
