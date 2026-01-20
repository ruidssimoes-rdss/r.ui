'use client';

import { useState } from 'react';
import { useTokens } from '@/lib/studio/context';
import { cn } from '@/lib/utils';

export function AnimationsTab() {
  const { state, updateDuration, updateEasing } = useTokens();
  const { animations } = state.tokens;
  const [playing, setPlaying] = useState<string | null>(null);

  const playAnimation = (name: string) => {
    setPlaying(name);
    setTimeout(() => setPlaying(null), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Durations */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Durations
        </h3>

        <div className="space-y-3">
          {animations.durations.map((duration, index) => (
            <div key={duration.name} className="flex items-center gap-3">
              <span className="text-xs font-medium w-16">{duration.name}</span>
              <input
                type="number"
                value={duration.value}
                onChange={(e) => updateDuration(index, Number(e.target.value))}
                className="w-20 px-2 py-1 text-xs bg-muted border border-border rounded text-center"
                min={0}
                max={2000}
                step={50}
              />
              <span className="text-xs text-muted-foreground">ms</span>
              <input
                type="range"
                value={duration.value}
                onChange={(e) => updateDuration(index, Number(e.target.value))}
                className={cn(
                  'flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer',
                  '[&::-webkit-slider-thumb]:appearance-none',
                  '[&::-webkit-slider-thumb]:w-3',
                  '[&::-webkit-slider-thumb]:h-3',
                  '[&::-webkit-slider-thumb]:rounded-full',
                  '[&::-webkit-slider-thumb]:bg-foreground'
                )}
                min={0}
                max={1000}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Easings */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Easings
        </h3>

        <div className="space-y-3">
          {animations.easings.map((easing, index) => (
            <div key={easing.name} className="flex items-center gap-3">
              <span className="text-xs font-medium w-20">{easing.name}</span>
              <input
                type="text"
                value={easing.value}
                onChange={(e) => updateEasing(index, e.target.value)}
                className="flex-1 px-2 py-1 text-xs font-mono bg-muted border border-border rounded"
              />
              <button
                onClick={() => playAnimation(easing.name)}
                className="px-2 py-1 text-xs bg-muted border border-border rounded hover:bg-muted/80"
              >
                Play
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Preview */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Preview
        </h3>

        <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-4">
          {animations.easings.map((easing) => (
            <div key={easing.name} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-20">
                {easing.name}
              </span>
              <div className="flex-1 h-8 bg-muted rounded relative overflow-hidden">
                <div
                  className={cn(
                    'absolute top-1 bottom-1 left-1 w-6 bg-foreground rounded',
                    playing === easing.name && 'animate-slide'
                  )}
                  style={{
                    transition: playing === easing.name
                      ? `transform ${animations.durations[1]?.value || 200}ms ${easing.value}`
                      : 'none',
                    transform: playing === easing.name
                      ? 'translateX(calc(100% - 32px))'
                      : 'translateX(0)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Reference */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Usage Reference
        </h3>

        <div className="p-3 bg-muted/50 rounded-lg border border-border text-xs text-muted-foreground space-y-2">
          <p>
            <span className="font-medium text-foreground">fast:</span> Micro
            interactions, button states
          </p>
          <p>
            <span className="font-medium text-foreground">normal:</span> Most UI
            transitions
          </p>
          <p>
            <span className="font-medium text-foreground">slow:</span> Page
            transitions, complex animations
          </p>
          <p>
            <span className="font-medium text-foreground">ease-out:</span>{' '}
            Objects entering (preferred)
          </p>
          <p>
            <span className="font-medium text-foreground">ease-in:</span>{' '}
            Objects leaving
          </p>
        </div>
      </section>
    </div>
  );
}
