# Guía de Redacción de Blog KODDO 🚀

Esta guía explica cómo añadir nuevos artículos al blog de KODDO y cómo utilizar el formato **Markdown** dentro del archivo `blog/posts.json`.

## 📂 Estructura del Archivo
Todos los posts deben añadirse al array en:
`blog/posts.json`

## 🛠️ Campos de un Post
Cada objeto en el JSON debe tener esta estructura:

```json
{
  "id": "identificador-unico-url",
  "title": "Título del Artículo",
  "slug": "identificador-unico-url",
  "date": "2026-04-09",
  "category": "ENGINEERING | ENTERPRISE | DATA",
  "excerpt": "Breve resumen para la tarjeta de la página principal.",
  "author": "Nombre del Autor o KODDO Team",
  "image": "/assets/web-mockup.png",
  "content": "Contenido en formato Markdown (ver sección de abajo)"
}
```

---

## 📝 Formatos de Texto (Markdown)

Dentro del campo `"content"`, puedes usar los siguientes formatos. **Importante:** Como es un JSON, usa `\n` para los saltos de línea.

### 1. Títulos
Usa el símbolo `#` seguido de un espacio.
*   `## Título de Sección` (Equivale a H2)
*   `### Subtítulo` (Equivale a H3)

### 2. Énfasis
*   `**Texto en Negrita**`
*   `*Texto en Itálica*`

### 3. Listas
*   `- Elemento de lista 1`
*   `- Elemento de lista 2`

### 4. Bloques de Código
Para código con resaltado de sintaxis, usa las triples comillas invertidas y especifica el lenguaje (typescript, javascript, bash, etc.):

```text
\n\n\`\`\`typescript\nconst x = 10;\nconsole.log(x);\n\`\`\`\n\n
```

### 5. Código en línea
Para resaltar una palabra técnica dentro de un párrafo:
`Usa la función \`analyzeData()\` para procesar...`

### 6. Enlaces
`[Texto del enlace](https://koddo.tech)`

---

## 💡 Consejos para el JSON
1.  **Saltos de línea:** Usa siempre `\n\n` entre párrafos o secciones para que el texto respire.
2.  **Comillas dobles:** Si necesitas poner comillas dentro del texto, escápalas con una barra invertida: `\"texto entre comillas\"`.
3.  **Imágenes:** Actualmente usamos las rutas `/assets/web-mockup.png` o `/assets/mobile-mockup.png`.

---
*KODDO Engineering - 2026*
