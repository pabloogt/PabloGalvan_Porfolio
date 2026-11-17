---
titulo: Bastionado de un servidor Linux — auditoría, firewall y autenticación
resumen: Tres prácticas agrupadas sobre Ubuntu Server — auditoría con Lynis, firewall UFW y Fail2ban; ciclo de escaneo con Nmap y cierre de servicios; y un servidor FreeRADIUS con un cliente autorizado.
area: ciberseguridad
categoria: linux
tipo: laboratorio
estado: B
destacado: false
orden: 2
fecha: Curso 2025–2026
contexto: Laboratorios del módulo de Bastionado de redes y sistemas, centrados en reducir la superficie de ataque de un servidor recién instalado.
objetivo: Medir el estado inicial de un servidor, aplicar controles y volver a medir.
problema: Un servidor con los servicios por defecto (Telnet, FTP, MySQL accesible desde cualquier origen, SSH con contraseña) expone mucho más de lo que necesita.
entorno:
  - "Ubuntu Server como equipo a proteger y Kali Linux para escanearlo."
  - "Ubuntu Server con FreeRADIUS y Ubuntu Desktop como cliente."
herramientas: [Lynis, UFW, Fail2ban, Nmap, OpenSSH, FreeRADIUS, radtest]
resultados:
  - "Auditoría inicial con lynis audit system y revisión de las recomendaciones."
  - "UFW con política de denegar lo entrante y permitir lo saliente; reglas para SSH y HTTP, y MySQL limitado a la red local."
  - "Fail2ban con una jaula para SSH definida en jail.local."
  - "Escaneos con Nmap (SYN, versiones, sistema operativo y scripts) antes del bastionado para identificar Telnet, FTP, SSH, HTTP y MySQL."
  - "SSH sin acceso de root, sin contraseñas y en un puerto no estándar, con copia previa de sshd_config."
  - "FreeRADIUS con un cliente definido en clients.conf, un usuario de prueba y verificación con radtest desde el equipo cliente."
decisiones:
  - "Hacer copia de cada fichero de configuración antes de modificarlo."
  - "Abrir solo los puertos necesarios y restringir por origen los servicios internos."
limitaciones:
  - "Los informes incluyen el secreto compartido de RADIUS usado en la práctica; no se publican sin sanear."
  - "No hay en la ficha una comparación numérica del índice de Lynis antes y después."
competencias: [linux, sistemas, redes, metodologia]
pendiente:
  - Copias saneadas de los tres informes y captura del escaneo posterior al bastionado.
---

```bash
# Auditoría
sudo lynis audit system > reporte_lynis.txt

# Firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow from 192.168.1.0/24 to any port 3306
sudo ufw enable

# Escaneo desde Kali
sudo nmap -sS -sV -O -v <objetivo>
sudo nmap -p 21,22,23,80,3306 -sV -v <objetivo> -oN scan_puertos.txt

# Prueba de RADIUS desde el cliente
radtest <usuario> <contraseña> <servidor> 0 <secreto>
```

La práctica de [bastionado de SSH](/proyectos/bastionado-ssh/) desarrolla con más detalle la configuración de `sshd_config`.
