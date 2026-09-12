export interface FraudNode {
  id: string;
  label: string;
  x: number; // percentage in viewport canvas
  y: number;
  isCycle: boolean;
  status: 'idle' | 'legit' | 'warning' | 'fraud' | 'quarantined';
}

export interface FraudEdge {
  id: string;
  from: string;
  to: string;
  amount: string;
  isCycle: boolean;
  status: 'base' | 'legit' | 'warning' | 'fraud' | 'disconnected' | 'safe';
}

export interface FraudSnapshot {
  stepIndex: number;
  timeSec: number;
  stepDurationMs: number;
  phase: 'NETWORK_SETUP' | 'ANOMALY_LOOP' | 'CYCLE_DETECTION' | 'MITIGATION_SHIELD';
  phaseLabel: string;
  stepTitle: string;
  description: string;
  latencyText: string;
  statusBadgeText: string;
  statusBadgeColor: string;
  anomalyRateText?: string;
  riskScore?: string;
  actionText?: string;
  nodes: FraudNode[];
  edges: FraudEdge[];
  activeParticleFrom?: string;
  activeParticleTo?: string;
  shieldActive: boolean;
  alertCardActive: boolean;
  shockwaveActive: boolean;
}

export const FRAUD_CODE_LINES = [
  '# Algoritmo de Detección de Ciclos de Lavado en Grafos (Tarjan SCC / Cycle Detection)',
  '# 1. Ingreso de eventos de transferencia en stream distribuido (Kafka/Flink):',
  'grafo_financiero = GrafoTransaccional()',
  '# 2. Análisis de dispersión y velocidad por ventana temporal (120ms):',
  'subgrafo = grafo_financiero.FiltrarVentanaTemporal(delta_ms=120)',
  '# 3. Detección de Ciclos Fuertemente Conectados:',
  'ciclos = Tarjan_SCC.BuscarCiclosCerrados(subgrafo)',
  '# 4. Cálculo de Score de Riesgo Financiero:',
  'for ciclo in ciclos:',
  '    if ciclo.monto_circular > $50_000 and ciclo.hops >= 3:',
  '        riesgo = 0.994 # 99.4% Certeza de Pitufeo / Lavado Circular',
  '        MotorRiesgo.CongelarFondos(cuentas=ciclo.nodos)',
  '        RedDistribuida.AislarCluster(cluster_id=ciclo.id) # 0 FUGAS',
];

