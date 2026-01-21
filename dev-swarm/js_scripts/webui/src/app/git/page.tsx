'use client';

import { useEffect, useState } from 'react';
import { api, GitStatus } from '@/lib/api';
import {
  AlertCircle,
  CheckCircle,
  GitBranch,
  GitCommit,
  File,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GitPage() {
  const [status, setStatus] = useState<GitStatus | null>(null);
  const [commits, setCommits] = useState<
    Array<{ hash: string; message: string; author: string; date: string }>
  >([]);
  const [commitMessage, setCommitMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [committing, setCommitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadGitData = async () => {
    try {
      const [statusData, commitsData] = await Promise.all([
        api.git.status(),
        api.git.getCommits(10),
      ]);
      setStatus(statusData);
      setCommits(commitsData.commits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load git data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGitData();
  }, []);

  const handleStageAll = async () => {
    try {
      await api.git.addAll();
      setSuccess('All changes staged');
      loadGitData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stage changes');
    }
  };

  const handleCommit = async () => {
    if (!commitMessage.trim()) {
      setError('Please enter a commit message');
      return;
    }

    setCommitting(true);
    setError(null);

    try {
      await api.git.commit(commitMessage);
      setSuccess('Changes committed successfully');
      setCommitMessage('');
      loadGitData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to commit');
    } finally {
      setCommitting(false);
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
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <GitBranch className="text-orange-500" size={28} />
          <div>
            <h1 className="text-2xl font-bold">Git</h1>
            <p className="text-sm text-gray-500">
              Branch: <span className="font-mono">{status?.branch}</span>
            </p>
          </div>
        </div>

        <button
          onClick={loadGitData}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
          title="Refresh"
        >
          <RefreshCw size={20} />
        </button>
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
          <button
            onClick={() => setSuccess(null)}
            className="ml-auto text-sm underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Status */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="font-medium">Working Tree</span>
            {status?.is_clean ? (
              <span className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle size={14} />
                Clean
              </span>
            ) : (
              <button
                onClick={handleStageAll}
                className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition flex items-center gap-1"
              >
                <Plus size={14} />
                Stage All
              </button>
            )}
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {status?.staged.length ? (
              <div className="p-3">
                <h4 className="text-xs font-medium text-green-600 mb-2">
                  Staged ({status.staged.length})
                </h4>
                {status.staged.map((file) => (
                  <div
                    key={file}
                    className="flex items-center gap-2 text-sm text-gray-600 py-1"
                  >
                    <File size={14} className="text-green-500" />
                    <span className="font-mono text-xs">{file}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {status?.modified.length ? (
              <div className="p-3">
                <h4 className="text-xs font-medium text-yellow-600 mb-2">
                  Modified ({status.modified.length})
                </h4>
                {status.modified.map((file) => (
                  <div
                    key={file}
                    className="flex items-center gap-2 text-sm text-gray-600 py-1"
                  >
                    <File size={14} className="text-yellow-500" />
                    <span className="font-mono text-xs">{file}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {status?.untracked.length ? (
              <div className="p-3">
                <h4 className="text-xs font-medium text-gray-500 mb-2">
                  Untracked ({status.untracked.length})
                </h4>
                {status.untracked.map((file) => (
                  <div
                    key={file}
                    className="flex items-center gap-2 text-sm text-gray-600 py-1"
                  >
                    <File size={14} className="text-gray-400" />
                    <span className="font-mono text-xs">{file}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {status?.is_clean && (
              <div className="p-6 text-center text-gray-500 text-sm">
                No changes to commit
              </div>
            )}
          </div>
        </div>

        {/* Commit */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <span className="font-medium">Commit</span>
          </div>

          <div className="p-4">
            <textarea
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="Commit message..."
              className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
            />

            <button
              onClick={handleCommit}
              disabled={committing || !commitMessage.trim() || status?.is_clean}
              className={cn(
                'w-full mt-3 px-4 py-2 rounded-lg transition flex items-center justify-center gap-2',
                committing || !commitMessage.trim() || status?.is_clean
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              )}
            >
              <GitCommit size={18} />
              {committing ? 'Committing...' : 'Commit Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Commits */}
      <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <span className="font-medium">Recent Commits</span>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {commits.map((commit) => (
            <div key={commit.hash} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <div className="flex items-start gap-3">
                <GitCommit size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{commit.message}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span className="font-mono">{commit.hash.slice(0, 7)}</span>
                    <span>by {commit.author}</span>
                    <span>{new Date(commit.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
