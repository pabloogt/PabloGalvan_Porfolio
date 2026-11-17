---
titulo: Análisis de logs de un DDoS y de ataques web con la línea de comandos
resumen: Investigación de cuatro ficheros de registro (flujos de red, servidor web, SSH y FTP) usando solo awk, grep, sort y whois, hasta reconstruir un DDoS por UDP y una cadena de reconocimiento, fuerza bruta e inyección SQL contra una aplicación web.
area: ciberseguridad
categoria: blue-team
tipo: laboratorio
estado: B
destacado: true
orden: 5
fecha: Mayo 2026
contexto: Práctica del módulo de Bastionado de redes y sistemas. Se entregaban los registros de un escenario de ataque y había que explicar qué había pasado, quién atacaba a quién y cómo, sin herramientas gráficas.
objetivo: "Responder con datos a las preguntas básicas de un analista: qué tipo de ataque es, cuál es la víctima, cuáles son los orígenes principales y qué herramientas usó el atacante."
problema: Un fichero de flujos con miles de líneas no se puede leer a mano. Hay que agregarlo por protocolo, origen y destino para que el patrón aparezca, y cruzarlo con los registros de cada servicio.
entorno:
  - "Kali Linux, terminal."
  - "Ficheros: datos_conexiones (flujos de red), access.log (servidor web), auth.log (SSH) y vsftpd.log (FTP)."
herramientas: [awk, grep, sort, uniq, sed, whois, Kali Linux]
resultados:
  - "Flujos de red: el tráfico del ataque es UDP y procede de 375 direcciones de origen distintas, 369 de ellas públicas."
  - "Una única IP interna concentra la mayor parte de paquetes, bytes y flujos: es la víctima del DDoS. Se identifican las cinco IP externas que más tráfico le envían y se consulta su red con whois."
  - "access.log: por el User-Agent se distinguen Nmap, feroxbuster (descubrimiento de rutas), Hydra (fuerza bruta contra /rest/user/login) y sqlmap, con cargas ORDER BY, UNION SELECT y PG_SLEEP."
  - "Una petición con curl contiene una inyección SQL que intenta leer la tabla de usuarios."
  - "auth.log: múltiples fallos de autenticación SSH agrupados por usuario. vsftpd.log: inicios de sesión FTP correctos y descargas de ficheros."
decisiones:
  - "Empezar siempre por la distribución por protocolo y después agregar por origen, por destino y por par origen-destino."
  - "Separar IP privadas y públicas con una expresión regular antes de contar, para quedarse con los orígenes relevantes."
  - "Usar el User-Agent como primer criterio para atribuir peticiones a cada herramienta y, después, contar las rutas atacadas."
limitaciones:
  - "Los registros son los del ejercicio: no proceden de un incidente propio."
  - "El User-Agent se puede falsificar; en un caso real habría que apoyar la atribución en más indicadores."
  - "El informe no se publica todavía: contiene direcciones IP públicas del conjunto de datos y debe revisarse."
recomendaciones:
  - "Filtrar los orígenes del DDoS y notificar a los proveedores identificados con whois."
  - "Deshabilitar el acceso FTP anónimo, proteger SSH frente a fuerza bruta y limitar intentos en el login web."
  - "Consultas parametrizadas en la aplicación y un WAF delante para las cargas de inyección más evidentes."
competencias: [logs, deteccion, automatizacion, linux, metodologia, resolucion-problemas, documentacion]
pendiente:
  - Copia saneada del informe, con las IP públicas ocultas.
---

### Agregar los flujos

```bash
# Distribución por protocolo
awk 'NR>1 {print $4}' datos_conexiones | sort | uniq -c

# Orígenes únicos del tráfico UDP y cuántos son públicos
awk 'NR>1 && $4=="UDP" {split($5,a,":"); print a[1]}' datos_conexiones | sort -u | wc -l
awk 'NR>1 && $4=="UDP" {split($5,a,":"); print a[1]}' datos_conexiones | sort -u \
  | grep -Ev '^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.)' | wc -l
```

Después se suman paquetes, bytes y flujos por IP de origen, por IP de destino y por par origen → destino, ordenando de mayor a menor. La víctima y los principales atacantes aparecen en las primeras líneas.

### Atribuir las peticiones web

```bash
# Herramientas por User-Agent
awk -F'"' '{print $6}' access.log.txt | sort | uniq -c | sort -nr

# Qué atacó cada una
grep -i "hydra"  access.log.txt | awk -F'"' '{print $2}' | sort | uniq -c | sort -nr
grep -i "sqlmap" access.log.txt | awk -F'"' '{print $2}' | sort | uniq -c | sort -nr | head -20
```

### Autenticación

```bash
grep -Ei "Failed password|authentication failure" auth.log.txt \
  | grep -oE 'user=[^ ]+|Failed password for [^ ]+' | sort | uniq -c | sort -nr
grep -Ei "CONNECT|LOGIN" vsftpd.log.txt
grep -i "DOWNLOAD" vsftpd.log.txt
```

### Cadena reconstruida

| Fase | Evidencia |
|---|---|
| Denegación de servicio | Tráfico UDP masivo desde cientos de orígenes hacia una sola IP |
| Reconocimiento | Peticiones de Nmap y feroxbuster en access.log |
| Acceso | Fuerza bruta con Hydra contra el login y fallos repetidos en SSH |
| Explotación | Cargas de sqlmap y una inyección manual con curl |
| Extracción | Sesiones FTP correctas y descargas |
