'use client';

import { useRef, useEffect } from 'react';
import { AgentOutput } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Square, Terminal } from 'lucide-react';

interface TerminalOutputProps {
  outputs: AgentOutput[];
  isRunning: boolean;
  onInterrupt?: () => void;
  onTerminate?: () => void;
}

export function TerminalOutput({
  outputs,
  isRunning,
  onInterrupt,
  onTerminate,
}: TerminalOutputProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [outputs]);

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-gray-400" />
          <span className="text-sm text-gray-300">Agent Output</span>
          {isRunning && (
            <span className="flex items-center gap-1 text-xs text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Running
            </span>
          )}
        </div>

        {isRunning && (
          <div className="flex items-center gap-2">
            <button
              onClick={onInterrupt}
              className="px-2 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
            >
              Interrupt (Ctrl+C)
            </button>
            <button
              onClick={onTerminate}
              className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center gap-1"
            >
              <Square size={12} />
              Terminate
            </button>
          </div>
        )}
      </div>

      {/* Output */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed"
      >
        {outputs.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No output yet. Start an agent execution to see output here.
          </div>
        ) : (
          outputs.map((output, index) => (
            <div
              key={index}
              className={cn(
                'whitespace-pre-wrap',
                output.type === 'stdout' && 'text-green-400',
                output.type === 'stderr' && 'text-red-400',
                output.type === 'status' && 'text-blue-400',
                output.type === 'done' && 'text-cyan-400',
                output.type === 'error' && 'text-red-500 font-bold'
              )}
            >
              {output.type === 'status' && '> '}
              {output.type === 'error' && 'ERROR: '}
              {output.content}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
