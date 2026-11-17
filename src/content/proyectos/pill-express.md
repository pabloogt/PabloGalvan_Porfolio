---
titulo: Pill-Express — reparto de productos de farmacia
resumen: Aplicación web en Java y Spring Boot para la venta y entrega a domicilio de productos de farmacia, con gestión de productos, pedidos, almacenes, usuarios y repartidores, autenticación con Spring Security y mapas de Google Maps.
area: desarrollo
categoria: desarrollo-software
tipo: academico
estado: A
destacado: true
orden: 4
rol: Desarrollo en pareja de la aplicación completa, del modelo de datos a las vistas.
repo: https://github.com/pabloogt/TFG_DAM
cifras:
  - { valor: "9", etiqueta: controladores MVC }
  - { valor: "7", etiqueta: servicios con JPA }
  - { valor: "3", etiqueta: "capas: web, servicio y datos" }
fecha: Proyecto final de DAM
contexto: Proyecto final del ciclo de Desarrollo de Aplicaciones Multiplataforma, realizado en pareja. La idea toma como referencia las plataformas de reparto a domicilio, aplicada a farmacias.
objetivo: Construir una aplicación completa con administración, venta online y seguimiento de entregas.
problema: El reparto de medicamentos necesita relacionar productos, pedidos, almacenes, ubicaciones y repartidores, y restringir qué puede hacer cada tipo de usuario.
entorno:
  - "Java con Spring Boot, Spring MVC y Thymeleaf."
  - "Spring Data JPA sobre MySQL."
  - "Eclipse como entorno de desarrollo."
arquitectura: "Arquitectura por capas: controladores MVC (productos, pedidos, detalles, almacenes, ubicaciones, usuarios, perfiles y mapa), servicios con interfaz e implementación JPA, repositorios Spring Data y entidades JPA. La seguridad se configura en una clase dedicada con Spring Security y la vista usa Thymeleaf con sus extras de seguridad."
herramientas: [Java, Spring Boot, Spring Security, Spring Data JPA, Thymeleaf, MySQL, Google Maps JavaScript API, Lombok, Eclipse]
resultados:
  - "Funciones de administración con CRUD de productos, pedidos, almacenes, ubicaciones y usuarios."
  - "Venta online y vista de repartidor con mapa de Google Maps."
  - "Control de acceso por perfiles con Spring Security."
problemas:
  - "Revisando el repositorio para el portfolio se ha detectado que la clave de la API de Google Maps está incluida en una plantilla HTML. Debe restringirse por dominio en Google Cloud o rotarse."
decisiones:
  - "Separar interfaz e implementación en los servicios para poder sustituir la capa de datos."
limitaciones:
  - "Proyecto académico en pareja: no llegó a desplegarse en producción."
  - "No hay tests automatizados más allá de la dependencia de pruebas de Spring Boot."
competencias: [desarrollo, metodologia, documentacion]
enlaces:
  - texto: Repositorio en GitHub
    href: https://github.com/pabloogt/TFG_DAM
---

### Módulos principales

| Capa | Componentes |
|---|---|
| Controladores | Home, Productos, Pedidos, Detalles, Almacenes, Ubicaciones, Usuarios, Perfiles, Mapa |
| Servicios | Interfaces `I*Service` con implementaciones `*ServiceJpa` |
| Datos | Repositorios Spring Data JPA y entidades (Producto, Pedidos, Detalle_pedidos, Almacen, Ubicacion, Usuario, Perfil…) |
| Seguridad | `DatabaseWebSecurity` con Spring Security |
