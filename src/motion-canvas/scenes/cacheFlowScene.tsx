import {makeScene2D} from '@motion-canvas/2d';
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
  Line,
  Txt,
} from '@motion-canvas/2d';
import { COMPANY_NAME } from '../../config/appConfig';

/**
 * PALETA DE COLOR: CYBERNETIC MEMORY HIERARCHY
 */
const C = {
  fondo: '#070a12',
  panel: '#0e1726',
  borde: '#1e293b',
  cian: '#38bdf8',
  verde: '#10b981',
  ambar: '#f59e0b',
  rojo: '#f43f5e',
  purpura: '#a855f7',
  texto: '#f8fafc',
  textoMut: '#64748b',
};

export default makeScene2D(function* (view) {
  // Lienzo 1080x1920 Vertical
  view.add(<Rect width={1080} height={1920} fill={C.fondo} />);

  // =========================================================================
  // 1. HEADER LIMPIO CON MARCA codevo.pe (Y: -850)
  // =========================================================================
  const headerNode = createRef<Node>();
  const estadoTexto = createSignal('CACHE HIT • 4ms');
  const estadoColor = createSignal(C.verde);
  const dbLoadTexto = createSignal('DB CPU: 0% (DURMIENDO)');

  view.add(
    <Node ref={headerNode} y={-840}>
      <Txt
        text={COMPANY_NAME}
        fill={'#ffffff'}
        fontFamily={'JetBrains Mono, monospace'}
        fontSize={34}
        fontWeight={900}
        letterSpacing={4}
        y={-25}
      />
      <Txt
        y={30}
        text="Arquitectura de Cache: RAM vs Disco"
        fill={'#ffffff'}
        fontFamily={'Inter, sans-serif'}
        fontSize={38}
        fontWeight={800}
      />
      <Txt
        y={75}
        text="¿Por qué Redis es 20x más rápido que una Base de Datos?"
        fill={C.textoMut}
        fontFamily={'JetBrains Mono, monospace'}
        fontSize={18}
      />
    </Node>
  );

  // =========================================================================
  // 2. HUD DE TELEMETRÍA LATERAL SUPERIOR (Y: -680)
  // =========================================================================
  const hudNode = createRef<Node>();
  view.add(
    <Node ref={hudNode} y={-680}>
      <Rect
        width={920}
        height={64}
        radius={16}
        fill={C.panel}
        stroke={C.borde}
        lineWidth={1.5}
        layout
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={[0, 24]}
      >
        <Rect layout direction={'row'} alignItems={'center'} gap={10}>
          <Circle size={10} fill={() => estadoColor()} />
          <Txt
            text={() => estadoTexto()}
            fill={() => estadoColor()}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={15}
            fontWeight={800}
          />
        </Rect>
        <Txt
          text={() => dbLoadTexto()}
          fill={C.textoMut}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={14}
          fontWeight={700}
        />
      </Rect>
    </Node>
  );

  // =========================================================================
  // 3. ESTRUCTURA CENTRAL: EL CANAL VERTICAL DE VELOCIDAD
  // Capa 1: API Gateway (Y: -510)
  // Capa 2: Escudo de Memoria RAM / Redis Core (Y: -180)
  // Capa 3: Búnker de Almacenamiento en Disco / Database (Y: +360)
  // =========================================================================
  const centralNode = createRef<Node>();
  view.add(<Node ref={centralNode} />);

  // Tubería / Rayo conector vertical central
  const tuboLuz = createRef<Line>();
  centralNode().add(
    <Line
      ref={tuboLuz}
      points={[[0, -460], [0, 480]]}
      stroke={C.borde}
      lineWidth={4}
      lineDash={[12, 10]}
    />
  );

  // -------------------------------------------------------------------------
  // NIVEL 1: API GATEWAY / INGRESS (Y: -500)
  // -------------------------------------------------------------------------
  const gatewayScale = createSignal(1);
  const gatewayStroke = createSignal(C.cian);
  centralNode().add(
    <Node y={-500}>
      <Rect
        width={500}
        height={76}
        radius={20}
        fill={C.panel}
        stroke={() => gatewayStroke()}
        lineWidth={2}
        scale={() => gatewayScale()}
        layout
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={[0, 24]}
        shadowColor={'rgba(56, 189, 248, 0.2)'}
        shadowBlur={20}
      >
        <Rect layout direction={'row'} alignItems={'center'} gap={12}>
          <Circle size={32} fill={'rgba(56, 189, 248, 0.15)'} layout alignItems={'center'} justifyContent={'center'}>
            <Txt text="🌐" fontSize={16} />
          </Circle>
          <Txt
            text="API GATEWAY"
            fill={C.texto}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={17}
            fontWeight={900}
          />
        </Rect>
        <Txt
          text="HTTP GET /user/:id"
          fill={C.cian}
          fontFamily={'JetBrains Mono, monospace'}
          fontSize={13}
          fontWeight={700}
        />
      </Rect>
    </Node>
  );

  // -------------------------------------------------------------------------
  // NIVEL 2: EL ESCUDO DE MEMORIA RAM (REDIS CACHE) (Y: -160)
  // Domo de alta velocidad con celdas de memoria y anillo orbital
  // -------------------------------------------------------------------------
  const redisRingScale = createSignal(1);
  const redisRingStroke = createSignal(C.cian);
  const redisRingGlow = createSignal(C.cian);
  const redisSlot1Text = createSignal('[RAM] user:42 -> { id: 42, name: "Ana" }');
  const redisSlot2Text = createSignal('[VACIO] user:99 -> (no en cache)');

  centralNode().add(
    <Node y={-160}>
      {/* Anillo de pulso energético exterior */}
      <Circle
        size={360}
        stroke={() => redisRingStroke()}
        lineWidth={2}
        lineDash={[8, 8]}
        scale={() => redisRingScale()}
        opacity={0.6}
      />
      {/* Contenedor del Reactor de RAM */}
      <Rect
        width={780}
        height={220}
        radius={28}
        fill={C.panel}
        stroke={() => redisRingStroke()}
        lineWidth={2.5}
        shadowColor={() => redisRingGlow()}
        shadowBlur={30}
        layout
        direction={'column'}
        justifyContent={'space-between'}
        padding={[20, 28]}
      >
        {/* Cabecera del nivel */}
        <Rect layout direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Rect layout direction={'row'} alignItems={'center'} gap={12}>
            <Rect width={48} height={26} radius={8} fill={'rgba(16, 185, 129, 0.15)'} layout alignItems={'center'} justifyContent={'center'}>
              <Txt text="RAM" fontSize={11} fontWeight={900} fill={C.verde} fontFamily={'JetBrains Mono, monospace'} />
            </Rect>
            <Rect layout direction={'column'} gap={2}>
              <Txt
                text="ESCUDO DE MEMORIA (REDIS RAM)"
                fill={C.texto}
                fontFamily={'Inter, sans-serif'}
                fontSize={18}
                fontWeight={900}
              />
              <Txt
                text="Latencia casi nula • O(1) In-Memory Lookup"
                fill={C.textoMut}
                fontFamily={'JetBrains Mono, monospace'}
                fontSize={12}
              />
            </Rect>
          </Rect>

          <Rect
            height={32}
            radius={8}
            fill={'rgba(56, 189, 248, 0.12)'}
            stroke={C.cian}
            lineWidth={1}
            padding={[0, 12]}
            layout
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Txt
              text="VELOCIDAD: ~4ms"
              fill={C.cian}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={12}
              fontWeight={800}
            />
          </Rect>
        </Rect>

        {/* Celdas de memoria en vivo */}
        <Rect layout direction={'column'} gap={8}>
          <Rect
            height={38}
            radius={10}
            fill={'rgba(16, 185, 129, 0.12)'}
            stroke={'rgba(16, 185, 129, 0.3)'}
            lineWidth={1}
            padding={[0, 16]}
            layout
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Txt
              text={() => redisSlot1Text()}
              fill={C.verde}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={13}
              fontWeight={700}
            />
            <Txt
              text="CACHE HIT DISPONIBLE"
              fill={C.verde}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={10}
              fontWeight={800}
            />
          </Rect>

          <Rect
            height={38}
            radius={10}
            fill={'rgba(255, 255, 255, 0.03)'}
            stroke={C.borde}
            lineWidth={1}
            padding={[0, 16]}
            layout
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Txt
              text={() => redisSlot2Text()}
              fill={C.textoMut}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={13}
            />
            <Txt
              text="CACHE MISS POTENCIAL"
              fill={C.ambar}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={10}
              fontWeight={800}
            />
          </Rect>
        </Rect>
      </Rect>
    </Node>
  );

  // -------------------------------------------------------------------------
  // NIVEL 3: BÚNKER DE ALMACENAMIENTO PERSISTENTE (DISCO SSD / DATABASE) (Y: +300)
  // Cilindro con pistas de lectura magnética y sectores físicos
  // -------------------------------------------------------------------------
  const dbCilindroStroke = createSignal(C.borde);
  const dbDiskRotation = createSignal(0);
  const dbDiskGlow = createSignal('rgba(0,0,0,0)');
  const dbStatusText = createSignal('DISCO EN REPOSO (0 I/O OPERACIONES)');

  centralNode().add(
    <Node y={310}>
      <Rect
        width={780}
        height={240}
        radius={28}
        fill={C.panel}
        stroke={() => dbCilindroStroke()}
        lineWidth={2.5}
        shadowColor={() => dbDiskGlow()}
        shadowBlur={25}
        layout
        direction={'column'}
        justifyContent={'space-between'}
        padding={[22, 28]}
      >
        {/* Cabecera Database */}
        <Rect layout direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Rect layout direction={'row'} alignItems={'center'} gap={12}>
            <Circle size={36} fill={'rgba(245, 158, 11, 0.15)'} layout alignItems={'center'} justifyContent={'center'}>
              <Txt text="DB" fontSize={12} fontWeight={900} fill={'#f59e0b'} fontFamily={'JetBrains Mono, monospace'} />
            </Circle>
            <Rect layout direction={'column'} gap={2}>
              <Txt
                text="BÚNKER DE DATOS (POSTGRESQL EN DISCO)"
                fill={C.texto}
                fontFamily={'Inter, sans-serif'}
                fontSize={18}
                fontWeight={900}
              />
              <Txt
                text="Almacenamiento permanente en SSD • Acceso secuencial pesado"
                fill={C.textoMut}
                fontFamily={'JetBrains Mono, monospace'}
                fontSize={12}
              />
            </Rect>
          </Rect>

          <Rect
            height={32}
            radius={8}
            fill={'rgba(245, 158, 11, 0.12)'}
            stroke={C.ambar}
            lineWidth={1}
            padding={[0, 12]}
            layout
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Txt
              text="VELOCIDAD: ~85ms"
              fill={C.ambar}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={12}
              fontWeight={800}
            />
          </Rect>
        </Rect>

        {/* Representación de pistas de disco y sectores */}
        <Rect
          height={90}
          radius={16}
          fill={'rgba(7, 10, 18, 0.6)'}
          stroke={C.borde}
          lineWidth={1.5}
          layout
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-around'}
          padding={[0, 20]}
        >
          {/* Platters / Discos rotatorios */}
          <Circle
            size={58}
            stroke={C.borde}
            lineWidth={3}
            rotation={() => dbDiskRotation()}
            lineDash={[14, 6]}
            layout
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Circle size={14} fill={C.textoMut} />
          </Circle>

          <Rect layout direction={'column'} gap={4}>
            <Txt
              text={() => dbStatusText()}
              fill={C.texto}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={13}
              fontWeight={700}
            />
            <Txt
              text="I/O Seek Time + B-Tree Scan + De-serialización de bloques físicos"
              fill={C.textoMut}
              fontFamily={'JetBrains Mono, monospace'}
              fontSize={11}
            />
          </Rect>

          <Txt text="20x MÁS LENTO" fill={C.ambar} fontFamily={'JetBrains Mono, monospace'} fontSize={12} fontWeight={900} />
        </Rect>
      </Rect>
    </Node>
  );

  // -------------------------------------------------------------------------
  // PAQUETE CUÁNTICO DE DATOS (LA PARTÍCULA DE ENERGÍA)
  // -------------------------------------------------------------------------
  const packetY = createSignal(-500);
  const packetOpacity = createSignal(0);
  const packetScale = createSignal(1);
  const packetColor = createSignal(C.cian);
  const packetLabel = createSignal('GET:42');

  centralNode().add(
    <Node y={() => packetY()} opacity={() => packetOpacity()} scale={() => packetScale()} zIndex={500}>
      <Circle size={60} fill={() => packetColor()} opacity={0.25} />
      <Circle size={42} fill={() => packetColor()} shadowColor={() => packetColor()} shadowBlur={25} />
      <Txt
        text={() => packetLabel()}
        fill={'#000000'}
        fontFamily={'JetBrains Mono, monospace'}
        fontSize={12}
        fontWeight={900}
      />
    </Node>
  );

  // =========================================================================
  // 4. PANEL INFERIOR: RESUMEN COMPARATIVO Y CONCLUSIÓN (Y: +660)
  // =========================================================================
  const footerNode = createRef<Node>();
  view.add(
    <Node ref={footerNode} y={660}>
      <Rect
        width={920}
        height={170}
        radius={24}
        fill={C.panel}
        stroke={C.borde}
        lineWidth={1.5}
        layout
        direction={'column'}
        justifyContent={'space-between'}
        padding={[20, 26]}
      >
        <Rect layout direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Txt
            text="REGLA DE ORO DE LA INGENIERÍA DE SOFTWARE:"
            fill={C.texto}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={14}
            fontWeight={900}
            letterSpacing={1}
          />
          <Txt
            text="TIEMPO AHORRADO: 95.3%"
            fill={C.verde}
            fontFamily={'JetBrains Mono, monospace'}
            fontSize={13}
            fontWeight={900}
          />
        </Rect>

        <Txt
          text="1. CACHE HIT: El escudo de RAM intercepta la petición y responde en 4ms sin despertar el disco duro."
          fill={C.verde}
          fontFamily={'Inter, sans-serif'}
          fontSize={13}
          fontWeight={600}
        />
        <Txt
          text="2. CACHE MISS: La petición perfora hasta el búnker de disco (85ms) y luego 'calienta' el escudo de RAM."
          fill={C.ambar}
          fontFamily={'Inter, sans-serif'}
          fontSize={13}
          fontWeight={600}
        />
      </Rect>
    </Node>
  );

  // =========================================================================
  // 5. ANIMACIÓN PROCEDURAL COMPLETA
  // =========================================================================

  yield* all(
    headerNode().position.y(-830, 0.7, easeOutCubic),
    footerNode().position.y(650, 0.7, easeOutCubic),
  );

  // -------------------------------------------------------------------------
  // FASE 1: CACHE HIT (REBOTE EN EL ESCUDO DE RAM A 4ms)
  // -------------------------------------------------------------------------
  estadoTexto('FASE 1: CACHE HIT (GET:42) - 4ms');
  estadoColor(C.verde);
  dbLoadTexto('DB CPU: 0% (DURMIENDO)');

  // 1. Gateway dispara el paquete hacia abajo
  packetY(-500);
  packetColor(C.cian);
  packetLabel('GET:42');
  yield* all(
    packetOpacity(1, 0.2),
    gatewayScale(1.06, 0.2, easeOutBack),
  );
  yield* gatewayScale(1.0, 0.2);

  // El paquete viaja velozmente hacia el escudo de RAM
  yield* packetY(-160, 0.6, easeInOutCubic);

  // IMPACTO EN EL ESCUDO DE RAM: REBOTE CINÉTICO
  redisRingStroke(C.verde);
  redisRingGlow(C.verde);
  packetColor(C.verde);
  packetLabel('200 OK');
  yield* all(
    redisRingScale(1.15, 0.25, easeOutBack),
    packetScale(1.2, 0.2, easeOutBack),
  );

  // El paquete REBOTA inmediatamente hacia arriba al Gateway (sin tocar el disco)
  yield* all(
    redisRingScale(1.0, 0.3),
    packetScale(1.0, 0.2),
    packetY(-500, 0.5, easeInOutCubic),
  );

  yield* all(
    gatewayScale(1.06, 0.15, easeOutBack),
    packetOpacity(0, 0.2),
  );
  yield* gatewayScale(1.0, 0.15);
  redisRingStroke(C.borde);
  redisRingGlow('rgba(0,0,0,0)');

  yield* waitFor(1.2);

  // -------------------------------------------------------------------------
  // FASE 2: CACHE MISS (PERFORACIÓN AL DISCO A 85ms)
  // -------------------------------------------------------------------------
  estadoTexto('FASE 2: CACHE MISS (GET:99) - 85ms');
  estadoColor(C.ambar);

  // Petición para clave no cacheada
  packetY(-500);
  packetColor(C.cian);
  packetLabel('GET:99');
  yield* all(
    packetOpacity(1, 0.2),
    gatewayScale(1.06, 0.2, easeOutBack),
  );
  yield* gatewayScale(1.0, 0.2);

  // Viaja al escudo de RAM
  yield* packetY(-160, 0.6, easeInOutCubic);

  // RAM REPORTA MISS: El escudo se vuelve ámbar y deja pasar el paquete hacia abajo
  redisRingStroke(C.ambar);
  redisRingGlow(C.ambar);
  packetColor(C.ambar);
  yield* redisRingScale(1.08, 0.2, easeOutBack);
  yield* redisRingScale(1.0, 0.2);

  // El paquete atraviesa y viaja hasta el fondo del BÚNKER DE DISCO
  dbLoadTexto('DB CPU: 98% (LEYENDO DISCO SSD)');
  dbCilindroStroke(C.ambar);
  dbDiskGlow(C.ambar);
  yield* all(
    packetY(310, 0.9, easeInOutCubic),
    dbDiskRotation(720, 1.2, easeInOutCubic),
  );

  dbStatusText('ESCANEANDO ÍNDICES Y BLOQUES DE DISCO (85ms)');
  yield* waitFor(0.4);

  // El búnker sintetiza el dato y lo envía hacia arriba para "calentar" Redis
  packetLabel('SETEX:99');
  packetColor(C.verde);
  dbStatusText('DATO ENCONTRADO EN DISCO • HIDRATANDO RAM');
  yield* packetY(-160, 0.7, easeInOutCubic);

  // Redis absorbe el nuevo dato en memoria
  redisSlot2Text('[RAM] user:99 -> { id: 99, name: "Carlos" } [TTL]');
  redisRingStroke(C.verde);
  redisRingGlow(C.verde);
  yield* redisRingScale(1.12, 0.25, easeOutBack);
  yield* redisRingScale(1.0, 0.2);

  // Entrega final al Gateway
  packetLabel('200 OK');
  yield* packetY(-500, 0.6, easeInOutCubic);

  yield* all(
    gatewayScale(1.06, 0.15, easeOutBack),
    packetOpacity(0, 0.2),
  );
  yield* gatewayScale(1.0, 0.15);

  dbStatusText('DISCO EN REPOSO (ESPERANDO PRÓXIMAS CONSULTAS)');
  dbLoadTexto('DB CPU: 0% (DURMIENDO)');
  dbCilindroStroke(C.borde);
  dbDiskGlow('rgba(0,0,0,0)');
  redisRingStroke(C.borde);
  redisRingGlow('rgba(0,0,0,0)');

  yield* waitFor(2.5);
});