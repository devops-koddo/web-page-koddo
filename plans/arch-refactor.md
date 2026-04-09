# Plan de Refactorización de Arquitectura KODDO 🏗️

Este documento detalla la hoja de ruta para evolucionar la estructura actual del proyecto hacia una arquitectura profesional, escalable y optimizada para SEO y LLMs.

## 1. Objetivos del Cambio
*   **Limpieza de Raíz:** Eliminar el desorden de archivos de imagen y configuración en la raíz.
*   **Centralización de Lógica:** Evitar la duplicidad de código JavaScript entre la Home, el Blog y los Artículos.
*   **Escalabilidad del Blog:** Facilitar la creación de nuevos posts sin replicar manualmente todo el HTML/CSS.
*   **Rendimiento (Core Web Vitals):** Optimizar la carga de activos estáticos.

---

## 2. Nueva Estructura de Directorios (Propuesta)

```bash
/
├── public/                 # Archivos estáticos públicos
│   ├── assets/             # Imágenes de proyectos, blogs y mockups
│   ├── brand/              # Logos (red-nobk, web-icon, etc.)
│   └── legal.html          # Documentos legales
├── src/                    # Código fuente del sitio
│   ├── css/                # Hojas de estilo organizadas
│   │   ├── main.css        # Estilos globales y Home
│   │   └── blog.css        # Estilos específicos para lectura de artículos
│   └── js/                 # Lógica compartida
│       ├── core.js         # Cursor, scroll y navegación
│       └── blog-engine.js  # Fetch y renderizado de JSON de blogs
├── blog/                   # Módulo de Contenido
│   ├── posts.json          # "Base de datos" de artículos
│   ├── GUIA_REDACCION.md   # Documentación para nuevos posts
│   └── [post-name]/        # Carpetas para Pretty URLs
│       └── index.html      # Wrapper ligero de cada artículo
├── index.html              # Punto de entrada principal (Home)
├── blog.html               # Listado general de artículos
├── robots.txt              # Instrucciones para bots
└── sitemap.xml             # Mapa del sitio para Google/LLMs
```

---

## 3. Hoja de Ruta de Implementación

### Fase 1: Organización de Activos (Cleanup)
- [ ] Crear carpetas `/public/assets` y `/public/brand`.
- [ ] Mover todas las imágenes `.png` y `.webp` a sus nuevas ubicaciones.
- [ ] Actualizar todas las referencias en el código (HTML/CSS/JSON) para que apunten a las nuevas rutas de `public/`.

### Fase 2: Unificación de Lógica (JS/CSS)
- [ ] Extraer la lógica de renderizado de posts de `blog.html` a un archivo independiente `src/js/blog-engine.js`.
- [ ] Crear `src/css/blog.css` para manejar el diseño de las tarjetas y el contenido Markdown, eliminando el estilo en línea (inline) de los HTMLs.
- [ ] Asegurar que el cursor y el header "scrolled" funcionen mediante un único script `core.js`.

### Fase 3: Optimización de Plantilla de Post
- [ ] Reducir el tamaño de los `index.html` dentro de cada carpeta de post.
- [ ] Implementar un sistema de "Hydration" donde el HTML base sea mínimo y el contenido Markdown se inyecte de forma más eficiente, pero manteniendo los metadatos SEO en el servidor para indexación.

---

## 4. Beneficios para LLMs y SEO
Al separar el contenido en `/blog/posts.json` y usar rutas limpias en `/blog/[slug]`, los modelos de IA (GPT, Claude, Perplexity) pueden navegar por tu sitio de forma jerárquica:
1.  **Descubrimiento:** Encuentran el Sitemap.
2.  **Estructura:** Identifican la carpeta `/blog/` como fuente de conocimiento.
3.  **Contexto:** El JSON-LD (Schema.org) les indica explícitamente qué información es citable y quién es el autor (KODDO).

---
*Documento generado el 09 de Abril, 2026 - KODDO Engineering*
