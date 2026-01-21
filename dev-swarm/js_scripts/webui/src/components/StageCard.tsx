'use client';

import Link from 'next/link';
import { StageInfo } from '@/lib/api';
import { cn, getStageStatusColor } from '@/lib/utils';
import {
  CheckCircle,
  Circle,
  PlayCircle,
  SkipForward,
  ArrowRight,
} from 'lucide-react';

interface StageCardProps {
  stage: StageInfo;
  isActive?: boolean;
}

export function StageCard({ stage, isActive }: StageCardProps) {
  const statusIcon = {
    completed: <CheckCircle className="text-green-500" size={20} />,
    in_progress: <PlayCircle className="text-blue-500" size={20} />,
    skipped: <SkipForward className="text-gray-500" size={20} />,
    pending: <Circle className="text-yellow-500" size={20} />,
  };

  return (
    <Link href={`/stages/${stage.stage_id}`}>
      <div
        className={cn(
          'p-4 rounded-lg border transition hover:shadow-md',
          isActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {statusIcon[stage.status]}
            <span className="font-mono text-sm text-gray-500">
              {stage.stage_id}
            </span>
          </div>
          <span
            className={cn(
              'px-2 py-0.5 rounded text-xs font-medium',
              getStageStatusColor(stage.status)
            )}
          >
            {stage.status.replace('_', ' ')}
          </span>
        </div>

        <h3 className="font-semibold mb-1">{stage.name}</h3>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{stage.skippable ? 'Skippable' : 'Required'}</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
