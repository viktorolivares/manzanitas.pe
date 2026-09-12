# CODEVO.PE — Motion Canvas Scenes (1080x1920 Vertical)

Este repositorio contiene el código fuente TypeScript oficial (`makeScene2D`) para animaciones procedurales en **Motion Canvas** en formato vertical 9:16 (1080x1920 a 60 FPS), listas para generar videos educativos (Shorts, Reels, TikTok).

---

## 🚀 Cómo ejecutar y renderizar en Motion Canvas

### 1. Requisitos previos
- **Node.js** v18 o superior instalado.
- **FFmpeg** instalado en tu sistema (opcional, para exportar directamente a MP4).

### 2. Crear un nuevo proyecto de Motion Canvas
Abre tu terminal y ejecuta:
```bash
npm create motion-canvas@latest mi-proyecto-codevo
```
- Selecciona el preset: **2D (TypeScript)**.
- Entra a la carpeta del proyecto e instala dependencias:
```bash
cd mi-proyecto-codevo
npm install
```

### 3. Configurar la resolución vertical (9:16 - 1080x1920)
En el archivo `src/project.ts` de tu proyecto Motion Canvas, asegúrate de configurar el tamaño y la tasa de fotogramas:
```typescript
import {makeProject} from '@motion-canvas/core';
import cacheFlowScene from './scenes/cacheFlowScene?scene';

export default makeProject({
  scenes: [cacheFlowScene],
  settings: {
    shared: {
      size: {x: 1080, y: 1920}, // Formato Vertical 9:16
      fps: 60,
    },
  },
});
```

### 4. Copiar la escena deseada
Crea una carpeta `src/scenes/` y pega el código descargado de la app:
- `cacheFlowScene.tsx` (Cache Hit vs Cache Miss con Redis y Base de Datos)
- `eventLoopScene.tsx` (Concurrencia, Event Loop, Call Stack y Microtasks)
- `bfsScene.tsx` (Recorrido BFS en matriz 5x5 con Python)

### 5. Iniciar el editor y renderizar el video
Ejecuta el servidor de desarrollo de Motion Canvas:
```bash
npm start
```
1. Se abrirá automáticamente en tu navegador `http://localhost:9000/`.
2. Verás la línea de tiempo interactiva de Motion Canvas para ajustar curvas, revisar fotogramas y hacer zoom.
3. En la barra lateral derecha, ve a la pestaña **Render**, selecciona el formato (WebM o secuencia PNG/MP4) y presiona **RENDER**.

---

## 🎬 Escenas Disponibles
1. **Cache Hit vs Miss (Redis)**: Topología visual de arquitectura (Cliente ➔ Redis RAM ➔ Base de Datos), lookup en memoria, pipeline de decisión algorítmico y comparativa de latencia (4ms vs 85ms).
2. **Event Loop & Concurrencia**: Call Stack LIFO, microtask queue (promesas), macrotask queue (timeouts) y stdout terminal.
3. **BFS en Matriz 5x5**: Búsqueda en anchura paso a paso con cola FIFO y back-tracking de ruta más corta.
