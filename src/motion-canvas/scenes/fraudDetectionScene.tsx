import {makeScene2D} from '@motion-canvas/2d';
import {
  all,
  chain,
  sequence,
  waitFor,
  createRef,
  createSignal,
  easeOutBack,
  easeInOutCubic,
  easeOutCubic,
  easeInOutSine,
  Vector2,
} from '@motion-canvas/core';
import {
  Node,
  Rect,
  Circle,
  Txt,
  Line,
} from '@motion-canvas/2d';
import { COMPANY_NAME } from '../../config/appConfig';

/**
 * PALETA FINTECH CYBERNETIC DARK
 */
const COLORES = {
  fondo: '#06080f',
  lineasBase: '#1e293b',
  lineasActivas: '#334155',
  nodoNormal: '#0f172a',
  nodoBorde: '#334155',
  transferenciaNormal: '#38bdf8', // Cian neón legítimo
  avisoAmbar: '#f59e0b',          // Ámbar sospechoso
  alertaRoja: '#ef4444',          // Rojo fuego fraude
  exitoVerde: '#10b981',          // Verde esmeralda mitigación
  tarjetaBg: '#0b1120',
  tarjetaBorde: '#1e293b',
  textoBlanco: '#f8fafc',
  textoMutado: '#64748b',
};

