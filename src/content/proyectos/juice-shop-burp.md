---
titulo: Pruebas sobre OWASP Juice Shop con Burp Suite
resumen: "Interceptación y modificación de peticiones con Burp Suite (Proxy y Repeater) contra OWASP Juice Shop para comprobar categorías A05–A10 del OWASP Top 10 2025, con un hallazgo claro: el token de sesión sigue siendo válido tras cerrar sesión."
area: ciberseguridad
categoria: web
tipo: laboratorio
estado: B
destacado: false
orden: 1
fecha: Febrero 2026
contexto: Actividad del módulo de Puesta en producción segura sobre una aplicación deliberadamente vulnerable, ejecutada en local con Docker.
objetivo: Aprender a interceptar, repetir y manipular peticiones HTTP para comprobar controles de seguridad de una aplicación web.
problema: Las aplicaciones confían a menudo en que el cliente envía lo que la interfaz permite. Con un proxy de interceptación se puede enviar cualquier petición y comprobar qué valida realmente el servidor.
entorno:
  - "Kali Linux con Docker; Juice Shop en http://localhost:3000."
  - "Burp Suite con su navegador integrado como proxy."
herramientas: [Burp Suite, OWASP Juice Shop, Docker, Kali Linux]
resultados:
  - "A07 Authentication Failures: tras cerrar sesión, una petición autenticada repetida desde Repeater con la cabecera Authorization: Bearer sigue siendo aceptada. El token no se invalida en el logout."
  - "A06 Insecure Design: el servidor acepta la misma petición repetida varias veces sin ningún control de frecuencia."
  - "A05 Injection: la manipulación del campo email del login (POST /rest/user/login) produce una respuesta distinta a la de un login normal, indicio de validación insuficiente."
  - "Se documentan también pruebas para A08, A09 y A10 con la misma estructura de prueba realizada y evidencia observada."
decisiones:
  - "Usar Repeater para aislar cada petición y cambiar un solo parámetro cada vez, comparando la respuesta con la petición legítima."
limitaciones:
  - "En la prueba de inyección el informe describe la respuesta de forma ambigua (token válido o error anómalo); no se publica como explotación confirmada."
  - "Juice Shop es una aplicación vulnerable a propósito: las pruebas sirven para practicar la metodología, no como auditoría de un sistema real."
recomendaciones:
  - "Invalidar los tokens en el servidor al cerrar sesión (lista de revocación o tokens de vida corta con refresco)."
  - "Limitar la frecuencia de peticiones sensibles y usar consultas parametrizadas en la autenticación."
competencias: [seguridad-aplicaciones, vulnerabilidades, metodologia, documentacion]
pendiente:
  - Copia saneada del informe con las capturas de Repeater.
---

### Preparación

```bash
sudo apt install docker.io -y
sudo systemctl enable --now docker
sudo docker run --rm -p 3000:3000 bkimminich/juice-shop
```

En Burp Suite: **Proxy › Open browser**, navegación por la aplicación y envío a **Repeater** de las peticiones de interés.

### Prueba de sesión (A07)

1. Iniciar sesión y localizar una petición autenticada con `Authorization: Bearer <token>`.
2. Enviarla a Repeater.
3. Cerrar sesión en la aplicación.
4. Repetir la petición: el servidor sigue respondiendo como si la sesión estuviera activa.
