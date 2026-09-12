/**
 * MOTION CANVAS SOURCE CODE (bfsScene.tsx)
 * 
 * Código TypeScript completo para Motion Canvas:
 * - Formato: Vertical 9:16 (1080x1920) a 60 FPS
 * - Tema: Visualización del Algoritmo BFS (Breadth-First Search) en Matriz 5x5
 * - Diseño: Sin consola de código estática, 100% enfocado en los elementos visuales del algoritmo (Matriz, Cola FIFO, Exploración 4 Direcciones y Ruta Óptima)
 * - Marca: CODEVO.PE
 * 
 * Listo para copiar y pegar en tu proyecto Motion Canvas sin dependencias externas
 * excepto @motion-canvas/2d y @motion-canvas/core.
 */

export const MOTION_CANVAS_CODE = `import {makeScene2D} from '@motion-canvas/2d';
import {
  all,
  chain,
  sequence,
  delay,
  createRef,
  createSignal,
  easeInOutCubic,
  easeOutBack,
  easeOutCubic,
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
 * PALETA DE COLORES - Cyberpunk / Dark Concurrency
 */
const COLORES = {
  fondo: '#080c16',
  superficie: '#0e1726',
  superficieOscura: '#020617',
  borde: '#1e293b',
  bordeActivo: '#334155',
  cian: '#38bdf8',          // Frontera / Encolados / Ola BFS
  verde: '#10b981',         // Inicio / Ruta más corta óptima
  magenta: '#f43f5e',       // Meta (Goal)
  purpura: '#c084fc',       // Nodo actual (Current)
  amarillo: '#fbbf24',      // Alertas / Longitud de cola
  pared: '#1e293b',         // Obstáculos / Muros
  textoClaro: '#f8fafc',
  textoApagado: '#64748b',
};

export default makeScene2D(function* (view) {
  // =========================================================================
  // 1. LIENZO VERTICAL 1080x1920 & FONDO
  // =========================================================================
  view.add(
    <Rect
      width={1080}
      height={1920}
      fill={COLORES.fondo}
    />
  );

  // =========================================================================
  // 2. ENCABEZADO DE MARCA CODEVO.PE (Y: -850)
  // Limpio, tipografía monoespaciada de alto contraste
  // =========================================================================
  const marcaRef = createRef<Node>();
  const pasoBadgeSig = createSignal('PASO 01 / 20');
  const estadoTagSig = createSignal('INICIALIZANDO');
  const estadoColorSig = createSignal(COLORES.cian);
  const visitadosCountSig = createSignal('1 / 25');

  view.add(
    <Node ref={marcaRef} y={-850}>
      <Txt
        text="CODEVO.PE"
        fill={'#ffffff'}
        fontFamily={'JetBrains Mono, monospace'}
        fontSize={34}
        fontWeight={900}
        letterSpacing={4}
        y={0}
      />
      <Txt
        y={50}
        text="BFS • Búsqueda en Anchura"
        fill={'#ffffff'}
        fontFamily={'Inter, sans-serif'}
        fontSize={36}
        fontWeight={800}
      />
      <Txt
        y={92}
        text="Ruta Más Corta Garantizada en Matriz 5×5"
        fill={COLORES.textoApagado}
        fontFamily={'JetBrains Mono, monospace'}
        fontSize={16}
      />

      {/* Pill dinámico de telemetría */}
      <Rect
        y={140}
        width={600}
        height={40}
        radius={20}
        fill={COLORES.superficie}
        stroke={COLORES.borde}
        lineWidth={1.5}
        layout
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={[0, 24]}
      >
        <Txt
          text={() => pasoBadgeSig()}
          fill={COLORES.textoApagado}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={14}
          fontWeight={700}
        />
        <Txt
          text={() => \`Visitados: \${visitadosCountSig()}\`}
          fill={COLORES.cian}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={14}
          fontWeight={800}
        />
        <Txt
          text={() => estadoTagSig()}
          fill={() => estadoColorSig()}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={14}
          fontWeight={800}
        />
      </Rect>
    </Node>
  );

  // =========================================================================
  // 3. TABLERO MATRIZ 5x5 DE ALTA VISIBILIDAD (Centro Y: -410)
  // Gran escala, iconos e iluminación en tiempo real
  // =========================================================================
  const GRID_SIZE = 5;
  const CELL_SIZE = 136;
  const CELL_GAP = 14;
  const GRID_CENTER_Y = -410;

  // Obstáculos: 1 = muro
  const OBSTACULOS = [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  const START = {r: 0, c: 0};
  const TARGET = {r: 4, c: 4};

  // Referencias a celdas
  const cellRefs: ReturnType<typeof createRef<Rect>>[][] = [];
  const cellTextRefs: ReturnType<typeof createRef<Txt>>[][] = [];
  const cellIconRefs: ReturnType<typeof createRef<Txt>>[][] = [];
  const cellScales: ReturnType<typeof createSignal<number>>[][] = [];
  const cellFills: ReturnType<typeof createSignal<string>>[][] = [];
  const cellBorders: ReturnType<typeof createSignal<string>>[][] = [];
  const cellLabels: ReturnType<typeof createSignal<string>>[][] = [];
  const cellIcons: ReturnType<typeof createSignal<string>>[][] = [];

  const gridNode = createRef<Node>();
  view.add(<Node ref={gridNode} y={GRID_CENTER_Y} />);

  // Construcción de la matriz 5x5
  for (let r = 0; r < GRID_SIZE; r++) {
    cellRefs[r] = [];
    cellTextRefs[r] = [];
    cellIconRefs[r] = [];
    cellScales[r] = [];
    cellFills[r] = [];
    cellBorders[r] = [];
    cellLabels[r] = [];
    cellIcons[r] = [];

    for (let c = 0; c < GRID_SIZE; c++) {
      const isStart = r === START.r && c === START.c;
      const isTarget = r === TARGET.r && c === TARGET.c;
      const isWall = OBSTACULOS[r][c] === 1;

      let initialFill = COLORES.superficie;
      let initialBorder = COLORES.borde;
      let label = \`\${r},\${c}\`;
      let icon = '';

      if (isStart) {
        initialFill = '#064e3b';
        initialBorder = COLORES.verde;
        label = 'START';
        icon = '🏁';
      } else if (isTarget) {
        initialFill = '#881337';
        initialBorder = COLORES.magenta;
        label = 'GOAL';
        icon = '🎯';
      } else if (isWall) {
        initialFill = '#1e293b';
        initialBorder = '#334155';
        label = 'WALL';
        icon = '🧱';
      }

      const scaleSig = createSignal(1);
      const fillSig = createSignal(initialFill);
      const borderSig = createSignal(initialBorder);
      const labelSig = createSignal(label);
      const iconSig = createSignal(icon);

      cellScales[r][c] = scaleSig;
      cellFills[r][c] = fillSig;
      cellBorders[r][c] = borderSig;
      cellLabels[r][c] = labelSig;
      cellIcons[r][c] = iconSig;

      const cellRef = createRef<Rect>();
      const textRef = createRef<Txt>();
      const iconRef = createRef<Txt>();
      cellRefs[r][c] = cellRef;
      cellTextRefs[r][c] = textRef;
      cellIconRefs[r][c] = iconRef;

      const posX = (c - (GRID_SIZE - 1) / 2) * (CELL_SIZE + CELL_GAP);
      const posY = (r - (GRID_SIZE - 1) / 2) * (CELL_SIZE + CELL_GAP);

      gridNode().add(
        <Rect
          ref={cellRef}
          x={posX}
          y={posY}
          width={CELL_SIZE}
          height={CELL_SIZE}
          radius={22}
          fill={() => fillSig()}
          stroke={() => borderSig()}
          lineWidth={3}
          scale={() => scaleSig()}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={4}
        >
          <Txt
            ref={iconRef}
            text={() => iconSig()}
            fontSize={28}
          />
          <Txt
            ref={textRef}
            text={() => labelSig()}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={isStart || isTarget || isWall ? 18 : 17}
            fontWeight={800}
            fill={'#ffffff'}
          />
        </Rect>
      );
    }
  }

  // Línea Láser de Ruta Óptima Final (Inicialmente oculta)
  const pathLineRef = createRef<Line>();
  const pathLineProgress = createSignal(0);
  const pathLineOpacity = createSignal(0);

  // =========================================================================
  // 4. MÓDULO COLA FIFO (COLLECTIONS.DEQUE) (Y: +70)
  // Alta visibilidad con tokens individuales, POP LEFT y APPEND
  // =========================================================================
  const queueTrayRef = createRef<Rect>();
  const queueItemsSig = createSignal<string[]>(['(0,0)']);
  const queueLenSig = createSignal('len = 1');
  const queueBorderSig = createSignal(COLORES.borde);

  view.add(
    <Rect
      ref={queueTrayRef}
      y={70}
      width={960}
      height={140}
      radius={24}
      fill={COLORES.superficie}
      stroke={() => queueBorderSig()}
      lineWidth={2}
      layout
      direction={'column'}
      justifyContent={'space-between'}
      padding={[16, 24]}
    >
      <Rect layout direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
        <Rect layout direction={'row'} alignItems={'center'} gap={12}>
          <Txt text="📬" fontSize={24} />
          <Txt
            text="COLA FIFO (COLLECTIONS.DEQUE)"
            fill={COLORES.cian}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={17}
            fontWeight={900}
            letterSpacing={1}
          />
          <Txt
            text="• Primer en entrar, primero en salir"
            fill={COLORES.textoApagado}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={13}
          />
        </Rect>
        <Rect
          height={28}
          radius={8}
          fill={'rgba(251, 191, 36, 0.2)'}
          stroke={COLORES.amarillo}
          lineWidth={1}
          padding={[0, 12]}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt
            text={() => queueLenSig()}
            fill={COLORES.amarillo}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={13}
            fontWeight={900}
          />
        </Rect>
      </Rect>

      {/* Fila de Nodos en la Cola */}
      <Rect layout direction={'row'} alignItems={'center'} gap={10} width={'100%'}>
        <Txt
          text="[ Cola vacía ]"
          fill={COLORES.textoApagado}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={15}
          opacity={() => (queueItemsSig().length === 0 ? 1 : 0)}
        />
        {/* Renderizado dinámico simulado con texto representativo de tokens */}
        <Txt
          text={() =>
            queueItemsSig().length === 0
              ? ''
              : queueItemsSig()
                  .map((item, idx) => (idx === 0 ? \`[POP ◀ \${item}]\` : item))
                  .join('   ➔   ')
          }
          fill={COLORES.cian}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={18}
          fontWeight={800}
        />
      </Rect>
    </Rect>
  );

  // =========================================================================
  // 5. MÓDULO EXPLORADOR DE 4 DIRECCIONES (Y: +280)
  // Arriba, Derecha, Abajo, Izquierda con sus deltas cartesianos
  // =========================================================================
  const dirArribaBorder = createSignal(COLORES.borde);
  const dirArribaFill = createSignal(COLORES.superficieOscura);
  const dirDerechaBorder = createSignal(COLORES.borde);
  const dirDerechaFill = createSignal(COLORES.superficieOscura);
  const dirAbajoBorder = createSignal(COLORES.borde);
  const dirAbajoFill = createSignal(COLORES.superficieOscura);
  const dirIzqBorder = createSignal(COLORES.borde);
  const dirIzqFill = createSignal(COLORES.superficieOscura);

  view.add(
    <Rect
      y={280}
      width={960}
      height={180}
      radius={24}
      fill={COLORES.superficie}
      stroke={COLORES.borde}
      lineWidth={2}
      layout
      direction={'column'}
      justifyContent={'space-between'}
      padding={[16, 24]}
    >
      <Rect layout direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
        <Rect layout direction={'row'} alignItems={'center'} gap={10}>
          <Txt text="🧭" fontSize={24} />
          <Txt
            text="LOOP DE 4 DIRECCIONES (dr, dc)"
            fill={'#ffffff'}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={17}
            fontWeight={900}
            letterSpacing={1}
          />
        </Rect>
        <Txt
          text="[(0,1), (1,0), (0,-1), (-1,0)]"
          fill={COLORES.textoApagado}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={13}
        />
      </Rect>

      <Rect layout direction={'row'} gap={16} width={'100%'} justifyContent={'space-between'}>
        {/* ARRIBA */}
        <Rect
          width={210}
          height={84}
          radius={16}
          fill={() => dirArribaFill()}
          stroke={() => dirArribaBorder()}
          lineWidth={2}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={2}
        >
          <Txt text="⬆️" fontSize={20} />
          <Txt text="ARRIBA" fill={'#ffffff'} fontFamily={'JetBrains Mono, monospace'} fontSize={13} fontWeight={800} />
          <Txt text="(-1, 0)" fill={COLORES.textoApagado} fontFamily={'JetBrains Mono, monospace'} fontSize={11} />
        </Rect>

        {/* DERECHA */}
        <Rect
          width={210}
          height={84}
          radius={16}
          fill={() => dirDerechaFill()}
          stroke={() => dirDerechaBorder()}
          lineWidth={2}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={2}
        >
          <Txt text="➡️" fontSize={20} />
          <Txt text="DERECHA" fill={'#ffffff'} fontFamily={'JetBrains Mono, monospace'} fontSize={13} fontWeight={800} />
          <Txt text="(0, +1)" fill={COLORES.textoApagado} fontFamily={'JetBrains Mono, monospace'} fontSize={11} />
        </Rect>

        {/* ABAJO */}
        <Rect
          width={210}
          height={84}
          radius={16}
          fill={() => dirAbajoFill()}
          stroke={() => dirAbajoBorder()}
          lineWidth={2}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={2}
        >
          <Txt text="⬇️" fontSize={20} />
          <Txt text="ABAJO" fill={'#ffffff'} fontFamily={'JetBrains Mono, monospace'} fontSize={13} fontWeight={800} />
          <Txt text="(+1, 0)" fill={COLORES.textoApagado} fontFamily={'JetBrains Mono, monospace'} fontSize={11} />
        </Rect>

        {/* IZQUIERDA */}
        <Rect
          width={210}
          height={84}
          radius={16}
          fill={() => dirIzqFill()}
          stroke={() => dirIzqBorder()}
          lineWidth={2}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={2}
        >
          <Txt text="⬅️" fontSize={20} />
          <Txt text="IZQUIERDA" fill={'#ffffff'} fontFamily={'JetBrains Mono, monospace'} fontSize={13} fontWeight={800} />
          <Txt text="(0, -1)" fill={COLORES.textoApagado} fontFamily={'JetBrains Mono, monospace'} fontSize={11} />
        </Rect>
      </Rect>
    </Rect>
  );

  // =========================================================================
  // 6. BANNER EXPLICATIVO DEL ALGORITMO (Y: +540)
  // =========================================================================
  const bannerTituloSig = createSignal('1. Inicia BFS desde (0,0)');
  const bannerDescSig = createSignal('El nodo START se encola en la estructura FIFO y se marca como visitado.');
  const bannerBorderSig = createSignal(COLORES.borde);

  view.add(
    <Rect
      y={540}
      width={960}
      height={140}
      radius={24}
      fill={COLORES.superficie}
      stroke={() => bannerBorderSig()}
      lineWidth={2}
      layout
      direction={'column'}
      justifyContent={'center'}
      padding={[0, 28]}
      gap={8}
    >
      <Txt
        text={() => bannerTituloSig()}
        fill={'#ffffff'}
        fontFamily={'JetBrains Mono, monospace'}
        fontSize={22}
        fontWeight={900}
      />
      <Txt
        text={() => bannerDescSig()}
        fill={COLORES.textoClaro}
        fontFamily={'Inter, sans-serif'}
        fontSize={17}
        lineHeight={26}
      />
    </Rect>
  );

  // =========================================================================
  // 7. GUION CINEMÁTICO PROCEDURAL (ANIMACIÓN A 60 FPS)
  // =========================================================================

  // PASO 1: Inicio
  yield* all(
    cellScales[0][0](1.12, 0.4, easeOutBack),
    cellBorders[0][0](COLORES.verde, 0.4),
    bannerTituloSig('1. Encolando Nodo Inicial', 0.2),
    bannerDescSig('queue.append((0,0)). Se añade el punto de partida a la frontera de exploración.', 0.2),
    pasoBadgeSig('PASO 01 / 12', 0.2),
    estadoTagSig('ENCOLANDO START', 0.2),
    queueItemsSig(['(0,0)']),
  );
  yield* delay(1.2);

  // PASO 2: Extrae curr = (0,0) y explora DERECHA (0,1)
  yield* all(
    cellScales[0][0](1, 0.3),
    cellFills[0][0]('#0f766e', 0.3),
    dirDerechaBorder(COLORES.cian, 0.3),
    dirDerechaFill('rgba(56, 189, 248, 0.2)', 0.3),
    bannerTituloSig('2. Explorando Vecino Derecha: (0,1)', 0.2),
    bannerDescSig('curr = popleft() ➔ (0,0). El vecino (0,1) está libre y no visitado.', 0.2),
    pasoBadgeSig('PASO 02 / 12', 0.2),
    estadoTagSig('POP (0,0) ➔ DERECHA', 0.2),
    estadoColorSig(COLORES.cian, 0.2),
  );

  // Encola (0,1)
  yield* all(
    cellFills[0][1]('#0369a1', 0.3),
    cellBorders[0][1](COLORES.cian, 0.3),
    cellScales[0][1](1.08, 0.3, easeOutBack),
    cellIcons[0][1]('🌊', 0.2),
    queueItemsSig(['(0,1)']),
    queueLenSig('len = 1'),
    visitadosCountSig('2 / 25'),
  );
  yield* delay(1.0);

  // PASO 3: Desde (0,1) explora DERECHA (0,2)
  yield* all(
    dirDerechaBorder(COLORES.cian, 0.2),
    dirDerechaFill('rgba(56, 189, 248, 0.2)', 0.2),
    cellFills[0][2]('#0369a1', 0.3),
    cellBorders[0][2](COLORES.cian, 0.3),
    cellScales[0][2](1.08, 0.3, easeOutBack),
    cellIcons[0][2]('🌊', 0.2),
    queueItemsSig(['(0,2)']),
    queueLenSig('len = 1'),
    visitadosCountSig('3 / 25'),
    bannerTituloSig('3. Propagación de Ola BFS: (0,2)', 0.2),
    bannerDescSig('Avanza por la primera fila. Cada celda visitada guarda a su padre para la ruta.', 0.2),
    pasoBadgeSig('PASO 03 / 12', 0.2),
  );
  yield* delay(1.0);

  // PASO 4: Desde (0,2) explora ABAJO (1,2)
  yield* all(
    dirDerechaBorder(COLORES.borde, 0.2),
    dirDerechaFill(COLORES.superficieOscura, 0.2),
    dirAbajoBorder(COLORES.cian, 0.3),
    dirAbajoFill('rgba(56, 189, 248, 0.2)', 0.3),
    cellFills[1][2]('#0369a1', 0.3),
    cellBorders[1][2](COLORES.cian, 0.3),
    cellScales[1][2](1.08, 0.3, easeOutBack),
    cellIcons[1][2]('🌊', 0.2),
    queueItemsSig(['(1,2)']),
    visitadosCountSig('4 / 25'),
    bannerTituloSig('4. Descenso de la Onda: (1,2)', 0.2),
    bannerDescSig('El vecino de abajo (1,2) es transitable. Se añade a la cola FIFO.', 0.2),
    pasoBadgeSig('PASO 04 / 12', 0.2),
  );
  yield* delay(1.0);

  // PASO 5: Muro en (2,2) ➔ Ignorado, rodea por (0,3) y (0,4)
  yield* all(
    cellFills[0][3]('#0369a1', 0.3),
    cellBorders[0][3](COLORES.cian, 0.3),
    cellIcons[0][3]('🌊', 0.2),
    cellFills[0][4]('#0369a1', 0.3),
    cellBorders[0][4](COLORES.cian, 0.3),
    cellIcons[0][4]('🌊', 0.2),
    queueItemsSig(['(0,3)', '(0,4)']),
    queueLenSig('len = 2'),
    visitadosCountSig('6 / 25'),
    bannerTituloSig('5. Bordeando Obstáculos', 0.2),
    bannerDescSig('Las paredes bloquean el paso directo. La cola FIFO garantiza expandir todas las rutas al mismo ritmo.', 0.2),
    pasoBadgeSig('PASO 05 / 12', 0.2),
  );
  yield* delay(1.2);

  // PASO 6: Descenso columna 4: (1,4), (2,4), (3,4)
  yield* all(
    cellFills[1][4]('#0369a1', 0.3),
    cellBorders[1][4](COLORES.cian, 0.3),
    cellFills[2][4]('#0369a1', 0.3),
    cellBorders[2][4](COLORES.cian, 0.3),
    cellFills[3][4]('#0369a1', 0.3),
    cellBorders[3][4](COLORES.cian, 0.3),
    queueItemsSig(['(2,4)', '(3,4)']),
    visitadosCountSig('9 / 25'),
    bannerTituloSig('6. Acercándose a la Meta', 0.2),
    bannerDescSig('La frontera alcanza la fila 3. La meta (4,4) está a solo 1 paso.', 0.2),
    pasoBadgeSig('PASO 06 / 12', 0.2),
  );
  yield* delay(1.2);

  // PASO 7: ¡OBJETIVO ALCANZADO (4,4)!
  yield* all(
    dirAbajoBorder(COLORES.verde, 0.4),
    dirAbajoFill('rgba(16, 185, 129, 0.25)', 0.4),
    cellScales[4][4](1.18, 0.4, easeOutBack),
    cellFills[4][4](COLORES.verde, 0.4),
    cellBorders[4][4]('#6ee7b7', 0.4),
    bannerTituloSig('7. ¡OBJETIVO ENCONTRADO EN (4,4)!', 0.2),
    bannerDescSig('curr == target. BFS garantiza que este primer contacto es la distancia mínima absoluta.', 0.2),
    bannerBorderSig(COLORES.verde, 0.3),
    pasoBadgeSig('PASO 07 / 12', 0.2),
    estadoTagSig('¡META ALCANZADA! 🎯', 0.2),
    estadoColorSig(COLORES.verde, 0.2),
  );
  yield* delay(1.5);

  // PASO 8: RECONSTRUCCIÓN DE RUTA ÓPTIMA (PATH RECONSTRUCTION)
  // Ilumina la ruta dorada/esmeralda: (0,0) -> (0,1) -> (0,2) -> (0,3) -> (0,4) -> (1,4) -> (2,4) -> (3,4) -> (4,4)
  const ruta = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 4], [2, 4], [3, 4], [4, 4]
  ];

  for (let i = 0; i < ruta.length; i++) {
    const [r, c] = ruta[i];
    yield* all(
      cellFills[r][c](COLORES.verde, 0.15),
      cellBorders[r][c]('#6ee7b7', 0.15),
      cellScales[r][c](1.1, 0.15, easeOutBack),
      cellIcons[r][c]('⚡', 0.1),
    );
  }

  yield* all(
    bannerTituloSig('8. Ruta Óptima Reconstruida: 9 Pasos', 0.2),
    bannerDescSig('Reconstrucción por punteros parent[node]. Longitud mínima: 8 saltos (9 celdas).', 0.2),
    pasoBadgeSig('FINALIZADO', 0.2),
    estadoTagSig('OPTIMAL PATH ✓', 0.2),
  );
  yield* delay(2.5);
});
`;
