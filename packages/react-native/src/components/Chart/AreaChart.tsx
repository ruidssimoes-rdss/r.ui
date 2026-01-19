import React from 'react';
import { ViewStyle } from 'react-native';
import { LineChart, LineChartProps } from './LineChart';

// ============================================================================
// Types
// ============================================================================

export interface AreaChartProps extends Omit<LineChartProps, 'fill' | 'fillOpacity'> {
  /** Fill opacity */
  fillOpacity?: number;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function AreaChart({ fillOpacity = 0.3, ...props }: AreaChartProps) {
  return (
    <LineChart
      {...props}
      fill={true}
      fillOpacity={fillOpacity}
    />
  );
}
