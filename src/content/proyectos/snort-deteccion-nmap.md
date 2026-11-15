---
titulo: Detección de escaneos Nmap con reglas Snort
resumen: Regla Snort propia para detectar escaneos TCP SYN, ajustada con un umbral de 15 SYN en 10 segundos por IP de origen para reducir falsos positivos, y análisis de cómo un escaneo lento la evade.
area: ciberseguridad
categoria: blue-team
tipo: laboratorio
estado: B
destacado: true
orden: 3
fecha: Mayo 2026
contexto: Ejercicio del módulo de Incidentes. El escaneo de puertos es una de las primeras acciones de un atacante y uno de los patrones más fáciles de detectar, siempre que la regla no alerte también con el tráfico legítimo.
objetivo: Escribir una regla de detección, comprobar que salta con un escaneo real, reducir sus falsos positivos y estudiar sus límites.
problema: Toda conexión TCP legítima empieza con un SYN. Una regla que alerte por cada SYN no distingue un escaneo de un usuario abriendo una web o una sesión SSH.
entorno:
  - "Ubuntu Server con Snort (IDS y objetivo): 192.168.100.10/24 en red interna, más un adaptador NAT solo para instalar paquetes."
  - "Kali Linux (atacante): 192.168.100.20/24 en la misma red interna."
herramientas: [Snort, Nmap, Kali Linux, Ubuntu Server, VirtualBox]
resultados:
  - "La configuración se valida con snort -T antes y después de añadir la regla."
  - "Un escaneo nmap -sS -Pn -p 1-1000 desde Kali genera la alerta «POSIBLE ESCANEO NMAP TCP SYN - MULTIPLES PUERTOS» con origen 192.168.100.20 (ver captura)."
problemas:
  - "La primera versión de la regla (solo flags:S) alertaría con cualquier conexión normal: es un falso positivo por diseño."
  - "Hay que monitorizar la interfaz de red interna y no la NAT; si Snort escucha en la interfaz equivocada, no ve el escaneo."
decisiones:
  - "Usar detection_filter con track by_src, count 15, seconds 10: la alerta solo salta cuando una misma IP envía 15 SYN en 10 segundos, un patrón propio de un barrido de puertos."
  - "Usar flow:stateless para evaluar cada SYN sin depender de que la conexión llegue a establecerse (en un escaneo SYN no se completa)."
  - "Proponer una segunda regla para escaneos lentos (30 SYN en 60 segundos), dejando claro el coste: más riesgo de falsos positivos con servicios que abren muchas conexiones."
limitaciones:
  - "La evasión con --max-rate 1 se razonó y se lanzó, pero el informe no incluye captura de la consola durante esa prueba. El resultado («Snort puede no generar alerta») es esperado, no está demostrado con evidencia."
  - "El informe tiene pequeñas incoherencias que conviene corregir: la regla se declara como rev:3 pero la alerta capturada muestra la revisión 2, y en algunos comandos aparece enp0s8 en lugar de enp0s3."
  - "Una regla basada solo en frecuencia no detecta escaneos distribuidos desde varias IP ni escaneos muy lentos."
recomendaciones:
  - "Repetir la prueba de evasión guardando la salida de Snort para dejarla demostrada."
  - "Complementar con el preprocesador de escaneos de Snort o con correlación en un SIEM sobre ventanas de tiempo largas."
competencias: [deteccion, monitorizacion, redes, linux, metodologia, resolucion-problemas, documentacion]
evidencias:
  - imagen: ../../assets/evidencias/snort-deteccion-nmap/alertas-escaneo.png
    alt: Consola de Snort con una lista de alertas POSIBLE ESCANEO NMAP TCP SYN MULTIPLES PUERTOS desde 192.168.100.20 hacia distintos puertos de 192.168.100.10.
    pie: Alertas generadas durante el escaneo SYN de los puertos 1-1000.
documentos:
  - titulo: Informe del ejercicio (saneado)
    href: /documentos/snort-deteccion-nmap.pdf
pendiente:
  - Captura de la consola de Snort durante el escaneo con --max-rate 1.
---

### Regla inicial

```text
alert tcp $EXTERNAL_NET any -> $HOME_NET 1:65535 (msg:"POSIBLE ESCANEO NMAP TCP SYN"; flags:S; flow:stateless; sid:1000001; rev:1;)
```

Detecta el patrón, pero salta con cualquier conexión: SSH, HTTP o HTTPS empiezan igual.

### Regla ajustada con umbral

```text
alert tcp $EXTERNAL_NET any -> $HOME_NET 1:65535 (msg:"POSIBLE ESCANEO NMAP TCP SYN - MULTIPLES PUERTOS"; flags:S; flow:stateless; detection_filter:track by_src, count 15, seconds 10; sid:1000001; rev:3;)
```

Una conexión legítima produce uno o pocos SYN. Un escaneo produce decenas o cientos en pocos segundos hacia puertos distintos.

### Validación

```bash
# Ubuntu: comprobar sintaxis y arrancar en consola
sudo snort -T -c /etc/snort/snort.conf -i enp0s3
sudo snort -A console -q -c /etc/snort/snort.conf -i enp0s3

# Kali: escaneo rápido
sudo nmap -sS -Pn -p 1-1000 192.168.100.10
```

### Estudio de evasión

```bash
sudo nmap -sS -Pn -p 1-100 --max-rate 1 192.168.100.10
```

A un paquete por segundo, en 10 segundos se envían unos 10 SYN, por debajo del umbral de 15. La regla no debería saltar.

| Prueba | Comando | Resultado |
|---|---|---|
| Escaneo rápido | `nmap -sS -Pn -p 1-1000` | Alerta registrada (captura) |
| Escaneo lento | `nmap -sS -Pn -p 1-100 --max-rate 1` | Sin alerta esperada; no capturado |

### Mejora propuesta

```text
alert tcp $EXTERNAL_NET any -> $HOME_NET 1:65535 (msg:"POSIBLE ESCANEO LENTO TCP SYN"; flags:S; flow:stateless; threshold:type threshold, track by_src, count 30, seconds 60; sid:1000002; rev:1;)
```
