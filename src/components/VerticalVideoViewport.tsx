import React from 'react';
import {
  Flag,
  Target,
  Zap,
  Check,
  Layers,
  Compass,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  Trophy,
} from 'lucide-react';
import { StepSnapshot, GridPos } from '../types';
import { GRID_ROWS, GRID_COLS, START_NODE, TARGET_NODE, INITIAL_GRID } from '../data/bfsAlgorithm';
import { COMPANY_NAME } from '../config/appConfig';

interface VerticalVideoViewportProps {
  snapshot: StepSnapshot;
}

export const VerticalVideoViewport: React.FC<VerticalVideoViewportProps> = ({ snapshot }) => {
  const isGoalReached = snapshot.pathNodes.length > 0;
  const isTargetFound = snapshot.description.includes('target') || snapshot.description.includes('cumplida') || isGoalReached;

  // Determine active direction being explored from variableValues
  const drDcMatch = snapshot.variableValues.dr_dc;
  let activeDir: 'right' | 'down' | 'left' | 'up' | null = null;
  if (drDcMatch) {
    if (drDcMatch.includes('0, 1') || drDcMatch.includes('0,1')) activeDir = 'right';
    else if (drDcMatch.includes('1, 0') || drDcMatch.includes('1,0')) activeDir = 'down';
    else if (drDcMatch.includes('0, -1') || drDcMatch.includes('0,-1')) activeDir = 'left';
    else if (drDcMatch.includes('-1, 0') || drDcMatch.includes('-1,0')) activeDir = 'up';
  }

  // Calculate frontier level approximation from current node distance
  const currentDist = snapshot.currentNode
    ? snapshot.currentNode.r + snapshot.currentNode.c
    : 0;

  return (
    <div className="relative w-full max-w-[440px] aspect-[9/16] bg-[#080c16] border-2 border-[#1e293b] rounded-[34px] overflow-hidden shadow-2xl flex flex-col p-4 sm:p-5 select-none ring-1 ring-[#38bdf8]/20">
      {/* Subtle background cyber grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ================================================================= */}
      {/* 1. HEADER MINIMALISTA                                            */}
      {/* ================================================================= */}
      <div className="relative z-20 pb-2 border-b border-[#1e293b]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono font-black text-white text-base tracking-[0.25em]">
              {COMPANY_NAME}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30">
              BFS SHORTEST PATH
            </span>
          </div>

          {/* Dynamic Step & State Badges */}
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black border transition-all duration-300 ${
                isGoalReached
                  ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/40 shadow-sm shadow-[#10b981]/20 animate-pulse'
                  : snapshot.currentNode
                  ? 'bg-[#c084fc]/15 text-[#c084fc] border-[#c084fc]/40'
                  : 'bg-[#38bdf8]/15 text-[#38bdf8] border-[#38bdf8]/40'
              }`}
            >
              {isGoalReached
                ? '¡META ALCANZADA!'
                : snapshot.currentNode
                ? `CURR: (${snapshot.currentNode.r},${snapshot.currentNode.c})`
                : 'FRONT (FIFO)'}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-[#0e1726] text-white border border-[#334155]">
              P{snapshot.stepIndex + 1}
            </span>
          </div>
        </div>

        {/* Algorithm Sub-Telemetry */}
        <div className="flex items-center justify-between mt-1 text-[9px] font-mono text-[#64748b]">
          <span>Exploración en Anchura (O(V+E))</span>
          <span className="text-[#38bdf8] font-bold">
            Visitados: {snapshot.visitedNodes.length} / 25
          </span>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. TABLERO MATRIZ 5x5 EN ALTA VISIBILIDAD                         */}
      {/* ================================================================= */}
      <div className="relative z-10 flex flex-col items-center justify-center my-1.5">
        <div className="relative p-2.5 bg-[#0e1726]/90 rounded-2xl border border-[#1e293b] shadow-xl backdrop-blur-sm w-full">
          {/* SVG Shortest Path Overlay Line */}
          {snapshot.pathNodes.length > 1 && (
            <svg className="absolute inset-0 pointer-events-none z-30 w-full h-full p-2.5">
              <polyline
                points={snapshot.pathNodes
                  .map((p) => {
                    const xPct = ((p.c + 0.5) / GRID_COLS) * 100;
                    const yPct = ((p.r + 0.5) / GRID_ROWS) * 100;
                    return `${xPct}%,${yPct}%`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 3"
                className="drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]"
              />
            </svg>
          )}

          {/* 5x5 Grid Cells */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {snapshot.gridState.map((row, r) =>
              row.map((cellType, c) => {
                const isCurrent = snapshot.currentNode?.r === r && snapshot.currentNode?.c === c;
                const isStart = START_NODE.r === r && START_NODE.c === c;
                const isTarget = TARGET_NODE.r === r && TARGET_NODE.c === c;
                const isPath = snapshot.pathNodes.some((p) => p.r === r && p.c === c);

                let cellBg = 'bg-[#070b14] border-[#1e293b] text-[#64748b]';
                let cellContent = `${r},${c}`;
                let iconNode: React.ReactNode = null;
                let extraClasses = '';

                if (cellType === 'wall') {
                  cellBg = 'bg-[#1e293b]/90 border-[#334155] text-[#475569]';
                  cellContent = '■';
                  iconNode = <span className="w-2.5 h-2.5 bg-[#475569] rounded-xs inline-block mb-0.5" />;
                } else if (isPath) {
                  cellBg = 'bg-[#10b981] border-[#34d399] text-[#070b14] shadow-[0_0_16px_rgba(16,185,129,0.7)] font-black';
                  cellContent = isStart ? 'START' : isTarget ? 'GOAL' : `${r},${c}`;
                  iconNode = isStart ? <Flag className="w-3 h-3 text-[#070b14]" /> : isTarget ? <Target className="w-3 h-3 text-[#070b14]" /> : <Zap className="w-3 h-3 text-[#070b14]" />;
                  extraClasses = 'scale-105 z-20 animate-pulse';
                } else if (isCurrent) {
                  cellBg = 'bg-[#c084fc] border-white text-[#070b14] font-black shadow-[0_0_16px_rgba(192,132,252,0.8)]';
                  cellContent = `${r},${c}`;
                  iconNode = <Zap className="w-3.5 h-3.5 text-[#070b14]" />;
                  extraClasses = 'scale-110 z-20 ring-2 ring-[#c084fc]';
                } else if (cellType === 'in_queue') {
                  cellBg = 'bg-[#0284c7]/30 border-[#38bdf8] text-[#38bdf8] font-bold shadow-[0_0_10px_rgba(56,189,248,0.4)]';
                  cellContent = `${r},${c}`;
                  iconNode = <Layers className="w-3 h-3 text-[#38bdf8]" />;
                  extraClasses = 'scale-[1.03] animate-pulse';
                } else if (cellType === 'visited') {
                  cellBg = 'bg-[#0b1329] border-[#38bdf8]/30 text-[#38bdf8]/80';
                  cellContent = `${r},${c}`;
                  iconNode = <Check className="w-3 h-3 text-[#38bdf8]/80" />;
                } else if (isStart) {
                  cellBg = 'bg-[#064e3b] border-[#10b981] text-[#34d399] font-black shadow-[0_0_10px_rgba(16,185,129,0.3)]';
                  cellContent = 'START';
                  iconNode = <Flag className="w-3 h-3 text-[#34d399]" />;
                } else if (isTarget) {
                  cellBg = 'bg-[#881337] border-[#f43f5e] text-[#fda4af] font-black shadow-[0_0_10px_rgba(244,63,94,0.4)]';
                  cellContent = 'GOAL';
                  iconNode = <Target className="w-3 h-3 text-[#fda4af]" />;
                }

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center text-[10px] sm:text-[11px] font-mono transition-all duration-300 relative ${cellBg} ${extraClasses}`}
                  >
                    {iconNode && <div className="leading-none mb-0.5">{iconNode}</div>}
                    <span className="font-bold tracking-tight">{cellContent}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 3. COLA FIFO (collections.deque): POP Y APPEND                    */}
      {/* ================================================================= */}
      <div className="relative z-10 bg-[#0e1726] border border-[#1e293b] rounded-2xl p-2.5 flex flex-col gap-1.5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span className="text-[10px] font-mono font-black text-[#38bdf8] tracking-wider">
              COLA FIFO (DEQUE)
            </span>
            <span className="text-[8px] font-mono text-[#64748b]">
              Primer en entrar, primero en salir
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-black bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/30">
            len = {snapshot.queue.length}
          </span>
        </div>

        {/* Cola animada con indicador POP y APPEND */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none min-h-[34px]">
          {snapshot.queue.length === 0 ? (
            <div className="w-full text-center text-[10px] font-mono text-[#475569] italic">
              [ Cola vacía ]
            </div>
          ) : (
            snapshot.queue.map((node, i) => (
              <div
                key={`${node.r}-${node.c}-${i}`}
                className={`px-2 py-1 rounded-lg font-mono text-[10px] border whitespace-nowrap flex items-center gap-1 transition-all ${
                  i === 0
                    ? 'bg-[#c084fc]/25 border-[#c084fc] text-[#c084fc] font-black shadow-md ring-1 ring-[#c084fc]/50 animate-pulse'
                    : 'bg-[#070b14] border-[#1e293b] text-[#cbd5e1]'
                }`}
              >
                {i === 0 && <span className="text-[8px] bg-[#c084fc] text-[#070b14] px-1 rounded font-black">POP</span>}
                <span>({node.r},{node.c})</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================================================================= */}
      {/* 4. EXPLORADOR DIRECCIONAL DEL LOOP (4 VECINOS CARDINALES)         */}
      {/* ================================================================= */}
      <div className="relative z-10 bg-[#0e1726] border border-[#1e293b] rounded-2xl p-2.5 flex flex-col gap-1.5 mt-1.5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span className="text-[10px] font-mono font-black text-white tracking-wider">
              LOOP DE 4 DIRECCIONES
            </span>
          </div>
          <span className="text-[8px] font-mono text-[#94a3b8]">
            dr, dc in [(0,1), (1,0), (0,-1), (-1,0)]
          </span>
        </div>

        {/* 4 Botones / Indicadores cardinales */}
        <div className="grid grid-cols-4 gap-1.5">
          {/* ARRIBA */}
          <div
            className={`p-1.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
              activeDir === 'up'
                ? 'bg-[#38bdf8]/20 border-[#38bdf8] text-[#38bdf8] font-black shadow-md ring-1 ring-[#38bdf8]'
                : 'bg-[#070b14] border-[#1e293b] text-[#64748b]'
            }`}
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span className="text-[8px] font-mono font-bold mt-0.5">Arriba</span>
            <span className="text-[7px] font-mono opacity-80">(-1, 0)</span>
          </div>

          {/* DERECHA */}
          <div
            className={`p-1.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
              activeDir === 'right'
                ? 'bg-[#38bdf8]/20 border-[#38bdf8] text-[#38bdf8] font-black shadow-md ring-1 ring-[#38bdf8]'
                : 'bg-[#070b14] border-[#1e293b] text-[#64748b]'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span className="text-[8px] font-mono font-bold mt-0.5">Derecha</span>
            <span className="text-[7px] font-mono opacity-80">(0, +1)</span>
          </div>

          {/* ABAJO */}
          <div
            className={`p-1.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
              activeDir === 'down'
                ? 'bg-[#38bdf8]/20 border-[#38bdf8] text-[#38bdf8] font-black shadow-md ring-1 ring-[#38bdf8]'
                : 'bg-[#070b14] border-[#1e293b] text-[#64748b]'
            }`}
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span className="text-[8px] font-mono font-bold mt-0.5">Abajo</span>
            <span className="text-[7px] font-mono opacity-80">(+1, 0)</span>
          </div>

          {/* IZQUIERDA */}
          <div
            className={`p-1.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
              activeDir === 'left'
                ? 'bg-[#38bdf8]/20 border-[#38bdf8] text-[#38bdf8] font-black shadow-md ring-1 ring-[#38bdf8]'
                : 'bg-[#070b14] border-[#1e293b] text-[#64748b]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span className="text-[8px] font-mono font-bold mt-0.5">Izquierda</span>
            <span className="text-[7px] font-mono opacity-80">(0, -1)</span>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 5. FOOTER: EXPLICACIÓN Y TELEMETRÍA DEL ALGORITMO                 */}
      {/* ================================================================= */}
      <div className="relative z-20 pt-2 border-t border-[#1e293b] mt-auto">
        <div
          className={`p-2 rounded-xl border flex items-center gap-2 transition-all ${
            isGoalReached
              ? 'bg-[#10b981]/15 border-[#10b981] text-white shadow-lg shadow-[#10b981]/20'
              : 'bg-[#0e1726] border-[#1e293b]'
          }`}
        >
          <div className="p-1 rounded bg-[#070b14] flex-shrink-0">
            {isGoalReached ? (
              <Trophy className="w-4 h-4 text-[#10b981]" />
            ) : (
              <Zap className="w-4 h-4 text-[#38bdf8]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-mono font-black text-white block truncate leading-tight">
              {isGoalReached ? '¡Ruta Óptima Garantizada!' : 'Paso Algorítmico Activo'}
            </span>
            <p className="text-[9px] text-[#94a3b8] leading-tight line-clamp-2 mt-0.5">
              {snapshot.description}
            </p>
          </div>
          {isGoalReached && (
            <span className="px-2 py-1 rounded bg-[#10b981] text-[#070b14] text-[9px] font-mono font-black shrink-0">
              {snapshot.pathNodes.length} pasos
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