export default makeScene2D(function* (view) {
  // =========================================================================
  // 1. LIENZO VERTICAL 1080x1920 & FONDO ULTRA OSCURO CON RETÍCULA TÁCTICA
  // =========================================================================
  view.add(
    <Rect
      width={1080}
      height={1920}
      fill={COLORES.fondo}
    />
  );

  // Cuadrícula táctica sutil (banca y grafos distribuidos)
  const gridNode = createRef<Node>();
  view.add(
    <Node ref={gridNode} opacity={0.10}>
      {Array.from({length: 19}).map((_, i) => (
        <Line
          key={'gh_' + i}
          points={[[-540, -960 + i * 105], [540, -960 + i * 105]]}
          stroke={'#38bdf8'}
          lineWidth={1}
          lineDash={[4, 16]}
        />
      ))}
      {Array.from({length: 11}).map((_, i) => (
        <Line
          key={'gv_' + i}
          points={[[-540 + i * 108, -960], [-540 + i * 108, 960]]}
          stroke={'#38bdf8'}
          lineWidth={1}
          lineDash={[4, 16]}
        />
      ))}
    </Node>
  );

  // =========================================================================
  // 2. HEADER SUPERIOR (Y = -860) • BRANDING Y TELEMETRÍA DINÁMICA
  // =========================================================================
  const headerNode = createRef<Node>();
  const radarPulse = createSignal(1);
  const radarOpacity = createSignal(0.8);
  const latencyText = createSignal('LATENCIA: 1.2ms');
  const latencyColor = createSignal(COLORES.exitoVerde);
  const statusBadgeText = createSignal('SISTEMAS DISTRIBUIDOS • FRAUD SHIELD');
  const statusBadgeBg = createSignal(COLORES.tarjetaBg);
  const statusBadgeBorder = createSignal(COLORES.tarjetaBorde);
  const statusBadgeColor = createSignal(COLORES.transferenciaNormal);

  view.add(
    <Node ref={headerNode} y={-860}>
      {/* Izquierda: Radar Ping verde neón + Marca codevo.pe */}
      <Circle
        x={-420}
        y={0}
        size={22}
        fill={COLORES.exitoVerde}
        shadowColor={COLORES.exitoVerde}
        shadowBlur={16}
      />
      <Circle
        x={-420}
        y={0}
        size={44}
        stroke={COLORES.exitoVerde}
        lineWidth={2}
        scale={() => radarPulse()}
        opacity={() => radarOpacity()}
      />

      <Txt
        x={-300}
        y={0}
        text={COMPANY_NAME}
        fontFamily="monospace"
        fontWeight={900}
        fontSize={36}
        letterSpacing={4}
        fill={COLORES.textoBlanco}
      />

      {/* Derecha: Badge de Sistemas Distribuidos */}
      <Rect
        x={270}
        y={-14}
        width={450}
        height={50}
        radius={25}
        fill={() => statusBadgeBg()}
        stroke={() => statusBadgeBorder()}
        lineWidth={2}
      >
        <Txt
          text={() => statusBadgeText()}
          fontFamily="monospace"
          fontWeight={800}
          fontSize={14}
          fill={() => statusBadgeColor()}
          letterSpacing={1.5}
        />
      </Rect>

      {/* Cronómetro de latencia dinámica */}
      <Txt
        x={270}
        y={28}
        text={() => latencyText()}
        fontFamily="monospace"
        fontWeight={700}
        fontSize={13}
        fill={() => latencyColor()}
        letterSpacing={2}
      />
    </Node>
  );

  // =========================================================================
  // 3. TÍTULOS CINEMÁTICOS DE ESCENA (Y = -720)
  // =========================================================================
  const sceneTitle = createRef<Txt>();
  const sceneSubtitle = createRef<Txt>();

  view.add(
    <Node y={-720}>
      <Txt
        ref={sceneTitle}
        text="DETECCIÓN DE FRAUDE FINANCIERO"
        fontFamily="monospace"
        fontWeight={900}
        fontSize={36}
        letterSpacing={2}
        fill={COLORES.textoBlanco}
        y={-22}
      />
      <Txt
        ref={sceneSubtitle}
        text="Análisis de Grafos en Tiempo Real • Cycle Detection"
        fontFamily="sans-serif"
        fontWeight={600}
        fontSize={22}
        fill={COLORES.textoMutado}
        y={30}
      />
    </Node>
  );

  // =========================================================================
  // 4. ESTRUCTURA DEL GRAFO BANCARIO (8 NODOS)
  // =========================================================================
  // Nodos 0, 1, 2, 3 forman el anillo central de lavado (A -> B -> C -> D -> A)
  // Nodos 4, 5, 6, 7 son comercios y cuentas legítimas externas
  const NODES_DATA = [
    // Bucle sospechoso (Centro / Cuadrilátero)
    { id: 'A', label: 'CUENTA A', pos: [-190, -180], type: 'account', ring: true },
    { id: 'B', label: 'CUENTA B', pos: [190, -180],  type: 'account', ring: true },
    { id: 'C', label: 'CUENTA C', pos: [220, 180],   type: 'account', ring: true },
    { id: 'D', label: 'CUENTA D', pos: [-160, 200],  type: 'account', ring: true },

    // Cuentas y comercios legítimos periféricos
    { id: 'E', label: 'E-COMMERCE',   pos: [-380, -420], type: 'merchant', ring: false },
    { id: 'F', label: 'PAGO NÓMINA',  pos: [360, -410],  type: 'bank',     ring: false },
    { id: 'G', label: 'CUENTA RETAIL',pos: [-360, 440],  type: 'merchant', ring: false },
    { id: 'H', label: 'TARJETA DEB.', pos: [340, 460],   type: 'account',  ring: false },
  ];

  const nodeRefs = NODES_DATA.map(() => createRef<Node>());
  const nodeCircleRefs = NODES_DATA.map(() => createRef<Circle>());
  const nodeGlowRefs = NODES_DATA.map(() => createRef<Circle>());

  // ARISTAS (CONEXIONES ENTRE CUENTAS)
  const EDGES = [
    // El ciclo sospechoso
    { from: 0, to: 1, isCycle: true, id: 'e_AB', amount: '$45,000' },
    { from: 1, to: 2, isCycle: true, id: 'e_BC', amount: '$44,900' },
    { from: 2, to: 3, isCycle: true, id: 'e_CD', amount: '$44,800' },
    { from: 3, to: 0, isCycle: true, id: 'e_DA', amount: '$44,700' },

    // Conexiones periféricas legítimas
    { from: 4, to: 0, isCycle: false, id: 'e_EA', amount: '$120' },
    { from: 5, to: 1, isCycle: false, id: 'e_FB', amount: '$1,850' },
    { from: 3, to: 6, isCycle: false, id: 'e_DG', amount: '$65' },
    { from: 2, to: 7, isCycle: false, id: 'e_CH', amount: '$310' },
    { from: 4, to: 5, isCycle: false, id: 'e_EF', amount: '$890' },
    { from: 6, to: 7, isCycle: false, id: 'e_GH', amount: '$430' },
  ];

  const edgeLineRefs = EDGES.map(() => createRef<Line>());

  // Contenedor General del Grafo (Y = 30)
  const graphContainer = createRef<Node>();
  view.add(
    <Node ref={graphContainer} y={30}>
      {/* Aristas del Grafo */}
      {EDGES.map((edge, idx) => {
        const p1 = NODES_DATA[edge.from].pos;
        const p2 = NODES_DATA[edge.to].pos;
        return (
          <Line
            key={'edge_' + idx}
            ref={edgeLineRefs[idx]}
            points={[p1, p2]}
            stroke={COLORES.lineasBase}
            lineWidth={3}
            opacity={0}
          />
        );
      })}

      {/* Nodos del Grafo */}
      {NODES_DATA.map((nodo, idx) => (
        <Node key={'node_' + idx} ref={nodeRefs[idx]} x={nodo.pos[0]} y={nodo.pos[1]} scale={0}>
          {/* Anillo de resplandor */}
          <Circle
            ref={nodeGlowRefs[idx]}
            size={nodo.ring ? 72 : 58}
            stroke={COLORES.nodoBorde}
            lineWidth={2}
            opacity={0.3}
          />
          {/* Círculo Principal */}
          <Circle
            ref={nodeCircleRefs[idx]}
            size={nodo.ring ? 56 : 46}
            fill={COLORES.nodoNormal}
            stroke={COLORES.nodoBorde}
            lineWidth={3}
            shadowColor={COLORES.nodoBorde}
            shadowBlur={8}
          />
          {/* Icono / Identificador de la Cuenta */}
          <Txt
            text={nodo.id}
            fontFamily="monospace"
            fontWeight={900}
            fontSize={nodo.ring ? 20 : 16}
            fill={COLORES.textoBlanco}
            y={-1}
          />
          {/* Etiqueta de la entidad */}
          <Txt
            text={nodo.label}
            fontFamily="monospace"
            fontWeight={700}
            fontSize={11}
            fill={COLORES.textoMutado}
            y={nodo.pos[1] > 0 ? 46 : -46}
          />
        </Node>
      ))}
    </Node>
  );

  // =========================================================================
  // FASE 1: CONSTRUCCIÓN DE LA RED FINANCIERA (0s - 7s)
  // =========================================================================
  // 1.1 Despliegue elástico de nodos y aristas
  yield* sequence(
    0.06,
    ...edgeLineRefs.map((line) => line().opacity(1, 0.5)),
    ...nodeRefs.map((node) => node().scale(1, 0.7, easeOutBack)),
  );

  yield* all(
    sceneSubtitle().text('Monitoreando 8 nodos y 10 canales interbancarios...', 0.4),
  );

  // 1.2 Partículas de transacciones legítimas fluyendo en cian
  const legitParticle1 = createRef<Circle>();
  const legitParticle2 = createRef<Circle>();
  const legitPos1 = createSignal(new Vector2(NODES_DATA[4].pos[0], NODES_DATA[4].pos[1]));
  const legitPos2 = createSignal(new Vector2(NODES_DATA[5].pos[0], NODES_DATA[5].pos[1]));
  const okBadge1 = createRef<Rect>();
  const okBadge2 = createRef<Rect>();

  graphContainer().add(
    <Node>
      <Circle
        ref={legitParticle1}
        position={() => legitPos1()}
        size={14}
        fill={COLORES.transferenciaNormal}
        shadowColor={COLORES.transferenciaNormal}
        shadowBlur={16}
        opacity={0}
      />
      <Circle
        ref={legitParticle2}
        position={() => legitPos2()}
        size={14}
        fill={COLORES.transferenciaNormal}
        shadowColor={COLORES.transferenciaNormal}
        shadowBlur={16}
        opacity={0}
      />

      {/* Badges 200 OK */}
      <Rect
        ref={okBadge1}
        x={NODES_DATA[0].pos[0] - 60}
        y={NODES_DATA[0].pos[1] - 40}
        width={100}
        height={30}
        radius={8}
        fill={'#022c22'}
        stroke={COLORES.exitoVerde}
        lineWidth={1.5}
        opacity={0}
        scale={0.5}
      >
        <Txt text="200 OK • $120" fontFamily="monospace" fontWeight={800} fontSize={10} fill={COLORES.exitoVerde} />
      </Rect>

      <Rect
        ref={okBadge2}
        x={NODES_DATA[1].pos[0] + 70}
        y={NODES_DATA[1].pos[1] - 40}
        width={110}
        height={30}
        radius={8}
        fill={'#022c22'}
        stroke={COLORES.exitoVerde}
        lineWidth={1.5}
        opacity={0}
        scale={0.5}
      >
        <Txt text="200 OK • $1.8k" fontFamily="monospace" fontWeight={800} fontSize={10} fill={COLORES.exitoVerde} />
      </Rect>
    </Node>
  );

  legitParticle1().opacity(1);
  legitParticle2().opacity(1);

  yield* all(
    legitPos1(new Vector2(NODES_DATA[0].pos[0], NODES_DATA[0].pos[1]), 1.8, easeInOutCubic),
    legitPos2(new Vector2(NODES_DATA[1].pos[0], NODES_DATA[1].pos[1]), 1.8, easeInOutCubic),
  );

  yield* all(
    okBadge1().opacity(1, 0.3),
    okBadge1().scale(1, 0.3, easeOutBack),
    okBadge2().opacity(1, 0.3),
    okBadge2().scale(1, 0.3, easeOutBack),
    legitParticle1().opacity(0, 0.3),
    legitParticle2().opacity(0, 0.3),
  );

  yield* waitFor(1.2);
  yield* all(
    okBadge1().opacity(0, 0.4),
    okBadge2().opacity(0, 0.4),
  );

  // =========================================================================
  // FASE 2: LA ANOMALÍA Y EL BUCLE SOSPECHOSO (7s - 15s)
  // =========================================================================
  // Los nodos A, B, C, D comienzan a transferir dinero en círculo a alta velocidad
  yield* all(
    sceneTitle().text('PATRÓN SOSPECHOSO DETECTADO', 0.4),
    sceneTitle().fill(COLORES.avisoAmbar, 0.4),
    sceneSubtitle().text('Alto volumen circular en subgrafo de 4 cuentas', 0.4),
    latencyText('LATENCIA: 3.4ms', 0.4),
    latencyColor(COLORES.avisoAmbar, 0.4),
    statusBadgeText('ALERT • FLUJO ANÓMALO', 0.4),
    statusBadgeColor(COLORES.avisoAmbar, 0.4),
    statusBadgeBorder(COLORES.avisoAmbar, 0.4),
  );

  // Contador flotante de velocidad anómala
  const anomalyMeter = createRef<Rect>();
  view.add(
    <Rect
      ref={anomalyMeter}
      y={-570}
      width={780}
      height={72}
      radius={20}
      fill={'#291804'}
      stroke={COLORES.avisoAmbar}
      lineWidth={2}
      shadowColor={COLORES.avisoAmbar}
      shadowBlur={18}
      opacity={0}
      scale={0.85}
    >
      <Txt
        y={-10}
        text="ALERTA: VELOCIDAD DE DISPERSIÓN ANÓMALA"
        fontFamily="monospace"
        fontWeight={900}
        fontSize={16}
        letterSpacing={1.5}
        fill={COLORES.avisoAmbar}
      />
      <Txt
        y={14}
        text="Cadencia: 4 HOPS / 120ms  •  Monto Agregado: $179,400 USD"
        fontFamily="monospace"
        fontWeight={700}
        fontSize={13}
        fill={COLORES.textoBlanco}
      />
    </Rect>
  );

  yield* all(
    anomalyMeter().opacity(1, 0.5, easeOutBack),
    anomalyMeter().scale(1, 0.5, easeOutBack),
  );

  // Modificar las líneas del bucle a naranja ámbar y aumentar su grosor
  const cycleEdgeIndices = [0, 1, 2, 3];
  yield* all(
    ...cycleEdgeIndices.map((idx) => edgeLineRefs[idx]().stroke(COLORES.avisoAmbar, 0.8)),
    ...cycleEdgeIndices.map((idx) => edgeLineRefs[idx]().lineWidth(6, 0.8)),
    ...[0, 1, 2, 3].map((idx) => nodeCircleRefs[idx]().stroke(COLORES.avisoAmbar, 0.8)),
    ...[0, 1, 2, 3].map((idx) => nodeGlowRefs[idx]().stroke(COLORES.avisoAmbar, 0.8)),
    ...[0, 1, 2, 3].map((idx) => nodeGlowRefs[idx]().opacity(0.8, 0.8)),
  );

  // Partícula rápida viajando por el bucle A -> B -> C -> D -> A
  const loopParticle = createRef<Circle>();
  const loopPos = createSignal(new Vector2(NODES_DATA[0].pos[0], NODES_DATA[0].pos[1]));

  graphContainer().add(
    <Circle
      ref={loopParticle}
      position={() => loopPos()}
      size={18}
      fill={COLORES.avisoAmbar}
      shadowColor={COLORES.avisoAmbar}
      shadowBlur={24}
      opacity={0}
    />
  );

  loopParticle().opacity(1);

  // Recorrido de 2 vueltas completas en aceleración sostenida
  for (let loop = 0; loop < 2; loop++) {
    yield* chain(
      loopPos(new Vector2(NODES_DATA[1].pos[0], NODES_DATA[1].pos[1]), 0.45, easeInOutSine),
      loopPos(new Vector2(NODES_DATA[2].pos[0], NODES_DATA[2].pos[1]), 0.45, easeInOutSine),
      loopPos(new Vector2(NODES_DATA[3].pos[0], NODES_DATA[3].pos[1]), 0.45, easeInOutSine),
      loopPos(new Vector2(NODES_DATA[0].pos[0], NODES_DATA[0].pos[1]), 0.45, easeInOutSine),
    );
  }

  yield* waitFor(0.8);

  // =========================================================================
  // FASE 3: EL ESCANEO ALGORÍTMICO Y ALERTA MÁXIMA (15s - 25s)
  // =========================================================================
  // 3.1 Onda de choque circular (efecto bullet-time / slow motion)
  const shockwave = createRef<Circle>();
  const shockwaveScale = createSignal(0.1);
  const shockwaveOpacity = createSignal(0.9);

  graphContainer().add(
    <Circle
      ref={shockwave}
      x={20}
      y={10}
      size={900}
      stroke={COLORES.alertaRoja}
      lineWidth={4}
      scale={() => shockwaveScale()}
      opacity={() => shockwaveOpacity()}
      shadowColor={COLORES.alertaRoja}
      shadowBlur={30}
    />
  );

  yield* all(
    sceneTitle().text('¡CICLO DE LAVADO DETECTADO!', 0.3),
    sceneTitle().fill(COLORES.alertaRoja, 0.3),
    sceneSubtitle().text('Tarjan / Johnson Cycle Algorithm: Ciclo Cerrado Encontrado', 0.3),
    latencyText('LATENCIA CRÍTICA: 0.8ms (ANÁLISIS COMPLETADO)', 0.3),
    latencyColor(COLORES.alertaRoja, 0.3),
    statusBadgeText('CRITICAL • BLOQUEO INMEDIATO', 0.3),
    statusBadgeColor(COLORES.alertaRoja, 0.3),
    statusBadgeBorder(COLORES.alertaRoja, 0.3),
    anomalyMeter().opacity(0, 0.3),
  );

  // Expansión de onda de choque y congelamiento bullet-time
  yield* all(
    shockwaveScale(1.8, 1.4, easeOutCubic),
    shockwaveOpacity(0, 1.4),
    loopParticle().opacity(0, 0.5),
    // Las líneas del ciclo se tornan en rojo fuego brillante con pulsos
    ...cycleEdgeIndices.map((idx) => edgeLineRefs[idx]().stroke(COLORES.alertaRoja, 0.5)),
    ...cycleEdgeIndices.map((idx) => edgeLineRefs[idx]().lineWidth(9, 0.5)),
    ...[0, 1, 2, 3].map((idx) => nodeCircleRefs[idx]().stroke(COLORES.alertaRoja, 0.5)),
    ...[0, 1, 2, 3].map((idx) => nodeGlowRefs[idx]().stroke(COLORES.alertaRoja, 0.5)),
    ...[0, 1, 2, 3].map((idx) => nodeGlowRefs[idx]().size(95, 0.5, easeOutBack)),
  );

  // 3.2 Tarjeta translúcida flotante con Glassmorphism (Centro / Alerta)
  const fraudAlertCard = createRef<Rect>();
  const riskScoreText = createRef<Txt>();
  const freezeStatusText = createRef<Txt>();

  view.add(
    <Rect
      ref={fraudAlertCard}
      y={10}
      width={680}
      height={320}
      radius={28}
      fill={'#1c0a0a'}
      stroke={COLORES.alertaRoja}
      lineWidth={3}
      shadowColor={'rgba(239, 68, 68, 0.5)'}
      shadowBlur={40}
      opacity={0}
      scale={0.7}
    >
      {/* Encabezado de la Tarjeta */}
      <Node y={-95}>
        <Circle size={28} fill={COLORES.alertaRoja} x={-240} y={0} shadowColor={COLORES.alertaRoja} shadowBlur={12} />
        <Txt text="!" fontSize={16} fontWeight={900} fill={'#ffffff'} x={-240} y={1} />
        <Txt
          x={20}
          y={0}
          text="CICLO DE LAVADO DETECTADO"
          fontFamily="monospace"
          fontWeight={900}
          fontSize={22}
          letterSpacing={2}
          fill={'#fecaca'}
        />
      </Node>

      {/* Subtítulo técnico del ciclo */}
      <Txt
        y={-40}
        text="A (ID: 9021) -> B (ID: 4410) -> C (ID: 1102) -> D (ID: 8872)"
        fontFamily="monospace"
        fontWeight={700}
        fontSize={13}
        fill={COLORES.textoBlanco}
      />

      {/* Métrica de Riesgo Gigante */}
      <Node y={25}>
        <Txt
          ref={riskScoreText}
          text="RIESGO: 99.4%"
          fontFamily="monospace"
          fontWeight={900}
          fontSize={44}
          letterSpacing={3}
          fill={COLORES.alertaRoja}
        />
      </Node>

      {/* Badge de Acción Automática */}
      <Rect
        y={100}
        width={420}
        height={50}
        radius={14}
        fill={'#450a0a'}
        stroke={COLORES.alertaRoja}
        lineWidth={1.5}
      >
        <Txt
          ref={freezeStatusText}
          text="CONGELANDO FONDOS..."
          fontFamily="monospace"
          fontWeight={900}
          fontSize={16}
          letterSpacing={2}
          fill={'#ffffff'}
        />
      </Rect>
    </Rect>
  );

  yield* all(
    fraudAlertCard().opacity(1, 0.6, easeOutBack),
    fraudAlertCard().scale(1, 0.6, easeOutBack),
  );

  // Pausa dramática: El motor congela fondos en tiempo real
  yield* waitFor(1.8);
  yield* all(
    freezeStatusText().text('[BLOQUEADO] FONDOS CONGELADOS ($179.4k)', 0.4),
    freezeStatusText().fill(COLORES.exitoVerde, 0.4),
  );
  yield* waitFor(1.5);

  // =========================================================================
  // FASE 4: MITIGACIÓN Y AISLAMIENTO (25s - 32s)
  // =========================================================================
  // 4.1 Desvanecer la tarjeta de alerta para ver el aislamiento del grafo
  yield* all(
    fraudAlertCard().opacity(0, 0.5),
    fraudAlertCard().scale(0.85, 0.5),
  );

  // 4.2 Anillo de escudo protector en esmeralda neón que aísla los nodos
  const shieldRing = createRef<Circle>();
  const shieldIcon = createRef<Rect>();

  graphContainer().add(
    <Node>
      <Circle
        ref={shieldRing}
        x={15}
        y={10}
        size={520}
        stroke={COLORES.exitoVerde}
        lineWidth={5}
        shadowColor={COLORES.exitoVerde}
        shadowBlur={32}
        opacity={0}
        scale={0.6}
      />
      <Rect
        ref={shieldIcon}
        x={15}
        y={-280}
        width={260}
        height={46}
        radius={14}
        fill={'#022c22'}
        stroke={COLORES.exitoVerde}
        lineWidth={2}
        opacity={0}
        scale={0.7}
      >
        <Txt
          text="CLUSTER CUARENTENADO"
          fontFamily="monospace"
          fontWeight={900}
          fontSize={13}
          letterSpacing={1}
          fill={COLORES.exitoVerde}
        />
      </Rect>
    </Node>
  );

  yield* all(
    sceneTitle().text('MITIGACIÓN AUTOMÁTICA COMPLETADA', 0.4),
    sceneTitle().fill(COLORES.exitoVerde, 0.4),
    sceneSubtitle().text('Grafo protegido: Nodos maliciosos aislados del sistema', 0.4),
    statusBadgeText('RED SEGURA • 0 FUGAS'),
    statusBadgeColor(COLORES.exitoVerde),
    statusBadgeBorder(COLORES.exitoVerde),
    latencyText('LATENCIA FINAL: 1.1ms'),
    latencyColor(COLORES.exitoVerde),
    shieldRing().opacity(1, 0.6, easeOutBack),
    shieldRing().scale(1, 0.6, easeOutBack),
    shieldIcon().opacity(1, 0.6, easeOutBack),
    shieldIcon().scale(1, 0.6, easeOutBack),
  );

  // 4.3 Desconectar líneas hacia el exterior y atenuar el ciclo aislado
  const externalConnectingEdges = [4, 5, 6, 7]; // EA, FB, DG, CH
  yield* all(
    ...externalConnectingEdges.map((idx) => edgeLineRefs[idx]().opacity(0.1, 0.6)),
    ...cycleEdgeIndices.map((idx) => edgeLineRefs[idx]().stroke('#475569', 0.6)),
    ...cycleEdgeIndices.map((idx) => edgeLineRefs[idx]().lineWidth(2, 0.6)),
    ...[0, 1, 2, 3].map((idx) => nodeCircleRefs[idx]().fill('#1e1e24', 0.6)),
    ...[0, 1, 2, 3].map((idx) => nodeCircleRefs[idx]().stroke('#475569', 0.6)),
  );

  // 4.4 La red legítima recupera su flujo normal entre cuentas seguras (E-Commerce -> Nómina / Retail -> Débito)
  const safeEdgeIndices = [8, 9]; // EF, GH
  yield* all(
    ...safeEdgeIndices.map((idx) => edgeLineRefs[idx]().stroke(COLORES.transferenciaNormal, 0.6)),
    ...safeEdgeIndices.map((idx) => edgeLineRefs[idx]().lineWidth(5, 0.6)),
  );

  // Tarjeta de Resumen Final de Protección (Y = 670)
  const summaryProtectionCard = createRef<Rect>();
  view.add(
    <Rect
      ref={summaryProtectionCard}
      y={670}
      width={940}
      height={180}
      radius={32}
      fill={'#061a14'}
      stroke={COLORES.exitoVerde}
      lineWidth={3}
      shadowColor={'rgba(16, 185, 129, 0.3)'}
      shadowBlur={30}
      opacity={0}
      scale={0.92}
    >
      <Node y={-35}>
        <Txt
          x={-280}
          y={0}
          text="SISTEMA DISTRIBUIDO PROTEGIDO"
          fontFamily="monospace"
          fontWeight={800}
          fontSize={15}
          letterSpacing={2}
          fill={COLORES.exitoVerde}
        />
        <Txt
          x={280}
          y={0}
          text="TIEMPO DE DETECCIÓN: 18ms"
          fontFamily="monospace"
          fontWeight={900}
          fontSize={15}
          fill={COLORES.transferenciaNormal}
        />
      </Node>

      <Txt
        y={20}
        text="0 FUGAS  •  $179,400 RECUPERADOS  •  4 CUENTAS BLOQUEADAS"
        fontFamily="sans-serif"
        fontWeight={900}
        fontSize={25}
        fill={COLORES.textoBlanco}
      />

      <Txt
        y={58}
        text="Tarjan's strongly connected components previene fraudes circulares a escala global."
        fontFamily="sans-serif"
        fontWeight={500}
        fontSize={16}
        fill={COLORES.textoMutado}
      />
    </Rect>
  );

  yield* all(
    summaryProtectionCard().opacity(1, 0.7, easeOutCubic),
    summaryProtectionCard().scale(1, 0.7, easeOutBack),
  );

  // Hold final cinematográfico (cierre en 32-33s)
  yield* waitFor(2.8);
});