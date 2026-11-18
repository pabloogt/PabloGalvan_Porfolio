# Inventario de evidencias

Actualizado el 16/11/2026 con las carpetas `ESCIB/Bastionado`, `Incidentes`, `HE` y `PPS`. Los originales permanecen fuera del proyecto; en `public/` solo hay copias saneadas.

Clasificación: **A** implementado y documentado · **B** implementado, evidencias parciales · **C** estudiado o preparado · **D** (pendiente) se retiró el 18/11/2026: ver al final.

## Ciberseguridad

| Ficha | Estado | Documento fuente (fuera del proyecto) | Publicado | Observaciones |
|---|---|---|---|---|
| `siem-elk-snort` | A | `ESCIB/galvan_pablo_IC07_Tarea.pdf` | PDF saneado + 4 capturas + diagrama reconstruido | Zona interna/externa calculada con prefijo fijo (limitación documentada). |
| `snort-dmz` | A | `ESCIB/Galvan_pablo_IC06_Tarea.pdf` | PDF saneado + 5 capturas + diagrama reconstruido | El SOC estaba en la red interna, no en la externa. |
| `snort-deteccion-nmap` | B | `ESCIB/Incidentes/Galvan_Pablo_MicroEjercicio_INC.pdf` | PDF saneado + 1 captura | Evasión con `--max-rate 1` sin captura; incoherencias rev:3/rev:2 y enp0s3/enp0s8. |
| `wazuh-suricata-pfsense` | B | `ESCIB/galvan_tejada_pablo_BRS_Lab3_Tarea.pdf` | PDF saneado + 4 capturas + diagrama reconstruido | **El original NO estaba saneado** (contraseña del dashboard, claves del agente). Suricata arrancó sin reglas: no hay alertas. |
| `bastionado-ssh` | B | `ESCIB/galvan_pablo_BRS09_Tarea.pdf` | PDF saneado + 4 capturas | Pruebas de `-L` y `-X` rechazadas en autenticación: no concluyentes. IPs incoherentes en AllowUsers. |
| `red-segura-packet-tracer` | B | `ESCIB/Galvan_Pablo_BRSLabUD5_Tarea.pdf` | PDF saneado (PSK oculta) + 3 capturas | Syslog sin mensajes recibidos; revisar sentido de las ACL. |
| `auditoria-wifi` | B | `ESCIB/Galvan_Pablo_aircrack_Hashcat_HE.pdf`, `ESCIB/Galvan_Pablo_HE_act2_2.pdf`, `OneDrive/PABLO_GALVAN_GUIA_DOCUMENTO_OFICIAL_TERCERA_EVALUACION.docx`, `ESCIB/escenario5_bueno.drawio.png` | 1 diagrama original | Capturas proporcionadas por el curso; desautenticación solo teórica. Los PDF contienen claves recuperadas: no publicados. |
| `forense-memoria-volatility` | A | `ESCIB/AF/Galvan_Pablo_AF_Reto3.pdf`, `ESCIB/Galvan_Pablo_AF_2_3.pdf` | Solo ficha | El informe conserva frases de plantilla; limpiar antes de publicar. |
| `forense-usb-ftk-autopsy` | B | `ESCIB/galvan_tejada_pablo_Act2_AF.pdf`; caso `ESCIB/Incidentes/Analisis_USB_ACME/` | Solo ficha | Los ficheros recuperados son documentos personales: no publicar sin revisar. |
| `forense-movil-exfiltracion` | B | `ESCIB/AF/Galvan_Pablo_Act3_Ud3.pdf` | Solo ficha | ADB, Andriller, Cellebrite, LiME: estudiadas, no usadas. |
| `owasp-zap-aplicaciones` | B | `ESCIB/galvan_pablo_Act2_ev3_PPS.pdf` | Solo ficha | Hallazgos de configuración. |
| `juice-shop-burp` | B | `ESCIB/galvan_pablo_PPS_burpsuite2_ud3.pdf` | Solo ficha | Hallazgo claro: token válido tras logout. Inyección descrita de forma ambigua. |
| `analisis-vulnerabilidades-cve` | C | `ESCIB/HE_vulnearabilidades_PabloGalvan.pdf` | Solo ficha | Empresa ficticia, sin escaneo real. |
| `pegasus-mvt` | B | `ESCIB/PPS/Trabajo_Pegasus_Grupal.pdf` | Solo ficha | Trabajo en grupo de cuatro personas. |
| `cifrado-gpg-openssl` | B | `ESCIB/Galvan_Tejada_Pablo_BRS_CifradoAsimetrico_Tarea.pdf` | Solo ficha | **El informe contiene la frase de paso usada**: no publicar sin sanear. |
| `android-jadx-mobsf` | D | — | Ficha pendiente | No encontrado. |
| `dns-cdn-cloudflare` | D | — | Ficha pendiente | No encontrado. |

