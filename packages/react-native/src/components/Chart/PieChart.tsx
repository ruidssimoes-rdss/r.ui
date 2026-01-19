import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { colors } from '../../tokens/colors';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { useChart } from './ChartContext';
import { calculatePercentages, getDataColor } from './utils';

// ============================================================================
// Types
// ============================================================================

export interface PieChartProps {
  /** Inner radius for donut chart (0 = pie, >0 = donut) */
  innerRadius?: number;
  /** Padding between slices */
  padAngle?: number;
  /** Show percentage labels */
  showLabels?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Helpers
// ============================================================================

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function createArcPath(
  x: number,
  y: number,
  radius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const innerStart = polarToCartesian(x, y, innerRadius, endAngle);
  const innerEnd = polarToCartesian(x, y, innerRadius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  if (innerRadius === 0) {
    // Pie slice (no inner radius)
    return [
      'M', x, y,
      'L', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'Z',
    ].join(' ');
  }

  // Donut slice (with inner radius)
  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'L', innerEnd.x, innerEnd.y,
    'A', innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
    'Z',
  ].join(' ');
}

// ============================================================================
// Component
// ============================================================================

export function PieChart({
  innerRadius = 0,
  padAngle = 0,
  showLabels = true,
  style,
}: PieChartProps) {
  const { data, colors: customColors, width, height, showTooltip, activeIndex, setActiveIndex } = useChart();

  const dataWithPercentages = calculatePercentages(data);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20;
  const actualInnerRadius = innerRadius * radius;

  let currentAngle = 0;
  const slices = dataWithPercentages.map((point, index) => {
    const sliceAngle = (point.value / total) * 360 - padAngle;
    const startAngle = currentAngle + padAngle / 2;
    const endAngle = startAngle + sliceAngle;
    currentAngle = endAngle + padAngle / 2;

    const color = getDataColor(point, index, customColors);
    const path = createArcPath(centerX, centerY, radius, actualInnerRadius, startAngle, endAngle);

    // Label position
    const labelAngle = startAngle + sliceAngle / 2;
    const labelRadius = radius * 0.7;
    const labelPos = polarToCartesian(centerX, centerY, labelRadius, labelAngle);

    return {
      ...point,
      path,
      color,
      startAngle,
      endAngle,
      labelPos,
      index,
    };
  });

  return (
    <View style={[styles.container, style]}>
      <Svg width={width} height={height}>
        <G>
          {slices.map((slice) => (
            <Path
              key={slice.index}
              d={slice.path}
              fill={slice.color}
              opacity={activeIndex === null || activeIndex === slice.index ? 1 : 0.5}
              onPressIn={() => showTooltip && setActiveIndex(slice.index)}
              onPressOut={() => setActiveIndex(null)}
            />
          ))}
        </G>
      </Svg>

      {/* Labels */}
      {showLabels && slices.map((slice) => (
        slice.percentage >= 5 && ( // Only show labels for slices >= 5%
          <View
            key={`label-${slice.index}`}
            style={[
              styles.label,
              {
                left: slice.labelPos.x - 20,
                top: slice.labelPos.y - 10,
              },
            ]}
          >
            <Text style={styles.labelText}>
              {Math.round(slice.percentage)}%
            </Text>
          </View>
        )
      ))}

      {/* Center label for donut */}
      {innerRadius > 0 && activeIndex !== null && (
        <View style={[styles.centerLabel, { left: centerX - 40, top: centerY - 20 }]}>
          <Text style={styles.centerValue}>
            {data[activeIndex].value.toLocaleString()}
          </Text>
          <Text style={styles.centerName} numberOfLines={1}>
            {data[activeIndex].label}
          </Text>
        </View>
      )}

      {/* Tooltip */}
      {activeIndex !== null && (
        <View style={[styles.tooltip, { top: 10, right: 10 }]}>
          <View style={[styles.tooltipColor, { backgroundColor: slices[activeIndex].color }]} />
          <Text style={styles.tooltipText}>
            {data[activeIndex].label}: {data[activeIndex].value.toLocaleString()} ({Math.round(dataWithPercentages[activeIndex].percentage)}%)
          </Text>
        </View>
      )}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    width: 40,
    alignItems: 'center',
  },
  labelText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: 'white',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  centerLabel: {
    position: 'absolute',
    width: 80,
    alignItems: 'center',
  },
  centerValue: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text.primary,
  },
  centerName: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
  },
  tooltip: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg.elevated,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  tooltipColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: spacing[2],
  },
  tooltipText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.primary,
  },
});
