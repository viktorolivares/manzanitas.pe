export interface MapNode {
  id: string;
  label: string;
  x: number; // grid percentage/relative
  y: number;
  isOrigin?: boolean;
  isDestination?: boolean;
  costText?: string;
  status: 'idle' | 'scanning' | 'discarded' | 'optimal';
}

export interface MapRoad {
  id: string;
  from: string;
  to: string;
  dist: string;
  status: 'base' | 'traffic' | 'scanning' | 'optimal';
}

export interface MapsSnapshot {
  stepIndex: number;
  timeSec: number;
  stepDurationMs: number;
  phase: 'GRAPH_MAP' | 'TRAFFIC_INCIDENT' | 'ASTAR_SCAN' | 'OPTIMAL_ROUTE' | 'SUMMARY';
  phaseLabel: string;
  stepTitle: string;
  description: string;
  nodes: MapNode[];
  roads: MapRoad[];
  trafficActive: boolean;
  radarActive: boolean;
  winningRouteActive: boolean;
  particlePosNodeId?: string;
  subtitle: string;
  subtitleColor: string;
  summaryActive: boolean;
}

export const MAPS_CODE_LINES = [
  '# Google Maps A* Pathfinding Engine + Telemetría GPS en Vivo',
  '# 1. Definición de Grafo Urbano (Intersecciones y Aristas):',
  'grafo = CargarCallesConTrafico(area="Lima_Centro")',
  '# 2. Evento de Tráfico en Tiempo Real detectado por sensores GPS:',
  'grafo.ActualizarTrafico(calle="Centro_AvSur", peso_minutos=+18)',
  '# 3. Función Heurística A*: f(n) = g(n) + h(n)',
  '#    g(n) = Minutos reales acumulados desde ORIGEN',
  '#    h(n) = Distancia estimada euclidiana / velocidad esperada a DESTINO',
  'cola_prioridad.push((f_score, nodo_origen))',
  '# 4. Búsqueda y Poda en < 5ms:',
  'ruta_optima = AStar_Engine.BuscarRuta(inicio, destino, con_trafico=True)',
  '# 5. Resultado: Desvío por Autopista Periférica: 12 min (-6 min vs congestión)',
];

