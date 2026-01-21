'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';

export default function IdeasPage() {
  const [content, setContent] = useState('');
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function loadIdeas() {
      try {
        const current = await api.ideas.getCurrent();
        if (current.exists && current.content) {
          setContent(current.content);
          setExists(true);
        } else {
          // Load template
          const template = await api.ideas.getTemplate();
          setContent(template.content);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load ideas');
      } finally {
        setLoading(false);
      }
    }
    loadIdeas();
  }, []);

  const handleSave = async (newContent: string) => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      if (exists) {
        await api.ideas.update(newContent, 'Update ideas.md');
      } else {
        // Extract project name from content
        const nameMatch = newContent.match(/\*\*Project Name\*\*:\s*(.+)/);
        const projectName = nameMatch ? nameMatch[1].trim() : 'New Project';

        await api.ideas.create({
          project_name: projectName,
          repo_type: 'github',
          skipped_stages: [],
          problem_statement: '',
          solution: '',
        });
        setExists(true);
      }
      setContent(newContent);
      setSuccess('Ideas saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save ideas');
    } finally {
      setSaving(false);
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Lightbulb className="text-yellow-500" size={28} />
          <div>
            <h1 className="text-2xl font-bold">Project Ideas</h1>
            <p className="text-sm text-gray-500">
              {exists ? 'Edit your project ideas' : 'Create your project ideas'}
            </p>
          </div>
        </div>

        {saving && (
          <span className="text-sm text-gray-500">Saving...</span>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-300">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-300">
          <CheckCircle size={18} />
          {success}
        </div>
      )}

      <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <MarkdownEditor
          value={content}
          onChange={setContent}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
