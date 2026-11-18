---
titulo: DNS, CDN y ocultación de la IP de origen
resumen: Estudio de cómo leer la infraestructura de un dominio a partir de sus registros DNS (A, AAAA, CNAME y TTL), cómo identificar una CDN y qué protege realmente un proxy como el de Cloudflare frente a ataques directos al servidor de origen.
area: ciberseguridad
categoria: redes
tipo: investigacion
estado: C
destacado: false
orden: 10
contexto: Trabajo de la especialización sobre infraestructura de dominios. Cuando una web está detrás de una CDN, los registros DNS no apuntan al servidor real; entender esa capa es necesario tanto para auditar una web como para protegerla.
objetivo: Saber interpretar las respuestas DNS de un dominio, reconocer cuándo hay una CDN delante y explicar la relación entre DNS, CDN, WAF y protección frente a DDoS.
problema: Si la dirección IP del servidor de origen es pública, un atacante puede saltarse la CDN y su WAF y atacar el servidor directamente. Ocultarla depende de cómo se configuren todos los registros, no solo el de la web.
herramientas: [nslookup, dig]
resultados:
  - "Lectura de registros A y AAAA (direcciones IPv4 e IPv6), CNAME (alias hacia otro nombre, habitual al usar una CDN) y TTL (tiempo que los resolutores guardan la respuesta)."
  - "Identificación de una CDN cuando las direcciones devueltas pertenecen al proveedor y no al alojamiento de la web."
  - "Relación entre las capas: el DNS dirige al visitante a la CDN, la CDN reparte y almacena en caché, el WAF filtra peticiones maliciosas y la red del proveedor absorbe ataques de denegación de servicio."
decisiones:
  - "Contrastar lo estudiado con la documentación oficial de Cloudflare en lugar de con fuentes de segunda mano."
limitaciones:
  - "El informe original no se conserva. La ficha recoge los conceptos estudiados y la documentación oficial; no muestra análisis de dominios concretos."
  - "Las consultas se plantean solo sobre dominios propios o de ejemplo: analizar infraestructura de terceros requiere autorización."
recomendaciones:
  - "Activar el proxy en todos los registros A, AAAA y CNAME que apunten al servidor web; un único registro sin proxy hacia la misma IP la revela."
  - "Llevar el correo y otros servicios a direcciones distintas de la del servidor web, porque los registros MX y TXT no pueden pasar por el proxy."
  - "Permitir en el servidor de origen solo el tráfico que llega desde la CDN y cambiar de IP si la anterior ya fue pública."
competencias: [redes, metodologia]
enlaces:
  - texto: Cloudflare — Proxy status (documentación oficial)
    href: https://developers.cloudflare.com/dns/manage-dns-records/reference/proxied-dns-records
  - texto: Cloudflare — Exposed IP addresses (documentación oficial)
    href: https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/exposed-ip-address/
---

### Registros que se revisan

| Registro | Qué dice | Qué indica sobre una CDN |
|---|---|---|
| A / AAAA | Dirección IPv4 / IPv6 del nombre | Si pertenece al proveedor de la CDN, el origen está oculto tras ella |
| CNAME | El nombre es un alias de otro | Un alias hacia un dominio del proveedor delata la CDN |
| TTL | Segundos que se guarda la respuesta | TTL cortos permiten cambiar de destino rápido |
| MX / TXT | Correo y verificaciones | No pasan por el proxy: pueden revelar infraestructura |

```bash
# Comandos de referencia, sobre un dominio de ejemplo
nslookup -type=A example.com
nslookup -type=AAAA example.com
nslookup -type=CNAME www.example.com
dig +noall +answer example.com A      # muestra también el TTL
```

### Qué protege el proxy de Cloudflare, según su documentación

- Con el proxy activado, las consultas DNS devuelven direcciones anycast de Cloudflare y no la del servidor de origen.
- Solo se pueden pasar por el proxy los registros que resuelven direcciones: A, AAAA y CNAME. El resto (MX, TXT…) son siempre solo DNS.
- Un registro sin proxy que apunte al mismo servidor que uno con proxy revela la IP de origen.
- Aun con el proxy, averiguar la IP de origen sigue siendo posible, aunque más difícil; y las ventajas del proxy se aplican al tráfico HTTP.
