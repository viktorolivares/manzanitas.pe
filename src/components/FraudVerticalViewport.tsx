import React from 'react';
import { FraudSnapshot } from '../data/fraudDetectionAlgorithm';

interface FraudVerticalViewportProps {
  snapshot: FraudSnapshot;
}

export const FraudVerticalViewport: React.FC<FraudVerticalViewportProps> = ({ snapshot }) => {
  const totalDuration = 32.5;
  const progressPercent = Math.min(100, Math.max(0, (snapshot.timeSec / totalDuration) * 100));

  const getNode = (id: string) => snapshot.nodes.find((n) => n.id === id);

  return (
    <div className="relative w-full max-w-[440px] aspect-[9/16] bg-[#06080f] border-2 border-[#1e293b] rounded-[34px] overflow-hidden shadow-2xl flex flex-col p-4 sm:p-5 select-none ring-1 ring-[#10b981]/20">
      {/* Tactical Financial Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ================================================================= */}
      {/* 1. HEADER MINIMALISTA (codevo.pe • FRAUD SHIELD • LATENCIA)       */}
      {/* ================================================================= */}
      <div className="relative z-20 pb-2 border-b border-[#1e293b]">
        <div className="flex items-center justify-between">
          {/* Brand with green radar ping */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981] shadow-[0_0_8px_#10b981]"></span>
            </span>
            <span className="font-mono font-black text-white text-base tracking-[0.2em]">
              codevo.pe
            </span>
          </div>

          {/* Right Badge: SISTEMAS DISTRIBUIDOS • FRAUD SHIELD */}
          <div
            className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold bg-[#0b1120] border transition-all duration-300 shadow-sm flex items-center gap-1.5"
            style={{
              borderColor: snapshot.statusBadgeColor,
              color: snapshot.statusBadgeColor,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: snapshot.statusBadgeColor }}
            />
            <span>{snapshot.statusBadgeText}</span>
          </div>
        </div>

        {/* Dynamic Telemetry Sub-row: Latency */}
        <div className="flex items-center justify-between mt-1 text-[9px] font-mono">
          <span className="text-[#9ca3af]">{snapshot.phaseLabel}</span>
          <div className="flex items-center gap-2">
            <span
              className="font-bold tracking-wider"
              style={{ color: snapshot.statusBadgeColor }}
            >
              {snapshot.latencyText}
            </span>
            <span className="text-white/60 bg-[#0f172a] px-1.5 py-0.2 rounded text-[8px] border border-[#1e293b]">
              {snapshot.timeSec.toFixed(1)}s / 32s
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#0f172a] rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#38bdf8] via-[#f59e0b] to-[#10b981] transition-all duration-500 rounded-full shadow-[0_0_8px_#10b981]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. ÁREA CENTRAL: MAPA DEL GRAFO FINANCIERO Y CICLOS               */}
      {/* ================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col justify-between py-2 gap-2">
        
        {/* Dynamic Phase Banner */}
        <div className="p-2.5 rounded-xl bg-[#0b1120]/90 border border-[#1e293b] backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base shrink-0">
              {snapshot.phase === 'CYCLE_DETECTION'
                ? '🚨'
                : snapshot.phase === 'ANOMALY_LOOP'
                ? '⚠️'
                : snapshot.phase === 'MITIGATION_SHIELD'
                ? '🛡️'
                : '💳'}
            </span>
            <div className="min-w-0">
              <div className="text-[10px] font-mono font-bold text-white tracking-wider truncate">
                {snapshot.stepTitle}
              </div>
              <div
                className="text-[8px] font-mono truncate font-semibold"
                style={{ color: snapshot.statusBadgeColor }}
              >
                {snapshot.description.slice(0, 52)}...
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#0f172a] text-[#38bdf8] border border-[#1e293b] text-[9px] font-mono font-bold shrink-0">
            {snapshot.stepIndex + 1}/4
          </span>
        </div>

        {/* GRAPH CANVAS */}
        <div className="relative flex-1 min-h-[300px] bg-[#070b14] rounded-2xl border border-[#1e293b] p-2 overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* Phase 3 Shockwave */}
          {snapshot.shockwaveActive && (
            <div className="absolute top-[50%] left-[50%] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0">
              <div className="w-64 h-64 rounded-full border-2 border-[#ef4444] animate-ping opacity-40" />
              <div className="absolute inset-0 w-96 h-96 -ml-16 -mt-16 rounded-full border border-[#ef4444]/60 animate-pulse" />
            </div>
          )}

          {/* Phase 4 Emerald Shield Quarantine Ring */}
          {snapshot.shieldActive && (
            <div className="absolute top-[50%] left-[50%] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-[210px] h-[160px] rounded-[36px] border-2 border-[#10b981] shadow-[0_0_24px_rgba(16,185,129,0.4)] bg-[#022c22]/20 flex flex-col items-center justify-start pt-1">
                <span className="px-2 py-0.5 rounded-full bg-[#022c22] border border-[#10b981] text-[8px] font-mono font-black text-[#10b981] shadow-sm -mt-3.5">
                  🛡️ CLÚSTER AISLADO
                </span>
              </div>
            </div>
          )}

          {/* SVG Edges Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {snapshot.edges.map((edge) => {
              const fromNode = getNode(edge.from);
              const toNode = getNode(edge.to);
              if (!fromNode || !toNode) return null;

              const isFraud = edge.status === 'fraud';
              const isWarning = edge.status === 'warning';
              const isSafe = edge.status === 'safe';
              const isDisconnected = edge.status === 'disconnected';

              let strokeColor = '#1e293b';
              let strokeWidth = 2.5;
              let isDashed = false;

              if (isFraud) {
                strokeColor = '#ef4444';
                strokeWidth = 5;
              } else if (isWarning) {
                strokeColor = '#f59e0b';
                strokeWidth = 4;
              } else if (isSafe) {
                strokeColor = '#10b981';
                strokeWidth = 3;
              } else if (isDisconnected) {
                strokeColor = '#334155';
                strokeWidth = 1;
                isDashed = true;
              }

              return (
                <g key={edge.id}>
                  <line
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={isDashed ? '4 4' : undefined}
                    strokeLinecap="round"
                    className={isFraud || isWarning ? 'animate-pulse' : ''}
                    style={{
                      filter: isFraud
                        ? 'drop-shadow(0 0 8px #ef4444)'
                        : isWarning
                        ? 'drop-shadow(0 0 6px #f59e0b)'
                        : undefined,
                    }}
                  />
                  {/* Amount chip on edge */}
                  <text
                    x={`${(fromNode.x + toNode.x) / 2}%`}
                    y={`${(fromNode.y + toNode.y) / 2}%`}
                    fill={isFraud ? '#fca5a5' : isWarning ? '#fde68a' : isSafe ? '#86efac' : '#475569'}
                    fontSize="7"
                    fontFamily="monospace"
                    fontWeight="bold"
                    dy="-3"
                    textAnchor="middle"
                  >
                    {edge.amount}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Nodes */}
          <div className="relative w-full h-full z-20">
            {snapshot.nodes.map((node) => {
              const isFraud = node.status === 'fraud';
              const isWarning = node.status === 'warning';
              const isQuarantined = node.status === 'quarantined';
              const isLegit = node.status === 'legit';

              let borderColor = '#334155';
              let ringColor = 'rgba(51, 65, 85, 0.4)';
              let nodeBg = '#0f172a';
              let textColor = '#cbd5e1';

              if (isFraud) {
                borderColor = '#ef4444';
                ringColor = 'rgba(239, 68, 68, 0.6)';
                nodeBg = '#1c0a0a';
                textColor = '#fecaca';
              } else if (isWarning) {
                borderColor = '#f59e0b';
                ringColor = 'rgba(245, 158, 11, 0.6)';
                nodeBg = '#261504';
                textColor = '#fef3c7';
              } else if (isQuarantined) {
                borderColor = '#475569';
                ringColor = 'rgba(71, 85, 105, 0.3)';
                nodeBg = '#11131a';
                textColor = '#64748b';
              } else if (isLegit) {
                borderColor = '#38bdf8';
                ringColor = 'rgba(56, 189, 248, 0.3)';
                textColor = '#e0f2fe';
              }

              return (
                <div
                  key={node.id}
                  className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                  }}
                >
                  {/* Node Circle */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-md font-mono font-black text-[11px]"
                    style={{
                      backgroundColor: nodeBg,
                      borderColor: borderColor,
                      boxShadow: `0 0 10px ${ringColor}`,
                      color: textColor,
                    }}
                  >
                    {node.id}
                  </div>

                  {/* Subtitle tag */}
                  <span className="mt-1 px-1.5 py-0.2 rounded text-[7px] font-mono font-bold bg-[#0b1120] border border-[#1e293b] text-[#94a3b8] whitespace-nowrap shadow">
                    {node.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Phase 2: Anomaly Speed Banner */}
          {snapshot.anomalyRateText && (
            <div className="absolute top-[22%] left-[50%] -translate-x-1/2 px-2.5 py-1 rounded-xl bg-[#291804]/95 border border-[#f59e0b] shadow-[0_0_16px_rgba(245,158,11,0.5)] z-30 flex items-center gap-1.5 animate-bounce">
              <span className="text-xs">⚠️</span>
              <span className="text-[8px] font-mono font-black text-[#fef3c7] tracking-wider">
                {snapshot.anomalyRateText}
              </span>
            </div>
          )}

          {/* Phase 3: Glassmorphism Fraud Alert Card */}
          {snapshot.alertCardActive && (
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[85%] p-3.5 rounded-2xl bg-[#1c0a0a]/95 border-2 border-[#ef4444] shadow-[0_0_30px_rgba(239,68,68,0.7)] backdrop-blur-xl z-40 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-1.5 text-xs font-mono font-black text-[#fecaca] tracking-wider mb-1">
                <span>🚨</span>
                <span>CICLO DE LAVADO DETECTADO</span>
              </div>
              <div className="text-[8px] font-mono text-white/80 mb-2">
                A ➔ B ➔ C ➔ D ➔ A (Cadencia: 120ms)
              </div>
              <div className="text-2xl font-mono font-black text-[#ef4444] tracking-widest my-1 drop-shadow-[0_0_12px_#ef4444]">
                {snapshot.riskScore}
              </div>
              <div className="w-full mt-1.5 py-1 px-2 rounded-lg bg-[#450a0a] border border-[#ef4444] text-[9px] font-mono font-black text-white flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
                <span>{snapshot.actionText}</span>
              </div>
            </div>
          )}
        </div>

        {/* =============================================================== */}
        {/* 3. ALGORITMO TARJAN SCC / JOHNSON CYCLE DETECTOR                */}
        {/* =============================================================== */}
        <div className="p-2.5 rounded-2xl bg-[#0b1120]/95 border border-[#1e293b] shadow-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono font-bold text-[#38bdf8] tracking-wider flex items-center gap-1">
              <span>🧠</span> MOTOR DISTRIBUIDO: TARJAN SCC
            </span>
            <span className="text-[8px] font-mono text-[#10b981] font-bold">
              0 Fugas
            </span>
          </div>

          <div className="p-2 rounded-xl bg-[#070b14] border border-[#1e293b] flex items-center justify-around gap-1 text-[9px] font-mono font-bold text-center">
            <div className="flex flex-col">
              <span className="text-[#64748b] text-[7px]">COMPLEJIDAD</span>
              <span className="text-[#38bdf8]">O(V + E)</span>
            </div>
            <span className="text-[#334155]">|</span>
            <div className="flex flex-col">
              <span className="text-[#64748b] text-[7px]">EVALUACIÓN</span>
              <span className="text-[#f59e0b]">Streaming Window</span>
            </div>
            <span className="text-[#334155]">|</span>
            <div className="flex flex-col">
              <span className="text-[#64748b] text-[7px]">RESULTADO</span>
              <span className="text-[#10b981]">Fondos Aislados</span>
            </div>
          </div>
        </div>

      </div>

      {/* ================================================================= */}
      {/* 4. FOOTER: TELEMETRÍA Y RESUMEN                                   */}
      {/* ================================================================= */}
      <div className="relative z-20 pt-2 border-t border-[#1e293b]">
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#06141a] via-[#0b1120] to-[#06141a] border border-[#10b981]/40 shadow-lg flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-black text-[#10b981] tracking-wider truncate">
                🛡️ RED SEGURA • 0 FUGAS
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#10b981]/20 text-[#86efac] text-[8px] font-mono font-bold border border-[#10b981]/40">
                $179.4k RECUPERADOS
              </span>
            </div>
            <p className="text-[8px] text-[#cbd5e1] leading-tight line-clamp-2 mt-0.5">
              {snapshot.description}
            </p>
          </div>
          <span className="px-2 py-1 rounded bg-[#10b981] text-[#06080f] text-[9px] font-mono font-black shrink-0 shadow-md">
            P{snapshot.stepIndex + 1}
          </span>
        </div>
      </div>
    </div>
  );
};
