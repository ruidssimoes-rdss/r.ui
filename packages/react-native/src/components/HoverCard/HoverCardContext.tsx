import { createContext, useContext } from 'react';

export type HoverCardSide = 'top' | 'bottom' | 'left' | 'right';
export type HoverCardAlign = 'start' | 'center' | 'end';

export interface HoverCardContextValue {
  /** Whether the hover card is open */
  open: boolean;
  /** Callback to change open state */
  onOpenChange: (open: boolean) => void;
  /** Trigger element layout measurements */
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  /** Set trigger layout measurements */
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number }) => void;
  /** Side to display the content */
  side: HoverCardSide;
  /** Alignment relative to trigger */
  align: HoverCardAlign;
  /** Offset from trigger */
  sideOffset: number;
}

const HoverCardContext = createContext<HoverCardContextValue | null>(null);

export function useHoverCard() {
  const context = useContext(HoverCardContext);
  if (!context) {
    throw new Error('HoverCard components must be used within a HoverCard');
  }
  return context;
}

export function useHoverCardContext() {
  return useContext(HoverCardContext);
}

export { HoverCardContext };
