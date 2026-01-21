'use client';

import { ReactNode } from 'react';

interface DeviceFrameProps {
  type: 'iphone' | 'android' | 'browser';
  children: ReactNode;
  className?: string;
}

export function DeviceFrame({ type, children, className = '' }: DeviceFrameProps) {
  if (type === 'iphone') {
    return (
      <div className={`device-frame device-frame-iphone w-48 ${className}`}>
        {/* Notch */}
        <div className="flex justify-center mb-1">
          <div className="w-20 h-5 bg-black rounded-full" />
        </div>
        <div className="device-screen aspect-[9/19] p-3 flex items-center justify-center">
          {children}
        </div>
        {/* Home indicator */}
        <div className="flex justify-center mt-2">
          <div className="w-24 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    );
  }

  if (type === 'android') {
    return (
      <div className={`device-frame device-frame-android w-44 ${className}`}>
        {/* Camera cutout */}
        <div className="flex justify-center mb-1">
          <div className="w-3 h-3 bg-zinc-800 rounded-full" />
        </div>
        <div className="device-screen aspect-[9/18] p-3 flex items-center justify-center rounded-lg">
          {children}
        </div>
        {/* Nav bar */}
        <div className="flex justify-center gap-6 mt-2 py-1">
          <div className="w-4 h-4 border border-white/20 rounded-sm" />
          <div className="w-4 h-4 border border-white/20 rounded-full" />
          <div className="w-4 h-1 bg-white/20 rounded-full self-center" />
        </div>
      </div>
    );
  }

  // Browser
  return (
    <div className={`device-frame device-frame-browser w-64 ${className}`}>
      {/* Browser toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900 rounded-t-lg border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-zinc-800 rounded px-3 py-1 text-[10px] text-white/40 font-mono">
            hyena.studio
          </div>
        </div>
      </div>
      <div className="device-screen aspect-[16/10] p-4 flex items-center justify-center rounded-b-lg">
        {children}
      </div>
    </div>
  );
}
