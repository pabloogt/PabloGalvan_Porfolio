---
titulo: Análisis estático de una app Android con JADX y MobSF
resumen: Práctica de Puesta en producción segura sobre InsecureBankv2, una app Android vulnerable a propósito. La ficha recoge la metodología de análisis estático trabajada y qué debilidades incluye la app según su documentación pública.
area: ciberseguridad
categoria: movil
tipo: laboratorio
estado: C
destacado: false
orden: 1
contexto: Práctica del módulo de Puesta en producción segura. El objetivo era revisar una aplicación Android sin ejecutarla, documentar al menos seis hallazgos y valorar su impacto en confidencialidad, integridad y disponibilidad.
objetivo: Aprender a leer una aplicación Android desde su APK — manifiesto, permisos, componentes y código descompilado — y a contrastar la revisión manual con un analizador automático.
problema: Una app móvil se distribuye completa al usuario. Lo que se deja en el APK (claves, direcciones de servidores, componentes accesibles desde otras apps, opciones de depuración) lo puede leer cualquiera que lo descomprima.
entorno:
  - "Kali Linux con JADX para descompilar el APK."
  - "MobSF ejecutado en Docker como analizador estático complementario."
  - "InsecureBankv2: app Android con un servidor en Python, publicada con licencia MIT para practicar seguridad móvil."
herramientas: [JADX, MobSF, Docker, Kali Linux]
decisiones:
  - "Empezar por AndroidManifest.xml (permisos, componentes exportados, android:allowBackup y android:debuggable) antes de leer código: es donde aparecen los fallos de configuración más directos."
  - "Revisar a mano las clases que manejan credenciales y red (LoginActivity y NetworkManager) en lugar de fiarse solo del informe automático."
  - "Usar MobSF para contrastar la revisión manual, no para sustituirla."
limitaciones:
  - "El informe de la práctica no se conserva. Por eso esta ficha no enumera hallazgos propios: la lista de debilidades que aparece abajo procede de la documentación pública de la aplicación."
  - "Análisis estático únicamente; no se documenta análisis dinámico con Frida ni pruebas en dispositivo."
recomendaciones:
  - "Marcar android:debuggable como false y android:allowBackup como false (o restringir qué se copia) en las versiones publicadas."
  - "Declarar android:exported=\"false\" en los componentes que no deban usar otras apps, o protegerlos con permisos."
  - "No incluir secretos en el código, usar HTTPS para toda la comunicación y almacenar los datos sensibles con el Android Keystore."
competencias: [seguridad-aplicaciones, vulnerabilidades, metodologia]
enlaces:
  - texto: Repositorio de InsecureBankv2 (GitHub)
    href: https://github.com/dineshshetty/Android-InsecureBankv2
---

### Metodología de análisis estático

| Paso | Qué se revisa | Herramienta |
|---|---|---|
| 1 | `AndroidManifest.xml`: permisos, actividades, servicios, receptores y proveedores exportados, `allowBackup`, `debuggable` | JADX |
| 2 | Código descompilado de las clases de autenticación y red (`LoginActivity`, `NetworkManager`) | JADX |
| 3 | Cadenas y endpoints embebidos: direcciones de servidor, claves, credenciales | JADX (búsqueda) |
| 4 | Informe automático: manifiesto, certificados, código y binario | MobSF |
| 5 | Cada hallazgo con su impacto en confidencialidad, integridad y disponibilidad, y la medida correctiva | Informe |

```bash
# Descompilar el APK para revisarlo
jadx -d insecurebank_src InsecureBankv2.apk

# MobSF en Docker; el APK se sube desde la interfaz web
docker run -it --rm -p 8000:8000 opensecurity/mobile-security-framework-mobsf:latest
```

Los comandos son los de uso habitual de cada herramienta; no son una copia del informe original.

### Qué incluye InsecureBankv2 según su documentación

El README del proyecto declara que la app contiene, entre otras, estas debilidades. Son las que la práctica pedía buscar; no son hallazgos verificados en esta ficha.

| Área | Debilidades declaradas |
|---|---|
| Configuración | Aplicación depurable, vulnerabilidad de copia de seguridad |
| Componentes | Receptores de difusión defectuosos, componentes de actividad vulnerables, acceso inseguro al proveedor de contenido, intercepción e inyección de intents |
| Autenticación | Mecanismo de autorización débil, enumeración de usuarios, cambio de contraseña débil, puertas traseras de desarrollador |
| Datos | Secretos en el código, cifrado local y criptografía débiles, registros con información sensible, almacenamiento inseguro en la SD, información sensible en memoria, portapapeles y caché del teclado |
| Red | Conexiones HTTP sin cifrar, manipulación de parámetros, WebView inseguro |
| Protecciones | Detección de root y de emulador evitables, parcheo de la app y manipulación en tiempo de ejecución |
