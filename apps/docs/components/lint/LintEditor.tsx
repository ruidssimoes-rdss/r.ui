'use client';

import * as React from 'react';

interface LintEditorProps {
  code: string;
  onChange: (code: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export function LintEditor({ code, onChange, placeholder, readOnly }: LintEditorProps) {
  return (
    <div className="relative rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-100/50 dark:bg-gray-800/50">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {readOnly ? 'Code (read-only)' : 'Code Input'}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {code.split('\n').length} lines
        </span>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full h-64 p-4 bg-transparent font-mono text-sm resize-none focus:outline-none text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 ${readOnly ? 'cursor-default' : ''}`}
        spellCheck={false}
      />
    </div>
  );
}
