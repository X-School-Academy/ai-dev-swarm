'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, SprintInfo } from '@/lib/api';
import { AlertCircle, FolderKanban, ArrowRight } from 'lucide-react';
import { cn, getBacklogStatusColor, getBacklogTypeColor } from '@/lib/utils';

export default function SprintsPage() {
  const [sprints, setSprints] = useState<SprintInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSprints() {
      try {
        const data = await api.sprints.list();
        setSprints(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load sprints');
      } finally {
        setLoading(false);
      }
    }
    loadSprints();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500 flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <FolderKanban className="text-purple-500" size={28} />
        <div>
          <h1 className="text-2xl font-bold">Sprints</h1>
          <p className="text-sm text-gray-500">
            Manage development sprints and backlogs
          </p>
        </div>
      </div>

      {sprints.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <FolderKanban size={48} className="mx-auto mb-4 opacity-50" />
          <p>No sprints found.</p>
          <p className="text-sm mt-2">
            Start stage 09 (sprints) to create your first sprint.
          </p>
          <Link
            href="/stages/09"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Go to Stage 09
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {sprints.map((sprint) => (
            <Link key={sprint.name} href={`/sprints/${sprint.name}`}>
              <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{sprint.name}</h2>
                  <span
                    className={cn(
                      'px-2 py-1 rounded text-xs font-medium',
                      sprint.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : sprint.status === 'completed'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-yellow-100 text-yellow-800'
                    )}
                  >
                    {sprint.status}
                  </span>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  {sprint.backlogs.length} backlogs
                </div>

                {/* Backlog summary */}
                <div className="flex flex-wrap gap-2">
                  {['FEATURE', 'CHANGE', 'BUG', 'IMPROVE'].map((type) => {
                    const count = sprint.backlogs.filter(
                      (b) => b.type === type
                    ).length;
                    if (count === 0) return null;
                    return (
                      <span
                        key={type}
                        className={cn(
                          'px-2 py-0.5 rounded text-xs font-medium',
                          getBacklogTypeColor(type)
                        )}
                      >
                        {count} {type}
                      </span>
                    );
                  })}
                </div>

                {/* Status summary */}
                <div className="mt-4 flex gap-1 h-2 rounded overflow-hidden">
                  {['completed', 'testing', 'review', 'in_progress', 'pending'].map(
                    (status) => {
                      const count = sprint.backlogs.filter(
                        (b) => b.status === status
                      ).length;
                      const percent = (count / sprint.backlogs.length) * 100;
                      if (percent === 0) return null;
                      return (
                        <div
                          key={status}
                          className={cn(
                            'h-full',
                            status === 'completed' && 'bg-green-500',
                            status === 'testing' && 'bg-orange-500',
                            status === 'review' && 'bg-purple-500',
                            status === 'in_progress' && 'bg-blue-500',
                            status === 'pending' && 'bg-gray-300'
                          )}
                          style={{ width: `${percent}%` }}
                          title={`${status}: ${count}`}
                        />
                      );
                    }
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
