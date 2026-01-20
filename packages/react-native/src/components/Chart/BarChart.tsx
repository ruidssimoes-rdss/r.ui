import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { useChart } from './ChartContext';
import { calculateMaxValue, formatValue, getDataColor } from './utils';

// ============================================================================
// Types
// ============================================================================

export interface BarChartProps {
  /** Horizontal bars */
  horizontal?: boolean;
  /** Bar border radius */
  barRadius?: number;
  /** Gap between bars */
  barGap?: number;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function BarChart({
  horizontal = false,
  barRadius = 4,
  barGap = 8,
  style,
}: BarChartProps) {
  const { data, colors: customColors, width, height, showTooltip, activeIndex, setActiveIndex } = useChart();

  const maxValue = calculateMaxValue(data);
  const chartPadding = 40; // space for labels

  const chartWidth = width - chartPadding;
  const chartHeight = height - chartPadding;

  if (horizontal) {
    const barHeight = (chartHeight - barGap * (data.length - 1)) / data.length;

    return (
      <View style={[styles.container, style]}>
        {/* Y Axis Labels */}
        <View style={styles.yAxisHorizontal}>
          {data.map((point, index) => (
            <View key={index} style={[styles.yLabelContainer, { height: barHeight + barGap }]}>
              <Text style={styles.axisLabel} numberOfLines={1}>
                {point.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Bars */}
        <View style={styles.chartArea}>
          {data.map((point, index) => {
            const barWidth = (point.value / maxValue) * chartWidth;
            const color = getDataColor(point, index, customColors);

            return (
              <Pressable
                key={index}
                onPressIn={() => showTooltip && setActiveIndex(index)}
                onPressOut={() => setActiveIndex(null)}
                style={[
                  styles.barHorizontal,
                  {
                    width: barWidth,
                    height: barHeight,
                    backgroundColor: color,
                    borderRadius: barRadius,
                    marginBottom: index < data.length - 1 ? barGap : 0,
                  },
                ]}
                accessibilityRole="button"
                accessibilityLabel={`${point.label}: ${formatValue(point.value)}`}
              >
                {activeIndex === index && (
                  <View style={[styles.tooltip, { left: barWidth + 8 }]}>
                    <Text style={styles.tooltipText}>{formatValue(point.value)}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  }

  // Vertical bars
  const barWidth = (chartWidth - barGap * (data.length - 1)) / data.length;

  return (
    <View style={[styles.container, style]}>
      {/* Bars */}
      <View style={styles.barsContainer}>
        {data.map((point, index) => {
          const barHeight = (point.value / maxValue) * chartHeight;
          const color = getDataColor(point, index, customColors);

          return (
            <Pressable
              key={index}
              onPressIn={() => showTooltip && setActiveIndex(index)}
              onPressOut={() => setActiveIndex(null)}
              style={[
                styles.barVerticalWrapper,
                { width: barWidth, marginRight: index < data.length - 1 ? barGap : 0 },
              ]}
              accessibilityRole="button"
              accessibilityLabel={`${point.label}: ${formatValue(point.value)}`}
            >
              <View style={[styles.barVerticalContainer, { height: chartHeight }]}>
                <View
                  style={[
                    styles.barVertical,
                    {
                      height: barHeight,
                      backgroundColor: color,
                      borderTopLeftRadius: barRadius,
                      borderTopRightRadius: barRadius,
                    },
                  ]}
                />
              </View>
              {activeIndex === index && (
                <View style={[styles.tooltip, { bottom: barHeight + 8 }]}>
                  <Text style={styles.tooltipText}>{formatValue(point.value)}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* X Axis Labels */}
      <View style={styles.xAxis}>
        {data.map((point, index) => (
          <View
            key={index}
            style={[styles.xLabelContainer, { width: barWidth, marginRight: index < data.length - 1 ? barGap : 0 }]}
          >
            <Text style={styles.axisLabel} numberOfLines={1}>
              {point.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  yAxisHorizontal: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 80,
  },
  yLabelContainer: {
    justifyContent: 'center',
  },
  chartArea: {
    flex: 1,
    marginLeft: 80,
    justifyContent: 'flex-start',
  },
  barHorizontal: {
    position: 'relative',
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  barVerticalWrapper: {
    alignItems: 'center',
    position: 'relative',
  },
  barVerticalContainer: {
    justifyContent: 'flex-end',
  },
  barVertical: {
    width: '100%',
  },
  xAxis: {
    flexDirection: 'row',
    marginTop: spacing[2],
  },
  xLabelContainer: {
    alignItems: 'center',
  },
  axisLabel: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.muted,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: colors.bg.elevated,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border.default,
    zIndex: 10,
  },
  tooltipText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.primary,
    fontWeight: '600',
  },
});
