---
titulo: WebTrustScan — análisis externo de seguridad web
resumen: Herramienta propia en Next.js y TypeScript que audita desde fuera la seguridad de una web con 24 controles (TLS, cabeceras, cookies, CORS, DNS y correo), puntuación con cobertura, protección SSRF y 324 tests.
area: desarrollo
categoria: desarrollo-web
tipo: personal
estado: A
destacado: true
orden: 1
rol: Proyecto propio. Diseño, desarrollo, pruebas y documentación.
repo: https://github.com/pabloogt/WebTrustScan
web: https://webtrustscan.vercel.app/
cifras:
  - { valor: "24", etiqueta: controles de seguridad }
  - { valor: "324", etiqueta: tests automatizados }
  - { valor: "7", etiqueta: categorías de análisis }
fecha: 2026 · en desarrollo
contexto: Proyecto personal que une desarrollo y seguridad. Nació de las prácticas de auditoría web, donde la mayoría de hallazgos eran cabeceras ausentes o mal configuradas que se pueden comprobar de forma automática.
objetivo: Dar a cualquier persona un informe comprensible de la configuración de seguridad de su web, con severidad, evidencia y solución de cada hallazgo, sin hacer pruebas intrusivas.
problema: "Un servicio que hace peticiones a URLs escritas por el usuario es, por diseño, un vector de SSRF: podría usarse para alcanzar redes internas o servicios de metadatos cloud. La propia herramienta tenía que ser segura."
entorno:
  - "Next.js 16 (App Router), React 19 y TypeScript."
  - "Vitest para pruebas; laboratorio con servidores HTTP/HTTPS simulados y una CA de pruebas."
  - "Preparado para Vercel con limitación de peticiones en Upstash Redis (opcional)."
arquitectura: "Un endpoint POST /api/analyze valida la entrada y limita peticiones. Toda salida a red pasa por un único módulo (safeRequest) que valida destinos y sigue las redirecciones a mano. El motor ejecuta los controles definidos en un catálogo central y un módulo de scoring independiente calcula nota, cobertura y confianza."
herramientas:
  [Next.js, React, TypeScript, Node.js, Vitest, ESLint, Tailwind CSS]
resultados:
  - "24 controles en 7 categorías: cifrado y transporte, protecciones del navegador, cookies, CORS, contenido de la página, exposición de información y DNS/correo (SPF, DMARC, CAA)."
  - "Cada control devuelve un estado estandarizado (correcto, mejorable, fallo, informativo, no aplica, no comprobado, error); lo que no aplica no puntúa y lo no comprobado reduce la cobertura, no la nota."
  - "Protección SSRF: solo http/https en los puertos 80 y 443, bloqueo de IP privadas, loopback, link-local (incluidos metadatos cloud) y reservadas, validación de la IP dentro del mismo lookup que usa el socket (contra DNS rebinding) y comprobación de la IP a la que conectó el socket."
  - "Redirecciones seguidas manualmente (máximo 5) y revalidadas en cada salto; timeouts de 8 s por petición y 20 s por análisis; lectura de cuerpo limitada a 512 KB y descompresión a 4 MB."
  - "Límite de 10 análisis por minuto y cliente y 120 en total; Content-Security-Policy con nonce por petición en la propia aplicación."
  - "Suite de 324 tests en verde (ejecutada el 15/11/2026), sin errores de tipos ni de lint y con build de producción correcto."
problemas:
  - "El motor 1.x daba notas incoherentes: trataba un certificado caducado como error del análisis en lugar de como hallazgo, y penalizaba cabeceras duplicadas por una CDN o APIs JSON por no tener cabeceras pensadas para HTML. Se reprodujeron todas las anomalías en un laboratorio antes de corregirlas."
decisiones:
  - "Reescribir el motor (Engine 2.0) manteniendo el 1.x congelado para compararlos escenario a escenario en el laboratorio."
  - "Separar la nota de la cobertura: una web no debe salir mejor ni peor porque un control no se pudiera comprobar."
  - "No analizar webs de terceros sin autorización durante el desarrollo: la calibración se hace con sitios simulados."
limitaciones:
  - "Es un análisis externo y no autenticado: no sustituye a una prueba de intrusión."
  - "El Engine 2.0 está verificado en local; no se ha desplegado ni calibrado todavía contra webs reales propias."
  - "La exportación a PDF está implementada, pero no se ha revisado un PDF generado."
competencias:
  [
    desarrollo,
    seguridad-aplicaciones,
    automatizacion,
    vulnerabilidades,
    metodologia,
    documentacion,
  ]
enlaces:
  - texto: Visitar la web
    href: https://webtrustscan.vercel.app/
  - texto: Repositorio en GitHub
    href: https://github.com/pabloogt/WebTrustScan
---

### Escenarios del laboratorio (extracto)

| Escenario                                   | Motor 1.x | Engine 2.0   |
| ------------------------------------------- | --------- | ------------ |
| Web bien configurada                        | 100       | 100 (A)      |
| HTTPS con cabeceras deficientes             | 39        | 58 (D)       |
| Certificado caducado                        | Error TLS | 30, tope (F) |
| Cabeceras duplicadas (CDN + origen)         | 83        | 100 (A)      |
| API JSON con 401                            | 61        | 100 (A)      |
| CORS que refleja el origen con credenciales | 100       | 89, tope (B) |

Los datos salen de `tests/lab/results.json`, que el laboratorio genera levantando servidores reales en `127.0.0.1` con certificados válidos, caducados, de otro dominio y autofirmados.

### Comandos de verificación

```bash
npm test            # 324 tests
npm run typecheck
npm run lint
npm run build
```
