import { createContext, useContext, RefObject } from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface CarouselProps {
  autoplay?: boolean;
  interval?: number;
  loop?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
  onSlideChange?: (index: number) => void;
}

export interface CarouselContentProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export interface CarouselItemProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export interface CarouselPreviousProps {
  children?: ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
}

export interface CarouselNextProps {
  children?: ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
}

export interface CarouselDotsProps {
  style?: ViewStyle;
  activeColor?: string;
  inactiveColor?: string;
}

// ============================================================================
// Context
// ============================================================================

export interface CarouselContextValue {
  currentIndex: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  scrollViewRef: RefObject<ScrollView>;
  itemWidth: number;
  loop: boolean;
}

export const CarouselContext = createContext<CarouselContextValue | undefined>(
  undefined
);

// ============================================================================
// Hook
// ============================================================================

export function useCarousel(): CarouselContextValue {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error(
      'useCarousel must be used within a Carousel. ' +
        'Wrap your component in <Carousel> to fix this error.'
    );
  }

  return context;
}
