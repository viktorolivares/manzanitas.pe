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
 * PALETA CINEMÁTICA DARK NEON
 */
const COLORES = {
  fondo: '#07090e',
  tarjetaBg: '#111827',
  tarjetaBorde: '#1f2937',
  gridLineas: '#1e293b',
  verdeNeon: '#10b981',
  cianNeon: '#38bdf8',
  rosaNeon: '#ec4899',
  oroNeon: '#fbbf24',
  purpuraNeon: '#a855f7',
  textoBlanco: '#f9fafb',
  textoMutado: '#9ca3af',
};

export default makeScene2D(function* (view) {
  // =========================================================================
  // 1. LIENZO VERTICAL 1080x1920 & FONDO ULTRA OSCURO
  // =========================================================================
  view.add(
    <Rect
      width={1080}
      height={1920}
      fill={COLORES.fondo}
    />
  );

  // =========================================================================
  // 2. HEADER BRANDING (Y = -840): codevo.pe + GUÍA VISUAL DE IA
  // =========================================================================
  const headerNode = createRef<Node>();
  const statusGlow = createSignal(1);

  view.add(
    <Node ref={headerNode} y={-840}>
      {/* Indicador de pulso verde neón */}
      <Circle
        x={-420}
        y={0}
        size={24}
        fill={COLORES.verdeNeon}
        shadowColor={COLORES.verdeNeon}
        shadowBlur={15}
        scale={() => statusGlow()}
      />
      {/* Logotipo */}
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
      {/* Badge redondeado */}
      <Rect
        x={360}
        y={0}
        width={250}
        height={50}
        radius={25}
        fill={COLORES.tarjetaBg}
        stroke={COLORES.tarjetaBorde}
        lineWidth={2}
      >
        <Txt
          text="GUÍA VISUAL DE IA"
          fontFamily="monospace"
          fontWeight={800}
          fontSize={15}
          fill={COLORES.cianNeon}
          letterSpacing={1.5}
        />
      </Rect>
    </Node>
  );

  // =========================================================================
  // 3. TÍTULO PRINCIPAL (Y = -710)
  // =========================================================================
  const titleNode = createRef<Node>();
  const subtitleNode = createRef<Node>();

  view.add(
    <Node y={-710}>
      <Txt
        ref={titleNode}
        text="¿CÓMO ENTIENDE UNA IA LAS PALABRAS?"
        fontFamily="monospace"
        fontWeight={900}
        fontSize={38}
        letterSpacing={2}
        fill={COLORES.textoBlanco}
        y={-25}
      />
      <Txt
        ref={subtitleNode}
        text="El concepto clave detrás de todo LLM: Los Embeddings"
        fontFamily="sans-serif"
        fontWeight={500}
        fontSize={22}
        fill={COLORES.textoMutado}
        y={28}
      />
    </Node>
  );

  // =========================================================================
  // 4. PASO 1 (0.0s - 3.2s): EL PROBLEMA - PALABRAS FLOTANTES AISLADAS
  // =========================================================================
  const problemCard = createRef<Rect>();
  view.add(
    <Rect
      ref={problemCard}
      y={-570}
      width={940}
      height={80}
      radius={20}
      fill={COLORES.tarjetaBg}
      stroke={COLORES.tarjetaBorde}
      lineWidth={2}
      opacity={0}
    >
      <Txt
        text="Para una máquina: 'Rey', 'Mujer', 'Hombre' son solo letras sin significado."
        fontFamily="sans-serif"
        fontWeight={600}
        fontSize={20}
        fill={COLORES.textoMutado}
      />
    </Rect>
  );

  yield* problemCard().opacity(1, 0.8);
  yield* waitFor(2.4); // Duración Paso 1: 3.2s

  // =========================================================================
  // 5. PASO 2 (3.2s - 6.4s): EL MAPA SEMÁNTICO (PLANO 2D)
  // =========================================================================
  const gridNode = createRef<Node>();
  const axisX = createRef<Line>();
  const axisY = createRef<Line>();
  const labelXmasc = createRef<Txt>();
  const labelXfem = createRef<Txt>();
  const labelYnob = createRef<Txt>();
  const labelYcom = createRef<Txt>();

  view.add(
    <Node ref={gridNode} y={-40} opacity={0}>
      {/* Contenedor del Canvas de Coordenadas */}
      <Rect
        width={940}
        height={860}
        radius={36}
        fill={'#0c101d'}
        stroke={COLORES.gridLineas}
        lineWidth={3}
      />

      {/* Eje X (Horizontal: Género) */}
      <Line
        ref={axisX}
        points={[[-400, 0], [400, 0]]}
        stroke={'#334155'}
        lineWidth={3}
      />
      <Txt
        ref={labelXmasc}
        x={-340}
        y={-30}
        text="<- Masculino"
        fontFamily="monospace"
        fontWeight={800}
        fontSize={22}
        fill={COLORES.cianNeon}
      />
      <Txt
        ref={labelXfem}
        x={340}
        y={-30}
        text="Femenino ->"
        fontFamily="monospace"
        fontWeight={800}
        fontSize={22}
        fill={COLORES.rosaNeon}
      />

      {/* Eje Y (Vertical: Nobleza / Estatus) */}
      <Line
        ref={axisY}
        points={[[0, -380], [0, 380]]}
        stroke={'#334155'}
        lineWidth={3}
      />
      <Txt
        ref={labelYnob}
        x={0}
        y={-350}
        text="▲ Nobleza (+1.0)"
        fontFamily="monospace"
        fontWeight={800}
        fontSize={22}
        fill={COLORES.oroNeon}
      />
      <Txt
        ref={labelYcom}
        x={0}
        y={350}
        text="▼ Común (-1.0)"
        fontFamily="monospace"
        fontWeight={800}
        fontSize={22}
        fill={COLORES.textoMutado}
      />
    </Node>
  );

  yield* all(
    problemCard().opacity(0, 0.4),
    gridNode().opacity(1, 0.8),
  );
  yield* waitFor(2.4); // Duración Paso 2: 3.2s

  // =========================================================================
  // 6. PASOS 3-6 (6.4s - 19.2s): UBICANDO CADA PALABRA CON COORDENADAS [X, Y]
  // =========================================================================
  const cardHombre = createRef<Rect>();
  const cardMujer = createRef<Rect>();
  const cardRey = createRef<Rect>();
  const cardReina = createRef<Rect>();

  view.add(
    <Node y={-40}>
      {/* 👨 Hombre: [-0.7, -0.6] */}
      <Rect
        ref={cardHombre}
        x={-240}
        y={200}
        width={220}
        height={95}
        radius={22}
        fill={COLORES.tarjetaBg}
        stroke={COLORES.cianNeon}
        lineWidth={3}
        scale={0}
      >
        <Txt text="👨 Hombre" fontFamily="sans-serif" fontWeight={800} fontSize={26} fill={COLORES.textoBlanco} y={-10} />
        <Txt text="[-0.7, -0.6]" fontFamily="monospace" fontWeight={700} fontSize={16} fill={COLORES.cianNeon} y={22} />
      </Rect>

      {/* 👩 Mujer: [+0.7, -0.6] */}
      <Rect
        ref={cardMujer}
        x={240}
        y={200}
        width={220}
        height={95}
        radius={22}
        fill={COLORES.tarjetaBg}
        stroke={COLORES.rosaNeon}
        lineWidth={3}
        scale={0}
      >
        <Txt text="👩 Mujer" fontFamily="sans-serif" fontWeight={800} fontSize={26} fill={COLORES.textoBlanco} y={-10} />
        <Txt text="[+0.7, -0.6]" fontFamily="monospace" fontWeight={700} fontSize={16} fill={COLORES.rosaNeon} y={22} />
      </Rect>

      {/* 👑 Rey: [-0.7, +0.7] */}
      <Rect
        ref={cardRey}
        x={-240}
        y={-200}
        width={220}
        height={95}
        radius={22}
        fill={COLORES.tarjetaBg}
        stroke={COLORES.oroNeon}
        lineWidth={3}
        scale={0}
      >
        <Txt text="👑 Rey" fontFamily="sans-serif" fontWeight={800} fontSize={26} fill={COLORES.textoBlanco} y={-10} />
        <Txt text="[-0.7, +0.7]" fontFamily="monospace" fontWeight={700} fontSize={16} fill={COLORES.oroNeon} y={22} />
      </Rect>

      {/* 👸 Reina: [+0.7, +0.7] */}
      <Rect
        ref={cardReina}
        x={240}
        y={-200}
        width={220}
        height={95}
        radius={22}
        fill={COLORES.tarjetaBg}
        stroke={COLORES.purpuraNeon}
        lineWidth={3}
        scale={0}
      >
        <Txt text="👸 Reina" fontFamily="sans-serif" fontWeight={800} fontSize={26} fill={COLORES.textoBlanco} y={-10} />
        <Txt text="[+0.7, +0.7]" fontFamily="monospace" fontWeight={700} fontSize={16} fill={COLORES.purpuraNeon} y={22} />
      </Rect>
    </Node>
  );

  // Paso 3: Hombre (3.2s)
  yield* cardHombre().scale(1, 0.7, easeOutBack);
  yield* waitFor(2.5);

  // Paso 4: Mujer (3.2s)
  yield* cardMujer().scale(1, 0.7, easeOutBack);
  yield* waitFor(2.5);

  // Paso 5: Rey (3.2s)
  yield* cardRey().scale(1, 0.7, easeOutBack);
  yield* waitFor(2.5);

  // Paso 6: Reina (3.2s)
  yield* cardReina().scale(1, 0.7, easeOutBack);
  yield* waitFor(2.5);

  // =========================================================================
  // 7. PASO 7 (19.2s - 22.4s): FLECHAS VECTORIALES (+ NOBLEZA)
  // =========================================================================
  const arrowHombreRey = createRef<Line>();
  const arrowMujerReina = createRef<Line>();
  const textArrow1 = createRef<Txt>();
  const textArrow2 = createRef<Txt>();

  view.add(
    <Node y={-40}>
      <Line
        ref={arrowHombreRey}
        points={[[-240, 130], [-240, -135]]}
        stroke={COLORES.oroNeon}
        lineWidth={6}
        lineDash={[12, 8]}
        endArrow
        arrowSize={20}
        opacity={0}
      />
      <Txt
        ref={textArrow1}
        x={-310}
        y={0}
        text="+ Nobleza"
        fontFamily="monospace"
        fontWeight={800}
        fontSize={20}
        fill={COLORES.oroNeon}
        opacity={0}
      />

      <Line
        ref={arrowMujerReina}
        points={[[240, 130], [240, -135]]}
        stroke={COLORES.purpuraNeon}
        lineWidth={6}
        lineDash={[12, 8]}
        endArrow
        arrowSize={20}
        opacity={0}
      />
      <Txt
        ref={textArrow2}
        x={310}
        y={0}
        text="+ Nobleza"
        fontFamily="monospace"
        fontWeight={800}
        fontSize={20}
        fill={COLORES.purpuraNeon}
        opacity={0}
      />
    </Node>
  );

  yield* all(
    arrowHombreRey().opacity(1, 0.6),
    textArrow1().opacity(1, 0.6),
    arrowMujerReina().opacity(1, 0.6),
    textArrow2().opacity(1, 0.6),
  );
  yield* waitFor(2.6); // Duración Paso 7: 3.2s

  // =========================================================================
  // 8. PASO 8 & 9 (22.4s - 28.8s): ÁLGEBRA DE SIGNIFICADOS Y RESULTADO
  // =========================================================================
  const formulaBox = createRef<Rect>();

  view.add(
    <Rect
      ref={formulaBox}
      y={550}
      width={940}
      height={140}
      radius={28}
      fill={COLORES.tarjetaBg}
      stroke={COLORES.oroNeon}
      lineWidth={3}
      shadowColor={'rgba(251, 191, 36, 0.25)'}
      shadowBlur={30}
      opacity={0}
      scale={0.9}
    >
      <Txt
        y={-26}
        text="ÁLGEBRA DE SIGNIFICADOS:"
        fontFamily="monospace"
        fontWeight={800}
        fontSize={18}
        letterSpacing={2}
        fill={COLORES.oroNeon}
      />
      <Txt
        y={22}
        text="👑 Rey  -  👨 Hombre  +  👩 Mujer  =  👸 Reina"
        fontFamily="sans-serif"
        fontWeight={900}
        fontSize={28}
        fill={COLORES.textoBlanco}
      />
    </Rect>
  );

  yield* all(
    formulaBox().opacity(1, 0.7, easeOutCubic),
    formulaBox().scale(1, 0.7, easeOutBack),
  );
  yield* waitFor(2.5); // Paso 8: 3.2s

  // Resaltamos Reina en Paso 9
  yield* cardReina().scale(1.15, 0.5, easeOutBack);
  yield* waitFor(2.7); // Paso 9: 3.2s

  // =========================================================================
  // 9. PASO 10 (28.8s - 32.0s): LLMs REALES = 1536 DIMENSIONES
  // =========================================================================
  const realLlmBox = createRef<Rect>();

  view.add(
    <Rect
      ref={realLlmBox}
      y={705}
      width={940}
      height={90}
      radius={22}
      fill={'#0f172a'}
      stroke={'#8b5cf6'}
      lineWidth={2}
      opacity={0}
    >
      <Txt
        y={-14}
        text="🌐 En este ejemplo usamos 2 ejes (Género y Nobleza)."
        fontFamily="sans-serif"
        fontWeight={700}
        fontSize={19}
        fill={COLORES.textoBlanco}
      />
      <Txt
        y={18}
        text="En modelos reales (Gemini, GPT) el mapa tiene 1536 dimensiones (vectores ℝ^1536)."
        fontFamily="monospace"
        fontWeight={600}
        fontSize={16}
        fill={'#c084fc'}
      />
    </Rect>
  );

  yield* realLlmBox().opacity(1, 0.6);
  yield* waitFor(2.6); // Paso 10: 3.2s

  // =========================================================================
  // 10. PASO 11 (32.0s - 35.5s): CONCLUSIÓN Y CIERRE MAESTRO
  // =========================================================================
  const conclusionBox = createRef<Rect>();

  view.add(
    <Rect
      ref={conclusionBox}
      y={825}
      width={940}
      height={75}
      radius={20}
      fill={'#1e1b4b'}
      stroke={COLORES.cianNeon}
      lineWidth={2}
      opacity={0}
    >
      <Txt
        text="Un Embedding es simplemente: Significado Humano convertido en Coordenadas."
        fontFamily="sans-serif"
        fontWeight={800}
        fontSize={19}
        fill={COLORES.cianNeon}
      />
    </Rect>
  );

  yield* conclusionBox().opacity(1, 0.6);
  yield* waitFor(3.0); // Outro hold (Total: ~35 segundos a 1x)
});