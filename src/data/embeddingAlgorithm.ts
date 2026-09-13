export interface WordCoordinate {
  id: string;
  label: string;
  emoji: string;
  x: number; // -100 to 100 on grid
  y: number; // -100 to 100 on grid
  vector: [number, number]; // simplified [gender, royalty]
  color: string;
  visible: boolean;
  isNew?: boolean;
}

export interface EmbeddingSnapshot {
  stepIndex: number;
  timeSec: number;
  stepDurationMs: number;
  phase: 'WORDS' | 'GRID' | 'COORDINATES' | 'VECTORS' | 'EQUATION' | 'DIMENSIONS' | 'SUMMARY';
  phaseLabel: string;
  stepTitle: string;
  description: string;
  activeComponent: 'words' | 'grid' | 'points' | 'arrows' | 'equation' | 'dimensions' | 'summary';
  words: WordCoordinate[];
  gridVisible: boolean;
  axesLabelsVisible: boolean;
  arrowsVisible: boolean;
  equationVisible: boolean;
  highlightWordId?: string;
  formulaHighlight?: string;
  showDimensionsNotice?: boolean;
}

export const EMBEDDING_CODE_LINES = [
  '# Álgebra Vectorial de Embeddings (Word2Vec / Transformer)',
  '# 1. Cada palabra se traduce a un punto con coordenadas:',
  'v_rey    = embedding_model["Rey"]     # [-0.7, +0.7]',
  'v_hombre = embedding_model["Hombre"]  # [-0.7, -0.6]',
  'v_mujer  = embedding_model["Mujer"]   # [+0.7, -0.6]',
  '# 2. Las relaciones entre conceptos son flechas (vectores):',
  '#    Hombre -> Rey  suma exactamente el vector [+0.0, +1.3] (Nobleza)',
  '#    Mujer  -> Reina suma exactamente el vector [+0.0, +1.3] (Nobleza)',
  '# 3. Operamos los significados matemáticamente:',
  'resultado = v_rey - v_hombre + v_mujer',
  '# 4. Buscamos el punto más cercano en el espacio vectorial:',
  '#    resultado == [+0.7, +0.7] -> Coordenada exacta de "Reina"',
];

