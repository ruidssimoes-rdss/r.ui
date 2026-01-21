'use client';

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 11.48V8.48a1 1 0 0 0-1-1h-11a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-3.48m-12-6v11m12-11v11M3.6 11.48h14M3.6 14.48h14M7.1 4.48L5.6 7.48m11.5-3l-1.5 3m-7 13.5v2m5-2v2"/>
      <path d="M6.6 4.48a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm10.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

interface PlatformBadgeProps {
  icon: React.ReactNode;
  label: string;
}

function PlatformBadge({ icon, label }: PlatformBadgeProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-gray-600">
      <span className="w-5 h-5">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export function PlatformBadges() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <PlatformBadge icon={<AppleIcon className="w-5 h-5" />} label="iOS" />
          <PlatformBadge icon={<AndroidIcon className="w-5 h-5" />} label="Android" />
          <PlatformBadge icon={<GlobeIcon className="w-5 h-5" />} label="Web" />
        </div>
        <p className="text-gray-400 text-sm">Write once. Native everywhere.</p>
      </div>
    </section>
  );
}
