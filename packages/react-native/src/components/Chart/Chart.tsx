import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ViewStyle, LayoutChangeEvent } from 'react-native';
import { ChartContext } from './ChartContext';
import { ChartDataPoint } from './utils';

// ============================================================================
// Types
// ============================================================================

export interface ChartProps {
  /** Chart data */
  data: ChartDataPoint[];
  /** Custom colors */
  colors?: string[];
  /** Show tooltip on hover/press */
  showTooltip?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Chart height */
  height?: number;
  /** Chart content (BarChart, LineChart, etc.) */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function Chart({
  data,
  colors,
  showTooltip = true,
  showLegend = false,
  height = 300,
  children,
  style,
}: ChartProps) {
  const [width, setWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  const contextValue = useMemo(() => ({
    data,
    colors,
    showTooltip,
    showLegend,
    width,
    height,
    activeIndex,
    setActiveIndex,
  }), [data, colors, showTooltip, showLegend, width, height, activeIndex]);

  return (
    <ChartContext.Provider value={contextValue}>
      <View
        style={[styles.container, { height }, style]}
        onLayout={handleLayout}
      >
        {width > 0 && children}
      </View>
    </ChartContext.Provider>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
});
