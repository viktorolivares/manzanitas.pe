import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Terminal, Sparkles, Navigation, ShieldAlert } from 'lucide-react';
import { MOTION_CANVAS_CODE } from '../motion-canvas/bfsSceneSource';
import { EVENT_LOOP_SCENE_CODE } from '../motion-canvas/eventLoopSceneSource';
import { CACHE_FLOW_SCENE_CODE } from '../motion-canvas/cacheFlowSceneSource';
import { EMBEDDING_SCENE_CODE } from '../motion-canvas/embeddingSceneSource';
import { GOOGLE_MAPS_ASTAR_SCENE_CODE } from '../motion-canvas/googleMapsAStarSceneSource';
import { FRAUD_DETECTION_SCENE_CODE } from '../motion-canvas/fraudDetectionSceneSource';

interface MotionCanvasCodeViewerProps {
  currentScene?: 'fraud' | 'maps' | 'embedding' | 'cacheflow' | 'eventloop' | 'bfs';
  onSceneSelect?: (scene: 'fraud' | 'maps' | 'embedding' | 'cacheflow' | 'eventloop' | 'bfs') => void;
}

export const MotionCanvasCodeViewer: React.FC<MotionCanvasCodeViewerProps> = ({
  currentScene = 'fraud',
  onSceneSelect,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'instructions'>('code');

  const activeCode =
    currentScene === 'fraud'
      ? FRAUD_DETECTION_SCENE_CODE
      : currentScene === 'maps'
      ? GOOGLE_MAPS_ASTAR_SCENE_CODE
      : currentScene === 'embedding'
      ? EMBEDDING_SCENE_CODE
      : currentScene === 'cacheflow'
      ? CACHE_FLOW_SCENE_CODE
      : currentScene === 'eventloop'
      ? EVENT_LOOP_SCENE_CODE
      : MOTION_CANVAS_CODE;

  const fileName =
    currentScene === 'fraud'
      ? 'fraudDetectionScene.tsx'
      : currentScene === 'maps'
      ? 'googleMapsAStarScene.tsx'
      : currentScene === 'embedding'
      ? 'embeddingScene.tsx'
      : currentScene === 'cacheflow'
      ? 'cacheFlowScene.tsx'
      : currentScene === 'eventloop'
      ? 'eventLoopScene.tsx'
      : 'bfsScene.tsx';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([activeCode], { type: 'text/typescript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex flex-col h-full bg-[#16161e] rounded-2xl border border-[#414868]/60 overflow-hidden shadow-2xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#1f2335] border-b border-[#414868]/50 gap-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Scene Selector Pills */}
          <div className="flex items-center bg-[#111827] p-1 rounded-xl border border-[#334155] flex-wrap gap-1">
            <button
              onClick={() => onSceneSelect?.('fraud')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                currentScene === 'fraud'
                  ? 'bg-[#ef4444] text-white shadow-md shadow-[#ef4444]/30 font-black'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>fraudDetection.tsx</span>
            </button>
            <button
              onClick={() => onSceneSelect?.('maps')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                currentScene === 'maps'
                  ? 'bg-[#10b981] text-[#06080f] shadow-md shadow-[#10b981]/30 font-black'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>googleMapsAStar.tsx</span>
            </button>
            <button
              onClick={() => onSceneSelect?.('embedding')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                currentScene === 'embedding'
                  ? 'bg-[#8b5cf6] text-white shadow-md shadow-[#8b5cf6]/30'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>embeddingScene.tsx</span>
            </button>
            <button
              onClick={() => onSceneSelect?.('cacheflow')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                currentScene === 'cacheflow'
                  ? 'bg-[#38bdf8] text-[#0a0e17] shadow-md'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>cacheFlowScene.tsx</span>
            </button>
            <button
              onClick={() => onSceneSelect?.('eventloop')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                currentScene === 'eventloop'
                  ? 'bg-[#38bdf8] text-[#0a0e17] shadow-md'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>eventLoopScene.tsx</span>
            </button>
            <button
              onClick={() => onSceneSelect?.('bfs')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                currentScene === 'bfs'
                  ? 'bg-[#38bdf8] text-[#0a0e17] shadow-md'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>bfsScene.tsx</span>
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[#16161e] p-1 rounded-lg border border-[#414868]/40">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'code'
                  ? 'bg-[#38bdf8] text-[#0f172a] font-bold shadow'
                  : 'text-[#565f89] hover:text-[#c0caf5]'
              }`}
            >
              Código TypeScript
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'instructions'
                  ? 'bg-[#38bdf8] text-[#0f172a] font-bold shadow'
                  : 'text-[#565f89] hover:text-[#c0caf5]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Guía de Uso
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#24283b] hover:bg-[#292e42] text-[#c0caf5] border border-[#414868]/60 transition-all active:scale-95"
            title="Copiar código al portapapeles"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#4ade80]" />
                <span className="text-[#4ade80] font-semibold">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#7aa2f7]" />
                <span>Copiar Script</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#38bdf8] hover:bg-[#0284c7] text-[#0f172a] font-bold transition-all active:scale-95 shadow-lg shadow-[#38bdf8]/20"
            title="Descargar archivo TypeScript"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar {fileName}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed">
        {activeTab === 'code' ? (
          <div className="relative">
            <pre className="text-[#c0caf5] bg-[#0c0e17] p-4 rounded-xl border border-[#23283d] overflow-x-auto selection:bg-[#38bdf8]/30">
              <code>{activeCode}</code>
            </pre>
          </div>
        ) : (
          <div className="space-y-6 max-w-3xl text-[#a9b1d6] font-sans">
            <div className="p-4 rounded-xl bg-[#1a1b26] border border-[#414868]/50">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#38bdf8]/20 text-[#38bdf8] text-xs font-mono font-bold">
                  9:16 Vertical (1080x1920)
                </span>
                <span>Configuración en Motion Canvas</span>
              </h3>
              <p className="text-xs text-[#9aa5ce] leading-relaxed">
                Este script está diseñado para ejecutarse en el entorno de{' '}
                <strong className="text-white">Motion Canvas</strong> y renderizarse en resolución
                vertical <strong>1080x1920 a 60 FPS (duración ~32-35s)</strong> (ideal para YouTube Shorts, Reels y TikTok).
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Pasos para ejecutar localmente:
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-xs text-[#9aa5ce]">
                <li className="p-2.5 rounded-lg bg-[#11121d] border border-[#2b3049]">
                  Crea o abre tu proyecto de Motion Canvas:
                  <div className="mt-1.5 p-2 rounded bg-[#0a0b12] text-[#7dcfff] font-mono">
                    npm create @motion-canvas@latest mi-video-vertical
                  </div>
                </li>
                <li className="p-2.5 rounded-lg bg-[#11121d] border border-[#2b3049]">
                  Guarda este archivo en tu carpeta de escenas:
                  <div className="mt-1.5 p-2 rounded bg-[#0a0b12] text-[#7dcfff] font-mono">
                    src/scenes/{fileName}
                  </div>
                </li>
                <li className="p-2.5 rounded-lg bg-[#11121d] border border-[#2b3049]">
                  Asegura que tu archivo <code className="text-[#bb9af7]">motion-canvas.config.ts</code>{' '}
                  defina el viewport vertical:
                  <div className="mt-1.5 p-2 rounded bg-[#0a0b12] text-[#9ece6a] font-mono">
                    size: &#123; width: 1080, height: 1920 &#125;
                  </div>
                </li>
                <li className="p-2.5 rounded-lg bg-[#11121d] border border-[#2b3049]">
                  Inicia el editor interactivo con preview en tiempo real:
                  <div className="mt-1.5 p-2 rounded bg-[#0a0b12] text-[#7dcfff] font-mono">
                    npm run serve
                  </div>
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
