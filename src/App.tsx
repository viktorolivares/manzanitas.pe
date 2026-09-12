import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  Cpu,
  Network,
  Database,
  Navigation,
  ShieldAlert,
  Cloud,
  AlertTriangle,
} from 'lucide-react';
import { generateBfsTimeline } from './data/bfsAlgorithm';
import { generateEventLoopTimeline } from './data/eventLoopAlgorithm';
import { generateCacheFlowTimeline } from './data/cacheFlowAlgorithm';
import { generateEmbeddingTimeline } from './data/embeddingAlgorithm';
import { generateMapsTimeline, MAPS_CODE_LINES } from './data/mapsAlgorithm';
import { generateFraudTimeline, FRAUD_CODE_LINES } from './data/fraudDetectionAlgorithm';
import { generateFacturacionTimeline, FACTURACION_CODE_LINES } from './data/facturacionSunatAlgorithm';
import { generatePseOseTimeline, PSE_OSE_CODE_LINES } from './data/pseOseAlgorithm';
import { generateError2119Timeline, ERROR_2119_CODE_LINES } from './data/error2119Algorithm';
import { VerticalVideoViewport } from './components/VerticalVideoViewport';
import { EventLoopVerticalViewport } from './components/EventLoopVerticalViewport';
import { CacheFlowVerticalViewport } from './components/CacheFlowVerticalViewport';
import { EmbeddingVerticalViewport } from './components/EmbeddingVerticalViewport';
import { MapsVerticalViewport } from './components/MapsVerticalViewport';
import { FraudVerticalViewport } from './components/FraudVerticalViewport';
import { FacturacionVerticalViewport } from './components/FacturacionVerticalViewport';
import { PseOseVerticalViewport } from './components/PseOseVerticalViewport';
import { Error2119VerticalViewport } from './components/Error2119VerticalViewport';
import { TimelineControls } from './components/TimelineControls';
import { MotionCanvasCodeViewer } from './components/MotionCanvasCodeViewer';
import { StepEventList, GenericStepItem } from './components/StepEventList';
import { PythonCodeBlock } from './components/PythonCodeBlock';
import { JavaScriptCodeBlock } from './components/JavaScriptCodeBlock';
import { playStepSound } from './utils/audioSynth';

