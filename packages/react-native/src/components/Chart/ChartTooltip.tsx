import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { useChart } from './ChartContext';
import { formatValue, getDataColor } from './utils';

// ============================================================================
// Types
// ============================================================================

export interface ChartTooltipProps {
  /** Custom tooltip content */
  children?: (data: { label: string; value: number; color: string }) => React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function ChartTooltip({ children, style }: ChartTooltipProps) {
  const { data, colors: customColors, activeIndex } = useChart();

  if (activeIndex === null) {
    return null;
  }

  const point = data[activeIndex];
  const color = getDataColor(point, activeIndex, customColors);

  if (children) {
    return (
      <View style={[styles.tooltip, style]}>
        {children({ label: point.label, value: point.value, color })}
      </View>
    );
  }

  return (
    <View style={[styles.tooltip, style]}>
      <View style={[styles.colorDot, { backgroundColor: color }]} />
      <View>
        <Text style={styles.label}>{point.label}</Text>
        <Text style={styles.value}>{formatValue(point.value)}</Text>
      </View>
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  tooltip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg.elevated,
    padding: spacing[3],
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing[3],
  },
  label: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
  },
  value: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.text.primary,
  },
});
