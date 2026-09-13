import React from 'react';
import {
  AlertTriangle,
  Cloud,
  FileCheck2,
  ShieldAlert,
  Sparkles,
  Navigation,
  Database,
  Cpu,
  Network,
  Landmark,
  ShieldCheck,
  BrainCircuit,
  Binary,
  LucideIcon,
} from 'lucide-react';

export type SceneCategory = 'sunat' | 'fraude' | 'ia-desarrollo' | 'algoritmos';

export type SceneId =
  | 'error_2119'
  | 'pse_ose'
  | 'facturacion'
  | 'fraud'
  | 'embedding'
  | 'maps'
  | 'cacheflow'
  | 'eventloop'
  | 'bfs';

export interface SceneMeta {
  id: SceneId;
  category: SceneCategory;
  categoryLabel: string;
  path: string;
  title: string;
  shortTitle: string;
  badge: string;
  description: string;
  icon: LucideIcon;
  colorScheme: {
    accent: string;
    border: string;
    bgHover: string;
    badgeBg: string;
    badgeText: string;
    gradient: string;
  };
}

export interface CategoryMeta {
  id: SceneCategory;
  name: string;
  badge: string;
  description: string;
  icon: LucideIcon;
  scenes: SceneMeta[];
}

export const SCENES_REGISTRY: SceneMeta[] = [
  // --- CATEGORÍA SUNAT ---
  {
    id: 'error_2119',
    category: 'sunat',
    categoryLabel: 'SUNAT',
    path: '/sunat/error-2119',
    title: 'Diagnóstico y Solución del Error 2119 de IGV / Esquema UBL 2.1',
    shortTitle: 'Error 2119 IGV',
    badge: '1080×1920 • 33s',
    description: '¿Por qué SUNAT rechaza tu comprobante? Debugging profundo de esquemas XML UBL 2.1 y cálculo de IGV.',
    icon: AlertTriangle,
    colorScheme: {
      accent: '#ef4444',
      border: 'border-red-500/40',
      bgHover: 'hover:bg-red-500/10',
      badgeBg: 'bg-red-500/15',
      badgeText: 'text-red-400',
      gradient: 'from-[#ef4444] to-[#f97316]',
    },
  },
  {
    id: 'facturacion',
    category: 'sunat',
    categoryLabel: 'SUNAT',
    path: '/sunat/facturacion',
    title: 'Pipeline de Facturación Electrónica SUNAT (10 Pasos)',
    shortTitle: 'Facturación SUNAT',
    badge: '1080×1920 • 34s',
    description: 'Flujo completo: ERP, UBL 2.1, Firma Digital X.509, WebService SOAP, Error 2324 y CDR Aceptado.',
    icon: FileCheck2,
    colorScheme: {
      accent: '#0284c7',
      border: 'border-sky-500/40',
      bgHover: 'hover:bg-sky-500/10',
      badgeBg: 'bg-sky-500/15',
      badgeText: 'text-sky-400',
      gradient: 'from-[#0284c7] to-[#10b981]',
    },
  },
  {
    id: 'pse_ose',
    category: 'sunat',
    categoryLabel: 'SUNAT',
    path: '/sunat/pse-ose',
    title: 'Arquitectura de Facturación con PSE y OSE Cloud',
    shortTitle: 'PSE y OSE Cloud',
    badge: '1080×1920 • 33s',
    description: 'Desacoplamiento de servidores SUNAT, validación sintáctica en milisegundos y contingencia de emisión.',
    icon: Cloud,
    colorScheme: {
      accent: '#8b5cf6',
      border: 'border-purple-500/40',
      bgHover: 'hover:bg-purple-500/10',
      badgeBg: 'bg-purple-500/15',
      badgeText: 'text-purple-400',
      gradient: 'from-[#8b5cf6] to-[#10b981]',
    },
  },

  // --- CATEGORÍA FRAUDE ---
  {
    id: 'fraud',
    category: 'fraude',
    categoryLabel: 'Fraude',
    path: '/fraude/grafos',
    title: 'Detección de Fraude Financiero en Tiempo Real con Grafos',
    shortTitle: 'Fraude Grafos',
    badge: '1080×1920 • 33s',
    description: 'Cycle Detection, topología de mulas bancarias, transacciones circulares y cálculo dinámico de Risk Scoring.',
    icon: ShieldAlert,
    colorScheme: {
      accent: '#f43f5e',
      border: 'border-rose-500/40',
      bgHover: 'hover:bg-rose-500/10',
      badgeBg: 'bg-rose-500/15',
      badgeText: 'text-rose-400',
      gradient: 'from-[#f43f5e] to-[#ef4444]',
    },
  },

  // --- CATEGORÍA IA DESARROLLO ---
  {
    id: 'embedding',
    category: 'ia-desarrollo',
    categoryLabel: 'IA Desarrollo',
    path: '/ia-desarrollo/embeddings',
    title: '¿Cómo entiende una IA las palabras? El mapa de los Embeddings',
    shortTitle: 'Embeddings IA',
    badge: '1080×1920 • 32s',
    description: 'Álgebra vectorial en espacio semántico de alta dimensión: Rey - Hombre + Mujer = Reina.',
    icon: Sparkles,
    colorScheme: {
      accent: '#a855f7',
      border: 'border-purple-500/40',
      bgHover: 'hover:bg-purple-500/10',
      badgeBg: 'bg-purple-500/15',
      badgeText: 'text-purple-400',
      gradient: 'from-[#a855f7] to-[#ec4899]',
    },
  },

  // --- CATEGORÍA ALGORITMOS ---
  {
    id: 'maps',
    category: 'algoritmos',
    categoryLabel: 'Algoritmos',
    path: '/algoritmos/maps',
    title: '¿Cómo calcula Google Maps tu ruta más rápida? A* Pathfinding',
    shortTitle: 'Google Maps A*',
    badge: '1080×1920 • 33s',
    description: 'Heurística Euclídea de Manhattan, ponderación de congestión vial y exploración dirigida de grafos viales.',
    icon: Navigation,
    colorScheme: {
      accent: '#10b981',
      border: 'border-emerald-500/40',
      bgHover: 'hover:bg-emerald-500/10',
      badgeBg: 'bg-emerald-500/15',
      badgeText: 'text-emerald-400',
      gradient: 'from-[#10b981] to-[#059669]',
    },
  },
  {
    id: 'cacheflow',
    category: 'algoritmos',
    categoryLabel: 'Algoritmos',
    path: '/algoritmos/cacheflow',
    title: 'Flujo de API con Cache Hit vs Cache Miss (Redis -> SQL)',
    shortTitle: 'Cache Hit vs Miss',
    badge: '1080×1920 • 28s',
    description: 'Optimización de latencia en microservicios: verificación ultra veloz en RAM vs consultas pesadas en disco.',
    icon: Database,
    colorScheme: {
      accent: '#38bdf8',
      border: 'border-sky-500/40',
      bgHover: 'hover:bg-sky-500/10',
      badgeBg: 'bg-sky-500/15',
      badgeText: 'text-sky-400',
      gradient: 'from-[#38bdf8] to-[#0284c7]',
    },
  },
  {
    id: 'eventloop',
    category: 'algoritmos',
    categoryLabel: 'Algoritmos',
    path: '/algoritmos/eventloop',
    title: 'Concurrencia, Event Loop, Call Stack y Microtask Queue en JS',
    shortTitle: 'Event Loop JS',
    badge: '1080×1920 • 35s',
    description: 'Modelo no bloqueante de JavaScript: Call Stack, promesas Microtasks y temporizadores Macrotasks.',
    icon: Cpu,
    colorScheme: {
      accent: '#eab308',
      border: 'border-yellow-500/40',
      bgHover: 'hover:bg-yellow-500/10',
      badgeBg: 'bg-yellow-500/15',
      badgeText: 'text-yellow-400',
      gradient: 'from-[#eab308] to-[#f59e0b]',
    },
  },
  {
    id: 'bfs',
    category: 'algoritmos',
    categoryLabel: 'Algoritmos',
    path: '/algoritmos/bfs',
    title: 'Búsqueda en Anchura (BFS) en Matriz 5x5 con Python',
    shortTitle: 'BFS Matriz 5x5',
    badge: '1080×1920 • 30s',
    description: 'Exploración por capas, estructuras FIFO (Queue) y determinación de camino más corto en cuadrículas.',
    icon: Network,
    colorScheme: {
      accent: '#6366f1',
      border: 'border-indigo-500/40',
      bgHover: 'hover:bg-indigo-500/10',
      badgeBg: 'bg-indigo-500/15',
      badgeText: 'text-indigo-400',
      gradient: 'from-[#6366f1] to-[#8b5cf6]',
    },
  },
];

export const CATEGORIES_CONFIG: {
  id: SceneCategory;
  name: string;
  icon: LucideIcon;
  badge: string;
}[] = [
  {
    id: 'sunat',
    name: 'SUNAT',
    icon: Landmark,
    badge: '3 escenas',
  },
  {
    id: 'fraude',
    name: 'Fraude',
    icon: ShieldCheck,
    badge: '1 escena',
  },
  {
    id: 'ia-desarrollo',
    name: 'IA Desarrollo',
    icon: BrainCircuit,
    badge: '1 escena',
  },
  {
    id: 'algoritmos',
    name: 'Algoritmos',
    icon: Binary,
    badge: '4 escenas',
  },
];

export function getCategoriesWithScenes(): CategoryMeta[] {
  return CATEGORIES_CONFIG.map((cat) => ({
    ...cat,
    description: '',
    scenes: SCENES_REGISTRY.filter((scene) => scene.category === cat.id),
  }));
}

export function getSceneById(id: string): SceneMeta | undefined {
  return SCENES_REGISTRY.find((scene) => scene.id === id);
}

export function getSceneByPath(path: string): SceneMeta | undefined {
  return SCENES_REGISTRY.find((scene) => scene.path === path);
}
