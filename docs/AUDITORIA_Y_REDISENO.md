# Auditoría y rediseño (16/11/2026)

## 1. Qué había

Astro 7 estático, TypeScript estricto, 25 fichas Markdown en una colección tipada, CSS nativo, sin dependencias de interfaz. Repositorio `pabloogt/PabloGalvan_Porfolio`, rama `main`, preparado para Vercel (sin desplegar).

## 2. Problemas detectados

| Área | Problema |
|---|---|
| Contenido | Ficha pública del módulo de financiación de Cüimo, con enlace a su web, sin autorización para mostrarse. |
| Contenido | El inicio se presentaba como perfil de ciberseguridad; el desarrollo web quedaba en segundo plano. |
| Contenido | Piscinas Fama aparecía sin enlace ni detalle; TermLifePicks no existía. |
| Contenido | Las prácticas (Atisa, Cüimo) estaban mezcladas con los proyectos en lugar de en un apartado de experiencia. |
| Contenido | El CV publicado era una versión orientada a SOC con «inglés intermedio»: no estaba actualizado. |
| Diseño | Tipografía del sistema, paleta gris con acento azul verdoso, todo en tarjetas iguales. Correcto pero genérico. |
| Diseño | Hero sin recurso gráfico; titular descriptivo y poco memorable. |
| Diseño | Los 18 laboratorios pesaban lo mismo que los proyectos principales. |
| Técnica | Sin imagen Open Graph. |
| Técnica | Enlaces de sección sin salto de línea y etiquetas largas que desbordaban en móvil (detectado al revisar el rediseño). |

## 3. Qué se ha hecho

- **Cüimo:** eliminada la ficha, su ruta, su enlace externo y toda mención al módulo. Las prácticas se conservan en Experiencia con tareas generales. Un test y el escáner de secretos impiden que vuelva a publicarse.
- **Estructura:** Inicio · Proyectos · Laboratorios · Experiencia · Sobre mí · Contacto. Documentación, Competencias y Formación siguen existiendo y se enlazan desde Sobre mí y el pie.
- **Proyectos:** tres pesos distintos — destacado con portada o cifras, fila de índice y ficha pendiente.
- **Tipos:** profesional, personal, académico, laboratorio e investigación, siempre visibles.

## 4. Identidad visual: «cuaderno técnico»

| Elemento | Decisión | Motivo |
|---|---|---|
| Color | Papel cálido `#f4eee3`, tinta `#1d1a16`, acento terracota `#b03a1a`. Modo oscuro en carbón cálido con acento `#f08c5e`. | Tonos cálidos y neutros con un único acento; evita el azul corporativo y el neón. |
| Titulares | Bricolage Grotesque | Grotesca con carácter, reconocible en tamaños grandes. |
| Texto | Instrument Sans | Legible y neutra en párrafos largos. |
| Etiquetas | JetBrains Mono en mayúsculas pequeñas | Aporta el tono técnico sin recurrir a terminales falsas. |
| Motivos | Reglas finas, numeración de secciones, retícula de puntos y marcas de registro | Lenguaje de plano técnico, coherente con fichas y diagramas. |
| Logo | Monograma PG: P en tinta y G en acento, solapadas | Trazo geométrico propio; funciona a 16 px como favicon. |
| Hero | Titular en dos frases y figura «del código a la alerta» | La figura resume las tres capas del perfil (construir, publicar, defender) con elementos que existen en los proyectos. |
| Movimiento | Aparición suave al cargar y desplazamientos de 3 px al pasar el cursor | Discreto; se desactiva con «reducir movimiento». |

No se usa fotografía: no había ninguna entre los recursos del proyecto y no se ha generado ninguna imagen de persona.

## 5. Comprobaciones

| Comprobación | Resultado |
|---|---|
| `astro check` | 0 errores, 0 avisos |
| Build | 41 páginas |
| Tests de contenido | 11 de 11 |
| Enlaces internos y anclas | Sin roturas |
| Enlaces externos | 5 de 6 comprobados con respuesta 200 (LinkedIn no admite comprobación automática) |
| Secretos y datos personales | Sin hallazgos en `src/`, `public/` y `dist/` |
| Desbordamiento horizontal | Ninguno a 360, 768 y 1024 px en las 40 páginas |
| Accesibilidad | Un `h1` por página, sin saltos de encabezado, imágenes con `alt`, sin ids duplicados, foco visible |
| Consola | Sin errores |
| Títulos y descripciones | Únicos en todas las páginas |
