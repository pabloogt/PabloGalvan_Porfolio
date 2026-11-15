---
titulo: Auditoría de seguridad Wi-Fi WPA/WPA2
resumen: Análisis de tráfico en una red abierta con Wireshark, recuperación de claves WPA2-PSK por handshake y por PMKID sobre capturas proporcionadas, ataque de diccionario contra WPA2-Enterprise y rediseño de cinco topologías Wi-Fi.
area: ciberseguridad
categoria: redes
tipo: laboratorio
estado: B
destacado: true
orden: 2
fecha: Curso 2025–2026
contexto: Actividades del módulo de Hacking ético sobre comunicaciones inalámbricas. El centro proporcionó ficheros de captura (.cap/.pcap) y diccionarios; el trabajo consistió en analizarlos y en proponer un diseño seguro para una empresa.
objetivo: Entender por qué una red abierta expone el tráfico y por qué una clave WPA2-PSK débil cae ante un ataque de diccionario, y traducirlo en recomendaciones de diseño.
problema: Muchas empresas mezclan invitados y empleados en redes abiertas o con una única clave compartida que nadie rota, incluso cuando hay antiguos empleados que la conocen.
entorno:
  - "Kali Linux con Wireshark, la suite Aircrack-ng, Hashcat y John the Ripper."
  - "Capturas proporcionadas por el curso: red abierta (Free-access.cap), handshake WPA2-PSK, PMKID y logs de hostapd-wpe de WPA2-Enterprise."
herramientas: [Wireshark, Aircrack-ng, Hashcat, John the Ripper, hcxpcapngtool, Kali Linux, draw.io]
herramientasEstudiadas: [Aireplay-ng (desautenticación), Airodump-ng en captura activa]
resultados:
  - "En la red abierta se identifican Beacon, Probe Request y Probe Response del SSID, y se observa en claro el contenido de HTTP, las consultas DNS y el tráfico FTP y Telnet. En TLS solo se observa el establecimiento de la sesión, no el contenido."
  - "Se recupera la clave WPA2-PSK del handshake con Aircrack-ng y se repite con Hashcat (modo 22000). Con el primer diccionario no aparecía; con el segundo, sí."
  - "Se recupera la clave a partir de la captura PMKID, sin necesidad de un cliente conectado."
  - "Se obtienen las contraseñas de los usuarios de WPA2-Enterprise a partir de los retos MSCHAPv2 capturados por hostapd-wpe (Hashcat, modo 5500)."
  - "Se documentan cinco topologías (invitados, BYOD, corporativa, doméstica y corporativa + invitados) con su plan de contingencia."
problemas:
  - "El diccionario se entregó en .rtf y hubo que convertirlo a texto plano antes de usarlo."
  - "En la evaluación práctica no se pudo instalar hcxpcapngtool para convertir la captura PMKID; se resolvió el ejercicio con Aircrack-ng y se dejó documentado el flujo con Hashcat."
decisiones:
  - "Comparar Aircrack-ng (CPU) y Hashcat (GPU, formato 22000) sobre la misma captura."
  - "Recomendar WPA2-Enterprise con 802.1X y RADIUS para la red corporativa: credenciales individuales y revocación inmediata al dar de baja a un empleado."
  - "Separar invitados en su propia VLAN/WLAN con aislamiento de clientes y salida solo a Internet."
limitaciones:
  - "Todo el cracking se hizo sobre capturas proporcionadas, no sobre una red propia capturada en vivo."
  - "El ataque de desautenticación solo se estudió: no había una tarjeta compatible con modo monitor e inyección, y en una máquina virtual no se dispone del hardware Wi-Fi."
  - "Las claves recuperadas no se publican."
recomendaciones:
  - "Contraseñas WPA2-PSK largas y no presentes en diccionarios; migrar a WPA3 donde el hardware lo permita."
  - "En WPA2-Enterprise, validar el certificado del servidor RADIUS en los clientes para evitar puntos de acceso falsos como hostapd-wpe."
  - "Portal cautivo con credenciales temporales y monitorización de conexiones en la red de invitados."
competencias: [redes, vulnerabilidades, metodologia, documentacion]
evidencias:
  - imagen: ../../assets/evidencias/auditoria-wifi/topologia-corporativa-invitados.png
    alt: Diagrama de red con CPD formado por router, firewall externo, IPS, firewall interno, switch de distribución, controladora, MDM y servidor RADIUS, y dos puntos de acceso separados para corporativo e invitados.
    pie: Topología 5 propuesta, red corporativa e invitados con RADIUS, MDM, IPS y doble firewall.
    tipo: diseno
pendiente:
  - Copias saneadas de los informes de Wi-Fi (contienen las claves recuperadas y deben revisarse antes de publicarse).
---

### Red abierta

Con los filtros de Wireshark para tramas de gestión (`wlan.fc.type_subtype` de Beacon, Probe Request y Probe Response) se identifica el SSID y los clientes que lo buscan. Después, filtrando por `http`, `dns`, `ftp` y `telnet`, se comprueba que todo viaja sin cifrar.

### WPA2-PSK por 4-Way Handshake

```bash
aircrack-ng wpa2-psk.pcap -w diccionario.txt
hashcat -m 22000 hash.hc22000 diccionario.txt
```

Aircrack-ng prueba cada palabra del diccionario derivando la PMK y comparando el MIC del handshake. Si la clave no está en el diccionario, no se encuentra: en la evaluación, el primer diccionario no bastó.

### PMKID

```bash
aircrack-ng pmkid.pcap
hashcat -m 22000 hash.16800 /usr/share/wordlists/rockyou.txt
```

El PMKID va en el primer mensaje del handshake que envía el punto de acceso, así que no hace falta capturar a un cliente autenticándose.

### WPA2-Enterprise

A partir de los logs de hostapd-wpe (un punto de acceso falso que captura el reto y la respuesta MSCHAPv2) se extraen los hashes de cada usuario y se lanza un ataque de diccionario:

```bash
hashcat -m 5500 hashes.txt diccionario.txt
```

### Rediseño

| Red | Situación | Propuesta |
|---|---|---|
| Invitados | Abierta, mezclada con empleados | WPA2/WPA3 + portal cautivo, VLAN propia, aislamiento de clientes |
| BYOD | WPA2-PSK compartida, antiguos empleados con acceso | WPA2-Enterprise, MDM, acceso limitado a servicios concretos |
| Corporativa | WPA2-Enterprise | Validación de certificado, segmentación y monitorización |
