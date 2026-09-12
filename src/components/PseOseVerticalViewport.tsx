import React from 'react';
import { PseOseSnapshot } from '../data/pseOseAlgorithm';

interface PseOseVerticalViewportProps {
  snapshot: PseOseSnapshot;
}

export const PseOseVerticalViewport: React.FC<PseOseVerticalViewportProps> = ({ snapshot }) => {
  const totalDuration = 33.0;
  const progressPercent = Math.min(100, Math.max(0, (snapshot.timeSec / totalDuration) * 100));

  return (
    <div className="relative w-full max-w-[440px] aspect-[9/16] bg-[#050811] border-2 border-[#1e293b] rounded-[34px] overflow-hidden shadow-2xl flex flex-col p-4 sm:p-5 select-none ring-1 ring-[#10b981]/20">
      {/* Tactical Financial / Cloud Network Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ================================================================= */}
      {/* 1. HEADER SUPERIOR (codevo.pe • ARQUITECTURA CLOUD • PSE / OSE)   */}
      {/* ================================================================= */}
      <div className="relative z-20 pb-2 border-b border-[#1e293b]">
        <div className="flex items-center justify-between">
          {/* Brand with green neon dot */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981] shadow-[0_0_8px_#10b981]"></span>
            </span>
            <span className="font-mono font-black text-white text-base tracking-[0.2em]">
              codevo.pe
            </span>
          </div>

          {/* Right Badge: ARQUITECTURA CLOUD • PSE / OSE */}
          <div
            className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold bg-[#0f172a] border transition-all duration-300 shadow-sm flex items-center gap-1.5"
            style={{
              borderColor: snapshot.badgeColor,
              color: snapshot.badgeColor,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: snapshot.badgeColor }}
            />
            <span className="truncate max-w-[190px]">{snapshot.badgeText}</span>
          </div>
        </div>

        {/* Dynamic Telemetry: Subtitle & Step Counter */}
        <div className="flex items-center justify-between mt-1 text-[9px] font-mono">
          <span className="text-[#38bdf8] font-bold">DESACOPLAMIENTO DE SERVIDORES SUNAT</span>
          <div className="flex items-center gap-2">
            <span
              className="font-bold tracking-wider truncate max-w-[160px]"
              style={{ color: snapshot.statusColor }}
            >
              {snapshot.statusText}
            </span>
            <span className="text-white/70 bg-[#0f172a] px-1.5 py-0.2 rounded text-[8px] border border-[#1e293b]">
              {snapshot.timeSec.toFixed(1)}s / 33s
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#0f172a] rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#38bdf8] via-[#8b5cf6] to-[#10b981] transition-all duration-500 rounded-full shadow-[0_0_8px_#10b981]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. ÁREA CENTRAL: TOPOLOGÍA DE RED DE 4 NODOS (APP, PSE, OSE, SUNAT) */}
      {/* ================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col justify-between py-2 gap-2">
        
        {/* Dynamic Step Banner */}
        <div className="p-2.5 rounded-xl bg-[#0f172a]/95 border border-[#1e293b] backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base shrink-0">
              {snapshot.phase === 'JSON_PAYLOAD'
                ? '⚡'
                : snapshot.phase === 'TRANSFORMACION_PSE'
                ? '⚙️'
                : snapshot.phase === 'FIRMA_PSE'
                ? '🔐'
                : snapshot.phase === 'ENVIO_OSE'
                ? '🚀'
                : snapshot.phase === 'BYPASS_SUNAT'
                ? '🛡️'
                : snapshot.phase === 'VALIDACION_OSE'
                ? '🔍'
                : snapshot.phase === 'CDR_GENERADO'
                ? '🏛️'
                : snapshot.phase === 'RETORNO_APP'
                ? '✅'
                : '📡'}
            </span>
            <div className="min-w-0">
              <div className="text-[10px] font-mono font-bold text-white tracking-wider truncate">
                {snapshot.stepTitle}
              </div>
              <div
                className="text-[8px] font-mono truncate font-semibold"
                style={{ color: snapshot.statusColor }}
              >
                {snapshot.description.slice(0, 56)}...
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#0b1120] text-[#38bdf8] border border-[#1e293b] text-[9px] font-mono font-bold shrink-0">
            {snapshot.stepIndex + 1}/10
          </span>
        </div>

        {/* TOPOLOGY CANVAS WITH 4 NODES */}
        <div className="relative flex-1 min-h-[300px] bg-[#070b14] rounded-2xl border border-[#1e293b] p-2 overflow-hidden shadow-inner">
          
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* TU APP ➔ PSE (Horizontal superior) */}
            <line
              x1="28%"
              y1="22%"
              x2="72%"
              y2="22%"
              stroke={['JSON_PAYLOAD', 'TRANSFORMACION_PSE'].includes(snapshot.phase) ? '#38bdf8' : '#1e293b'}
              strokeWidth={snapshot.phase === 'JSON_PAYLOAD' ? '3.5' : '1.5'}
              strokeDasharray="4 4"
              className={snapshot.phase === 'JSON_PAYLOAD' ? 'animate-pulse' : ''}
            />

            {/* PSE ➔ OSE (Diagonal) */}
            <line
              x1="70%"
              y1="28%"
              x2="50%"
              y2="50%"
              stroke={['ENVIO_OSE', 'VALIDACION_OSE'].includes(snapshot.phase) ? '#10b981' : '#1e293b'}
              strokeWidth={snapshot.phase === 'ENVIO_OSE' ? '4' : '2'}
              strokeDasharray="4 4"
              className={snapshot.phase === 'ENVIO_OSE' ? 'animate-pulse' : ''}
            />

            {/* OSE ➔ SUNAT (Vertical descendente asíncrona) */}
            <line
              x1="50%"
              y1="64%"
              x2="50%"
              y2="82%"
              stroke={['SYNC_ASINCRONA', 'ARQUITECTURA_RESILIENTE'].includes(snapshot.phase) ? '#0284c7' : '#1e293b'}
              strokeWidth={snapshot.phase === 'SYNC_ASINCRONA' ? '3.5' : '1.5'}
              strokeDasharray="4 4"
              className={snapshot.phase === 'SYNC_ASINCRONA' ? 'animate-pulse' : ''}
            />

            {/* Bypass Arc Indicator */}
            {snapshot.phase === 'BYPASS_SUNAT' && (
              <path
                d="M 60 80 C 10 140, 10 220, 80 270"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
            )}
          </svg>

          {/* ============================================================= */}
          {/* NODO 1: [TU APP / ERP] (Izquierda Superior)                    */}
          {/* ============================================================= */}
          <div
            className={`absolute top-[10%] left-[4%] w-[38%] p-2 rounded-xl bg-[#0b1120]/95 border transition-all duration-300 z-20 shadow-md ${
              snapshot.activeNodes.app
                ? 'border-[#38bdf8] shadow-[0_0_16px_rgba(56,189,248,0.4)] scale-105'
                : 'border-[#1e293b]'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-xs">💻</span>
              <span className="text-[9px] font-mono font-black text-white tracking-wider truncate">
                TU APP / ERP
              </span>
            </div>
            <div className="text-[7px] text-[#38bdf8] font-mono font-bold">
              REST JSON • Sin SOAP
            </div>
            <div className="text-[6.5px] text-[#94a3b8] font-mono truncate">
              POST /v1/invoices
            </div>
          </div>

          {/* ============================================================= */}
          {/* NODO 2: [SERVIDOR PSE] (Derecha Superior)                      */}
          {/* ============================================================= */}
          <div
            className={`absolute top-[10%] right-[4%] w-[38%] p-2 rounded-xl bg-[#0b1120]/95 border transition-all duration-300 z-20 shadow-md ${
              snapshot.activeNodes.pse
                ? 'border-[#8b5cf6] shadow-[0_0_16px_rgba(139,92,246,0.4)] scale-105'
                : 'border-[#1e293b]'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-xs">⚙️</span>
              <span className="text-[9px] font-mono font-black text-white tracking-wider truncate">
                SERVIDOR PSE
              </span>
            </div>
            <div className="text-[7px] text-[#c084fc] font-mono font-bold">
              Transformador UBL 2.1
            </div>
            <div className="text-[6.5px] text-[#94a3b8] font-mono truncate">
              Firma con Cert. PSE
            </div>
          </div>

          {/* ============================================================= */}
          {/* NODO 3: [OPERADOR OSE] (Centro Destacado)                     */}
          {/* ============================================================= */}
          <div
            className={`absolute top-[42%] left-[50%] -translate-x-1/2 w-[68%] p-2.5 rounded-2xl bg-[#06171a]/95 border-2 transition-all duration-500 z-20 shadow-xl ${
              snapshot.activeNodes.ose
                ? 'border-[#10b981] shadow-[0_0_24px_rgba(16,185,129,0.5)] scale-105'
                : 'border-[#10b981]/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="px-1.5 py-0.2 rounded bg-[#022c22] text-[#10b981] border border-[#10b981]/40 text-[7px] font-mono font-black tracking-wider">
                ✓ NODO OFICIAL OSE • AUDITORÍA
              </span>
              <span className="text-[7px] font-mono text-[#86efac] font-bold">SLA 99.99%</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-sm">🏛️</span>
              <div>
                <span className="text-[10px] font-mono font-black text-white tracking-wider block">
                  OPERADOR OSE (TRIBUNAL)
                </span>
                <span className="text-[7px] font-mono font-bold text-[#10b981]">
                  AUTORIDAD DELEGADA SUNAT
                </span>
              </div>
            </div>

            <div className="mt-1 pt-1 border-t border-[#1e293b] flex items-center justify-between text-[6.5px] font-mono">
              <span className="text-[#94a3b8]">Emisión Directa de CDR</span>
              <span className="text-[#86efac] font-bold">&lt; 50ms Latencia</span>
            </div>
          </div>

          {/* ============================================================= */}
          {/* NODO 4: [SUNAT BASE CENTRAL] (Centro Inferior / Asíncrono)     */}
          {/* ============================================================= */}
          <div
            className={`absolute bottom-[4%] left-[50%] -translate-x-1/2 w-[62%] p-2 rounded-xl bg-[#0a1020]/95 border transition-all duration-300 z-20 shadow-md ${
              snapshot.activeNodes.sunat
                ? 'border-[#0284c7] shadow-[0_0_18px_rgba(2,132,199,0.5)] scale-105'
                : 'border-[#1e293b]'
            }`}
          >
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-1">
                <div className="flex items-end gap-0.5">
                  <div className="w-1 h-2.5 rounded-xs bg-[#e11d48]" />
                  <div className="w-1 h-3.5 rounded-xs bg-[#0284c7]" />
                  <div className="w-1 h-2 rounded-xs bg-[#0284c7]" />
                  <div className="w-1 h-4 rounded-xs bg-[#0369a1]" />
                </div>
                <span className="text-[9px] font-mono font-black text-white tracking-wider">
                  SUNAT (DATA LAKE)
                </span>
              </div>
              <span className="text-[6.5px] font-mono text-[#38bdf8] font-bold">ASÍNCRONO</span>
            </div>
            <div className="text-[6.5px] text-[#64748b] font-mono truncate text-center">
              Repositorio Histórico y Fiscalización Posterior
            </div>
          </div>

          {/* ============================================================= */}
          {/* PAQUETE VIAJERO EN VUELO (JSON / UBL / ZIP / CDR / BATCH)      */}
          {/* ============================================================= */}
          <div
            className="absolute transition-all duration-700 z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${snapshot.packetPosition.x}%`,
              top: `${snapshot.packetPosition.y}%`,
            }}
          >
            {snapshot.packetType === 'json' && (
              <div className="px-2.5 py-1.5 rounded-xl bg-[#0c192e] border border-[#38bdf8] shadow-[0_0_14px_#38bdf8] text-center">
                <div className="text-[8px] font-mono font-bold text-white">⚡ JSON VENTA</div>
                <div className="text-[6px] font-mono text-[#38bdf8]">1.2 KB • Sin SOAP</div>
              </div>
            )}

            {snapshot.packetType === 'ubl' && (
              <div className="px-2.5 py-1.5 rounded-xl bg-[#1e1b4b] border border-[#8b5cf6] shadow-[0_0_14px_#8b5cf6] text-center">
                <div className="text-[8px] font-mono font-bold text-white">📑 XML UBL 2.1</div>
                <div className="text-[6px] font-mono text-[#d8b4fe]">OASIS Invoice-2.1</div>
              </div>
            )}

            {snapshot.packetType === 'zip_firmado' && (
              <div className="px-2.5 py-1.5 rounded-xl bg-[#2a1705] border border-[#f59e0b] shadow-[0_0_16px_#f59e0b] text-center">
                <div className="text-[8px] font-mono font-bold text-white">📦 ZIP CON CERT. PSE</div>
                <div className="text-[6px] font-mono text-[#fde68a]">sendBill ➔ Troncal OSE</div>
              </div>
            )}

            {snapshot.packetType === 'cdr_ose' && (
              <div className="px-2.5 py-1.5 rounded-xl bg-[#022c22] border border-[#10b981] shadow-[0_0_18px_#10b981] text-center">
                <div className="text-[8px] font-mono font-black text-[#10b981]">✓ CDR ACEPTADO (0)</div>
                <div className="text-[6px] font-mono text-white">Firma Oficial OSE</div>
              </div>
            )}

            {snapshot.packetType === 'sync_batch' && (
              <div className="px-2.5 py-1.5 rounded-xl bg-[#061426] border border-[#0284c7] shadow-[0_0_16px_#0284c7] text-center">
                <div className="text-[8px] font-mono font-bold text-[#38bdf8]">BATCH ASÍNCRONO</div>
                <div className="text-[6px] font-mono text-[#93c5fd]">Lote ➔ SUNAT Lake</div>
              </div>
            )}
          </div>

          {/* BYPASS BANNER OVERLAY */}
          {snapshot.phase === 'BYPASS_SUNAT' && (
            <div className="absolute top-[28%] left-[50%] -translate-x-1/2 w-[88%] p-2 rounded-xl bg-[#1c1917]/95 border-2 border-[#f59e0b] shadow-[0_0_24px_rgba(245,158,11,0.5)] backdrop-blur-md z-40 text-center animate-in zoom-in-95 duration-300">
              <span className="text-[8px] font-mono font-black text-[#f59e0b] block">
                ⚡ BYPASS: SERVIDORES SUNAT LIBRES DE ESTRÉS
              </span>
              <span className="text-[6.5px] text-[#fde68a] block mt-0.5">
                Cero caídas en Cyber Days, Navidad o Cierre Fiscal de Mes.
              </span>
            </div>
          )}

        </div>

        {/* =============================================================== */}
        {/* 3. ALGORITMO CLOUD & ESPECIFICACIÓN TÉCNICA DINÁMICA            */}
        {/* =============================================================== */}
        <div className="p-2.5 rounded-2xl bg-[#0f172a]/95 border border-[#1e293b] shadow-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono font-bold text-[#38bdf8] tracking-wider flex items-center gap-1">
              <span>⚙️</span> ESPECIFICACIÓN CLOUD
            </span>
            <span className="text-[8px] font-mono text-[#10b981] font-bold">
              Latencia: {snapshot.technicalDetails.sla}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-[#070b14] border border-[#1e293b] grid grid-cols-3 gap-1 text-[8px] font-mono font-bold text-center">
            <div className="flex flex-col">
              <span className="text-[#64748b] text-[6.5px]">PROTOCOLO</span>
              <span className="text-[#f59e0b] truncate">{snapshot.technicalDetails.protocol}</span>
            </div>
            <div className="flex flex-col border-x border-[#1e293b] px-1">
              <span className="text-[#64748b] text-[6.5px]">RUTA DE DATOS</span>
              <span className="text-[#8b5cf6] truncate">{snapshot.technicalDetails.flow}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#64748b] text-[6.5px]">VENTAJA OPERATIVA</span>
              <span className="text-[#10b981] truncate">{snapshot.technicalDetails.ventaja}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ================================================================= */}
      {/* 4. FOOTER: TELEMETRÍA Y RESUMEN LEGAL                             */}
      {/* ================================================================= */}
      <div className="relative z-20 pt-2 border-t border-[#1e293b]">
        <div className="p-2 rounded-xl bg-gradient-to-r from-[#06141a] via-[#0f172a] to-[#06141a] border border-[#10b981]/40 shadow-lg flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-black text-[#10b981] tracking-wider truncate">
                🏛️ FACTURACIÓN PSE / OSE
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#10b981]/20 text-[#86efac] text-[7.5px] font-mono font-bold border border-[#10b981]/40">
                10 ETAPAS CLOUD
              </span>
            </div>
            <p className="text-[7.5px] text-[#cbd5e1] leading-tight line-clamp-2 mt-0.5">
              {snapshot.description}
            </p>
          </div>
          <span className="px-2 py-1 rounded bg-[#10b981] text-[#06080f] text-[9px] font-mono font-black shrink-0 shadow-md">
            P{snapshot.stepIndex + 1}/10
          </span>
        </div>
      </div>
    </div>
  );
};
