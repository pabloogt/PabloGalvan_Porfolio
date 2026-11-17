---
titulo: Plan Director de Seguridad y análisis de riesgos con MAGERIT
resumen: Trabajos de gobierno de la seguridad sobre empresas ficticias — un Plan Director de Seguridad con resumen ejecutivo e iniciativas priorizadas, un análisis de riesgos con PILAR Basic y una propuesta de segmentación de red con recursos limitados.
area: ciberseguridad
categoria: cripto-gobierno
tipo: laboratorio
estado: C
destacado: false
orden: 2
fecha: Curso 2025–2026
contexto: Actividades de los módulos de Bastionado e Incidentes. Los casos (TecnoAgro S.L. y ACME) son ficticios; el valor está en el método, no en los datos.
objetivo: Aprender a priorizar — qué activos importan más, qué riesgos hay que tratar primero y cómo explicarlo a la dirección.
problema: Sin un inventario de activos y una valoración del riesgo, las medidas de seguridad se eligen por intuición y no se pueden justificar ante quien decide el presupuesto.
herramientas: [PILAR Basic, MAGERIT]
resultados:
  - "Plan Director de Seguridad: resumen ejecutivo para la dirección, objetivos estratégicos e iniciativas prioritarias (gobernanza, parches, copias con pruebas de restauración, clasificación de la información, concienciación y gestión de incidentes)."
  - "Análisis de riesgos: inventario y jerarquía de activos, con la información de clientes y contratos como activo más crítico, seguida de la base de datos, el ERP y las copias de seguridad; modelado de amenazas y salvaguardas en PILAR Basic sobre una máquina Windows 10."
  - "Propuesta de segmentación por VLAN para eliminar accesos directos entre servicios, pensada para un equipo de seguridad de dos personas y con el gasto mínimo."
  - "Trabajo de investigación sobre el modelo Zero Trust."
decisiones:
  - "Ordenar los activos por el daño que causaría su pérdida, no por su coste."
  - "Redactar el resumen ejecutivo en lenguaje de negocio (continuidad, sanciones, reputación) y dejar el detalle técnico para los anexos."
limitaciones:
  - "Son ejercicios documentales sobre empresas ficticias: no hay una implantación real detrás, por eso se clasifican como trabajo estudiado."
competencias: [metodologia, documentacion]
pendiente:
  - Copias de los documentos, revisadas, si se quieren publicar.
---

### Jerarquía de activos del análisis de riesgos

1. Información de clientes y contratos.
2. Servidor de base de datos.
3. Aplicación ERP.
4. Sistema de copias de seguridad.
5. Red interna corporativa.
6. Router y firewall principal.
7. Servidor de correo.
8. Estaciones de trabajo.
