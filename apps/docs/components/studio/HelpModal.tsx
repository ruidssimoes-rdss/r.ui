'use client';

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function XIcon({ size = 16 }: { size?: number }) {
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

export function HelpModal({ open, onOpenChange }: HelpModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-xl border border-border shadow-2xl w-full max-w-lg p-6 mx-4">
        <h2 className="text-lg font-semibold mb-4">How to Use Studio</h2>

        <div className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground mb-1">
              1. Define Your Colors
            </h3>
            <p>
              Click any color swatch to change it. Add new colors with the +
              button. Name them however makes sense for your project (brand,
              primary, cta, etc).
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-1">
              2. Set Your Scale
            </h3>
            <p>
              Adjust the base radius and spacing values. The scale will
              automatically generate consistent sizes based on your base.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-1">3. Preview</h3>
            <p>
              Toggle between light/dark mode and different device sizes to see
              how your theme looks. Switch to Code view to see the generated
              output.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-1">
              4. Review & Export
            </h3>
            <p>
              Use the Review button to check accessibility and contrast. When
              you&apos;re happy, export your theme as CSS Variables, r/ui Theme,
              Tailwind config, or JSON.
            </p>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <XIcon size={16} />
        </button>
      </div>
    </div>
  );
}
