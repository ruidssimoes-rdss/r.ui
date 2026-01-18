'use client';

import { useState } from 'react';

/**
 * Avatar Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
}: {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const [imageError, setImageError] = useState(false);

  const sizeStyles = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const showFallback = !src || imageError;

  return (
    <div
      className={`
        relative inline-flex items-center justify-center rounded-full overflow-hidden
        bg-[var(--component-bg-elevated)] text-[var(--component-text)]
        ${sizeStyles[size]}
      `}
    >
      {!showFallback ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-medium">{fallback}</span>
      )}
    </div>
  );
}

export function AvatarBasicPreview() {
  return (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        alt="User avatar"
        fallback="JD"
      />
      <Avatar fallback="JD" />
    </div>
  );
}

export function AvatarSizesPreview() {
  return (
    <div className="flex items-end gap-4">
      <Avatar fallback="SM" size="sm" />
      <Avatar fallback="MD" size="md" />
      <Avatar fallback="LG" size="lg" />
      <Avatar fallback="XL" size="xl" />
    </div>
  );
}

export function AvatarGroupPreview() {
  const users = [
    { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', fallback: 'JD' },
    { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', fallback: 'AS' },
    { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', fallback: 'MK' },
    { fallback: '+3' },
  ];

  return (
    <div className="flex -space-x-3">
      {users.map((user, i) => (
        <div
          key={i}
          className="relative inline-flex items-center justify-center h-10 w-10 rounded-full overflow-hidden bg-[var(--component-bg-elevated)] text-[var(--component-text)] text-sm ring-2 ring-[var(--component-bg)]"
        >
          {user.src ? (
            <img src={user.src} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="font-medium text-xs">{user.fallback}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function AvatarWithStatusPreview() {
  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          fallback="JD"
          size="lg"
        />
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[var(--component-bg)]" />
      </div>
      <div className="relative">
        <Avatar fallback="AW" size="lg" />
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-amber-500 ring-2 ring-[var(--component-bg)]" />
      </div>
      <div className="relative">
        <Avatar fallback="MK" size="lg" />
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-gray-400 ring-2 ring-[var(--component-bg)]" />
      </div>
    </div>
  );
}