### Material revisado y no usado

| Documento | Motivo |
|---|---|
| `ESCIB/HE/Galvan_Tejada_Pablo_OpenVas_NMAP.pdf` | Pendiente de comprobar qué resultados son de escaneos reales. |
| `Downloads/HA_NmapOpenVas*.docx` | Plantillas generadas por IA, no evidencia. |
| `ESCIB/Galvan_Pablo_UD2_ACT1_Metaexploit.pdf` (Metasploit, ARP spoofing, FOCA) | Candidato a ficha futura de laboratorio ofensivo controlado. |
| `ESCIB/HackingEtico_Rafa_Pablo.pdf` (post-explotación y MITRE ATT&CK, en pareja) | Candidato a ficha futura. |
| `ESCIB/Galvan_Pablo_IC03/IC04/IC05`, `AF2_1`, `AF2_2` (LNAV), `Act1_3erTri_AF` | Incidentes y forense de Windows: candidatos a fichas futuras. |
| `ESCIB/PPS/Exposicion_PPS_3er+trimestre_practica.pdf` (InsecureShop) | Autoría de otra persona. |
| `ESCIB/Bastionado/diego_packet/`, `Barbero_Merino_Diego_*` | Trabajos de un compañero. |

## Desarrollo

| Ficha | Estado | Fuente | Observaciones |
|---|---|---|---|
| `webtrustscan` | A | `PROYECTOS/web-audit-app` (repo público) | 324/324 tests verificados el 15/11/2026. No desplegado. |
| `pill-express` | A | `Documents/GitHub/TFG_DAM` (repo público) | **El repositorio público contiene la clave de Google Maps**: restringirla o rotarla. |
| `piscinas-fama` | A | Web pública https://www.piscinasfama.com/ (analizada el 16/11/2026) | WordPress, Blocksy, Spectra, Rank Math, Fluent Forms, Complianz: detectados en el HTML público. Portada: captura propia de la web. |
| `termlifepicks` | A | Web pública https://termlifepicks.com/ (analizada el 16/11/2026) | WordPress, tema Extendable, Rank Math, Site Kit. Sin datos de tráfico ni ingresos. No se afirma aprobación de AdSense. |
| `tcg-radar` | B | `PROYECTOS/tcg-radar` | Proyecto privado en desarrollo. |
| `simulador-bancario-cobol` | D | CV | No hay código local. |

## Ficheros publicados

| Fichero público | Origen | Saneado |
|---|---|---|
| `public/documentos/siem-elk-snort.pdf` | IC07 | Nombre del profesor, metadatos |
| `public/documentos/snort-dmz.pdf` | IC06 | Nombre del profesor, metadatos |
| `public/documentos/snort-deteccion-nmap.pdf` | MicroEjercicio INC | Nombre del profesor, metadatos |
| `public/documentos/bastionado-ssh.pdf` | BRS09 | Nombre del profesor, metadatos |
| `public/documentos/red-segura-packet-tracer.pdf` | BRSLabUD5 | Profesor, clave precompartida (4 apariciones), metadatos |
| `public/documentos/wazuh-suricata-pfsense.pdf` | BRS Lab3 | Contraseña del dashboard, 2 capturas con claves del agente, credenciales de DVWA, metadatos |
| `src/assets/evidencias/**` (21 capturas) | Extraídas de los PDF anteriores | Revisadas una a una: solo IP privadas de laboratorio y usuarios de prueba |

## Cambios del 16/11/2026

### Retirado

| Elemento | Motivo |
|---|---|
| Ficha `cuimo-financiacion` y su enlace externo | Sin autorización para mostrar ese trabajo. Las prácticas siguen en Experiencia, con tareas generales. |
| Ficha `atisa-gestion-usuarios` | Pasa a Experiencia (el stack de la ficha no estaba confirmado). |
| Ficha pendiente `ddos-ataques-web-packet-tracer` | Sustituida por `analisis-logs-ddos-ataques-web`, que sí tiene documento. Si la práctica de Packet Tracer era otra distinta, sigue sin localizarse. |
| CV público | No estaba actualizado (perfil SOC, inglés «intermedio»). Falta un CV nuevo. |

