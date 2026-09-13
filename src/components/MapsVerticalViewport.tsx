import React from 'react';
import {
  Navigation,
  AlertTriangle,
  MapPin,
  Flag,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import { MapsSnapshot } from '../data/mapsAlgorithm';
import { COMPANY_NAME } from '../config/appConfig';

interface MapsVerticalViewportProps {
  snapshot: MapsSnapshot;
}

export const MapsVerticalViewport: React.FC<MapsVerticalViewportProps> = ({ snapshot }) => {
  const totalDuration = 18.0;
  const progressPercent = Math.min(100, Math.max(0, (snapshot.timeSec / totalDuration) * 100));

  // Find node coordinates helper
  const getNode = (id: string) => snapshot.nodes.find((n) => n.id === id);

  return (
    <div className="relative w-full max-w-[440px] aspect-[9/16] bg-[#06080f] border-2 border-[#1e293b] rounded-[34px] overflow-hidden shadow-2xl flex flex-col p-4 sm:p-5 select-none ring-1 ring-[#38bdf8]/20">
      {/* Tactical Satellite Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ================================================================= */}
      {/* 1. HEADER MINIMALISTA & GPS PULSE (my.app • GOOGLE MAPS A*)    */}
      {/* ================================================================= */}
      <div className="relative z-20 pb-2 border-b border-[#1e293b]">
        <div className="flex items-center justify-between">
          {/* Brand with GPS Green Satellite Pulse */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981] shadow-[0_0_8px_#10b981]"></span>
            </span>
            <span className="font-mono font-black text-white text-base tracking-[0.2em]">
              {COMPANY_NAME}
            </span>
          </div>

          {/* Badge Motor de Navegación A* */}
          <div className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#0b1120] text-[#38bdf8] border border-[#1e293b] shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse"></span>
            <span>GOOGLE MAPS ENGINE • A*</span>
          </div>
        </div>

        {/* Dynamic Telemetry Sub-row */}
        <div className="flex items-center justify-between mt-1 text-[9px] font-mono text-[#9ca3af]">
          <span>Pathfinding Satelital en Tiempo Real</span>
          <div className="flex items-center gap-2">
            <span className="text-[#10b981] font-bold">
              {snapshot.phaseLabel}
            </span>
            <span className="text-white/60 bg-[#0f172a] px-1.5 py-0.2 rounded text-[8px] border border-[#1e293b]">
              {snapshot.timeSec.toFixed(1)}s
            </span>
          </div>
        </div>

        {/* Tactical Progress Bar */}
        <div className="w-full h-1 bg-[#0f172a] rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#38bdf8] via-[#10b981] to-[#38bdf8] transition-all duration-500 rounded-full shadow-[0_0_8px_#10b981]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. ÁREA CENTRAL: MAPA TÁCTICO SATELITAL Y NODOS                  */}
      {/* ================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col justify-between py-2 gap-2">
        
        {/* Dynamic Subtitle Banner */}
        <div className="p-2.5 rounded-xl bg-[#0b1120]/90 border border-[#1e293b] backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Navigation className="w-4 h-4 text-[#38bdf8] shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] font-mono font-bold text-white tracking-wider truncate">
                {snapshot.stepTitle}
              </div>
              <div
                className="text-[8px] font-mono truncate transition-colors duration-300"
                style={{ color: snapshot.subtitleColor }}
              >
                {snapshot.subtitle}
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 text-[9px] font-mono font-bold shrink-0">
            {snapshot.stepIndex + 1}/5
          </span>
        </div>

        {/* MAP CANVAS (CANVAS DE ARISTAS Y NODOS) */}
        <div className="relative flex-1 min-h-[280px] bg-[#070b14] rounded-2xl border border-[#1e293b] p-2 overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* Radar Waves Animation from Origin during Phase 3 */}
          {snapshot.radarActive && (
            <div className="absolute top-[18%] left-[20%] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0">
              <div className="w-48 h-48 rounded-full border-2 border-[#38bdf8] animate-ping opacity-30" />
              <div className="absolute inset-0 w-80 h-80 -ml-16 -mt-16 rounded-full border border-[#38bdf8]/60 animate-pulse" />
            </div>
          )}

          {/* SVG Road Lines Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {snapshot.roads.map((road) => {
              const fromNode = getNode(road.from);
              const toNode = getNode(road.to);
              if (!fromNode || !toNode) return null;

              const isTraffic = road.status === 'traffic';
              const isOptimal = road.status === 'optimal';
              const isScanning = road.status === 'scanning';

              let strokeColor = '#1e293b';
              let strokeWidth = 3;
              let isDashed = false;

              if (isTraffic) {
                strokeColor = '#ef4444';
                strokeWidth = 7;
              } else if (isOptimal) {
                strokeColor = '#10b981';
                strokeWidth = 6;
              } else if (isScanning) {
                strokeColor = '#38bdf8';
                strokeWidth = 4;
                isDashed = true;
              }

              return (
                <g key={road.id}>
                  <line
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={isDashed ? '6 4' : undefined}
                    strokeLinecap="round"
                    className={isTraffic ? 'animate-pulse' : ''}
                    style={{
                      filter: isOptimal
                        ? 'drop-shadow(0 0 8px #10b981)'
                        : isTraffic
                        ? 'drop-shadow(0 0 10px #ef4444)'
                        : undefined,
                    }}
                  />
                  {/* Road distance tag */}
                  <text
                    x={`${(fromNode.x + toNode.x) / 2}%`}
                    y={`${(fromNode.y + toNode.y) / 2}%`}
                    fill={isTraffic ? '#fca5a5' : isOptimal ? '#86efac' : '#64748b'}
                    fontSize="7"
                    fontFamily="monospace"
                    fontWeight="bold"
                    dy="-3"
                    textAnchor="middle"
                  >
                    {isTraffic ? '! +18m' : road.dist}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Nodes */}
          <div className="relative w-full h-full z-20">
            {snapshot.nodes.map((node) => {
              const isOrigin = node.isOrigin;
              const isDest = node.isDestination;
              const isDiscarded = node.status === 'discarded';
              const isOptimal = node.status === 'optimal';
              const isScanning = node.status === 'scanning';

              let borderColor = '#334155';
              let ringColor = '#1e293b';
              let nodeBg = '#0f172a';

              if (isOrigin) {
                borderColor = '#38bdf8';
                ringColor = 'rgba(56, 189, 248, 0.4)';
              } else if (isDest) {
                borderColor = '#10b981';
                ringColor = 'rgba(16, 185, 129, 0.4)';
              } else if (isOptimal) {
                borderColor = '#10b981';
                ringColor = 'rgba(16, 185, 129, 0.3)';
              } else if (isDiscarded) {
                borderColor = '#ef4444';
              } else if (isScanning) {
                borderColor = '#38bdf8';
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
                  {/* Pin label for Origin or Destination */}
                  {isOrigin && (
                    <div className="absolute -top-7 px-2 py-0.5 rounded-full bg-[#0b1120] border border-[#38bdf8] text-[8px] font-mono font-black text-[#38bdf8] shadow-[0_0_8px_#38bdf8] whitespace-nowrap flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" />
                      <span>TU AUTO</span>
                    </div>
                  )}
                  {isDest && (
                    <div className="absolute -bottom-7 px-2 py-0.5 rounded-full bg-[#0b1120] border border-[#10b981] text-[8px] font-mono font-black text-[#10b981] shadow-[0_0_8px_#10b981] whitespace-nowrap flex items-center gap-1">
                      <Flag className="w-2.5 h-2.5" />
                      <span>OFICINA</span>
                    </div>
                  )}

                  {/* Node Circle */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-md"
                    style={{
                      backgroundColor: nodeBg,
                      borderColor: borderColor,
                      boxShadow: `0 0 10px ${ringColor}`,
                    }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: borderColor }}
                    />
                  </div>

                  {/* Cost chip if present */}
                  {node.costText && (
                    <span className="mt-1 px-1.5 py-0.2 rounded text-[7px] font-mono font-bold bg-[#0b1120] border border-[#334155] text-white shadow">
                      {node.costText}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Traffic Warning Floating Banner (Phase 2 & 3) */}
          {snapshot.trafficActive && (
            <div className="absolute top-[52%] left-[45%] -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-[#450a0a]/90 border border-[#ef4444] shadow-[0_0_16px_rgba(239,68,68,0.5)] z-30 flex items-center gap-1.5 animate-bounce">
              <AlertTriangle className="w-3.5 h-3.5 text-[#ef4444]" />
              <span className="text-[9px] font-mono font-black text-[#fecaca] tracking-wide">
                TRÁFICO PESADO +18 MIN
              </span>
            </div>
          )}

          {/* Traveling Photon Particle when winning route is active */}
          {snapshot.winningRouteActive && (
            <div
              className="absolute w-4 h-4 rounded-full bg-white border-2 border-[#10b981] shadow-[0_0_14px_#10b981] z-30 transition-all duration-700 ease-in-out -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${getNode(snapshot.particlePosNodeId || 'H')?.x}%`,
                top: `${getNode(snapshot.particlePosNodeId || 'H')?.y}%`,
              }}
            />
          )}
        </div>

        {/* =============================================================== */}
        {/* 3. CARD DE LA FÓRMULA A* : f(n) = g(n) + h(n)                   */}
        {/* =============================================================== */}
        <div className="p-2.5 rounded-2xl bg-[#0b1120]/95 border border-[#1e293b] shadow-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono font-bold text-[#38bdf8] tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#38bdf8]" />
              ALGORITMO A* EN TIEMPO REAL
            </span>
            <span className="text-[8px] font-mono text-[#10b981] font-bold">
              Latencia: 4.2 ms
            </span>
          </div>

          <div className="p-2 rounded-xl bg-[#070b14] border border-[#1e293b] flex items-center justify-center gap-2 text-xs font-mono font-bold text-center">
            <span className="text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/30">
              f(n)
            </span>
            <span className="text-[#64748b]">=</span>
            <span className="text-[#fbbf24] bg-[#fbbf24]/10 px-2 py-0.5 rounded border border-[#fbbf24]/30">
              g(n) [Tiempo Real]
            </span>
            <span className="text-[#64748b]">+</span>
            <span className="text-[#ec4899] bg-[#ec4899]/10 px-2 py-0.5 rounded border border-[#ec4899]/30">
              h(n) [Heurística]
            </span>
          </div>
        </div>

      </div>

      {/* ================================================================= */}
      {/* 4. TELEMETRÍA FINAL: RESUMEN DE RUTA Y AHORRO                    */}
      {/* ================================================================= */}
      <div className="relative z-20 pt-2 border-t border-[#1e293b]">
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#06141a] via-[#0b1120] to-[#06141a] border border-[#10b981]/40 shadow-lg flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
              <span className="text-[10px] font-mono font-black text-[#10b981] tracking-wider truncate">
                RUTA ÓPTIMA: 12 MIN
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#10b981]/20 text-[#86efac] text-[8px] font-mono font-bold border border-[#10b981]/40">
                -6 MIN
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
