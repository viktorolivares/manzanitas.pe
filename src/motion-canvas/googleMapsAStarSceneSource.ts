/**
 * MOTION CANVAS SOURCE CODE (googleMapsAStarScene.tsx)
 * 
 * Formato: Vertical 9:16 (1080x1920) a 60 FPS
 * Tema: "¿Cómo calcula Google Maps tu ruta más rápida? (A* Pathfinding y Tráfico en Tiempo Real)"
 * Estética: Navegación Satelital Táctica / Dark Cinematic Apple Maps
 * Marca: codevo.pe (GPS verde neón titilando) • GOOGLE MAPS ENGINE • A*
 * 
 * 100% Gráfico y Motion Graphics Moderno: CERO consolas ni código en pantalla.
 */

export const GOOGLE_MAPS_ASTAR_SCENE_CODE = `import {makeScene2D} from '@motion-canvas/2d';
import {
  all,
  chain,
  sequence,
  delay,
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

/**
 * PALETA CINEMÁTICA DARK TACTICAL GPS
 */
const COLORES = {
  fondo: '#06080f',
  callesBase: '#1e293b',
  callesActivas: '#334155',
  origen: '#38bdf8',      // Cian neón
  destino: '#10b981',     // Verde esmeralda neón
  trafico: '#ef4444',     // Rojo fuego congestión
  radar: '#38bdf8',       // Ondas de exploración A*
  rutaGanadora: '#10b981',// Verde neón óptimo
  nodoBase: '#0f172a',
  bordeNodo: '#334155',
  tarjetaBg: '#0b1120',
  tarjetaBorde: '#1e293b',
  textoBlanco: '#f8fafc',
  textoMutado: '#64748b',
  ambarAviso: '#f59e0b',
};

export default makeScene2D(function* (view) {
  // =========================================================================
  // 1. LIENZO VERTICAL 1080x1920 & FONDO AZUL NOCHE TÁCTICO
  // =========================================================================
  view.add(
    <Rect
      width={1080}
      height={1920}
      fill={COLORES.fondo}
    />
  );

  // Cuadrícula isométrica/satelital muy sutil
  const gridNode = createRef<Node>();
  view.add(
    <Node ref={gridNode} opacity={0.12}>
      {Array.from({length: 18}).map((_, i) => (
        <Line
          key={'gh_' + i}
          points={[[-540, -960 + i * 110], [540, -960 + i * 110]]}
          stroke={'#38bdf8'}
          lineWidth={1}
          lineDash={[4, 16]}
        />
      ))}
      {Array.from({length: 11}).map((_, i) => (
        <Line
          key={'gv_' + i}
          points={[[-540 + i * 110, -960], [-540 + i * 110, 960]]}
          stroke={'#38bdf8'}
          lineWidth={1}
          lineDash={[4, 16]}
        />
      ))}
    </Node>
  );

  // =========================================================================
  // 2. HEADER Y MARCA (Y = -860)
  // =========================================================================
  const headerNode = createRef<Node>();
  const gpsPulse = createSignal(1);
  const gpsPulseOpacity = createSignal(0.8);

  view.add(
    <Node ref={headerNode} y={-860}>
      {/* Satélite / GPS titilando en verde neón */}
      <Circle
        x={-420}
        y={0}
        size={24}
        fill={COLORES.destino}
        shadowColor={COLORES.destino}
        shadowBlur={16}
      />
      <Circle
        x={-420}
        y={0}
        size={44}
        stroke={COLORES.destino}
        lineWidth={2}
        scale={() => gpsPulse()}
        opacity={() => gpsPulseOpacity()}
      />

      {/* Marca codevo.pe */}
      <Txt
        x={-300}
        y={0}
        text="codevo.pe"
        fontFamily="monospace"
        fontWeight={900}
        fontSize={36}
        letterSpacing={4}
        fill={COLORES.textoBlanco}
      />

      {/* Badge de Motor de Navegación */}
      <Rect
        x={330}
        y={0}
        width={320}
        height={54}
        radius={27}
        fill={COLORES.tarjetaBg}
        stroke={COLORES.tarjetaBorde}
        lineWidth={2}
      >
        <Txt
          text="GOOGLE MAPS ENGINE • A*"
          fontFamily="monospace"
          fontWeight={800}
          fontSize={14}
          fill={COLORES.origen}
          letterSpacing={1.5}
        />
      </Rect>
    </Node>
  );

  // =========================================================================
  // 3. TÍTULOS DINÁMICOS SUPERIORES (Y = -720)
  // =========================================================================
  const titleText = createRef<Txt>();
  const subtitleText = createRef<Txt>();

  view.add(
    <Node y={-720}>
      <Txt
        ref={titleText}
        text="¿CÓMO CALCULA TU RUTA MÁS RÁPIDA?"
        fontFamily="monospace"
        fontWeight={900}
        fontSize={36}
        letterSpacing={2}
        fill={COLORES.textoBlanco}
        y={-24}
      />
      <Txt
        ref={subtitleText}
        text="A* Pathfinding con Telemetría de Tráfico en Vivo"
        fontFamily="sans-serif"
        fontWeight={600}
        fontSize={22}
        fill={COLORES.textoMutado}
        y={28}
      />
    </Node>
  );

  // =========================================================================
  // 4. DEFINICIÓN DE LA RED DE NODOS (INTERSECCIONES URBANAS)
  // =========================================================================
  const NODOS_DATA = [
    { id: 'ORIGEN',  label: 'TU AUTO',  pos: [-320, -440], color: COLORES.origen,  isPin: true, tag: 'INICIO' },
    { id: 'B',       label: 'AV. NORTE', pos: [-60, -420],  color: COLORES.bordeNodo },
    { id: 'C',       label: 'AUTOPISTA', pos: [260, -360],  color: COLORES.bordeNodo },
    { id: 'D',       label: 'CENTRO 1',  pos: [-220, -140], color: COLORES.bordeNodo },
    { id: 'E',       label: 'CENTRO 2',  pos: [140, -100],  color: COLORES.bordeNodo },
    { id: 'F',       label: 'PUENTE OESTE', pos: [-260, 180], color: COLORES.bordeNodo },
    { id: 'G',       label: 'AV. SUR',   pos: [60, 220],    color: COLORES.bordeNodo },
    { id: 'DESTINO', label: 'OFICINA',   pos: [280, 460],   color: COLORES.destino, isPin: true, tag: 'META' },
  ];

  // Referencias a los círculos y tarjetas de nodos
  const nodeRefs = NODOS_DATA.map(() => createRef<Node>());
  const nodePillRefs = NODOS_DATA.map(() => createRef<Rect>());

  // =========================================================================
  // 5. DEFINICIÓN DE LAS CONEXIONES (CALLES)
  // =========================================================================
  const CALLES = [
    // Ruta directa (la habitual)
    { from: 0, to: 3, id: 'calle_A_D', dist: '4 min' },
    { from: 3, to: 6, id: 'calle_D_G', dist: '5 min', isCongested: true },
    { from: 6, to: 7, id: 'calle_G_H', dist: '5 min' },

    // Ruta perimetral norte/este
    { from: 0, to: 1, id: 'calle_A_B', dist: '3 min' },
    { from: 1, to: 2, id: 'calle_B_C', dist: '3 min' },
    { from: 2, to: 4, id: 'calle_C_E', dist: '3 min' },
    { from: 4, to: 7, id: 'calle_E_H', dist: '3 min' },

    // Conexiones transversales
    { from: 1, to: 3, id: 'calle_B_D', dist: '4 min' },
    { from: 3, to: 5, id: 'calle_D_F', dist: '6 min' },
    { from: 5, to: 6, id: 'calle_F_G', dist: '5 min' },
    { from: 4, to: 6, id: 'calle_E_G', dist: '4 min' },
  ];

  const roadLineRefs = CALLES.map(() => createRef<Line>());

  // Contenedor del Mapa Táctico (Y = 20)
  const mapContainer = createRef<Node>();
  view.add(
    <Node ref={mapContainer} y={20}>
      {/* 5.1 Calles Base */}
      {CALLES.map((calle, idx) => {
        const p1 = NODOS_DATA[calle.from].pos;
        const p2 = NODOS_DATA[calle.to].pos;
        return (
          <Line
            key={'line_' + idx}
            ref={roadLineRefs[idx]}
            points={[p1, p2]}
            stroke={COLORES.callesBase}
            lineWidth={4}
            opacity={0}
          />
        );
      })}

      {/* 5.2 Capa de Nodos */}
      {NODOS_DATA.map((nodo, idx) => (
        <Node key={'nodo_' + idx} ref={nodeRefs[idx]} x={nodo.pos[0]} y={nodo.pos[1]} scale={0}>
          {/* Círculo base de intersección */}
          <Circle
            size={nodo.isPin ? 38 : 26}
            fill={COLORES.nodoBase}
            stroke={nodo.color}
            lineWidth={nodo.isPin ? 4 : 3}
            shadowColor={nodo.color}
            shadowBlur={nodo.isPin ? 18 : 6}
          />

          {/* Núcleo interior */}
          <Circle
            size={nodo.isPin ? 18 : 10}
            fill={nodo.color}
          />

          {/* Etiqueta / Pin flotante para Origen y Destino */}
          {nodo.isPin && (
            <Rect
              ref={nodePillRefs[idx]}
              y={idx === 0 ? -50 : 50}
              width={160}
              height={42}
              radius={21}
              fill={COLORES.tarjetaBg}
              stroke={nodo.color}
              lineWidth={2}
              shadowColor={nodo.color}
              shadowBlur={12}
            >
              <Txt
                text={idx === 0 ? '📍 ' + nodo.label : '🏁 ' + nodo.label}
                fontFamily="monospace"
                fontWeight={800}
                fontSize={14}
                fill={COLORES.textoBlanco}
              />
            </Rect>
          )}
        </Node>
      ))}
    </Node>
  );

  // =========================================================================
  // FASE 1: APARICIÓN DE LA RED Y LOS NODOS (3.5s)
  // =========================================================================
  yield* sequence(
    0.05,
    ...roadLineRefs.map((line) => line().opacity(1, 0.4)),
    ...nodeRefs.map((n) => n().scale(1, 0.6, easeOutBack)),
  );
  yield* delay(1.2);

  // =========================================================================
  // FASE 2: EVENTO DE TRÁFICO - CONGESTIÓN REPENTINA EN RUTA DIRECTA (5.0s)
  // =========================================================================
  const trafficRoadRef = createRef<Line>();
  const trafficBadge = createRef<Rect>();
  const trafficWave = createSignal(1);
  const trafficWaveOpacity = createSignal(0.9);

  // Calle congestionada (D -> G)
  const posD = NODOS_DATA[3].pos;
  const posG = NODOS_DATA[6].pos;
  const posMidTraffic = [(posD[0] + posG[0]) / 2, (posD[1] + posG[1]) / 2];

  mapContainer().add(
    <Node>
      {/* Línea de tráfico rojo brillante */}
      <Line
        ref={trafficRoadRef}
        points={[posD, posG]}
        stroke={COLORES.trafico}
        lineWidth={10}
        shadowColor={COLORES.trafico}
        shadowBlur={24}
        opacity={0}
      />

      {/* Onda de advertencia de congestión */}
      <Circle
        x={posMidTraffic[0]}
        y={posMidTraffic[1]}
        size={60}
        stroke={COLORES.trafico}
        lineWidth={3}
        scale={() => trafficWave()}
        opacity={() => trafficWaveOpacity()}
      />

      {/* Badge emergente de Alerta de Tráfico */}
      <Rect
        ref={trafficBadge}
        x={posMidTraffic[0] - 120}
        y={posMidTraffic[1]}
        width={250}
        height={54}
        radius={18}
        fill={'#450a0a'}
        stroke={COLORES.trafico}
        lineWidth={2}
        shadowColor={COLORES.trafico}
        shadowBlur={20}
        scale={0}
      >
        <Txt
          text="⚠️ TRÁFICO +18 MIN"
          fontFamily="monospace"
          fontWeight={900}
          fontSize={15}
          fill={'#fecaca'}
          letterSpacing={1}
        />
      </Rect>
    </Node>
  );

  // Disparo del evento de tráfico con animación
  yield* all(
    trafficRoadRef().opacity(1, 0.5),
    trafficBadge().scale(1, 0.6, easeOutBack),
    subtitleText().text('¡Incidente detectado! La ruta directa está colapsada', 0.4),
    subtitleText().fill(COLORES.trafico, 0.4),
  );

  // Pulso de advertencia
  yield* all(
    trafficWave(2.2, 0.8, easeOutCubic),
    trafficWaveOpacity(0, 0.8),
  );
  yield* delay(1.5);

  // =========================================================================
  // FASE 3: ESCANEO HEURÍSTICO A* (ONDAS RADAR Y ESTIMACIÓN F = G + H) (7.0s)
  // =========================================================================
  const radarRing1 = createRef<Circle>();
  const radarRing2 = createRef<Circle>();
  const aStarFormulaCard = createRef<Rect>();

  mapContainer().add(
    <Node>
      {/* Ondas expansivas de radar desde el origen */}
      <Circle
        ref={radarRing1}
        x={NODOS_DATA[0].pos[0]}
        y={NODOS_DATA[0].pos[1]}
        size={50}
        stroke={COLORES.origen}
        lineWidth={3}
        opacity={0}
      />
      <Circle
        ref={radarRing2}
        x={NODOS_DATA[0].pos[0]}
        y={NODOS_DATA[0].pos[1]}
        size={50}
        stroke={COLORES.origen}
        lineWidth={2}
        opacity={0}
      />
    </Node>
  );

  // Tarjeta de Fórmula Heurística en parte superior del mapa
  view.add(
    <Rect
      ref={aStarFormulaCard}
      y={-570}
      width={940}
      height={90}
      radius={24}
      fill={COLORES.tarjetaBg}
      stroke={COLORES.origen}
      lineWidth={2}
      shadowColor={COLORES.origen}
      shadowBlur={20}
      opacity={0}
      scale={0.9}
    >
      <Txt
        y={-14}
        text="A* PATHFINDING EN TIEMPO REAL:"
        fontFamily="monospace"
        fontWeight={800}
        fontSize={14}
        letterSpacing={2}
        fill={COLORES.origen}
      />
      <Txt
        y={18}
        text="f(n) = g(n) [Tiempo Real] + h(n) [Heurística al Destino]"
        fontFamily="monospace"
        fontWeight={900}
        fontSize={21}
        fill={COLORES.textoBlanco}
      />
    </Rect>
  );

  yield* all(
    aStarFormulaCard().opacity(1, 0.6, easeOutCubic),
    aStarFormulaCard().scale(1, 0.6, easeOutBack),
    subtitleText().text('Evaluando alternativas con función de costo mínimo...', 0.4),
    subtitleText().fill(COLORES.origen, 0.4),
  );

  // Animación de los anillos del radar expandiéndose
  yield* all(
    radarRing1().opacity(0.8, 0.2),
    radarRing1().size(700, 1.8, easeOutCubic),
    radarRing1().opacity(0, 1.8),
    chain(
      delay(0.4),
      all(
        radarRing2().opacity(0.8, 0.2),
        radarRing2().size(950, 1.8, easeOutCubic),
        radarRing2().opacity(0, 1.8),
      ),
    ),
  );

  // Etiquetas de descarte y costo en nodos explorados
  const discardNodeD = createRef<Rect>();
  const optimalNodeB = createRef<Rect>();

  mapContainer().add(
    <Node>
      {/* Nodo D (camino congestionado - descartado) */}
      <Rect
        ref={discardNodeD}
        x={NODOS_DATA[3].pos[0] + 110}
        y={NODOS_DATA[3].pos[1] - 30}
        width={170}
        height={34}
        radius={10}
        fill={'#1e293b'}
        stroke={'#475569'}
        lineWidth={1.5}
        opacity={0}
      >
        <Txt text="f(D) = 28 min ✕" fontFamily="monospace" fontWeight={800} fontSize={13} fill={'#94a3b8'} />
      </Rect>

      {/* Nodo B (alternativa norte - prometedora) */}
      <Rect
        ref={optimalNodeB}
        x={NODOS_DATA[1].pos[0] + 110}
        y={NODOS_DATA[1].pos[1] - 30}
        width={170}
        height={34}
        radius={10}
        fill={'#064e3b'}
        stroke={COLORES.destino}
        lineWidth={1.5}
        opacity={0}
      >
        <Txt text="f(B) = 12 min ✓" fontFamily="monospace" fontWeight={800} fontSize={13} fill={COLORES.destino} />
      </Rect>
    </Node>
  );

  yield* all(
    discardNodeD().opacity(1, 0.4),
    optimalNodeB().opacity(1, 0.4),
  );
  yield* delay(1.6);

  // =========================================================================
  // FASE 4: TRAZADO DE LA RUTA GANADORA Y RESUMEN FINAL (8.0s)
  // =========================================================================
  // Trazado de los segmentos óptimos: 0 -> 1 -> 2 -> 4 -> 7
  const winningSegments = [
    { p1: NODOS_DATA[0].pos, p2: NODOS_DATA[1].pos },
    { p1: NODOS_DATA[1].pos, p2: NODOS_DATA[2].pos },
    { p1: NODOS_DATA[2].pos, p2: NODOS_DATA[4].pos },
    { p1: NODOS_DATA[4].pos, p2: NODOS_DATA[7].pos },
  ];

  const winningLines = winningSegments.map(() => createRef<Line>());
  const photonParticle = createRef<Circle>();
  const photonPos = createSignal(new Vector2(NODOS_DATA[0].pos[0], NODOS_DATA[0].pos[1]));

  mapContainer().add(
    <Node>
      {winningSegments.map((seg, i) => (
        <Line
          key={'win_' + i}
          ref={winningLines[i]}
          points={[seg.p1, seg.p2]}
          stroke={COLORES.rutaGanadora}
          lineWidth={8}
          shadowColor={COLORES.rutaGanadora}
          shadowBlur={26}
          opacity={0}
        />
      ))}

      {/* Partícula de luz (vehículo / flujo rápido) */}
      <Circle
        ref={photonParticle}
        position={() => photonPos()}
        size={20}
        fill={'#ffffff'}
        shadowColor={COLORES.rutaGanadora}
        shadowBlur={22}
        opacity={0}
      />
    </Node>
  );

  // Iluminación secuencial de la ruta ganadora
  yield* all(
    subtitleText().text('¡Ruta periférica óptima calculada en 4.2 ms!', 0.4),
    subtitleText().fill(COLORES.destino, 0.4),
    sequence(
      0.15,
      ...winningLines.map((line) => line().opacity(1, 0.3)),
    ),
  );

  // La partícula de luz recorre la ruta ganadora velozmente
  photonParticle().opacity(1);
  yield* chain(
    photonPos(new Vector2(NODOS_DATA[1].pos[0], NODOS_DATA[1].pos[1]), 0.4, easeInOutSine),
    photonPos(new Vector2(NODOS_DATA[2].pos[0], NODOS_DATA[2].pos[1]), 0.4, easeInOutSine),
    photonPos(new Vector2(NODOS_DATA[4].pos[0], NODOS_DATA[4].pos[1]), 0.4, easeInOutSine),
    photonPos(new Vector2(NODOS_DATA[7].pos[0], NODOS_DATA[7].pos[1]), 0.5, easeInOutSine),
  );

  // =========================================================================
  // TARJETA FINAL DE TELEMETRÍA DE NAVEGACIÓN (Y = 660)
  // =========================================================================
  const summaryCard = createRef<Rect>();

  view.add(
    <Rect
      ref={summaryCard}
      y={670}
      width={940}
      height={180}
      radius={32}
      fill={'#06141a'}
      stroke={COLORES.destino}
      lineWidth={3}
      shadowColor={'rgba(16, 185, 129, 0.3)'}
      shadowBlur={30}
      opacity={0}
      scale={0.92}
    >
      {/* Icono de navegación y tiempo estimado */}
      <Node y={-35}>
        <Txt
          x={-280}
          y={0}
          text="🟢 RUTA ÓPTIMA ENCONTRADA"
          fontFamily="monospace"
          fontWeight={800}
          fontSize={15}
          letterSpacing={2}
          fill={COLORES.destino}
        />
        <Txt
          x={280}
          y={0}
          text="AHORRO: -6 MIN"
          fontFamily="monospace"
          fontWeight={900}
          fontSize={16}
          fill={COLORES.origen}
        />
      </Node>

      {/* Métrica principal destacada */}
      <Txt
        y={22}
        text="12 MIN  •  8.4 KM  (Evita congestión en Centro)"
        fontFamily="sans-serif"
        fontWeight={900}
        fontSize={28}
        fill={COLORES.textoBlanco}
      />

      {/* Submétrica técnica */}
      <Txt
        y={60}
        text="Google Maps recalcula heurísticas en tiempo real con millones de puntos GPS."
        fontFamily="sans-serif"
        fontWeight={500}
        fontSize={16}
        fill={COLORES.textoMutado}
      />
    </Rect>
  );

  yield* all(
    summaryCard().opacity(1, 0.7, easeOutCubic),
    summaryCard().scale(1, 0.7, easeOutBack),
  );

  // Hold final cinematográfico
  yield* delay(3.5);
});
`;
