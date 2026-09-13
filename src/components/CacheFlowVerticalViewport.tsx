import React from 'react';
import {
  Globe,
  Zap,
  Database,
  Clock,
  HardDrive,
} from 'lucide-react';
import { CacheFlowSnapshot } from '../data/cacheFlowAlgorithm';
import { COMPANY_NAME } from '../config/appConfig';

interface CacheFlowVerticalViewportProps {
  snapshot: CacheFlowSnapshot;
}

export const CacheFlowVerticalViewport: React.FC<CacheFlowVerticalViewportProps> = ({ snapshot }) => {
  return (
    <div className="relative w-full max-w-[440px] aspect-[9/16] bg-[#070a12] border-2 border-[#1e293b] rounded-[34px] overflow-hidden shadow-2xl flex flex-col p-4 sm:p-5 select-none ring-1 ring-[#38bdf8]/20">
      {/* Background Subtle Cybernetic Matrix */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ================================================================= */}
      {/* 1. HEADER MINIMALISTA                                            */}
      {/* ================================================================= */}
      <div className="relative z-20 pb-2.5 border-b border-[#1e293b]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono font-black text-white text-base tracking-[0.25em]">
              {COMPANY_NAME}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30">
              MEMORY SHIELD
            </span>
          </div>

          {/* Badge Dinámico de Latencia */}
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black border transition-all duration-300 ${
                snapshot.latencyColor === 'green'
                  ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/40 shadow-sm shadow-[#10b981]/20'
                  : 'bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/40 shadow-sm shadow-[#f59e0b]/20'
              }`}
            >
              {snapshot.statusText}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-[#0e1726] text-white border border-[#334155] flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-[#94a3b8]" /> {snapshot.latencyText}
            </span>
          </div>
        </div>

        {/* Telemetría de Base de Datos en Header */}
        <div className="flex items-center justify-between mt-1.5 text-[9px] font-mono">
          <span className="text-[#64748b]">Canal Vertical de Velocidad</span>
          <span
            className={`font-bold transition-all duration-300 ${
              snapshot.dbCpuPercent > 50
                ? 'text-[#f59e0b] animate-pulse'
                : snapshot.dbCpuPercent > 0
                ? 'text-[#38bdf8]'
                : 'text-[#10b981]'
            }`}
          >
            DB CARGA: {snapshot.dbCpuPercent}%
          </span>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. ESTRUCTURA CENTRAL: TÚNEL DE ENERGÍA Y CAPAS JERÁRQUICAS      */}
      {/* ================================================================= */}
      <div className="relative flex-1 flex flex-col justify-between py-2 z-10">
        {/* Rayo Guía / Conducto de Fibra Central */}
        <div className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-1 border-l-2 border-dashed border-[#1e293b] z-0" />

        {/* Partícula / Paquete de Datos Luminoso */}
        <div
          className="absolute left-1/2 z-30 pointer-events-none transition-all duration-500 ease-out"
          style={{
            top: `${snapshot.packetYPercent}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className={`relative flex items-center justify-center w-9 h-9 rounded-full shadow-xl transition-all duration-300 ${
              snapshot.packetColor === 'green'
                ? 'bg-[#10b981] shadow-[#10b981]/80 scale-110'
                : snapshot.packetColor === 'amber'
                ? 'bg-[#f59e0b] shadow-[#f59e0b]/80'
                : 'bg-[#38bdf8] shadow-[#38bdf8]/80'
            }`}
          >
            <div
              className={`absolute inset-0 rounded-full blur-md opacity-75 ${
                snapshot.packetColor === 'green'
                  ? 'bg-[#10b981]'
                  : snapshot.packetColor === 'amber'
                  ? 'bg-[#f59e0b]'
                  : 'bg-[#38bdf8]'
              }`}
            />
            <span className="relative font-mono font-black text-[#070a12] text-[9px] text-center leading-none">
              {snapshot.packetLabel}
            </span>
          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* CAPA 1: API GATEWAY / INGRESS (Nivel Superior)                   */}
        {/* --------------------------------------------------------------- */}
        <div
          className={`relative z-10 w-full bg-[#0e1726] border rounded-2xl p-2.5 flex items-center justify-between transition-all duration-300 ${
            snapshot.activeLayer === 'gateway'
              ? 'border-[#38bdf8] shadow-lg shadow-[#38bdf8]/20 ring-1 ring-[#38bdf8]/30'
              : 'border-[#1e293b]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/15 border border-[#38bdf8]/30 flex items-center justify-center">
              <Globe className="w-4 h-4 text-[#38bdf8]" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-black text-white flex items-center gap-1.5">
                <span>API GATEWAY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
              </div>
              <span className="text-[9px] font-mono text-[#64748b]">HTTP Ingress Router</span>
            </div>
          </div>
          <div className="px-2 py-0.5 rounded-md bg-[#070a12] border border-[#1e293b] text-[9px] font-mono font-bold text-[#38bdf8]">
            GET /user/:id
          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* CAPA 2: ESCUDO DE MEMORIA RAM (REDIS CACHE)                      */}
        {/* Reactor orbital de alta velocidad con celdas de memoria          */}
        {/* --------------------------------------------------------------- */}
        <div
          className={`relative z-10 w-full rounded-2xl p-3 border transition-all duration-500 flex flex-col gap-2 ${
            snapshot.shieldState === 'hit-bounce'
              ? 'bg-[#10b981]/10 border-[#10b981] shadow-2xl shadow-[#10b981]/30 ring-2 ring-[#10b981]/40 scale-[1.02]'
              : snapshot.shieldState === 'miss-pass'
              ? 'bg-[#f59e0b]/10 border-[#f59e0b] shadow-xl shadow-[#f59e0b]/25 ring-1 ring-[#f59e0b]/30'
              : snapshot.shieldState === 'hydrating'
              ? 'bg-[#38bdf8]/10 border-[#38bdf8] shadow-xl shadow-[#38bdf8]/25 ring-1 ring-[#38bdf8]/30'
              : 'bg-[#0e1726] border-[#1e293b]'
          }`}
        >
          {/* Cabecera del Escudo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                  snapshot.shieldState === 'hit-bounce'
                    ? 'bg-[#10b981] text-[#070a12]'
                    : snapshot.shieldState === 'miss-pass'
                    ? 'bg-[#f59e0b] text-[#070a12]'
                    : 'bg-[#38bdf8]/20 text-[#38bdf8]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-white tracking-wide block leading-tight">
                  ESCUDO DE MEMORIA (REDIS RAM)
                </span>
                <span className="text-[9px] font-mono text-[#64748b]">
                  {snapshot.shieldState === 'hit-bounce'
                    ? '¡REBOTE CINÉTICO INMEDIATO!'
                    : snapshot.shieldState === 'miss-pass'
                    ? 'ESCUDO PERFORADO -> BAJANDO A DISCO'
                    : snapshot.shieldState === 'hydrating'
                    ? 'ABSORBIENDO Y CRISTALIZANDO REGISTRO'
                    : 'Vigilancia en tiempo real • Latencia: ~4ms'}
                </span>
              </div>
            </div>

            <span
              className={`px-2 py-0.5 rounded text-[9px] font-mono font-black ${
                snapshot.shieldState === 'hit-bounce'
                  ? 'bg-[#10b981] text-[#070a12]'
                  : 'bg-[#38bdf8]/20 text-[#38bdf8]'
              }`}
            >
              ~4ms
            </span>
          </div>

          {/* Slots de Memoria en Vivo */}
          <div className="grid grid-cols-1 gap-1.5 pt-1">
            {/* Slot 1: Clave Caliente */}
            <div
              className={`flex items-center justify-between px-2.5 py-1 rounded-lg border text-[9px] font-mono transition-all duration-300 ${
                snapshot.ramKey1.active
                  ? 'bg-[#10b981]/25 text-[#10b981] border-[#10b981] font-black'
                  : 'bg-[#070a12]/70 text-[#94a3b8] border-[#1e293b]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                <span>{snapshot.ramKey1.key}</span>
              </div>
              <span className="opacity-80 truncate max-w-[150px]">{snapshot.ramKey1.value}</span>
              <span className="text-[8px] opacity-75">TTL: ∞</span>
            </div>

            {/* Slot 2: Clave Hidratada Dinámicamente */}
            <div
              className={`flex items-center justify-between px-2.5 py-1 rounded-lg border text-[9px] font-mono transition-all duration-300 ${
                snapshot.ramKey2.isNew
                  ? 'bg-[#38bdf8]/25 text-[#38bdf8] border-[#38bdf8] font-black animate-pulse'
                  : snapshot.ramKey2.active
                  ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]'
                  : 'bg-[#070a12]/70 text-[#64748b] border-[#1e293b]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    snapshot.ramKey2.isNew ? 'bg-[#38bdf8]' : 'bg-[#64748b]'
                  }`}
                />
                <span>{snapshot.ramKey2.key}</span>
              </div>
              <span className="opacity-80 truncate max-w-[150px]">{snapshot.ramKey2.value}</span>
              <span className="text-[8px] opacity-75">
                {snapshot.ramKey2.isNew ? 'TTL: 3600s' : '-'}
              </span>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* CAPA 3: BÚNKER DE ALMACENAMIENTO PERSISTENTE (POSTGRESQL SSD)   */}
        {/* Cilindro con rotor magnético y lectura mecánica/física           */}
        {/* --------------------------------------------------------------- */}
        <div
          className={`relative z-10 w-full rounded-2xl p-3 border transition-all duration-500 flex flex-col gap-2 ${
            snapshot.activeLayer === 'disk-vault'
              ? 'bg-[#f59e0b]/10 border-[#f59e0b] shadow-2xl shadow-[#f59e0b]/25 ring-2 ring-[#f59e0b]/30 scale-[1.02]'
              : 'bg-[#0e1726] border-[#1e293b]'
          }`}
        >
          {/* Cabecera Database */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#f59e0b]/15 border border-[#f59e0b]/30 flex items-center justify-center">
                <Database className="w-4 h-4 text-[#f59e0b]" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-white tracking-wide block leading-tight">
                  BÚNKER DE DISCO (POSTGRESQL SSD)
                </span>
                <span className="text-[9px] font-mono text-[#64748b]">
                  {snapshot.dbStateText}
                </span>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-black bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30">
              ~85ms
            </span>
          </div>

          {/* Animación del Rotor de Disco y Pistas Físicas */}
          <div className="flex items-center gap-3 bg-[#070a12]/80 border border-[#1e293b] rounded-xl p-2">
            {/* Rotor Mecánico */}
            <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full border-2 border-dashed border-[#64748b] ${
                  snapshot.diskSpinning ? 'animate-spin border-[#f59e0b]' : ''
                }`}
              />
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  snapshot.diskSpinning ? 'bg-[#f59e0b] animate-ping' : 'bg-[#334155]'
                }`}
              />
            </div>

            {/* Diagnóstico de I/O Seek */}
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[9px] font-mono">
                <span className="text-[#94a3b8]">I/O Block Seek Time</span>
                <span
                  className={`font-black ${
                    snapshot.diskSpinning ? 'text-[#f59e0b]' : 'text-[#64748b]'
                  }`}
                >
                  {snapshot.diskSpinning ? 'ESCANEANDO DISCO' : 'REPOSO (0%)'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#f59e0b] rounded-full transition-all duration-500"
                  style={{ width: `${snapshot.dbCpuPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 3. FOOTER: TELEMETRÍA DE VELOCIDAD Y EXPLICACIÓN                  */}
      {/* ================================================================= */}
      <div className="relative z-20 pt-2.5 border-t border-[#1e293b] flex flex-col gap-2">
        {/* Comparativa de Barras */}
        <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
          <div className="bg-[#0e1726] border border-[#1e293b] rounded-lg p-1.5 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[#10b981] font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#10b981]" /> RAM Hit
              </span>
              <span className="text-white font-black">4 ms</span>
            </div>
            <div className="w-full h-1 bg-[#070a12] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#10b981] rounded-full transition-all duration-300"
                style={{ width: `${snapshot.latencyHitBar}%` }}
              />
            </div>
          </div>

          <div className="bg-[#0e1726] border border-[#1e293b] rounded-lg p-1.5 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[#f59e0b] font-bold flex items-center gap-1">
                <HardDrive className="w-3 h-3 text-[#f59e0b]" /> Disk Miss
              </span>
              <span className="text-white font-black">{snapshot.latencyText}</span>
            </div>
            <div className="w-full h-1 bg-[#070a12] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#f59e0b] rounded-full transition-all duration-300"
                style={{ width: `${snapshot.latencyMissBar}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tarjeta de Paso Explicativo */}
        <div className="p-2 bg-[#0e1726] border border-[#1e293b] rounded-xl flex flex-col gap-0.5">
          <span className="text-[10px] font-mono font-bold text-[#38bdf8]">
            {snapshot.stepTitle}
          </span>
          <p className="text-[10px] text-[#94a3b8] leading-tight line-clamp-2">
            {snapshot.description}
          </p>
        </div>
      </div>
    </div>
  );
};
