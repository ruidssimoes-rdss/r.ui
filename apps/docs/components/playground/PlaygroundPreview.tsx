'use client';

import { ReactNode } from 'react';
import { usePlayground, DeviceMode } from './PlaygroundContext';

// ========================================
// Device Frames
// ========================================

interface DeviceFrameProps {
  children: ReactNode;
  mode: DeviceMode;
}

function DeviceFrame({ children, mode }: DeviceFrameProps) {
  if (mode === 'desktop') {
    return <>{children}</>;
  }

  // Mobile frame
  if (mode === 'mobile') {
    return (
      <div className="relative mx-auto">
        {/* Phone frame */}
        <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-xl">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-10" />

          {/* Screen */}
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden w-[375px] h-[667px]">
            {/* Status bar */}
            <div className="h-11 bg-gray-50 flex items-center justify-between px-6 text-xs">
              <span className="font-medium">9:41</span>
              <div className="flex items-center gap-1">
                <SignalIcon />
                <WifiIcon />
                <BatteryIcon />
              </div>
            </div>

            {/* Content */}
            <div className="h-[calc(100%-2.75rem)] overflow-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tablet frame
  return (
    <div className="relative mx-auto">
      <div className="relative bg-gray-900 rounded-[2rem] p-3 shadow-xl">
        {/* Camera dot */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-800 rounded-full" />

        {/* Screen */}
        <div className="relative bg-white rounded-[1.5rem] overflow-hidden w-[768px] h-[576px]">
          {/* Status bar */}
          <div className="h-7 bg-gray-50 flex items-center justify-between px-4 text-xs">
            <span className="font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <WifiIcon />
              <BatteryIcon />
            </div>
          </div>

          {/* Content */}
          <div className="h-[calc(100%-1.75rem)] overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Status bar icons
function SignalIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="4" y="5" width="3" height="7" rx="1" />
      <rect x="8" y="2" width="3" height="10" rx="1" />
      <rect x="12" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
      <path d="M8 10a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-4-3a6 6 0 0 1 8 0l-1 1.5a4.5 4.5 0 0 0-6 0L4 7zm-2-2.5a9 9 0 0 1 12 0l-1 1.5a7.5 7.5 0 0 0-10 0l-1-1.5z" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="24" height="12" viewBox="0 0 24 12" fill="currentColor">
      <rect x="0" y="0" width="21" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="2" y="2" width="16" height="8" rx="1" />
      <rect x="22" y="3" width="2" height="6" rx="1" />
    </svg>
  );
}

// ========================================
// Viewport Width Mapping
// ========================================

const viewportWidths: Record<DeviceMode, string> = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%',
};

// ========================================
// Glass Background Images
// ========================================

const glassBackgrounds = {
  desktop: '/images/glass/cca8661f7dae563de41c7ba6ae4916cc.jpg',
  mobile: '/images/glass/4280d1847721e441b1a08013199fc347.jpg',
};

// ========================================
// Main Component
// ========================================

interface PlaygroundPreviewProps {
  children: ReactNode;
}

export function PlaygroundPreview({ children }: PlaygroundPreviewProps) {
  const { deviceMode, previewTheme, glassMode } = usePlayground();

  // Background: image for glass mode, #F9FAFB for light mode, zinc-900 for dark
  const getBackgroundClass = () => {
    if (glassMode) return '';
    if (previewTheme === 'dark') return 'bg-zinc-900 preview-dark';
    return 'bg-[#F9FAFB]';
  };

  // Get glass background image based on device mode
  const getGlassBackgroundStyle = () => {
    if (!glassMode) return {};
    const bgImage = deviceMode === 'desktop'
      ? glassBackgrounds.desktop
      : glassBackgrounds.mobile;
    return {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: '#E8E4DF', // Fallback color
    };
  };

  return (
    <div
      className={`
        relative h-full overflow-hidden rounded-lg
        ${getBackgroundClass()}
      `}
      style={getGlassBackgroundStyle()}
      data-glass={glassMode ? 'true' : 'false'}
    >
      {/* Preview container - centered with 32px padding inside */}
      <div className="flex items-center justify-center h-full p-8">
        {deviceMode === 'desktop' ? (
          <div
            className="transition-all duration-300"
            style={{
              width: viewportWidths[deviceMode],
              maxWidth: '100%',
            }}
          >
            <div className="flex items-center justify-center">
              {children}
            </div>
          </div>
        ) : (
          <DeviceFrame mode={deviceMode}>
            <div className={`flex items-center justify-center min-h-full p-4 ${previewTheme === 'dark' ? 'preview-dark' : ''}`}>
              {children}
            </div>
          </DeviceFrame>
        )}
      </div>
    </div>
  );
}
