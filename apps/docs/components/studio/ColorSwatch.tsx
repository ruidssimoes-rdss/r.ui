'use client';

import { useState, useRef, useEffect } from 'react';
import { useStudio } from '@/lib/studio/studio-context';
import { StudioColor } from '@/lib/studio/types';
import { HexColorPicker } from 'react-colorful';
import { getContrastText } from '@/lib/studio/color-utils';

function XIcon({ size = 12 }: { size?: number }) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

interface ColorSwatchProps {
  color: StudioColor;
}

export function ColorSwatch({ color }: ColorSwatchProps) {
  const { updateColor, removeColor, state } = useStudio();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(color.name);
  const popoverRef = useRef<HTMLDivElement>(null);

  const textColor = getContrastText(color.value);
  const canRemove = state.tokens.colors.length > 1;

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleNameSubmit = () => {
    if (name.trim() && name !== color.name) {
      updateColor(color.id, { name: name.trim().toLowerCase().replace(/\s+/g, '-') });
    } else {
      setName(color.name);
    }
    setIsEditing(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setName(color.name);
      setIsEditing(false);
    }
  };

  return (
    <div className="relative group" ref={popoverRef}>
      {/* Swatch */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-lg border border-border/50 flex items-center justify-center text-xs font-mono transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        style={{ backgroundColor: color.value, color: textColor }}
      >
        {color.value.slice(0, 7)}
      </button>

      {/* Name */}
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleNameSubmit}
          onKeyDown={handleNameKeyDown}
          className="w-16 text-xs text-center bg-transparent border-b border-border focus:border-foreground outline-none mt-1 py-0.5"
          autoFocus
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="text-xs text-center text-muted-foreground truncate mt-1 cursor-text hover:text-foreground"
        >
          {color.name}
        </div>
      )}

      {/* Remove Button */}
      {canRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeColor(color.id);
          }}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
          aria-label={`Remove ${color.name} color`}
        >
          <XIcon size={12} />
        </button>
      )}

      {/* Color Picker Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-card rounded-lg border border-border shadow-lg z-50">
          <HexColorPicker
            color={color.value}
            onChange={(value) => updateColor(color.id, { value })}
          />
          <input
            type="text"
            value={color.value}
            onChange={(e) => {
              const val = e.target.value;
              if (val.match(/^#[0-9A-Fa-f]{0,6}$/)) {
                updateColor(color.id, { value: val });
              }
            }}
            className="w-full mt-2 px-2 py-1 text-xs font-mono text-center bg-muted rounded border border-border"
          />
        </div>
      )}
    </div>
  );
}