export function generateMapsTimeline(): MapsSnapshot[] {
  const baseNodes: MapNode[] = [
    { id: 'A', label: 'TU AUTO', x: 20, y: 18, isOrigin: true, status: 'optimal' },
    { id: 'B', label: 'AV. NORTE', x: 48, y: 22, status: 'idle' },
    { id: 'C', label: 'AUTOPISTA', x: 80, y: 26, status: 'idle' },
    { id: 'D', label: 'CENTRO 1', x: 30, y: 46, status: 'idle' },
    { id: 'E', label: 'CENTRO 2', x: 68, y: 50, status: 'idle' },
    { id: 'F', label: 'PUENTE OESTE', x: 25, y: 72, status: 'idle' },
    { id: 'G', label: 'AV. SUR', x: 55, y: 74, status: 'idle' },
    { id: 'H', label: 'OFICINA', x: 78, y: 86, isDestination: true, status: 'idle' },
  ];

  const baseRoads: MapRoad[] = [
    { id: 'r_AB', from: 'A', to: 'B', dist: '3 min', status: 'base' },
    { id: 'r_BC', from: 'B', to: 'C', dist: '3 min', status: 'base' },
    { id: 'r_CE', from: 'C', to: 'E', dist: '3 min', status: 'base' },
    { id: 'r_EH', from: 'E', to: 'H', dist: '3 min', status: 'base' },
    { id: 'r_AD', from: 'A', to: 'D', dist: '4 min', status: 'base' },
    { id: 'r_DG', from: 'D', to: 'G', dist: '5 min', status: 'base' },
    { id: 'r_GH', from: 'G', to: 'H', dist: '5 min', status: 'base' },
    { id: 'r_BD', from: 'B', to: 'D', dist: '4 min', status: 'base' },
    { id: 'r_DF', from: 'D', to: 'F', dist: '6 min', status: 'base' },
    { id: 'r_FG', from: 'F', to: 'G', dist: '5 min', status: 'base' },
    { id: 'r_EG', from: 'E', to: 'G', dist: '4 min', status: 'base' },
  ];

  return [
    {
      stepIndex: 0,
      timeSec: 0,
      stepDurationMs: 3400,
      phase: 'GRAPH_MAP',
      phaseLabel: '1. MAPA Y RED DE NODOS',
      stepTitle: 'Fase 1: Representación Urbana en Grafo',
      description: 'El mapa se modela como un grafo de navegación: intersecciones son nodos y las avenidas son aristas ponderadas por tiempo estimado de viaje.',
      subtitle: 'Inicializando red satelital urbana...',
      subtitleColor: '#38bdf8',
      nodes: baseNodes,
      roads: baseRoads,
      trafficActive: false,
      radarActive: false,
      winningRouteActive: false,
      summaryActive: false,
    },
    {
      stepIndex: 1,
      timeSec: 3.4,
      stepDurationMs: 3500,
      phase: 'TRAFFIC_INCIDENT',
      phaseLabel: '2. EVENTO DE TRÁFICO',
      stepTitle: 'Fase 2: Congestión Repentina (+18 MIN)',
      description: 'Sensores de GPS de otros conductores detectan desaceleración crítica en la avenida directa. La calle D -> G colapsa y su peso se eleva en rojo.',
      subtitle: '¡Incidente de tráfico! La ruta directa está colapsada (+18 min)',
      subtitleColor: '#ef4444',
      nodes: baseNodes.map((n) => (n.id === 'D' || n.id === 'G' ? { ...n, status: 'discarded' } : n)),
      roads: baseRoads.map((r) => (r.id === 'r_DG' ? { ...r, status: 'traffic' } : r)),
      trafficActive: true,
      radarActive: false,
      winningRouteActive: false,
      summaryActive: false,
    },
    {
      stepIndex: 2,
      timeSec: 6.9,
      stepDurationMs: 3500,
      phase: 'ASTAR_SCAN',
      phaseLabel: '3. EXPLORACIÓN A*',
      stepTitle: 'Fase 3: Disparo de Radar Heurístico f(n) = g(n) + h(n)',
      description: 'El motor de Google Maps dispara ondas de exploración. No busca a ciegas: combina el tiempo ya recorrido g(n) con la distancia estimada en línea recta h(n).',
      subtitle: 'Calculando costo mínimo: f(n) = g(n) [recorrido] + h(n) [heurística]',
      subtitleColor: '#38bdf8',
      nodes: baseNodes.map((n) => {
        if (n.id === 'D') return { ...n, status: 'discarded', costText: 'f(D) = 28m (x)' };
        if (n.id === 'B') return { ...n, status: 'scanning', costText: 'f(B) = 12m (ok)' };
        return n;
      }),
      roads: baseRoads.map((r) => {
        if (r.id === 'r_DG') return { ...r, status: 'traffic' };
        if (r.id === 'r_AB' || r.id === 'r_AD') return { ...r, status: 'scanning' };
        return r;
      }),
      trafficActive: true,
      radarActive: true,
      winningRouteActive: false,
      summaryActive: false,
    },
    {
      stepIndex: 3,
      timeSec: 10.4,
      stepDurationMs: 3500,
      phase: 'OPTIMAL_ROUTE',
      phaseLabel: '4. RUTA GANADORA',
      stepTitle: 'Fase 4: Trazado Óptimo en Verde Neón',
      description: 'A* descarta la ruta central congestionada (28 min) y selecciona la autopista periférica norte (12 min). La ruta ganadora se ilumina con brillo neón.',
      subtitle: '¡Ruta periférica seleccionada! Resuelve en 4.2 milisegundos',
      subtitleColor: '#10b981',
      nodes: baseNodes.map((n) => {
        if (['A', 'B', 'C', 'E', 'H'].includes(n.id)) return { ...n, status: 'optimal' };
        if (n.id === 'D') return { ...n, status: 'discarded', costText: 'Descartado' };
        return n;
      }),
      roads: baseRoads.map((r) => {
        if (r.id === 'r_DG') return { ...r, status: 'traffic' };
        if (['r_AB', 'r_BC', 'r_CE', 'r_EH'].includes(r.id)) return { ...r, status: 'optimal' };
        return r;
      }),
      trafficActive: true,
      radarActive: false,
      winningRouteActive: true,
      particlePosNodeId: 'C',
      summaryActive: true,
    },
    {
      stepIndex: 4,
      timeSec: 13.9,
      stepDurationMs: 4000,
      phase: 'SUMMARY',
      phaseLabel: '5. TELEMETRÍA FINAL',
      stepTitle: 'Fase 5: Ahorro de Tiempo y Llegada',
      description: 'El vehículo llega a destino en 12 minutos, ahorrando 6 minutos frente a condiciones normales y evitando 18 minutos de embotellamiento.',
      subtitle: 'AHORRO TOTAL: -6 MIN (12 min vs 28 min en tráfico)',
      subtitleColor: '#10b981',
      nodes: baseNodes.map((n) => {
        if (['A', 'B', 'C', 'E', 'H'].includes(n.id)) return { ...n, status: 'optimal' };
        return n;
      }),
      roads: baseRoads.map((r) => {
        if (r.id === 'r_DG') return { ...r, status: 'traffic' };
        if (['r_AB', 'r_BC', 'r_CE', 'r_EH'].includes(r.id)) return { ...r, status: 'optimal' };
        return r;
      }),
      trafficActive: true,
      radarActive: false,
      winningRouteActive: true,
      particlePosNodeId: 'H',
      summaryActive: true,
    },
  ];
}
