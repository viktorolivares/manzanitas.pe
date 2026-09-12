/**
 * SCRIPT COMPLETO DE MOTION CANVAS: ¿Cómo funciona la Facturación con PSE y OSE?
 * 
 * - Formato: Vertical 9:16 (1080x1920) a 60 FPS
 * - Duración Total: 33 Segundos (1980 frames a 60fps)
 * - Tema: Por qué SUNAT ya no valida tus facturas en vivo (Desacoplamiento con PSE y OSE)
 * - Marca: codevo.pe (status verde neón pulsante)
 * - Topología de Red:
 *    1. TU APP / ERP: (Y: -400, X: -320)
 *    2. PSE: (Y: -400, X: +320)
 *    3. OSE: (Y: +50, X: 0)
 *    4. SUNAT (BASE CENTRAL): (Y: +500, X: 0)
 * 
 * Listo para copiar y ejecutar en Motion Canvas (@motion-canvas/2d y @motion-canvas/core).
 */

export const PSE_OSE_SCENE_CODE = `import {makeScene2D} from '@motion-canvas/2d';
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

export default makeScene2D(function* (view) {
  // =========================================================================
  // CONSTANTES VISUALES & PALETA TRIBUTARIA CLOUD
  // =========================================================================
  const C = {
    fondo: '#050811',
    lineasGrid: '#1e293b',
    bordeNodo: '#1e293b',
    cardFondo: '#0b1120',
    appCian: '#38bdf8',
    pseVioleta: '#8b5cf6',
    oseVerde: '#10b981',
    sunatAzul: '#0284c7',
    sunatRojo: '#e11d48',
    amarilloAlerta: '#f59e0b',
    textoBlanco: '#ffffff',
    textoGris: '#94a3b8',
    textoMuted: '#64748b',
  };

  // Coordenadas Exactas de la Topología de Red
  const POS = {
    app: { x: -320, y: -400 },
    pse: { x: 320, y: -400 },
    ose: { x: 0, y: 50 },
    sunat: { x: 0, y: 500 },
  };

  // =========================================================================
  // 1. FONDO TACTICAL CLOUD CON MALLA
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
  // 2. HEADER SUPERIOR (Y: -860) • BRANDING codevo.pe & ARQUITECTURA CLOUD
  // =========================================================================
  const headerNode = createRef<Node>();
  const neonPingScale = createSignal(1);
  const neonPingOpacity = createSignal(0.8);
  const statusPhaseText = createSignal('ARQUITECTURA CLOUD • PSE / OSE');
  const statusSubText = createSignal('DESACOPLAMIENTO DE SERVIDORES SUNAT');
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

      {/* Marca codevo.pe con punto verde neón */}
      <Node x={-360} y={-24}>
        <Circle
          size={14}
          fill={C.oseVerde}
          scale={() => neonPingScale()}
          opacity={() => neonPingOpacity()}
          shadowColor={C.oseVerde}
          shadowBlur={16}
        />
        <Circle size={10} fill={C.oseVerde} />
        <Txt
          text="codevo.pe"
          fill={C.textoBlanco}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={34}
          fontWeight={900}
          letterSpacing={3}
          x={110}
          y={0}
        />
      </Node>

      {/* Badge Superior Derecho */}
      <Rect
        x={280}
        y={-24}
        width={360}
        height={38}
        fill={'#0f172a'}
        stroke={C.pseVioleta}
        lineWidth={1.5}
        radius={19}
      >
        <Txt
          text="ARQUITECTURA CLOUD • PSE / OSE"
          fill={C.pseVioleta}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={15}
          fontWeight={800}
          letterSpacing={1.2}
        />
      </Rect>

      {/* Subtítulo Dinámico Inferior */}
      <Txt
        text={() => statusSubText()}
        fill={C.appCian}
        fontFamily={'JetBrains Mono, monospace'}
        fontSize={18}
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
          fill={C.oseVerde}
          radius={2}
          shadowColor={C.oseVerde}
          shadowBlur={10}
        />
      </Rect>
    </Node>
  );

  // =========================================================================
  // 3. TARJETA DIDÁCTICA EXPLICATIVA (Y: -690)
  // =========================================================================
  const didactStepTitle = createSignal('Fase 1: Tu App envía JSON ligero al PSE');
  const didactStepDesc = createSignal('Tu sistema no gasta CPU firmando XML ni lidiando con SOAP. Envía un JSON limpio al PSE.');
  const didactBadgeNum = createSignal('P1/10');
  const didactBorderColor = createSignal(C.appCian);

  view.add(
    <Node y={-690}>
      <Rect
        width={980}
        height={100}
        fill={'#0c1324'}
        stroke={() => didactBorderColor()}
        lineWidth={2}
        radius={20}
        shadowColor={'rgba(0, 0, 0, 0.4)'}
        shadowBlur={20}
      >
        <Node x={-430} y={0}>
          <Circle size={44} fill={'#070b14'} stroke={C.bordeNodo} lineWidth={2} />
          <Txt text="⚡" fontSize={22} y={-2} />
        </Node>

        <Txt
          text={() => didactStepTitle()}
          fill={C.textoBlanco}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={21}
          fontWeight={800}
          x={-30}
          y={-16}
        />
        <Txt
          text={() => didactStepDesc()}
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
            text={() => didactBadgeNum()}
            fill={C.appCian}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={15}
            fontWeight={900}
          />
        </Rect>
      </Rect>
    </Node>
  );

  // =========================================================================
  // 4. LÍNEAS DE INTERCONEXIÓN TOPOLÓGICA (Cables de Red y Troncales)
  // =========================================================================
  const lineAppToPseAlpha = createSignal(0.3);
  const linePseToOseAlpha = createSignal(0.3);
  const lineOseToSunatAlpha = createSignal(0.2);
  const bypassSunatPulseAlpha = createSignal(0);

  // Línea 1: TU APP ➔ PSE (Horizontal superior)
  view.add(
    <Line
      points={[
        [POS.app.x + 140, POS.app.y],
        [POS.pse.x - 140, POS.pse.y],
      ]}
      stroke={C.appCian}
      lineWidth={3}
      lineDash={[8, 8]}
      opacity={() => lineAppToPseAlpha()}
    />
  );

  // Línea 2: PSE ➔ OSE (Diagonal descendente)
  view.add(
    <Line
      points={[
        [POS.pse.x - 60, POS.pse.y + 90],
        [POS.ose.x + 100, POS.ose.y - 100],
      ]}
      stroke={C.oseVerde}
      lineWidth={4}
      lineDash={[10, 8]}
      opacity={() => linePseToOseAlpha()}
    />
  );

  // Línea 3: OSE ➔ SUNAT (Vertical descendente - Sincronización Asíncrona)
  view.add(
    <Line
      points={[
        [POS.ose.x, POS.ose.y + 110],
        [POS.sunat.x, POS.sunat.y - 100],
      ]}
      stroke={C.sunatAzul}
      lineWidth={3}
      lineDash={[6, 6]}
      opacity={() => lineOseToSunatAlpha()}
    />
  );

  // Curva de Bypass: Visualización del escudo de SUNAT
  view.add(
    <Path
      data="M -160 -320 C -220 -100, -220 300, -140 480"
      stroke={C.amarilloAlerta}
      lineWidth={2}
      lineDash={[6, 6]}
      opacity={() => bypassSunatPulseAlpha()}
    />
  );

  // =========================================================================
  // 5. NODO 1: [TU APP / ERP] (Y: -400, X: -320)
  // =========================================================================
  const appScale = createSignal(1);
  const appGlow = createSignal(0);

  view.add(
    <Node x={POS.app.x} y={POS.app.y} scale={() => appScale()}>
      <Rect
        width={270}
        height={180}
        fill={C.cardFondo}
        stroke={C.appCian}
        lineWidth={2}
        radius={22}
        shadowColor={C.appCian}
        shadowBlur={() => appGlow()}
      >
        <Node y={-45}>
          <Circle size={44} fill={'#07192a'} stroke={C.appCian} lineWidth={1.5} />
          <Txt text="💻" fontSize={22} y={-2} />
        </Node>
        <Txt
          text="TU APP / ERP"
          fill={C.textoBlanco}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={19}
          fontWeight={900}
          letterSpacing={1.2}
          y={0}
        />
        <Txt
          text="REST JSON • Sin SOAP"
          fill={C.appCian}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={12}
          fontWeight={700}
          y={30}
        />
        <Rect
          y={58}
          width={220}
          height={24}
          fill={'#06111f'}
          stroke={C.bordeNodo}
          lineWidth={1}
          radius={6}
        >
          <Txt
            text="POST /v1/invoices"
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
  // 6. NODO 2: [PSE - PROVEEDOR SERVICIOS] (Y: -400, X: +320)
  // =========================================================================
  const pseScale = createSignal(1);
  const pseGlow = createSignal(0);
  const pseLockOpacity = createSignal(0);

  view.add(
    <Node x={POS.pse.x} y={POS.pse.y} scale={() => pseScale()}>
      <Rect
        width={270}
        height={180}
        fill={C.cardFondo}
        stroke={C.pseVioleta}
        lineWidth={2}
        radius={22}
        shadowColor={C.pseVioleta}
        shadowBlur={() => pseGlow()}
      >
        <Node y={-45}>
          <Circle size={44} fill={'#190b2e'} stroke={C.pseVioleta} lineWidth={1.5} />
          <Txt text="⚙️" fontSize={22} y={-2} />
        </Node>
        <Txt
          text="SERVIDOR PSE"
          fill={C.textoBlanco}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={19}
          fontWeight={900}
          letterSpacing={1.2}
          y={0}
        />
        <Txt
          text="Transformador UBL 2.1"
          fill={C.pseVioleta}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={12}
          fontWeight={700}
          y={30}
        />
        <Rect
          y={58}
          width={220}
          height={24}
          fill={'#140726'}
          stroke={C.pseVioleta}
          lineWidth={1}
          radius={6}
        >
          <Txt
            text="FIRMA CON CERT. PSE"
            fill={'#c084fc'}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={10}
            fontWeight={800}
          />
        </Rect>
      </Rect>

      {/* Badge Flotante de Certificado Digital Aplicado */}
      <Rect
        y={115}
        width={240}
        height={32}
        fill={'#2e1065'}
        stroke={C.pseVioleta}
        lineWidth={1.5}
        radius={16}
        opacity={() => pseLockOpacity()}
        shadowColor={C.pseVioleta}
        shadowBlur={15}
      >
        <Txt
          text="🔐 CERTIFICADO PSE APLICADO"
          fill={C.textoBlanco}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={11}
          fontWeight={900}
        />
      </Rect>
    </Node>
  );

  // =========================================================================
  // 7. NODO 3: [OSE - OPERADOR AUTORIZADO] (Y: +50, X: 0) - CENTRAL DESTACADO
  // =========================================================================
  const oseScale = createSignal(1);
  const oseGlow = createSignal(10);
  const oseRadarRadius = createSignal(120);
  const oseRadarOpacity = createSignal(0);
  const oseStatusMsg = createSignal('AUTORIDAD DELEGADA SUNAT');

  view.add(
    <Node x={POS.ose.x} y={POS.ose.y} scale={() => oseScale()}>
      {/* Escáner de Auditoría Radial */}
      <Circle
        size={() => oseRadarRadius()}
        stroke={C.oseVerde}
        lineWidth={3}
        opacity={() => oseRadarOpacity()}
      />

      <Rect
        width={420}
        height={210}
        fill={'#06171a'}
        stroke={C.oseVerde}
        lineWidth={3}
        radius={26}
        shadowColor={C.oseVerde}
        shadowBlur={() => oseGlow()}
      >
        {/* Badge Oficial Superior */}
        <Rect
          y={-105}
          width={320}
          height={32}
          fill={'#022c22'}
          stroke={C.oseVerde}
          lineWidth={1.5}
          radius={16}
        >
          <Txt
            text="✓ NODO OFICIAL OSE • AUDITORÍA"
            fill={C.oseVerde}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={13}
            fontWeight={900}
            letterSpacing={1.2}
          />
        </Rect>

        <Node y={-35}>
          <Circle size={54} fill={'#022c22'} stroke={C.oseVerde} lineWidth={2} />
          <Txt text="🏛️" fontSize={28} y={-2} />
        </Node>

        <Txt
          text="OPERADOR OSE (TRIBUNAL)"
          fill={C.textoBlanco}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={22}
          fontWeight={900}
          letterSpacing={1.5}
          y={15}
        />

        <Txt
          text={() => oseStatusMsg()}
          fill={C.oseVerde}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={13}
          fontWeight={800}
          letterSpacing={1}
          y={48}
        />

        <Rect
          y={78}
          width={350}
          height={26}
          fill={'#021d17'}
          stroke={C.oseVerde}
          lineWidth={1}
          radius={6}
        >
          <Txt
            text="SLA 99.99% • EMISIÓN DIRECTA DE CDR"
            fill={'#86efac'}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={11}
            fontWeight={700}
          />
        </Rect>
      </Rect>
    </Node>
  );

  // =========================================================================
  // 8. NODO 4: [SUNAT BASE CENTRAL] (Y: +500, X: 0) - EN SEGUNDO PLANO
  // =========================================================================
  const sunatScale = createSignal(1);
  const sunatGlow = createSignal(0);
  const sunatBannerText = createSignal('BASE CENTRAL SUNAT (MODO ASÍNCRONO)');

  view.add(
    <Node x={POS.sunat.x} y={POS.sunat.y} scale={() => sunatScale()}>
      <Rect
        width={380}
        height={170}
        fill={'#0a1020'}
        stroke={C.sunatAzul}
        lineWidth={2}
        radius={22}
        shadowColor={C.sunatAzul}
        shadowBlur={() => sunatGlow()}
      >
        {/* Logo Estilizado Procedural SUNAT */}
        <Node y={-45}>
          <Rect x={-18} y={0} width={8} height={20} fill={C.sunatRojo} radius={2} />
          <Rect x={-6} y={-4} width={8} height={28} fill={C.sunatAzul} radius={2} />
          <Rect x={6} y={2} width={8} height={16} fill={C.sunatAzul} radius={2} />
          <Rect x={18} y={-6} width={8} height={32} fill={'#0369a1'} radius={2} />
        </Node>

        <Txt
          text="SUNAT (DATA LAKE CENTRAL)"
          fill={C.textoBlanco}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={19}
          fontWeight={900}
          letterSpacing={1.5}
          y={-5}
        />

        <Txt
          text={() => sunatBannerText()}
          fill={C.sunatAzul}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={12}
          fontWeight={700}
          y={25}
        />

        <Rect
          y={52}
          width={320}
          height={24}
          fill={'#06111f'}
          stroke={C.bordeNodo}
          lineWidth={1}
          radius={6}
        >
          <Txt
            text="REPOSITORIO HISTÓRICO Y FISCALIZACIÓN"
            fill={C.textoMuted}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={10}
            fontWeight={600}
          />
        </Rect>
      </Rect>
    </Node>
  );

  // =========================================================================
  // 9. PAQUETE VIAJERO EN VUELO (Viaja entre los 4 nodos)
  // =========================================================================
  const pktPos = createSignal({ x: POS.app.x, y: POS.app.y });
  const pktOpacity = createSignal(0);
  const pktScale = createSignal(1);
  const pktLabel = createSignal('JSON VENTA');
  const pktSub = createSignal('1.2 KB');
  const pktBorderColor = createSignal(C.appCian);
  const pktFillColor = createSignal('#0c1f36');

  view.add(
    <Node
      x={() => pktPos().x}
      y={() => pktPos().y}
      scale={() => pktScale()}
      opacity={() => pktOpacity()}
    >
      <Rect
        width={190}
        height={65}
        fill={() => pktFillColor()}
        stroke={() => pktBorderColor()}
        lineWidth={2}
        radius={14}
        shadowColor={() => pktBorderColor()}
        shadowBlur={20}
      >
        <Txt
          text={() => pktLabel()}
          fill={C.textoBlanco}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={13}
          fontWeight={900}
          y={-10}
        />
        <Txt
          text={() => pktSub()}
          fill={() => pktBorderColor()}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={10}
          fontWeight={700}
          y={12}
        />
      </Rect>
    </Node>
  );

  // =========================================================================
  // 10. BANNER FLOTANTE DE ALERTA DE BYPASS (Aparece en Fase 2)
  // =========================================================================
  const bypassBannerY = createSignal(-160);
  const bypassBannerOpacity = createSignal(0);

  view.add(
    <Node y={() => bypassBannerY()} opacity={() => bypassBannerOpacity()}>
      <Rect
        width={680}
        height={50}
        fill={'#1c1917'}
        stroke={C.amarilloAlerta}
        lineWidth={2}
        radius={25}
        shadowColor={C.amarilloAlerta}
        shadowBlur={25}
      >
        <Txt
          text="⚡ BYPASS: SERVIDORES SUNAT LIBRES DE ESTRÉS"
          fill={C.amarilloAlerta}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={16}
          fontWeight={900}
          letterSpacing={1.2}
        />
      </Rect>
    </Node>
  );

  // =========================================================================
  // 11. PANEL INFERIOR DE TELEMETRÍA TÉCNICA (Y: +780)
  // =========================================================================
  const teleProtocol = createSignal('HTTPS REST / JSON');
  const teleFlow = createSignal('TU APP ➔ PSE (Puerto 443)');
  const teleLatency = createSignal('12ms');
  const teleAdvantage = createSignal('Cero consumo de CPU en tu backend');

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
        {/* Cabecera del Panel */}
        <Node y={-52}>
          <Rect
            x={-350}
            width={220}
            height={28}
            fill={'#0f172a'}
            stroke={C.appCian}
            lineWidth={1}
            radius={8}
          >
            <Txt
              text="ESPECIFICACIÓN CLOUD"
              fill={C.appCian}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={11}
              fontWeight={800}
              letterSpacing={1}
            />
          </Rect>

          <Txt
            text={() => teleAdvantage()}
            fill={C.oseVerde}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={13}
            fontWeight={800}
            x={100}
          />
        </Node>

        {/* 3 Cajas de Métricas */}
        <Node y={16}>
          {/* Caja 1: Protocolo */}
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
              text="PROTOCOLO / PAYLOAD"
              fill={C.textoMuted}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={10}
              fontWeight={700}
              y={-16}
            />
            <Txt
              text={() => teleProtocol()}
              fill={C.textoBlanco}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={13}
              fontWeight={800}
              y={12}
            />
          </Rect>

          {/* Caja 2: Flujo Activo */}
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
              text="RUTA DE DATOS ACTIVA"
              fill={C.textoMuted}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={10}
              fontWeight={700}
              y={-16}
            />
            <Txt
              text={() => teleFlow()}
              fill={C.pseVioleta}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={13}
              fontWeight={800}
              y={12}
            />
          </Rect>

          {/* Caja 3: Latencia Acumulada */}
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
              text="LATENCIA OPERATIVA"
              fill={C.textoMuted}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={10}
              fontWeight={700}
              y={-16}
            />
            <Txt
              text={() => teleLatency()}
              fill={C.oseVerde}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={15}
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

  // Loop de pulso verde neón para la marca
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
  // FASE 1: EL PAYLOAD LIGERO AL PSE (0s - 7s)
  // -------------------------------------------------------------------------
  // Paso 1: Tu App genera el JSON de venta
  yield* all(
    appScale(1.06, 0.6, easeOutBack),
    appGlow(20, 0.6),
    pktOpacity(1, 0.4),
    pktPos({ x: POS.app.x, y: POS.app.y }, 0.1),
    progressBarWidth(100, 3.5),
    timerText('3.5s / 33s', 3.5),
  );

  // Vuelo del JSON hacia el PSE
  yield* all(
    lineAppToPseAlpha(1.0, 0.4),
    pktPos({ x: POS.pse.x, y: POS.pse.y }, 1.8, easeInOutCubic),
    teleProtocol('HTTPS REST / JSON', 0.5),
    teleFlow('TU APP ➔ PSE (api.tu-pse.pe)', 0.5),
    teleLatency('25ms', 1.8),
  );

  // Paso 2 & 3: Transformación en el PSE a UBL 2.1 y Firma Digital
  yield* all(
    appScale(1.0, 0.4),
    appGlow(0, 0.4),
    pseScale(1.08, 0.5, easeOutBack),
    pseGlow(24, 0.5),
    pktLabel('XML UBL 2.1', 0.3),
    pktSub('OASIS Invoice-2.1', 0.3),
    pktBorderColor(C.pseVioleta, 0.3),
    pktFillColor('#240c42', 0.3),
    didactStepTitle('Fase 2: El PSE transforma y firma con su Certificado', 0.4),
    didactStepDesc('Genera el DigestValue SHA-256 y empaqueta en ZIP con nomenclatura oficial SUNAT.', 0.4),
    didactBadgeNum('P3/10', 0.4),
    didactBorderColor(C.pseVioleta, 0.4),
    pseLockOpacity(1, 0.6, easeOutBack),
    progressBarWidth(220, 3.5),
    timerText('7.0s / 33s', 3.5),
  );

  yield* all(
    pktLabel('2060...-01-F001.zip', 0.4),
    pktSub('ZIP FIRMADO', 0.4),
    teleAdvantage('Sin necesidad de custodiar llaves criptográficas en tu ERP', 0.5),
  );

  // -------------------------------------------------------------------------
  // FASE 2: ENRUTAMIENTO AL OSE (EVITANDO CUELLO DE BOTELLA) (7s - 14s)
  // -------------------------------------------------------------------------
  // Paso 4: Enrutamiento directo al OSE
  yield* all(
    didactStepTitle('Fase 3: Ruta Directa al OSE (Evitando SUNAT)', 0.5),
    didactStepDesc('El ZIP vuela hacia el Operador OSE por troncal privada de alta disponibilidad.', 0.5),
    didactBadgeNum('P4/10', 0.4),
    didactBorderColor(C.oseVerde, 0.4),
    linePseToOseAlpha(1.0, 0.4),
    pktPos({ x: POS.ose.x, y: POS.ose.y }, 2.0, easeInOutCubic),
    teleProtocol('mTLS / Troncal Dedicada OSE', 0.5),
    teleFlow('PSE ➔ OSE (sendBill)', 0.5),
    teleLatency('48ms', 2.0),
    progressBarWidth(360, 3.5),
    timerText('10.5s / 33s', 3.5),
  );

  // Paso 5: Alerta de Bypass de SUNAT
  yield* all(
    pseScale(1.0, 0.4),
    pseGlow(0, 0.4),
    oseScale(1.08, 0.5, easeOutBack),
    oseGlow(28, 0.5),
    bypassBannerOpacity(1, 0.6, easeOutBack),
    bypassBannerY(-175, 0.6, easeOutBack),
    bypassSunatPulseAlpha(0.9, 0.6),
    didactStepTitle('Fase 4: Bypass Total de Servidores SUNAT', 0.5),
    didactStepDesc('SUNAT ya no procesa comprobantes en vivo. El OSE actúa como juez fiscal inmediato.', 0.5),
    didactBadgeNum('P5/10', 0.4),
    teleAdvantage('Cero caídas en Cyber Days, Navidad o Cierre de Mes', 0.5),
    progressBarWidth(480, 3.5),
    timerText('14.0s / 33s', 3.5),
  );

  // -------------------------------------------------------------------------
  // FASE 3: VALIDACIÓN LEGAL Y FIRMA DEL CDR EN EL OSE (14s - 23s)
  // -------------------------------------------------------------------------
  // Paso 6: Escaneo y Auditoría del OSE
  yield* all(
    bypassBannerOpacity(0, 0.4),
    bypassSunatPulseAlpha(0.2, 0.4),
    oseRadarOpacity(0.8, 0.3),
    oseRadarRadius(280, 1.8, easeOutCubic),
    didactStepTitle('Fase 5: El OSE valida Reglas XSD y Padrón RUC', 0.5),
    didactStepDesc('El OSE ejecuta más de 120 validaciones tributarias en memoria RAM (< 50ms).', 0.5),
    didactBadgeNum('P6/10', 0.4),
    oseStatusMsg('VALIDANDO MATRIZ XSD...', 0.3),
    teleProtocol('Validador XSD / Padrón', 0.3),
    teleFlow('Cluster OSE en Memoria', 0.3),
    teleLatency('68ms', 1.8),
    progressBarWidth(580, 3.5),
    timerText('17.5s / 33s', 3.5),
  );

  yield* all(
    oseRadarOpacity(0, 0.4),
    oseRadarRadius(120, 0.1),
  );

  // Paso 7: El OSE genera y firma legalmente el CDR
  yield* all(
    pktLabel('CDR ACEPTADO (0)', 0.4),
    pktSub('R-2060...-01-F001.zip', 0.4),
    pktBorderColor(C.oseVerde, 0.4),
    pktFillColor('#03291e', 0.4),
    oseStatusMsg('✓ CDR EMITIDO CON FIRMA OSE', 0.4),
    didactStepTitle('Fase 6: El OSE (no SUNAT) sella el CDR Oficial', 0.5),
    didactStepDesc('¡Plena validez jurídica! El Estado delegó la firma del CDR al Operador Autorizado.', 0.5),
    didactBadgeNum('P7/10', 0.4),
    teleAdvantage('Validez tributaria instantánea conforme a Resolución SUNAT', 0.5),
    progressBarWidth(680, 3.5),
    timerText('21.0s / 33s', 3.5),
  );

  // Paso 8: Retorno disparado hacia TU APP
  yield* all(
    didactStepTitle('Fase 7: Retorno Inmediato a Tu App / POS', 0.5),
    didactStepDesc('El CDR retorna en milisegundos. Tu cliente imprime su factura con Código QR conforme.', 0.5),
    didactBadgeNum('P8/10', 0.4),
    pktPos({ x: POS.pse.x, y: POS.pse.y }, 1.0, easeInOutCubic),
    teleFlow('OSE ➔ PSE ➔ TU APP', 0.4),
    teleLatency('85ms', 1.0),
    progressBarWidth(760, 2.0),
    timerText('23.0s / 33s', 2.0),
  );

  yield* all(
    pktPos({ x: POS.app.x, y: POS.app.y }, 0.9, easeInOutCubic),
    appScale(1.08, 0.4, easeOutBack),
    appGlow(25, 0.4),
    teleLatency('98ms TOTAL', 0.9),
    progressBarWidth(810, 1.5),
    timerText('24.5s / 33s', 1.5),
  );

  // -------------------------------------------------------------------------
  // FASE 4: SINCRONIZACIÓN ASÍNCRONA CON SUNAT (23s - 33s)
  // -------------------------------------------------------------------------
  // Paso 9: Línea asíncrona OSE ➔ SUNAT en segundo plano
  yield* all(
    appScale(1.0, 0.4),
    appGlow(0, 0.4),
    lineOseToSunatAlpha(1.0, 0.5),
    didactStepTitle('Fase 8: Sincronización Asíncrona con SUNAT', 0.5),
    didactStepDesc('El OSE remite el lote a SUNAT en segundo plano. Tu negocio ya completó la venta.', 0.5),
    didactBadgeNum('P9/10', 0.4),
    didactBorderColor(C.sunatAzul, 0.4),
    pktPos({ x: POS.ose.x, y: POS.ose.y }, 0.1),
    pktLabel('BATCH ASYNC', 0.3),
    pktSub('Lote 500 CDRs', 0.3),
    pktBorderColor(C.sunatAzul, 0.3),
    pktFillColor('#061426', 0.3),
    statusSubText('REPORTE EN BACKGROUND • ALTA DISPONIBILIDAD', 0.4),
    teleProtocol('Batch Asíncrono / Queue OSE-SUNAT', 0.4),
    teleFlow('OSE ➔ Servidores SUNAT', 0.4),
    teleAdvantage('Si SUNAT está en mantenimiento, tu negocio nunca deja de operar', 0.5),
    progressBarWidth(880, 3.5),
    timerText('28.0s / 33s', 3.5),
  );

  // Paquete vuela hacia SUNAT
  yield* all(
    pktPos({ x: POS.sunat.x, y: POS.sunat.y }, 2.0, easeInOutCubic),
    sunatScale(1.08, 0.6, easeOutBack),
    sunatGlow(25, 0.6),
    sunatBannerText('LOTE ASÍNCRONO RECIBIDO CON ÉXITO', 0.5),
    progressBarWidth(920, 2.5),
    timerText('30.5s / 33s', 2.5),
  );

  // Paso 10: Resumen Final y Arquitectura Resiliente
  yield* all(
    didactStepTitle('Fase 10: Arquitectura Resiliente 24/7 Concluida', 0.5),
    didactStepDesc('Tu App, el PSE y el OSE garantizan 99.99% de operatividad fiscal sin bloqueos.', 0.5),
    didactBadgeNum('P10/10', 0.4),
    didactBorderColor(C.oseVerde, 0.4),
    appGlow(15, 0.5),
    pseGlow(15, 0.5),
    oseGlow(25, 0.5),
    sunatGlow(20, 0.5),
    pktOpacity(0, 0.4),
    teleLatency('SLA 99.99%', 0.5),
    teleAdvantage('Arquitectura desacoplada de alto rendimiento (codevo.pe)', 0.5),
    progressBarWidth(940, 2.5),
    timerText('33.0s / 33s', 2.5),
  );

  yield* waitUntil('end');
});
`;
