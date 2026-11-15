# Inventario de evidencias

Actualizado el 15/11/2026 con la documentación de `Documents/ESCIB`. Los originales permanecen fuera del proyecto; en `public/` solo hay copias saneadas.

Clasificación: **A** implementado y documentado · **B** implementado, evidencias parciales · **C** estudiado o preparado · **D** pendiente de recuperar.

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
| `ddos-ataques-web-packet-tracer` | D | — | Ficha pendiente | No encontrado (el `.pkt` de `ESCIB/Bastionado/trabajo.pkt` podría ser el de la red segura: revisar). |
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
| `cuimo-financiacion` | B | CV | Confirmar permiso para mostrar más detalle. |
| `atisa-gestion-usuarios` | B | CV, `Documents/ProyectosAtisa` | Confirmar el stack de la aplicación CRUD. |
| `piscinas-fama` | B | CV | Falta enlace a la web y permiso. |
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
| `public/cv/CV_Pablo_Galvan_Tejada.pdf` | `CVs/CV_Pablo_Galvan_Analista_SOC_N1_Serval.pdf` | Teléfono, metadatos (incluido el nombre de la empresa del fichero) |
| `src/assets/evidencias/**` (21 capturas) | Extraídas de los PDF anteriores | Revisadas una a una: solo IP privadas de laboratorio y usuarios de prueba |
