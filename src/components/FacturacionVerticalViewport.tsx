import React from 'react';
import {
  Monitor,
  FileText,
  Lock,
  Archive,
  Zap,
  Search,
  AlertOctagon,
  Wrench,
  Radio,
  Landmark,
  CheckCircle2,
  XCircle,
  FileCode,
  Check,
} from 'lucide-react';
import { FacturacionSnapshot } from '../data/facturacionSunatAlgorithm';
import { COMPANY_NAME } from '../config/appConfig';

interface FacturacionVerticalViewportProps {
  snapshot: FacturacionSnapshot;
}

export const FacturacionVerticalViewport: React.FC<FacturacionVerticalViewportProps> = ({ snapshot }) => {
  const totalDuration = 34.0;
  const progressPercent = Math.min(100, Math.max(0, (snapshot.timeSec / totalDuration) * 100));

  return (
    <div className="relative w-full max-w-[440px] aspect-[9/16] bg-[#050811] border-2 border-[#1e293b] rounded-[34px] overflow-hidden shadow-2xl flex flex-col p-4 sm:p-5 select-none ring-1 ring-[#10b981]/20">
      {/* Tactical Financial / Tax Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ================================================================= */}
      {/* 1. HEADER SUPERIOR (codevo.pe • FACTURACIÓN ELECTRÓNICA • SUNAT) */}
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

          {/* Right Badge: FACTURACIÓN ELECTRÓNICA • SUNAT */}
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

        {/* Dynamic Telemetry: Status Text & Step Counter */}
        <div className="flex items-center justify-between mt-1 text-[9px] font-mono">
          <span className="text-[#38bdf8] font-bold">{snapshot.phaseLabel}</span>
          <div className="flex items-center gap-2">
            <span
              className="font-bold tracking-wider truncate max-w-[160px]"
              style={{ color: snapshot.statusColor }}
            >
              {snapshot.statusText}
            </span>
            <span className="text-white/70 bg-[#0f172a] px-1.5 py-0.2 rounded text-[8px] border border-[#1e293b]">
              {snapshot.timeSec.toFixed(1)}s / 34s
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#0f172a] rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#f59e0b] via-[#38bdf8] to-[#10b981] transition-all duration-500 rounded-full shadow-[0_0_8px_#10b981]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. ÁREA CENTRAL: DIAGRAMA ARQUITECTÓNICO DE 3 NODOS               */}
      {/* ================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col justify-between py-2 gap-2">
        
        {/* Dynamic Step Banner */}
        <div className="p-2.5 rounded-xl bg-[#0f172a]/95 border border-[#1e293b] backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0">
              {snapshot.phase === 'CALCULO_ERP' ? (
                <Monitor className="w-4 h-4 text-[#38bdf8]" />
              ) : snapshot.phase === 'ESTRUCTURA_UBL' ? (
                <FileCode className="w-4 h-4 text-[#f59e0b]" />
              ) : snapshot.phase === 'FIRMA_DIGITAL' ? (
                <Lock className="w-4 h-4 text-[#f59e0b]" />
              ) : snapshot.phase === 'COMPRESION_ZIP' ? (
                <Archive className="w-4 h-4 text-[#a855f7]" />
              ) : snapshot.phase === 'CONEXION_SOAP' ? (
                <Zap className="w-4 h-4 text-[#38bdf8]" />
              ) : snapshot.phase === 'VALIDACION_XSD' ? (
                <Search className="w-4 h-4 text-[#38bdf8]" />
              ) : snapshot.phase === 'ERROR_RECHAZO' ? (
                <AlertOctagon className="w-4 h-4 text-[#ef4444]" />
              ) : snapshot.phase === 'SUBSANACION' ? (
                <Wrench className="w-4 h-4 text-[#10b981]" />
              ) : snapshot.phase === 'ESCANEO_SUNAT' ? (
                <Radio className="w-4 h-4 text-[#10b981]" />
              ) : (
                <Landmark className="w-4 h-4 text-[#10b981]" />
              )}
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

        {/* ARCHITECTURE CANVAS */}
        <div className="relative flex-1 min-h-[300px] bg-[#070b14] rounded-2xl border border-[#1e293b] p-2 overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* System -> Firma Digital */}
            <line
              x1="26%"
              y1="25%"
              x2="26%"
              y2="45%"
              stroke={['ESTRUCTURA_UBL', 'FIRMA_DIGITAL', 'COMPRESION_ZIP'].includes(snapshot.phase) ? '#f59e0b' : '#334155'}
              strokeWidth={['ESTRUCTURA_UBL', 'FIRMA_DIGITAL'].includes(snapshot.phase) ? '3.5' : '2'}
              strokeDasharray="4 4"
            />
            {/* Firma Digital -> SUNAT */}
            <path
              d="M 115 165 C 160 165, 170 140, 240 140"
              fill="none"
              stroke={['CONEXION_SOAP', 'VALIDACION_XSD'].includes(snapshot.phase) ? '#38bdf8' : '#334155'}
              strokeWidth={snapshot.phase === 'CONEXION_SOAP' ? '4' : '2'}
              strokeDasharray="4 4"
              className={snapshot.phase === 'CONEXION_SOAP' ? 'animate-pulse' : ''}
              style={{
                filter: snapshot.phase === 'CONEXION_SOAP' ? 'drop-shadow(0 0 6px #38bdf8)' : undefined,
              }}
            />
            {/* SUNAT -> System (CDR Return) */}
            <path
              d="M 240 110 C 180 50, 130 50, 115 80"
              fill="none"
              stroke={snapshot.phase === 'CDR_ACEPTADO' ? '#10b981' : '#1e293b'}
              strokeWidth={snapshot.phase === 'CDR_ACEPTADO' ? '3.5' : '1.5'}
              strokeDasharray="4 4"
              className={snapshot.phase === 'CDR_ACEPTADO' ? 'animate-pulse' : ''}
            />
          </svg>

          {/* ============================================================= */}
          {/* NODO 1: TU SISTEMA / API (Izquierda Superior)                 */}
          {/* ============================================================= */}
          <div
            className={`absolute top-[10%] left-[5%] w-[44%] p-2 rounded-xl bg-[#0f172a]/95 border transition-all duration-300 z-20 shadow-md ${
              snapshot.systemStatus === 'approved'
                ? 'border-[#10b981] shadow-[0_0_16px_rgba(16,185,129,0.3)]'
                : snapshot.systemStatus === 'correcting'
                ? 'border-[#38bdf8] shadow-[0_0_14px_rgba(56,189,248,0.3)]'
                : 'border-[#1e293b]'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Monitor className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="text-[9px] font-mono font-bold text-white tracking-wider truncate">
                TU SISTEMA / API
              </span>
            </div>
            <div className="text-[7px] text-[#38bdf8] font-mono font-semibold">
              ERP • POS • Base de Datos
            </div>
            <div className="text-[7px] text-[#94a3b8] font-mono">
              Gravada: S/ 127.03 • IGV: S/ 22.87
            </div>
          </div>

          {/* ============================================================= */}
          {/* NODO 2: FIRMA DIGITAL / UBL 2.1 (Izquierda Media)              */}
          {/* ============================================================= */}
          <div
            className={`absolute top-[48%] left-[5%] w-[44%] p-2 rounded-xl bg-[#0f172a]/95 border transition-all duration-300 z-20 shadow-md ${
              snapshot.systemStatus === 'signing' || snapshot.phase === 'FIRMA_DIGITAL'
                ? 'border-[#f59e0b] shadow-[0_0_16px_rgba(245,158,11,0.3)]'
                : 'border-[#1e293b]'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Lock className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span className="text-[9px] font-mono font-bold text-white tracking-wider truncate">
                FIRMA DIGITAL / UBL
              </span>
            </div>
            <div className="text-[7px] text-[#f59e0b] font-mono font-semibold">
              OASIS UBL 2.1 • PKCS#12
            </div>
            <div className="text-[7px] text-[#94a3b8] font-mono">
              DigestValue SHA-256
            </div>
          </div>

          {/* ============================================================= */}
          {/* NODO 3: SERVIDORES SUNAT (Derecha / Logo Procedural)           */}
          {/* ============================================================= */}
          <div
            className={`absolute top-[8%] right-[5%] w-[45%] h-[82%] p-3 rounded-2xl bg-[#0b1120]/95 border flex flex-col justify-between transition-all duration-500 z-20 shadow-xl ${
              snapshot.sunatStatus === 'error'
                ? 'border-[#ef4444] shadow-[0_0_24px_rgba(239,68,68,0.5)]'
                : snapshot.sunatStatus === 'approved' || snapshot.sunatStatus === 'scanning'
                ? 'border-[#10b981] shadow-[0_0_24px_rgba(16,185,129,0.4)]'
                : snapshot.sunatStatus === 'validating'
                ? 'border-[#eab308] shadow-[0_0_18px_rgba(234,179,8,0.3)]'
                : 'border-[#1e293b]'
            }`}
          >
            {/* Procedural Stylized SUNAT Logo */}
            <div className="flex flex-col items-center">
              <div className="flex items-end gap-1 my-1">
                <div className="w-2.5 h-6 rounded-sm bg-[#e11d48]" />
                <div className="w-2.5 h-8 rounded-sm bg-[#0284c7]" />
                <div className="w-2.5 h-5 rounded-sm bg-[#0284c7]" />
                <div className="w-2.5 h-9 rounded-sm bg-[#0369a1]" />
              </div>
              <span className="font-mono font-black text-white text-base tracking-[0.25em]">
                SUNAT
              </span>
              <span className="text-[6px] font-sans font-bold text-[#64748b] tracking-wider uppercase">
                SUPERINTENDENCIA NACIONAL
              </span>
            </div>

            {/* Sub-services in SUNAT */}
            <div className="space-y-1.5 my-auto">
              <div className="p-1.5 rounded-lg bg-[#070e1a] border border-[#1e293b] text-center">
                <span className="text-[7px] font-mono font-bold text-[#38bdf8] block">
                  WEBSERVICE SOAP
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-[#070e1a] border border-[#1e293b] text-center">
                <span className="text-[7px] font-mono font-bold text-[#cbd5e1] block">
                  VALIDADOR PADRÓN RUC
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-[#070e1a] border border-[#1e293b] text-center">
                <span
                  className={`text-[7px] font-mono font-bold block ${
                    snapshot.sunatStatus === 'approved' || snapshot.sunatStatus === 'scanning'
                      ? 'text-[#10b981]'
                      : 'text-[#64748b]'
                  }`}
                >
                  GENERADOR CDR
                </span>
              </div>
            </div>

            {/* Status Footer Badge */}
            <div className="pt-1 border-t border-[#1e293b] text-center">
              <span
                className="text-[7px] font-mono font-bold tracking-wider flex items-center justify-center gap-1"
                style={{ color: snapshot.statusColor }}
              >
                {snapshot.sunatStatus === 'approved' ? (
                  <>
                    <CheckCircle2 className="w-2.5 h-2.5" /> COMPROBANTE VÁLIDO
                  </>
                ) : snapshot.sunatStatus === 'scanning' ? (
                  <>
                    <Zap className="w-2.5 h-2.5" /> ESCANEANDO XSD
                  </>
                ) : snapshot.sunatStatus === 'error' ? (
                  <>
                    <XCircle className="w-2.5 h-2.5" /> EXCEPCIÓN 2324
                  </>
                ) : snapshot.sunatStatus === 'validating' ? (
                  'EVALUANDO PADRÓN'
                ) : (
                  'LISTO PARA RECEPCIÓN'
                )}
              </span>
            </div>
          </div>

          {/* ============================================================= */}
          {/* PAQUETE VIAJERO EN VUELO (Ticket / UBL / ZIP / CDR)            */}
          {/* ============================================================= */}
          <div
            className="absolute transition-all duration-700 z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${snapshot.packetPosition.x}%`,
              top: `${snapshot.packetPosition.y}%`,
            }}
          >
            {snapshot.packetStatus === 'ticket_orden' && (
              <div className="px-2.5 py-1.5 rounded-xl bg-[#0c192e] border border-[#38bdf8] shadow-[0_0_14px_#38bdf8] text-center">
                <div className="text-[8px] font-mono font-bold text-white flex items-center justify-center gap-1">
                  <FileText className="w-2.5 h-2.5 text-[#38bdf8]" /> BOLETA B001-42
                </div>
                <div className="text-[6px] font-mono text-[#38bdf8]">Total: S/ 149.90 (IGV 18%)</div>
              </div>
            )}

            {snapshot.packetStatus === 'xml_ubl' && (
              <div className="px-2.5 py-1.5 rounded-xl bg-[#1e1b4b] border border-[#f59e0b] shadow-[0_0_14px_#f59e0b] text-center">
                <div className="text-[8px] font-mono font-bold text-white flex items-center justify-center gap-1">
                  <FileCode className="w-2.5 h-2.5 text-[#f59e0b]" /> XML UBL 2.1
                </div>
                <div className="text-[6px] font-mono text-[#fcd34d]">Invoice-2.1.xsd</div>
              </div>
            )}

            {snapshot.packetStatus === 'firma_sha256' && (
              <div className="px-2.5 py-1.5 rounded-xl bg-[#2a1705] border border-[#f59e0b] shadow-[0_0_16px_#f59e0b] text-center">
                <div className="text-[8px] font-mono font-bold text-white flex items-center justify-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-[#f59e0b]" /> XML FIRMADO
                </div>
                <div className="text-[6px] font-mono text-[#fde68a]">DigestValue SHA-256</div>
              </div>
            )}

            {snapshot.packetStatus === 'zip_firmado' && (
              <div className="px-2.5 py-1.5 rounded-xl bg-[#180f2e] border border-[#a855f7] shadow-[0_0_14px_#a855f7] text-center">
                <div className="text-[8px] font-mono font-bold text-white flex items-center justify-center gap-1">
                  <Archive className="w-2.5 h-2.5 text-[#a855f7]" /> 2060...-03-B001-42.zip
                </div>
                <div className="text-[6px] font-mono text-[#d8b4fe]">Nomenclatura SUNAT</div>
              </div>
            )}

            {snapshot.packetStatus === 'soap_tunnel' && (
              <div className="px-2.5 py-1 rounded-full bg-[#0284c7] border border-[#38bdf8] shadow-[0_0_18px_#38bdf8] flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-[7px] font-mono font-bold text-white">sendBill(Base64) HTTPS</span>
              </div>
            )}

            {snapshot.packetStatus === 'reintento_ok' && (
              <div className="px-2.5 py-1.5 rounded-xl bg-[#062419] border border-[#10b981] shadow-[0_0_16px_#10b981] text-center">
                <div className="text-[8px] font-mono font-bold text-white flex items-center justify-center gap-1">
                  <FileText className="w-2.5 h-2.5 text-[#10b981]" /> B001-43 (NUEVO)
                </div>
                <div className="text-[6px] font-mono text-[#86efac]">RUC Válido • Refirmado</div>
              </div>
            )}

            {snapshot.packetStatus === 'scanning_laser' && (
              <div className="px-2 py-1 rounded-lg bg-[#022c22] border border-[#10b981] shadow-[0_0_14px_#10b981] text-center">
                <div className="text-[7px] font-mono font-black text-[#10b981]">PROCESANDO CDR...</div>
              </div>
            )}

            {snapshot.packetStatus === 'completado_qr' && (
              <div className="px-2 py-1.5 rounded-xl bg-[#022c22] border border-[#10b981] shadow-[0_0_16px_#10b981] text-center">
                <div className="text-[8px] font-mono font-black text-[#10b981] flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-[#10b981]" /> CDR FIRMADO
                </div>
                <div className="text-[6px] font-mono text-white">Estado 0 • QR Conforme</div>
              </div>
            )}
          </div>

          {/* ============================================================= */}
          {/* MODAL DE ERROR SOAP (Paso 7: Fault 2324)                      */}
          {/* ============================================================= */}
          {snapshot.showErrorModal && (
            <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[88%] p-3 rounded-2xl bg-[#1c080e]/95 border-2 border-[#ef4444] shadow-[0_0_30px_rgba(239,68,68,0.7)] backdrop-blur-xl z-40 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-1.5 text-xs font-mono font-black text-[#fecaca] tracking-wider mb-1">
                <XCircle className="w-3.5 h-3.5 text-[#ef4444]" />
                <span>ERROR DE RECEPCIÓN SUNAT</span>
              </div>
              <div className="text-[9px] font-mono font-bold text-[#ef4444] mb-1">
                FAULT CODE: SOAP-ENV:Client.2324
              </div>
              <p className="text-[8px] text-[#fca5a5] leading-tight mb-2">
                El RUC receptor no existe en el Padrón o el número de correlativo B001-42 ya fue registrado anteriormente.
              </p>
              <div className="px-2 py-0.5 rounded-md bg-[#3b0b15] border border-[#ef4444] text-[7px] font-mono font-bold text-white">
                ACCIÓN: CORREGIR RUC Y ASIGNAR B001-43
              </div>
            </div>
          )}

          {/* Laser Scanner Effect in SUNAT (Step 9) */}
          {snapshot.showScanner && (
            <div className="absolute top-[35%] right-[7%] w-[41%] h-0.5 bg-[#10b981] shadow-[0_0_12px_#10b981] z-30 animate-pulse pointer-events-none" />
          )}
        </div>

        {/* =============================================================== */}
        {/* 3. ALGORITMO TRIBUTARIO & ESPECIFICACIÓN TÉCNICA DINÁMICA        */}
        {/* =============================================================== */}
        <div className="p-2.5 rounded-2xl bg-[#0f172a]/95 border border-[#1e293b] shadow-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono font-bold text-[#38bdf8] tracking-wider flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-[#38bdf8]" />
              ESPECIFICACIÓN TÉCNICA SUNAT
            </span>
            <span className="text-[8px] font-mono text-[#10b981] font-bold">
              {snapshot.technicalDetails.protocol}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-[#070b14] border border-[#1e293b] grid grid-cols-3 gap-1 text-[8px] font-mono font-bold text-center">
            <div className="flex flex-col">
              <span className="text-[#64748b] text-[6.5px]">ARCHIVO/PAYLOAD</span>
              <span className="text-[#f59e0b] truncate">{snapshot.technicalDetails.payloadName}</span>
            </div>
            <div className="flex flex-col border-x border-[#1e293b] px-1">
              <span className="text-[#64748b] text-[6.5px]">DESGLOSE / AUTH</span>
              <span className="text-[#38bdf8] truncate">{snapshot.technicalDetails.taxBase}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#64748b] text-[6.5px]">RESULTADO</span>
              <span className="text-[#10b981] truncate">{snapshot.technicalDetails.totalAmount}</span>
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
              <span className="text-[10px] font-mono font-black text-[#10b981] tracking-wider truncate flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5 text-[#10b981]" />
                FACTURACIÓN ELECTRÓNICA
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#10b981]/20 text-[#86efac] text-[7.5px] font-mono font-bold border border-[#10b981]/40">
                10 PASOS TRIBUTARIOS
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
