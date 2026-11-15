---
titulo: Auditoría de aplicaciones web con OWASP ZAP
resumen: Despliegue con Docker Compose de tres aplicaciones web (panel de administración, portal de clientes y portal de soporte) y análisis con OWASP ZAP antes de su paso a producción, centrado en cabeceras de seguridad y exposición de información.
area: ciberseguridad
categoria: web
tipo: laboratorio
estado: B
destacado: false
orden: 2
fecha: Curso 2025–2026
contexto: Laboratorio del módulo de Puesta en producción segura. Se entregaban varias aplicaciones en contenedores para revisarlas con criterios de OWASP Top 10 antes de desplegarlas.
objetivo: Detectar configuraciones inseguras en aplicaciones web antes de publicarlas y proponer su corrección.
problema: Muchas aplicaciones llegan a producción con la configuración por defecto del servidor, que revela versiones y no envía las cabeceras que protegen al navegador.
entorno:
  - "Kali Linux con Docker y docker-compose."
  - "Tres aplicaciones servidas en localhost en puertos distintos (por ejemplo, el panel de administración en el 8084)."
herramientas: [OWASP ZAP, Docker, docker-compose, Kali Linux]
resultados:
  - "En las tres aplicaciones falta Content-Security-Policy y la protección contra clickjacking (X-Frame-Options o frame-ancestors)."
  - "Falta X-Content-Type-Options: nosniff."
  - "Las cabeceras Server y X-Powered-By revelan tecnología y versión, y una página de error muestra información interna del servidor."
  - "No se detectaron vulnerabilidades críticas como inyección SQL en estos análisis concretos."
problemas:
  - "docker-compose no estaba instalado en la máquina; hubo que añadirlo antes de levantar las aplicaciones."
decisiones:
  - "Combinar el escaneo automático de ZAP con comprobaciones manuales de cada hallazgo."
  - "Agrupar los hallazgos por aplicación y explicar para cada uno el riesgo y la corrección."
limitaciones:
  - "Los hallazgos son de configuración (riesgo bajo o medio). No se intentaron pruebas autenticadas ni de lógica de negocio."
  - "El informe no se publica todavía en el portfolio."
recomendaciones:
  - "Definir CSP, X-Frame-Options o frame-ancestors, nosniff, Referrer-Policy y HSTS en el servidor o en el proxy inverso."
  - "Ocultar Server y X-Powered-By y sustituir las páginas de error por defecto."
competencias: [seguridad-aplicaciones, vulnerabilidades, metodologia, documentacion]
pendiente:
  - Copia saneada del informe con las capturas de alertas de ZAP.
---

### Pasos seguidos

```bash
sudo apt install docker-compose -y
sudo docker-compose up -d     # en cada carpeta de aplicación
# http://localhost:PUERTO
```

Con ZAP se lanzó el análisis de cada aplicación y se revisaron manualmente las alertas, comprobando en las respuestas HTTP qué cabeceras faltaban o sobraban.

Estas mismas comprobaciones son las que automatiza mi herramienta [WebTrustScan](/proyectos/webtrustscan/).
