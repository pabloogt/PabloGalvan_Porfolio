/**
 * Lógica pura de las tarjetas de proyecto (sin dependencias de Astro, para poder probarla con node:test).
 *
 * El esquema de la colección da valor por defecto `[]` a todas las listas, pero la caché de contenido
 * del servidor de desarrollo puede conservar entradas procesadas con un esquema anterior. Por eso los
 * componentes no dan por hecho que una lista existe: pasan siempre por `lista()` o `normalizar()`.
 */

/** Campos de una ficha que son listas y deben existir siempre como array. */
export const CAMPOS_LISTA = [
  'entorno',
  'herramientas',
  'herramientasEstudiadas',
  'resultados',
  'problemas',
  'decisiones',
  'limitaciones',
  'recomendaciones',
  'competencias',
  'evidencias',
  'documentos',
  'enlaces',
  'pendiente',
  'cifras',
] as const;

/** Devuelve siempre un array: el valor si ya lo es, o uno vacío si falta o no es una lista. */
export function lista<T>(valor: readonly T[] | null | undefined): T[] {
  return Array.isArray(valor) ? [...valor] : [];
}

/** Copia los datos de una ficha garantizando que todas sus listas existen. No inventa contenido. */
export function normalizar<T extends object>(datos: T): T {
  const copia = { ...datos } as Record<string, unknown>;
  for (const campo of CAMPOS_LISTA) copia[campo] = lista(copia[campo] as unknown[] | undefined);
  return copia as T;
}

export type MedioTarjeta = 'portada' | 'cifras' | 'emblema';

/**
 * Qué se muestra en la zona visual de una tarjeta destacada:
 * la portada si existe; si no, las cifras verificadas; si no hay ninguna de las dos, un emblema tipográfico.
 */
export function medioTarjeta(datos: { portada?: unknown; cifras?: readonly unknown[] | null | undefined }): MedioTarjeta {
  if (datos.portada) return 'portada';
  if (lista(datos.cifras).length > 0) return 'cifras';
  return 'emblema';
}

/** Nombre corto del proyecto: lo que va antes de la raya («WebTrustScan — análisis…» → «WebTrustScan»). */
export function nombreCorto(titulo: string): string {
  return (titulo.split(/\s[—–-]\s/)[0] ?? titulo).trim();
}

/** Hasta dos iniciales para el emblema («TCG Radar» → «TR», «WebTrustScan» → «WT»). */
export function iniciales(titulo: string): string {
  const nombre = nombreCorto(titulo);
  const palabras = nombre.split(/\s+/).filter(Boolean);
  if (palabras.length >= 2) return (palabras[0]![0]! + palabras[1]![0]!).toUpperCase();
  const mayusculas = nombre.match(/\p{Lu}/gu) ?? [];
  if (mayusculas.length >= 2) return (mayusculas[0]! + mayusculas[1]!).toUpperCase();
  return nombre.slice(0, 2).toUpperCase();
}
