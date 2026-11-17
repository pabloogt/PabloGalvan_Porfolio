---
titulo: Captura y análisis de tráfico con tcpdump, tshark y Wireshark
resumen: Despliegue de servicios HTTP, FTP, DNS y SMTP en un escenario con tres subredes, captura con tcpdump, dumpcap y tshark, y análisis en Wireshark reconstruyendo sesiones y extrayendo ficheros transmitidos en claro.
area: ciberseguridad
categoria: redes
tipo: laboratorio
estado: B
destacado: false
orden: 4
fecha: Curso 2025–2026
contexto: Actividad del módulo de Hacking ético sobre sniffing.
objetivo: Manejar las herramientas de captura por línea de comandos, escribir filtros precisos y comprobar qué información viaja sin cifrar.
problema: Capturar «todo» produce ficheros enormes e inútiles. Hay que filtrar en la captura por red y puerto, y saber reconstruir después una conversación completa.
entorno:
  - "Kali Linux con servicios Apache y vsftpd (192.168.10.10), cliente con DNS (192.168.20.10) y cliente con SMTP (192.168.30.10)."
herramientas: [tcpdump, tshark, dumpcap, Wireshark, Apache, vsftpd, BIND, Postfix]
resultados:
  - "Capturas filtradas por subred y puerto con las tres herramientas, incluidas capturas específicas de DNS y SMTP."
  - "Capturas rotadas por tamaño con dumpcap."
  - "Reconstrucción de conversaciones con Follow TCP Stream y extracción de ficheros con Export Objects."
  - "Comparativa razonada entre tcpdump, tshark y dumpcap."
decisiones:
  - "Aplicar el filtro en la captura (BPF) y no solo en la visualización, para reducir el volumen desde el origen."
limitaciones:
  - "El informe incluye la contraseña del usuario FTP de prueba; no se publica sin sanear."
recomendaciones:
  - "Sustituir FTP y Telnet por SFTP y SSH, y HTTP por HTTPS."
competencias: [redes, logs, linux, documentacion]
pendiente:
  - Copia saneada del informe con las capturas de Wireshark.
---

```bash
# Captura general limitada a las subredes y puertos del laboratorio
sudo tcpdump -i any -s 0 -w ~/captures/general.pcap \
  '(net 192.168.10.0/24 or net 192.168.20.0/24 or net 192.168.30.0/23) and (port 80 or port 21 or port 53 or port 25)'

# Solo DNS
sudo tcpdump -i any -s 0 -w /tmp/dns_lab.pcap 'port 53'

# tshark con filtro de captura
sudo tshark -i any -s 0 -w tshark_filtered.pcap -f 'tcp port 80 or tcp port 21'
```
