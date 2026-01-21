'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Eye, Edit3, Split } from 'lucide-react';
import { cn } from '@/lib/utils';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSave?: (value: string) => void;
  readOnly?: boolean;
}

type ViewMode = 'edit' | 'preview' | 'split';

export function MarkdownEditor({
  value,
  onChange,
  onSave,
  readOnly = false,
}: MarkdownEditorProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(readOnly ? 'preview' : 'split');

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        onSave?.(value);
      }
    },
    [value, onSave]
  );

  return (
    <div className="flex flex-col h-full" onKeyDown={handleKeyDown}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
          <button
            onClick={() => setViewMode('edit')}
            className={cn(
              'px-3 py-1 flex items-center gap-1 text-sm',
              viewMode === 'edit'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            )}
            disabled={readOnly}
          >
            <Edit3 size={14} />
            Edit
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={cn(
              'px-3 py-1 flex items-center gap-1 text-sm border-x border-gray-300 dark:border-gray-600',
              viewMode === 'split'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            )}
            disabled={readOnly}
          >
            <Split size={14} />
            Split
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={cn(
              'px-3 py-1 flex items-center gap-1 text-sm',
              viewMode === 'preview'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            )}
          >
            <Eye size={14} />
            Preview
          </button>
        </div>

        {onSave && !readOnly && (
          <button
            onClick={() => onSave(value)}
            className="ml-auto px-4 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
          >
            Save (Cmd+S)
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'edit' && !readOnly && (
          <div className="h-full" data-color-mode="light">
            <MDEditor
              value={value}
              onChange={(val) => onChange(val || '')}
              height="100%"
              preview="edit"
            />
          </div>
        )}

        {viewMode === 'preview' && (
          <div className="h-full overflow-auto p-6 prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          </div>
        )}

        {viewMode === 'split' && !readOnly && (
          <div className="flex h-full">
            <div className="w-1/2 border-r border-gray-200 dark:border-gray-700" data-color-mode="light">
              <MDEditor
                value={value}
                onChange={(val) => onChange(val || '')}
                height="100%"
                preview="edit"
              />
            </div>
            <div className="w-1/2 overflow-auto p-6 prose dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
