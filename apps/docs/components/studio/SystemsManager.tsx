'use client';

import { useState, useRef } from 'react';
import { SavedSystem, TokenSystem } from '../../lib/studio/types';

interface SystemsManagerProps {
  currentSystem: SavedSystem | null;
  allSystems: SavedSystem[];
  systemCount: number;
  maxSystems: number;
  onSaveAsNew: (tokens: TokenSystem, name?: string) => void;
  onSwitchTo: (systemId: string) => void;
  onRename: (systemId: string, newName: string) => void;
  onDelete: (systemId: string) => void;
  onDuplicate: (systemId: string) => void;
  onImport: (json: string) => void;
  onExport: (systemId: string) => string | null;
  currentTokens: TokenSystem;
}

export function SystemsManager({
  currentSystem,
  allSystems,
  systemCount,
  maxSystems,
  onSaveAsNew,
  onSwitchTo,
  onRename,
  onDelete,
  onDuplicate,
  onImport,
  onExport,
  currentTokens,
}: SystemsManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newName, setNewName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveNew = () => {
    if (newName.trim()) {
      onSaveAsNew(currentTokens, newName.trim());
      setNewName('');
      setShowSaveDialog(false);
    }
  };

  const handleStartRename = (system: SavedSystem) => {
    setEditingId(system.id);
    setEditingName(system.name);
  };

  const handleConfirmRename = () => {
    if (editingId && editingName.trim()) {
      onRename(editingId, editingName.trim());
    }
    setEditingId(null);
    setEditingName('');
  };

  const handleExport = (systemId: string) => {
    const json = onExport(systemId);
    if (json) {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hyena-system-${systemId}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          onImport(event.target?.result as string);
        } catch (err) {
          alert(err instanceof Error ? err.message : 'Failed to import');
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-colors"
      >
        <FolderIcon className="w-4 h-4" />
        <span className="hidden sm:inline">
          {currentSystem?.name || 'Unsaved'}
        </span>
        <span className="text-neutral-500 text-xs">
          ({systemCount}/{maxSystems})
        </span>
        <ChevronIcon
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Panel */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl z-50">
            {/* Header */}
            <div className="p-3 border-b border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">Saved Systems</h3>
                <span className="text-xs text-neutral-500">
                  {systemCount}/{maxSystems}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowSaveDialog(true)}
                  disabled={systemCount >= maxSystems}
                  className="flex-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Save Current
                </button>
                <button
                  onClick={handleImportClick}
                  className="px-3 py-1.5 text-xs border border-neutral-700 rounded-md hover:bg-neutral-800 transition-colors"
                >
                  Import
                </button>
              </div>
            </div>

            {/* Save Dialog */}
            {showSaveDialog && (
              <div className="p-3 border-b border-neutral-800 bg-neutral-800/50">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="System name..."
                  className="w-full px-3 py-2 text-sm bg-neutral-900 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 mb-2"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveNew();
                    if (e.key === 'Escape') setShowSaveDialog(false);
                  }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveNew}
                    disabled={!newName.trim()}
                    className="flex-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-500 disabled:opacity-50 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowSaveDialog(false)}
                    className="px-3 py-1.5 text-xs border border-neutral-700 rounded-md hover:bg-neutral-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Systems List */}
            <div className="max-h-64 overflow-y-auto">
              {allSystems.length === 0 ? (
                <div className="p-4 text-center text-sm text-neutral-500">
                  No saved systems yet
                </div>
              ) : (
                allSystems.map((system) => (
                  <div
                    key={system.id}
                    className={`p-3 border-b border-neutral-800 last:border-b-0 hover:bg-neutral-800/50 transition-colors ${
                      currentSystem?.id === system.id ? 'bg-blue-500/10' : ''
                    }`}
                  >
                    {editingId === system.id ? (
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="w-full px-2 py-1 text-sm bg-neutral-900 border border-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        autoFocus
                        onBlur={handleConfirmRename}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleConfirmRename();
                          if (e.key === 'Escape') {
                            setEditingId(null);
                            setEditingName('');
                          }
                        }}
                      />
                    ) : (
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          onSwitchTo(system.id);
                          setIsOpen(false);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm truncate flex-1">
                            {system.name}
                          </span>
                          {currentSystem?.id === system.id && (
                            <span className="text-xs text-blue-400 ml-2">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-500 mt-1">
                          Updated {formatDate(system.updatedAt)}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-1 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartRename(system);
                        }}
                        className="p-1 text-neutral-500 hover:text-neutral-300 transition-colors"
                        title="Rename"
                      >
                        <PencilIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDuplicate(system.id);
                        }}
                        className="p-1 text-neutral-500 hover:text-neutral-300 transition-colors"
                        title="Duplicate"
                      >
                        <CopyIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExport(system.id);
                        }}
                        className="p-1 text-neutral-500 hover:text-neutral-300 transition-colors"
                        title="Export"
                      >
                        <DownloadIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete "${system.name}"?`)) {
                            onDelete(system.id);
                          }
                        }}
                        className="p-1 text-neutral-500 hover:text-red-400 transition-colors ml-auto"
                        title="Delete"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

// Icons
function FolderIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}
