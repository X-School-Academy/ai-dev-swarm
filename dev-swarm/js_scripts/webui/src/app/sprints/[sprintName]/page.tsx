'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import {
  api,
  SprintInfo,
  BacklogItem,
  AgentOutput,
  executeAgent,
} from '@/lib/api';
import { BacklogCard } from '@/components/BacklogCard';
import { TerminalOutput } from '@/components/TerminalOutput';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { AlertCircle, ArrowLeft, FolderKanban } from 'lucide-react';
import Link from 'next/link';
import { cn, getBacklogTypeColor } from '@/lib/utils';

export default function SprintDetailPage() {
  const params = useParams();
  const sprintName = params.sprintName as string;

  const [sprint, setSprint] = useState<SprintInfo | null>(null);
  const [selectedBacklog, setSelectedBacklog] = useState<BacklogItem | null>(null);
  const [backlogContent, setBacklogContent] = useState('');
  const [outputs, setOutputs] = useState<AgentOutput[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const loadSprint = useCallback(async () => {
    try {
      const data = await api.sprints.get(sprintName);
      setSprint(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sprint');
    } finally {
      setLoading(false);
    }
  }, [sprintName]);

  useEffect(() => {
    loadSprint();
  }, [loadSprint]);

  const handleBacklogSelect = async (backlog: BacklogItem) => {
    setSelectedBacklog(backlog);
    try {
      const content = await api.files.read(backlog.file_path);
      setBacklogContent(content.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to read backlog');
    }
  };

  const handleBacklogAction = (
    backlog: BacklogItem,
    action: 'dev' | 'review' | 'test'
  ) => {
    setSelectedBacklog(backlog);
    setOutputs([]);
    setIsExecuting(true);

    const skillMap = {
      dev: 'dev-swarm-code-development',
      review: 'dev-swarm-code-review',
      test: 'dev-swarm-code-test',
    };

    const prompt = `/skill ${skillMap[action]} ${backlog.file_path}`;

    executeAgent(
      'claude',
      prompt,
      undefined,
      (output) => setOutputs((prev) => [...prev, output]),
      (err) => {
        setError(err.message);
        setIsExecuting(false);
      },
      () => {
        setIsExecuting(false);
        loadSprint();
      }
    );
  };

  const handleBacklogSave = async (content: string) => {
    if (!selectedBacklog) return;

    try {
      await api.files.write(
        selectedBacklog.file_path,
        content,
        `Update backlog ${selectedBacklog.id}`
      );
      setBacklogContent(content);
      loadSprint();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save backlog');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!sprint) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500 flex items-center gap-2">
          <AlertCircle size={20} />
          Sprint not found
        </div>
      </div>
    );
  }

  const filteredBacklogs = filter
    ? sprint.backlogs.filter((b) => b.type === filter)
    : sprint.backlogs;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link
          href="/sprints"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
        >
          <ArrowLeft size={20} />
        </Link>
        <FolderKanban className="text-purple-500" size={28} />
        <div>
          <h1 className="text-2xl font-bold">{sprint.name}</h1>
          <p className="text-sm text-gray-500">
            {sprint.backlogs.length} backlogs
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

      {/* Filter */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-500">Filter:</span>
        <button
          onClick={() => setFilter(null)}
          className={cn(
            'px-3 py-1 rounded text-sm transition',
            !filter
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          )}
        >
          All
        </button>
        {['FEATURE', 'CHANGE', 'BUG', 'IMPROVE'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={cn(
              'px-3 py-1 rounded text-sm transition',
              filter === type
                ? getBacklogTypeColor(type)
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Backlog List */}
        <div className="w-96 flex-shrink-0 overflow-auto space-y-3">
          {filteredBacklogs.map((backlog) => (
            <div
              key={backlog.id}
              onClick={() => handleBacklogSelect(backlog)}
              className={cn(
                'cursor-pointer',
                selectedBacklog?.id === backlog.id &&
                  'ring-2 ring-purple-500 rounded-lg'
              )}
            >
              <BacklogCard
                backlog={backlog}
                onAction={(action) => handleBacklogAction(backlog, action)}
                isExecuting={isExecuting && selectedBacklog?.id === backlog.id}
              />
            </div>
          ))}
        </div>

        {/* Editor / Terminal */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Editor */}
          {selectedBacklog && (
            <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <MarkdownEditor
                value={backlogContent}
                onChange={setBacklogContent}
                onSave={handleBacklogSave}
              />
            </div>
          )}

          {/* Terminal */}
          {(isExecuting || outputs.length > 0) && (
            <div className="h-64 flex-shrink-0">
              <TerminalOutput
                outputs={outputs}
                isRunning={isExecuting}
                onInterrupt={() => {}}
                onTerminate={() => setIsExecuting(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
