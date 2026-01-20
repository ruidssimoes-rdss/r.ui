'use client';

import { useState } from 'react';
import { useStudio } from '@/lib/studio/studio-context';
import { ColorSwatch } from './ColorSwatch';

function PlusIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function ColorPalette() {
  const { state, addColor } = useStudio();
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    if (newName.trim()) {
      addColor(newName.trim().toLowerCase().replace(/\s+/g, '-'), '#6366f1');
      setNewName('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    } else if (e.key === 'Escape') {
      setNewName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Colors
        </h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <PlusIcon size={12} />
          Add
        </button>
      </div>

      {/* Color Grid - More Compact */}
      <div className="grid grid-cols-3 gap-2">
        {state.tokens.colors.map((color) => (
          <ColorSwatch key={color.id} color={color} />
        ))}

        {/* Add New Color */}
        {isAdding && (
          <div className="flex flex-col items-center gap-1">
            <div className="w-full aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/30">
              <PlusIcon size={16} />
            </div>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                if (!newName) {
                  setIsAdding(false);
                }
              }}
              placeholder="name"
              className="w-full text-[10px] text-center bg-transparent border-b border-border focus:border-foreground outline-none"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}
