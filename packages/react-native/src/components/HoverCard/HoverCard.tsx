import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  HoverCardContext,
  HoverCardContextValue,
  HoverCardSide,
  HoverCardAlign,
} from './HoverCardContext';

export interface HoverCardProps {
  /** HoverCard content */
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Delay before opening (ms) */
  openDelay?: number;
  /** Delay before closing (ms) */
  closeDelay?: number;
  /** Side to display content */
  side?: HoverCardSide;
  /** Alignment relative to trigger */
  align?: HoverCardAlign;
  /** Offset from trigger */
  sideOffset?: number;
}

export function HoverCard({
  children,
  open: controlledOpen,
  onOpenChange,
  openDelay = 700,
  closeDelay = 300,
  side = 'bottom',
  align = 'center',
  sideOffset = 8,
}: HoverCardProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const clearTimeouts = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      clearTimeouts();

      if (newOpen) {
        openTimeoutRef.current = setTimeout(() => {
          if (!isControlled) {
            setInternalOpen(true);
          }
          onOpenChange?.(true);
        }, openDelay);
      } else {
        closeTimeoutRef.current = setTimeout(() => {
          if (!isControlled) {
            setInternalOpen(false);
          }
          onOpenChange?.(false);
        }, closeDelay);
      }
    },
    [isControlled, openDelay, closeDelay, onOpenChange, clearTimeouts]
  );

  // Cancel close on re-enter
  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, [clearTimeouts]);

  const contextValue: HoverCardContextValue = {
    open,
    onOpenChange: handleOpenChange,
    triggerLayout,
    setTriggerLayout,
    side,
    align,
    sideOffset,
  };

  return (
    <HoverCardContext.Provider value={contextValue}>
      {children}
    </HoverCardContext.Provider>
  );
}
