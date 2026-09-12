import React from 'react';

export interface GenericStepItem {
  activeLine: number;
  description: string;
  subInfo?: string;
  badge?: string;
}

interface StepEventListProps {
  steps: GenericStepItem[];
  currentStepIndex: number;
  onSelectStep: (idx: number) => void;
  title?: string;
}

export const StepEventList: React.FC<StepEventListProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
  title = 'Secuencia de Ejecución',
}) => {
  return (
    <div className="w-full bg-[#16161e] border border-[#414868]/60 rounded-2xl p-3 flex flex-col h-full overflow-hidden shadow-xl">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#414868]/40">
        <span className="text-xs font-mono font-bold text-[#c0caf5]">
          {title} ({steps.length} pasos)
        </span>
        <span className="text-[11px] font-mono text-[#38bdf8]">
          Línea activa: {steps[currentStepIndex]?.activeLine ? `#${steps[currentStepIndex]?.activeLine}` : 'Fin'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isTargetFound =
            step.description.includes('¡Condición') ||
            step.description.includes('Camino') ||
            step.description.includes('Finalizado') ||
            step.description.includes('completado');

          return (
            <button
              key={idx}
              onClick={() => onSelectStep(idx)}
              className={`w-full text-left p-2 rounded-xl transition-all flex items-start gap-2 text-xs font-mono border ${
                isActive
                  ? 'bg-[#292e42] border-[#38bdf8] text-white shadow-md shadow-[#38bdf8]/10'
                  : 'bg-[#1a1b26]/60 border-[#414868]/30 hover:bg-[#24283b] text-[#9aa5ce]'
              }`}
            >
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  isTargetFound
                    ? 'bg-[#4ade80]/20 text-[#4ade80] border border-[#4ade80]/40'
                    : isActive
                    ? 'bg-[#38bdf8]/20 text-[#38bdf8]'
                    : 'bg-[#24283b] text-[#565f89]'
                }`}
              >
                {step.badge || (step.activeLine ? `L${step.activeLine}` : 'Fin')}
              </span>

              <div className="flex-1 truncate">
                <span className={`block truncate ${isActive ? 'text-white font-semibold' : ''}`}>
                  {step.description}
                </span>
                {step.subInfo && (
                  <span className="text-[10px] text-[#565f89] block truncate">
                    {step.subInfo}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
