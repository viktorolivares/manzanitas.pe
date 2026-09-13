---
name: create-scene
description: Crea una nueva escena interactiva y procedural 9:16 siguiendo la arquitectura de 5 archivos (data, viewport, registry, player y routing).
---

# Skill: Creación de Nueva Escena

Esta skill define el procedimiento estándar, las reglas de diseño y las plantillas de código para agregar una nueva escena interactiva y procedural al proyecto.

---

## 1. Regla de Oro: Distinción de Marca y Variables de Entorno

- **`APP_NAME` (`src/config/appConfig.ts` <- `VITE_APP_NAME`):**
  - Representa el **nombre de la plataforma web / aplicación** (definido en `.env`, por defecto `"my.app"`).
  - Se utiliza exclusivamente en el menú lateral, header de la aplicación web y títulos globales de la plataforma.
- **`COMPANY_NAME` (`src/config/appConfig.ts` <- `VITE_COMPANY_NAME`):**
  - Representa la **empresa, cliente o patrocinador** para quien se genera la escena/video (definido en `.env`, por defecto `"my.app"`).
  - Se utiliza en los Viewports 9:16, marcas de agua del video, encabezado de las animaciones, créditos y escenas Motion Canvas.

---

## 2. Parámetros Técnicos y Estéticos de la Escena

- **Formato:** Vertical 9:16 (Resolución 1080x1920 proporcional).
- **Duración Objetivo:** 30 a 35 segundos exactos (repartidos entre los pasos del timeline).
- **Tasa de Refresco:** 60 FPS.
- **Paleta Técnica:**
  - Fondo Base: `#050811` o `#070b14`
  - Paneles: `#0d1527` o `#0f172a`
  - Bordes: `#1e293b`
  - Acento Primario: Cian `#38bdf8`
  - Éxito/Activo: `#10b981`
  - Error/Alerta: `#ef4444`
  - Secundarios: Violeta `#8b5cf6` / Ámbar `#f59e0b`
- **Idioma:** Español técnico riguroso.

---

## 3. Checklist de 5 Pasos para Crear una Escena

Toda escena requiere implementar o modificar exactamente estos 5 archivos:

1. `[NUEVO]` `src/data/<nombre>Algorithm.ts` (Datos y timeline de snapshots)
2. `[NUEVO]` `src/components/<Nombre>VerticalViewport.tsx` (Componente visual 9:16)
3. `[MODIFICAR]` `src/data/scenesRegistry.ts` (Tipo `SceneId` y registro en `SCENES_REGISTRY`)
4. `[MODIFICAR]` `src/components/ScenePlayerView.tsx` (Conexión al reproductor unificado)
5. `[MODIFICAR]` `src/App.tsx` (Ruta en React Router)
6. *(Opcional)* `src/motion-canvas/scenes/<nombre>Scene.tsx` (Render Motion Canvas puro)

---

## 4. Plantillas de Código (Templates)

### Archivo 1: `src/data/<nombre>Algorithm.ts`

```typescript
import { COMPANY_NAME } from '../config/appConfig';

export interface MiEscenaSnapshot {
  stepIndex: number;
  timeSec: number;
  durationSec: number;
  activeLine: number;
  phaseLabel: string;
  statusText: string;
  description: string;
  // Campos de datos específicos de la escena:
  metrics: {
    progreso: number;
    variableA: string;
    variableB: number;
  };
  highlightedItems?: string[];
}

export const MI_ESCENA_CODE_LINES = [
  "# Lógica principal del proceso",
  "def ejecutar_escena(input_data):",
  "    estado = inicializar(input_data)",
  "    resultado = procesar(estado)",
  "    return resultado",
];

export function generateMiEscenaTimeline(): MiEscenaSnapshot[] {
  const snapshots: MiEscenaSnapshot[] = [];
  let currentTime = 0;

  const stepsDef = [
    {
      line: 2,
      phase: "INICIALIZACIÓN",
      status: "Iniciando",
      duration: 3.5,
      desc: `Iniciando proceso bajo la infraestructura de ${COMPANY_NAME}.`,
      metrics: { progreso: 0, variableA: "INIT", variableB: 0 },
    },
    {
      line: 3,
      phase: "PROCESAMIENTO",
      status: "Calculando",
      duration: 4.0,
      desc: "Transformando los datos y evaluando condiciones.",
      metrics: { progreso: 50, variableA: "ACTIVE", variableB: 12 },
    },
    {
      line: 4,
      phase: "RESOLUCIÓN",
      status: "Completado",
      duration: 3.5,
      desc: "Proceso completado exitosamente con cero errores.",
      metrics: { progreso: 100, variableA: "DONE", variableB: 24 },
    },
  ];

  stepsDef.forEach((s, idx) => {
    snapshots.push({
      stepIndex: idx,
      timeSec: currentTime,
      durationSec: s.duration,
      activeLine: s.line,
      phaseLabel: s.phase,
      statusText: s.status,
      description: s.desc,
      metrics: s.metrics,
    });
    currentTime += s.duration;
  });

  return snapshots;
}
```

---

### Archivo 2: `src/components/<Nombre>VerticalViewport.tsx`

