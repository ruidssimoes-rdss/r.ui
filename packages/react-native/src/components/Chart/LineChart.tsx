import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Polyline, Circle, Line } from 'react-native-svg';
import { colors } from '../../tokens/colors';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { useChart } from './ChartContext';
import { calculateMaxValue, formatValue, getDataColor, generateYAxisTicks } from './utils';

// ============================================================================
// Types
// ============================================================================

export interface LineChartProps {
  /** Show dots on data points */
  showDots?: boolean;
  /** Dot size */
  dotSize?: number;
  /** Line stroke width */
  strokeWidth?: number;
  /** Show grid lines */
  showGrid?: boolean;
  /** Fill area under line */
  fill?: boolean;
  /** Fill opacity */
  fillOpacity?: number;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function LineChart({
  showDots = true,
  dotSize = 4,
  strokeWidth = 2,
  showGrid = true,
  fill = false,
  fillOpacity = 0.2,
  style,
}: LineChartProps) {
  const { data, colors: customColors, width, height, activeIndex, setActiveIndex } = useChart();

  const maxValue = calculateMaxValue(data);
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate points
  const points = data.map((point, index) => {
    const x = padding.left + (index / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - (point.value / maxValue) * chartHeight;
    return { x, y, ...point };
  });

  const lineColor = getDataColor(data[0] || { label: '', value: 0 }, 0, customColors);
  const pointsString = points.map((p) => `${p.x},${p.y}`).join(' ');

  // Area fill path
  const areaPath = fill
    ? `${points.map((p) => `${p.x},${p.y}`).join(' ')} ${padding.left + chartWidth},${padding.top + chartHeight} ${padding.left},${padding.top + chartHeight}`
    : '';

  // Y axis ticks
  const yTicks = generateYAxisTicks(maxValue, 5);

  return (
    <View style={[styles.container, style]}>
      <Svg width={width} height={height}>
        {/* Grid lines */}
        {showGrid && yTicks.map((tick, index) => {
          const y = padding.top + chartHeight - (tick / maxValue) * chartHeight;
          return (
            <Line
              key={`grid-${index}`}
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke={colors.border.default}
              strokeWidth={1}
              strokeDasharray="4,4"
            />
          );
        })}

        {/* Area fill */}
        {fill && (
          <Polyline
            points={areaPath}
            fill={lineColor}
            fillOpacity={fillOpacity}
            stroke="none"
          />
        )}

        {/* Line */}
        <Polyline
          points={pointsString}
          fill="none"
          stroke={lineColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots */}
        {showDots && points.map((point, index) => (
          <Circle
            key={`dot-${index}`}
            cx={point.x}
            cy={point.y}
            r={activeIndex === index ? dotSize + 2 : dotSize}
            fill={lineColor}
            stroke="white"
            strokeWidth={2}
            onPressIn={() => setActiveIndex(index)}
            onPressOut={() => setActiveIndex(null)}
          />
        ))}
      </Svg>

      {/* Y Axis Labels */}
      <View style={[styles.yAxis, { top: padding.top, height: chartHeight }]}>
        {yTicks.reverse().map((tick, index) => (
          <Text key={`y-${index}`} style={styles.yLabel}>
            {formatValue(tick)}
          </Text>
        ))}
      </View>

      {/* X Axis Labels */}
      <View style={[styles.xAxis, { left: padding.left, width: chartWidth }]}>
        {data.map((point, index) => {
          const labelWidth = chartWidth / data.length;
          return (
            <View key={`x-${index}`} style={[styles.xLabelContainer, { width: labelWidth }]}>
              <Text style={styles.xLabel} numberOfLines={1}>
                {point.label}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Tooltip */}
      {activeIndex !== null && (
        <View
          style={[
            styles.tooltip,
            {
              left: points[activeIndex].x - 30,
              top: points[activeIndex].y - 40,
            },
          ]}
        >
          <Text style={styles.tooltipText}>
            {formatValue(data[activeIndex].value)}
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
  yAxis: {
    position: 'absolute',
    left: 0,
    width: 45,
    justifyContent: 'space-between',
  },
  yLabel: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.muted,
    textAlign: 'right',
  },
  xAxis: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 35,
    paddingTop: spacing[2],
  },
  xLabelContainer: {
    alignItems: 'center',
  },
  xLabel: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.muted,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: colors.bg.elevated,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: 4,
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
