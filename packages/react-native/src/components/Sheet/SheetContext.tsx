import { createContext, useContext } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

// ============================================================================
// Types
// ============================================================================

export type SheetSide = 'bottom' | 'top' | 'left' | 'right';

export interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side: SheetSide;
}

export interface SheetProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: SheetSide;
  snapPoints?: number[];
}

export interface SheetTriggerProps {
  children: React.ReactElement;
  style?: ViewStyle;
}

export interface SheetContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface SheetHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface SheetFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface SheetTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export interface SheetDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export interface SheetCloseProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

// ============================================================================
// Context
// ============================================================================

export const SheetContext = createContext<SheetContextValue | null>(null);

// ============================================================================
// Hook
// ============================================================================

export function useSheet(): SheetContextValue {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error(
      'Sheet components must be used within a Sheet. ' +
        'Wrap your component in <Sheet> to fix this error.'
    );
  }
  return context;
}
