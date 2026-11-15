---
titulo: Adquisición y análisis forense de un USB con FTK Imager y Autopsy
resumen: Imagen forense E01 de un pendrive con FTK Imager (hashes MD5 y SHA-1 incluidos), análisis en Autopsy, recuperación de ficheros eliminados y generación de informes HTML y CSV.
area: ciberseguridad
categoria: forense
tipo: laboratorio
estado: B
destacado: false
orden: 1
fecha: Octubre 2025
contexto: Actividad del módulo de Análisis forense. Se trabajó con un pendrive propio, formateado previamente, para practicar la adquisición y la recuperación de información borrada.
objetivo: Obtener una copia forense verificable del dispositivo y analizarla sin tocar el original.
problema: Formatear un dispositivo no elimina los datos. Para demostrarlo con validez técnica hay que adquirir el dispositivo completo, incluido el espacio no asignado, y poder probar que la copia no se ha alterado.
entorno:
  - "Windows 11 como equipo de análisis."
  - "Pendrive USB como evidencia."
herramientas: [FTK Imager, Autopsy]
resultados:
  - "Se crea la imagen del dispositivo físico completo en formato E01, con número de caso, número de evidencia y examinador."
  - "FTK Imager calcula los hashes MD5 y SHA-1 al terminar la adquisición."
  - "Autopsy procesa la imagen y permite navegar por el sistema de ficheros y por los ficheros eliminados."
  - "Se recuperan dos documentos borrados y se revisan sus metadatos (hashes, fechas MAC, tipo MIME)."
  - "Se generan un informe HTML y una exportación CSV de los ficheros eliminados."
decisiones:
  - "Elegir «Physical Drive» y no la unidad lógica, para incluir el espacio no asignado."
  - "Usar E01 en lugar de dd: guarda metadatos del caso y hashes integrados, y admite compresión."
  - "Trabajar siempre sobre la imagen, nunca sobre el dispositivo original."
limitaciones:
  - "No se usó un bloqueador de escritura por hardware."
  - "No se verificaron los hashes SHA-256 de los ficheros exportados ni se elaboró una línea temporal completa."
  - "El caso de Autopsy existe en el equipo, pero el informe HTML generado no está entre los materiales aportados; la ficha se basa en el documento de la actividad."
recomendaciones:
  - "Añadir verificación de la imagen (Verify Drive/Image) y un registro de cadena de custodia con fecha, hora y responsable."
  - "Ampliar con el análisis de línea temporal de Autopsy y la búsqueda en espacio no asignado."
competencias: [forense, metodologia, documentacion]
pendiente:
  - Capturas o informe HTML de Autopsy (los documentos recuperados son personales y no deben publicarse sin revisar).
---

### Adquisición con FTK Imager

1. **File › Create Disk Image › Physical Drive**, seleccionando el pendrive por tamaño y letra.
2. Formato **E01**.
3. Datos del caso: número de caso, número de evidencia, descripción del dispositivo y examinador.
4. Carpeta de destino distinta del dispositivo origen.
5. Al terminar, FTK Imager muestra los hashes MD5 y SHA-1 de la imagen.

### Análisis con Autopsy

1. Nuevo caso y **Add Data Source** con la imagen E01, con los módulos de ingesta por defecto.
2. Revisión del sistema de ficheros y de la partición.
3. **Data Sources › File System / Deleted Files** para localizar ficheros eliminados.
4. Para cada fichero relevante: nombre, ruta, tamaño, MD5/SHA-1/SHA-256, fechas de creación, modificación y acceso, tipo MIME y metadatos del documento.
5. **Tools › Generate Report** en HTML y exportación de las filas seleccionadas a CSV.
