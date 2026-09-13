import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { generateBfsTimeline } from '../data/bfsAlgorithm';
import { generateEventLoopTimeline } from '../data/eventLoopAlgorithm';
import { generateCacheFlowTimeline } from '../data/cacheFlowAlgorithm';
import { generateEmbeddingTimeline } from '../data/embeddingAlgorithm';
import { generateMapsTimeline, MAPS_CODE_LINES } from '../data/mapsAlgorithm';
import { generateFraudTimeline, FRAUD_CODE_LINES } from '../data/fraudDetectionAlgorithm';
import { generateFacturacionTimeline, FACTURACION_CODE_LINES } from '../data/facturacionSunatAlgorithm';
import { generatePseOseTimeline, PSE_OSE_CODE_LINES } from '../data/pseOseAlgorithm';
import { generateError2119Timeline, ERROR_2119_CODE_LINES } from '../data/error2119Algorithm';
import { VerticalVideoViewport } from './VerticalVideoViewport';
import { EventLoopVerticalViewport } from './EventLoopVerticalViewport';
import { CacheFlowVerticalViewport } from './CacheFlowVerticalViewport';
import { EmbeddingVerticalViewport } from './EmbeddingVerticalViewport';
import { MapsVerticalViewport } from './MapsVerticalViewport';
import { FraudVerticalViewport } from './FraudVerticalViewport';
import { FacturacionVerticalViewport } from './FacturacionVerticalViewport';
import { PseOseVerticalViewport } from './PseOseVerticalViewport';
import { Error2119VerticalViewport } from './Error2119VerticalViewport';
import { TimelineControls } from './TimelineControls';
import { MotionCanvasCodeViewer } from './MotionCanvasCodeViewer';
import { StepEventList, GenericStepItem } from './StepEventList';
import { PythonCodeBlock } from './PythonCodeBlock';
import { JavaScriptCodeBlock } from './JavaScriptCodeBlock';
import { playStepSound } from '../utils/audioSynth';
import { startVideoRecording, RecorderController } from '../utils/videoRecorder';
import { SceneId, getSceneById } from '../data/scenesRegistry';
import { Play, Pause, Square, Maximize2, Minimize2 } from 'lucide-react';
import { COMPANY_NAME } from '../config/appConfig';

export interface LayoutContextType {
  activeTab: 'youtube' | 'mobile' | 'code' | 'split' | 'preview';
  setActiveTab: (tab: 'youtube' | 'mobile' | 'code' | 'split' | 'preview') => void;
  hideHeader: boolean;
  setHideHeader: (hide: boolean) => void;
  toggleFullscreen: () => void;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean | ((prev: boolean) => boolean)) => void;
  sidebarCompact?: boolean;
  setSidebarCompact?: (compact: boolean | ((prev: boolean) => boolean)) => void;
  sidebarCollapsed?: boolean;
}

interface ScenePlayerViewProps {
  sceneId: SceneId;
}

