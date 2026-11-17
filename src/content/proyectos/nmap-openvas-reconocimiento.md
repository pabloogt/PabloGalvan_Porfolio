---
titulo: Reconocimiento por fases con Nmap y preparación de OpenVAS
resumen: Metodología de escaneo en una red de laboratorio con tres subredes — descubrimiento de hosts, puertos comunes, todos los puertos con versiones, scripts NSE y UDP — con resultados guardados en una estructura ordenada e importación a OpenVAS/GVM.
area: ciberseguridad
categoria: redes
tipo: laboratorio
estado: B
destacado: false
orden: 3
fecha: Octubre 2025
contexto: Actividad del módulo de Hacking ético sobre recolección de información y evaluación de vulnerabilidades.
objetivo: Aprender a escanear de menos a más, guardando cada resultado de forma que se pueda reutilizar y auditar.
problema: Lanzar un escaneo completo contra toda una red es lento, ruidoso y difícil de interpretar. Hacerlo por fases permite acotar primero qué hosts existen y profundizar solo donde hay algo.
entorno:
  - "Kali Linux con tres adaptadores en redes internas (192.168.10.0/24, 192.168.11.0/24 y 192.168.12.0/23) y uno NAT."
  - "Servicios SSH y Apache instalados para tener algo que detectar."
herramientas: [Nmap, Nmap Scripting Engine, OpenVAS / GVM, Kali Linux]
resultados:
  - "Estructura de carpetas por subred y una carpeta de resultados consolidados; cada escaneo se guarda con -oA en los tres formatos."
  - "Descubrimiento con -sn, extracción de hosts vivos a fichero con grep y awk y lista consolidada sin duplicados."
  - "Escaneos SYN de puertos comunes y de los 65 535 puertos con detección de versiones, leyendo los objetivos desde fichero."
  - "Scripts por defecto de NSE y escaneo UDP selectivo."
problemas:
  - "Apache no arrancaba porque OpenVAS ya ocupaba el puerto 80: se localizó el proceso con lsof y se movió Apache al 8080."
  - "GVM no había terminado de sincronizar sus datos y no ofrecía configuraciones de escaneo, por lo que la tarea de OpenVAS no llegó a ejecutarse."
decisiones:
  - "Limitar reintentos y tiempo por host (--max-retries, --host-timeout) para que un equipo que no responde no bloquee el escaneo."
  - "Reservar el script vuln para objetivos con autorización expresa."
limitaciones:
  - "El análisis con OpenVAS no se completó: no hay informe de vulnerabilidades."
  - "La red era de laboratorio y los únicos servicios eran los instalados para la práctica."
competencias: [redes, vulnerabilidades, automatizacion, metodologia, documentacion]
pendiente:
  - Repetir la parte de OpenVAS con los feeds sincronizados y guardar el informe.
---

```bash
# 1. Hosts vivos
sudo nmap -sn 192.168.10.0/24 -oA ~/scans/adapter1/discovery
grep "Nmap scan report for" ~/scans/adapter1/discovery.nmap | awk '{print $5}' > hosts_alive.txt

# 2. Puertos comunes
sudo nmap -sS -Pn -T4 --max-retries 2 --host-timeout 30s -iL hosts_alive.txt -oA common

# 3. Todos los puertos con versiones
sudo nmap -sS -p- -T4 -sV --version-intensity 2 -iL hosts_alive.txt -oA alltcp

# 4. Scripts seguros
sudo nmap -sV -sC -iL hosts_alive.txt -oA defaultNSE
```
