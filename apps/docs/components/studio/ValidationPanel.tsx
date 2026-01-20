'use client';

import { ValidationError } from '@/lib/studio/types';
import { cn } from '@/lib/utils';

interface ValidationPanelProps {
  errors: ValidationError[];
}

export function ValidationPanel({ errors }: ValidationPanelProps) {
  const errorCount = errors.filter((e) => e.type === 'error').length;
  const warningCount = errors.filter((e) => e.type === 'warning').length;

  return (
    <div className="border-t border-border/50 bg-muted/20 p-3 flex-shrink-0">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            'mt-0.5 p-1 rounded',
            errorCount > 0 ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
          )}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium">
              {errorCount > 0 && `${errorCount} error${errorCount > 1 ? 's' : ''}`}
              {errorCount > 0 && warningCount > 0 && ', '}
              {warningCount > 0 && `${warningCount} warning${warningCount > 1 ? 's' : ''}`}
            </span>
          </div>
          <div className="space-y-1">
            {errors.slice(0, 3).map((error, index) => (
              <p key={index} className="text-xs text-muted-foreground">
                {error.message}
                {error.suggestion && (
                  <span className="ml-1 text-foreground/70">
                    ({error.suggestion})
                  </span>
                )}
              </p>
            ))}
            {errors.length > 3 && (
              <p className="text-xs text-muted-foreground">
                +{errors.length - 3} more...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
