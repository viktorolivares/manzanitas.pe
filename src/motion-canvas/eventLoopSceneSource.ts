/**
 * MOTION CANVAS SOURCE CODE (eventLoopScene.tsx)
 * 
 * Código TypeScript completo para Motion Canvas:
 * - Formato: Vertical 9:16 (1080x1920) a 60 FPS
 * - Tema: Visualización del Motor Event Loop en JavaScript (Call Stack, Web APIs, Microtasks, Macrotasks, Stdout)
 * - Diseño: Sin consola de código estática, 100% enfocado en los elementos visuales del loop, iconos y animación de partículas
 * - Marca: my.app
 * 
 * Listo para copiar y pegar en tu proyecto Motion Canvas sin dependencias externas
 * excepto @motion-canvas/2d y @motion-canvas/core.
 */

export const EVENT_LOOP_SCENE_CODE = `import {makeScene2D} from '@motion-canvas/2d';
import {
  all,
  chain,
  sequence,
  waitFor,
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
import { COMPANY_NAME } from '../../config/appConfig';

/**
 * PALETA DE COLORES - Dark Neon & Cyber Concurrency
 */
const COLORES = {
  fondo: '#070b14',
  superficie: '#0e1726',
  superficieOscura: '#020617',
  borde: '#1e293b',
  bordeActivo: '#334155',
  cian: '#38bdf8',          // Microtasks / Promesas VIP
  verde: '#10b981',         // Síncrono / Stdout final
  magenta: '#f43f5e',       // Call Stack LIFO
  purpura: '#a855f7',       // Event Loop Reactor
  amarillo: '#fbbf24',      // Web APIs / Macrotasks (Timeouts)
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
  // 2. ENCABEZADO DE MARCA my.app (Y: -850)
  // Limpio, tipografía monoespaciada de alto contraste
  // =========================================================================
  const marcaRef = createRef<Node>();
  const pasoBadgeSig = createSignal('PASO 01 / 10');
  const estadoTagSig = createSignal('SÍNCRONO (INICIO)');
  const estadoColorSig = createSignal(COLORES.verde);

  view.add(
    <Node ref={marcaRef} y={-850}>
      <Txt
        text={COMPANY_NAME}
        fill={'#ffffff'}
        fontFamily={'JetBrains Mono, monospace'}
        fontSize={34}
        fontWeight={900}
        letterSpacing={4}
        y={0}
      />
      <Txt
        y={50}
        text="JavaScript Event Loop & Concurrencia"
        fill={'#ffffff'}
        fontFamily={'Inter, sans-serif'}
        fontSize={32}
        fontWeight={800}
      />
      <Txt
        y={92}
        text="Call Stack • Web APIs • Microtasks VIP • Macrotasks"
        fill={COLORES.textoApagado}
        fontFamily={'JetBrains Mono, monospace'}
        fontSize={16}
      />

      {/* Pill dinámico de telemetría */}
      <Rect
        y={140}
        width={540}
        height={40}
        radius={20}
        fill={COLORES.superficie}
        stroke={COLORES.borde}
        lineWidth={1.5}
        layout
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={[0, 20]}
      >
        <Txt
          text={() => pasoBadgeSig()}
          fill={COLORES.textoApagado}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={14}
          fontWeight={700}
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
  // 3. SECCIÓN 1: CALL STACK (LIFO) & WEB APIS (Y: -530)
  // Fila superior en 2 columnas con iconos de alta visibilidad
  // =========================================================================
  const callStackBorderSig = createSignal(COLORES.borde);
  const callStackItem1Opacity = createSignal(0);
  const callStackItem1Scale = createSignal(0.8);
  const callStackItem1Text = createSignal('console.log("1. Inicio")');
  const stackVacioOpacity = createSignal(1);

  // Columna Izquierda: Call Stack (LIFO)
  view.add(
    <Rect
      x={-245}
      y={-530}
      width={470}
      height={260}
      radius={22}
      fill={COLORES.superficie}
      stroke={() => callStackBorderSig()}
      lineWidth={2}
      clip
    >
      {/* Cabecera Call Stack */}
      <Rect
        y={-102}
        width={470}
        height={54}
        fill={'rgba(244, 63, 94, 0.12)'}
        layout
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={[0, 20]}
      >
        <Rect layout direction={'row'} alignItems={'center'} gap={10}>
          <Txt text="🥞" fontSize={20} />
          <Txt
            text="CALL STACK"
            fill={COLORES.magenta}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={16}
            fontWeight={900}
            letterSpacing={1}
          />
        </Rect>
        <Rect
          height={24}
          radius={6}
          fill={'rgba(244, 63, 94, 0.25)'}
          padding={[0, 8]}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt
            text="LIFO • 1 THREAD"
            fill={COLORES.magenta}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={10}
            fontWeight={800}
          />
        </Rect>
      </Rect>

      {/* Frame de ejecución animado */}
      <Node y={0}>
        <Txt
          text="[ Pila Libre ]"
          fill={COLORES.textoApagado}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={15}
          opacity={() => stackVacioOpacity()}
        />
        <Rect
          width={430}
          height={68}
          radius={14}
          fill={'#881337'}
          stroke={COLORES.magenta}
          lineWidth={2}
          opacity={() => callStackItem1Opacity()}
          scale={() => callStackItem1Scale()}
          layout
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          padding={[0, 16]}
        >
          <Txt text="▶" fill={'#fda4af'} fontSize={14} />
          <Txt
            text={() => callStackItem1Text()}
            fill={'#ffffff'}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={16}
            fontWeight={800}
          />
          <Txt text="#1" fill={'#fca5a5'} fontFamily={'JetBrains Mono, monospace'} fontSize={12} />
        </Rect>
      </Node>
    </Rect>
  );

  // Columna Derecha: Web APIs (Background Workers)
  const webApiBorderSig = createSignal(COLORES.borde);
  const webApiCardOpacity = createSignal(0);
  const webApiCardText = createSignal('setTimeout(cb, 0ms)');
  const webApiTimerIconRot = createSignal(0);

  view.add(
    <Rect
      x={245}
      y={-530}
      width={470}
      height={260}
      radius={22}
      fill={COLORES.superficie}
      stroke={() => webApiBorderSig()}
      lineWidth={2}
      clip
    >
      {/* Cabecera Web APIs */}
      <Rect
        y={-102}
        width={470}
        height={54}
        fill={'rgba(251, 191, 36, 0.12)'}
        layout
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={[0, 20]}
      >
        <Rect layout direction={'row'} alignItems={'center'} gap={10}>
          <Txt text="🌐" fontSize={20} />
          <Txt
            text="WEB APIS"
            fill={COLORES.amarillo}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={16}
            fontWeight={900}
            letterSpacing={1}
          />
        </Rect>
        <Rect
          height={24}
          radius={6}
          fill={'rgba(251, 191, 36, 0.25)'}
          padding={[0, 8]}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt
            text="BACKGROUND"
            fill={COLORES.amarillo}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={10}
            fontWeight={800}
          />
        </Rect>
      </Rect>

      <Node y={0}>
        <Txt
          text="(sin timers activos)"
          fill={COLORES.textoApagado}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={15}
          opacity={() => 1 - webApiCardOpacity()}
        />
        <Rect
          width={430}
          height={68}
          radius={14}
          fill={'#854d0e'}
          stroke={COLORES.amarillo}
          lineWidth={2}
          opacity={() => webApiCardOpacity()}
          layout
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          padding={[0, 16]}
        >
          <Txt
            text="⏱"
            fontSize={20}
            rotation={() => webApiTimerIconRot()}
          />
          <Txt
            text={() => webApiCardText()}
            fill={'#ffffff'}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={16}
            fontWeight={800}
          />
          <Txt text="0ms OK" fill={'#fef08a'} fontFamily={'JetBrains Mono, monospace'} fontSize={12} />
        </Rect>
      </Node>
    </Rect>
  );

  // =========================================================================
  // 4. SECCIÓN 2: EL REACTOR ORBITAL DEL EVENT LOOP (Y: -210)
  // Gran anillo central giratorio con iconos y estado de decisión
  // =========================================================================
  const loopRotacionSig = createSignal(0);
  const loopScaleSig = createSignal(1);
  const loopDecisionSig = createSignal('💤 Call Stack ocupado ejecutando script síncrono');
  const loopStateBadgeSig = createSignal('REPOSO');
  const loopStateColorSig = createSignal(COLORES.textoApagado);

  view.add(
    <Rect
      y={-210}
      width={960}
      height={180}
      radius={24}
      fill={'rgba(168, 85, 247, 0.08)'}
      stroke={COLORES.purpura}
      lineWidth={2}
      layout
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      padding={[0, 36]}
    >
      {/* Reactor Giratorio Orbital */}
      <Rect layout direction={'row'} alignItems={'center'} gap={26}>
        <Node>
          {/* Anillo exterior decorativo */}
          <Circle
            size={110}
            stroke={COLORES.purpura}
            lineWidth={2}
            lineDash={[12, 8]}
            rotation={() => loopRotacionSig()}
            scale={() => loopScaleSig()}
          />
          {/* Núcleo central pulsante */}
          <Circle
            size={80}
            fill={COLORES.superficie}
            stroke={COLORES.purpura}
            lineWidth={3}
          />
          <Txt
            text="↻"
            fill={COLORES.purpura}
            fontSize={52}
            rotation={() => loopRotacionSig()}
          />
        </Node>

        <Rect layout direction={'column'} gap={6}>
          <Rect layout direction={'row'} alignItems={'center'} gap={10}>
            <Txt
              text="EVENT LOOP REACTOR"
              fill={'#ffffff'}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={22}
              fontWeight={900}
              letterSpacing={2}
            />
            <Circle size={10} fill={COLORES.purpura} />
          </Rect>
          <Txt
            text={() => loopDecisionSig()}
            fill={COLORES.textoClaro}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={16}
            fontWeight={600}
          />
        </Rect>
      </Rect>

      <Rect
        height={38}
        radius={12}
        fill={'rgba(168, 85, 247, 0.25)'}
        stroke={COLORES.purpura}
        lineWidth={1.5}
        padding={[0, 16]}
        layout
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Txt
          text={() => loopStateBadgeSig()}
          fill={() => loopStateColorSig()}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={13}
          fontWeight={900}
        />
      </Rect>
    </Rect>
  );

  // =========================================================================
  // 5. SECCIÓN 3: LAS COLAS DE CONCURRENCIA (Y: +50 y Y: +220)
  // Microtasks VIP (Cian) y Macrotasks (Amarillo) con tarjetas individuales
  // =========================================================================

  // --- COLA DE MICROTICHE VIP (Promesas) ---
  const microQueueBorderSig = createSignal(COLORES.borde);
  const microItemOpacity = createSignal(0);
  const microItemScale = createSignal(0.8);
  const microItemText = createSignal('cb_promesa()');
  const microVacioOpacity = createSignal(1);

  view.add(
    <Rect
      y={50}
      width={960}
      height={140}
      radius={22}
      fill={COLORES.superficie}
      stroke={() => microQueueBorderSig()}
      lineWidth={2}
      layout
      direction={'column'}
      justifyContent={'space-between'}
      padding={[16, 24]}
    >
      <Rect layout direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
        <Rect layout direction={'row'} alignItems={'center'} gap={10}>
          <Txt text="VIP" fontSize={12} fontWeight={900} fill={COLORES.cian} fontFamily={'JetBrains Mono, monospace'} />
          <Txt
            text="MICROTASKS QUEUE (PROMESAS)"
            fill={COLORES.cian}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={16}
            fontWeight={900}
            letterSpacing={1}
          />
          <Txt
            text="• Drena todo antes de continuar"
            fill={COLORES.textoApagado}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={13}
          />
        </Rect>
        <Rect
          height={26}
          radius={8}
          fill={'rgba(56, 189, 248, 0.2)'}
          stroke={COLORES.cian}
          lineWidth={1}
          padding={[0, 10]}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt
            text="PRIORIDAD 1 VIP"
            fill={COLORES.cian}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={11}
            fontWeight={900}
          />
        </Rect>
      </Rect>

      <Rect layout direction={'row'} alignItems={'center'} gap={12} width={'100%'}>
        <Txt
          text="[ Cola VIP vacía ]"
          fill={COLORES.textoApagado}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={15}
          opacity={() => microVacioOpacity()}
        />
        <Rect
          height={48}
          radius={12}
          fill={'#0369a1'}
          stroke={COLORES.cian}
          lineWidth={2}
          padding={[0, 16]}
          layout
          direction={'row'}
          alignItems={'center'}
          gap={8}
          opacity={() => microItemOpacity()}
          scale={() => microItemScale()}
        >
          <Txt text="VIP" fontSize={11} fontWeight={900} fill={'#ffffff'} fontFamily={'JetBrains Mono, monospace'} />
          <Txt
            text={() => microItemText()}
            fill={'#ffffff'}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={15}
            fontWeight={800}
          />
        </Rect>
      </Rect>
    </Rect>
  );

  // --- COLA DE MACROTICHE (Timeouts / I/O) ---
  const macroQueueBorderSig = createSignal(COLORES.borde);
  const macroItemOpacity = createSignal(0);
  const macroItemScale = createSignal(0.8);
  const macroItemText = createSignal('cb_timeout()');
  const macroVacioOpacity = createSignal(1);

  view.add(
    <Rect
      y={220}
      width={960}
      height={140}
      radius={22}
      fill={COLORES.superficie}
      stroke={() => macroQueueBorderSig()}
      lineWidth={2}
      layout
      direction={'column'}
      justifyContent={'space-between'}
      padding={[16, 24]}
    >
      <Rect layout direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
        <Rect layout direction={'row'} alignItems={'center'} gap={10}>
          <Txt text="⏳" fontSize={22} />
          <Txt
            text="MACROTASKS QUEUE (TIMEOUTS / I/O)"
            fill={COLORES.amarillo}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={16}
            fontWeight={900}
            letterSpacing={1}
          />
          <Txt
            text="• 1 tarea por vuelta de Event Loop"
            fill={COLORES.textoApagado}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={13}
          />
        </Rect>
        <Rect
          height={26}
          radius={8}
          fill={'rgba(251, 191, 36, 0.2)'}
          stroke={COLORES.amarillo}
          lineWidth={1}
          padding={[0, 10]}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt
            text="PRIORIDAD 2"
            fill={COLORES.amarillo}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={11}
            fontWeight={900}
          />
        </Rect>
      </Rect>

      <Rect layout direction={'row'} alignItems={'center'} gap={12} width={'100%'}>
        <Txt
          text="[ Cola de Macrotareas vacía ]"
          fill={COLORES.textoApagado}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={15}
          opacity={() => macroVacioOpacity()}
        />
        <Rect
          height={48}
          radius={12}
          fill={'#854d0e'}
          stroke={COLORES.amarillo}
          lineWidth={2}
          padding={[0, 16]}
          layout
          direction={'row'}
          alignItems={'center'}
          gap={8}
          opacity={() => macroItemOpacity()}
          scale={() => macroItemScale()}
        >
          <Txt text="⏱" fontSize={16} />
          <Txt
            text={() => macroItemText()}
            fill={'#ffffff'}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={15}
            fontWeight={800}
          />
        </Rect>
      </Rect>
    </Rect>
  );

  // =========================================================================
  // 6. SECCIÓN 4: CONSOLA / TERMINAL STDOUT EN TIEMPO REAL (Y: +450)
  // Terminal cyberpunk de alto contraste con el orden cronológico real
  // =========================================================================
  const terminalLinesSig = createSignal<string[]>([]);

  view.add(
    <Rect
      y={450}
      width={960}
      height={220}
      radius={22}
      fill={COLORES.superficieOscura}
      stroke={COLORES.borde}
      lineWidth={2}
      clip
    >
      {/* Barra de cabecera de la terminal */}
      <Rect
        y={-85}
        width={960}
        height={50}
        fill={'#0b1329'}
        layout
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={[0, 20]}
      >
        <Rect layout direction={'row'} alignItems={'center'} gap={10}>
          <Circle size={12} fill={COLORES.magenta} />
          <Circle size={12} fill={COLORES.amarillo} />
          <Circle size={12} fill={COLORES.verde} />
          <Txt
            text="SALIDA CONSOLA (STDOUT REAL)"
            fill={COLORES.verde}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={15}
            fontWeight={800}
            marginLeft={8}
          />
        </Rect>
        <Txt
          text="Orden de Ejecución"
          fill={COLORES.textoApagado}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={13}
        />
      </Rect>

      <Node y={-30}>
        <Txt
          text={() =>
            terminalLinesSig().length === 0
              ? '(Esperando salidas impresas...)'
              : terminalLinesSig().map((l, i) => \`[\${i + 1}] > \${l}\`).join('\\n')
          }
          fill={COLORES.verde}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={18}
          fontWeight={700}
          lineHeight={36}
          x={-440}
        />
      </Node>
    </Rect>
  );

  // =========================================================================
  // 7. SECCIÓN 5: BANNER EXPLICATIVO DEL ALGORITMO (Y: +700)
  // =========================================================================
  const bannerTituloSig = createSignal('1. Ejecución Síncrona');
  const bannerDescSig = createSignal('console.log entra directamente al Call Stack y se ejecuta inmediatamente.');

  view.add(
    <Rect
      y={700}
      width={960}
      height={150}
      radius={22}
      fill={COLORES.superficie}
      stroke={COLORES.borde}
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
        fontSize={20}
        fontWeight={900}
      />
      <Txt
        text={() => bannerDescSig()}
        fill={COLORES.textoClaro}
        fontFamily={'Inter, sans-serif'}
        fontSize={16}
        lineHeight={24}
      />
    </Rect>
  );

  // =========================================================================
  // 8. GUION CINEMÁTICO PROCEDURAL (ANIMACIÓN A 60 FPS)
  // =========================================================================

  // PASO 1: console.log("1. Inicio síncrono")
  yield* all(
    callStackBorderSig(COLORES.magenta, 0.4),
    stackVacioOpacity(0, 0.3),
    callStackItem1Opacity(1, 0.4, easeOutBack),
    callStackItem1Scale(1, 0.4, easeOutBack),
    callStackItem1Text('console.log("1. Inicio")', 0.2),
    terminalLinesSig(['1. Inicio síncrono']),
    pasoBadgeSig('PASO 01 / 10', 0.2),
    estadoTagSig('SÍNCRONO (INICIO)', 0.2),
    estadoColorSig(COLORES.verde, 0.2),
    bannerTituloSig('1. Instrucción Síncrona Inmediata', 0.2),
    bannerDescSig('console.log("1. Inicio") se apila en el Call Stack y se imprime a consola al instante.', 0.2),
  );
  yield* waitFor(1.2);

  // PASO 2: Desapila console.log
  yield* all(
    callStackItem1Opacity(0, 0.3),
    callStackItem1Scale(0.8, 0.3),
    stackVacioOpacity(1, 0.3),
    callStackBorderSig(COLORES.borde, 0.3),
    pasoBadgeSig('PASO 02 / 10', 0.2),
    estadoTagSig('DESAPILANDO', 0.2),
    estadoColorSig(COLORES.textoApagado, 0.2),
    bannerTituloSig('2. Desapilado de Pila LIFO', 0.2),
    bannerDescSig('La función síncrona termina y se retira de la pila. El Call Stack queda libre.', 0.2),
  );
  yield* waitFor(1.0);

  // PASO 3: setTimeout(cb, 0)
  yield* all(
    callStackBorderSig(COLORES.amarillo, 0.3),
    stackVacioOpacity(0, 0.2),
    callStackItem1Opacity(1, 0.3, easeOutBack),
    callStackItem1Scale(1, 0.3, easeOutBack),
    callStackItem1Text('setTimeout(cb, 0)', 0.2),
    pasoBadgeSig('PASO 03 / 10', 0.2),
    estadoTagSig('DELEGANDO WEB API', 0.2),
    estadoColorSig(COLORES.amarillo, 0.2),
    bannerTituloSig('3. Delegación de Temporizador', 0.2),
    bannerDescSig('El motor JS delega el timer a las Web APIs del navegador. JS no espera bloqueado.', 0.2),
  );
  yield* waitFor(0.8);

  // PASO 4: Web API activa y pasa a Macrotasks
  yield* all(
    callStackItem1Opacity(0, 0.3),
    stackVacioOpacity(1, 0.3),
    callStackBorderSig(COLORES.borde, 0.3),
    webApiBorderSig(COLORES.amarillo, 0.3),
    webApiCardOpacity(1, 0.4, easeOutBack),
    webApiTimerIconRot(360, 0.8, easeInOutCubic),
    pasoBadgeSig('PASO 04 / 10', 0.2),
    estadoTagSig('TIMER -> MACROQUEUE', 0.2),
    bannerTituloSig('4. Timer finalizado -> Macrotask Queue', 0.2),
    bannerDescSig('El timer de 0ms expira de inmediato y encola cb_timeout() en la Macrotask Queue.', 0.2),
  );
  yield* all(
    macroQueueBorderSig(COLORES.amarillo, 0.3),
    macroVacioOpacity(0, 0.2),
    macroItemOpacity(1, 0.4, easeOutBack),
    macroItemScale(1, 0.4, easeOutBack),
    loopRotacionSig(120, 0.6, easeInOutCubic),
  );
  yield* waitFor(1.0);

  // PASO 5: Promise.resolve().then()
  yield* all(
    callStackBorderSig(COLORES.cian, 0.3),
    stackVacioOpacity(0, 0.2),
    callStackItem1Opacity(1, 0.3, easeOutBack),
    callStackItem1Scale(1, 0.3, easeOutBack),
    callStackItem1Text('Promise.then(cb)', 0.2),
    pasoBadgeSig('PASO 05 / 10', 0.2),
    estadoTagSig('EVALUANDO PROMESA', 0.2),
    estadoColorSig(COLORES.cian, 0.2),
    bannerTituloSig('5. Creación de Microtarea', 0.2),
    bannerDescSig('Promise.resolve() se evalúa y su handler .then() es gestionado por el microtask scheduler.', 0.2),
  );
  yield* waitFor(0.8);

  // PASO 6: Callback entra a Microtasks VIP
  yield* all(
    callStackItem1Opacity(0, 0.3),
    stackVacioOpacity(1, 0.3),
    callStackBorderSig(COLORES.borde, 0.3),
    microQueueBorderSig(COLORES.cian, 0.3),
    microVacioOpacity(0, 0.2),
    microItemOpacity(1, 0.4, easeOutBack),
    microItemScale(1, 0.4, easeOutBack),
    pasoBadgeSig('PASO 06 / 10', 0.2),
    estadoTagSig('ENCOLANDO MICROTICHE VIP', 0.2),
    bannerTituloSig('6. Microtask Queue VIP', 0.2),
    bannerDescSig('cb_promesa() se aloja en la cola VIP. ¡Esta cola tiene prioridad absoluta sobre setTimeout!', 0.2),
    loopRotacionSig(240, 0.6, easeInOutCubic),
  );
  yield* waitFor(1.0);

  // PASO 7: console.log("4. Fin síncrono")
  yield* all(
    callStackBorderSig(COLORES.magenta, 0.3),
    stackVacioOpacity(0, 0.2),
    callStackItem1Opacity(1, 0.3, easeOutBack),
    callStackItem1Scale(1, 0.3, easeOutBack),
    callStackItem1Text('console.log("4. Fin")', 0.2),
    terminalLinesSig(['1. Inicio síncrono', '4. Fin síncrono']),
    pasoBadgeSig('PASO 07 / 10', 0.2),
    estadoTagSig('SÍNCRONO (FIN)', 0.2),
    estadoColorSig(COLORES.verde, 0.2),
    bannerTituloSig('7. Código Síncrono Prioritario', 0.2),
    bannerDescSig('console.log("4. Fin") se ejecuta ANTES de cualquier callback asíncrono.', 0.2),
  );
  yield* waitFor(1.2);

  // PASO 8: DRENANDO MICROTASKS (Promesa ejecutándose)
  yield* all(
    callStackItem1Opacity(0, 0.2),
    stackVacioOpacity(1, 0.2),
    callStackBorderSig(COLORES.cian, 0.4),
    loopRotacionSig(420, 0.8, easeInOutCubic),
    loopScaleSig(1.08, 0.4, easeOutBack),
    loopDecisionSig('¡Stack libre! DRENANDO MICROTASKS VIP primero', 0.3),
    loopStateBadgeSig('DRENANDO VIP', 0.3),
    loopStateColorSig(COLORES.cian, 0.3),
    pasoBadgeSig('PASO 08 / 10', 0.2),
    estadoTagSig('DRENANDO MICROTICHE', 0.2),
    estadoColorSig(COLORES.cian, 0.2),
    bannerTituloSig('8. El Event Loop prioriza Microtasks VIP', 0.2),
    bannerDescSig('El Event Loop comprueba Microtasks y ejecuta cb_promesa() en el Stack antes que cualquier Macrotarea.', 0.2),
  );
  yield* all(
    microItemOpacity(0, 0.3),
    microVacioOpacity(1, 0.3),
    callStackItem1Opacity(1, 0.3, easeOutBack),
    callStackItem1Scale(1, 0.3, easeOutBack),
    callStackItem1Text('cb_promesa()', 0.2),
    terminalLinesSig(['1. Inicio síncrono', '4. Fin síncrono', '3. Promesa resuelta']),
  );
  yield* waitFor(1.4);

  // PASO 9: DESPACHANDO MACROTASK (Timeout ejecutándose)
  yield* all(
    callStackItem1Opacity(0, 0.2),
    loopRotacionSig(600, 0.8, easeInOutCubic),
    loopDecisionSig('Microtasks vacias: Despachando 1 Macrotask', 0.3),
    loopStateBadgeSig('DESPACHANDO MACRO', 0.3),
    loopStateColorSig(COLORES.amarillo, 0.3),
    callStackBorderSig(COLORES.amarillo, 0.4),
    macroItemOpacity(0, 0.3),
    macroVacioOpacity(1, 0.3),
    callStackItem1Opacity(1, 0.3, easeOutBack),
    callStackItem1Scale(1, 0.3, easeOutBack),
    callStackItem1Text('cb_timeout()', 0.2),
    terminalLinesSig(['1. Inicio síncrono', '4. Fin síncrono', '3. Promesa resuelta', '2. Timeout listo']),
    pasoBadgeSig('PASO 09 / 10', 0.2),
    estadoTagSig('MACROTAREA EJECUTADA', 0.2),
    estadoColorSig(COLORES.amarillo, 0.2),
    bannerTituloSig('9. Despacho de Macrotask Queue', 0.2),
    bannerDescSig('Con Microtasks vacías, el Event Loop extrae cb_timeout() y lo despacha al Call Stack.', 0.2),
  );
  yield* waitFor(1.4);

  // PASO 10: CICLO COMPLETO / FINALIZADO
  yield* all(
    callStackItem1Opacity(0, 0.3),
    stackVacioOpacity(1, 0.3),
    callStackBorderSig(COLORES.borde, 0.3),
    macroQueueBorderSig(COLORES.borde, 0.3),
    microQueueBorderSig(COLORES.borde, 0.3),
    webApiBorderSig(COLORES.borde, 0.3),
    loopScaleSig(1, 0.4),
    loopDecisionSig('Ciclo finalizado • Todas las colas en reposo', 0.3),
    loopStateBadgeSig('COMPLETADO', 0.3),
    loopStateColorSig(COLORES.verde, 0.3),
    pasoBadgeSig('PASO 10 / 10', 0.2),
    estadoTagSig('FINALIZADO', 0.2),
    estadoColorSig(COLORES.verde, 0.2),
    bannerTituloSig('10. Regla de Oro del Event Loop', 0.2),
    bannerDescSig('Salida: 1. Inicio -> 4. Fin -> 3. Promesa resuelta (VIP) -> 2. Timeout listo (Macrotarea).', 0.2),
  );
  yield* waitFor(2.0);
});`;