export function generateEmbeddingTimeline(): EmbeddingSnapshot[] {
  const baseWords: WordCoordinate[] = [
    { id: 'hombre', label: 'Hombre', emoji: '', x: -55, y: -45, vector: [-0.7, -0.6], color: '#38bdf8', visible: true },
    { id: 'mujer',  label: 'Mujer',  emoji: '', x: 55,  y: -45, vector: [0.7, -0.6],  color: '#ec4899', visible: true },
    { id: 'rey',    label: 'Rey',    emoji: '', x: -55, y: 55,  vector: [-0.7, 0.7],  color: '#fbbf24', visible: true },
    { id: 'reina',  label: 'Reina',  emoji: '', x: 55,  y: 55,  vector: [0.7, 0.7],   color: '#a855f7', visible: true },
  ];

  return [
    {
      stepIndex: 0,
      timeSec: 0,
      stepDurationMs: 3200,
      phase: 'WORDS',
      phaseLabel: '1. EL PROBLEMA',
      stepTitle: 'Paso 1: ¿Cómo lee las palabras una computadora?',
      description: 'Para una computadora, palabras como "Rey", "Reina", "Hombre" y "Mujer" son solo cadenas de texto aisladas (códigos ASCII) sin significado, relación ni geometría.',
      activeComponent: 'words',
      words: baseWords.map(w => ({ ...w, visible: true, isNew: false })),
      gridVisible: false,
      axesLabelsVisible: false,
      arrowsVisible: false,
      equationVisible: false,
    },
    {
      stepIndex: 1,
      timeSec: 3.2,
      stepDurationMs: 3200,
      phase: 'GRID',
      phaseLabel: '2. EL MAPA SEMÁNTICO',
      stepTitle: 'Paso 2: La Gran Idea — Construir un Mapa de Significados',
      description: 'Para que la máquina entienda significado, creamos un plano 2D intuitivo con dos conceptos: Eje X (Género: Masculino ↔ Femenino) y Eje Y (Estatus: Común ↔ Nobleza).',
      activeComponent: 'grid',
      words: baseWords.map(w => ({ ...w, visible: true, isNew: false })),
      gridVisible: true,
      axesLabelsVisible: true,
      arrowsVisible: false,
      equationVisible: false,
    },
    {
      stepIndex: 2,
      timeSec: 6.4,
      stepDurationMs: 3200,
      phase: 'COORDINATES',
      phaseLabel: '3. COORDENADAS',
      stepTitle: 'Paso 3: Ubicando a "Hombre" en [-0.7, -0.6]',
      description: 'Colocamos "Hombre" en el cuadrante inferior izquierdo: es masculino (X = -0.7) y persona común (Y = -0.6). ¡La palabra ahora tiene una posición numérica en el espacio!',
      activeComponent: 'points',
      words: baseWords.map(w => ({ ...w, visible: true, isNew: w.id === 'hombre' })),
      gridVisible: true,
      axesLabelsVisible: true,
      arrowsVisible: false,
      equationVisible: false,
      highlightWordId: 'hombre',
    },
    {
      stepIndex: 3,
      timeSec: 9.6,
      stepDurationMs: 3200,
      phase: 'COORDINATES',
      phaseLabel: '3. COORDENADAS',
      stepTitle: 'Paso 4: Ubicando a "Mujer" en [+0.7, -0.6]',
      description: 'Colocamos "Mujer" a la derecha: es femenina (X = +0.7) y persona común (Y = -0.6). Nota que ambos comparten la misma altura en el eje Y porque ambos son personas comunes.',
      activeComponent: 'points',
      words: baseWords.map(w => ({ ...w, visible: true, isNew: w.id === 'mujer' })),
      gridVisible: true,
      axesLabelsVisible: true,
      arrowsVisible: false,
      equationVisible: false,
      highlightWordId: 'mujer',
    },
    {
      stepIndex: 4,
      timeSec: 12.8,
      stepDurationMs: 3200,
      phase: 'COORDINATES',
      phaseLabel: '3. COORDENADAS',
      stepTitle: 'Paso 5: Ubicando a "Rey" en [-0.7, +0.7]',
      description: 'Ahora colocamos "Rey": sigue siendo masculino (X = -0.7), pero asciende verticalmente al estatus de nobleza (Y = +0.7). Queda exactamente arriba de "Hombre".',
      activeComponent: 'points',
      words: baseWords.map(w => ({ ...w, visible: true, isNew: w.id === 'rey' })),
      gridVisible: true,
      axesLabelsVisible: true,
      arrowsVisible: false,
      equationVisible: false,
      highlightWordId: 'rey',
    },
    {
      stepIndex: 5,
      timeSec: 16.0,
      stepDurationMs: 3200,
      phase: 'COORDINATES',
      phaseLabel: '3. DEFINICIÓN EMBEDDING',
      stepTitle: 'Paso 6: Ubicando a "Reina" en [+0.7, +0.7]',
      description: '"Reina" es femenina (X = +0.7) y nobleza (Y = +0.7). Esta lista de números [X, Y] se llama EMBEDDING: la traducción exacta de un concepto humano a coordenadas matemáticas.',
      activeComponent: 'points',
      words: baseWords.map(w => ({ ...w, visible: true, isNew: w.id === 'reina' })),
      gridVisible: true,
      axesLabelsVisible: true,
      arrowsVisible: false,
      equationVisible: false,
      highlightWordId: 'reina',
    },
    {
      stepIndex: 6,
      timeSec: 19.2,
      stepDurationMs: 3200,
      phase: 'VECTORS',
      phaseLabel: '4. VECTORES / RELACIONES',
      stepTitle: 'Paso 7: Las Relaciones son Flechas con Dirección',
      description: 'Para pasar de "Hombre" a "Rey", sumamos una flecha vertical hacia arriba (+Nobleza). Y para pasar de "Mujer" a "Reina", ¡la flecha es exactamente idéntica!',
      activeComponent: 'arrows',
      words: baseWords.map(w => ({ ...w, visible: true, isNew: false })),
      gridVisible: true,
      axesLabelsVisible: true,
      arrowsVisible: true,
      equationVisible: false,
    },
    {
      stepIndex: 7,
      timeSec: 22.4,
      stepDurationMs: 3200,
      phase: 'EQUATION',
      phaseLabel: '5. ÁLGEBRA DE SIGNIFICADOS',
      stepTitle: 'Paso 8: ¿Podemos calcular con palabras?',
      description: 'Hagamos un experimento algebraico con los significados: Tomamos el vector de "Rey", le restamos "Hombre" (quitamos el género masculino) y le sumamos "Mujer".',
      activeComponent: 'equation',
      words: baseWords.map(w => ({ ...w, visible: true, isNew: false })),
      gridVisible: true,
      axesLabelsVisible: true,
      arrowsVisible: true,
      equationVisible: true,
      formulaHighlight: 'Rey - Hombre + Mujer',
    },
    {
      stepIndex: 8,
      timeSec: 25.6,
      stepDurationMs: 3200,
      phase: 'EQUATION',
      phaseLabel: '5. EL RESULTADO MÁGICO',
      stepTitle: 'Paso 9: [-0.7, 0.7] - [-0.7, -0.6] + [0.7, -0.6] = [+0.7, +0.7]',
      description: 'Al resolver la aritmética de coordenadas numéricas, el resultado cae con absoluta precisión matemática en la posición de: "Reina". La IA puede razonar por analogía.',
      activeComponent: 'equation',
      words: baseWords.map(w => ({ ...w, visible: true, isNew: false })),
      gridVisible: true,
      axesLabelsVisible: true,
      arrowsVisible: true,
      equationVisible: true,
      formulaHighlight: 'Rey - Hombre + Mujer = Reina',
      highlightWordId: 'reina',
    },
    {
      stepIndex: 9,
      timeSec: 28.8,
      stepDurationMs: 3200,
      phase: 'DIMENSIONS',
      phaseLabel: '6. DEL 2D A 1536D',
      stepTitle: 'Paso 10: En la IA Real no hay 2 ejes... ¡hay 1536!',
      description: 'En este ejemplo usamos solo 2 ejes visuales. Modelos reales como los de Gemini o GPT usan hasta 1536 o 3072 dimensiones numéricas para capturar contexto, emoción, idioma y matices.',
      activeComponent: 'dimensions',
      words: baseWords.map(w => ({ ...w, visible: true, isNew: false })),
      gridVisible: true,
      axesLabelsVisible: true,
      arrowsVisible: true,
      equationVisible: true,
      showDimensionsNotice: true,
    },
    {
      stepIndex: 10,
      timeSec: 32.0,
      stepDurationMs: 3500,
      phase: 'SUMMARY',
      phaseLabel: '7. CONCLUSIÓN VISUAL',
      stepTitle: 'Paso 11: En resumen, ¿qué es un Embedding?',
      description: 'Un Embedding es un traductor que convierte ideas humanas en puntos de un mapa numérico. Las cosas con significado similar quedan cerca, permitiendo buscar y razonar con álgebra.',
      activeComponent: 'summary',
      words: baseWords.map(w => ({ ...w, visible: true, isNew: false })),
      gridVisible: true,
      axesLabelsVisible: true,
      arrowsVisible: true,
      equationVisible: true,
      showDimensionsNotice: true,
    },
  ];
}
