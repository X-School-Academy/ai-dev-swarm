'use client';

import { useEffect, useState } from 'react';
import { api, StageInfo } from '@/lib/api';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';

export default function IdeasPage() {
  const [content, setContent] = useState('');
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stages, setStages] = useState<StageInfo[]>([]);
  const [projectName, setProjectName] = useState('');
  const [repoType, setRepoType] = useState<'dev-swarm' | 'github' | 'local'>('github');
  const [skippedStages, setSkippedStages] = useState<string[]>([]);
  const [problemStatement, setProblemStatement] = useState('');
  const [solution, setSolution] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function loadIdeas() {
      try {
        const [current, stageData] = await Promise.all([
          api.ideas.getCurrent(),
          api.stages.list(),
        ]);
        setStages(stageData);
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

      {!exists && (
        <div className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h2 className="text-sm font-semibold mb-3">Create ideas.md from template</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium mb-1">Project Name</label>
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Repo Type</label>
              <select
                value={repoType}
                onChange={(e) => setRepoType(e.target.value as 'dev-swarm' | 'github' | 'local')}
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm"
              >
                <option value="dev-swarm">Use dev-swarm root project</option>
                <option value="github">Create new GitHub remote repo</option>
                <option value="local">Create local git repo</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium mb-1">Skipped Stages</label>
              <div className="flex flex-wrap gap-3">
                {stages
                  .filter((stage) => stage.skippable)
                  .map((stage) => (
                    <label key={stage.stage_id} className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={skippedStages.includes(stage.stage_id)}
                        onChange={(e) => {
                          setSkippedStages((prev) =>
                            e.target.checked
                              ? [...prev, stage.stage_id]
                              : prev.filter((id) => id !== stage.stage_id)
                          );
                        }}
                      />
                      {stage.stage_id} - {stage.name}
                    </label>
                  ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium mb-1">Problem Statement</label>
              <textarea
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm"
                rows={2}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium mb-1">Solution</label>
              <textarea
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm"
                rows={2}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium mb-1">Additional Notes</label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm"
                rows={2}
              />
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={async () => {
                try {
                  setSaving(true);
                  setError(null);
                  const result = await api.ideas.create({
                    project_name: projectName || 'New Project',
                    repo_type: repoType,
                    skipped_stages: skippedStages,
                    problem_statement: problemStatement,
                    solution,
                    additional_notes: additionalNotes || undefined,
                  });
                  setContent(result.content);
                  setExists(true);
                  setSuccess('ideas.md created successfully!');
                  setTimeout(() => setSuccess(null), 3000);
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Failed to create ideas.md');
                } finally {
                  setSaving(false);
                }
              }}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Generate ideas.md
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <MarkdownEditor
          value={content}
          onChange={setContent}
          onSave={exists ? handleSave : undefined}
        />
      </div>
    </div>
  );
}
