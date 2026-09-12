import React from 'react';
import { PYTHON_CODE_LINES } from '../data/bfsAlgorithm';

interface PythonCodeBlockProps {
  activeLine: number;
}

export const PythonCodeBlock: React.FC<PythonCodeBlockProps> = ({ activeLine }) => {
  // Syntax highlight a single Python line
  const renderTokens = (code: string) => {
    // Basic regex tokenization for Tokyo Night aesthetic
    const tokens: React.ReactNode[] = [];
    const regex = /(\b(?:from|import|def|while|if|return|for|in|and|not|or)\b)|(\b(?:deque|popleft|append|add|reconstruct_path|start|target|grid|curr|parent|visited|queue|nr|nc|dr|dc)\b)|(\b\d+\b)|([()[\]{}:,=+\-*/])|(\s+)|([a-zA-Z_]\w*)/g;
    
    let match: RegExpExecArray | null;
    let lastIdx = 0;
    let keyIdx = 0;

    while ((match = regex.exec(code)) !== null) {
      if (match.index > lastIdx) {
        tokens.push(
          <span key={`txt-${keyIdx++}`} className="text-[#c0caf5]">
            {code.slice(lastIdx, match.index)}
          </span>
        );
      }

      if (match[1]) {
        // Keywords
        tokens.push(
          <span key={`kw-${keyIdx++}`} className="text-[#bb9af7] font-semibold">
            {match[1]}
          </span>
        );
      } else if (match[2]) {
        // Builtins / identifiers
        const isFunc = ['popleft', 'append', 'add', 'reconstruct_path', 'deque'].includes(match[2]);
        tokens.push(
          <span
            key={`id-${keyIdx++}`}
            className={isFunc ? 'text-[#7aa2f7] font-semibold' : 'text-[#38bdf8]'}
          >
            {match[2]}
          </span>
        );
      } else if (match[3]) {
        // Numbers
        tokens.push(
          <span key={`num-${keyIdx++}`} className="text-[#ff9e64]">
            {match[3]}
          </span>
        );
      } else if (match[4]) {
        // Operators & punctuation
        tokens.push(
          <span key={`op-${keyIdx++}`} className="text-[#89ddff]">
            {match[4]}
          </span>
        );
      } else if (match[5]) {
        // Spaces
        tokens.push(<span key={`sp-${keyIdx++}`}>{match[5]}</span>);
      } else if (match[6]) {
        // Other words
        tokens.push(
          <span key={`var-${keyIdx++}`} className="text-[#c0caf5]">
            {match[6]}
          </span>
        );
      }

      lastIdx = regex.lastIndex;
    }

    if (lastIdx < code.length) {
      tokens.push(
        <span key={`tail-${keyIdx++}`} className="text-[#c0caf5]">
          {code.slice(lastIdx)}
        </span>
      );
    }

    return tokens;
  };

  return (
    <div className="w-full bg-[#16161e] border border-[#414868]/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Header / macOS Dots */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1f2335] border-b border-[#414868]/40">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f43f5e]" />
          <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
          <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
          <span className="ml-2 text-xs font-mono font-medium text-[#7aa2f7] flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            bfs_matrix.py
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#565f89]">Python 3.12 • Synchronized</span>
      </div>

      {/* Code Area */}
      <div className="p-3 text-[13px] sm:text-[14px] font-mono leading-[22px] sm:leading-[26px] overflow-x-auto relative select-none">
        {PYTHON_CODE_LINES.map((lineText, idx) => {
          const lineNumber = idx + 1;
          const isActive = lineNumber === activeLine;

          return (
            <div
              key={lineNumber}
              className={`flex items-center rounded-md px-2 transition-all duration-300 relative ${
                isActive
                  ? 'bg-[#292e42] text-white border-l-4 border-[#38bdf8] shadow-sm shadow-[#38bdf8]/20'
                  : 'hover:bg-[#1a1b26]/50 text-[#c0caf5]'
              }`}
            >
              {/* Active arrow indicator */}
              <div className="w-4 text-center mr-1 text-[#38bdf8] font-bold text-[10px]">
                {isActive ? '▶' : ''}
              </div>

              {/* Line number */}
              <span
                className={`w-7 text-right select-none mr-3 transition-colors text-xs ${
                  isActive ? 'text-[#38bdf8] font-bold' : 'text-[#414868]'
                }`}
              >
                {lineNumber}
              </span>

              {/* Code text */}
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
