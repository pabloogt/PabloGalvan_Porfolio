/** Taxonomías del portfolio: categorías, tipos, estados de evidencia y competencias. */

export const AREAS = ['ciberseguridad', 'desarrollo'] as const;

export const CATEGORIAS = {
  'blue-team': 'Blue Team y monitorización',
  redes: 'Seguridad de redes',
  linux: 'Hardening y administración Linux',
  web: 'Auditoría web y seguridad de aplicaciones',
  movil: 'Seguridad móvil',
  forense: 'Análisis forense',
  'cripto-gobierno': 'Criptografía y gobierno de seguridad',
  'desarrollo-web': 'Desarrollo web',
  'desarrollo-software': 'Desarrollo de software',
} as const;

export const TIPOS = {
  profesional: 'Experiencia profesional',
  personal: 'Proyecto personal',
  laboratorio: 'Laboratorio académico',
  investigacion: 'Investigación',
} as const;

/** Clasificación de veracidad pedida en el inventario. */
export const ESTADOS = {
  A: { etiqueta: 'Implementado y documentado', descripcion: 'Existe documentación propia con procedimiento y capturas que respaldan el resultado.' },
  B: { etiqueta: 'Implementado, evidencias parciales', descripcion: 'Se implementó, pero alguna parte del resultado no queda demostrada en la documentación.' },
  C: { etiqueta: 'Estudiado o preparado', descripcion: 'Conocimiento trabajado en formación; no hay una implementación propia documentada.' },
  D: { etiqueta: 'Pendiente de documentación', descripcion: 'El trabajo existe, pero la documentación original no se ha recuperado todavía.' },
} as const;

export const COMPETENCIAS = {
  'resolucion-problemas': 'Resolución de problemas',
  redes: 'Fundamentos de redes',
  linux: 'Linux',
  sistemas: 'Administración de sistemas',
  monitorizacion: 'Monitorización',
  logs: 'Análisis de logs',
  deteccion: 'Detección de amenazas',
  'seguridad-aplicaciones': 'Seguridad de aplicaciones',
  vulnerabilidades: 'Análisis de vulnerabilidades',
  forense: 'Análisis forense',
  metodologia: 'Metodología',
  documentacion: 'Documentación técnica',
  automatizacion: 'Automatización',
  desarrollo: 'Desarrollo de software',
} as const;
