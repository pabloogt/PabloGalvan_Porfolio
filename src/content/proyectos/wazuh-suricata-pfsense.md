---
titulo: Laboratorio perimetral con pfSense, Suricata y Wazuh
resumen: Firewall pfSense con reglas propias, sensor Suricata y SIEM Wazuh con agente registrado y activo. El análisis de las capturas muestra que Suricata arrancó sin reglas cargadas, lo que explica que no se documenten alertas.
area: ciberseguridad
categoria: blue-team
tipo: laboratorio
estado: B
destacado: true
orden: 4
fecha: Octubre 2025
contexto: Tercer laboratorio de Bastionado de redes y sistemas. Reunía en un mismo segmento un firewall perimetral, un IDS/IPS y un SIEM para practicar la protección y monitorización del perímetro.
objetivo: Desplegar firewall, IDS y SIEM, integrarlos mediante un agente y generar tráfico sospechoso para revisarlo desde el SIEM.
problema: Cada componente por separado ve solo una parte. La integración —el agente que lleva los eventos del sensor al SIEM— es lo que permite revisar todo en un mismo panel.
entorno:
  - "pfSense: WAN en NAT y LAN en red interna (192.168.50.1/24, DHCP .10–.100)."
  - "Ubuntu Desktop 22.04 con Suricata 8.0 y agente Wazuh 4.14 (192.168.50.11)."
  - "Ubuntu Desktop con Wazuh manager y dashboard 4.14 (192.168.50.12, 4 GB de RAM)."
  - "Ubuntu Desktop adicional para lanzar pruebas con Nmap."
herramientas: [pfSense, Suricata, Wazuh, Nmap, Ubuntu, VirtualBox]
resultados:
  - "pfSense queda instalado con reglas de paso LAN→WAN, entrada SSH/HTTP/HTTPS y bloqueo final, aplicadas desde la interfaz web."
  - "Suricata queda instalado, configurado sobre enp0s3 en suricata.yaml y en ejecución como servicio."
  - "Wazuh manager y dashboard arrancan y el agente suricata-agent (ID 001, 192.168.50.11) aparece como Active en agent_control -lc y en la sección de agentes del dashboard."
  - "Los escaneos nmap -sS desde la máquina de pruebas se lanzan correctamente contra el sensor."
problemas:
  - "La IP LAN por defecto de pfSense (192.168.1.1) coincidía con el router de casa; se cambió la LAN a 192.168.50.1 desde la consola."
  - "Si no se retira la ISO tras la instalación, pfSense vuelve a arrancar el instalador."
  - "El usuario de Ubuntu no tenía sudo; se añadió al grupo desde root."
  - "apt-key está obsoleto en Ubuntu 22.04 y la instalación de Wazuh fallaba con NO_PUBKEY: se resolvió descargando la clave con gpg --dearmor a /usr/share/keyrings y usando signed-by en el repositorio."
  - "En el arranque de Suricata aparecen los avisos «No rule files match the pattern» y «1 rule files specified, but no rules were loaded»: el sensor estaba funcionando sin firmas."
decisiones:
  - "Separar sensor (Suricata) y SIEM (Wazuh) en máquinas distintas, con el agente como único canal entre ambos."
  - "Terminar la política del firewall con una regla de bloqueo explícita tras las reglas de servicios permitidos."
  - "Registrar el agente manualmente con manage_agents para entender el intercambio de claves."
limitaciones:
  - "No hay evidencia de alertas de Suricata ni de su llegada a Wazuh. La causa más probable, visible en las capturas, es que Suricata no tenía reglas cargadas."
  - "El apartado de DVWA y SQL injection está planteado como instrucciones, pero no hay capturas de su ejecución ni de las alertas resultantes."
  - "El informe original incluía la contraseña del dashboard y las claves de registro del agente; en la copia publicada se han retirado."
recomendaciones:
  - "Cargar firmas con suricata-update (por ejemplo ET Open), reiniciar y comprobar en fast.log y eve.json antes de repetir las pruebas."
  - "Añadir en ossec.conf del agente un bloque localfile para /var/log/suricata/eve.json en formato json, y verificar las alertas en Security Events."
  - "Cambiar la contraseña generada por el instalador y no reflejar credenciales en la documentación."
competencias: [monitorizacion, deteccion, redes, linux, sistemas, resolucion-problemas, documentacion]
evidencias:
  - imagen: ../../assets/diagramas/wazuh-lab.svg
    alt: Diagrama con pfSense entre la WAN y la LAN interna, donde están el sensor Suricata con agente Wazuh, el servidor Wazuh y una máquina de pruebas.
    pie: Arquitectura del laboratorio reconstruida a partir del informe y las capturas.
    tipo: diagrama
  - imagen: ../../assets/evidencias/wazuh-suricata-pfsense/reglas-pfsense.png
    alt: Lista de reglas del firewall de pfSense con reglas de paso para HTTPS, HTTP y SSH y una regla de bloqueo.
    pie: Reglas del firewall aplicadas en pfSense.
  - imagen: ../../assets/evidencias/wazuh-suricata-pfsense/agente-activo.png
    alt: Salida de agent_control -lc mostrando el servidor y el agente suricata-agent con IP 192.168.50.11 en estado Active.
    pie: El agente del sensor registrado y activo en el manager de Wazuh.
  - imagen: ../../assets/evidencias/wazuh-suricata-pfsense/suricata-sin-reglas.png
    alt: Estado del servicio Suricata activo con avisos de que no se encontraron ficheros de reglas.
    pie: Suricata en ejecución, pero con el aviso de que no se cargaron reglas.
  - imagen: ../../assets/evidencias/wazuh-suricata-pfsense/nmap-prueba.png
    alt: Salida de nmap -sS contra 192.168.50.11 con todos los puertos cerrados.
    pie: Escaneos de prueba contra el sensor.
documentos:
  - titulo: Informe de la práctica (saneado)
    href: /documentos/wazuh-suricata-pfsense.pdf
    nota: Se han retirado la contraseña del dashboard, las capturas con claves de agente y las credenciales de ejemplo de DVWA.
pendiente:
  - Capturas de alertas de Suricata (fast.log o eve.json) con reglas cargadas.
  - Capturas de esas alertas en Security Events de Wazuh.
---

### Firewall

En **Firewall › Rules** se definieron, por este orden: paso de LAN hacia WAN, entrada TCP a la dirección WAN en los puertos 22, 80 y 443, y una regla final de bloqueo para el resto del tráfico.

### Sensor Suricata

```bash
sudo add-apt-repository ppa:oisf/suricata-stable -y
sudo apt update && sudo apt install suricata -y
# /etc/suricata/suricata.yaml → af-packet: - interface: enp0s3
sudo systemctl enable --now suricata
tail -f /var/log/suricata/fast.log
```

### Repositorio de Wazuh en Ubuntu 22.04

```bash
sudo rm -f /etc/apt/sources.list.d/wazuh.list
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg
echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt stable main" | sudo tee /etc/apt/sources.list.d/wazuh.list
sudo apt update && sudo apt install wazuh-manager -y
```

### Agente en el sensor

```xml
<client>
  <server>
    <address>192.168.50.12</address>
    <port>1514</port>
    <protocol>tcp</protocol>
  </server>
</client>
```

El agente se dio de alta en el manager con `manage_agents` y se importó su clave en el sensor. `agent_control -lc` confirma que está activo.

### Pruebas

```bash
nmap -sS -Pn -T4 192.168.50.11
sudo nmap -sS -p- -T4 192.168.50.11
```
