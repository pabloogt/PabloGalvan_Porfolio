---
titulo: Diseño de una red corporativa segura en Cisco Packet Tracer
resumen: Sede central y dos sucursales con VLAN por función (corporativa, DMZ, usuarios, IoT), OSPF, ACL contra el movimiento lateral, protección de la DMZ, syslog hacia un servidor IDS y VPN IPsec site-to-site verificada.
area: ciberseguridad
categoria: redes
tipo: laboratorio
estado: B
destacado: false
orden: 1
fecha: Curso 2025–2026
contexto: Laboratorio de la unidad de Diseño de redes seguras (Bastionado de redes y sistemas) para una empresa ficticia, ACME, con oficina central y dos sucursales.
objetivo: Diseñar la red, segmentarla, controlar el tráfico entre segmentos, cifrar las comunicaciones entre sedes y centralizar los registros de seguridad.
problema: En una red plana, un dispositivo IoT comprometido (por ejemplo, una impresora con firmware antiguo) puede alcanzar los equipos de usuarios, la DMZ y las otras sedes, y el tráfico entre sedes viaja sin cifrar.
entorno:
  - "Sede central (HQ): router 2911 R-corp, switch 2960, servidor web en la DMZ (10.10.50.10) y servidor IDS-SYSLOG (10.10.50.20)."
  - "Sucursal 1 y sucursal 2: router, switch, PC de usuarios e impresora en VLAN IoT."
  - "Enlaces WAN serie entre routers (172.16.0.0/30 y 172.16.0.4/30)."
arquitectura: "Cada sede usa router-on-a-stick: un enlace trunk desde el switch y una subinterfaz 802.1Q por VLAN. Las VLAN son 10 (corporativa), 40 (IoT) y 50 (DMZ) en la sede central; 110 y 140 (usuarios e IoT) en la sucursal 1; 210 y 240 en la sucursal 2. Los routers hacen también de firewall con ACL extendidas, porque la topología no incluye firewalls dedicados."
herramientas: [Cisco Packet Tracer, Cisco IOS, OSPF, ACL extendidas, IPsec / ISAKMP, Syslog]
resultados:
  - "Conectividad entre las tres sedes mediante OSPF en el área 0 (adyacencias en estado FULL en la consola)."
  - "Las ACL IOT_BR1_POLICY e IOT_BR2_POLICY quedan cargadas en los routers de sucursal (show access-lists): impresión solo desde los usuarios de la sede (puertos 9100, 515 y 631) y denegación desde las otras sedes."
  - "Con la ACL DMZ_PROTECTION aplicada, el ping desde la sucursal 1 al servidor web de la DMZ falla («Destination host unreachable» devuelto por el router central, 100 % de pérdida)."
  - "El router central inicia el envío de registros al servidor IDS-SYSLOG (mensaje «Logging to host 10.10.50.20 port 514 started»)."
  - "El túnel IPsec entre la sede central y la sucursal 1 aparece con estado ACTIVE (show crypto isakmp sa) y el ping entre sedes responde."
problemas:
  - "Los routers no tenían interfaces serie: hubo que apagarlos y añadir el módulo HWIC-2T."
  - "Los comandos crypto no estaban disponibles hasta activar el paquete de licencia securityk9 y reiniciar el router."
  - "Tras la primera versión se detectó que faltaban la VLAN corporativa en el router central y las VLAN IoT en las sucursales; se rediseñó la topología añadiendo un PC corporativo y una impresora por sede."
decisiones:
  - "Aplicar la política IoT en la subinterfaz de la VLAN IoT para cortar el movimiento lateral lo más cerca posible del origen."
  - "Crear también la VLAN IoT en la sede central aunque aún no tenga dispositivos, para dejar preparada la segmentación."
  - "Añadir log a las reglas deny de la DMZ y enviar los registros al servidor IDS-SYSLOG con marca de tiempo en milisegundos."
limitaciones:
  - "Es una simulación en Packet Tracer: no hay tráfico real ni un IDS que analice paquetes; el «IDS» es un servidor syslog."
  - "La VPN usa clave precompartida, grupo Diffie-Hellman 2 y AES con SHA-1, valores aceptables en el ejercicio pero débiles hoy."
  - "Las reglas finales «permit ip any any» dejan pasar el resto del tráfico; la política no es de mínimo privilegio."
  - "La captura del servicio syslog del servidor IDS muestra la tabla de mensajes vacía: el envío está configurado, pero la recepción de eventos no queda demostrada."
  - "Revisión posterior: DMZ_PROTECTION filtra por origen en las sucursales pero se aplica de entrada (in) en la subinterfaz de la DMZ, por donde ese tráfico sale. Del mismo modo, la regla IoT → usuarios se aplica de salida en la VLAN IoT. El sentido de aplicación debería revisarse para que cada regla actúe sobre el tráfico que pretende filtrar."
