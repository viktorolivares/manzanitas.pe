# Prompt de Generación: Motion Canvas (TypeScript)

Actúa como un desarrollador senior y director de motion graphics en **Motion Canvas (TypeScript)** especializado en ingeniería de software, automatización y divulgación técnica.

Tu objetivo es generar el archivo TypeScript completo (`makeScene2D`) en formato vertical **9:16** (resolución **1080x1920**, **60fps**) adaptando el diseño según el **MODO** seleccionado a continuación.

---

## ⚙️ Configuración del Proyecto

- **MARCA (Variable de entorno):** Debe obtenerse dinámicamente mediante la variable de entorno `import.meta.env.VITE_COMPANY_NAME` (valor por defecto: `"my.app"`). Nombre de la empresa para marcas de agua, encabezados y logos. Debe estar visible en el Header superior con tipografía monoespaciada moderna y un indicador de status activo `#10b981`.
- **DURACIÓN OBJETIVO:** 30 a 35 segundos exactos (1800 - 2100 frames a 60fps) mediante el uso estratégico de `yield*`, `all()`, `sequence()` y pausas de lectura humana.
- **PALETA DE COLOR:** Modo oscuro técnico:
  - **Fondo:** `#050811`
  - **Paneles:** `#0f172a`
  - **Bordes:** `#1e293b`
  - **Cian:** `#38bdf8`
  - **Éxito:** `#10b981`
  - **Error/Alerta:** `#ef4444`
  - **Acentos:** `#8b5cf6` / `#f59e0b`
- **IDIOMA:** Textos, comentarios, etiquetas de estado y modales 100% en español.

---

## 🎛️ Selector de Modalidad (Elige una)

### 🔹 Modo 1: Dual Code / View
> **Uso:** Algoritmos de ordenamiento, estructuras de datos, lógica de bucles, JS/Python.

- **Layout Vertical Dividido:**
  - **Mitad Superior (`Y: -380` aprox):** Canvas gráfico visual (ej. barras de Bubble Sort, punteros `i`/`j`, nodos, arrays) que reacciona en tiempo real.
  - **Mitad Inferior (`Y: +420` aprox):** Ventana de código estilizada con fondo oscuro, números de línea y sintaxis limpia del lenguaje elegido (JS, Python, Go, etc.).
- **Sincronización Estricta:**
  - Un cursor/indicador `▶` se mueve línea a línea en el bloque de código.
  - Cada salto del cursor ejecuta el cambio visual correspondiente arriba (ej. swap de elementos, comparación, condición `if true/false`).

---

### 🔹 Modo 2: 100% Workflow / Interactivo
> **Uso:** Automatizaciones con n8n, arquitecturas Cloud, API Webhooks, flujos sin código tradicional.

- **Layout Pantalla Completa:**
  - CERO ventanas de código a la mitad. Todo el espacio es un lienzo interactivo cinemático estilo SaaS moderno (Linear / Vercel).
  - Nodos de workflow interconectados (ej. `Webhook Trigger` ➔ `Nodo HTTP / n8n` ➔ `AI Agent` ➔ `DB / Slack`).
  - Los paquetes de datos viajan por las conexiones (`Line` con pulsos luminosos).
  - **Fases de ejecución:** Petición entrante, transformación de payload en tiempo real, disparo de eventos y resolución final.

---

## 📥 Input de Entrada para esta Generación

- **MODO SELECCIONADO:** `[Escribe aquí: MODO 1 o MODO 2]`
- **TEMA ESPECÍFICO:** `[Escribe aquí el tema]`
  - **Ejemplo para MODO 1:** *"Algoritmo Bubble Sort paso a paso con Python comparando pares adyacentes"*
  - **Ejemplo para MODO 2:** *"Automatización con n8n: Webhook recibe un lead, lo enriquece con IA y lo guarda en Notion"*

---

> **Requisito final:** Entrega el código TypeScript completo, modular y listo para usarse en un archivo `.tsx` de Motion Canvas, importando correctamente los módulos de `@motion-canvas/2d` y `@motion-canvas/core` sin omitir lógica ni dejar comentarios del tipo `"// TODO"`.