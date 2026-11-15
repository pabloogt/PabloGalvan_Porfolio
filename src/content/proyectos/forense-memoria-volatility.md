---
titulo: Análisis forense de memoria RAM con Volatility 3
resumen: Análisis de un volcado de memoria de Windows con Volatility 3. La correlación de pslist, psscan, pstree y cmdline reconstruye una secuencia de comandos de enumeración y el arranque del servicio Telnet desde la sesión del administrador.
area: ciberseguridad
categoria: forense
tipo: laboratorio
estado: A
destacado: false
orden: 2
fecha: Curso 2025–2026
contexto: Reto del módulo de Análisis forense. Se entregaba una imagen de memoria con su hash MD5 y había que describir qué ocurría en el sistema en el momento de la adquisición, sin presuponer un ataque.
objetivo: Identificar procesos activos y finalizados, su jerarquía, las líneas de comando ejecutadas, los servicios y la actividad de red, aplicando un orden de análisis justificable.
problema: La memoria contiene información que no queda en disco (procesos terminados, argumentos de línea de comandos, conexiones). Para que las conclusiones sirvan, hay que verificar la integridad de la evidencia y separar los hechos observados de su interpretación.
entorno:
  - "Kali Linux con Volatility 3 instalado desde el repositorio oficial."
  - "Imagen de memoria de Windows (.vmem; las rutas «Documents and Settings» apuntan a un sistema XP/2003) y su fichero MD5."
herramientas: [Volatility 3, md5sum, Kali Linux]
resultados:
  - "Se verifica el MD5 de la imagen antes de analizarla y se trabaja sobre una copia."
  - "pslist muestra varias instancias de cmd.exe (PID 2632, 3508, 3988 y 3068) entre las 10:26:05 y las 10:30:19 UTC, asociadas a netstat, net, net1, ipconfig, systeminfo y reg."
  - "psscan recupera procesos ya finalizados (netstat, net, net1, systeminfo, reg y sc) creados entre las 10:28:22 y las 10:29:05 UTC, sin discrepancias con pslist que indiquen ocultación."
  - "pstree sitúa todos esos procesos bajo explorer.exe (PID 1716): se ejecutaron desde la sesión interactiva, no como servicios."
  - "cmdline recupera la orden «sc telnet start» y la apertura de hello.txt en el escritorio del usuario Administrator con Notepad."
  - "En un ejercicio previo se identificaron sistema operativo, arquitectura y build a partir de windows.info, y se razonaron tres casos (Windows XP SP3, Windows 11 22H2 y Windows Server 2022)."
problemas:
  - "Volatility 3 necesita las tablas de símbolos de Windows; hay que instalar sus dependencias antes de que los plugins funcionen."
decisiones:
  - "Seguir un orden fijo: integridad → pslist → psscan → pstree → cmdline → servicios y red, para que cada paso confirme o matice el anterior."
  - "Redactar los hallazgos como observaciones («consistente con…») y no como acusaciones, porque la memoria por sí sola no prueba la intención."
limitaciones:
  - "La imagen era de un ejercicio preparado; no procede de un incidente real."
  - "El informe original conserva frases de plantilla («indicar cuál usaste…») que habría que limpiar antes de publicarlo, por eso no se enlaza el PDF."
recomendaciones:
  - "Habilitar Telnet es una acción de riesgo: en un caso real habría que correlacionarlo con el registro de eventos (7045, 4688) y con la actividad de red."
competencias: [forense, metodologia, logs, documentacion]
pendiente:
  - Copia limpia del informe del reto para publicarla.
---

### Instalación

```bash
git clone https://github.com/volatilityfoundation/volatility3.git ~/volatility3
python3 -m pip install --user -r ~/volatility3/requirements.txt
python3 ~/volatility3/vol.py -h
```

### Orden de análisis

```bash
md5sum memoria.vmem && cat memoria.md5            # 1. integridad
vol -f memoria.vmem windows.pslist                 # 2. procesos activos
vol -f memoria.vmem windows.psscan                 # 3. procesos ocultos o finalizados
vol -f memoria.vmem windows.pstree                 # 4. jerarquía
vol -f memoria.vmem windows.cmdline                # 5. líneas de comando
```

### Línea temporal reconstruida

| Hora (UTC) | Observación | Fuente |
|---|---|---|
| 10:26:05 | Primera consola cmd.exe | pslist |
| 10:28:22 – 10:29:05 | netstat, net, net1, systeminfo, reg y sc ejecutados y finalizados | psscan |
| — | Todos cuelgan de explorer.exe (sesión del usuario) | pstree |
| — | `sc telnet start` y apertura de `hello.txt` | cmdline |
| 10:30:19 | Última consola registrada | pslist |

La secuencia es coherente con una enumeración manual del sistema (red, servicios, registro) seguida de la habilitación de un servicio de acceso remoto sin cifrar.
