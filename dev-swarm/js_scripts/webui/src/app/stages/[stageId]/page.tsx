'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { api, StageInfo, FileInfo, AgentOutput, executeAgent } from '@/lib/api';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { TerminalOutput } from '@/components/TerminalOutput';
import {
  AlertCircle,
  CheckCircle,
  FileText,
  Play,
  SkipForward,
  FolderOpen,
} from 'lucide-react';
import { cn, getStageStatusColor } from '@/lib/utils';

export default function StageDetailPage() {
  const params = useParams();
  const stageId = params.stageId as string;

  const [stage, setStage] = useState<StageInfo | null>(null);
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [outputs, setOutputs] = useState<AgentOutput[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadStage = useCallback(async () => {
    try {
      const stageData = await api.stages.get(stageId);
      setStage(stageData);

      if (stageData.folder_exists) {
        const folderName = `${stageId}-${stageData.name}`;
        const filesData = await api.files.listStage(folderName);
        setFiles(filesData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stage');
    } finally {
      setLoading(false);
    }
  }, [stageId]);

  useEffect(() => {
    loadStage();
  }, [loadStage]);

  const handleFileSelect = async (filePath: string) => {
    setSelectedFile(filePath);
    try {
      const content = await api.files.read(filePath);
      setFileContent(content.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to read file');
    }
  };

  const handleFileSave = async (content: string) => {
    if (!selectedFile) return;

    try {
      await api.files.write(selectedFile, content, `Update ${selectedFile}`);
      setFileContent(content);
      setSuccess('File saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save file');
    }
  };

  const handleSkipStage = async () => {
    if (!stage?.skippable) return;

    try {
      await api.stages.skip(stageId);
      setSuccess('Stage skipped successfully!');
      await loadStage();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to skip stage');
    }
  };

  const handleStartStage = () => {
    if (!stage) return;

    setOutputs([]);
    setIsExecuting(true);

    const prompt = `/stage ${stageId}`;
    const cleanup = executeAgent(
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
        loadStage();
      }
    );

    // Store cleanup function
    return cleanup;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stage) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500 flex items-center gap-2">
          <AlertCircle size={20} />
          Stage not found
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded font-mono text-sm">
            {stage.stage_id}
          </span>
          <div>
            <h1 className="text-2xl font-bold">{stage.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={cn(
                  'px-2 py-0.5 rounded text-xs font-medium',
                  getStageStatusColor(stage.status)
                )}
              >
                {stage.status.replace('_', ' ')}
              </span>
              <span className="text-sm text-gray-500">
                {stage.skippable ? 'Skippable' : 'Required'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {stage.status === 'pending' && stage.skippable && (
            <button
              onClick={handleSkipStage}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              <SkipForward size={18} />
              Skip Stage
            </button>
          )}
          {(stage.status === 'pending' || stage.status === 'in_progress') && (
            <button
              onClick={handleStartStage}
              disabled={isExecuting}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg transition',
                isExecuting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              )}
            >
              <Play size={18} />
              {isExecuting ? 'Running...' : 'Start Stage'}
            </button>
          )}
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

      {success && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-300">
          <CheckCircle size={18} />
          {success}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* File List */}
        <div className="w-64 flex-shrink-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <FolderOpen size={16} />
            <span className="font-medium text-sm">Files</span>
          </div>
          <div className="overflow-auto max-h-96">
            {files.length === 0 ? (
              <div className="p-4 text-sm text-gray-500 text-center">
                No files yet. Start the stage to create files.
              </div>
            ) : (
              files.map((file) => (
                <button
                  key={file.path}
                  onClick={() => handleFileSelect(file.path)}
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition',
                    selectedFile === file.path && 'bg-blue-50 dark:bg-blue-900/20'
                  )}
                >
                  <FileText size={14} />
                  {file.name}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Editor / Terminal */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Editor */}
          {selectedFile && (
            <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <MarkdownEditor
                value={fileContent}
                onChange={setFileContent}
                onSave={handleFileSave}
              />
            </div>
          )}

          {/* Terminal */}
          {(isExecuting || outputs.length > 0) && (
            <div className="h-64 flex-shrink-0">
              <TerminalOutput
                outputs={outputs}
                isRunning={isExecuting}
                onInterrupt={() => {
                  // TODO: Implement interrupt
                }}
                onTerminate={() => {
                  // TODO: Implement terminate
                  setIsExecuting(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
