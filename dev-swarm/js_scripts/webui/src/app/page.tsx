'use client';

import { useEffect, useState, useCallback } from 'react';
import { api, StageInfo } from '@/lib/api';
import { StageCard } from '@/components/StageCard';
import { Rocket, FileText, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [stages, setStages] = useState<StageInfo[]>([]);
  const [hasIdeas, setHasIdeas] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [stagesData, ideasData] = await Promise.all([
        api.stages.list(),
        api.ideas.getCurrent(),
      ]);
      setStages(stagesData);
      setHasIdeas(ideasData.exists);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
        <div className="text-red-500 flex items-center gap-3">
          <AlertCircle size={20} />
          {error}
          <button
            onClick={loadData}
            className="text-sm px-2 py-1 border border-red-300 rounded hover:bg-red-50 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentStage = stages.find(
    (s) => s.status === 'in_progress' || s.status === 'pending'
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Dev Swarm</h1>
        <p className="text-gray-600 dark:text-gray-400">
          AI-driven software development workflow
        </p>
      </div>

      {/* Quick Start */}
      {!hasIdeas && (
        <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <Rocket className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold">Get Started</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start by creating your ideas.md file to define your project.
          </p>
          <Link
            href="/ideas"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FileText size={18} />
            Create Ideas
          </Link>
        </div>
      )}

      {/* Current Stage */}
      {currentStage && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Stage</h2>
          <StageCard stage={currentStage} isActive />
        </div>
      )}

      {/* All Stages */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Development Stages</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stages.map((stage) => (
            <StageCard key={stage.stage_id} stage={stage} />
          ))}
        </div>
      </div>
    </div>
  );
}
