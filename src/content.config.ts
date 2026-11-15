import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { AREAS, CATEGORIAS, TIPOS, COMPETENCIAS } from './data/taxonomia';

/**
 * Colección de proyectos.
 *
 * Cada proyecto es un fichero Markdown en `src/content/proyectos/`.
 * El nombre del fichero es la URL: `snort-dmz.md` → `/proyectos/snort-dmz/`.
 * Todos los apartados de texto largo son opcionales: si no existen, no se muestran.
 * El cuerpo del Markdown es el "procedimiento" (relato técnico con comandos y configuraciones).
 */

type Claves<T> = [keyof T & string, ...(keyof T & string)[]];
const claves = <T extends object>(o: T) => Object.keys(o) as Claves<T>;

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumen: z.string().max(260),
      area: z.enum(AREAS),
      categoria: z.enum(claves(CATEGORIAS)),
      tipo: z.enum(claves(TIPOS)),
      estado: z.enum(['A', 'B', 'C', 'D']),
      destacado: z.boolean().default(false),
      /** Orden dentro de su categoría (menor = antes). */
      orden: z.number().default(100),
      /** Texto libre: "Abril 2026", "Mar.–jun. 2025"… */
      fecha: z.string().optional(),
      contexto: z.string().optional(),
      objetivo: z.string().optional(),
      problema: z.string().optional(),
      entorno: z.array(z.string()).default([]),
      arquitectura: z.string().optional(),
      /** Herramientas usadas realmente en el trabajo. */
      herramientas: z.array(z.string()).default([]),
      /** Herramientas solo estudiadas (no usadas en un ejercicio propio). */
      herramientasEstudiadas: z.array(z.string()).default([]),
      resultados: z.array(z.string()).default([]),
      problemas: z.array(z.string()).default([]),
      decisiones: z.array(z.string()).default([]),
      limitaciones: z.array(z.string()).default([]),
      recomendaciones: z.array(z.string()).default([]),
      competencias: z.array(z.enum(claves(COMPETENCIAS))).default([]),
      evidencias: z
        .array(
          z.object({
            imagen: image(),
            alt: z.string(),
            pie: z.string(),
            /**
             * "captura" = captura original del laboratorio.
             * "diseno" = diagrama original incluido en el informe.
             * "diagrama" = diagrama reconstruido para el portfolio a partir de la documentación.
             */
            tipo: z.enum(['captura', 'diseno', 'diagrama']).default('captura'),
          }),
        )
        .default([]),
      documentos: z
        .array(
          z.object({
            titulo: z.string(),
            href: z.string(),
            formato: z.string().default('PDF'),
            nota: z.string().optional(),
          }),
        )
        .default([]),
      enlaces: z.array(z.object({ texto: z.string(), href: z.url() })).default([]),
      /** Qué falta para completar la ficha (se muestra como aviso). */
      pendiente: z.array(z.string()).default([]),
    }),
});

export const collections = { proyectos };
