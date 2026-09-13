import {makeScene2D} from '@motion-canvas/2d';
import {
  all,
  chain,
  sequence,
  waitFor,
  loop,
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
 * PALETA TRIBUTARIA FINTECH & GLASSMORPHISM DARK
 */
const COLORES = {
  fondo: '#050811',
  tarjetaBg: '#0f172a',
  tarjetaBorde: '#1e293b',
  tarjetaBordeActivo: '#38bdf8',
  lineasBase: '#1e293b',
  cianNeon: '#38bdf8',      // Transmisión segura HTTPS
  verdeExito: '#10b981',     // CDR Aceptado / Certificado OK
  rojoAlerta: '#ef4444',     // Error SUNAT 2324 / Rechazo
  doradoFirma: '#f59e0b',    // Certificado Digital PKCS#7 / Llave privada
  purpuraZip: '#a855f7',     // Empaquetado Deflate ZIP SUNAT
  sunatAzul: '#0284c7',      // Azul institucional SUNAT
  sunatRojo: '#e11d48',      // Rojo carmesí SUNAT
  textoBlanco: '#f8fafc',
  textoMutado: '#64748b',
  textoClaro: '#cbd5e1',
};

export default makeScene2D(function* (view) {
  // =========================================================================
  // 1. LIENZO VERTICAL 1080x1920 & RETÍCULA TÁCTICA FINANCIERA
  // =========================================================================
  view.add(
    <Rect
      width={1080}
      height={1920}
      fill={COLORES.fondo}
    />
  );

  // Cuadrícula arquitectónica sutil de fondo
  view.add(
    <Node opacity={0.08}>
      {Array.from({length: 19}).map((_, i) => (
        <Line
          key={'gh_' + i}
          points={[[-540, -960 + i * 105], [540, -960 + i * 105]]}
          stroke={COLORES.cianNeon}
          lineWidth={1}
          lineDash={[4, 16]}
        />
      ))}
      {Array.from({length: 11}).map((_, i) => (
        <Line
          key={'gv_' + i}
          points={[[-540 + i * 108, -960], [-540 + i * 108, 960]]}
          stroke={COLORES.cianNeon}
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
  const statusText = createSignal('ESTADO: ESPERANDO EMISIÓN');
  const statusColor = createSignal(COLORES.textoMutado);
  const badgeBorder = createSignal(COLORES.tarjetaBorde);
  const badgeText = createSignal('FACTURACIÓN ELECTRÓNICA • SUNAT');
  const badgeColor = createSignal(COLORES.cianNeon);
  const stepTracker = createSignal('PASO 1 DE 10');

  view.add(
    <Node ref={headerNode} y={-860}>
      {/* Izquierda: Marca my.app con punto de estado verde neón */}
      <Circle
        x={-420}
        y={0}
        size={20}
        fill={COLORES.verdeExito}
        shadowColor={COLORES.verdeExito}
        shadowBlur={16}
      />
      <Circle
        x={-420}
        y={0}
        size={40}
        stroke={COLORES.verdeExito}
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

      {/* Derecha: Badge redondeado oficial con contador de pasos */}
      <Rect
        x={260}
        y={-14}
        width={460}
        height={50}
        radius={25}
        fill={COLORES.tarjetaBg}
        stroke={() => badgeBorder()}
        lineWidth={2}
      >
        <Txt
          text={() => badgeText()}
          fontFamily="monospace"
          fontWeight={800}
          fontSize={13}
          fill={() => badgeColor()}
          letterSpacing={1.5}
        />
      </Rect>

      {/* Subtítulo dinámico de estado */}
      <Txt
        x={260}
        y={28}
        text={() => statusText()}
        fontFamily="monospace"
        fontWeight={700}
        fontSize={13}
        fill={() => statusColor()}
        letterSpacing={2}
      />

      {/* Step counter pill */}
      <Rect
        x={-160}
        y={-14}
        width={130}
        height={34}
        radius={17}
        fill={'#0b1324'}
        stroke={COLORES.tarjetaBorde}
        lineWidth={1.5}
      >
        <Txt
          text={() => stepTracker()}
          fontFamily="monospace"
          fontWeight={800}
          fontSize={11}
          fill={COLORES.cianNeon}
          letterSpacing={1}
        />
      </Rect>
    </Node>
  );

  // Animación continua del radar en background
  yield loop(function* () {
    yield* all(
      radarPulse(1.8, 1.4, easeOutCubic),
      radarOpacity(0, 1.4, easeOutCubic),
    );
    radarPulse(1);
    radarOpacity(0.8);
    yield* waitFor(0.4);
  });

  // =========================================================================
  // 3. TÍTULOS CINEMÁTICOS PRINCIPALES (Y = -720)
  // =========================================================================
  const sceneTitle = createRef<Txt>();
  const sceneSubtitle = createRef<Txt>();

  view.add(
    <Node y={-720}>
      <Txt
        ref={sceneTitle}
        text="DE TU SISTEMA A SUNAT"
        fontFamily="monospace"
        fontWeight={900}
        fontSize={38}
        letterSpacing={3}
        fill={COLORES.textoBlanco}
        y={-22}
      />
      <Txt
        ref={sceneSubtitle}
        text="Flujo Detallado: ERP, UBL 2.1, Firma X.509, SOAP, Error 2324 y CDR"
        fontFamily="sans-serif"
        fontWeight={600}
        fontSize={20}
        fill={COLORES.textoMutado}
        y={30}
      />
    </Node>
  );

  // =========================================================================
  // 4. LOS 3 NODOS ARQUITECTÓNICOS PRINCIPALES
  // =========================================================================
  const systemCard = createRef<Rect>();
  const signingCard = createRef<Rect>();
  const sunatCard = createRef<Rect>();

  const systemGlow = createRef<Rect>();
  const sunatGlow = createRef<Rect>();
  const signingGlow = createRef<Rect>();

  // Líneas de conexión arquitectónica
  const lineSysToSign = createRef<Line>();
  const lineSignToSunat = createRef<Line>();
  const lineSunatToSys = createRef<Line>();

  // CONTENEDOR CENTRAL DEL ESQUEMA
  view.add(
    <Node y={50}>
      {/* Aristas / Ductos de Transmisión */}
      <Line
        ref={lineSysToSign}
        points={[[-320, -320], [-320, 120]]}
        stroke={COLORES.lineasBase}
        lineWidth={4}
        lineDash={[8, 8]}
        opacity={0}
      />

      <Line
        ref={lineSignToSunat}
        points={[[-320, 180], [0, 180], [280, 0]]}
        stroke={COLORES.lineasBase}
        lineWidth={4}
        lineDash={[8, 8]}
        opacity={0}
      />

      <Line
        ref={lineSunatToSys}
        points={[[280, -180], [0, -420], [-320, -420]]}
        stroke={COLORES.lineasBase}
        lineWidth={3}
        lineDash={[6, 6]}
        opacity={0}
      />

      {/* ------------------------------------------------------------- */}
      {/* NODO 1: TU SISTEMA / API (ERP / POS / E-COMMERCE)             */}
      {/* ------------------------------------------------------------- */}
      <Node x={-320} y={-380}>
        <Rect
          ref={systemGlow}
          width={380}
          height={180}
          radius={28}
          stroke={COLORES.cianNeon}
          lineWidth={2}
          opacity={0}
        />
        <Rect
          ref={systemCard}
          width={360}
          height={160}
          radius={24}
          fill={COLORES.tarjetaBg}
          stroke={COLORES.tarjetaBorde}
          lineWidth={2}
          shadowColor={'rgba(0,0,0,0.5)'}
          shadowBlur={20}
          scale={0}
        >
          <Node y={-38}>
            <Circle size={24} fill={'#1e293b'} x={-130} y={0} />
            <Txt text="APP" fontSize={9} fontWeight={900} fill={COLORES.cianNeon} fontFamily={'JetBrains Mono, monospace'} x={-130} y={1} />
            <Txt
              x={15}
              y={0}
              text="TU SISTEMA / API"
              fontFamily="monospace"
              fontWeight={900}
              fontSize={17}
              letterSpacing={1.5}
              fill={COLORES.textoBlanco}
            />
          </Node>
          <Txt
            y={2}
            text="ERP • POS • Facturador"
            fontFamily="sans-serif"
            fontWeight={600}
            fontSize={13}
            fill={COLORES.cianNeon}
          />
          <Txt
            y={36}
            text="Generador JSON & Cálculo IGV"
            fontFamily="monospace"
            fontWeight={500}
            fontSize={11}
            fill={COLORES.textoMutado}
          />
        </Rect>
      </Node>

      {/* ------------------------------------------------------------- */}
      {/* NODO 2: FIRMA DIGITAL / TRANSFORMADOR UBL 2.1                 */}
      {/* ------------------------------------------------------------- */}
      <Node x={-320} y={180}>
        <Rect
          ref={signingGlow}
          width={380}
          height={190}
          radius={28}
          stroke={COLORES.doradoFirma}
          lineWidth={2}
          opacity={0}
        />
        <Rect
          ref={signingCard}
          width={360}
          height={170}
          radius={24}
          fill={COLORES.tarjetaBg}
          stroke={COLORES.tarjetaBorde}
          lineWidth={2}
          shadowColor={'rgba(0,0,0,0.5)'}
          shadowBlur={20}
          scale={0}
        >
          <Node y={-42}>
            <Circle size={24} fill={'#271c0b'} stroke={COLORES.doradoFirma} lineWidth={1.5} x={-130} y={0} />
            <Txt text="XML" fontSize={9} fontWeight={900} fill={COLORES.doradoFirma} fontFamily={'JetBrains Mono, monospace'} x={-130} y={0} />
            <Txt
              x={15}
              y={0}
              text="FIRMA DIGITAL / UBL"
              fontFamily="monospace"
              fontWeight={900}
              fontSize={17}
              letterSpacing={1.5}
              fill={COLORES.textoBlanco}
            />
          </Node>
          <Txt
            y={0}
            text="Estándar OASIS UBL 2.1"
            fontFamily="sans-serif"
            fontWeight={600}
            fontSize={13}
            fill={COLORES.doradoFirma}
          />
          <Txt
            y={34}
            text="Certificado X.509 • SHA-256"
            fontFamily="monospace"
            fontWeight={500}
            fontSize={11}
            fill={COLORES.textoMutado}
          />
        </Rect>
      </Node>

      {/* ------------------------------------------------------------- */}
      {/* NODO 3: SERVIDORES SUNAT (LOGO PROCEDURAL ESTILIZADO)          */}
      {/* ------------------------------------------------------------- */}
      <Node x={280} y={-90}>
        <Rect
          ref={sunatGlow}
          width={400}
          height={480}
          radius={32}
          stroke={COLORES.sunatAzul}
          lineWidth={2}
          opacity={0}
        />
        <Rect
          ref={sunatCard}
          width={380}
          height={460}
          radius={28}
          fill={COLORES.tarjetaBg}
          stroke={COLORES.tarjetaBorde}
          lineWidth={2}
          shadowColor={'rgba(0,0,0,0.6)'}
          shadowBlur={25}
          scale={0}
        >
          {/* LOGO PROCEDURAL SUNAT (Bandas Azul y Rojo institucional) */}
          <Node y={-140}>
            <Rect x={-55} y={-8} width={26} height={60} radius={6} fill={COLORES.sunatRojo} />
            <Rect x={-22} y={-18} width={26} height={80} radius={6} fill={COLORES.sunatAzul} />
            <Rect x={11} y={-6} width={26} height={56} radius={6} fill={COLORES.sunatAzul} />
            <Rect x={44} y={-22} width={26} height={88} radius={6} fill={'#0369a1'} />

            <Txt
              y={56}
              text="SUNAT"
              fontFamily="monospace"
              fontWeight={900}
              fontSize={34}
              letterSpacing={6}
              fill={COLORES.textoBlanco}
            />
            <Txt
              y={86}
              text="SUPERINTENDENCIA NACIONAL"
              fontFamily="sans-serif"
              fontWeight={700}
              fontSize={10}
              letterSpacing={1.5}
              fill={COLORES.textoMutado}
            />
          </Node>

          {/* Sub-bloques internos del Validador Tributario */}
          <Node y={80}>
            <Rect
              y={-40}
              width={320}
              height={52}
              radius={14}
              fill={'#08101e'}
              stroke={'#1e293b'}
              lineWidth={1.5}
            >
              <Txt
                text="WEBSERVICE SOAP / REST"
                fontFamily="monospace"
                fontWeight={800}
                fontSize={12}
                fill={COLORES.cianNeon}
                letterSpacing={1}
              />
            </Rect>

            <Rect
              y={24}
              width={320}
              height={52}
              radius={14}
              fill={'#08101e'}
              stroke={'#1e293b'}
              lineWidth={1.5}
            >
              <Txt
                text="VALIDADOR XSD Y PADRÓN"
                fontFamily="monospace"
                fontWeight={800}
                fontSize={12}
                fill={COLORES.textoClaro}
                letterSpacing={1}
              />
            </Rect>

            <Rect
              y={88}
              width={320}
              height={52}
              radius={14}
              fill={'#08101e'}
              stroke={'#1e293b'}
              lineWidth={1.5}
            >
              <Txt
                text="GENERADOR DE CDR (ESTADO 0)"
                fontFamily="monospace"
                fontWeight={800}
                fontSize={12}
                fill={COLORES.verdeExito}
                letterSpacing={1}
              />
            </Rect>
          </Node>
        </Rect>
      </Node>
    </Node>
  );

  // =========================================================================
  // ENTRADA INICIAL DE ARQUITECTURA
  // =========================================================================
  yield* sequence(
    0.1,
    systemCard().scale(1, 0.6, easeOutBack),
    signingCard().scale(1, 0.6, easeOutBack),
    sunatCard().scale(1, 0.6, easeOutBack),
    lineSysToSign().opacity(1, 0.4),
    lineSignToSunat().opacity(1, 0.4),
  );

  // =========================================================================
  // PASO 1/10: REGISTRO ERP Y DESGLOSE TRIBUTARIO (0s - 3.5s)
  // =========================================================================
  yield* all(
    stepTracker('PASO 1 DE 10'),
    sceneTitle().text('1. REGISTRO ERP Y CÁLCULO IGV', 0.3),
    sceneSubtitle().text('Cálculo de Base Imponible S/ 127.03 + IGV 18% S/ 22.87 = Total S/ 149.90', 0.3),
    statusText('ERP: CALCULANDO OPERACIÓN GRAVADA'),
    statusColor(COLORES.cianNeon),
    badgeText('ORDEN DE VENTA EMITIDA'),
    badgeColor(COLORES.cianNeon),
    systemGlow().opacity(0.8, 0.3),
  );

  const ticketDoc = createRef<Rect>();
  const ticketTitle = createRef<Txt>();
  const ticketSub = createRef<Txt>();
  const ticketDetail = createRef<Txt>();
  const ticketScale = createSignal(0);

  view.add(
    <Rect
      ref={ticketDoc}
      x={-320}
      y={-220}
      width={250}
      height={120}
      radius={16}
      fill={'#0c192e'}
      stroke={COLORES.cianNeon}
      lineWidth={2}
      shadowColor={COLORES.cianNeon}
      shadowBlur={15}
      scale={() => ticketScale()}
    >
      <Txt
        ref={ticketTitle}
        y={-30}
        text="📄 BOLETA B001-42"
        fontFamily="monospace"
        fontWeight={900}
        fontSize={14}
        letterSpacing={1}
        fill={COLORES.textoBlanco}
      />
      <Txt
        ref={ticketSub}
        y={-2}
        text="GRAVADA: S/ 127.03 | IGV: S/ 22.87"
        fontFamily="monospace"
        fontWeight={700}
        fontSize={10}
        fill={COLORES.cianNeon}
      />
      <Txt
        ref={ticketDetail}
        y={24}
        text="TOTAL: S/ 149.90 • JSON / SQL"
        fontFamily="monospace"
        fontWeight={800}
        fontSize={11}
        fill={COLORES.textoClaro}
      />
    </Rect>
  );

  yield* ticketScale(1, 0.5, easeOutBack);
  yield* waitFor(2.0);

  // =========================================================================
  // PASO 2/10: SERIALIZACIÓN OASIS UBL 2.1 (3.5s - 7.0s)
  // =========================================================================
  yield* all(
    stepTracker('PASO 2 DE 10'),
    sceneTitle().text('2. SERIALIZACIÓN OASIS UBL 2.1', 0.3),
    sceneSubtitle().text('Estructuración del árbol XML normativo según Invoice-2.1.xsd', 0.3),
    statusText('UBL 2.1: MAPEANDO ESTRUCTURA XML'),
    statusColor(COLORES.doradoFirma),
    badgeText('ESQUEMA XSD INVOICE-2.1'),
    badgeColor(COLORES.doradoFirma),
    ticketDoc().y(-70, 0.8, easeInOutCubic),
    ticketTitle().text('📑 XML UBL 2.1', 0.3),
    ticketSub().text('<Invoice> • OASIS UBL 2.1', 0.3),
    ticketDetail().text('cac:TaxTotal / cbc:TaxAmount', 0.3),
    ticketDoc().stroke(COLORES.doradoFirma, 0.3),
    ticketDoc().shadowColor(COLORES.doradoFirma, 0.3),
  );

  yield* waitFor(2.2);

  // =========================================================================
  // PASO 3/10: FIRMA DIGITAL CON CERTIFICADO X.509 (7.0s - 10.5s)
  // =========================================================================
  const certBadge = createRef<Rect>();
  const certShockwave = createRef<Circle>();

  view.add(
    <Node x={-320} y={110}>
      <Circle
        ref={certShockwave}
        size={20}
        stroke={COLORES.doradoFirma}
        lineWidth={3}
        opacity={0}
      />
      <Rect
        ref={certBadge}
        y={60}
        width={330}
        height={36}
        radius={10}
        fill={'#2d1b03'}
        stroke={COLORES.doradoFirma}
        lineWidth={1.5}
        opacity={0}
        scale={0.6}
      >
        <Txt
          text="FIRMADO: DigestValue SHA-256"
          fontFamily="monospace"
          fontWeight={900}
          fontSize={11}
          letterSpacing={1}
          fill={COLORES.doradoFirma}
        />
      </Rect>
    </Node>
  );

  yield* all(
    stepTracker('PASO 3 DE 10'),
    sceneTitle().text('3. FIRMA DIGITAL XMLDSIG (PKCS#12)', 0.3),
    sceneSubtitle().text('Cálculo de DigestValue SHA-256 y SignatureValue con llave privada X.509', 0.3),
    statusText('CRIPTO: APLICANDO FIRMA DIGITAL'),
    statusColor(COLORES.doradoFirma),
    badgeText('CERTIFICADO DIGITAL VÁLIDO'),
    badgeColor(COLORES.doradoFirma),
    ticketDoc().y(110, 0.8, easeInOutCubic),
    signingGlow().opacity(0.8, 0.3),
  );

  yield* all(
    certShockwave().opacity(1, 0.2),
    certShockwave().size(220, 0.6, easeOutCubic),
    certShockwave().opacity(0, 0.6),
    certBadge().opacity(1, 0.3, easeOutBack),
    certBadge().scale(1, 0.3, easeOutBack),
  );

  yield* waitFor(1.8);

  // =========================================================================
  // PASO 4/10: COMPRESIÓN ZIP NOMENCLATURA SUNAT (10.5s - 13.5s)
  // =========================================================================
  yield* all(
    stepTracker('PASO 4 DE 10'),
    sceneTitle().text('4. EMPAQUETADO ZIP SUNAT', 0.3),
    sceneSubtitle().text('Regla obligatoria: [RUC]-[TIPO 03]-[SERIE B001]-[NUMERO 42].zip', 0.3),
    statusText('PACKER: EMPAQUETANDO ZIP DEFLATE'),
    statusColor(COLORES.purpuraZip),
    badgeText('NOMENCLATURA SUNAT RUC-03-B001-42'),
    badgeColor(COLORES.purpuraZip),
    certBadge().opacity(0, 0.3),
    signingGlow().opacity(0, 0.3),
    ticketDoc().width(240, 0.4),
    ticketDoc().height(76, 0.4),
    ticketDoc().fill('#141029'),
    ticketDoc().stroke(COLORES.purpuraZip, 0.4),
    ticketDoc().shadowColor(COLORES.purpuraZip, 0.4),
    ticketTitle().text('📦 PAQUETE ZIP SUNAT', 0.3),
    ticketTitle().fontSize(13, 0.3),
    ticketTitle().y(-14, 0.3),
    ticketSub().text('20601234567-03-B001-42.zip', 0.3),
    ticketSub().fontSize(10, 0.3),
    ticketSub().y(14, 0.3),
    ticketDetail().opacity(0, 0.2),
  );

  yield* waitFor(1.8);

  // =========================================================================
  // PASO 5/10: TRANSMISIÓN SOAP & CLAVE SOL (13.5s - 17.0s)
  // =========================================================================
  yield* all(
    stepTracker('PASO 5 DE 10'),
    sceneTitle().text('5. CONEXIÓN WEBSERVICE SOAP', 0.3),
    sceneSubtitle().text('Túnel seguro HTTPS TLS 1.3 con cabecera WS-Security (Clave SOL)', 0.3),
    statusText('ENVIANDO sendBill(Base64) A SUNAT...'),
    statusColor(COLORES.cianNeon),
    badgeText('AUTENTICACIÓN WS-SECURITY OK'),
    badgeColor(COLORES.cianNeon),
    lineSignToSunat().stroke(COLORES.cianNeon, 0.3),
    lineSignToSunat().lineWidth(6, 0.3),
  );

  yield* chain(
    ticketDoc().position(new Vector2(0, 220), 1.3, easeInOutSine),
    ticketDoc().position(new Vector2(280, 20), 1.3, easeInOutCubic),
  );

  yield* all(
    sunatGlow().opacity(0.8, 0.3),
    ticketDoc().scale(0, 0.3),
  );

  // =========================================================================
  // PASO 6/10: VALIDACIÓN XSD Y PADRÓN CENTRAL (17.0s - 20.5s)
  // =========================================================================
  yield* all(
    stepTracker('PASO 6 DE 10'),
    sceneTitle().text('6. VALIDACIÓN EN SUNAT', 0.3),
    sceneSubtitle().text('Descompresión, chequeo sintáctico XSD y consulta al Padrón RUC en tiempo real', 0.3),
    statusText('SUNAT: VALIDANDO PADRÓN Y CORRELATIVO'),
    statusColor('#eab308'),
    badgeText('CONSULTA AL PADRÓN CENTRAL'),
    badgeColor('#eab308'),
    sunatGlow().stroke('#eab308', 0.3),
  );

  yield* waitFor(2.2);

  // =========================================================================
  // PASO 7/10: DETECCIÓN DE ERROR Y EXCEPCIÓN 2324 (20.5s - 24.5s)
  // =========================================================================
  yield* all(
    stepTracker('PASO 7 DE 10'),
    sceneTitle().text('7. ¡COMPROBANTE RECHAZADO!', 0.3),
    sceneTitle().fill(COLORES.rojoAlerta, 0.3),
    sceneSubtitle().text('Error en Padrón: RUC receptor no activo o correlativo B001-42 ya emitido', 0.3),
    statusText('ERROR SOAP: FAULT CODE 2324'),
    statusColor(COLORES.rojoAlerta),
    badgeText('SUNAT: EXCEPCIÓN 2324'),
    badgeColor(COLORES.rojoAlerta),
    badgeBorder(COLORES.rojoAlerta),
    sunatGlow().stroke(COLORES.rojoAlerta, 0.3),
    sunatCard().stroke(COLORES.rojoAlerta, 0.3),
  );

  const errorModal = createRef<Rect>();
  view.add(
    <Rect
      ref={errorModal}
      x={60}
      y={50}
      width={740}
      height={330}
      radius={28}
      fill={'#1c080e'}
      stroke={COLORES.rojoAlerta}
      lineWidth={3}
      shadowColor={'rgba(239, 68, 68, 0.7)'}
      shadowBlur={40}
      opacity={0}
      scale={0.7}
    >
      <Node y={-100}>
        <Circle size={32} fill={COLORES.rojoAlerta} x={-270} y={0} shadowColor={COLORES.rojoAlerta} shadowBlur={14} />
        <Txt text="X" fontSize={18} fontWeight={900} fill={'#ffffff'} x={-270} y={1} />
        <Txt
          x={30}
          y={0}
          text="ERROR DE RECEPCIÓN SUNAT"
          fontFamily="monospace"
          fontWeight={900}
          fontSize={22}
          letterSpacing={2}
          fill={'#fecaca'}
        />
      </Node>

      <Txt
        y={-40}
        text="FAULT CODE: SOAP-ENV:Client.2324"
        fontFamily="monospace"
        fontWeight={800}
        fontSize={14}
        letterSpacing={1}
        fill={COLORES.rojoAlerta}
      />

      <Txt
        y={10}
        text="El RUC receptor no existe en el Padrón o el número"
        fontFamily="sans-serif"
        fontWeight={700}
        fontSize={16}
        fill={COLORES.textoBlanco}
      />
      <Txt
        y={38}
        text="de correlativo B001-42 ya fue registrado anteriormente."
        fontFamily="sans-serif"
        fontWeight={700}
        fontSize={16}
        fill={COLORES.textoBlanco}
      />

      <Rect
        y={100}
        width={540}
        height={46}
        radius={12}
        fill={'#3b0b15'}
        stroke={COLORES.rojoAlerta}
        lineWidth={1.5}
      >
        <Txt
          text="ACCIÓN: SUBSANAR RUC Y GENERAR B001-43"
          fontFamily="monospace"
          fontWeight={800}
          fontSize={12}
          letterSpacing={1}
          fill={'#fca5a5'}
        />
      </Rect>
    </Rect>
  );

  yield* all(
    errorModal().opacity(1, 0.4, easeOutBack),
    errorModal().scale(1, 0.4, easeOutBack),
  );

  yield* waitFor(2.6);

  yield* all(
    errorModal().opacity(0, 0.3),
    errorModal().scale(0.8, 0.3),
    sunatCard().stroke(COLORES.tarjetaBorde, 0.3),
    sunatGlow().opacity(0, 0.3),
  );

  // =========================================================================
  // PASO 8/10: SUBSANACIÓN Y REINTENTO B001-43 (24.5s - 27.5s)
  // =========================================================================
  yield* all(
    stepTracker('PASO 8 DE 10'),
    sceneTitle().text('8. SUBSANACIÓN Y REINTENTO ERP', 0.3),
    sceneTitle().fill(COLORES.verdeExito, 0.3),
    sceneSubtitle().text('RUC verificado en línea + Generación de nuevo comprobante B001-43', 0.3),
    statusText('ERP: REGENERANDO Y REFIRMANDO B001-43'),
    statusColor(COLORES.verdeExito),
    badgeText('SUBSANACIÓN EN CALIENTE OK'),
    badgeColor(COLORES.verdeExito),
    badgeBorder(COLORES.verdeExito),
  );

  const retryDoc = createRef<Rect>();
  view.add(
    <Rect
      ref={retryDoc}
      x={-320}
      y={-270}
      width={240}
      height={80}
      radius={18}
      fill={'#022c22'}
      stroke={COLORES.verdeExito}
      lineWidth={2.5}
      shadowColor={COLORES.verdeExito}
      shadowBlur={20}
      scale={0}
    >
      <Txt
        y={-14}
        text="📄 B001-43 (CORREGIDO)"
        fontFamily="monospace"
        fontWeight={900}
        fontSize={13}
        letterSpacing={1}
        fill={'#ffffff'}
      />
      <Txt
        y={14}
        text="RUC VÁLIDO • REFIRMADO PKCS#12"
        fontFamily="monospace"
        fontWeight={800}
        fontSize={10}
        fill={COLORES.verdeExito}
      />
    </Rect>
  );

  yield* retryDoc().scale(1, 0.4, easeOutBack);

  // Transmisión veloz a SUNAT
  yield* all(
    retryDoc().position(new Vector2(280, -30), 1.3, easeInOutCubic),
  );

  // =========================================================================
  // PASO 9/10: ESCANEO LÁSER Y APROBACIÓN CDR (27.5s - 31.0s)
  // =========================================================================
  yield* all(
    stepTracker('PASO 9 DE 10'),
    sceneTitle().text('9. ESCANEO Y APROBACIÓN SUNAT', 0.3),
    sceneSubtitle().text('Validación conforme: Emisión y sellado oficial de la Constancia de Recepción', 0.3),
    statusText('SUNAT: GENERANDO CDR (ESTADO 0)'),
    statusColor(COLORES.verdeExito),
    badgeText('CONFORMIDAD TRIBUTARIA'),
    badgeColor(COLORES.verdeExito),
  );

  const laserBeam = createRef<Line>();
  view.add(
    <Line
      ref={laserBeam}
      points={[[120, -180], [440, -180]]}
      stroke={COLORES.verdeExito}
      lineWidth={4}
      shadowColor={COLORES.verdeExito}
      shadowBlur={20}
      opacity={0}
    />
  );

  yield* all(
    retryDoc().scale(0, 0.2),
    laserBeam().opacity(1, 0.2),
  );

  yield* all(
    laserBeam().y(140, 1.0, easeInOutSine),
    sunatGlow().stroke(COLORES.verdeExito, 0.3),
    sunatGlow().opacity(0.9, 0.3),
  );

  yield* laserBeam().opacity(0, 0.2);

  // Constancia de Recepción (CDR)
  const cdrDoc = createRef<Rect>();
  const cdrDocScale = createSignal(0);

  view.add(
    <Rect
      ref={cdrDoc}
      x={280}
      y={-90}
      width={270}
      height={130}
      radius={20}
      fill={'#022c22'}
      stroke={COLORES.verdeExito}
      lineWidth={3}
      shadowColor={COLORES.verdeExito}
      shadowBlur={30}
      scale={() => cdrDocScale()}
    >
      <Circle size={28} fill={COLORES.verdeExito} y={-35} shadowColor={COLORES.verdeExito} shadowBlur={12} />
      <Txt text="OK" fontSize={11} fontWeight={900} fill={'#050811'} y={-35} />

      <Txt
        y={6}
        text="R-2060...-03-B001-43.ZIP"
        fontFamily="monospace"
        fontWeight={900}
        fontSize={11}
        letterSpacing={1}
        fill={'#86efac'}
      />
      <Txt
        y={32}
        text="RESPONSE CODE: 0 (ACEPTADO)"
        fontFamily="monospace"
        fontWeight={800}
        fontSize={11}
        fill={'#ffffff'}
      />
    </Rect>
  );

  yield* cdrDocScale(1, 0.5, easeOutBack);
  yield* waitFor(1.0);

  // =========================================================================
  // PASO 10/10: RETORNO DEL CDR, HASH Y CÓDIGO QR (31.0s - 34.0s)
  // =========================================================================
  yield* all(
    stepTracker('PASO 10 DE 10'),
    sceneTitle().text('10. RETORNO DE CDR Y VALIDEZ QR', 0.3),
    sceneSubtitle().text('Extracción del Código Hash oficial y generación de QR para impresión física', 0.3),
    statusText('CDR RECIBIDO: COMPROBANTE CON VALIDEZ FISCAL'),
    statusColor(COLORES.verdeExito),
    badgeText('VALIDEZ LEGAL Y FISCAL PLENA'),
    badgeColor(COLORES.verdeExito),
    lineSunatToSys().stroke(COLORES.verdeExito, 0.3),
    lineSunatToSys().lineWidth(5, 0.3),
  );

  yield* chain(
    cdrDoc().position(new Vector2(0, -380), 1.0, easeInOutSine),
    cdrDoc().position(new Vector2(-320, -380), 0.9, easeInOutCubic),
  );

  yield* all(
    systemGlow().stroke(COLORES.verdeExito, 0.3),
    systemGlow().opacity(1, 0.3),
    systemGlow().size([410, 200], 0.3),
    cdrDoc().scale(0.85, 0.3),
  );

  // Banner Resumen Final
  const summaryCard = createRef<Rect>();
  view.add(
    <Rect
      ref={summaryCard}
      y={660}
      width={950}
      height={210}
      radius={32}
      fill={'#061a14'}
      stroke={COLORES.verdeExito}
      lineWidth={3}
      shadowColor={'rgba(16, 185, 129, 0.35)'}
      shadowBlur={32}
      opacity={0}
      scale={0.9}
    >
      <Node y={-50}>
        <Txt
          x={-270}
          y={0}
          text="10 PASOS TRIBUTARIOS COMPLETADOS"
          fontFamily="monospace"
          fontWeight={800}
          fontSize={14}
          letterSpacing={1.5}
          fill={COLORES.verdeExito}
        />
        <Txt
          x={280}
          y={0}
          text="TIEMPO TOTAL: ~34s (60 FPS)"
          fontFamily="monospace"
          fontWeight={900}
          fontSize={14}
          fill={COLORES.cianNeon}
        />
      </Node>

      <Txt
        y={8}
        text="ERP -> UBL 2.1 -> FIRMA X.509 -> SOAP -> EXCEPCIÓN -> CDR ACEPTADO"
        fontFamily="monospace"
        fontWeight={900}
        fontSize={16}
        letterSpacing={0.5}
        fill={COLORES.textoBlanco}
      />

      <Txt
        y={50}
        text="El comprobante cuenta con Hash SHA-256, Constancia de Recepción (Estado 0) y respaldo de SUNAT."
        fontFamily="sans-serif"
        fontWeight={500}
        fontSize={15}
        fill={COLORES.textoMutado}
      />
    </Rect>
  );

  yield* all(
    summaryCard().opacity(1, 0.6, easeOutCubic),
    summaryCard().scale(1, 0.6, easeOutBack),
  );

  yield* waitFor(2.2);
});