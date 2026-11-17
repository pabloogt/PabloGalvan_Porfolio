---
titulo: Revisión de código desde el punto de vista de la seguridad
resumen: Análisis de cinco fragmentos de código en JavaScript, Node.js, PHP, C++ y Python para identificar el riesgo que introduce cada característica del lenguaje y proponer la corrección.
area: ciberseguridad
categoria: web
tipo: laboratorio
estado: C
destacado: false
orden: 4
fecha: Curso 2025–2026
contexto: Actividad «Detecta el riesgo oculto» del módulo de Puesta en producción segura.
objetivo: Reconocer en una lectura de código los patrones que suelen acabar en una vulnerabilidad.
herramientas: [JavaScript, Node.js, PHP, C++, Python]
resultados:
  - "Ejecución dinámica en JavaScript: riesgo de eval() y Function() con datos no controlados."
  - "Ecosistema de Node.js: dependencias de terceros cuyo código no controla el desarrollador."
  - "Tipado débil en PHP: comparaciones laxas en las que una cadena o null se evalúan como 0."
  - "Gestión manual de memoria en C++ y características del entorno de ejecución en Python."
limitaciones:
  - "Ejercicio de análisis sobre fragmentos propuestos, sin una aplicación real detrás."
competencias: [seguridad-aplicaciones, desarrollo]
---