export default function App() {
  const [selectedScene, setSelectedScene] = useState<'error_2119' | 'pse_ose' | 'facturacion' | 'fraud' | 'maps' | 'embedding' | 'cacheflow' | 'eventloop' | 'bfs'>('error_2119');

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
  const [activeTab, setActiveTab] = useState<'split' | 'preview' | 'code'>('split');
  const [isMaximized, setIsMaximized] = useState(false);

  // Active dataset
  const activeTimeline =
    selectedScene === 'error_2119'
      ? error2119Timeline
      : selectedScene === 'pse_ose'
      ? pseOseTimeline
      : selectedScene === 'facturacion'
      ? facturacionTimeline
      : selectedScene === 'fraud'
      ? fraudTimeline
      : selectedScene === 'maps'
      ? mapsTimeline
      : selectedScene === 'embedding'
      ? embeddingTimeline
      : selectedScene === 'cacheflow'
      ? cacheFlowTimeline
      : selectedScene === 'eventloop'
      ? eventLoopTimeline
      : bfsTimeline;
  const currentStep = activeTimeline[currentStepIndex] || activeTimeline[0];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset step index when switching scene
  const handleSceneChange = (scene: 'error_2119' | 'pse_ose' | 'facturacion' | 'fraud' | 'maps' | 'embedding' | 'cacheflow' | 'eventloop' | 'bfs') => {
    setIsPlaying(false);
    setSelectedScene(scene);
    setCurrentStepIndex(0);
  };

  // Convert timeline to generic step items for the step list
  const genericStepItems: GenericStepItem[] = useMemo(() => {
    if (selectedScene === 'error_2119') {
      return error2119Timeline.map((item) => ({
        activeLine: item.stepIndex + 1,
        description: item.description,
        badge: `${item.timeSec.toFixed(1)}s`,
        subInfo: `${item.phaseLabel} • ${item.statusText}`,
      }));
    } else if (selectedScene === 'pse_ose') {
      return pseOseTimeline.map((item) => ({
        activeLine: item.stepIndex + 1,
        description: item.description,
        badge: `${item.timeSec.toFixed(1)}s`,
        subInfo: `${item.phaseLabel} • ${item.statusText}`,
      }));
    } else if (selectedScene === 'facturacion') {
      return facturacionTimeline.map((item) => ({
        activeLine: item.stepIndex + 1,
        description: item.description,
        badge: `${item.timeSec.toFixed(1)}s`,
        subInfo: `${item.phaseLabel} • ${item.statusText}`,
      }));
    } else if (selectedScene === 'fraud') {
      return fraudTimeline.map((item) => ({
        activeLine: item.stepIndex + 1,
        description: item.description,
        badge: `${item.timeSec.toFixed(1)}s`,
        subInfo: `${item.phaseLabel} • ${item.latencyText}`,
      }));
    } else if (selectedScene === 'maps') {
      return mapsTimeline.map((item) => ({
        activeLine: item.stepIndex + 1,
        description: item.description,
        badge: `${item.timeSec.toFixed(1)}s`,
        subInfo: `${item.phaseLabel} • ${item.stepTitle}`,
      }));
    } else if (selectedScene === 'embedding') {
      return embeddingTimeline.map((item) => ({
        activeLine: item.stepIndex + 1,
        description: item.description,
        badge: `${item.timeSec.toFixed(1)}s`,
        subInfo: `${item.phaseLabel} • ${item.stepTitle}`,
      }));
    } else if (selectedScene === 'cacheflow') {
      return cacheFlowTimeline.map((item) => ({
        activeLine: item.activeLine,
        description: item.description,
        badge: item.latencyText,
        subInfo: `${item.statusText} • Paquete: ${item.packetLabel}`,
      }));
    } else if (selectedScene === 'eventloop') {
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
  }, [selectedScene, fraudTimeline, mapsTimeline, embeddingTimeline, cacheFlowTimeline, eventLoopTimeline, bfsTimeline]);

  // Audio effects when step changes
  useEffect(() => {
    if (!soundEnabled) return;
    const desc = currentStep.description;
    if (desc.includes('¡Condición cumplida') || desc.includes('FINALIZADO') || desc.includes('completado') || desc.includes('ganadora') || desc.includes('óptima') || desc.includes('FUGAS') || desc.includes('seguridad')) {
      playStepSound('target');
    } else if (desc.includes('pop') || desc.includes('DRENANDO') || desc.includes('desapila') || desc.includes('descarte') || desc.includes('colapsa') || desc.includes('Alerta') || desc.includes('RIESGO')) {
      playStepSound('pop');
    } else if (desc.includes('append') || desc.includes('Encolar') || desc.includes('ENCOLANDO') || desc.includes('radar') || desc.includes('Dispersión') || desc.includes('bucle')) {
      playStepSound('enqueue');
    } else {
      playStepSound('visit');
    }
  }, [currentStepIndex, soundEnabled, currentStep.description]);

  // Auto playback loop
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!isPlaying) return;

    if (currentStepIndex >= activeTimeline.length - 1) {
      setIsPlaying(false);
      return;
    }

    const stepDuration =
      (currentStep as any)?.stepDurationMs ||
      (selectedScene === 'fraud' ? 8000 : selectedScene === 'maps' ? 3500 : selectedScene === 'embedding' ? 3200 : selectedScene === 'eventloop' ? 1200 : 800);
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
  }, [isPlaying, currentStepIndex, activeTimeline.length, playbackSpeed, selectedScene, currentStep]);

  // Keyboard shortcut listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentStepIndex((prev) => Math.min(activeTimeline.length - 1, prev + 1));
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentStepIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentStepIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTimeline.length]);

  const totalCalculatedTime = activeTimeline[activeTimeline.length - 1]?.timeSec ? (selectedScene === 'error_2119' || selectedScene === 'pse_ose' ? 33.0 : selectedScene === 'facturacion' ? 34.0 : selectedScene === 'fraud' ? 32.5 : activeTimeline[activeTimeline.length - 1].timeSec) : 33.0;
  const currentCalculatedTime = currentStep.timeSec || 0;

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#c0caf5] flex flex-col font-sans selection:bg-[#38bdf8]/30">
      {/* Top Application Bar with Scene Switcher */}
      <header className="border-b border-[#1f2937] bg-[#111827]/95 backdrop-blur-md px-4 sm:px-6 py-3 sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#10b981] via-[#0284c7] to-[#e11d48] flex items-center justify-center shadow-lg shadow-[#10b981]/20">
            <Layers className="w-5 h-5 text-[#0a0e17] font-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2 font-mono">
                <span className="font-black tracking-widest text-white">codevo.pe</span>
                <span className="text-xs font-sans text-[#94a3b8]">Motion Canvas</span>
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono rounded-md bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 font-medium">
                {selectedScene === 'error_2119'
                  ? '1080×1920 (9:16) • 60 FPS • 33s (Error 2119 Debugging)'
                  : selectedScene === 'pse_ose'
                  ? '1080×1920 (9:16) • 60 FPS • 33s (PSE / OSE Cloud)'
                  : selectedScene === 'facturacion'
                  ? '1080×1920 (9:16) • 60 FPS • 34s (10 Pasos)'
                  : '1080×1920 (9:16) • 60 FPS • 33s'}
              </span>
            </div>
            <p className="text-xs text-[#64748b] hidden sm:block">
              {selectedScene === 'error_2119'
                ? '¿Por qué SUNAT rechaza tu comprobante? Diagnóstico y Solución del Error 2119 de IGV / Esquema UBL 2.1'
                : selectedScene === 'pse_ose'
                ? '¿Cómo funciona la Facturación con PSE y OSE? Desacoplamiento de Servidores SUNAT y Validación en Tiempo Real'
                : selectedScene === 'facturacion'
                ? '¿Cómo funciona la Facturación Electrónica? (10 Pasos: ERP, UBL 2.1, Firma X.509, SOAP, Error 2324 y CDR Aceptado)'
                : selectedScene === 'fraud'
                ? 'Detección de Fraude Financiero en Tiempo Real con Grafos (Cycle Detection & Risk Scoring)'
                : selectedScene === 'maps'
                ? '¿Cómo calcula Google Maps tu ruta más rápida? A* Pathfinding y Tráfico en Tiempo Real'
                : selectedScene === 'embedding'
                ? '¿Cómo entiende una IA las palabras? El mapa de los Embeddings (Rey - Hombre + Mujer = Reina)'
                : selectedScene === 'cacheflow'
                ? 'Flujo de API con Cache Hit vs Cache Miss (Cliente ➔ Redis ➔ Base de Datos)'
                : selectedScene === 'eventloop'
                ? 'Concurrencia, Event Loop, Call Stack y Microtask Queue en JavaScript'
                : 'Búsqueda en Anchura (BFS) en Matriz 5x5 con Python'}
            </p>
          </div>
        </div>

        {/* Scene Selector in Header */}
        <div className="flex items-center gap-1 bg-[#1f2937] p-1 rounded-xl border border-[#374151] flex-wrap">
          <button
            onClick={() => handleSceneChange('error_2119')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              selectedScene === 'error_2119'
                ? 'bg-gradient-to-r from-[#ef4444] to-[#10b981] text-white shadow-md shadow-[#ef4444]/30 font-black'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Error 2119 IGV</span>
          </button>
          <button
            onClick={() => handleSceneChange('pse_ose')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              selectedScene === 'pse_ose'
                ? 'bg-gradient-to-r from-[#8b5cf6] to-[#10b981] text-white shadow-md shadow-[#10b981]/30 font-black'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>PSE y OSE Cloud</span>
          </button>
          <button
            onClick={() => handleSceneChange('facturacion')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              selectedScene === 'facturacion'
                ? 'bg-gradient-to-r from-[#0284c7] to-[#10b981] text-white shadow-md shadow-[#10b981]/30 font-black'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>SUNAT Facturación</span>
          </button>
          <button
            onClick={() => handleSceneChange('fraud')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              selectedScene === 'fraud'
                ? 'bg-[#ef4444] text-white shadow-md shadow-[#ef4444]/30 font-black'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Fraude Grafos</span>
          </button>
          <button
            onClick={() => handleSceneChange('maps')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              selectedScene === 'maps'
                ? 'bg-[#10b981] text-[#06080f] shadow-md shadow-[#10b981]/30 font-black'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Google Maps A*</span>
          </button>
          <button
            onClick={() => handleSceneChange('embedding')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              selectedScene === 'embedding'
                ? 'bg-[#8b5cf6] text-white shadow-md shadow-[#8b5cf6]/30'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Embeddings IA</span>
          </button>
          <button
            onClick={() => handleSceneChange('cacheflow')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              selectedScene === 'cacheflow'
                ? 'bg-[#38bdf8] text-[#0a0e17] shadow-md shadow-[#38bdf8]/20'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Cache Hit vs Miss</span>
          </button>
          <button
            onClick={() => handleSceneChange('eventloop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              selectedScene === 'eventloop'
                ? 'bg-[#38bdf8] text-[#0a0e17] shadow-md shadow-[#38bdf8]/20'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Event Loop</span>
          </button>
          <button
            onClick={() => handleSceneChange('bfs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              selectedScene === 'bfs'
                ? 'bg-[#38bdf8] text-[#0a0e17] shadow-md shadow-[#38bdf8]/20'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>BFS Matriz</span>
          </button>
        </div>

        {/* Navigation & Layout Tabs */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#16161e] p-1 rounded-xl border border-[#414868]/40 text-xs">
            <button
              onClick={() => setActiveTab('split')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'split'
                  ? 'bg-[#38bdf8] text-[#0f172a] font-bold shadow'
                  : 'text-[#565f89] hover:text-[#c0caf5]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Vista Dividida</span>
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'bg-[#38bdf8] text-[#0f172a] font-bold shadow'
                  : 'text-[#565f89] hover:text-[#c0caf5]'
              }`}
            >
              <span>Viewport 9:16</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'code'
                  ? 'bg-[#38bdf8] text-[#0f172a] font-bold shadow'
                  : 'text-[#565f89] hover:text-[#c0caf5]'
              }`}
            >
              <span>Motion Canvas TS</span>
            </button>
          </div>

          <button
            onClick={() => setIsMaximized((m) => !m)}
            className="p-2 rounded-xl bg-[#16161e] border border-[#414868]/40 text-[#565f89] hover:text-white transition-all"
            title={isMaximized ? 'Restaurar diseño' : 'Maximizar'}
          >
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="flex-1 p-3 sm:p-5 flex flex-col max-w-[1700px] w-full mx-auto">
        {/* VIEW MODE: CODE ONLY */}
        {activeTab === 'code' && (
          <div className="flex-1 min-h-[640px]">
            <MotionCanvasCodeViewer
              currentScene={selectedScene}
              onSceneSelect={handleSceneChange}
            />
          </div>
        )}

        {/* VIEW MODE: SPLIT OR PREVIEW */}
        {activeTab !== 'code' && (
          <div
            className={`grid gap-5 items-start ${
              activeTab === 'preview'
                ? 'grid-cols-1 max-w-xl mx-auto w-full justify-items-center'
                : 'grid-cols-1 lg:grid-cols-12'
            }`}
          >
            {/* Left Column: 9:16 Vertical Video Viewport & Player Controls */}
            <div
              className={`flex flex-col items-center gap-4 ${
                activeTab === 'preview' ? 'w-full' : 'lg:col-span-5 xl:col-span-4'
              }`}
            >
              <div className="w-full flex items-center justify-between text-xs text-[#565f89] px-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                  <span>CANVAS PREVIEW (1080x1920 • 60 FPS)</span>
                </span>
                <span className="text-[10px] bg-[#16161e] px-2 py-0.5 rounded border border-[#414868]/40">
                  {selectedScene === 'error_2119'
                    ? 'ERROR 2119 SUNAT DEBUGGING'
                    : selectedScene === 'pse_ose'
                    ? 'PSE / OSE CLOUD DECOUPLING'
                    : selectedScene === 'facturacion'
                    ? 'SUNAT FINTECH ARCHITECTURE'
                    : selectedScene === 'fraud'
                    ? 'DISTRIBUTED FRAUD SHIELD'
                    : selectedScene === 'maps'
                    ? 'GOOGLE MAPS ENGINE'
                    : selectedScene === 'embedding'
                    ? 'EMBEDDINGS IA'
                    : selectedScene === 'cacheflow'
                    ? 'REDIS ARCHITECTURE'
                    : selectedScene === 'eventloop'
                    ? 'EVENT LOOP'
                    : 'BFS ALGORITHM'}
                </span>
              </div>

              {/* Viewport Selection */}
              {selectedScene === 'error_2119' ? (
                <Error2119VerticalViewport
                  snapshot={error2119Timeline[currentStepIndex] || error2119Timeline[0]}
                />
              ) : selectedScene === 'pse_ose' ? (
                <PseOseVerticalViewport
                  snapshot={pseOseTimeline[currentStepIndex] || pseOseTimeline[0]}
                />
              ) : selectedScene === 'facturacion' ? (
                <FacturacionVerticalViewport
                  snapshot={facturacionTimeline[currentStepIndex] || facturacionTimeline[0]}
                />
              ) : selectedScene === 'fraud' ? (
                <FraudVerticalViewport
                  snapshot={fraudTimeline[currentStepIndex] || fraudTimeline[0]}
                />
              ) : selectedScene === 'maps' ? (
                <MapsVerticalViewport
                  snapshot={mapsTimeline[currentStepIndex] || mapsTimeline[0]}
                />
              ) : selectedScene === 'embedding' ? (
                <EmbeddingVerticalViewport
                  snapshot={embeddingTimeline[currentStepIndex] || embeddingTimeline[0]}
                />
              ) : selectedScene === 'cacheflow' ? (
                <CacheFlowVerticalViewport
                  snapshot={cacheFlowTimeline[currentStepIndex] || cacheFlowTimeline[0]}
                />
              ) : selectedScene === 'eventloop' ? (
                <EventLoopVerticalViewport
                  snapshot={eventLoopTimeline[currentStepIndex] || eventLoopTimeline[0]}
                />
              ) : (
                <VerticalVideoViewport
                  snapshot={bfsTimeline[currentStepIndex] || bfsTimeline[0]}
                />
              )}

              <div className="w-full max-w-[440px]">
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
                />
              </div>
            </div>

            {/* Right Column: Code & Event Logs */}
            {activeTab === 'split' && (
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4 h-full">
                {/* Event Step Sequence Log */}
                <div className="h-56">
                  <StepEventList
                    title={
                      selectedScene === 'error_2119'
                        ? 'Diagnóstico Error 2119 SUNAT Telemetry'
                        : selectedScene === 'pse_ose'
                        ? 'Arquitectura PSE / OSE Telemetry'
                        : selectedScene === 'facturacion'
                        ? 'Facturación Electrónica SUNAT Telemetry'
                        : selectedScene === 'fraud'
                        ? 'Fraud Shield Detection Telemetry'
                        : selectedScene === 'maps'
                        ? 'Google Maps A* Navigation Telemetry'
                        : selectedScene === 'embedding'
                        ? 'Álgebra de Embeddings Timeline'
                        : selectedScene === 'cacheflow'
                        ? 'Cache Hit vs Miss Timeline'
                        : selectedScene === 'eventloop'
                        ? 'Event Loop & Call Stack Timeline'
                        : 'BFS Matriz Timeline'
                    }
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
                  {selectedScene === 'error_2119' ? (
                    <PythonCodeBlock
                      activeLine={currentStep.stepIndex + 1}
                      customLines={ERROR_2119_CODE_LINES}
                      title="error_2119_igv_diagnostic.py"
                    />
                  ) : selectedScene === 'pse_ose' ? (
                    <PythonCodeBlock
                      activeLine={currentStep.stepIndex + 1}
                      customLines={PSE_OSE_CODE_LINES}
                      title="pse_ose_cloud_architecture.py"
                    />
                  ) : selectedScene === 'facturacion' ? (
                    <PythonCodeBlock
                      activeLine={currentStep.stepIndex + 1}
                      customLines={FACTURACION_CODE_LINES}
                      title="facturacion_sunat_pipeline.py"
                    />
                  ) : selectedScene === 'fraud' ? (
                    <PythonCodeBlock
                      activeLine={currentStep.stepIndex + 1}
                      customLines={FRAUD_CODE_LINES}
                      title="cycle_fraud_detector.py"
                    />
                  ) : selectedScene === 'maps' ? (
                    <PythonCodeBlock
                      activeLine={currentStep.stepIndex + 1}
                      customLines={MAPS_CODE_LINES}
                      title="google_maps_astar_engine.py"
                    />
                  ) : selectedScene === 'embedding' ? (
                    <PythonCodeBlock
                      activeLine={currentStep.stepIndex + 1}
                      customLines={[
                        '# Álgebra Vectorial de Embeddings (Word2Vec / Transformer)',
                        '# 1. Cada palabra se traduce a un punto con coordenadas:',
                        'v_rey    = embedding_model["Rey"]     # [-0.7, +0.7]',
                        'v_hombre = embedding_model["Hombre"]  # [-0.7, -0.6]',
                        'v_mujer  = embedding_model["Mujer"]   # [+0.7, -0.6]',
                        '# 2. Las relaciones entre conceptos son flechas (vectores):',
                        '#    Hombre ➔ Rey  suma exactamente el vector [+0.0, +1.3] (Nobleza)',
                        '#    Mujer  ➔ Reina suma exactamente el vector [+0.0, +1.3] (Nobleza)',
                        '# 3. Operamos los significados matemáticamente:',
                        'resultado = v_rey - v_hombre + v_mujer',
                        '# 4. Buscamos el punto más cercano en el espacio vectorial:',
                        '#    resultado == [+0.7, +0.7] ➔ Coordenada exacta de "Reina" 👸',
                      ]}
                      title="vector_embeddings_algebra.py"
                    />
                  ) : selectedScene === 'cacheflow' ? (
                    <JavaScriptCodeBlock
                      activeLine={currentStep.activeLine}
                      title="cache_gateway.ts"
                    />
                  ) : selectedScene === 'eventloop' ? (
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
      </main>
    </div>
  );
}
