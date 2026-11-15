// Busca en el contenido publicable (src/ y public/, y dist/ si existe) datos que no deben publicarse.
// Revisa texto, Markdown y el texto extraíble de los PDF de public/.
// Añade patrones en BLOQUEADOS si recuperas nuevos documentos con secretos conocidos.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { inflateSync } from 'node:zlib';
import { execFileSync } from 'node:child_process';

const BLOQUEADOS = [
  { nombre: 'Contraseña del dashboard de Wazuh', re: /oxA\?Ih/ },
  { nombre: 'Clave precompartida de la VPN', re: /ACME123/ },
  { nombre: 'Frase de paso de la práctica GPG', re: /PokemonTCG/i },
  { nombre: 'Teléfono personal', re: /627\s?492\s?704/ },
  { nombre: 'Clave de Google API', re: /AIza[0-9A-Za-z_-]{30,}/ },
  { nombre: 'Clave privada', re: /-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----/ },
  { nombre: 'Token tipo GitHub', re: /gh[pousr]_[A-Za-z0-9]{30,}/ },
  { nombre: 'Línea de contraseña', re: /Password:\s*\S{6,}/ },
];

const raices = ['src', 'public', ...(existsSync('dist') ? ['dist'] : [])];
const ficheros = [];
(function walk(dirs) {
  for (const d of dirs) {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) walk([p]);
      else if (/\.(md|mdx|astro|ts|mjs|js|css|html|txt|xml|svg|json|pdf)$/.test(p)) ficheros.push(p);
    }
  }
})(raices);

let avisoPdf = false;
/** Texto de un PDF: usa pdftotext (poppler) si está instalado; si no, una aproximación con los streams Flate. */
function textoPdf(ruta, buf) {
  try {
    return execFileSync('pdftotext', ['-q', ruta, '-'], { encoding: 'latin1', maxBuffer: 64 * 1024 * 1024 });
  } catch {
    avisoPdf = true;
  }
  let out = buf.toString('latin1');
  const s = buf.toString('latin1');
  let i = 0;
  while ((i = s.indexOf('stream', i)) !== -1) {
    const start = s.indexOf('\n', i) + 1;
    const end = s.indexOf('endstream', start);
    if (end === -1) break;
    try { out += inflateSync(buf.subarray(start, end)).toString('latin1'); } catch { /* stream no Flate */ }
    i = end;
  }
  return out;
}

const hallazgos = [];
for (const f of ficheros) {
  const buf = readFileSync(f);
  const texto = f.endsWith('.pdf') ? textoPdf(f, buf) : buf.toString('utf8');
  for (const b of BLOQUEADOS) if (b.re.test(texto)) hallazgos.push(`${f}: ${b.nombre}`);
}

console.log(`Ficheros revisados: ${ficheros.length}`);
if (avisoPdf) console.warn('Aviso: pdftotext no está instalado; el texto de los PDF se ha revisado de forma aproximada.');
if (hallazgos.length) {
  console.error('Datos sensibles encontrados:');
  for (const h of hallazgos) console.error(`  ✗ ${h}`);
  process.exit(1);
}
console.log('Sin secretos conocidos en el contenido publicable.');
