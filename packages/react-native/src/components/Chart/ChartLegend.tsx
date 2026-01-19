import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { useChart } from './ChartContext';
import { getDataColor } from './utils';

// ============================================================================
// Types
// ============================================================================

export type ChartLegendPosition = 'top' | 'bottom' | 'left' | 'right';

export interface ChartLegendProps {
  /** Legend position */
  position?: ChartLegendPosition;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function ChartLegend({ position = 'bottom', style }: ChartLegendProps) {
  const { data, colors: customColors } = useChart();

  const isHorizontal = position === 'top' || position === 'bottom';

  return (
    <View
      style={[
        styles.legend,
        isHorizontal ? styles.legendHorizontal : styles.legendVertical,
        style,
      ]}
    >
      {data.map((point, index) => {
        const color = getDataColor(point, index, customColors);

        return (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: color }]} />
            <Text style={styles.legendLabel} numberOfLines={1}>
              {point.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  legend: {
    padding: spacing[2],
  },
  legendHorizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing[4],
  },
  legendVertical: {
    flexDirection: 'column',
    gap: spacing[2],
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: spacing[2],
  },
  legendLabel: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
  },
});
