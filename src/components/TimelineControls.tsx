import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Video,
  Square,
  Minimize2,
} from 'lucide-react';

export interface TimelineControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  currentStepIndex: number;
  totalSteps: number;
  currentTime: number;
  totalTime: number;
  onSeek: (stepIndex: number) => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isRecording?: boolean;
  onToggleRecord?: () => void;
  recordingDuration?: number;
  onCollapse?: () => void;
}

export const TimelineControls: React.FC<TimelineControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onReset,
  onPrevStep,
  onNextStep,
  currentStepIndex,
  totalSteps,
  currentTime,
  totalTime,
  onSeek,
  playbackSpeed,
  onSpeedChange,
  soundEnabled,
  onToggleSound,
  isRecording = false,
  onToggleRecord,
  recordingDuration = 0,
  onCollapse,
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const ms = Math.floor((secs % 1) * 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms}`;
  };

  const speeds = [0.5, 1, 1.5, 2];

  return (
    <div
      id="timeline-controls-bar"
      className="w-full flex items-center justify-between xl:justify-center gap-2 sm:gap-3 lg:gap-4 flex-nowrap overflow-x-auto select-none py-1"
    >
      {/* 1. SECCIÓN TÍTULO / BADGE ESTADO */}
      <div className="hidden 2xl:flex items-center gap-2 font-mono text-[11px] font-bold shrink-0 bg-[#161b26] border border-[#2e384d]/60 px-3 py-1.5 rounded-xl shadow-inner text-white">
        <span
          className={`w-2 h-2 rounded-full ${
            isRecording ? 'bg-red-500 animate-ping' : 'bg-[#10b981] animate-pulse'
          }`}
        />
        <span className="tracking-wider uppercase text-[#c0caf5]">
          {isRecording ? 'GRABANDO EN VIVO' : 'REPRODUCCIÓN & GRABACIÓN'}
        </span>
      </div>

      {/* 2. BOTONES DE REPRODUCCIÓN (REINICIO, PREV, PLAY/PAUSE, NEXT) */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <button
          id="btn-timeline-reset"
          onClick={onReset}
          className="p-2 rounded-xl bg-[#1a202c] hover:bg-[#242d3d] text-[#c0caf5] border border-[#2d3748] transition-all active:scale-95 shadow-sm"
          title="Reiniciar animación al primer paso"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-timeline-prev"
          onClick={onPrevStep}
          disabled={currentStepIndex <= 0}
          className="p-2 rounded-xl bg-[#1a202c] hover:bg-[#242d3d] disabled:opacity-30 disabled:cursor-not-allowed text-[#c0caf5] border border-[#2d3748] transition-all active:scale-95 shadow-sm"
          title="Paso anterior (←)"
        >
          <SkipBack className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-timeline-play-pause"
          onClick={onTogglePlay}
          className={`flex items-center justify-center px-3 sm:px-4 py-2 rounded-xl font-bold text-xs gap-1.5 transition-all active:scale-95 shadow-md ${
            isPlaying
              ? 'bg-[#f43f5e] hover:bg-[#e11d48] text-white shadow-[#f43f5e]/30'
              : 'bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#0a0e17] shadow-[#38bdf8]/30'
          }`}
          title={isPlaying ? 'Pausar (Espacio)' : 'Reproducir (Espacio)'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline font-mono">Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline font-mono">Reproducir</span>
            </>
          )}
        </button>

        <button
          id="btn-timeline-next"
          onClick={onNextStep}
          disabled={currentStepIndex >= totalSteps - 1}
          className="p-2 rounded-xl bg-[#1a202c] hover:bg-[#242d3d] disabled:opacity-30 disabled:cursor-not-allowed text-[#c0caf5] border border-[#2d3748] transition-all active:scale-95 shadow-sm"
          title="Paso siguiente"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3. LÍNEA DE TIEMPO / SLIDER (TIEMPO ACTUAL, BARRA DESLIZANTE, TIEMPO TOTAL) */}
      <div className="flex items-center gap-2 flex-1 min-w-[130px] max-w-xl mx-1 sm:mx-2">
        <span className="text-[11px] font-mono text-[#38bdf8] min-w-[50px] shrink-0 text-right font-medium">
          {formatTime(currentTime)}
        </span>

        <div className="flex-1 relative flex items-center">
          <input
            id="timeline-progress-slider"
            type="range"
            min={0}
            max={totalSteps - 1}
            value={currentStepIndex}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="w-full h-2 bg-[#1e2738] rounded-lg appearance-none cursor-pointer accent-[#38bdf8] hover:accent-[#7dd3fc] focus:outline-none transition-all"
            title={`Paso ${currentStepIndex + 1} de ${totalSteps}`}
          />
        </div>

        <span className="text-[11px] font-mono text-[#64748b] min-w-[50px] shrink-0 text-left font-medium">
          {formatTime(totalTime)}
        </span>
      </div>

      {/* 4. CONTADOR DE PASOS */}
      <div
        id="badge-timeline-steps"
        className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#94a3b8] bg-[#161b26] px-2.5 py-1.5 rounded-xl border border-[#2d3748]/60 shrink-0"
      >
        <span className="text-[#64748b]">Paso</span>
        <span className="text-[#38bdf8] font-bold">{currentStepIndex + 1}</span>
        <span className="text-[#64748b]">/</span>
        <span className="text-[#c0caf5]">{totalSteps}</span>
      </div>

      {/* 5. SELECTOR DE VELOCIDAD */}
      <div
        id="picker-timeline-speed"
        className="flex items-center bg-[#161b26] rounded-xl p-0.5 border border-[#2d3748]/60 shrink-0"
      >
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            className={`px-1.5 sm:px-2 py-1 text-[11px] font-mono rounded-lg transition-all ${
              playbackSpeed === s
                ? 'bg-[#38bdf8] text-[#0a0e17] font-bold shadow-sm'
                : 'text-[#64748b] hover:text-[#c0caf5]'
            }`}
            title={`Velocidad ${s}x`}
          >
            {s}x
          </button>
        ))}
      </div>

      {/* 6. BOTÓN DE GRABAR VIDEO */}
      {onToggleRecord && (
        <button
          id="btn-timeline-record"
          onClick={onToggleRecord}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium text-xs transition-all active:scale-95 shadow-md border shrink-0 ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600 text-white border-red-400 animate-pulse shadow-red-500/40 ring-1 ring-white/30'
              : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white border-red-500/50 shadow-red-900/30'
          }`}
          title={
            isRecording
              ? 'Detener grabación y descargar video MP4/WebM'
              : 'Grabar video de la escena (60 FPS)'
          }
        >
          {isRecording ? (
            <>
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span className="font-mono font-bold tracking-wider text-[11px]">
                REC {formatTime(recordingDuration)}
              </span>
              <Square className="w-3 h-3 fill-current ml-0.5" />
            </>
          ) : (
            <>
              <Video className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-semibold">Grabar Video</span>
              <span className="md:hidden font-semibold">REC</span>
            </>
          )}
        </button>
      )}

      {/* 7. BOTÓN DE SONIDO / SILENCIO */}
      <button
        id="btn-timeline-sound"
        onClick={onToggleSound}
        className={`p-2 rounded-xl border transition-all shrink-0 active:scale-95 ${
          soundEnabled
            ? 'bg-[#10b981]/15 border-[#10b981]/40 text-[#10b981]'
            : 'bg-[#1a202c] border-[#2d3748] text-[#64748b] hover:text-[#94a3b8]'
        }`}
        title={soundEnabled ? 'Sonido activado (Click para silenciar)' : 'Sonido silenciado (Click para activar)'}
      >
        {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
      </button>

      {/* 8. BOTÓN DE COLAPSAR A BOTÓN FLOTANTE */}
      {onCollapse && (
        <button
          id="btn-timeline-collapse"
          onClick={onCollapse}
          className="p-2 rounded-xl bg-[#1a202c] hover:bg-[#242d3d] text-[#64748b] hover:text-white border border-[#2d3748] transition-all shrink-0 active:scale-95"
          title="Minimizar barra a botón flotante en esquina inferior"
        >
          <Minimize2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
