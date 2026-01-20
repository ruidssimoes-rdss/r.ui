'use client';

import { useState } from 'react';
import { useTokens } from '@/lib/studio/context';
import { ColorInput } from '../shared/ColorInput';
import { NeutralScaleSelector } from '../shared/NeutralScaleSelector';
import { SectionLabel } from '../shared/SectionLabel';
import { SectionDivider } from '../shared/SectionDivider';
import { AddButton } from '../shared/AddButton';

// Icons
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// Editable color input with delete button
function EditableColorInput({
  id,
  label,
  value,
  onChange,
  onDelete,
  onLabelChange,
  isCustom,
}: {
  id: string;
  label: string;
  value: { light: string; dark: string };
  onChange: (value: { light: string; dark: string }) => void;
  onDelete?: () => void;
  onLabelChange?: (newLabel: string) => void;
  isCustom?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(label);

  return (
    <div className="relative group">
      <ColorInput
        label={
          isCustom && isEditing ? (
            <input
              type="text"
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              onBlur={() => {
                setIsEditing(false);
                if (onLabelChange && editLabel !== label) {
                  onLabelChange(editLabel);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsEditing(false);
                  if (onLabelChange && editLabel !== label) {
                    onLabelChange(editLabel);
                  }
                }
              }}
              className="bg-transparent border-b border-[#9CA3AF] outline-none text-[11px] text-[#9CA3AF] w-full"
              autoFocus
            />
          ) : (
            <span
              className={isCustom ? 'cursor-pointer hover:text-[#374151]' : ''}
              onClick={() => isCustom && setIsEditing(true)}
            >
              {label}
            </span>
          )
        }
        value={value}
        onChange={onChange}
      />
      {isCustom && onDelete && (
        <button
          onClick={onDelete}
          className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          title="Delete color"
        >
          <XIcon size={8} />
        </button>
      )}
    </div>
  );
}

export function ColorsPanel() {
  const {
    state,
    updateBrandColor,
    addBrandColor,
    removeBrandColor,
    updateSemanticColor,
    addSemanticColor,
    removeSemanticColor,
    updateNeutralBase,
    updateSurfaceColor,
  } = useTokens();

  const { colors } = state.tokens;

  // Map brand colors to display names
  const brandColorLabels: Record<string, string> = {
    primary: 'Primary',
    secondary: 'Secondary',
    accent: 'Tertiary',
  };

  // Map semantic colors to display names
  const semanticColorLabels: Record<string, string> = {
    success: 'Success',
    warning: 'Warning',
    error: 'Error',
    info: 'Info',
  };

  // Map surface colors to display names
  const surfaceColorLabels: Record<string, string> = {
    background: 'Background',
    foreground: 'Foreground',
    card: 'Card',
    muted: 'Muted',
    mutedForeground: 'Muted FG',
    border: 'Border',
  };

  // Determine which colors are "core" (not deletable)
  const coreBrandIds = colors.brand.slice(0, 3).map((c) => c.id);
  const coreSemanticIds = colors.semantic.slice(0, 4).map((c) => c.id);

  return (
    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Brand Colors Section */}
      <SectionLabel>Brand Colors</SectionLabel>

      <div className="grid grid-cols-3 gap-3 px-6">
        {colors.brand.map((color) => {
          const isCustom = !coreBrandIds.includes(color.id);
          return (
            <EditableColorInput
              key={color.id}
              id={color.id}
              label={brandColorLabels[color.name] || color.name}
              value={color.value}
              onChange={(value) => updateBrandColor(color.id, value)}
              onDelete={isCustom ? () => removeBrandColor(color.id) : undefined}
              isCustom={isCustom}
            />
          );
        })}
      </div>

      <AddButton onClick={addBrandColor}>Add color</AddButton>

      <SectionDivider />

      {/* Semantic Colors Section */}
      <SectionLabel>Semantic</SectionLabel>

      <div className="grid grid-cols-3 gap-3 px-6">
        {colors.semantic.map((color) => {
          const isCustom = !coreSemanticIds.includes(color.id);
          return (
            <EditableColorInput
              key={color.id}
              id={color.id}
              label={semanticColorLabels[color.name] || color.name}
              value={color.value}
              onChange={(value) => updateSemanticColor(color.id, value)}
              onDelete={isCustom ? () => removeSemanticColor(color.id) : undefined}
              isCustom={isCustom}
            />
          );
        })}
      </div>

      <AddButton onClick={addSemanticColor}>Add semantic</AddButton>

      <SectionDivider />

      {/* Neutral Scale Section */}
      <NeutralScaleSelector value={colors.neutral} onChange={updateNeutralBase} />

      <SectionDivider />

      {/* Surface Colors Section */}
      <SectionLabel>Surface</SectionLabel>

      {/* First row: Background, Foreground, Card */}
      <div className="grid grid-cols-3 gap-3 px-6 mb-3">
        {['background', 'foreground', 'card'].map((name) => (
          <ColorInput
            key={name}
            label={surfaceColorLabels[name] || name}
            value={colors.surface[name as keyof typeof colors.surface]}
            onChange={(newValue) =>
              updateSurfaceColor(name as keyof typeof colors.surface, newValue)
            }
          />
        ))}
      </div>

      {/* Second row: Muted, MutedForeground, Border */}
      <div className="grid grid-cols-3 gap-3 px-6 pb-6">
        {['muted', 'mutedForeground', 'border'].map((name) => (
          <ColorInput
            key={name}
            label={surfaceColorLabels[name] || name}
            value={colors.surface[name as keyof typeof colors.surface]}
            onChange={(newValue) =>
              updateSurfaceColor(name as keyof typeof colors.surface, newValue)
            }
          />
        ))}
      </div>
    </div>
  );
}
