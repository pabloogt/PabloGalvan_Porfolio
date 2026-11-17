import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIAS } from '@/data/taxonomia';
import { normalizar } from './tarjeta';

export type Proyecto = CollectionEntry<'proyectos'>;
export type Categoria = keyof typeof CATEGORIAS;

const pesoEstado = { A: 0, B: 1, C: 2, D: 3 } as const;

/** Orden estable: orden manual, después estado de evidencia, después título. */
export function ordenar(a: Proyecto, b: Proyecto): number {
  return (
    a.data.orden - b.data.orden ||
    pesoEstado[a.data.estado] - pesoEstado[b.data.estado] ||
    a.data.titulo.localeCompare(b.data.titulo, 'es')
  );
}

/**
 * Todas las fichas, ordenadas y con sus listas garantizadas.
 * `normalizar` protege frente a entradas de la caché de contenido procesadas con un esquema anterior.
 */
export async function todos(): Promise<Proyecto[]> {
  const entradas = await getCollection('proyectos');
  return entradas.map((p) => ({ ...p, data: normalizar(p.data) })).sort(ordenar);
}

export async function porArea(area: Proyecto['data']['area']): Promise<Proyecto[]> {
  return (await todos()).filter((p) => p.data.area === area);
}

/** Agrupa respetando el orden en que se declaran las categorías. */
export function agruparPorCategoria(lista: Proyecto[]): { categoria: Categoria; titulo: string; proyectos: Proyecto[] }[] {
  return (Object.keys(CATEGORIAS) as Categoria[])
    .map((categoria) => ({
      categoria,
      titulo: CATEGORIAS[categoria],
      proyectos: lista.filter((p) => p.data.categoria === categoria),
    }))
    .filter((g) => g.proyectos.length > 0);
}

export const urlProyecto = (p: Proyecto) => `/proyectos/${p.id}/`;
