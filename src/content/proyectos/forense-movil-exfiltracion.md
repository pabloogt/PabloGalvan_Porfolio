---
titulo: Análisis forense móvil de una posible fuga de datos
resumen: Revisión de dos extracciones de un dispositivo Android (bases de datos SQLite de SMS e historial, mensajería, ficheros eliminados, ubicaciones y logs) para reconstruir la secuencia de una posible exportación de datos de clientes.
area: ciberseguridad
categoria: forense
tipo: laboratorio
estado: B
destacado: false
orden: 3
fecha: Curso 2025–2026
contexto: Actividad del módulo de Análisis forense. Se entregaron carpetas con los artefactos ya extraídos de un móvil; la tarea era analizarlos y responder si hubo fuga de información y cómo.
objetivo: Correlacionar mensajes, navegación, ficheros y ubicaciones para establecer una secuencia de hechos.
problema: Cada artefacto por separado es ambiguo. Solo cruzando fechas y contenidos se puede sostener que un fichero se exportó y se envió a un tercero.
entorno:
  - "Carpetas de evidencias proporcionadas (aplicaciones instaladas, bases de datos, documentos, imágenes, ubicaciones y logs)."
herramientas: [DB Browser for SQLite, strings]
herramientasEstudiadas: [ADB, Andriller, Cellebrite, LiME, ADEL, apktool, aapt]
resultados:
  - "Se revisan las tablas de SMS y el historial de navegación (tabla urls) con DB Browser for SQLite."
  - "Se analiza un fichero eliminado con strings buscando términos como «export»."
  - "Se reconstruye la secuencia: acceso al fichero de clientes, exportación, uso de una aplicación o del navegador para transferirlo, contacto con un tercero, subida y confirmación del envío."
problemas:
  - "La aplicación file_transfer.apk no pudo analizarse correctamente con aapt ni apktool; su función se dedujo por el nombre y el contexto, y así se indica en el informe."
decisiones:
  - "Trabajar solo sobre los artefactos ya extraídos y responder a las preguntas del caso con la evidencia concreta que respalda cada respuesta."
limitaciones:
  - "No se realizó la adquisición del dispositivo: las herramientas de extracción (ADB, Andriller, Cellebrite, LiME) se estudiaron en teoría, no se usaron."
  - "Sin documento publicado ni capturas en el portfolio."
competencias: [forense, metodologia, logs, documentacion]
pendiente:
  - Copia saneada del informe y capturas de las consultas SQLite.
---

### Método

1. Inventario de aplicaciones instaladas (`Config/apps_instaladas.txt`).
2. Mensajes: base de datos de SMS abierta con DB Browser for SQLite.
3. Navegación: tabla `urls` del historial del navegador.
4. Fichero eliminado: `strings` y búsqueda de términos como `export`.
5. Documento sensible, carpeta de descargas, registro de ubicación, imágenes y logs del sistema.
6. Línea temporal con todas las marcas de tiempo y respuestas a las preguntas del caso.
