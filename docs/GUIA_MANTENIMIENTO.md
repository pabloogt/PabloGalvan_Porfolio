# Guía de mantenimiento

## 1. Añadir un proyecto

1. Crea `src/content/proyectos/mi-proyecto.md`. El nombre del fichero será la URL: `/proyectos/mi-proyecto/`.
2. Copia esta plantilla y rellena solo lo que exista. Los campos que no apliquen se borran: la ficha no muestra apartados vacíos.

```markdown
---
titulo: Título claro del proyecto
resumen: Una o dos frases (máximo 260 caracteres) con qué es y qué se consiguió.
area: ciberseguridad            # ciberseguridad | desarrollo
categoria: blue-team            # ver src/data/taxonomia.ts
tipo: laboratorio               # profesional | personal | academico | laboratorio | investigacion
estado: A                       # A implementado y documentado · B evidencias parciales · C estudiado · D pendiente
destacado: false                # true = aparece en la portada
orden: 10                       # menor = antes dentro de su categoría
fecha: Mayo 2026
rol: Qué hice yo en el proyecto (una frase).
web: https://ejemplo.com/              # solo si hay web pública
repo: https://github.com/...           # solo si el repositorio es público y se puede compartir
portada: ../../assets/portadas/mi-proyecto.png   # captura para la tarjeta destacada
portadaAlt: Descripción de la captura.
cifras:                                # alternativa a la portada: hasta 4 datos verificables
  - { valor: "24", etiqueta: controles }
contexto: Por qué se hizo.
objetivo: Qué se quería conseguir.
problema: Qué problema técnico aborda.
entorno:
  - "Máquina 1: sistema, IP de laboratorio, función."
arquitectura: Cómo se conectan las piezas.
herramientas: [Snort, Nmap]                 # SOLO las usadas de verdad
herramientasEstudiadas: [Cellebrite]        # vistas en teoría, no usadas
resultados:
  - "Resultado comprobado y cómo se comprobó."
problemas:
  - "Qué falló y cómo se resolvió."
decisiones:
  - "Qué se eligió y por qué."
limitaciones:
  - "Qué no quedó demostrado."
recomendaciones:
  - "Qué se haría en un entorno real."
competencias: [deteccion, linux]            # ver src/data/taxonomia.ts
evidencias:
  - imagen: ../../assets/evidencias/mi-proyecto/captura.png
    alt: Descripción de lo que se ve, para lectores de pantalla.
    pie: Qué demuestra la captura.
    tipo: captura                # captura | diseno (diagrama original) | diagrama (reconstruido)
documentos:
  - titulo: Informe completo (saneado)
    href: /documentos/mi-proyecto.pdf
enlaces:
  - texto: Repositorio
    href: https://github.com/...
pendiente:
  - "Lo que falta por recuperar."
---

### Paso 1

Texto, comandos y configuraciones del procedimiento (Markdown normal).
```

3. Ejecuta `npm run build`. Si falta un campo obligatorio, sobra uno o una imagen no existe, el build falla y dice qué fichero corregir.

**Comillas en YAML:** si un texto contiene `: ` (dos puntos y espacio) o empieza por un carácter especial, ponlo entre comillas dobles.

## 2. Añadir una evidencia

1. **Revisa la captura**: que no muestre contraseñas, claves, tokens, IP públicas, nombres de terceros ni datos personales. Si los muestra, recórtala o tápala antes de copiarla.
2. Cópiala a `src/assets/evidencias/<proyecto>/` con un nombre descriptivo (`alertas-ssh.png`).
3. Añádela al bloque `evidencias` de la ficha. Astro la convierte a WebP y genera varios tamaños.

## 3. Publicar un PDF

Los originales **nunca** se copian al proyecto. Se publica una copia saneada:

1. Elimina o tapa contraseñas, claves, nombres de profesores y compañeros y cualquier dato personal. Con PyMuPDF se puede automatizar (redacción por texto y retirada de imágenes); revisa visualmente las páginas afectadas.
2. Borra los metadatos (autor, software, título).
3. Guarda la copia en `public/documentos/<proyecto>.pdf` (sin el nombre original del fichero).
4. Si el documento tenía un secreto concreto, añade su patrón a `BLOQUEADOS` en `scripts/check-secrets.mjs` para que nunca vuelva a colarse.
5. Ejecuta `npm run verify`.

## 4. Cambiar datos personales, experiencia, formación o tecnologías

Todo está en `src/data/perfil.ts`. No pongas teléfono ni dirección: la web es pública.

- **Experiencia:** describe solo tareas generales. Nada interno de las empresas ni trabajos sin autorización para mostrarse.
- **CV:** copia el PDF actualizado (sin teléfono) a `public/cv/` y pon su ruta en `perfil.cv`. Con `null`, los botones de descarga no aparecen.
- **Portadas:** captura de 1440 px de ancho, sin el banner de cookies, guardada en `src/assets/portadas/`.

## 5. Añadir una categoría o competencia

Edita `src/data/taxonomia.ts`. El esquema y las páginas la recogen automáticamente.

## 6. Antes de enviar o desplegar

```bash
npm run verify
```

Comprueba tipos y esquema, build, tests de contenido, enlaces internos y secretos. Revisa también `INVENTARIO_EVIDENCIAS.md` por si alguna ficha ha cambiado de estado.

## 7. Si una página falla con «Cannot read properties of undefined»

Suele ser la caché de contenido de Astro (`.astro/data-store.json`) con fichas procesadas con un esquema anterior, después de añadir un campo en `src/content.config.ts`.

- `npm run dev` y `npm run build` ya la borran antes de arrancar (`scripts/clean-content-cache.mjs`). Si tienes el servidor abierto mientras cambias el esquema, **reinícialo**.
- Los componentes no leen las listas directamente: `todos()` en `src/lib/proyectos.ts` las normaliza con `normalizar()` (`src/lib/tarjeta.ts`). Si añades un campo de tipo lista al esquema, añádelo también a `CAMPOS_LISTA`.
- `npm run smoke` comprueba que las páginas clave del servidor en marcha responden sin errores.
