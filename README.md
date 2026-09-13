# codevo.pe — Animaciones & Generador de Video (1080x1920 Vertical)

Este repositorio permite crear y exportar animaciones procedurales en formato vertical 9:16 (**1080x1920 a 60 FPS**) listas para redes sociales (Shorts, Reels, TikTok), tanto **directamente desde la interfaz web interactiva** como a través del motor **Motion Canvas integrado**.

---

## ⚡ Método 1: Exportar Video con 1 Clic desde la Interfaz Web (Recomendado)

1. **Iniciar la aplicación:**
   ```bash
   npm run dev
   ```
2. Abre tu navegador en `http://localhost:3000`.
3. Selecciona la escena que deseas grabar (ej. *Error 2119*, *PSE vs OSE*, *Facturación SUNAT*, *Redis Cache*, etc.).
4. Haz clic en el botón rojo **"Grabar Video"** en la barra de controles de reproducción:
   - Selecciona la pestaña o ventana actual.
   - La animación se reproducirá automáticamente de inicio a fin a 60 FPS con audio sincronizado.
   - Al finalizar, el video se **descargará automáticamente** (`.webm` o `.mp4`) en tu carpeta de descargas.

---

## 🎨 Método 2: Editor y Renderizado Frame-a-Frame con Motion Canvas

Para renderizado vectorial matemático con precisión por fotograma y ajuste de curvas Bezier:

1. **(Opcional) Sincronizar escenas `.tsx`:**
   ```bash
   npm run scenes:extract
   ```
2. **Iniciar el editor Motion Canvas:**
   ```bash
   npm run motion:dev
   ```
3. Se abrirá el editor en `http://localhost:9000/`.
4. En el panel lateral derecho, ve a la pestaña **Render**, elige el formato (`MP4`, `WebM` o secuencia de imágenes `PNG`) y presiona **RENDER**.

---

## 🎬 Escenas Disponibles
1. **Error 2119 SUNAT**: Diagnóstico tributario de discrepancia de IGV con especificación UBL 2.1 y redondeo a nivel de ítem.
2. **PSE vs OSE (SUNAT)**: Arquitectura en la nube del flujo tributario peruano (Emisor ➔ PSE Facturador ➔ OSE Validador Oficial ➔ SUNAT).
3. **Facturación Electrónica SUNAT**: Pipeline de 4 etapas (JSON ➔ XML UBL 2.1 ➔ Firma Digital SHA-256 ➔ CDR Aceptado).
4. **Detección de Fraude (Grafos)**: Detección de ciclos de lavado y carrusel de transferencias sospechosas.
5. **Google Maps (A* Search)**: Algoritmo de navegación vehicular con heurística euclidiana y tráfico en tiempo real.
6. **Álgebra de Embeddings**: Operaciones vectoriales con LLMs (`Rey - Hombre + Mujer = Reina`).
7. **Cache Hit vs Miss (Redis)**: Topología de arquitectura en memoria vs base de datos (4ms vs 85ms).
8. **Event Loop & Concurrencia**: Call Stack LIFO, microtask queue (promesas), macrotask queue (timeouts) y stdout.
9. **BFS en Matriz 5x5**: Búsqueda en anchura paso a paso con cola FIFO y back-tracking de ruta óptima.

---

## 🛠️ Cómo Crear Manualmente una Nueva Escena (Guía Paso a Paso)

Si deseas agregar una nueva escena interactiva al proyecto para que aparezca en el menú lateral y en el reproductor web, sigue estos **5 pasos**:

### 1. Definir el algoritmo y datos del timeline
Crea el archivo en `src/data/<nombre>Algorithm.ts` definiendo el snapshot del estado en cada paso y el pseudocódigo:

```typescript
export interface MiNuevaEscenaSnapshot {
  stepIndex: number;
  timeSec: number;
  description: string;
  phaseLabel: string;
  statusText: string;
  // Variables adicionales que cambian en cada paso...
}

export const MI_NUEVA_ESCENA_CODE_LINES = [
  'def algoritmo_ejemplo():',
  '    inicio = preparar_datos()',
  '    return procesar(inicio)',
];

export function generateMiNuevaEscenaTimeline(): MiNuevaEscenaSnapshot[] {
  return [
    { stepIndex: 0, timeSec: 0, description: 'Paso 1...', phaseLabel: 'INICIO', statusText: 'OK' },
    { stepIndex: 1, timeSec: 3.5, description: 'Paso 2...', phaseLabel: 'PROCESO', statusText: 'OK' },
  ];
}
```

### 2. Crear el Viewport vertical 9:16
Crea el componente de UI en `src/components/<Nombre>VerticalViewport.tsx` para renderizar el snapshot visualmente:

```tsx
import React from 'react';
import { MiNuevaEscenaSnapshot } from '../data/miNuevaEscenaAlgorithm';

export function MiNuevaEscenaVerticalViewport({ snapshot }: { snapshot: MiNuevaEscenaSnapshot }) {
  return (
    <div className="w-[360px] sm:w-[400px] aspect-[9/16] bg-[#0a0e17] rounded-3xl border-2 border-[#1f2937] p-5 flex flex-col justify-between">
      <h2 className="text-white font-bold">{snapshot.phaseLabel}</h2>
      <p className="text-sm text-slate-300">{snapshot.description}</p>
    </div>
  );
}
```

*(Opcional: Si deseas renderizar con Motion Canvas en video nativo, crea `src/motion-canvas/scenes/<nombre>Scene.tsx` usando `makeScene2D` y regístralo en `src/motion-canvas/project.ts`).*

### 3. Registrar la escena en el catálogo y menú
En `src/data/scenesRegistry.ts`:
1. Agrega el identificador al tipo `SceneId`:
   ```typescript
   export type SceneId = ... | 'mi_nueva_escena';
   ```
2. Agrega la configuración en `SCENES_REGISTRY`:
   ```typescript
   {
     id: 'mi_nueva_escena',
     category: 'algoritmos', // 'sunat' | 'fraude' | 'ia-desarrollo' | 'algoritmos'
     categoryLabel: 'Algoritmos',
     path: '/algoritmos/mi-nueva-escena',
     title: 'Título Completo de la Escena',
     shortTitle: 'Mi Nueva Escena',
     badge: '1080×1920 • 30s',
     description: 'Descripción breve de la animación.',
     icon: Cpu,
     colorScheme: { ... }
   }
   ```
*(El menú lateral lo ordenará y calculará el conteo automáticamente dentro de su categoría).*

### 4. Conectar en el reproductor unificado
En `src/components/ScenePlayerView.tsx`:
1. Importa el generador y el componente Viewport.
2. Agrega el caso en `activeTimeline`:
   ```tsx
   case 'mi_nueva_escena':
     return miNuevaEscenaTimeline;
   ```
3. En la selección de Viewport:
   ```tsx
   : sceneId === 'mi_nueva_escena' ? (
     <MiNuevaEscenaVerticalViewport snapshot={miNuevaEscenaTimeline[currentStepIndex]} />
   )
   ```
4. En el bloque de pseudocódigo:
   ```tsx
   : sceneId === 'mi_nueva_escena' ? (
     <PythonCodeBlock
       activeLine={currentStep.stepIndex + 1}
       customLines={MI_NUEVA_ESCENA_CODE_LINES}
       title="mi_algoritmo.py"
     />
   )
   ```

### 5. Registrar la ruta en React Router
En `src/App.tsx`, agrega la nueva ruta:

```tsx
<Route
  path="/algoritmos/mi-nueva-escena"
  element={<ScenePlayerView sceneId="mi_nueva_escena" />}
/>
```


