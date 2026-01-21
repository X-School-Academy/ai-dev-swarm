'use client';

import { BacklogItem } from '@/lib/api';
import { cn, getBacklogStatusColor, getBacklogTypeColor } from '@/lib/utils';
import { Code, Eye, TestTube, ArrowRight } from 'lucide-react';

interface BacklogCardProps {
  backlog: BacklogItem;
  onAction?: (action: 'dev' | 'review' | 'test') => void;
  isExecuting?: boolean;
}

export function BacklogCard({ backlog, onAction, isExecuting }: BacklogCardProps) {
  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'px-2 py-0.5 rounded text-xs font-medium',
              getBacklogTypeColor(backlog.type)
            )}
          >
            {backlog.type}
          </span>
          <span
            className={cn(
              'px-2 py-0.5 rounded text-xs font-medium',
              getBacklogStatusColor(backlog.status)
            )}
          >
            {backlog.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      <h3 className="font-semibold mb-1">{backlog.title}</h3>

      <div className="text-sm text-gray-500 mb-3">
        <span className="font-mono">{backlog.feature_name}</span>
        {backlog.sub_feature && (
          <>
            <ArrowRight size={12} className="inline mx-1" />
            <span className="font-mono">{backlog.sub_feature}</span>
          </>
        )}
      </div>

      {onAction && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAction('dev')}
            disabled={isExecuting}
            className={cn(
              'flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded text-sm transition',
              isExecuting
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300'
            )}
          >
            <Code size={14} />
            Dev
          </button>
          <button
            onClick={() => onAction('review')}
            disabled={isExecuting}
            className={cn(
              'flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded text-sm transition',
              isExecuting
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300'
            )}
          >
            <Eye size={14} />
            Review
          </button>
          <button
            onClick={() => onAction('test')}
            disabled={isExecuting}
            className={cn(
              'flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded text-sm transition',
              isExecuting
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-300'
            )}
          >
            <TestTube size={14} />
            Test
          </button>
        </div>
      )}
    </div>
  );
}
