---
titulo: Reconocimiento pasivo y estudio de CVE-2021-41773
resumen: Análisis de vulnerabilidades sobre una empresa ficticia — tecnologías, directorios, certificados y exposición de empleados — con evaluación de riesgos, superficie de ataque y plan de mitigación, incluido el path traversal de Apache 2.4.49.
area: ciberseguridad
categoria: web
tipo: laboratorio
estado: C
destacado: false
orden: 3
fecha: Curso 2025–2026
contexto: "Actividad del módulo de Hacking ético. El caso (PabTech S.A.) es ficticio: los datos del objetivo son supuestos del ejercicio, no resultados de escanear un sistema real."
objetivo: Practicar la metodología de un análisis de vulnerabilidades — reconocimiento, identificación, evaluación de riesgo y mitigación — y entender el impacto de una CVE concreta.
problema: Un servidor sin actualizar (Apache 2.4.49, PHP 7.2, WordPress 5.4) acumula vulnerabilidades conocidas y públicas, fáciles de identificar desde fuera.
herramientas: [WhatWeb, nslookup, Whois]
resultados:
  - "Se identifican tecnologías, rutas sensibles (/backup/, /test/, /admin/), carencias de TLS (subdominio sin redirección a HTTPS, sin HSTS) y exposición de correos de empleados."
  - "Se clasifican siete hallazgos por riesgo y facilidad de explotación, con CVE-2021-41773 como crítico."
  - "Se propone un plan de mitigación priorizado."
decisiones:
  - "Limitarse a técnicas pasivas y no intrusivas, como pedía el enunciado."
limitaciones:
  - "Es un caso ficticio: no se escaneó ni explotó ningún sistema. Por eso se clasifica como trabajo estudiado (C) y no como implementación."
  - "La práctica de Nmap y OpenVAS/GVM está documentada en su propia ficha."
recomendaciones:
  - "Actualizar Apache a una versión corregida, PHP a una versión con soporte y WordPress con sus plugins."
  - "Proteger o retirar /backup/ y /test/, añadir MFA y bloqueo por intentos al panel /admin/."
  - "Forzar HTTPS con HSTS y renovación automática de certificados."
competencias: [vulnerabilidades, metodologia, documentacion]
---

### CVE-2021-41773 en una frase

Apache HTTP Server 2.4.49 normalizaba mal las rutas, de modo que una petición con secuencias `../` codificadas podía salir del directorio web y leer ficheros del sistema (y, con CGI habilitado, ejecutar código) si la configuración no denegaba el acceso a todo el sistema de ficheros. Se corrigió en 2.4.50 y, de forma completa, en 2.4.51.

### Matriz de riesgos del caso

| Hallazgo | Riesgo |
|---|---|
| Apache 2.4.49 (CVE-2021-41773) | Crítico |
| PHP 7.2 sin soporte | Alto |
| WordPress 5.4 desactualizado | Alto |
| Panel /admin/ sin protecciones adicionales | Medio-alto |
| HTTP sin HSTS | Medio-alto |
| jQuery 3.3.1 | Medio |
| Rutas sensibles en robots.txt | Medio |
