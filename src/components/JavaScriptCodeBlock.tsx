import React from 'react';
import { EVENT_LOOP_CODE_LINES } from '../data/eventLoopAlgorithm';

interface JavaScriptCodeBlockProps {
  activeLine: number;
}

export const JavaScriptCodeBlock: React.FC<JavaScriptCodeBlockProps> = ({ activeLine }) => {
  const renderTokens = (code: string) => {
    // Basic regex tokenization for JS in dark neon theme
    const tokens: React.ReactNode[] = [];
    const regex = /(\/\/.*$)|(\b(?:console|log|setTimeout|Promise|resolve|then)\b)|(\b\d+\b)|(".*?")|([()[\]{}:;,=+\-*/=>])|(\s+)|([a-zA-Z_]\w*)/g;

    let match: RegExpExecArray | null;
    let lastIdx = 0;
    let keyIdx = 0;

    while ((match = regex.exec(code)) !== null) {
      if (match.index > lastIdx) {
        tokens.push(
          <span key={`txt-${keyIdx++}`} className="text-[#e2e8f0]">
            {code.slice(lastIdx, match.index)}
          </span>
        );
      }

      if (match[1]) {
        // Comments
        tokens.push(
          <span key={`cm-${keyIdx++}`} className="text-[#64748b] italic">
            {match[1]}
          </span>
        );
      } else if (match[2]) {
        // Builtins / Identifiers
        const isBuiltin = ['Promise', 'resolve', 'then', 'setTimeout'].includes(match[2]);
        tokens.push(
          <span
            key={`id-${keyIdx++}`}
            className={isBuiltin ? 'text-[#38bdf8] font-bold' : 'text-[#a855f7] font-semibold'}
          >
            {match[2]}
          </span>
        );
      } else if (match[3]) {
        // Numbers
        tokens.push(
          <span key={`num-${keyIdx++}`} className="text-[#fbbf24]">
            {match[3]}
          </span>
        );
      } else if (match[4]) {
        // Strings
        tokens.push(
          <span key={`str-${keyIdx++}`} className="text-[#10b981]">
            {match[4]}
          </span>
        );
      } else if (match[5]) {
        // Operators & punctuation
        tokens.push(
          <span key={`op-${keyIdx++}`} className="text-[#38bdf8]/80">
            {match[5]}
          </span>
        );
      } else if (match[6]) {
        // Spaces
        tokens.push(<span key={`sp-${keyIdx++}`}>{match[6]}</span>);
      } else if (match[7]) {
        // Other words
        tokens.push(
          <span key={`var-${keyIdx++}`} className="text-[#f8fafc]">
            {match[7]}
          </span>
        );
      }

      lastIdx = regex.lastIndex;
    }

    if (lastIdx < code.length) {
      tokens.push(
        <span key={`tail-${keyIdx++}`} className="text-[#e2e8f0]">
          {code.slice(lastIdx)}
        </span>
      );
    }

    return tokens;
  };

  return (
    <div className="w-full bg-[#0f172a] border border-[#1e293b] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Header / macOS Dots */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1e293b] border-b border-[#334155]/60">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f43f5e]" />
          <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
          <div className="w-3 h-3 rounded-full bg-[#10b981]" />
          <span className="ml-2 text-xs font-mono font-bold text-[#f8fafc] flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            event_loop.js
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#64748b]">ECMAScript V8 • 60fps</span>
      </div>

      {/* Code Text Area with Line numbers */}
      <div className="p-3 text-[12px] sm:text-[13px] font-mono leading-[22px] sm:leading-[25px] overflow-x-auto select-none">
        {EVENT_LOOP_CODE_LINES.map((lineText, idx) => {
          const lineNumber = idx + 1;
          const isActive = lineNumber === activeLine;

          return (
            <div
              key={lineNumber}
              className={`flex items-center rounded-lg px-2 transition-all duration-200 relative ${
                isActive
                  ? 'bg-[#1e293b] text-white border-l-4 border-[#38bdf8] shadow-md shadow-[#38bdf8]/15'
                  : 'hover:bg-[#1e293b]/40 text-[#94a3b8]'
              }`}
            >
              {/* Active arrow indicator */}
              <div className="w-4 text-center mr-1 text-[#38bdf8] font-bold text-[10px]">
                {isActive ? '▶' : ''}
              </div>

              {/* Line number */}
              <span
                className={`w-6 text-right select-none mr-3 text-xs ${
                  isActive ? 'text-[#38bdf8] font-bold' : 'text-[#475569]'
                }`}
              >
                {lineNumber}
              </span>

              {/* Code content */}
              <div className="whitespace-pre flex-1 font-mono tracking-wide py-0.5">
                {renderTokens(lineText)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