### Fichas nuevas a partir de las carpetas

| Ficha | Estado | Documento fuente (fuera del proyecto) | Observaciones |
|---|---|---|---|
| `analisis-logs-ddos-ataques-web` | B | `ESCIB/galvan_pablo_BRS07_Tarea.pdf` | Contiene IP públicas del conjunto de datos: no publicado. |
| `investigacion-respuesta-incidentes` | B | `ESCIB/Galvan_Pablo_IC03_Tarea.pdf`, `Galván_Pablo_IC05_Tarea.pdf`, `Galvan_Pablo_IC04_Tarea.pdf` | IC03 incluye el análisis del USB con Autopsy (caso `Incidentes/Analisis_USB_ACME`). |
| `nmap-openvas-reconocimiento` | B | `ESCIB/HE/Galvan_Tejada_Pablo_OpenVas_NMAP.pdf` | OpenVAS no llegó a ejecutarse (feeds sin sincronizar). |
| `captura-trafico-sniffers` | B | `ESCIB/pablo_galvan_sniffer.pdf` | **Contiene la contraseña del usuario FTP de prueba.** |
| `metasploit-arp-spoofing` | B | `ESCIB/Galvan_Pablo_UD2_ACT1_Metaexploit.pdf` | FOCA sin resultados. |
| `bastionado-linux-servicios` | B | `ESCIB/Galvan_Tejada_Pablo_BRS_Lab01_Tarea.pdf`, `BRS_Lab2`, `BRS04` | **BRS04 contiene el secreto compartido de RADIUS.** |
| `plan-director-analisis-riesgos` | C | `ESCIB/Galvan_Tejada_Pablo_BRS_PDS_Tarea.pdf`, `Incidentes/Galvan_Tejada_Pablo_IC02_Tarea.pdf`, `Galvan_Pablo_BRS06_Tarea.pdf`, `PabloGalvan_BRS01` | Empresas ficticias. |
| `revision-codigo-seguro` | C | `ESCIB/galvan_pablo_PPS2_2.pdf` | Ejercicio de análisis. |

### Revisado y no incorporado

| Material | Motivo |
|---|---|
| `Incidentes/quasar-clone`, `Quasar-master`, `galvan_tejada_pablo_IC_Rats_Tarea.pdf` | Práctica con un troyano de acceso remoto: no aporta a la candidatura y es sensible. |
| `galvan_tejada_pablo_IC_Medusa_Tarea.pdf`, `IC_Conffirewall`, `Galvan_Pablo_BRS05_Tarea.pdf` | Solapan con fichas existentes. |
| `HackingEtico_Rafa_Pablo.pdf` (post-explotación y MITRE ATT&CK, en pareja) | Candidato a ficha futura; es trabajo compartido. |
| `PPS/Galvan_Pablo_PPS_2_4.pdf`, `PPS/Galvan_Pablo_PPS_ejercicios2` | Teoría y ejercicios básicos de Python. |
| `PPS/Exposicion_PPS_3er+trimestre_practica.pdf`, materiales de Diego y apuntes del profesorado | No son de mi autoría. |
| Papelo (`PROYECTOS/SAAS`) | Sin auditar ni validar: no se incorpora. |

### Recursos nuevos publicados

| Fichero | Origen |
|---|---|
| `src/assets/portadas/piscinasfama.png`, `termlifepicks.png` | Capturas propias de las webs públicas, recortadas sin el banner de cookies. |
| `public/og.png` | Captura del inicio del propio portfolio. |
| `public/favicon.svg`, `src/components/Logo.astro` | Monograma PG, diseño propio. |

## Cambios del 18/11/2026: retirada de la categoría D

| Ficha | Antes | Ahora | Fuente usada |
|---|---|---|---|
| `android-jadx-mobsf` | D | C | README del repositorio de InsecureBankv2 (lista de debilidades declaradas). La ficha no presenta hallazgos propios. |
| `dns-cdn-cloudflare` | D | C | Documentación oficial de Cloudflare: «Proxy status» y «Exposed IP addresses». |
| `simulador-bancario-cobol` | D | Eliminada | No hay código en el equipo y un proyecto propio no se puede documentar con fuentes externas. |

Las fichas A y B conservan sus notas `pendiente` en el frontmatter como recordatorio interno, pero ya no se publican ni en la ficha ni en Documentación. Solo las fichas C las muestran.