export function generateFraudTimeline(): FraudSnapshot[] {
  const baseNodes: FraudNode[] = [
    { id: 'A', label: 'CUENTA A', x: 32, y: 34, isCycle: true, status: 'idle' },
    { id: 'B', label: 'CUENTA B', x: 68, y: 34, isCycle: true, status: 'idle' },
    { id: 'C', label: 'CUENTA C', x: 70, y: 64, isCycle: true, status: 'idle' },
    { id: 'D', label: 'CUENTA D', x: 35, y: 66, isCycle: true, status: 'idle' },
    { id: 'E', label: 'E-COMMERCE', x: 15, y: 18, isCycle: false, status: 'legit' },
    { id: 'F', label: 'PAGO NÓMINA', x: 84, y: 18, isCycle: false, status: 'legit' },
    { id: 'G', label: 'CUENTA RETAIL', x: 16, y: 84, isCycle: false, status: 'legit' },
    { id: 'H', label: 'TARJETA DÉB.', x: 82, y: 84, isCycle: false, status: 'legit' },
  ];

  const baseEdges: FraudEdge[] = [
    { id: 'e_AB', from: 'A', to: 'B', amount: '$45k', isCycle: true, status: 'base' },
    { id: 'e_BC', from: 'B', to: 'C', amount: '$44.9k', isCycle: true, status: 'base' },
    { id: 'e_CD', from: 'C', to: 'D', amount: '$44.8k', isCycle: true, status: 'base' },
    { id: 'e_DA', from: 'D', to: 'A', amount: '$44.7k', isCycle: true, status: 'base' },
    { id: 'e_EA', from: 'E', to: 'A', amount: '$120', isCycle: false, status: 'legit' },
    { id: 'e_FB', from: 'F', to: 'B', amount: '$1.8k', isCycle: false, status: 'legit' },
    { id: 'e_DG', from: 'D', to: 'G', amount: '$65', isCycle: false, status: 'legit' },
    { id: 'e_CH', from: 'C', to: 'H', amount: '$310', isCycle: false, status: 'legit' },
    { id: 'e_EF', from: 'E', to: 'F', amount: '$890', isCycle: false, status: 'base' },
    { id: 'e_GH', from: 'G', to: 'H', amount: '$430', isCycle: false, status: 'base' },
  ];

  return [
    {
      stepIndex: 0,
      timeSec: 0,
      stepDurationMs: 7000,
      phase: 'NETWORK_SETUP',
      phaseLabel: 'FASE 1 • RED FINANCIERA',
      stepTitle: 'Fase 1: Transacciones Legítimas Interbancarias',
      description: '8 cuentas y comercios procesan operaciones legítimas en tiempo real. Partículas cian fluyen entre nodos con confirmaciones HTTP 200 OK.',
      latencyText: 'LATENCIA: 1.2ms',
      statusBadgeText: 'SISTEMAS DISTRIBUIDOS • FRAUD SHIELD',
      statusBadgeColor: '#38bdf8',
      nodes: baseNodes.map((n) => ({ ...n, status: n.isCycle ? 'idle' : 'legit' })),
      edges: baseEdges,
      activeParticleFrom: 'E',
      activeParticleTo: 'A',
      shieldActive: false,
      alertCardActive: false,
      shockwaveActive: false,
    },
    {
      stepIndex: 1,
      timeSec: 7.0,
      stepDurationMs: 8000,
      phase: 'ANOMALY_LOOP',
      phaseLabel: 'FASE 2 • BUCLE ANÓMALO',
      stepTitle: 'Fase 2: Dispersión Circular en Alta Frecuencia',
      description: '4 cuentas transfieren $179,400 en un bucle cerrado a gran velocidad. El grosor de las líneas aumenta y su color cambia a ámbar advertencia (#f59e0b).',
      latencyText: 'LATENCIA: 3.4ms',
      statusBadgeText: 'ALERT • FLUJO ANÓMALO',
      statusBadgeColor: '#f59e0b',
      anomalyRateText: 'VELOCIDAD: ANÓMALA (4 HOPS / 120ms)',
      nodes: baseNodes.map((n) => (n.isCycle ? { ...n, status: 'warning' } : n)),
      edges: baseEdges.map((e) => (e.isCycle ? { ...e, status: 'warning' } : e)),
      activeParticleFrom: 'A',
      activeParticleTo: 'B',
      shieldActive: false,
      alertCardActive: false,
      shockwaveActive: false,
    },
    {
      stepIndex: 2,
      timeSec: 15.0,
      stepDurationMs: 10000,
      phase: 'CYCLE_DETECTION',
      phaseLabel: 'FASE 3 • ESCANEO ALGORÍTMICO',
      stepTitle: 'Fase 3: Alerta Máxima y Ciclo de Lavado',
      description: 'Una onda de choque circular frena la red (bullet-time). Tarjan Cycle Detection confirma ciclo cerrado en rojo fuego (#ef4444). RIESGO: 99.4%, Congelando Fondos.',
      latencyText: 'LATENCIA: 0.8ms (ANÁLISIS)',
      statusBadgeText: 'CRITICAL • BLOQUEO INMEDIATO',
      statusBadgeColor: '#ef4444',
      riskScore: 'RIESGO: 99.4%',
      actionText: 'CONGELANDO FONDOS ($179.4k)...',
      nodes: baseNodes.map((n) => (n.isCycle ? { ...n, status: 'fraud' } : n)),
      edges: baseEdges.map((e) => (e.isCycle ? { ...e, status: 'fraud' } : e)),
      shieldActive: false,
      alertCardActive: true,
      shockwaveActive: true,
    },
    {
      stepIndex: 3,
      timeSec: 25.0,
      stepDurationMs: 7500,
      phase: 'MITIGATION_SHIELD',
      phaseLabel: 'FASE 4 • MITIGACIÓN Y ESCUDO',
      stepTitle: 'Fase 4: Aislamiento del Clúster y 0 Fugas',
      description: 'Un escudo esmeralda (#10b981) aísla el clúster fraudulento del resto del sistema. Las transferencias legítimas se reanudan con total seguridad.',
      latencyText: 'LATENCIA FINAL: 1.1ms',
      statusBadgeText: 'RED SEGURA • 0 FUGAS',
      statusBadgeColor: '#10b981',
      nodes: baseNodes.map((n) => (n.isCycle ? { ...n, status: 'quarantined' } : { ...n, status: 'legit' })),
      edges: baseEdges.map((e) => {
        if (e.isCycle) return { ...e, status: 'disconnected' };
        if (['e_EA', 'e_FB', 'e_DG', 'e_CH'].includes(e.id)) return { ...e, status: 'disconnected' };
        return { ...e, status: 'safe' };
      }),
      shieldActive: true,
      alertCardActive: false,
      shockwaveActive: false,
    },
  ];
}
