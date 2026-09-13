import React from 'react';
import {
  Upload,
  Search,
  AlertOctagon,
  Settings,
  BarChart3,
  Lock,
  Rocket,
  CheckCircle2,
  Landmark,
  Laptop,
  XCircle,
  ClipboardList,
  AlertTriangle,
} from 'lucide-react';
import { Error2119Snapshot } from '../data/error2119Algorithm';
import { COMPANY_NAME } from '../config/appConfig';

interface Error2119VerticalViewportProps {
  snapshot: Error2119Snapshot;
}

export const Error2119VerticalViewport: React.FC<Error2119VerticalViewportProps> = ({ snapshot }) => {
  const totalDuration = 33.0;
  const progressPercent = Math.min(100, Math.max(0, (snapshot.timeSec / totalDuration) * 100));

  return (
    <div className="relative w-full max-w-[440px] aspect-[9/16] bg-[#050811] border-2 border-[#1e293b] rounded-[34px] overflow-hidden shadow-2xl flex flex-col p-4 sm:p-5 select-none ring-1 ring-[#ef4444]/20">
      {/* Tactical Financial Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.09] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ================================================================= */}
      {/* 1. HEADER SUPERIOR (codevo.pe • DEBUGGING FISCAL • SUNAT / OSE)   */}
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
              {COMPANY_NAME}
            </span>
          </div>

          {/* Right Badge: DEBUGGING FISCAL • SUNAT / OSE */}
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
          <span className="text-[#38bdf8] font-bold">CÓDIGO DE EXCEPCIÓN EN TIEMPO REAL</span>
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
            className="h-full bg-gradient-to-r from-[#ef4444] via-[#f59e0b] to-[#10b981] transition-all duration-500 rounded-full shadow-[0_0_8px_#10b981]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. ÁREA CENTRAL: TOPOLOGÍA DE 3 NODOS CENTRALES                   */}
      {/* ================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col justify-between py-2 gap-2">
        
        {/* Step Banner */}
        <div className="p-2.5 rounded-xl bg-[#0f172a]/95 border border-[#1e293b] backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1 rounded bg-[#1e293b] text-[#38bdf8] shrink-0">
              {snapshot.phase === 'ENVIO_INICIAL' ? (
                <Upload className="w-4 h-4 text-[#38bdf8]" />
              ) : snapshot.phase === 'ERROR_DETECTADO' ? (
                <Search className="w-4 h-4 text-[#f59e0b]" />
              ) : snapshot.phase === 'RECHAZO_CDR' ? (
                <AlertOctagon className="w-4 h-4 text-[#ef4444]" />
              ) : snapshot.phase === 'ENFOQUE_CORRECCION' ? (
                <Settings className="w-4 h-4 text-[#38bdf8]" />
              ) : snapshot.phase === 'AUDITORIA_CALCULO' ? (
                <BarChart3 className="w-4 h-4 text-[#38bdf8]" />
              ) : snapshot.phase === 'APLICACION_REGLA' ? (
                <Lock className="w-4 h-4 text-[#10b981]" />
              ) : snapshot.phase === 'REENVIO_CORREGIDO' ? (
                <Rocket className="w-4 h-4 text-[#10b981]" />
              ) : snapshot.phase === 'VALIDACION_CONFORME' ? (
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              ) : (
                <Landmark className="w-4 h-4 text-[#38bdf8]" />
              )}
            </div>
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
          <span className="px-2 py-0.5 rounded bg-[#0b1120] text-[#ef4444] border border-[#1e293b] text-[9px] font-mono font-bold shrink-0">
            {snapshot.stepIndex + 1}/10
          </span>
        </div>

        {/* TOPOLOGY CANVAS WITH 3 CENTRAL NODES */}
        <div className="relative flex-1 min-h-[300px] bg-[#070b14] rounded-2xl border border-[#1e293b] p-2 overflow-hidden shadow-inner flex flex-col justify-between">
          
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* SISTEMA -> VALIDADOR (Vertical superior) */}
            <line
              x1="50%"
              y1="22%"
              x2="50%"
              y2="42%"
              stroke={['ENVIO_INICIAL', 'ERROR_DETECTADO', 'REENVIO_CORREGIDO', 'VALIDACION_CONFORME'].includes(snapshot.phase) ? '#38bdf8' : '#1e293b'}
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />

            {/* VALIDADOR -> PANEL CORRECCIÓN (Vertical inferior) */}
            <line
              x1="50%"
              y1="60%"
              x2="50%"
              y2="76%"
              stroke={['RECHAZO_CDR', 'ENFOQUE_CORRECCION', 'AUDITORIA_CALCULO', 'APLICACION_REGLA'].includes(snapshot.phase) ? '#f59e0b' : '#1e293b'}
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
          </svg>

          {/* ============================================================= */}
          {/* NODO 1: [TU SISTEMA / ERP] (Y: -350 aprox)                    */}
          {/* ============================================================= */}
          <div
            className={`w-[78%] mx-auto p-2 rounded-xl bg-[#0b1120]/95 border transition-all duration-300 z-20 shadow-md ${
              snapshot.activeNodes.sistema
                ? 'border-[#38bdf8] shadow-[0_0_16px_rgba(56,189,248,0.4)] scale-102'
                : 'border-[#1e293b]'
            }`}
          >
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span className="text-[9px] font-mono font-black text-white tracking-wider">
                  TU SISTEMA / ERP
                </span>
              </div>
              <span className="text-[7px] font-mono text-[#38bdf8] font-bold">EMISOR XML</span>
            </div>
            <div className="text-[6.5px] text-[#94a3b8] font-mono truncate text-center">
              Factura: {snapshot.comprobanteData.serieNumero} • Base: {snapshot.comprobanteData.baseImponible}
            </div>
          </div>

          {/* ============================================================= */}
          {/* NODO 2: [VALIDADOR OSE / SUNAT] (Y: 0 - Central)              */}
          {/* ============================================================= */}
          <div
            className={`w-[86%] mx-auto p-2.5 rounded-2xl bg-[#0a1020]/95 border-2 transition-all duration-500 z-20 shadow-xl ${
              snapshot.phase === 'RECHAZO_CDR'
                ? 'border-[#ef4444] shadow-[0_0_24px_rgba(239,68,68,0.5)] scale-105'
                : snapshot.phase === 'VALIDACION_CONFORME' || snapshot.phase === 'CDR_ACEPTADO'
                ? 'border-[#10b981] shadow-[0_0_24px_rgba(16,185,129,0.5)] scale-105'
                : snapshot.activeNodes.validador
                ? 'border-[#0284c7] shadow-[0_0_20px_rgba(2,132,199,0.5)]'
                : 'border-[#1e293b]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="px-1.5 py-0.2 rounded bg-[#0b1424] text-[#38bdf8] border border-[#0284c7]/40 text-[7px] font-mono font-black tracking-wider flex items-center gap-1">
                <Landmark className="w-3 h-3 text-[#38bdf8]" />
                <span>ESCÁNER FISCAL OFICIAL</span>
              </span>
              <span
                className="text-[7px] font-mono font-bold"
                style={{ color: snapshot.statusColor }}
              >
                {snapshot.phase === 'RECHAZO_CDR' ? 'ERROR 2119 DETECTADO' : snapshot.phase === 'VALIDACION_CONFORME' ? '100% CONFORME' : 'AUDITORÍA XSD'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="p-1 rounded bg-[#1e293b]">
                {snapshot.phase === 'RECHAZO_CDR' ? (
                  <AlertOctagon className="w-4 h-4 text-[#ef4444]" />
                ) : snapshot.phase === 'VALIDACION_CONFORME' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                ) : (
                  <Search className="w-4 h-4 text-[#38bdf8]" />
                )}
              </span>
              <div>
                <span className="text-[10px] font-mono font-black text-white tracking-wider block">
                  VALIDADOR OSE / SUNAT
                </span>
                <span
                  className="text-[7px] font-mono font-bold"
                  style={{ color: snapshot.statusColor }}
                >
                  {snapshot.statusText}
                </span>
              </div>
            </div>

            <div className="mt-1 pt-1 border-t border-[#1e293b] flex items-center justify-between text-[6.5px] font-mono">
              <span className="text-[#94a3b8]">Matriz Regla de Negocio</span>
              <span className="text-white font-bold">Tolerancia máx: ± S/ 0.05</span>
            </div>
          </div>

          {/* ============================================================= */}
          {/* NODO 3: [PANEL DE CORRECCIÓN] (Y: +450 aprox)                 */}
          {/* ============================================================= */}
          <div
            className={`w-[90%] mx-auto p-2.5 rounded-2xl bg-[#0f172a]/95 border-2 transition-all duration-300 z-20 shadow-xl ${
              snapshot.correctionHighlighted
                ? 'border-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-102'
                : 'border-[#1e293b]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8px] font-mono font-black text-[#f59e0b] tracking-wider flex items-center gap-1">
                <Settings className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>DIAGNÓSTICO Y CORRECCIÓN TÉCNICA</span>
              </span>
              <span className="text-[7px] font-mono text-[#10b981] font-bold">UBL 2.1</span>
            </div>

            {/* Fila 1: Incorrecto */}
            <div className="p-1 rounded-lg bg-[#1a0a0e] border border-[#ef4444]/60 mb-1 flex items-center justify-between text-[7px] font-mono">
              <span className="text-[#ef4444] font-bold flex items-center gap-1">
                <XCircle className="w-3 h-3 text-[#ef4444]" />
                <span>Redondeo prematuro x ítem:</span>
              </span>
              <span className="text-white bg-[#ef4444]/20 px-1 py-0.2 rounded font-mono font-black">
                S/ 17.90 (Diff: -S/ 0.10)
              </span>
            </div>

            {/* Fila 2: Regla Técnica UBL 2.1 */}
            <div className="p-1.5 rounded-lg bg-[#022c22] border-2 border-[#10b981] flex items-center justify-between text-[7.5px] font-mono">
              <span className="text-[#86efac] font-black flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                <span>Regla Base Total * 0.18:</span>
              </span>
              <span className="text-[#10b981] bg-[#051e18] px-1.5 py-0.5 rounded font-mono font-black text-[8.5px] shadow-[0_0_8px_#10b981]">
                S/ 18.00 EXACTO
              </span>
            </div>
          </div>

          {/* ============================================================= */}
          {/* PAQUETE VIAJERO EN PANTALLA (FACTURA / RECHAZO / CORREGIDO)   */}
          {/* ============================================================= */}
          <div
            className="absolute transition-all duration-700 z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${snapshot.packetPosition.x}%`,
              top: `${snapshot.packetPosition.y}%`,
            }}
          >
            {snapshot.packetStatus === 'invalido' && (
              <div className="px-2.5 py-1.5 rounded-xl bg-[#0c1f36] border border-[#38bdf8] shadow-[0_0_14px_#38bdf8] text-center">
                <div className="text-[8px] font-mono font-bold text-white">FACTURA F001-102</div>
                <div className="text-[6.5px] font-mono text-[#38bdf8]">Base S/ 100 • IGV S/ 17.90</div>
              </div>
            )}

            {snapshot.packetStatus === 'rechazado' && (
              <div className="px-2.5 py-1.5 rounded-xl bg-[#26080d] border border-[#ef4444] shadow-[0_0_18px_#ef4444] text-center">
                <div className="text-[8px] font-mono font-black text-[#ef4444] flex items-center justify-center gap-1">
                  <AlertOctagon className="w-3 h-3 text-[#ef4444]" />
                  <span>RECHAZO: ERROR 2119</span>
                </div>
                <div className="text-[6.5px] font-mono text-[#fca5a5]">Tasa Oficial Discrepante</div>
              </div>
            )}

            {snapshot.packetStatus === 'corregido' && (
              <div className="px-2.5 py-1.5 rounded-xl bg-[#03291e] border border-[#10b981] shadow-[0_0_18px_#10b981] text-center">
                <div className="text-[8px] font-mono font-black text-white">FACTURA F001-102 (CORREGIDA)</div>
                <div className="text-[6.5px] font-mono text-[#86efac]">Base S/ 100 • IGV S/ 18.00</div>
              </div>
            )}

            {snapshot.packetStatus === 'aprobado' && (
              <div className="px-2.5 py-1.5 rounded-xl bg-[#022c22] border border-[#10b981] shadow-[0_0_20px_#10b981] text-center">
                <div className="text-[8px] font-mono font-black text-[#10b981] flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#10b981]" />
                  <span>CDR ESTADO 0: ACEPTADO</span>
                </div>
                <div className="text-[6.5px] font-mono text-white">Comprobante Válido SUNAT</div>
              </div>
            )}
          </div>

          {/* MODAL FLOTANTE DE ALERTA: ERROR 2119 */}
          {snapshot.errorModalVisible && (
            <div className="absolute top-[32%] left-[50%] -translate-x-1/2 w-[90%] p-2.5 rounded-2xl bg-[#1f0a0d]/98 border-2 border-[#ef4444] shadow-[0_0_24px_rgba(239,68,68,0.6)] backdrop-blur-md z-40 text-center animate-in zoom-in-95 duration-300">
              <span className="text-[9px] font-mono font-black text-[#ef4444] flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-[#ef4444]" />
                <span>ERROR 2119: DISCREPANCIA DE IGV</span>
              </span>
              <span className="text-[7.5px] text-[#fca5a5] block mt-0.5 font-sans">
                La base imponible (S/ 100.00) y el tributo (S/ 17.90) no coinciden con la tasa oficial (18%).
              </span>
              <span className="text-[7px] text-white font-mono block mt-1 bg-[#2b080f] py-0.5 rounded border border-[#ef4444]/40 font-bold">
                CDR: RECHAZO TRIBUTARIO • COMPROBANTE NO VÁLIDO
              </span>
            </div>
          )}

        </div>

        {/* =============================================================== */}
        {/* 3. ESPECIFICACIÓN TRIBUTARIA DINÁMICA                           */}
        {/* =============================================================== */}
        <div className="p-2.5 rounded-2xl bg-[#0f172a]/95 border border-[#1e293b] shadow-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono font-bold text-[#38bdf8] tracking-wider flex items-center gap-1">
              <ClipboardList className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>ESPECIFICACIÓN TRIBUTARIA</span>
            </span>
            <span className="text-[8px] font-mono text-[#f59e0b] font-bold">
              Tolerancia máx: ± S/ 0.05
            </span>
          </div>

          <div className="p-2 rounded-xl bg-[#070b14] border border-[#1e293b] grid grid-cols-3 gap-1 text-[8px] font-mono font-bold text-center">
            <div className="flex flex-col">
              <span className="text-[#64748b] text-[6.5px]">NORMA UBL</span>
              <span className="text-[#38bdf8] truncate">{snapshot.technicalDetails.norma}</span>
            </div>
            <div className="flex flex-col border-x border-[#1e293b] px-1">
              <span className="text-[#64748b] text-[6.5px]">CAUSA RAÍZ</span>
              <span className="text-[#ef4444] truncate">{snapshot.technicalDetails.causa}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#64748b] text-[6.5px]">SOLUCIÓN TÉCNICA</span>
              <span className="text-[#10b981] truncate">{snapshot.technicalDetails.solucion}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ================================================================= */}
      {/* 4. FOOTER: TELEMETRÍA Y RESOLUCIÓN                                */}
      {/* ================================================================= */}
      <div className="relative z-20 pt-2 border-t border-[#1e293b]">
        <div className="p-2 rounded-xl bg-gradient-to-r from-[#1a0a0d] via-[#0f172a] to-[#06141a] border border-[#ef4444]/30 shadow-lg flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-black text-white tracking-wider truncate">
                DEBUGGING SUNAT ERROR 2119
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#10b981]/20 text-[#86efac] text-[7.5px] font-mono font-bold border border-[#10b981]/40">
                10 FASES
              </span>
            </div>
            <p className="text-[7.5px] text-[#cbd5e1] leading-tight line-clamp-2 mt-0.5">
              {snapshot.description}
            </p>
          </div>
          <span className="px-2 py-1 rounded bg-[#ef4444] text-white text-[9px] font-mono font-black shrink-0 shadow-md">
            P{snapshot.stepIndex + 1}/10
          </span>
        </div>
      </div>
    </div>
  );
};
