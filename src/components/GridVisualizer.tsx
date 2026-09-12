import React from 'react';
import { CellType, GridPos } from '../types';
import { GRID_ROWS, GRID_COLS, START_NODE, TARGET_NODE } from '../data/bfsAlgorithm';

interface GridVisualizerProps {
  gridState: CellType[][];
  currentNode: GridPos | null;
  queue: GridPos[];
  visitedCount: number;
  pathNodes: GridPos[];
  stepDescription: string;
}

export const GridVisualizer: React.FC<GridVisualizerProps> = ({
  gridState,
  currentNode,
  queue,
  visitedCount,
  pathNodes,
  stepDescription,
}) => {
  const isGoalReached = pathNodes.length > 0;

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Algorithm Banner / Pill */}
      <div className="flex items-center justify-between w-full px-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#c084fc]/15 text-[#c084fc] border border-[#c084fc]/30 tracking-wider">
            BFS ALGORITHM
          </span>
          <span className="text-xs font-mono text-[#565f89]">5×5 Grid (25 celdas)</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded-md border border-[#38bdf8]/20">
            Visitados: {visitedCount}
          </span>
        </div>
      </div>

      {/* 5x5 Grid Board */}
      <div className="relative p-3 bg-[#16161e]/90 rounded-2xl border border-[#414868]/40 shadow-xl backdrop-blur-sm">
        {/* SVG Path line overlay when shortest path is discovered */}
        {pathNodes.length > 1 && (
          <svg className="absolute inset-0 pointer-events-none z-20 w-full h-full p-3">
            <polyline
              points={pathNodes
                .map((p) => {
                  // Calculate center coordinates in percentage
                  const xPct = ((p.c + 0.5) / GRID_COLS) * 100;
                  const yPct = ((p.r + 0.5) / GRID_ROWS) * 100;
                  return `${xPct}%,${yPct}%`;
                })
                .join(' ')}
              fill="none"
              stroke="#4ade80"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="8 4"
              className="animate-pulse drop-shadow-[0_0_12px_rgba(74,222,128,0.8)]"
            />
          </svg>
        )}

        <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
          {gridState.map((row, r) =>
            row.map((cellType, c) => {
              const isCurrent = currentNode?.r === r && currentNode?.c === c;
              const isStart = START_NODE.r === r && START_NODE.c === c;
              const isTarget = TARGET_NODE.r === r && TARGET_NODE.c === c;
              const isPath = pathNodes.some((p) => p.r === r && p.c === c);

              let cellBg = 'bg-[#24283b] border-[#414868]/80 text-[#565f89]';
              let cellContent = `${r},${c}`;
              let extraClasses = '';

              if (cellType === 'wall') {
                cellBg = 'bg-[#334155]/80 border-[#475569] text-[#64748b]';
                cellContent = '■';
              } else if (isPath) {
                cellBg = 'bg-[#4ade80] border-[#86efac] text-[#0f172a] shadow-[0_0_16px_rgba(74,222,128,0.6)] font-bold';
                cellContent = isStart ? 'INICIO' : isTarget ? 'META' : `${r},${c}`;
                extraClasses = 'scale-105 z-10';
              } else if (isCurrent) {
                cellBg = 'bg-[#c084fc] border-white text-[#0f172a] font-bold shadow-[0_0_16px_rgba(192,132,252,0.8)]';
                cellContent = `${r},${c}`;
                extraClasses = 'scale-110 z-10 animate-pulse';
              } else if (cellType === 'in_queue') {
                cellBg = 'bg-[#1e3a8a] border-[#38bdf8] text-[#38bdf8] font-semibold shadow-[0_0_8px_rgba(56,189,248,0.4)]';
                cellContent = `${r},${c}`;
                extraClasses = 'scale-102';
              } else if (cellType === 'visited') {
                cellBg = 'bg-[#1e293b] border-[#38bdf8]/40 text-[#7aa2f7]';
                cellContent = `${r},${c}`;
              } else if (isStart) {
                cellBg = 'bg-[#166534] border-[#4ade80] text-[#4ade80] font-bold shadow-[0_0_10px_rgba(74,222,128,0.4)]';
                cellContent = 'START';
              } else if (isTarget) {
                cellBg = 'bg-[#991b1b] border-[#f43f5e] text-[#f43f5e] font-bold shadow-[0_0_10px_rgba(244,63,94,0.4)]';
                cellContent = 'GOAL';
              }

              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 flex flex-col items-center justify-center text-[11px] sm:text-xs font-mono transition-all duration-300 relative ${cellBg} ${extraClasses}`}
                >
                  <span className="font-semibold">{cellContent}</span>
                  {cellType === 'visited' && !isPath && !isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]/60 mt-0.5" />
                  )}
                  {isCurrent && (
                    <span className="text-[9px] uppercase tracking-tighter text-[#0f172a] font-extrabold">
                      CURR
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Queue Visualization Strip */}
      <div className="w-full bg-[#16161e] border border-[#414868]/60 rounded-xl px-3 py-2 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 overflow-hidden flex-1 mr-2">
          <div className="px-2 py-0.5 rounded bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-[#38bdf8] font-mono text-[11px] font-bold shrink-0">
            FIFO QUEUE
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-thin">
            {queue.length === 0 ? (
              <span className="text-xs font-mono text-[#565f89] italic">vacía []</span>
            ) : (
              queue.map((node, i) => (
                <div
                  key={`${node.r}-${node.c}-${i}`}
                  className={`px-2 py-0.5 rounded-md font-mono text-xs border whitespace-nowrap transition-all ${
                    i === 0
                      ? 'bg-[#c084fc]/20 border-[#c084fc] text-[#c084fc] font-bold shadow-sm'
                      : 'bg-[#24283b] border-[#414868] text-[#c0caf5]'
                  }`}
                >
                  {i === 0 && <span className="text-[9px] mr-1 text-[#c084fc]">POP ➜</span>}
                  ({node.r}, {node.c})
                </div>
              ))
            )}
          </div>
        </div>

        <div className="text-[11px] font-mono text-[#fbbf24] bg-[#fbbf24]/10 px-2 py-0.5 rounded border border-[#fbbf24]/20 shrink-0">
          Items: {queue.length}
        </div>
      </div>

      {/* Real-time Status Card */}
      <div className={`w-full px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-2 border transition-all ${
        isGoalReached
          ? 'bg-[#14532d]/40 border-[#4ade80] text-[#4ade80] shadow-[0_0_15px_rgba(74,222,128,0.2)]'
          : 'bg-[#1a1b26] border-[#414868]/40 text-[#c0caf5]'
      }`}>
        <span className="text-sm">
          {isGoalReached ? '🎯' : '⚡'}
        </span>
        <span className="truncate flex-1 font-medium">{stepDescription}</span>
      </div>
    </div>
  );
};
