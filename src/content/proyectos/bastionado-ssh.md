---
titulo: Bastionado del servicio SSH en Linux
resumen: "Endurecimiento de OpenSSH para un caso de empresa: solo claves ed25519, sin root, usuario e IP restringidos, sin túneles ni reenvíos, banner legal, MAC SHA-2 y logging detallado, con pruebas de acceso permitido y denegado."
area: ciberseguridad
categoria: linux
tipo: laboratorio
estado: B
destacado: true
orden: 1
fecha: Mayo 2026
contexto: Práctica del módulo de Bastionado de redes y sistemas. SSH es el servicio de administración remota por excelencia y, precisamente por eso, uno de los más atacados.
objetivo: Reducir la superficie de ataque del servicio SSH sin perder la capacidad de administrar el servidor, y comprobar cada control con una prueba.
problema: Una instalación por defecto de OpenSSH permite contraseñas, reenvío de puertos y X11, y no limita qué usuarios ni desde dónde pueden entrar. Eso facilita la fuerza bruta, el uso de cuentas privilegiadas y los túneles no autorizados.
entorno:
  - "Servidor Ubuntu 22.04 con OpenSSH Server."
  - "Cliente Linux del administrador con el usuario acmeadmin."
herramientas: [OpenSSH, ssh-keygen, ssh-copy-id, Ubuntu Server]
resultados:
  - "El usuario autorizado (acmeadmin) inicia sesión con su clave ed25519 y ve el banner legal."
  - "root@servidor es rechazado: «Permission denied (publickey)»."
  - "Otro usuario del sistema (pablo) es rechazado aunque exista en el servidor."
  - "Forzando el cliente a no usar clave (-o PubkeyAuthentication=no), el acceso por contraseña se rechaza."
problemas:
  - "Las pruebas de port forwarding (ssh -L) y de X11 (ssh -X) terminaron también en «Permission denied (publickey)», es decir, se rechazaron en la autenticación. Por tanto no demuestran por sí solas que AllowTcpForwarding no y X11Forwarding no funcionen: habría que repetirlas con una sesión autenticada."
  - "El informe muestra IPs distintas en la línea AllowUsers y en su explicación (192.168.100.x frente a 192.168.1.50/51). La configuración aplicada es la de 192.168.100.x."
decisiones:
  - "Crear un usuario administrativo propio con sudo en lugar de entrar como root."
  - "Usar claves ed25519 y proteger permisos (700 en .ssh, 600 en la clave privada y en authorized_keys): OpenSSH rechaza claves con permisos laxos."
  - "Combinar usuario e IP de origen en AllowUsers (usuario@IP) para que una credencial robada no sirva desde otro equipo."
  - "Fijar MACs hmac-sha2-512 y hmac-sha2-256 para la integridad de la sesión y LogLevel VERBOSE para registrar la huella de la clave usada en cada acceso."
limitaciones:
  - "Las pruebas de reenvío de puertos y X11 no llegaron a ejecutarse con sesión iniciada (ver problemas)."
  - "No se comprobó el cierre por inactividad (ClientAliveInterval 300) con una prueba cronometrada."
  - "No se añadió protección frente a fuerza bruta a nivel de red (Fail2ban o reglas de firewall)."
recomendaciones:
  - "Repetir las pruebas de -L y -X desde una sesión autenticada desde una IP permitida."
  - "Añadir Fail2ban o limitar SSH por firewall a la red de administración."
  - "Validar la configuración con sshd -t y auditarla con ssh-audit."
competencias: [linux, sistemas, metodologia, resolucion-problemas, documentacion]
evidencias:
  - imagen: ../../assets/evidencias/bastionado-ssh/banner-legal.png
    alt: Fichero /etc/issue.net con el banner legal de ACME SL.
    pie: Banner legal mostrado antes de iniciar sesión.
  - imagen: ../../assets/evidencias/bastionado-ssh/root-denegado.png
    alt: Intento ssh root@192.168.100.20 que muestra el banner y termina en Permission denied publickey.
    pie: El acceso remoto de root se rechaza.
  - imagen: ../../assets/evidencias/bastionado-ssh/password-denegado.png
    alt: Intento ssh con PubkeyAuthentication=no rechazado por el servidor.
    pie: "Sin clave pública no hay acceso: la autenticación por contraseña está desactivada."
  - imagen: ../../assets/evidencias/bastionado-ssh/forwarding-prueba.png
    alt: Intento ssh -L 8080:localhost:80 que termina en Permission denied publickey.
    pie: Prueba de port forwarding. Se rechazó en la autenticación, por lo que no valida la directiva AllowTcpForwarding.
documentos:
  - titulo: Informe completo de la práctica (saneado)
    href: /documentos/bastionado-ssh.pdf
---

### Configuración aplicada en `/etc/ssh/sshd_config`

```text
Port 22
PermitRootLogin no
ClientAliveInterval 300
ClientAliveCountMax 0
PubkeyAuthentication yes
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitEmptyPasswords no
AllowUsers acmeadmin@192.168.100.1 acmeadmin@192.168.100.20
IgnoreRhosts yes
HostbasedAuthentication no
AllowTcpForwarding no
X11Forwarding no
AllowAgentForwarding no
PermitTunnel no
Banner /etc/issue.net
MACs hmac-sha2-512,hmac-sha2-256
SyslogFacility AUTHPRIV
LogLevel VERBOSE
```

### Claves y permisos

```bash
ssh-keygen -t ed25519 -C "acmeadmin@ACME"
ssh-copy-id acmeadmin@<servidor>
chmod 700 ~/.ssh && chmod 600 ~/.ssh/id_ed25519 && chmod 644 ~/.ssh/id_ed25519.pub
sudo chmod 700 /home/acmeadmin/.ssh
sudo chmod 600 /home/acmeadmin/.ssh/authorized_keys
sudo chown -R acmeadmin:acmeadmin /home/acmeadmin/.ssh
```

### Batería de pruebas

| Prueba | Comando | Resultado observado |
|---|---|---|
| Root remoto | `ssh root@servidor` | Denegado (publickey) |
| Usuario autorizado | `ssh acmeadmin@servidor` | Acceso correcto con banner |
| Usuario no autorizado | `ssh pablo@servidor` | Denegado (publickey) |
| Contraseña | `ssh -o PubkeyAuthentication=no acmeadmin@servidor` | Denegado |
| Port forwarding | `ssh -L 8080:localhost:80 acmeadmin@servidor` | Denegado en autenticación (no concluyente) |
| X11 | `ssh -X acmeadmin@servidor` | Denegado en autenticación (no concluyente) |
