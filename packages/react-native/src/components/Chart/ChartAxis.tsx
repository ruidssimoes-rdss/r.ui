import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { useChart } from './ChartContext';
import { formatValue, calculateMaxValue, generateYAxisTicks } from './utils';

// ============================================================================
// Types
// ============================================================================

export type ChartAxisType = 'x' | 'y';

export interface ChartAxisProps {
  /** Axis type */
  type: ChartAxisType;
  /** Number of ticks for Y axis */
  tickCount?: number;
  /** Custom tick format function */
  formatTick?: (value: number | string) => string;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function ChartAxis({
  type,
  tickCount = 5,
  formatTick,
  style,
}: ChartAxisProps) {
  const { data, height } = useChart();

  if (type === 'x') {
    return (
      <View style={[styles.xAxis, style]}>
        {data.map((point, index) => (
          <View key={index} style={styles.xTickContainer}>
            <Text style={styles.tickLabel}>
              {formatTick ? formatTick(point.label) : point.label}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  // Y axis
  const maxValue = calculateMaxValue(data);
  const ticks = generateYAxisTicks(maxValue, tickCount);

  return (
    <View style={[styles.yAxis, { height: height - 40 }, style]}>
      {ticks.reverse().map((tick, index) => (
        <View key={index} style={styles.yTickContainer}>
          <Text style={styles.tickLabel}>
            {formatTick ? formatTick(tick) : formatValue(tick)}
          </Text>
        </View>
      ))}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing[2],
  },
  xTickContainer: {
    flex: 1,
    alignItems: 'center',
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingRight: spacing[2],
  },
  yTickContainer: {
    alignItems: 'flex-end',
  },
  tickLabel: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.muted,
  },
});
