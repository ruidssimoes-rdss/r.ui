import { createContext, useContext } from 'react';

export type ContextMenuAlign = 'start' | 'center' | 'end';

export interface ContextMenuPosition {
  x: number;
  y: number;
}

export interface TriggerLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ContextMenuContextValue {
  /** Whether the context menu is open */
  open: boolean;
  /** Callback to change open state */
  onOpenChange: (open: boolean) => void;
  /** Position where the long-press occurred */
  pressPosition: ContextMenuPosition | null;
  /** Set the press position */
  setPressPosition: (position: ContextMenuPosition | null) => void;
  /** Trigger element layout measurements */
  triggerLayout: TriggerLayout | null;
  /** Set trigger layout measurements */
  setTriggerLayout: (layout: TriggerLayout | null) => void;
  /** Content alignment */
  align: ContextMenuAlign;
  /** Side offset from press position */
  sideOffset: number;
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

export function useContextMenu() {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error('ContextMenu components must be used within a ContextMenu');
  }
  return context;
}

export function useContextMenuContext() {
  return useContext(ContextMenuContext);
}

export { ContextMenuContext };
