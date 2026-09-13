import {makeScene2D} from '@motion-canvas/2d';
import {
  all,
  chain,
  createRef,
  createSignal,
  easeInCubic,
  easeInOutCubic,
  easeInOutQuad,
  easeOutBack,
  easeOutCubic,
  sequence,
  waitUntil,
} from '@motion-canvas/core';
import {
  Circle,
  Grid,
  Line,
  Node,
  Path,
  Rect,
  Txt,
} from '@motion-canvas/2d';
import { COMPANY_NAME } from '../../config/appConfig';

export default makeScene2D(function* (view) {
  // =========================================================================
  // CONSTANTES VISUALES & PALETA TRIBUTARIA
  // =========================================================================
  const C = {
    fondo: '#050811',
    lineasGrid: '#1e293b',
    bordeNodo: '#1e293b',
    cardFondo: '#0f172a',
    sistemaCian: '#38bdf8',
    validadorAzul: '#0284c7',
    errorRojo: '#ef4444',
    exitoVerde: '#10b981',
    alertaAmarillo: '#f59e0b',
    textoBlanco: '#ffffff',
    textoGris: '#94a3b8',
    textoMuted: '#64748b',
  };

  // Coordenadas Exactas de la Topología Visual (3 Nodos Centrales)
  const POS = {
    sistema: { x: 0, y: -350 },
    validador: { x: 0, y: 0 },
    correccion: { x: 0, y: 450 },
  };

  // =========================================================================
  // 1. FONDO TACTICAL CON MALLA
  // =========================================================================
  view.add(
    <Rect
      width={1080}
      height={1920}
      fill={C.fondo}
    />
  );

  view.add(
    <Grid
      width={1080}
      height={1920}
      stroke={C.lineasGrid}
      lineWidth={1}
      spacing={44}
      opacity={0.12}
    />
  );

  // =========================================================================
  // 2. HEADER SUPERIOR (Y: -860) • BRANDING my.app
  // =========================================================================
  const headerNode = createRef<Node>();
  const neonPingScale = createSignal(1);
  const neonPingOpacity = createSignal(0.8);
  const headerBadgeText = createSignal('DEBUGGING FISCAL • SUNAT / OSE');
  const headerSubText = createSignal('CÓDIGO DE EXCEPCIÓN EN TIEMPO REAL');
  const timerText = createSignal('0.0s / 33s');
  const progressBarWidth = createSignal(0);

  view.add(
    <Node ref={headerNode} y={-860}>
      {/* Contenedor del Header */}
      <Rect
        width={980}
        height={130}
        fill={'#0a0f1d'}
        stroke={C.bordeNodo}
        lineWidth={2}
        radius={24}
        shadowColor={'rgba(0, 0, 0, 0.6)'}
        shadowBlur={30}
      />

      {/* Marca my.app con punto verde neón */}
      <Node x={-360} y={-24}>
        <Circle
          size={14}
          fill={C.exitoVerde}
          scale={() => neonPingScale()}
          opacity={() => neonPingOpacity()}
          shadowColor={C.exitoVerde}
          shadowBlur={16}
        />
        <Circle size={10} fill={C.exitoVerde} />
        <Txt
          text={COMPANY_NAME}
          fill={C.textoBlanco}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={34}
          fontWeight={900}
          letterSpacing={3}
          x={110}
          y={0}
        />
      </Node>

      {/* Badge Superior Derecho: DEBUGGING FISCAL • SUNAT / OSE */}
      <Rect
        x={280}
        y={-24}
        width={360}
        height={38}
        fill={'#0f172a'}
        stroke={C.errorRojo}
        lineWidth={1.5}
        radius={19}
      >
        <Txt
          text={() => headerBadgeText()}
          fill={C.errorRojo}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={14}
          fontWeight={800}
          letterSpacing={1.2}
        />
      </Rect>

      {/* Subtítulo Dinámico Inferior */}
      <Txt
        text={() => headerSubText()}
        fill={C.sistemaCian}
        fontFamily={'JetBrains Mono, monospace'}
        fontSize={17}
        fontWeight={800}
        letterSpacing={2}
        x={-80}
        y={28}
      />

      {/* Contador de Tiempo / Telemetría */}
      <Rect
        x={380}
        y={28}
        width={140}
        height={30}
        fill={'#050811'}
        stroke={C.bordeNodo}
        lineWidth={1}
        radius={8}
      >
        <Txt
          text={() => timerText()}
          fill={C.textoGris}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={14}
          fontWeight={700}
        />
      </Rect>

      {/* Barra de Progreso Luminosa en Base del Header */}
      <Rect
        x={0}
        y={63}
        width={940}
        height={4}
        fill={'#1e293b'}
        radius={2}
      >
        <Rect
          x={() => -470 + progressBarWidth() / 2}
          width={() => progressBarWidth()}
          height={4}
          fill={C.exitoVerde}
          radius={2}
          shadowColor={C.exitoVerde}
          shadowBlur={10}
        />
      </Rect>
    </Node>
  );

  // =========================================================================
  // 3. TARJETA DIDÁCTICA EXPLICATIVA (Y: -690)
  // =========================================================================
  const didactTitle = createSignal('Fase 1: Envío de Factura F001-102');
  const didactDesc = createSignal('Tu sistema emite el comprobante hacia el validador OSE con base S/ 100.00 e IGV S/ 17.90.');
  const didactStepBadge = createSignal('P1/10');
  const didactBorder = createSignal(C.sistemaCian);

  view.add(
    <Node y={-690}>
      <Rect
        width={980}
        height={100}
        fill={'#0c1324'}
        stroke={() => didactBorder()}
        lineWidth={2}
        radius={20}
        shadowColor={'rgba(0, 0, 0, 0.4)'}
        shadowBlur={20}
      >
        <Node x={-430} y={0}>
          <Circle size={44} fill={'#070b14'} stroke={C.bordeNodo} lineWidth={2} />
          <Txt text="🔍" fontSize={22} y={-2} />
        </Node>

        <Txt
          text={() => didactTitle()}
          fill={C.textoBlanco}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={21}
          fontWeight={800}
          x={-30}
          y={-16}
        />
        <Txt
          text={() => didactDesc()}
          fill={C.textoGris}
          fontFamily={'system-ui, sans-serif'}
          fontSize={15}
          fontWeight={500}
          x={-30}
          y={16}
        />

        <Rect
          x={420}
          y={0}
          width={70}
          height={32}
          fill={'#070b14'}
          stroke={C.bordeNodo}
          lineWidth={1.5}
          radius={8}
        >
          <Txt
            text={() => didactStepBadge()}
            fill={C.sistemaCian}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={15}
            fontWeight={900}
          />
        </Rect>
      </Rect>
    </Node>
  );

  // =========================================================================
  // 4. LÍNEAS DE INTERCONEXIÓN VERTICAL
  // =========================================================================
  const lineSistemaValidadorAlpha = createSignal(0.3);
  const lineValidadorCorreccionAlpha = createSignal(0.2);

  // Línea 1: SISTEMA -> VALIDADOR
  view.add(
    <Line
      points={[
        [POS.sistema.x, POS.sistema.y + 90],
        [POS.validador.x, POS.validador.y - 100],
      ]}
      stroke={C.sistemaCian}
      lineWidth={3}
      lineDash={[8, 8]}
      opacity={() => lineSistemaValidadorAlpha()}
    />
  );

  // Línea 2: VALIDADOR -> PANEL CORRECCIÓN
  view.add(
    <Line
      points={[
        [POS.validador.x, POS.validador.y + 100],
        [POS.correccion.x, POS.correccion.y - 120],
      ]}
      stroke={C.alertaAmarillo}
      lineWidth={3}
      lineDash={[8, 8]}
      opacity={() => lineValidadorCorreccionAlpha()}
    />
  );

  // =========================================================================
  // 5. NODO 1: [TU SISTEMA / ERP] (Y: -350)
  // =========================================================================
  const sistemaScale = createSignal(1);
  const sistemaGlow = createSignal(0);

  view.add(
    <Node x={POS.sistema.x} y={POS.sistema.y} scale={() => sistemaScale()}>
      <Rect
        width={420}
        height={160}
        fill={C.cardFondo}
        stroke={C.sistemaCian}
        lineWidth={2}
        radius={22}
        shadowColor={C.sistemaCian}
        shadowBlur={() => sistemaGlow()}
      >
        <Node y={-35}>
          <Circle size={44} fill={'#07192a'} stroke={C.sistemaCian} lineWidth={1.5} />
          <Txt text="APP" fontSize={12} fontWeight={900} fill={C.sistemaCian} fontFamily={'JetBrains Mono, monospace'} y={-2} />
        </Node>
        <Txt
          text="TU SISTEMA / ERP"
          fill={C.textoBlanco}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={19}
          fontWeight={900}
          letterSpacing={1.2}
          y={10}
        />
        <Txt
          text="Emisión de XML UBL 2.1"
          fill={C.sistemaCian}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={12}
          fontWeight={700}
          y={38}
        />
        <Rect
          y={60}
          width={320}
          height={22}
          fill={'#06111f'}
          stroke={C.bordeNodo}
          lineWidth={1}
          radius={6}
        >
          <Txt
            text="POST /sendBill (FACTURA F001-102)"
            fill={C.textoGris}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={10}
            fontWeight={600}
          />
        </Rect>
      </Rect>
    </Node>
  );

  // =========================================================================
  // 6. NODO 2: [VALIDADOR OSE / SUNAT] (Y: 0) - ESCÁNER CENTRAL
  // =========================================================================
  const validadorScale = createSignal(1);
  const validadorGlow = createSignal(10);
  const validadorBorderColor = createSignal(C.validadorAzul);
  const validadorStatus = createSignal('ESCÁNER ARITMÉTICO EN ESPERA');
  const validadorStatusColor = createSignal(C.sistemaCian);
  const validadorRadarRadius = createSignal(110);
  const validadorRadarOpacity = createSignal(0);

  view.add(
    <Node x={POS.validador.x} y={POS.validador.y} scale={() => validadorScale()}>
      {/* Escáner de Auditoría Radial */}
      <Circle
        size={() => validadorRadarRadius()}
        stroke={() => validadorBorderColor()}
        lineWidth={3}
        opacity={() => validadorRadarOpacity()}
      />

      <Rect
        width={460}
        height={200}
        fill={'#0a1020'}
        stroke={() => validadorBorderColor()}
        lineWidth={3}
        radius={26}
        shadowColor={() => validadorBorderColor()}
        shadowBlur={() => validadorGlow()}
      >
        <Node y={-40}>
          <Circle size={52} fill={'#061324'} stroke={() => validadorBorderColor()} lineWidth={2} />
          <Txt text="SUNAT" fontSize={11} fontWeight={900} fill={C.validadorAzul} fontFamily={'JetBrains Mono, monospace'} y={-2} />
        </Node>

        <Txt
          text="VALIDADOR OSE / SUNAT"
          fill={C.textoBlanco}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={22}
          fontWeight={900}
          letterSpacing={1.5}
          y={10}
        />

        <Txt
          text={() => validadorStatus()}
          fill={() => validadorStatusColor()}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={12}
          fontWeight={800}
          letterSpacing={1}
          y={42}
        />

        <Rect
          y={72}
          width={380}
          height={26}
          fill={'#06111f'}
          stroke={C.bordeNodo}
          lineWidth={1}
          radius={6}
        >
          <Txt
            text="AUDITORÍA XSD • TOLERANCIA ESTRICTA DE IGV"
            fill={C.textoMuted}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={10}
            fontWeight={700}
          />
        </Rect>
      </Rect>
    </Node>
  );

  // =========================================================================
  // 7. NODO 3: [PANEL DE CORRECCIÓN] (Y: +450) - COMPARACIÓN TÉCNICA
  // =========================================================================
  const panelScale = createSignal(1);
  const panelGlow = createSignal(0);
  const panelBorder = createSignal(C.bordeNodo);
  const badIgvColor = createSignal(C.errorRojo);
  const goodIgvColor = createSignal(C.textoMuted);
  const goodIgvGlow = createSignal(0);
  const goodIgvScale = createSignal(1);

  view.add(
    <Node x={POS.correccion.x} y={POS.correccion.y} scale={() => panelScale()}>
      <Rect
        width={460}
        height={240}
        fill={C.cardFondo}
        stroke={() => panelBorder()}
        lineWidth={2}
        radius={24}
        shadowColor={C.exitoVerde}
        shadowBlur={() => panelGlow()}
      >
        {/* Badge Superior */}
        <Rect
          y={-120}
          width={300}
          height={30}
          fill={'#1e1b4b'}
          stroke={C.alertaAmarillo}
          lineWidth={1.5}
          radius={15}
        >
          <Txt
            text="DIAGNÓSTICO Y CORRECCIÓN TÉCNICA"
            fill={C.alertaAmarillo}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={11}
            fontWeight={900}
            letterSpacing={1}
          />
        </Rect>

        {/* Fila 1: Cálculo Incorrecto */}
        <Node y={-45}>
          <Rect
            width={410}
            height={60}
            fill={'#1a0c10'}
            stroke={C.errorRojo}
            lineWidth={1.5}
            radius={12}
          >
            <Txt
              text="ERROR COMÚN: Redondeo prematuro por ítem"
              fill={C.errorRojo}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={11}
              fontWeight={800}
              y={-12}
            />
            <Txt
              text="S/ 6.00 + S/ 6.00 + S/ 5.90 = S/ 17.90 (Diferencia -S/ 0.10)"
              fill={() => badIgvColor()}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={10}
              fontWeight={700}
              y={12}
            />
          </Rect>
        </Node>

        {/* Fila 2: Regla Técnica UBL 2.1 */}
        <Node y={45}>
          <Rect
            width={410}
            height={68}
            fill={'#061a14'}
            stroke={C.exitoVerde}
            lineWidth={2}
            radius={12}
            shadowColor={C.exitoVerde}
            shadowBlur={() => goodIgvGlow()}
          >
            <Txt
              text="REGLA UBL 2.1: Multiplicar Base Agregada * 0.18"
              fill={C.exitoVerde}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={11}
              fontWeight={900}
              y={-14}
            />
            <Node y={12} scale={() => goodIgvScale()}>
              <Txt
                text="Base Total S/ 100.00 * 0.18 = S/ 18.00 EXACTO"
                fill={() => goodIgvColor()}
                fontFamily={'JetBrains Mono, monospace'}
                fontSize={12}
                fontWeight={900}
              />
            </Node>
          </Rect>
        </Node>
      </Rect>
    </Node>
  );

  // =========================================================================
  // 8. PAQUETE VIAJERO EN PANTALLA (Factura F001-102)
  // =========================================================================
  const pktPos = createSignal({ x: POS.sistema.x, y: POS.sistema.y });
  const pktOpacity = createSignal(0);
  const pktScale = createSignal(1);
  const pktTitle = createSignal('FACTURA F001-102');
  const pktSub = createSignal('BASE: S/ 100.00 | IGV: S/ 17.90');
  const pktBorder = createSignal(C.sistemaCian);
  const pktFill = createSignal('#0c1f36');

  view.add(
    <Node
      x={() => pktPos().x}
      y={() => pktPos().y}
      scale={() => pktScale()}
      opacity={() => pktOpacity()}
    >
      <Rect
        width={260}
        height={70}
        fill={() => pktFill()}
        stroke={() => pktBorder()}
        lineWidth={2}
        radius={14}
        shadowColor={() => pktBorder()}
        shadowBlur={20}
      >
        <Txt
          text={() => pktTitle()}
          fill={C.textoBlanco}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={13}
          fontWeight={900}
          y={-12}
        />
        <Txt
          text={() => pktSub()}
          fill={() => pktBorder()}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={10}
          fontWeight={800}
          y={12}
        />
      </Rect>
    </Node>
  );

  // =========================================================================
  // 9. MODAL FLOTANTE DE ALERTA: ERROR 2119 (Y: -150)
  // =========================================================================
  const errorModalY = createSignal(-120);
  const errorModalOpacity = createSignal(0);
  const errorModalScale = createSignal(0.8);

  view.add(
    <Node
      y={() => errorModalY()}
      opacity={() => errorModalOpacity()}
      scale={() => errorModalScale()}
    >
      <Rect
        width={440}
        height={120}
        fill={'#1f0a0d'}
        stroke={C.errorRojo}
        lineWidth={2.5}
        radius={20}
        shadowColor={C.errorRojo}
        shadowBlur={30}
      >
        <Node y={-24}>
          <Txt
            text="ERROR 2119: DISCREPANCIA DE IGV"
            fill={C.errorRojo}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={14}
            fontWeight={900}
            letterSpacing={1}
          />
        </Node>
        <Txt
          text="La base imponible y el tributo no coinciden con la tasa (18%)"
          fill={C.textoBlanco}
          fontFamily={'system-ui, sans-serif'}
          fontSize={11}
          fontWeight={600}
          y={6}
        />
        <Txt
          text="CDR ESTADO: RECHAZADO (COMPROBANTE NO VÁLIDO)"
          fill={'#fca5a5'}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={10}
          fontWeight={800}
          y={30}
        />
      </Rect>
    </Node>
  );

  // =========================================================================
  // 10. PANEL INFERIOR DE ESPECIFICACIÓN TRIBUTARIA (Y: +780)
  // =========================================================================
  const teleNorma = createSignal('OASIS UBL 2.1 / cbc:TaxAmount');
  const teleCausa = createSignal('Truncamiento decimal por línea');
  const teleSolucion = createSignal('Calcular sobre base imponible agregada');

  view.add(
    <Node y={780}>
      <Rect
        width={980}
        height={170}
        fill={'#0a0f1d'}
        stroke={C.bordeNodo}
        lineWidth={2}
        radius={24}
        shadowColor={'rgba(0, 0, 0, 0.6)'}
        shadowBlur={30}
      >
        <Node y={-52}>
          <Rect
            x={-350}
            width={240}
            height={28}
            fill={'#0f172a'}
            stroke={C.sistemaCian}
            lineWidth={1}
            radius={8}
          >
            <Txt
              text="ESPECIFICACIÓN TRIBUTARIA"
              fill={C.sistemaCian}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={11}
              fontWeight={800}
              letterSpacing={1}
            />
          </Rect>

          <Txt
            text={() => teleSolucion()}
            fill={C.exitoVerde}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={13}
            fontWeight={800}
            x={100}
          />
        </Node>

        {/* 3 Cajas de Métricas */}
        <Node y={16}>
          <Rect
            x={-300}
            width={280}
            height={70}
            fill={'#070b14'}
            stroke={C.bordeNodo}
            lineWidth={1.5}
            radius={12}
          >
            <Txt
              text="NORMA UBL / XSD"
              fill={C.textoMuted}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={10}
              fontWeight={700}
              y={-16}
            />
            <Txt
              text={() => teleNorma()}
              fill={C.textoBlanco}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={12}
              fontWeight={800}
              y={12}
            />
          </Rect>

          <Rect
            x={0}
            width={280}
            height={70}
            fill={'#070b14'}
            stroke={C.bordeNodo}
            lineWidth={1.5}
            radius={12}
          >
            <Txt
              text="CAUSA RAÍZ"
              fill={C.textoMuted}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={10}
              fontWeight={700}
              y={-16}
            />
            <Txt
              text={() => teleCausa()}
              fill={C.errorRojo}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={12}
              fontWeight={800}
              y={12}
            />
          </Rect>

          <Rect
            x={300}
            width={280}
            height={70}
            fill={'#070b14'}
            stroke={C.bordeNodo}
            lineWidth={1.5}
            radius={12}
          >
            <Txt
              text="TOLERANCIA PERMITIDA"
              fill={C.textoMuted}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={10}
              fontWeight={700}
              y={-16}
            />
            <Txt
              text="MÁX ± S/ 0.05"
              fill={C.alertaAmarillo}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={14}
              fontWeight={900}
              y={12}
            />
          </Rect>
        </Node>
      </Rect>
    </Node>
  );

  // =========================================================================
  // EJECUCIÓN CINEMÁTICA PRINCIPAL (DURACIÓN: 33 SEGUNDOS / ~1980 FRAMES)
  // =========================================================================

  // Loop de pulso verde neón para la marca my.app
  // @ts-ignore
  const pulseTask = function* () {
    while (true) {
      yield* neonPingScale(1.4, 0.8, easeInOutCubic);
      yield* neonPingOpacity(0.2, 0.8, easeInOutCubic);
      yield* neonPingScale(1.0, 0.8, easeInOutCubic);
      yield* neonPingOpacity(0.8, 0.8, easeInOutCubic);
    }
  };

  // -------------------------------------------------------------------------
  // FASE 1: EL ENVÍO CON INCONSISTENCIA (0s - 8s)
  // -------------------------------------------------------------------------
  // Tu sistema despacha la factura con inconsistencia deliberada (Base S/ 100.00 vs IGV S/ 17.90)
  yield* all(
    sistemaScale(1.08, 0.6, easeOutBack),
    sistemaGlow(22, 0.6),
    pktOpacity(1, 0.4),
    pktPos({ x: POS.sistema.x, y: POS.sistema.y }, 0.1),
    progressBarWidth(120, 3.5),
    timerText('3.5s / 33s', 3.5),
  );

  // El comprobante viaja hacia el Validador OSE/SUNAT
  yield* all(
    lineSistemaValidadorAlpha(1.0, 0.4),
    pktPos({ x: POS.validador.x, y: POS.validador.y - 40 }, 2.0, easeInOutCubic),
    sistemaScale(1.0, 0.5),
    sistemaGlow(0, 0.5),
    progressBarWidth(240, 4.0),
    timerText('8.0s / 33s', 4.0),
  );

  // -------------------------------------------------------------------------
  // FASE 2: EL ESCANEO Y DISPARO DEL RECHAZO (8s - 16s)
  // -------------------------------------------------------------------------
  // El validador recibe y escanea
  yield* all(
    validadorScale(1.08, 0.5, easeOutBack),
    validadorGlow(25, 0.5),
    validadorRadarOpacity(0.8, 0.3),
    validadorRadarRadius(260, 1.8, easeOutCubic),
    validadorStatus('ESCANEANDO MATRIZ DE REGLAS...', 0.3),
    didactTitle('Fase 2: Escaneo y Detección de Discrepancia', 0.4),
    didactDesc('El motor detecta que Base S/ 100.00 * 0.18 no coincide con S/ 17.90 (Margen excedido).', 0.4),
    didactStepBadge('P3/10', 0.4),
    didactBorder(C.alertaAmarillo, 0.4),
    progressBarWidth(360, 3.5),
    timerText('11.5s / 33s', 3.5),
  );

  // Disparo del Error 2119 y Rechazo
  yield* all(
    validadorBorderColor(C.errorRojo, 0.4),
    validadorGlow(32, 0.4),
    validadorStatus('RECHAZADO: ERROR 2119 DETECTADO', 0.4),
    validadorStatusColor(C.errorRojo, 0.4),
    pktBorder(C.errorRojo, 0.3),
    pktFill('#26080d', 0.3),
    errorModalOpacity(1, 0.5, easeOutBack),
    errorModalScale(1.0, 0.5, easeOutBack),
    errorModalY(-150, 0.5, easeOutBack),
    headerBadgeText('ALERTA: RECHAZO TRIBUTARIO ERROR 2119', 0.4),
    didactTitle('Fase 3: CDR con Error 2119 Estampado', 0.4),
    didactDesc('¡Comprobante no válido ante SUNAT! La factura es rechazada y no puede ser declarada.', 0.4),
    didactStepBadge('P4/10', 0.4),
    didactBorder(C.errorRojo, 0.4),
    progressBarWidth(480, 4.5),
    timerText('16.0s / 33s', 4.5),
  );

  // -------------------------------------------------------------------------
  // FASE 3: APERTURA DEL PANEL DE CORRECCIÓN (16s - 25s)
  // -------------------------------------------------------------------------
  // El enfoque se desliza hacia el Panel de Corrección
  yield* all(
    errorModalOpacity(0, 0.4),
    validadorScale(1.0, 0.4),
    validadorGlow(8, 0.4),
    lineValidadorCorreccionAlpha(1.0, 0.5),
    panelScale(1.06, 0.6, easeOutBack),
    panelGlow(20, 0.6),
    panelBorder(C.alertaAmarillo, 0.6),
    pktPos({ x: POS.correccion.x, y: POS.correccion.y - 140 }, 1.5, easeInOutCubic),
    didactTitle('Fase 4: Diagnóstico de Causa Raíz', 0.5),
    didactDesc('El sistema sumó 3 líneas redondeadas a 2 decimales prematuramente, perdiendo 10 céntimos.', 0.5),
    didactStepBadge('P5/10', 0.4),
    didactBorder(C.alertaAmarillo, 0.4),
    progressBarWidth(600, 4.5),
    timerText('20.5s / 33s', 4.5),
  );

  // Se resalta la Regla Técnica UBL 2.1
  yield* all(
    goodIgvColor(C.exitoVerde, 0.5),
    goodIgvGlow(24, 0.5),
    goodIgvScale(1.08, 0.5, easeOutBack),
    panelBorder(C.exitoVerde, 0.5),
    didactTitle('Fase 5: Solución Técnica Oficial UBL 2.1', 0.5),
    didactDesc('Multiplicar la Base Total Agregada (S/ 100.00 * 0.18) = S/ 18.00 exacto.', 0.5),
    didactStepBadge('P6/10', 0.4),
    didactBorder(C.exitoVerde, 0.4),
    teleCausa('Corregido: Base Agregada * 0.18', 0.4),
    teleSolucion('Alineación exacta sin pérdidas decimales', 0.4),
    progressBarWidth(720, 4.5),
    timerText('25.0s / 33s', 4.5),
  );

  // -------------------------------------------------------------------------
  // FASE 4: REINTENTO EXITOSO Y CDR ACEPTADO (25s - 33s)
  // -------------------------------------------------------------------------
  // Comprobante corregido se refirma y vuelve a subir hacia el validador
  yield* all(
    panelScale(1.0, 0.4),
    panelGlow(0, 0.4),
    pktTitle('FACTURA F001-102 (CORREGIDA)', 0.3),
    pktSub('BASE: S/ 100.00 | IGV: S/ 18.00', 0.3),
    pktBorder(C.exitoVerde, 0.3),
    pktFill('#03291e', 0.3),
    didactTitle('Fase 6: Reenvío con Datos Corregidos', 0.4),
    didactDesc('Tu sistema emite el paquete refirmado hacia el Validador OSE con IGV S/ 18.00.', 0.4),
    didactStepBadge('P7/10', 0.4),
    didactBorder(C.exitoVerde, 0.4),
    pktPos({ x: POS.validador.x, y: POS.validador.y - 30 }, 1.8, easeInOutCubic),
    progressBarWidth(820, 3.5),
    timerText('28.5s / 33s', 3.5),
  );

  // El Validador se ilumina en Verde Esmeralda (Aprobado)
  yield* all(
    validadorBorderColor(C.exitoVerde, 0.4),
    validadorGlow(30, 0.4),
    validadorStatus('VALIDACIÓN CONFORME (TASA 18% EXACTA)', 0.4),
    validadorStatusColor(C.exitoVerde, 0.4),
    headerBadgeText('VALIDACIÓN CONFORME • TASA 18% OK', 0.4),
    didactTitle('Fase 7: CDR Estado 0 Generado con Éxito', 0.4),
    didactDesc('¡Comprobante legalmente aceptado! Se expide el CDR con Estado 0 sin multas ni bloqueos.', 0.4),
    didactStepBadge('P8/10', 0.4),
    progressBarWidth(900, 2.5),
    timerText('31.0s / 33s', 2.5),
  );

  // Retorno triunfal del CDR hacia TU SISTEMA
  yield* all(
    pktPos({ x: POS.sistema.x, y: POS.sistema.y }, 1.0, easeInOutCubic),
    sistemaScale(1.08, 0.5, easeOutBack),
    sistemaGlow(25, 0.5),
    didactTitle('Fase 8: Arquitectura Fiscal Conforme', 0.4),
    didactDesc(`${COMPANY_NAME}: Resuelve inconsistencias de redondeo y mantén tu facturación 24/7 libre de errores.`, 0.4),
    didactStepBadge('P10/10', 0.4),
    progressBarWidth(940, 2.0),
    timerText('33.0s / 33s', 2.0),
  );

  yield* waitUntil('end');
});