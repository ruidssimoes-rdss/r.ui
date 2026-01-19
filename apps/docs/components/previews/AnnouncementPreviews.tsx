'use client';

import { useState, useEffect } from 'react';

/**
 * Announcement Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 */

function AnnouncementBar({
  children,
  variant = 'info',
  dismissible = false,
  onDismiss,
}: {
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'success' | 'promo';
  dismissible?: boolean;
  onDismiss?: () => void;
}) {
  const variantClasses = {
    info: 'bg-blue-500',
    warning: 'bg-amber-500 text-gray-900',
    success: 'bg-emerald-500',
    promo: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
  };

  return (
    <div className={`relative py-2 px-4 text-center text-white text-sm ${variantClasses[variant]}`}>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {children}
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
        >
          ×
        </button>
      )}
    </div>
  );
}

export function AnnouncementBasicPreview() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg">
      <AnnouncementBar variant="info">
        <span className="font-medium">New: Dark mode is now available!</span>
      </AnnouncementBar>
    </div>
  );
}

export function AnnouncementWithLinkPreview() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg">
      <AnnouncementBar variant="info">
        <span>We just launched version 2.0 with 20+ new components.</span>
        <a href="#" className="font-medium underline hover:no-underline">
          Learn more →
        </a>
      </AnnouncementBar>
    </div>
  );
}

export function AnnouncementDismissiblePreview() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <div className="w-full max-w-2xl p-4 text-center">
        <button
          onClick={() => setVisible(true)}
          className="text-sm text-[var(--track-fill)] hover:underline"
        >
          Show announcement again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg">
      <AnnouncementBar variant="info" dismissible onDismiss={() => setVisible(false)}>
        <span className="font-medium">This announcement can be dismissed.</span>
      </AnnouncementBar>
    </div>
  );
}

export function AnnouncementGradientPreview() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg">
      <AnnouncementBar variant="promo">
        <span>🎉</span>
        <span className="font-medium">Black Friday Sale: 50% off all plans!</span>
        <a href="#" className="font-semibold underline hover:no-underline">
          Claim offer
        </a>
      </AnnouncementBar>
    </div>
  );
}

export function AnnouncementWarningPreview() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg">
      <AnnouncementBar variant="warning">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className="font-medium">Scheduled maintenance on Jan 15th, 2-4 AM UTC</span>
      </AnnouncementBar>
    </div>
  );
}

export function AnnouncementCountdownPreview() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg">
      <AnnouncementBar variant="promo">
        <span className="font-medium">Flash Sale ends in</span>
        <div className="flex items-center gap-1 font-mono">
          <span className="bg-white/20 px-2 py-0.5 rounded">{pad(timeLeft.hours)}</span>
          <span>:</span>
          <span className="bg-white/20 px-2 py-0.5 rounded">{pad(timeLeft.minutes)}</span>
          <span>:</span>
          <span className="bg-white/20 px-2 py-0.5 rounded">{pad(timeLeft.seconds)}</span>
        </div>
        <a href="#" className="font-semibold underline hover:no-underline">
          Shop now
        </a>
      </AnnouncementBar>
    </div>
  );
}
