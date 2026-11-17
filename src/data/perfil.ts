/**
 * Datos personales, experiencia, formación y tecnologías. Es el único sitio donde se editan.
 * No pongas aquí teléfono ni dirección: la web es pública.
 */
export const perfil = {
  nombre: 'Pablo Galván Tejada',
  nombreCorto: 'Pablo Galván',
  titular: 'Desarrollador web y ciberseguridad junior',
  ubicacion: 'Madrid, España',
  email: 'pablogt20042004@gmail.com',
  github: 'https://github.com/pabloogt',
  linkedin: 'https://www.linkedin.com/in/pablo-galvan-tejada-340b44297',
  /**
   * Ruta del CV público (por ejemplo '/cv/CV_Pablo_Galvan_Tejada.pdf') o null.
   * Con null, los botones de descarga no se muestran. Publica solo un CV actualizado y sin teléfono.
   */
  cv: null as string | null,
  disponibilidad: 'Disponibilidad inmediata',
  idiomas: 'Español nativo · Inglés B2',
  /** Titular del inicio: dos frases cortas. */
  hero: {
    linea1: 'Construyo webs y aplicaciones.',
    linea2: 'Y aprendo a defenderlas.',
    texto:
      'Soy desarrollador web con especialización en ciberseguridad. He publicado webs reales, he trabajado con React y TypeScript en equipos de desarrollo y monto laboratorios de detección, hardening y análisis forense que documento paso a paso.',
  },
  descripcion:
    'Desarrollador web y perfil junior de ciberseguridad en Madrid. Proyectos web publicados, prácticas en equipos de desarrollo y laboratorios de seguridad documentados con evidencias.',
  objetivo:
    'Busco una primera oportunidad estable como desarrollador web o en ciberseguridad junior (SOC, Blue Team, seguridad de aplicaciones o sistemas).',
} as const;

/** Experiencia profesional. Solo tareas generales: nada interno de las empresas. */
export const experiencia = [
  {
    empresa: 'Cüimo',
    puesto: 'Prácticas en el departamento de IT',
    periodo: 'Marzo – junio de 2025',
    tareas: [
      'Desarrollo de interfaces con React y TypeScript dentro del equipo de la plataforma web.',
      'Integración con APIs y trabajo con los flujos de datos de la aplicación.',
      'Trabajo diario con Git y GitHub y con bases de datos no relacionales.',
    ],
    tecnologias: ['React', 'TypeScript', 'APIs REST', 'Bases de datos NoSQL', 'Git y GitHub'],
    nota: 'El trabajo realizado es interno de la empresa y no se muestra en este portfolio.',
  },
  {
    empresa: 'Atisa',
    puesto: 'Prácticas de desarrollo',
    periodo: 'Marzo – junio de 2024',
    tareas: [
      'Participación en un equipo de desarrollo de aplicaciones web.',
      'Desarrollo de una aplicación web CRUD para la gestión de usuarios.',
      'Pruebas con modelos de lenguaje e inteligencia artificial para generar contenido e imágenes.',
    ],
    tecnologias: ['Desarrollo web', 'CRUD', 'Modelos de lenguaje (LLM)'],
    nota: null,
  },
] as const;

/**
 * Tecnologías agrupadas por área. Cada grupo indica de dónde sale la experiencia,
 * en lugar de niveles o porcentajes.
 */
export const tecnologias = [
  {
    grupo: 'Frontend',
    base: 'Prácticas en Cüimo y proyectos propios',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Astro'],
  },
  {
    grupo: 'Backend',
    base: 'Proyecto final de DAM, WebTrustScan y formación',
    items: ['Node.js', 'Java', 'Spring Boot', 'Python', 'APIs REST'],
  },
  {
    grupo: 'Bases de datos',
    base: 'Formación, prácticas y proyectos',
    items: ['SQL (MySQL)', 'Bases de datos no relacionales', 'Supabase (PostgreSQL)'],
  },
  {
    grupo: 'Sistemas y herramientas',
    base: 'Laboratorios y proyectos publicados',
    items: ['Linux (Ubuntu, Kali)', 'Git y GitHub', 'WordPress', 'Docker', 'VirtualBox', 'DNS y hosting'],
  },
  {
    grupo: 'Ciberseguridad',
    base: 'Laboratorios de la especialización',
    items: ['Snort', 'Suricata', 'Wazuh', 'Elastic Stack', 'Wireshark', 'Nmap', 'iptables / UFW', 'pfSense', 'Burp Suite', 'OWASP ZAP', 'Autopsy', 'Volatility 3'],
  },
] as const;

