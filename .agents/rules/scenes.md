# Reglas para la Creación y Mantenimiento de Escenas

Cuando el usuario solicite crear, actualizar o refactorizar una escena interactiva o animación para este repositorio, sigue estrictamente estas directrices:

## 1. Variables de Identidad de Marca
- **`APP_NAME`:** Plataforma web general (Sidebar, Header del menú, Layout). Obtenida de `src/config/appConfig.ts`.
- **`COMPANY_NAME`:** Empresa/cliente para quien se crea la escena y video. Obtenida de `src/config/appConfig.ts`. Debe figurar en marcas de agua, encabezados del viewport 9:16 y explicaciones didácticas.

## 2. Los 5 Puntos de Contacto Obligatorios
Toda nueva escena debe contemplar la creación o edición de los 5 archivos del flujo:
1. `src/data/<name>Algorithm.ts`: Snapshot, código fuente (`*_CODE_LINES`) y `generate<Name>Timeline()`.
2. `src/components/<Name>VerticalViewport.tsx`: Viewport 9:16 (`w-[360px] sm:w-[400px] aspect-[9/16]`), paleta oscura, estado interactivo.
3. `src/data/scenesRegistry.ts`: Registrar `SceneId` y el objeto de metadatos en `SCENES_REGISTRY`.
4. `src/components/ScenePlayerView.tsx`: Conectar `timeline`, `viewport` y `CodeBlock`.
5. `src/App.tsx`: Registrar la `<Route>` correspondiente con `ScenePlayerView`.

## 3. Calidad Visual y Verificación
- Formato vertical 9:16 (1080x1920 equivalente).
- Paleta oscura técnica: Fondo `#050811`, Paneles `#0d1527`/`#0f172a`, Bordes `#1e293b`, Acento `#38bdf8`, Éxito `#10b981`.
- Duración total calculada: 30 a 35 segundos a 60 FPS.
- Ejecutar siempre `npx tsc --noEmit` al finalizar para garantizar cero regresiones de TypeScript.
