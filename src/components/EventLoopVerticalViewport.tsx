import React from 'react';
import { EventLoopSnapshot } from '../data/eventLoopAlgorithm';

interface EventLoopVerticalViewportProps {
  snapshot: EventLoopSnapshot;
}

export const EventLoopVerticalViewport: React.FC<EventLoopVerticalViewportProps> = ({ snapshot }) => {
  return (
    <div className="relative w-full max-w-[440px] aspect-[9/16] bg-[#070b14] border-2 border-[#1e293b] rounded-[34px] overflow-hidden shadow-2xl flex flex-col p-4 sm:p-5 select-none ring-1 ring-[#a855f7]/20">
      {/* Fondo de Matriz Cibernética */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ================================================================= */}
      {/* 1. HEADER MINIMALISTA - MARCA codevo.pe                           */}
      {/* ================================================================= */}
      <div className="relative z-20 pb-2.5 border-b border-[#1e293b]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono font-black text-white text-base tracking-[0.25em]">
              codevo.pe
            </span>
            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-[#a855f7]/20 text-[#c084fc] border border-[#a855f7]/40">
              EVENT LOOP CORE
            </span>
          </div>

          {/* Badge Dinámico de Estado */}
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black border transition-all duration-300 ${
                snapshot.highlightCategory === 'sync'
                  ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/40'
                  : snapshot.highlightCategory === 'microtask'
                  ? 'bg-[#38bdf8]/15 text-[#38bdf8] border-[#38bdf8]/40 shadow-sm shadow-[#38bdf8]/20'
                  : snapshot.highlightCategory === 'macrotask'
                  ? 'bg-[#fbbf24]/15 text-[#fbbf24] border-[#fbbf24]/40 shadow-sm shadow-[#fbbf24]/20'
                  : 'bg-[#a855f7]/15 text-[#c084fc] border-[#a855f7]/40'
              }`}
            >
              {snapshot.statusBadgeText}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-[#0e1726] text-white border border-[#334155]">
              {snapshot.stepNumberText.replace('PASO ', 'P')}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-1 text-[9px] font-mono text-[#64748b]">
          <span>Modelo de Concurrencia V8 / Node.js</span>
          <span className="text-[#a855f7] font-bold">Sin Bloqueo de I/O</span>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. CONTENIDO PRINCIPAL: ELEMENTOS DEL MOTOR EN ALTA VISIBILIDAD   */}
      {/* ================================================================= */}
      <div className="relative flex-1 flex flex-col justify-between py-2.5 z-10 gap-2">
        {/* FILA SUPERIOR: CALL STACK (LIFO) & WEB APIS (Hilos en Segundo Plano) */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* CALL STACK */}
          <div
            className={`bg-[#0e1726] border rounded-2xl p-2.5 flex flex-col min-h-[125px] transition-all duration-300 ${
              snapshot.callStack.length > 0
                ? 'border-[#f43f5e] shadow-lg shadow-[#f43f5e]/20 ring-1 ring-[#f43f5e]/30'
                : 'border-[#1e293b]'
            }`}
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-[#1e293b] mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">🥞</span>
                <span className="text-[10px] font-mono font-black text-[#f43f5e] tracking-wider">
                  CALL STACK
                </span>
              </div>
              <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-[#f43f5e]/20 text-[#f43f5e]">
                LIFO (1 Thread)
              </span>
            </div>

            {/* Pila de Ejecución */}
            <div className="flex-1 flex flex-col-reverse justify-start gap-1.5">
              {snapshot.callStack.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[10px] font-mono text-[#475569] gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]/50 animate-ping" />
                  <span>[ Pila Libre ]</span>
                </div>
              ) : (
                snapshot.callStack.map((frame, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-1.5 rounded-lg bg-[#881337] border border-[#f43f5e] text-white text-[10px] font-mono font-black text-center shadow-md shadow-[#f43f5e]/30 flex items-center justify-between animate-pulse"
                  >
                    <span className="text-[9px] text-[#fca5a5]">▶</span>
                    <span className="truncate flex-1 px-1">{frame}</span>
                    <span className="text-[8px] bg-[#070b14] px-1 rounded text-[#fda4af]">
                      #1
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* WEB APIS / BACKGROUND TIMERS */}
          <div
            className={`bg-[#0e1726] border rounded-2xl p-2.5 flex flex-col min-h-[125px] transition-all duration-300 ${
              snapshot.webApis.some((w) => w.active)
                ? 'border-[#fbbf24] shadow-lg shadow-[#fbbf24]/20 ring-1 ring-[#fbbf24]/30'
                : 'border-[#1e293b]'
            }`}
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-[#1e293b] mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">🌐</span>
                <span className="text-[10px] font-mono font-black text-[#fbbf24] tracking-wider">
                  WEB APIS
                </span>
              </div>
              <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-[#fbbf24]/20 text-[#fbbf24]">
                Background Threads
              </span>
            </div>

            {/* Timers y Daemons Activos */}
            <div className="flex-1 flex flex-col justify-start gap-1.5">
              {snapshot.webApis.length === 0 ? (
                <div className="h-full flex items-center justify-center text-[10px] font-mono text-[#475569]">
                  <span>(sin timers)</span>
                </div>
              ) : (
                snapshot.webApis.map((api) => (
                  <div
                    key={api.id}
                    className={`px-2 py-1.5 rounded-lg border text-[9px] font-mono flex flex-col gap-0.5 transition-all ${
                      api.active
                        ? 'bg-[#854d0e]/40 border-[#fbbf24] text-white shadow-sm'
                        : 'bg-[#070b14] border-[#334155] text-[#94a3b8]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="truncate">{api.name}</span>
                      <span className="text-[8px]">{api.active ? '⏱' : '✓'}</span>
                    </div>
                    <span className="text-[8px] text-[#fbbf24]">{api.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* NÚCLEO CENTRAL: EL MOTOR DEL EVENT LOOP (Orbital Reactor) */}
        <div
          className={`relative w-full rounded-2xl p-2.5 border transition-all duration-500 flex items-center justify-between overflow-hidden ${
            snapshot.eventLoopState !== 'sleeping'
              ? 'bg-[#1e1b4b]/40 border-[#a855f7] shadow-xl shadow-[#a855f7]/25 ring-2 ring-[#a855f7]/30'
              : 'bg-[#0e1726] border-[#1e293b]'
          }`}
        >
          {/* Reactor Orbital Giratorio */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
              {/* Anillo exterior */}
              <div
                className={`absolute inset-0 rounded-full border-2 border-dashed transition-all duration-700 ${
                  snapshot.eventLoopState !== 'sleeping'
                    ? 'border-[#a855f7] animate-spin'
                    : 'border-[#334155]'
                }`}
                style={{ animationDuration: '4s' }}
              />
              {/* Anillo de resplandor */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-transform duration-500 ${
                  snapshot.eventLoopState !== 'sleeping'
                    ? 'bg-[#a855f7] text-[#070b14] shadow-[0_0_20px_rgba(168,85,247,0.7)] font-black'
                    : 'bg-[#1f2937] text-[#64748b]'
                }`}
                style={{ transform: `rotate(${snapshot.eventLoopRotation}deg)` }}
              >
                ↻
              </div>
            </div>

            {/* Diagnóstico del Reactor */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-black text-white tracking-wide">
                  EVENT LOOP REACTOR
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    snapshot.eventLoopState !== 'sleeping'
                      ? 'bg-[#a855f7] animate-ping'
                      : 'bg-[#334155]'
                  }`}
                />
              </div>
              <span className="text-[9px] font-mono text-[#cbd5e1] font-semibold">
                {snapshot.eventLoopState === 'draining-micro'
                  ? '⚡ DRENANDO MICROTASKS (Prioridad 1 VIP)'
                  : snapshot.eventLoopState === 'dispatching-macro'
                  ? '⏳ DESPACHANDO 1 MACROTASK (Prioridad 2)'
                  : snapshot.eventLoopState === 'evaluating'
                  ? '🔍 ¿Stack vacío? ➔ Comprobando Colas'
                  : '💤 Call Stack ocupado con código síncrono'}
              </span>
            </div>
          </div>

          {/* Token de Transferencia Dinámica en vuelo */}
          {snapshot.activeTransfer && (
            <div className="px-2 py-1 rounded-lg bg-[#070b14] border border-[#a855f7] flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-ping" />
              <span className="text-[8px] font-mono font-bold text-[#c084fc] truncate max-w-[80px]">
                {snapshot.activeTransfer.token}
              </span>
            </div>
          )}
        </div>

        {/* FILA INFERIOR DE COLAS: MICROTASKS VIP (Promesas) & MACROTASKS (Timeouts/IO) */}
        <div className="flex flex-col gap-2">
          {/* MICROTASKS QUEUE (PROMESAS / QUEUEMICROTASK) */}
          <div
            className={`bg-[#0e1726] border rounded-2xl p-2.5 flex flex-col gap-1.5 transition-all duration-300 ${
              snapshot.microtasks.length > 0
                ? 'border-[#38bdf8] shadow-lg shadow-[#38bdf8]/20 ring-1 ring-[#38bdf8]/40'
                : 'border-[#1e293b]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">⚡</span>
                <div>
                  <span className="text-[10px] font-mono font-black text-[#38bdf8] tracking-wider block leading-tight">
                    MICROTASKS QUEUE (PROMESAS)
                  </span>
                  <span className="text-[8px] font-mono text-[#64748b]">
                    VIP • Se vacía COMPLETAMENTE antes de cualquier macrotarea
                  </span>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-black bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30">
                PRIORIDAD 1
              </span>
            </div>

            {/* Slots de Microtareas */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 min-h-[26px]">
              {snapshot.microtasks.length === 0 ? (
                <span className="text-[9px] font-mono text-[#475569] italic">
                  [ Cola VIP vacía ]
                </span>
              ) : (
                snapshot.microtasks.map((task, i) => (
                  <div
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#0369a1] text-white text-[10px] font-mono font-black border border-[#38bdf8] shadow-md shadow-[#38bdf8]/30 flex items-center gap-1.5 animate-pulse"
                  >
                    <span>⚡</span>
                    <span>{task}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* MACROTASKS QUEUE (SETTIMEOUT / SETINTERVAL / I/O) */}
          <div
            className={`bg-[#0e1726] border rounded-2xl p-2.5 flex flex-col gap-1.5 transition-all duration-300 ${
              snapshot.macrotasks.length > 0
                ? 'border-[#fbbf24] shadow-lg shadow-[#fbbf24]/20 ring-1 ring-[#fbbf24]/40'
                : 'border-[#1e293b]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">⏳</span>
                <div>
                  <span className="text-[10px] font-mono font-black text-[#fbbf24] tracking-wider block leading-tight">
                    MACROTASKS QUEUE (TIMEOUTS / I/O)
                  </span>
                  <span className="text-[8px] font-mono text-[#64748b]">
                    Callback Queue • Solo 1 tarea por cada vuelta del Event Loop
                  </span>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-black bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/30">
                PRIORIDAD 2
              </span>
            </div>

            {/* Slots de Macrotareas */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 min-h-[26px]">
              {snapshot.macrotasks.length === 0 ? (
                <span className="text-[9px] font-mono text-[#475569] italic">
                  [ Cola de Macrotareas vacía ]
                </span>
              ) : (
                snapshot.macrotasks.map((task, i) => (
                  <div
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#854d0e] text-white text-[10px] font-mono font-black border border-[#fbbf24] shadow-md shadow-[#fbbf24]/30 flex items-center gap-1.5 animate-pulse"
                  >
                    <span>⏱</span>
                    <span>{task}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* CONSOLA DE SALIDA STDOUT (Orden cronológico real) */}
        <div className="bg-[#020617] border border-[#1e293b] rounded-2xl p-2.5 flex flex-col gap-1 shadow-inner">
          <div className="flex items-center justify-between pb-1 border-b border-[#1e293b]">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-black text-[#10b981] tracking-wider">
                CONSOLA / STDOUT REAL
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
            </div>
            <span className="text-[8px] font-mono text-[#64748b]">Orden de Ejecución</span>
          </div>

          <div className="grid grid-cols-2 gap-1 pt-0.5">
            {snapshot.consoleLogs.length === 0 ? (
              <span className="col-span-2 text-[9px] font-mono text-[#334155] italic">
                (Aún sin salidas impresas)
              </span>
            ) : (
              snapshot.consoleLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="px-2 py-0.5 rounded bg-[#070b14] border border-[#10b981]/30 text-[9px] font-mono font-bold text-[#10b981] truncate flex items-center gap-1.5"
                >
                  <span className="text-[#059669]">#{idx + 1}</span>
                  <span className="truncate">{log}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 3. FOOTER: EXPLICACIÓN Y TELEMETRÍA DEL PASO                      */}
      {/* ================================================================= */}
      <div className="relative z-20 pt-2 border-t border-[#1e293b]">
        <div className="p-2 bg-[#0e1726] border border-[#1e293b] rounded-xl flex items-center gap-2">
          <span className="text-base flex-shrink-0">
            {snapshot.highlightCategory === 'finished'
              ? '🎉'
              : snapshot.highlightCategory === 'microtask'
              ? '⚡'
              : snapshot.highlightCategory === 'macrotask'
              ? '⏳'
              : '🚀'}
          </span>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-mono font-black text-white block truncate leading-tight">
              {snapshot.stepTitle}
            </span>
            <p className="text-[9px] text-[#94a3b8] leading-tight line-clamp-2 mt-0.5">
              {snapshot.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