export const formacion = [
  {
    titulo: 'Especialización en Ciberseguridad',
    centro: 'ESCIB',
    periodo: 'Finalizada en 2026',
    detalle:
      'Incidentes de ciberseguridad, bastionado de redes y sistemas, hacking ético, puesta en producción segura, análisis forense y normativa.',
  },
  {
    titulo: 'FP de Grado Superior en Desarrollo de Aplicaciones Web (DAW)',
    centro: 'IFP Julián Camarillo',
    periodo: 'Finalizado',
    detalle: 'Desarrollo web en cliente y servidor, despliegue de aplicaciones y bases de datos.',
  },
  {
    titulo: 'Formación de FP de Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)',
    centro: 'IFP Julián Camarillo',
    periodo: '2022 – 2025',
    detalle: 'Programación en Java, acceso a datos y desarrollo de aplicaciones. Proyecto final: Pill-Express.',
  },
] as const;

/**
 * Evaluaciones y contenidos trabajados. Ocupan un lugar secundario:
 * no son proyectos ni experiencia laboral.
 */
export const evaluaciones = [
  {
    titulo: 'Análisis forense — 3.ª evaluación',
    fecha: 'Mayo 2026',
    temas: ['Cloud forensics', 'Docker y virtualización', 'IoT', 'Snapshots', 'Evidencias y cadena de custodia', 'CLOUD Act', 'Infraestructuras 5G'],
  },
  {
    titulo: 'Puesta en producción segura — 3.ª evaluación',
    temas: ['Arquitectura Android e iOS', 'Sandboxing y permisos', 'Firma de aplicaciones', 'OWASP Mobile Top 10 y MASVS', 'Almacenamiento seguro', 'Certificate pinning y MITM', 'MobSF, JADX y Frida (estudiados)'],
  },
  {
    titulo: 'Detección y documentación de incidentes — UD5',
    temas: ['Detección de amenazas', 'Investigación y clasificación de incidentes', 'Contención y respuesta', 'Documentación', 'Ejercicios Blue Team (LetsDefend)'],
  },
  {
    titulo: 'IDS/IPS y Snort — UD6',
    nota: 'Cuestionario de refuerzo: 8/10',
    temas: ['Reglas personalizadas', 'Acciones y parámetros', 'Detección de escaneos', 'Falsos positivos', 'Detección multipunto'],
  },
  {
    titulo: 'SIEM y ELK — UD7',
    nota: 'Cuestionario de refuerzo: 8/10',
    temas: ['Elasticsearch, Logstash y Kibana', 'Ingesta de logs y pipelines', 'Grok', 'Visualización', 'Correlación y monitorización multipunto'],
  },
] as const;

/** Conocimientos estudiados sin un proyecto propio documentado (estado C). */
export const conocimientosEstudiados = [
  {
    titulo: 'Forense móvil, cloud y de virtualización',
    texto:
      'Adquisición y preservación de evidencias, clasificación de métodos por invasividad, AWS CloudTrail, jurisdicción, snapshots, contenedores Docker y dispositivos IoT.',
    herramientas: ['ADB', 'Andriller', 'Cellebrite', 'LiME', 'ADEL', 'Cellebrite UFED Cloud Analyzer', 'Belkasoft X'],
  },
  {
    titulo: 'Normativa y cumplimiento',
    texto: 'ISO 27001, Esquema Nacional de Seguridad, NIST, RGPD y responsabilidad penal de la empresa.',
    herramientas: [],
  },
] as const;
