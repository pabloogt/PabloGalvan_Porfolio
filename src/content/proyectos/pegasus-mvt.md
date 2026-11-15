---
titulo: Detección de Pegasus en un iPhone con MVT
resumen: "Trabajo en grupo: copia de seguridad de un iPhone y comparación con los indicadores de compromiso (IOC) públicos de Pegasus mediante Mobile Verification Toolkit. Resultado, sin coincidencias."
area: ciberseguridad
categoria: movil
tipo: investigacion
estado: B
destacado: false
orden: 2
fecha: Curso 2025–2026
contexto: Práctica en grupo de cuatro personas del módulo de Puesta en producción segura, unida al estudio del spyware Pegasus (infección 1-click y 0-click, explotación de vulnerabilidades móviles y extracción de información) a partir de los informes de Citizen Lab y Amnistía Internacional.
objetivo: Comprobar si un dispositivo iOS presentaba rastros conocidos de Pegasus usando la metodología pública de Amnistía Internacional.
problema: Pegasus puede residir solo en memoria y desaparecer tras un reinicio, así que la detección depende de los rastros que deja en copias de seguridad y registros, contrastados con IOC conocidos.
entorno:
  - "Linux con Python, Git y MVT instalado desde su repositorio oficial."
  - "Copia de seguridad de un iPhone."
herramientas: [MVT (Mobile Verification Toolkit), Git, Python]
resultados:
  - "Se instala MVT, se descargan los IOC para iOS y se analiza la copia de seguridad del dispositivo."
  - "No se encuentran coincidencias con los IOC: el dispositivo se considera limpio en el momento de la copia."
limitaciones:
  - "Trabajo en grupo: la ficha describe el ejercicio conjunto."
  - "Un resultado sin coincidencias solo descarta las variantes conocidas por los IOC disponibles; no demuestra que el dispositivo no haya estado comprometido."
recomendaciones:
  - "Mantener iOS actualizado, reiniciar el dispositivo con frecuencia y activar el modo de aislamiento en perfiles de alto riesgo."
competencias: [forense, seguridad-aplicaciones, metodologia]
pendiente:
  - Capturas de la ejecución de MVT, revisadas para que no muestren datos del dispositivo.
---

### Pasos seguidos

El informe describe los pasos; los comandos siguientes son el flujo estándar de MVT que corresponde a esos pasos, no una copia literal del informe.

```bash
sudo apt update && sudo apt-get install git
git clone https://github.com/mvt-project/mvt.git
# instalación de dependencias de Python y de MVT
mvt-ios download-iocs
mvt-ios check-backup --output resultados/ <ruta_backup>
```

MVT compara procesos, dominios y artefactos de la copia de seguridad con las listas de IOC publicadas (formato STIX2).