recomendaciones:
  - "Aplicar DMZ_PROTECTION de salida (out) en la subinterfaz de la DMZ, o de entrada en las interfaces WAN, y repetir las pruebas comprobando los contadores de cada regla con show access-lists."
  - "Usar grupos DH de 14 en adelante, SHA-256 e IKEv2 en un entorno real."
  - "Sustituir las reglas permisivas finales por una lista explícita de servicios permitidos entre sedes."
competencias: [redes, metodologia, resolucion-problemas, documentacion]
evidencias:
  - imagen: ../../assets/evidencias/red-segura-packet-tracer/topologia-final.png
    alt: Topología de Packet Tracer con el router central conectado por enlaces serie a dos routers de sucursal, switches, PC, portátiles, impresoras y los servidores WEB-DMZ e IDS-SYSLOG.
    pie: Topología final tras añadir la VLAN corporativa y las impresoras de la zona IoT.
  - imagen: ../../assets/evidencias/red-segura-packet-tracer/isakmp-sa.png
    alt: Salida de show crypto isakmp sa con un túnel entre 172.16.0.1 y 172.16.0.2 en estado ACTIVE.
    pie: Asociación de seguridad ISAKMP activa entre la sede central y la sucursal 1.
  - imagen: ../../assets/evidencias/red-segura-packet-tracer/ping-vpn.png
    alt: Ping desde un PC de sucursal hacia 10.10.10.10 con cuatro respuestas correctas.
    pie: Ping desde la sucursal al PC corporativo a través de la VPN.
documentos:
  - titulo: Informe completo del laboratorio (saneado)
    href: /documentos/red-segura-packet-tracer.pdf
    nota: Se ha ocultado la clave precompartida de la VPN.
---

### Plan de direccionamiento

| VLAN | Uso | Red |
|---|---|---|
| 10 | Corporativa (HQ) | 10.10.10.0/24 |
| 40 | IoT (HQ) | 10.10.40.0/24 |
| 50 | DMZ (HQ) | 10.10.50.0/24 |
| 110 | Usuarios sucursal 1 | 10.20.10.0/24 |
| 140 | IoT sucursal 1 | 10.20.40.0/24 |
| 210 | Usuarios sucursal 2 | 10.30.10.0/24 |
| 240 | IoT sucursal 2 | 10.30.40.0/24 |

### Segmentación en el router (ejemplo de la sucursal 1)

```text
interface g0/0.110
 encapsulation dot1Q 110
 ip address 10.20.10.1 255.255.255.0
interface g0/0.140
 encapsulation dot1Q 140
 ip address 10.20.40.1 255.255.255.0
router ospf 1
 network 10.20.10.0 0.0.0.255 area 0
 network 10.20.40.0 0.0.0.255 area 0
 network 172.16.0.0 0.0.0.3 area 0
```

### Política de la zona IoT

```text
ip access-list extended IOT_BR1_POLICY
 permit tcp 10.20.10.0 0.0.0.255 host 10.20.40.10 eq 9100
 permit tcp 10.20.10.0 0.0.0.255 host 10.20.40.10 eq 515
 permit tcp 10.20.10.0 0.0.0.255 host 10.20.40.10 eq 631
 permit icmp 10.20.10.0 0.0.0.255 host 10.20.40.10
 deny ip 10.10.0.0 0.0.255.255 host 10.20.40.10
 deny ip 10.30.0.0 0.0.255.255 host 10.20.40.10
 deny ip 10.20.40.0 0.0.0.255 10.20.10.0 0.0.0.255
 permit ip 10.20.40.0 0.0.0.255 any
```

### Protección de la DMZ y registro

```text
ip access-list extended DMZ_PROTECTION
 permit ip 10.10.10.0 0.0.0.255 10.10.50.0 0.0.0.255
 deny ip 10.20.10.0 0.0.0.255 10.10.50.0 0.0.0.255 log
 deny ip 10.30.10.0 0.0.0.255 10.10.50.0 0.0.0.255 log
 permit ip any any
interface g0/0.50
 ip access-group DMZ_PROTECTION in
logging 10.10.50.20
service timestamps log datetime msec
```

### VPN site-to-site

```text
crypto isakmp policy 10
 encr aes
 hash sha
 authentication pre-share
 group 2
crypto isakmp key [oculta] address 172.16.0.2
crypto ipsec transform-set TS esp-aes esp-sha-hmac
crypto map VPNMAP 10 ipsec-isakmp
 set peer 172.16.0.2
 set transform-set TS
 match address VPN_BR1
```

Verificación: `show crypto isakmp sa` y `show crypto ipsec sa` tras generar tráfico entre sedes.