```tsx
import React from 'react';
import { COMPANY_NAME } from '../config/appConfig';
import { MiEscenaSnapshot } from '../data/miEscenaAlgorithm';
import { Sparkles, Activity } from 'lucide-react';

interface MiEscenaVerticalViewportProps {
  snapshot?: MiEscenaSnapshot;
}

export function MiEscenaVerticalViewport({ snapshot }: MiEscenaVerticalViewportProps) {
  if (!snapshot) return null;

  return (
    <div className="w-[360px] sm:w-[400px] aspect-[9/16] bg-[#070b14] rounded-3xl border-2 border-[#1e293b] p-5 flex flex-col justify-between select-none shadow-2xl relative overflow-hidden font-sans text-white">
      
      {/* 1. Header con marca de agua y estado */}
      <div className="flex items-center justify-between border-b border-[#1e293b]/70 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
          <span className="font-mono text-xs text-[#38bdf8] font-semibold tracking-wider uppercase">
            {COMPANY_NAME}
          </span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#1e293b] text-[#94a3b8] border border-[#334155]">
          {snapshot.phaseLabel}
        </span>
      </div>

      {/* 2. Área Visual Central (Canvas interactivo / Nodos / Gráficos) */}
      <div className="flex-1 my-4 flex flex-col items-center justify-center bg-[#0d1527] rounded-2xl border border-[#1e293b] p-4 relative overflow-hidden">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center mb-3">
            <Activity className="w-7 h-7 text-[#38bdf8]" />
          </div>
          <h3 className="font-bold text-lg text-white mb-1">
            {snapshot.statusText}
          </h3>
          <p className="text-xs text-[#94a3b8] max-w-[280px] mx-auto">
            {snapshot.description}
          </p>
        </div>

        {/* Ejemplo de widget de progreso o métrica */}
        <div className="w-full mt-6 bg-[#070b14] p-3 rounded-xl border border-[#1e293b]">
          <div className="flex justify-between text-[11px] font-mono text-[#94a3b8] mb-1">
            <span>Progreso</span>
            <span className="text-[#38bdf8]">{snapshot.metrics.progreso}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#38bdf8] to-[#10b981] transition-all duration-300"
              style={{ width: `${snapshot.metrics.progreso}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Panel Inferior de Variables y Telemetría */}
      <div className="bg-[#0b1120] border border-[#1e293b] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#64748b]">A:</span>
          <span className="text-[#38bdf8] font-bold">{snapshot.metrics.variableA}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#64748b]">B:</span>
          <span className="text-[#10b981] font-bold">{snapshot.metrics.variableB}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-[#64748b]">
          <Sparkles className="w-3 h-3 text-[#f59e0b]" />
          <span>60 FPS</span>
        </div>
      </div>

    </div>
  );
}
```

---

### Archivo 3: Modificaciones a `src/data/scenesRegistry.ts`

1. **Añadir el ID al tipo `SceneId`:**
```typescript
export type SceneId =
  | 'error_2119'
  | ...
  | 'mi_escena'; // <-- NUEVO
```

2. **Añadir al array `SCENES_REGISTRY`:**
```typescript
  {
    id: 'mi_escena',
    category: 'algoritmos', // 'sunat' | 'fraude' | 'ia-desarrollo' | 'algoritmos'
    categoryLabel: 'Algoritmos',
    path: '/algoritmos/mi-escena',
    title: 'Título Completo de la Escena',
    shortTitle: 'Mi Escena',
    badge: '1080×1920 • 30s',
    description: 'Descripción didáctica de lo que visualiza esta animación.',
    icon: Sparkles, // de lucide-react
    colorScheme: {
      accent: '#38bdf8',
      border: 'border-[#38bdf8]/30',
      bgHover: 'hover:bg-[#38bdf8]/10',
      badgeBg: 'bg-[#38bdf8]/10',
      badgeText: 'text-[#38bdf8]',
      gradient: 'from-[#38bdf8] to-[#0284c7]',
    },
  },
```

---

### Archivo 4: Modificaciones a `src/components/ScenePlayerView.tsx`

1. **Imports:**
```typescript
import { generateMiEscenaTimeline, MI_ESCENA_CODE_LINES } from '../data/miEscenaAlgorithm';
import { MiEscenaVerticalViewport } from './MiEscenaVerticalViewport';
```

2. **Memoize del timeline:**
```typescript
const miEscenaTimeline = useMemo(() => generateMiEscenaTimeline(), []);
```

3. **En `activeTimeline` (switch/case):**
```typescript
case 'mi_escena':
  return miEscenaTimeline;
```

4. **En el bloque de renderizado del Viewport (ternarios):**
```tsx
: sceneId === 'mi_escena' ? (
  <MiEscenaVerticalViewport snapshot={miEscenaTimeline[currentStepIndex]} />
)
```

5. **En el visor de código:**
```tsx
: sceneId === 'mi_escena' ? (
  <PythonCodeBlock
    activeLine={currentStep.activeLine}
    customLines={MI_ESCENA_CODE_LINES}
    title="mi_algoritmo.py"
  />
)
```

---

### Archivo 5: Modificaciones a `src/App.tsx`

1. **Registrar la ruta bajo `<Route element={<AppLayout />}>`:**
```tsx
<Route
  path="/algoritmos/mi-escena"
  element={<ScenePlayerView sceneId="mi_escena" />}
/>
```
2. **(Opcional) Atajo de compatibilidad directa:**
```tsx
<Route path="/mi_escena" element={<Navigate to="/algoritmos/mi-escena" replace />} />
```

---

## 5. Verificación de Compilación

Tras generar o modificar los archivos, ejecuta siempre:
```bash
npx tsc --noEmit
```
Para asegurar que no existan errores de tipos, referencias rotas ni desincronización de `SceneId`.
