'use client';

import { useEffect, useState } from 'react';
import { api, StageInfo } from '@/lib/api';
import { StageCard } from '@/components/StageCard';
import { AlertCircle, Layers } from 'lucide-react';

export default function StagesPage() {
  const [stages, setStages] = useState<StageInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStages() {
      try {
        const data = await api.stages.list();
        setStages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stages');
      } finally {
        setLoading(false);
      }
    }
    loadStages();
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

  // Group stages by category
  const categories = {
    'Discovery & Planning': stages.filter((s) =>
      ['00', '01', '02'].includes(s.stage_id)
    ),
    'Product Definition': stages.filter((s) =>
      ['03', '04'].includes(s.stage_id)
    ),
    Design: stages.filter((s) => ['05'].includes(s.stage_id)),
    'Technical Planning': stages.filter((s) =>
      ['06', '07'].includes(s.stage_id)
    ),
    Implementation: stages.filter((s) => ['08', '09'].includes(s.stage_id)),
    Release: stages.filter((s) => ['10', '99'].includes(s.stage_id)),
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Layers className="text-blue-500" size={28} />
        <div>
          <h1 className="text-2xl font-bold">Development Stages</h1>
          <p className="text-sm text-gray-500">
            Track your progress through the development lifecycle
          </p>
        </div>
      </div>

      {Object.entries(categories).map(([category, categoryStages]) => (
        <div key={category} className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
            {category}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryStages.map((stage) => (
              <StageCard key={stage.stage_id} stage={stage} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
