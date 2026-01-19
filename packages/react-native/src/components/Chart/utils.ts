/**
 * Chart utility functions
 */

// ============================================================================
// Types
// ============================================================================

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartConfig {
  /** Chart colors */
  colors?: string[];
  /** Show grid lines */
  showGrid?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
}

// ============================================================================
// Default Colors
// ============================================================================

export const defaultChartColors = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // yellow
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#F97316', // orange
];

// ============================================================================
// Scale Utilities
// ============================================================================

/**
 * Calculate the maximum value for the Y axis (rounds up to a nice number)
 */
export function calculateMaxValue(data: ChartDataPoint[]): number {
  const max = Math.max(...data.map((d) => d.value));
  if (max === 0) return 10;

  const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
  return Math.ceil(max / magnitude) * magnitude;
}

/**
 * Generate tick values for the Y axis
 */
export function generateYAxisTicks(maxValue: number, tickCount: number = 5): number[] {
  const step = maxValue / (tickCount - 1);
  return Array.from({ length: tickCount }, (_, i) => i * step);
}

/**
 * Format a number for display (e.g., 1000 -> 1K)
 */
export function formatValue(value: number, compact: boolean = true): string {
  if (!compact || value < 1000) {
    return value.toLocaleString();
  }

  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return value.toString();
}

/**
 * Calculate the percentage of each data point
 */
export function calculatePercentages(data: ChartDataPoint[]): (ChartDataPoint & { percentage: number })[] {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) {
    return data.map((d) => ({ ...d, percentage: 0 }));
  }
  return data.map((d) => ({
    ...d,
    percentage: (d.value / total) * 100,
  }));
}

/**
 * Get color for a data point (uses provided color or cycles through defaults)
 */
export function getDataColor(
  dataPoint: ChartDataPoint,
  index: number,
  customColors?: string[]
): string {
  if (dataPoint.color) return dataPoint.color;
  const colors = customColors || defaultChartColors;
  return colors[index % colors.length];
}
