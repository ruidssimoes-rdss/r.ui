'use client';

import { GlassCard } from './GlassCard';
import { DeviceFrame } from './DeviceFrame';
import { FlowLine } from './FlowLine';

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="text-left text-sm font-mono text-white/90 overflow-x-auto">
      <code>{code}</code>
    </pre>
  );
}

function MiniCardPreview({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`
        p-3 rounded-lg border w-full max-w-[140px]
        ${dark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-200'}
      `}
    >
      <div className={`text-xs font-semibold mb-1 ${dark ? 'text-white' : 'text-zinc-900'}`}>
        Hello
      </div>
      <div className={`text-[10px] ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
        Welcome to Hyena
      </div>
    </div>
  );
}

export function FlowSection() {
  const codeExample = `import { Card } from '@hyena-studio/react-native'

<Card>
  <CardHeader>
    <CardTitle>Hello</CardTitle>
  </CardHeader>
</Card>`;

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="hp-noise absolute inset-0" />
        <div className="ambient-glow absolute top-0 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Sticky header */}
      <div className="relative z-10 text-center mb-16 px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          One component. Every platform.
        </h2>
        <p className="text-lg text-white/50 max-w-xl mx-auto">
          Write your component once, ship it to iOS, Android, and Web simultaneously.
        </p>
      </div>

      {/* Horizontal scroll flow */}
      <div className="relative z-10 horizontal-scroll-container px-6">
        <div className="flow-track justify-center items-center max-w-6xl mx-auto">
          {/* Step 1: Code */}
          <div className="flow-step flex flex-col items-center min-w-[280px]">
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">
              01 — Write
            </div>
            <GlassCard className="p-4 w-full">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-white/40 font-mono">Card.tsx</span>
              </div>
              <CodeBlock code={codeExample} />
            </GlassCard>
          </div>

          {/* Flow line */}
          <div className="hidden md:flex items-center">
            <FlowLine direction="right" />
          </div>

          {/* Step 2: Component */}
          <div className="flow-step flex flex-col items-center min-w-[200px]">
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">
              02 — Render
            </div>
            <GlassCard className="p-6 flex items-center justify-center">
              <MiniCardPreview dark />
            </GlassCard>
          </div>

          {/* Flow line (splits) */}
          <div className="hidden md:flex items-center">
            <FlowLine direction="split" />
          </div>

          {/* Step 3: Platforms */}
          <div className="flow-step flex flex-col items-center">
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">
              03 — Ship
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <DeviceFrame type="iphone" className="scale-75 md:scale-90">
                <MiniCardPreview />
              </DeviceFrame>
              <DeviceFrame type="android" className="scale-75 md:scale-90">
                <MiniCardPreview />
              </DeviceFrame>
              <DeviceFrame type="browser" className="scale-75 md:scale-90 hidden lg:block">
                <MiniCardPreview />
              </DeviceFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
