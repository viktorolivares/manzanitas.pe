import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface TimelineControlsProps {
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
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const ms = Math.floor((secs % 1) * 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms}`;
  };

  const speeds = [0.5, 1, 1.5, 2];

  return (
    <div className="w-full bg-[#16161e] border border-[#414868]/60 rounded-2xl p-3.5 shadow-xl flex flex-col gap-3">
      {/* Timeline progress slider */}
      <div className="flex items-center gap-3 w-full">
        <span className="text-xs font-mono text-[#38bdf8] min-w-[58px]">
          {formatTime(currentTime)}
        </span>

        <div className="flex-1 relative flex items-center">
          <input
            type="range"
            min={0}
            max={totalSteps - 1}
            value={currentStepIndex}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="w-full h-2 bg-[#24283b] rounded-lg appearance-none cursor-pointer accent-[#38bdf8] focus:outline-none"
          />
        </div>

        <span className="text-xs font-mono text-[#565f89] min-w-[58px] text-right">
          {formatTime(totalTime)}
        </span>
      </div>

      {/* Control buttons bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Left: Playback buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onReset}
            className="p-2 rounded-lg bg-[#24283b] hover:bg-[#292e42] text-[#c0caf5] border border-[#414868]/60 transition-all active:scale-95"
            title="Reiniciar animación"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onPrevStep}
            disabled={currentStepIndex <= 0}
            className="p-2 rounded-lg bg-[#24283b] hover:bg-[#292e42] disabled:opacity-40 disabled:cursor-not-allowed text-[#c0caf5] border border-[#414868]/60 transition-all active:scale-95"
            title="Paso anterior (←)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePlay}
            className={`flex items-center justify-center px-4 py-2 rounded-xl font-medium text-xs gap-2 transition-all active:scale-95 shadow-md ${
              isPlaying
                ? 'bg-[#f43f5e] hover:bg-[#e11d48] text-white shadow-[#f43f5e]/30'
                : 'bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#0f172a] font-bold shadow-[#38bdf8]/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Reproducir</span>
              </>
            )}
          </button>

          <button
            onClick={onNextStep}
            disabled={currentStepIndex >= totalSteps - 1}
            className="p-2 rounded-lg bg-[#24283b] hover:bg-[#292e42] disabled:opacity-40 disabled:cursor-not-allowed text-[#c0caf5] border border-[#414868]/60 transition-all active:scale-95"
            title="Paso siguiente (→)"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Step indicators */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#9aa5ce] bg-[#1a1b26] px-3 py-1.5 rounded-lg border border-[#414868]/40">
          <span>Paso</span>
          <span className="text-[#38bdf8] font-bold">{currentStepIndex + 1}</span>
          <span>de</span>
          <span>{totalSteps}</span>
        </div>

        {/* Right: Speed & sound */}
        <div className="flex items-center gap-2">
          {/* Speed picker */}
          <div className="flex items-center bg-[#24283b] rounded-lg p-0.5 border border-[#414868]/50">
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => onSpeedChange(s)}
                className={`px-2 py-1 text-[11px] font-mono rounded transition-all ${
                  playbackSpeed === s
                    ? 'bg-[#38bdf8] text-[#0f172a] font-bold'
                    : 'text-[#565f89] hover:text-[#c0caf5]'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-[#4ade80]/15 border-[#4ade80]/40 text-[#4ade80]'
                : 'bg-[#24283b] border-[#414868]/60 text-[#565f89]'
            }`}
            title={soundEnabled ? 'Sonido activado' : 'Sonido silenciado'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