export function ScenePlayerView({ sceneId }: ScenePlayerViewProps) {
  const navigate = useNavigate();
  const outletContext = useOutletContext<LayoutContextType | undefined>();
  const activeTab = outletContext?.activeTab ?? 'split';
  const hideHeader = outletContext?.hideHeader ?? false;
  const sidebarOpen = outletContext?.sidebarOpen ?? false;
  const sidebarCompact = outletContext?.sidebarCompact ?? false;

  const sceneMeta = getSceneById(sceneId);

  // Timelines
  const error2119Timeline = useMemo(() => generateError2119Timeline(), []);
  const pseOseTimeline = useMemo(() => generatePseOseTimeline(), []);
  const facturacionTimeline = useMemo(() => generateFacturacionTimeline(), []);
  const fraudTimeline = useMemo(() => generateFraudTimeline(), []);
  const mapsTimeline = useMemo(() => generateMapsTimeline(), []);
  const embeddingTimeline = useMemo(() => generateEmbeddingTimeline(), []);
  const cacheFlowTimeline = useMemo(() => generateCacheFlowTimeline(), []);
  const eventLoopTimeline = useMemo(() => generateEventLoopTimeline(), []);
  const bfsTimeline = useMemo(() => generateBfsTimeline(), []);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Video recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recorderRef = useRef<RecorderController | null>(null);
  const recordTimerRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Floating Card Controls State (Se colapsa automáticamente a botón circular fijo en bottom-right al iniciar grabación)
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);

  // Reset playback whenever sceneId changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setIsControlsCollapsed(false);
    if (isRecording && recorderRef.current) {
      recorderRef.current.stop();
    }
  }, [sceneId]);

  // Active dataset
  const activeTimeline = useMemo(() => {
    switch (sceneId) {
      case 'error_2119':
        return error2119Timeline;
      case 'pse_ose':
        return pseOseTimeline;
      case 'facturacion':
        return facturacionTimeline;
      case 'fraud':
        return fraudTimeline;
      case 'maps':
        return mapsTimeline;
      case 'embedding':
        return embeddingTimeline;
      case 'cacheflow':
        return cacheFlowTimeline;
      case 'eventloop':
        return eventLoopTimeline;
      case 'bfs':
      default:
        return bfsTimeline;
    }
  }, [
    sceneId,
    error2119Timeline,
    pseOseTimeline,
    facturacionTimeline,
    fraudTimeline,
    mapsTimeline,
    embeddingTimeline,
    cacheFlowTimeline,
    eventLoopTimeline,
    bfsTimeline,
  ]);

  const currentStep = activeTimeline[currentStepIndex] || activeTimeline[0];

  // Toggle Video Recording
  const handleToggleRecord = async () => {
    if (isRecording) {
      if (recorderRef.current) {
        recorderRef.current.stop();
      }
      setIsRecording(false);
      if (recordTimerRef.current) {
        clearInterval(recordTimerRef.current);
        recordTimerRef.current = null;
      }
      return;
    }

    const brandSlug = COMPANY_NAME.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const sceneName = `${brandSlug}_${sceneId}`;
    const controller = await startVideoRecording({
      filename: sceneName,
      onStart: () => {
        setIsRecording(true);
        setIsControlsCollapsed(true); // Se colapsa automáticamente al iniciar grabación
        setRecordingDuration(0);
        setCurrentStepIndex(0);
        setIsPlaying(true);
        recordTimerRef.current = setInterval(() => {
          setRecordingDuration((prev) => prev + 1);
        }, 1000);
      },
      onStop: () => {
        setIsRecording(false);
        setIsControlsCollapsed(false);
        if (recordTimerRef.current) {
          clearInterval(recordTimerRef.current);
          recordTimerRef.current = null;
        }
      },
      onError: (err) => {
        console.error('Error starting video recording:', err);
        setIsRecording(false);
        setIsControlsCollapsed(false);
        if (recordTimerRef.current) {
          clearInterval(recordTimerRef.current);
          recordTimerRef.current = null;
        }
      },
    });

    if (controller) {
      recorderRef.current = controller;
    }
  };

  // Convert timeline to generic step items for the step list
  const genericStepItems: GenericStepItem[] = useMemo(() => {
    if (sceneId === 'error_2119') {
      return error2119Timeline.map((item) => ({
        activeLine: item.stepIndex + 1,
        description: item.description,
        badge: `${item.timeSec.toFixed(1)}s`,
        subInfo: `${item.phaseLabel} • ${item.statusText}`,
      }));
    } else if (sceneId === 'pse_ose') {
      return pseOseTimeline.map((item) => ({
        activeLine: item.stepIndex + 1,
        description: item.description,
        badge: `${item.timeSec.toFixed(1)}s`,
        subInfo: `${item.phaseLabel} • ${item.statusText}`,
      }));
    } else if (sceneId === 'facturacion') {
      return facturacionTimeline.map((item) => ({
        activeLine: item.stepIndex + 1,
        description: item.description,
        badge: `${item.timeSec.toFixed(1)}s`,
        subInfo: `${item.phaseLabel} • ${item.statusText}`,
      }));
    } else if (sceneId === 'fraud') {
      return fraudTimeline.map((item) => ({
        activeLine: item.stepIndex + 1,
        description: item.description,
        badge: `${item.timeSec.toFixed(1)}s`,
        subInfo: `${item.phaseLabel} • ${item.latencyText}`,
      }));
    } else if (sceneId === 'maps') {
      return mapsTimeline.map((item) => ({
        activeLine: item.stepIndex + 1,
        description: item.description,
        badge: `${item.timeSec.toFixed(1)}s`,
        subInfo: `${item.phaseLabel} • ${item.stepTitle}`,
      }));
    } else if (sceneId === 'embedding') {
      return embeddingTimeline.map((item) => ({
        activeLine: item.stepIndex + 1,
        description: item.description,
        badge: `${item.timeSec.toFixed(1)}s`,
        subInfo: `${item.phaseLabel} • ${item.stepTitle}`,
      }));
    } else if (sceneId === 'cacheflow') {
      return cacheFlowTimeline.map((item) => ({
        activeLine: item.activeLine,
        description: item.description,
        badge: item.latencyText,
        subInfo: `${item.statusText} • Paquete: ${item.packetLabel}`,
      }));
    } else if (sceneId === 'eventloop') {
      return eventLoopTimeline.map((item) => ({
        activeLine: item.activeLine,
        description: item.description,
        badge: item.stepNumberText.split(' ')[1] || `P${item.stepIndex + 1}`,
        subInfo: `Stack: ${item.callStack.length > 0 ? item.callStack[0] : 'vacío'} • Micro: ${
          item.microtasks.length
        } • Macro: ${item.macrotasks.length}`,
      }));
    } else {
      return bfsTimeline.map((item) => ({
        activeLine: item.activeLine,
        description: item.description,
        badge: `L${item.activeLine}`,
        subInfo: `${item.currentNode ? `curr: (${item.currentNode.r}, ${item.currentNode.c}) • ` : ''}cola: ${
          item.queue.length
        } nodos`,
      }));
    }
  }, [
    sceneId,
    error2119Timeline,
    pseOseTimeline,
    facturacionTimeline,
    fraudTimeline,
    mapsTimeline,
    embeddingTimeline,
    cacheFlowTimeline,
    eventLoopTimeline,
    bfsTimeline,
  ]);

  // Audio effects when step changes
  useEffect(() => {
    if (!soundEnabled) return;
    const desc = currentStep?.description || '';
    if (
      desc.includes('¡Condición cumplida') ||
      desc.includes('FINALIZADO') ||
      desc.includes('completado') ||
      desc.includes('ganadora') ||
      desc.includes('óptima') ||
      desc.includes('FUGAS') ||
      desc.includes('seguridad')
    ) {
      playStepSound('target');
    } else if (
      desc.includes('pop') ||
      desc.includes('DRENANDO') ||
      desc.includes('desapila') ||
      desc.includes('descarte') ||
      desc.includes('colapsa') ||
      desc.includes('Alerta') ||
      desc.includes('RIESGO')
    ) {
      playStepSound('pop');
    } else if (
      desc.includes('append') ||
      desc.includes('Encolar') ||
      desc.includes('ENCOLANDO') ||
      desc.includes('radar') ||
      desc.includes('Dispersión') ||
      desc.includes('bucle')
    ) {
      playStepSound('enqueue');
    } else {
      playStepSound('visit');
    }
  }, [currentStepIndex, soundEnabled, currentStep]);

  // Auto playback loop
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!isPlaying) return;

    if (currentStepIndex >= activeTimeline.length - 1) {
      setIsPlaying(false);
      if (isRecording && recorderRef.current) {
        const finalTimeout = setTimeout(() => {
          if (recorderRef.current && isRecording) {
            recorderRef.current.stop();
          }
        }, 1500);
        return () => clearTimeout(finalTimeout);
      }
      return;
    }

    const stepDuration =
      (currentStep as any)?.stepDurationMs ||
      (sceneId === 'fraud'
        ? 8000
        : sceneId === 'maps'
        ? 3500
        : sceneId === 'embedding'
        ? 3200
        : sceneId === 'eventloop'
        ? 1200
        : 800);
    const baseDuration = stepDuration / playbackSpeed;

    timerRef.current = setTimeout(() => {
      setCurrentStepIndex((prev) => {
        if (prev < activeTimeline.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, baseDuration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, activeTimeline.length, playbackSpeed, sceneId, currentStep, isRecording]);

  // Calculate current & total time in seconds
  const { currentCalculatedTime, totalCalculatedTime } = useMemo(() => {
    let totalMs = 0;
    let currentMs = 0;

    for (let i = 0; i < activeTimeline.length; i++) {
      const item = activeTimeline[i] as any;
      const dur =
        item?.stepDurationMs ||
        (sceneId === 'fraud'
          ? 8000
          : sceneId === 'maps'
          ? 3500
          : sceneId === 'embedding'
          ? 3200
          : sceneId === 'eventloop'
          ? 1200
          : 800);

      totalMs += dur;
      if (i < currentStepIndex) {
        currentMs += dur;
      }
    }

    return {
      currentCalculatedTime: currentMs / 1000,
      totalCalculatedTime: totalMs / 1000,
    };
  }, [activeTimeline, currentStepIndex, sceneId]);

  const isYouTubeMode = activeTab === 'youtube' || activeTab === 'split';
  const isMobileMode = activeTab === 'mobile' || activeTab === 'preview';

  return (
    <div className="flex-1 flex flex-col w-full pb-28 relative">
      {/* VIEW MODE: CODE ONLY */}
      {activeTab === 'code' && (
        <div className="flex-1 min-h-[640px]">
          <MotionCanvasCodeViewer
            currentScene={sceneId}
            onSceneSelect={(newScene) => {
              const target = getSceneById(newScene);
              if (target) navigate(target.path);
            }}
          />
        </div>
      )}

      {/* VIEW MODE: YOUTUBE (SPLIT) O MÓVIL (PREVIEW) */}
      {activeTab !== 'code' && (
        <div
          className={`grid gap-5 items-start ${
            isMobileMode
              ? 'grid-cols-1 max-w-xl mx-auto w-full justify-items-center'
              : 'grid-cols-1 lg:grid-cols-12'
          }`}
        >
          {/* Left Column: 9:16 Vertical Video Viewport */}
          <div
            className={`flex flex-col items-center gap-4 ${
              isMobileMode ? 'w-full' : 'lg:col-span-5 xl:col-span-4'
            }`}
          >
            <div className="w-full flex items-center justify-between text-xs text-[#565f89] px-2 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                <span>CANVAS PREVIEW (1080x1920 • 60 FPS)</span>
              </span>
              <span className="text-[10px] bg-[#16161e] px-2 py-0.5 rounded border border-[#414868]/40 uppercase tracking-wider font-semibold text-slate-300">
                {sceneMeta?.shortTitle || sceneId}
              </span>
            </div>

            {/* Viewport Selection */}
            {sceneId === 'error_2119' ? (
              <Error2119VerticalViewport
                snapshot={error2119Timeline[currentStepIndex] || error2119Timeline[0]}
              />
            ) : sceneId === 'pse_ose' ? (
              <PseOseVerticalViewport
                snapshot={pseOseTimeline[currentStepIndex] || pseOseTimeline[0]}
              />
            ) : sceneId === 'facturacion' ? (
              <FacturacionVerticalViewport
                snapshot={facturacionTimeline[currentStepIndex] || facturacionTimeline[0]}
              />
            ) : sceneId === 'fraud' ? (
              <FraudVerticalViewport
                snapshot={fraudTimeline[currentStepIndex] || fraudTimeline[0]}
              />
            ) : sceneId === 'maps' ? (
              <MapsVerticalViewport
                snapshot={mapsTimeline[currentStepIndex] || mapsTimeline[0]}
              />
            ) : sceneId === 'embedding' ? (
              <EmbeddingVerticalViewport
                snapshot={embeddingTimeline[currentStepIndex] || embeddingTimeline[0]}
              />
            ) : sceneId === 'cacheflow' ? (
              <CacheFlowVerticalViewport
                snapshot={cacheFlowTimeline[currentStepIndex] || cacheFlowTimeline[0]}
              />
            ) : sceneId === 'eventloop' ? (
              <EventLoopVerticalViewport
                snapshot={eventLoopTimeline[currentStepIndex] || eventLoopTimeline[0]}
              />
            ) : (
              <VerticalVideoViewport
                snapshot={bfsTimeline[currentStepIndex] || bfsTimeline[0]}
              />
            )}
          </div>

          {/* Right Column: Code & Event Logs (Solo en Modo YouTube) */}
          {isYouTubeMode && (
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4 h-full">
              {/* Event Step Sequence Log */}
              <div className="h-56">
                <StepEventList
                  title={`${sceneMeta?.shortTitle || 'Simulación'} Telemetry`}
                  steps={genericStepItems}
                  currentStepIndex={currentStepIndex}
                  onSelectStep={(idx) => {
                    setIsPlaying(false);
                    setCurrentStepIndex(idx);
                  }}
                />
              </div>

              {/* Algorithmic Pseudocode Block */}
              <div className="flex-1 min-h-[360px]">
                {sceneId === 'error_2119' ? (
                  <PythonCodeBlock
                    activeLine={currentStep.stepIndex + 1}
                    customLines={ERROR_2119_CODE_LINES}
                    title="error_2119_igv_diagnostic.py"
                  />
                ) : sceneId === 'pse_ose' ? (
                  <PythonCodeBlock
                    activeLine={currentStep.stepIndex + 1}
                    customLines={PSE_OSE_CODE_LINES}
                    title="pse_ose_cloud_architecture.py"
                  />
                ) : sceneId === 'facturacion' ? (
                  <PythonCodeBlock
                    activeLine={currentStep.stepIndex + 1}
                    customLines={FACTURACION_CODE_LINES}
                    title="facturacion_sunat_pipeline.py"
                  />
                ) : sceneId === 'fraud' ? (
                  <PythonCodeBlock
                    activeLine={currentStep.stepIndex + 1}
                    customLines={FRAUD_CODE_LINES}
                    title="cycle_fraud_detector.py"
                  />
                ) : sceneId === 'maps' ? (
                  <PythonCodeBlock
                    activeLine={currentStep.stepIndex + 1}
                    customLines={MAPS_CODE_LINES}
                    title="google_maps_astar_engine.py"
                  />
                ) : sceneId === 'embedding' ? (
                  <PythonCodeBlock
                    activeLine={currentStep.stepIndex + 1}
                    customLines={[
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
                    ]}
                    title="vector_embeddings_algebra.py"
                  />
                ) : sceneId === 'cacheflow' ? (
                  <JavaScriptCodeBlock
                    activeLine={currentStep.activeLine}
                    title="cache_gateway.ts"
                  />
                ) : sceneId === 'eventloop' ? (
                  <JavaScriptCodeBlock
                    activeLine={currentStep.activeLine}
                    title="concurrency_event_loop.js"
                  />
                ) : (
                  <PythonCodeBlock
                    activeLine={currentStep.activeLine}
                    title="bfs_matrix_solver.py"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* CARD FLOTANTE DE GRABACIÓN / REPRODUCCIÓN                                */}
      {/* ========================================================================= */}

      {/* ========================================================================= */}
      {/* BARRA INFERIOR DE REPRODUCCIÓN & GRABACIÓN (ANCHO COMPLETO, 1 FILA)       */}
      {/* ========================================================================= */}

      {/* ESTADO COLAPSADO: Botón circular fijo en la esquina inferior derecha (bottom-right) */}
      {isControlsCollapsed ? (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-200">
          {/* Badge de tiempo de grabación */}
          {isRecording && (
            <div className="bg-[#111827]/95 backdrop-blur-md border border-red-500/80 px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-2 font-mono text-xs text-red-400">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span className="font-bold tracking-wider">REC</span>
              <span className="text-white font-bold">
                {Math.floor(recordingDuration / 60).toString().padStart(2, '0')}:
                {(recordingDuration % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}

          {/* Botón Circular Fijo en Bottom-Right */}
          <div className="relative group">
            <button
              onClick={() => {
                if (isRecording) {
                  handleToggleRecord();
                } else {
                  setIsPlaying((p) => !p);
                }
              }}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 ${
                isRecording
                  ? 'bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-red-600/50 ring-4 ring-red-500/40 animate-pulse'
                  : isPlaying
                  ? 'bg-gradient-to-tr from-[#38bdf8] to-[#0284c7] text-[#0a0e17] shadow-[#38bdf8]/30 ring-2 ring-[#38bdf8]/50'
                  : 'bg-[#1e293b] hover:bg-[#334155] text-white border border-[#475569] shadow-xl'
              }`}
              title={
                isRecording
                  ? 'Detener grabación (Click para detener)'
                  : isPlaying
                  ? 'Pausar (Click para pausar)'
                  : 'Reproducir (Click para reproducir)'
              }
            >
              {isRecording ? (
                <Square className="w-5 h-5 fill-current" />
              ) : isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>

            {/* Botón secundario para reabrir la barra completa */}
            <button
              onClick={() => setIsControlsCollapsed(false)}
              className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-[#0f172a] hover:bg-[#1e293b] border border-[#475569] text-[#94a3b8] hover:text-white flex items-center justify-center shadow-md transition-all text-xs"
              title="Abrir barra completa de controles"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      ) : (
        /* ESTADO ACTIVO: Barra horizontal que se adapta fluidamente al menú lateral */
        <div
          id="docked-timeline-container"
          className={`fixed bottom-0 right-0 z-40 bg-[#0c101d]/95 backdrop-blur-xl border-t shadow-2xl transition-all duration-300 ease-in-out ${
            hideHeader || !sidebarOpen
              ? 'left-0'
              : sidebarCompact
              ? 'left-16 sm:left-20'
              : 'left-72 sm:left-80'
          } ${
            isRecording
              ? 'border-red-500/80 shadow-red-950/40 ring-1 ring-red-500/30'
              : 'border-[#1e293b] sm:border-[#38bdf8]/30 shadow-black/80'
          }`}
        >
          <div className="w-full max-w-[1800px] mx-auto px-3 sm:px-5 py-2">
            <TimelineControls
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying((p) => !p)}
              onReset={() => {
                setIsPlaying(false);
                setCurrentStepIndex(0);
              }}
              onPrevStep={() => {
                setIsPlaying(false);
                setCurrentStepIndex((p) => Math.max(0, p - 1));
              }}
              onNextStep={() => {
                setIsPlaying(false);
                setCurrentStepIndex((p) => Math.min(activeTimeline.length - 1, p + 1));
              }}
              currentStepIndex={currentStepIndex}
              totalSteps={activeTimeline.length}
              currentTime={currentCalculatedTime}
              totalTime={totalCalculatedTime}
              onSeek={(idx) => {
                setIsPlaying(false);
                setCurrentStepIndex(idx);
              }}
              playbackSpeed={playbackSpeed}
              onSpeedChange={setPlaybackSpeed}
              soundEnabled={soundEnabled}
              onToggleSound={() => setSoundEnabled((s) => !s)}
              isRecording={isRecording}
              onToggleRecord={handleToggleRecord}
              recordingDuration={recordingDuration}
              onCollapse={() => setIsControlsCollapsed(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
