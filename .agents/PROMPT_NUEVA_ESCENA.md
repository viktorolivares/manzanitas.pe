# Prompt Maestro para Generar una Nueva Escena

Copia y pega este prompt cada vez que desees generar una nueva escena interactiva y de video:

```markdown
Actúa como desarrollador senior y director de motion graphics para el repositorio "manzanitas.pe".

Necesito que crees una nueva escena completa y funcional con los siguientes datos:
- TÍTULO: [Ejemplo: Algoritmo Dijkstra / OAuth 2.0 PKCE / Docker Container Lifecycle]
- CATEGORÍA: [sunat | fraude | ia-desarrollo | algoritmos]
- LENGUAJE/TECNOLOGÍA: [Python | JavaScript / TypeScript | Flujo Nodos]
- DESCRIPCIÓN: [Explica brevemente qué debe mostrar paso a paso]

REGLAS DE ARQUITECTURA:
1. Marca de la App vs Empresa:
   - Usa `APP_NAME` de `src/config/appConfig` para referencias a la plataforma general.
   - Usa `COMPANY_NAME` de `src/config/appConfig` para la marca de agua del video, encabezado del Viewport 9:16 y créditos del contenido.
2. Implementa o actualiza los 5 archivos obligatorios:
   - `src/data/<nombre>Algorithm.ts`: Snapshot, array de líneas de código y generador de timeline (~30-35s a 60 FPS).
   - `src/components/<Nombre>VerticalViewport.tsx`: Viewport interactivo 9:16 (`w-[360px] sm:w-[400px] aspect-[9/16]`), estética oscura moderna (fondo `#070b14`, bordes `#1e293b`, cian `#38bdf8`, éxito `#10b981`).
   - `src/data/scenesRegistry.ts`: Registrar el nuevo `SceneId` y el objeto de configuración en `SCENES_REGISTRY` con su icono de `lucide-react`.
   - `src/components/ScenePlayerView.tsx`: Importar y conectar el timeline, el viewport y el bloque de código.
   - `src/App.tsx`: Registrar la nueva `<Route>` dentro de `AppLayout`.
3. Verificación:
   - Al finalizar, ejecuta `npx tsc --noEmit` para confirmar que compila al 100% sin errores de tipos.
```
