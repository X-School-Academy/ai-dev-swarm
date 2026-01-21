'use client';

import { useEffect, useState, useRef } from 'react';
import { api, AgentOutput, executeAgent } from '@/lib/api';
import { TerminalOutput } from '@/components/TerminalOutput';
import { AlertCircle, Bot, Play, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Agent {
  name: string;
  description: string;
  command: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string>('claude');
  const [prompt, setPrompt] = useState('');
  const [outputs, setOutputs] = useState<AgentOutput[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeExecutions, setActiveExecutions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    async function loadAgents() {
      try {
        const [agentsData, activeData] = await Promise.all([
          api.agents.getAvailable(),
          api.agents.getActive(),
        ]);
        setAgents(agentsData.agents);
        setActiveExecutions(activeData.executions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load agents');
      } finally {
        setLoading(false);
      }
    }
    loadAgents();

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  const handleExecute = () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setOutputs([]);
    setIsExecuting(true);
    setError(null);

    cleanupRef.current = executeAgent(
      selectedAgent,
      prompt,
      undefined,
      (output) => setOutputs((prev) => [...prev, output]),
      (err) => {
        setError(err.message);
        setIsExecuting(false);
      },
      () => {
        setIsExecuting(false);
        setPrompt('');
      }
    );
  };

  const handleInterrupt = () => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    setOutputs((prev) => [
      ...prev,
      {
        type: 'status',
        content: 'Interrupted by user',
        timestamp: new Date().toISOString(),
      },
    ]);
    setIsExecuting(false);
  };

  const handleTerminate = () => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    setOutputs((prev) => [
      ...prev,
      {
        type: 'error',
        content: 'Terminated by user',
        timestamp: new Date().toISOString(),
      },
    ]);
    setIsExecuting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleExecute();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <Bot className="text-cyan-500" size={28} />
        <div>
          <h1 className="text-2xl font-bold">AI Agents</h1>
          <p className="text-sm text-gray-500">
            Execute AI agents in headless mode
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-300">
          <AlertCircle size={18} />
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-auto text-sm underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Agent Selection & Prompt */}
      <div className="mb-4 flex gap-4">
        <div className="w-48">
          <label className="block text-sm font-medium mb-2">Agent</label>
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            disabled={isExecuting}
            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {agents.map((agent) => (
              <option key={agent.name} value={agent.name}>
                {agent.name} - {agent.description}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Prompt</label>
          <div className="flex gap-2">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your prompt... (Cmd+Enter to execute)"
              disabled={isExecuting}
              className="flex-1 p-2 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
              rows={2}
            />
            <button
              onClick={handleExecute}
              disabled={isExecuting || !prompt.trim()}
              className={cn(
                'px-4 rounded-lg transition flex items-center gap-2',
                isExecuting || !prompt.trim()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              )}
            >
              {isExecuting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                <Play size={18} />
              )}
              Execute
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-gray-500">Quick:</span>
        {[
          { label: '/stage 00', prompt: '/stage 00' },
          { label: '/sprint', prompt: '/sprint' },
          { label: '/backlog', prompt: '/backlog' },
          { label: '/commit', prompt: '/commit' },
        ].map((action) => (
          <button
            key={action.label}
            onClick={() => setPrompt(action.prompt)}
            disabled={isExecuting}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Output */}
      <div className="flex-1">
        <TerminalOutput
          outputs={outputs}
          isRunning={isExecuting}
          onInterrupt={handleInterrupt}
          onTerminate={handleTerminate}
        />
      </div>

      {/* Active Executions */}
      {activeExecutions.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h3 className="font-medium text-sm mb-2">Active Executions</h3>
          <div className="flex flex-wrap gap-2">
            {activeExecutions.map((id) => (
              <span
                key={id}
                className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 rounded text-xs font-mono"
              >
                {id.slice(0, 8)}...
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
