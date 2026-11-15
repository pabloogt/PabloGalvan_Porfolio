/**
 * Datos personales y de formación. Es el único sitio donde se editan.
 * No pongas aquí teléfono ni dirección: la web es pública.
 */
export const perfil = {
  nombre: 'Pablo Galván Tejada',
  nombreCorto: 'Pablo Galván',
  titular: 'Perfil junior en ciberseguridad, sistemas y desarrollo',
  ubicacion: 'Madrid, España',
  email: 'pablogt20042004@gmail.com',
  github: 'https://github.com/pabloogt',
  linkedin: 'https://www.linkedin.com/in/pablo-galvan-tejada-340b44297',
  cv: '/cv/CV_Pablo_Galvan_Tejada.pdf',
  disponibilidad: 'Disponibilidad inmediata',
  descripcion:
    'Titulado en DAM y DAW con especialización en Ciberseguridad. He trabajado en desarrollo web en dos empresas y he montado laboratorios de detección, hardening, redes segmentadas y análisis forense que documento paso a paso, incluyendo lo que no funcionó.',
  objetivo:
    'Busco mi primera oportunidad como analista SOC N1, técnico de ciberseguridad, Blue Team o técnico de sistemas. También valoro puestos de desarrollo web y soporte IT.',
  tecnologias: {
    'Detección y monitorización': ['Snort', 'Suricata', 'Wazuh', 'Elastic Stack (ELK)', 'Filebeat', 'Wireshark'],
    'Sistemas y redes': ['Linux (Ubuntu, Kali)', 'iptables', 'pfSense', 'OpenSSH', 'Cisco IOS (Packet Tracer)', 'VirtualBox'],
    'Auditoría y forense': ['Nmap', 'OWASP ZAP', 'Burp Suite', 'Aircrack-ng / Hashcat', 'FTK Imager', 'Autopsy', 'Volatility 3'],
    Desarrollo: ['TypeScript', 'React', 'Next.js', 'Java / Spring Boot', 'Node.js', 'MySQL / MongoDB', 'Git'],
  },
} as const;

export const formacion = [
  {
    titulo: 'Especialización en Ciberseguridad',
    centro: 'ESCIB',
    periodo: '2025 – 2026 · Finalizada',
    detalle:
      'Módulos de incidentes de ciberseguridad, bastionado de redes y sistemas, hacking ético, puesta en producción segura, análisis forense y normativa de ciberseguridad.',
  },
  {
    titulo: 'FP Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)',
    centro: 'IFP Julián Camarillo',
    periodo: '2022 – 2025',
    detalle: 'Proyecto final: Pill-Express, aplicación de venta y reparto de productos farmacéuticos con Spring Boot.',
  },
  {
    titulo: 'FP Superior en Desarrollo de Aplicaciones Web (DAW)',
    centro: 'IFP Julián Camarillo',
    periodo: '2022 – 2025',
    detalle: 'Desarrollo web en cliente y servidor, despliegue de aplicaciones y bases de datos.',
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
    temas: ['Detección de amenazas', 'Investigación y clasificación de incidentes', 'Contención y respuesta', 'Documentación', 'Ejercicios Blue Team (Let’s Defend)'],
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
    titulo: 'Gobierno y cumplimiento',
    texto: 'ISO 27001, Esquema Nacional de Seguridad, NIST, principios Zero Trust y Plan Director de Seguridad.',
    herramientas: ['PILAR Basic'],
  },
] as const;
