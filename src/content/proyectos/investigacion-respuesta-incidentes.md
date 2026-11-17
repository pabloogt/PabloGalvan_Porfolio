---
titulo: Investigación y respuesta a incidentes
resumen: Tres trabajos del módulo de Incidentes agrupados — la investigación de un equipo comprometido y de un USB requisado, el triaje de una alerta de PowerShell en un SIEM con su clasificación y notificación, y un plan de actuación ante incidentes.
area: ciberseguridad
categoria: blue-team
tipo: laboratorio
estado: B
destacado: false
orden: 6
fecha: Curso 2025–2026
contexto: Casos prácticos sobre una empresa ficticia (ACME) con red corporativa, SOC y entorno industrial. Cada uno cubre una parte del ciclo de un incidente, de la alerta al informe.
objetivo: Practicar el trabajo de un analista de primer nivel — confirmar una alerta, reunir evidencias, clasificar, escalar y documentar.
problema: Una alerta aislada (una conexión a un puerto extraño, un comando de PowerShell) no dice por sí sola si hay un incidente. Hay que buscar persistencia, contrastar hashes y reputación y decidir con criterios definidos de antemano.
entorno:
  - "Caso 1: equipo Windows 7 de la víctima e imagen forense de un USB."
  - "Caso 2: plataforma de prácticas LetsDefend (SIEM simulado)."
  - "Caso 3: documento de procedimiento para la organización ficticia."
herramientas: [netstat, Editor del Registro de Windows, Autopsy, LetsDefend, MITRE ATT&CK]
resultados:
  - "Caso 1: tras una alerta del IDS por tráfico al puerto TCP 6666, se revisan conexiones con netstat -ano y se localiza en la clave Run del registro una entrada que lanza netcat al iniciar sesión. También se compara el hash de la herramienta descargada por el usuario con el publicado oficialmente."
  - "Caso 1: se verifica el hash de la imagen del USB, se crea el caso en Autopsy y se analiza su contenido. Las conclusiones apuntan a un spear phishing con una herramienta troyanizada."
  - "Caso 2: se analiza una alerta por comandos sospechosos de PowerShell (proceso, reputación y comportamiento) y se relaciona con T1059.001, T1105 y T1218 de MITRE ATT&CK."
  - "Caso 2: se clasifica el incidente, se asigna peligrosidad e impacto y se determina la obligación y el contenido de la notificación al CSIRT."
  - "Caso 3: plan de actuación con detección, recogida de evidencias, evaluación inicial, roles, activación del equipo, análisis y contención."
decisiones:
  - "Comprobar la persistencia aunque el puerto ya no esté activo: que una conexión no se vea en el momento del análisis no descarta el compromiso."
  - "Verificar la integridad de la imagen antes de abrirla y trabajar siempre sobre la copia."
  - "Separar causas (falta de formación, sin control de aplicaciones, sin control de dispositivos extraíbles) de medidas (concienciación, listas blancas, DLP, sandbox de adjuntos)."
limitaciones:
  - "Son casos de laboratorio y de una plataforma de formación, no incidentes reales."
  - "Los informes no se publican todavía en el portfolio."
competencias: [deteccion, forense, logs, metodologia, documentacion]
pendiente:
  - Copias saneadas de los tres informes y capturas del registro y de Autopsy.
---

### Caso 1 — Equipo comprometido y USB requisado

1. Alerta del IDS/SIEM por una comunicación interna al puerto TCP 6666.
2. `netstat -ano` en la máquina afectada: el puerto no está activo en ese momento.
3. Registro: `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` contiene una entrada llamada «netcat» que apunta a un ejecutable.
4. Comparación del hash del instalador descargado con el publicado por el fabricante.
5. Imagen del USB: verificación del hash, caso en Autopsy y revisión del contenido.
6. Conclusiones, causas y medidas.

### Caso 2 — Triaje de una alerta de PowerShell

| Paso | Qué se revisa |
|---|---|
| Proceso | Línea de comandos y proceso padre |
| Reputación | Dominios, direcciones y ficheros implicados |
| Comportamiento | Descarga de herramientas y uso de binarios del sistema como regsvr32 |
| Clasificación | Tipo de incidente, peligrosidad, impacto y notificación al CSIRT |

### Caso 3 — Plan de actuación

Identificación → recopilación de evidencias → evaluación inicial → activación del equipo (validación, escalado al CISO, clasificación, convocatoria y reparto de tareas) → análisis y delimitación del alcance → contención.
