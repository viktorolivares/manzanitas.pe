import React from 'react';
import {
  Brain,
  Sparkles,
  Globe,
  Crown,
  User,
  Compass,
} from 'lucide-react';
import { EmbeddingSnapshot } from '../data/embeddingAlgorithm';
import { COMPANY_NAME } from '../config/appConfig';

interface EmbeddingVerticalViewportProps {
  snapshot: EmbeddingSnapshot;
}

export const EmbeddingVerticalViewport: React.FC<EmbeddingVerticalViewportProps> = ({ snapshot }) => {
  const totalDuration = 32.0;
  const progressPercent = Math.min(100, Math.max(0, (snapshot.timeSec / totalDuration) * 100));

  return (
    <div className="relative w-full max-w-[440px] aspect-[9/16] bg-[#07090e] border-2 border-[#1f2937] rounded-[34px] overflow-hidden shadow-2xl flex flex-col p-4 sm:p-5 select-none ring-1 ring-[#38bdf8]/20">
      {/* Background isometric/subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ================================================================= */}
      {/* 1. HEADER FLOTANTE & BRANDING (codevo.pe • GUÍA VISUAL DE IA)     */}
      {/* ================================================================= */}
      <div className="relative z-20 pb-2 border-b border-[#1f2937]">
        <div className="flex items-center justify-between">
          {/* Brand with pulsing neon green status indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981] shadow-[0_0_8px_#10b981]"></span>
            </span>
            <span className="font-mono font-black text-white text-base tracking-[0.2em]">
              {COMPANY_NAME}
            </span>
          </div>

          {/* Badge respetuoso y profesional */}
          <div className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#111827] text-[#38bdf8] border border-[#374151] shadow-sm">
            GUÍA VISUAL DE IA
          </div>
        </div>

        {/* Dynamic Telemetry Sub-row with live clock */}
        <div className="flex items-center justify-between mt-1 text-[9px] font-mono text-[#9ca3af]">
          <span>¿Cómo entiende una IA las palabras?</span>
          <div className="flex items-center gap-2">
            <span className="text-[#38bdf8] font-bold">
              {snapshot.phaseLabel}
            </span>
            <span className="text-white/60 bg-[#1e293b] px-1.5 py-0.2 rounded text-[8px]">
              {snapshot.timeSec.toFixed(1)}s / 32.0s
            </span>
          </div>
        </div>

        {/* Progress Bar (Min 30s guarantee) */}
        <div className="w-full h-1 bg-[#1e293b] rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#38bdf8] via-[#a855f7] to-[#fbbf24] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. ÁREA VISUAL PRINCIPAL (EL MAPA DE SIGNIFICADOS)               */}
      {/* ================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col justify-between py-2 gap-2">
        
        {/* Banner de paso actual y subtítulo explicativo */}
        <div className="p-2.5 rounded-xl bg-[#111827]/90 border border-[#1f2937] backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Brain className="w-4 h-4 text-[#38bdf8] shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] font-mono font-bold text-white tracking-wider truncate">
                {snapshot.stepTitle}
              </div>
              <div className="text-[8px] text-[#9ca3af] font-mono truncate">
                {snapshot.phase === 'WORDS'
                  ? 'Palabras aisladas sin coordenadas ni relaciones'
                  : snapshot.phase === 'GRID'
                  ? 'Ejes semánticos: Género (X) y Estatus Social (Y)'
                  : snapshot.phase === 'COORDINATES'
                  ? 'Asignando vectores: Cada idea es una posición [X, Y]'
                  : snapshot.phase === 'VECTORS'
                  ? 'Flechas vectoriales: La dirección codifica significado'
                  : snapshot.phase === 'EQUATION'
                  ? 'Álgebra de vectores: Rey - Hombre + Mujer = Reina'
                  : snapshot.phase === 'DIMENSIONS'
                  ? 'En modelos reales (LLM) el mapa tiene 1536 dimensiones'
                  : 'Un embedding es un puente entre lenguaje y álgebra'}
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 text-[9px] font-mono font-bold shrink-0">
            {snapshot.stepIndex + 1}/11
          </span>
        </div>

        {/* EL MAPA SEMÁNTICO (CANVAS 2D) */}
        <div className="relative flex-1 min-h-[250px] bg-[#0c101d] rounded-2xl border border-[#1e293b] p-3 overflow-hidden flex items-center justify-center shadow-inner">
          
          {/* Ejes cartesianos */}
          {snapshot.gridVisible && (
            <>
              {/* Eje X (Horizontal: Género) */}
              <div className="absolute w-[88%] h-[2px] bg-[#334155]/80 flex items-center justify-between px-1 pointer-events-none z-0">
                <span className="text-[8px] font-mono font-bold text-[#38bdf8] bg-[#0c101d] px-1 -ml-1 rounded border border-[#334155]/40">
                  &lt;- Masculino
                </span>
                <span className="text-[8px] font-mono font-bold text-[#ec4899] bg-[#0c101d] px-1 -mr-1 rounded border border-[#334155]/40">
                  Femenino -&gt;
                </span>
              </div>

              {/* Eje Y (Vertical: Nobleza / Estatus) */}
              <div className="absolute h-[84%] w-[2px] bg-[#334155]/80 flex flex-col items-center justify-between py-1 pointer-events-none z-0">
                <span className="text-[8px] font-mono font-bold text-[#fbbf24] bg-[#0c101d] px-1 -mt-1 rounded border border-[#334155]/40">
                  + Nobleza (+1.0)
                </span>
                <span className="text-[8px] font-mono font-bold text-[#94a3b8] bg-[#0c101d] px-1 -mb-1 rounded border border-[#334155]/40">
                  - Común (-1.0)
                </span>
              </div>

              {/* Centro / Origen (0,0) */}
              <div className="absolute w-2 h-2 rounded-full bg-[#475569]/60 z-0" />
            </>
          )}

          {/* Flechas Vectoriales (Relación Hombre -> Rey y Mujer -> Reina) */}
          {snapshot.arrowsVisible && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <marker
                  id="arrow-gold"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#fbbf24" />
                </marker>
                <marker
                  id="arrow-purple"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#a855f7" />
                </marker>
              </defs>

              {/* Flecha 1: Hombre a Rey -> sube hacia arriba */}
              <line
                x1="28%"
                y1="66%"
                x2="28%"
                y2="34%"
                stroke="#fbbf24"
                strokeWidth="3"
                strokeDasharray="4 3"
                markerEnd="url(#arrow-gold)"
                className="animate-pulse"
              />
              <text x="30%" y="50%" fill="#fbbf24" fontSize="8" fontFamily="monospace" fontWeight="bold">
                + Nobleza
              </text>

              {/* Flecha 2: Mujer a Reina -> sube hacia arriba */}
              <line
                x1="72%"
                y1="66%"
                x2="72%"
                y2="34%"
                stroke="#a855f7"
                strokeWidth="3"
                strokeDasharray="4 3"
                markerEnd="url(#arrow-purple)"
                className="animate-pulse"
              />
              <text x="74%" y="50%" fill="#a855f7" fontSize="8" fontFamily="monospace" fontWeight="bold">
                + Nobleza
              </text>
            </svg>
          )}

          {/* Renderizado de Palabras como Puntos en el Mapa */}
          <div className="relative w-full h-full flex items-center justify-center">
            {snapshot.words.map((w) => {
              const isGrid = snapshot.gridVisible;
              const posX = isGrid ? w.x * 1.5 : (w.id === 'hombre' ? -120 : w.id === 'mujer' ? -40 : w.id === 'rey' ? 40 : 120);
              const posY = isGrid ? -w.y * 1.2 : 0;
              const isHighlighted = snapshot.highlightWordId === w.id;

              return (
                <div
                  key={w.id}
                  className="absolute flex flex-col items-center transition-all duration-700 ease-out z-20"
                  style={{
                    transform: `translate(${posX}px, ${posY}px)`,
                  }}
                >
                  {/* Word Card */}
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 ${
                      isHighlighted
                        ? 'scale-115 ring-2 ring-white shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                        : 'hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: '#111827',
                      borderColor: w.color,
                      boxShadow: `0 0 14px ${w.color}40`,
                    }}
                  >
                    {w.id === 'hombre' ? (
                      <User className="w-3.5 h-3.5 text-[#38bdf8]" />
                    ) : w.id === 'mujer' ? (
                      <User className="w-3.5 h-3.5 text-[#ec4899]" />
                    ) : w.id === 'rey' ? (
                      <Crown className="w-3.5 h-3.5 text-[#fbbf24]" />
                    ) : (
                      <Crown className="w-3.5 h-3.5 text-[#a855f7]" />
                    )}
                    <span className="text-xs font-bold text-white font-mono">{w.label}</span>
                  </div>

                  {/* Coordinate Pill (Only shown if grid is active) */}
                  {snapshot.gridVisible && (
                    <div
                      className={`mt-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold shadow-sm transition-all duration-300 ${
                        isHighlighted ? 'scale-110 ring-1 ring-white' : ''
                      }`}
                      style={{
                        backgroundColor: `${w.color}22`,
                        color: w.color,
                        border: `1px solid ${w.color}55`,
                      }}
                    >
                      [{w.vector[0] > 0 ? `+${w.vector[0]}` : w.vector[0]}, {w.vector[1] > 0 ? `+${w.vector[1]}` : w.vector[1]}]
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Floating explanation for Phase 1 */}
          {!snapshot.gridVisible && (
            <div className="absolute bottom-3 text-center px-4 py-1.5 rounded-lg bg-[#111827]/90 border border-[#334155] text-[9px] font-mono text-[#94a3b8]">
              ¿Qué tienen en común? Una computadora no lo sabe sin un mapa.
            </div>
          )}

          {/* Real LLM 1536D Notice Overlay in Phase 10 */}
          {snapshot.showDimensionsNotice && (
            <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-[#0f172a]/95 border border-[#8b5cf6]/50 shadow-xl flex items-center justify-between gap-2 z-30 animate-fadeIn">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span className="text-[8px] font-mono text-white leading-tight">
                  <strong className="text-[#38bdf8]">2 Ejes en este demo</strong> -&gt; En modelos reales (Gemini / GPT): <strong className="text-[#a855f7]">1536 dimensiones</strong>
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#8b5cf6]/20 text-[#c084fc] text-[8px] font-mono font-bold border border-[#8b5cf6]/40 shrink-0">
                ℝ^1536
              </span>
            </div>
          )}
        </div>

        {/* =============================================================== */}
        {/* 3. CARD DE LA FÓRMULA MÁGICA (REY - HOMBRE + MUJER = REINA)     */}
        {/* =============================================================== */}
        <div
          className={`relative p-2.5 rounded-2xl bg-[#111827]/95 border transition-all duration-500 shadow-xl ${
            snapshot.equationVisible
              ? 'border-[#fbbf24] shadow-[0_0_18px_rgba(251,191,36,0.25)] opacity-100'
              : 'border-[#1f2937] opacity-60'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono font-bold text-[#fbbf24] tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
              ÁLGEBRA DE SIGNIFICADOS
            </span>
            <span className="text-[8px] font-mono text-[#9ca3af]">
              {snapshot.equationVisible ? 'Cálculo Vectorial Activo' : 'Paso 8-9'}
            </span>
          </div>

          {/* Formula visually highlighted */}
          <div className="p-2 rounded-xl bg-[#0a0f1d] border border-[#1e293b] flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-center">
            <span className="text-[#fbbf24] bg-[#fbbf24]/10 px-1.5 py-0.5 rounded border border-[#fbbf24]/30 flex items-center gap-1">
              <Crown className="w-3 h-3 text-[#fbbf24]" />
              Rey
            </span>
            <span className="text-[#94a3b8]">-</span>
            <span className="text-[#38bdf8] bg-[#38bdf8]/10 px-1.5 py-0.5 rounded border border-[#38bdf8]/30 flex items-center gap-1">
              <User className="w-3 h-3 text-[#38bdf8]" />
              Hombre
            </span>
            <span className="text-[#94a3b8]">+</span>
            <span className="text-[#ec4899] bg-[#ec4899]/10 px-1.5 py-0.5 rounded border border-[#ec4899]/30 flex items-center gap-1">
              <User className="w-3 h-3 text-[#ec4899]" />
              Mujer
            </span>
            <span className="text-[#94a3b8]">=</span>
            <span className={`px-2 py-0.5 rounded border transition-all duration-500 flex items-center gap-1 ${
              snapshot.highlightWordId === 'reina'
                ? 'text-[#a855f7] bg-[#a855f7]/30 border-[#a855f7] shadow-[0_0_12px_#a855f7] scale-105'
                : 'text-[#a855f7] bg-[#a855f7]/10 border-[#a855f7]/40'
            }`}>
              <Crown className="w-3 h-3 text-[#a855f7]" />
              Reina
            </span>
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[8px] font-mono text-[#9ca3af]">
            <span>Si le quitas la masculinidad al Rey y le sumas feminidad:</span>
            <span className="text-[#10b981] font-bold">¡Exactamente Reina!</span>
          </div>
        </div>

      </div>

      {/* ================================================================= */}
      {/* 4. BANNER INFERIOR: EXPLICACIÓN SENCILLA Y DIRECTA               */}
      {/* ================================================================= */}
      <div className="relative z-20 pt-2 border-t border-[#1f2937]">
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#111827] via-[#1e1b4b]/40 to-[#111827] border border-[#38bdf8]/30 shadow-lg flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-mono font-black text-white block tracking-wider truncate flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
              {snapshot.phase === 'SUMMARY'
                ? 'EN RESUMEN: UN EMBEDDING ES UN MAPA'
                : snapshot.stepTitle}
            </span>
            <p className="text-[8px] text-[#cbd5e1] leading-tight line-clamp-2 mt-0.5">
              {snapshot.description}
            </p>
          </div>
          <span className="px-2 py-1 rounded bg-[#38bdf8] text-[#07090e] text-[9px] font-mono font-black shrink-0 shadow-md">
            P{snapshot.stepIndex + 1}
          </span>
        </div>
      </div>
    </div>
  );
};
