'use client';

import { useState } from 'react';

/**
 * Chart Previews for Docs
 *
 * Uses web-native SVG elements with Tailwind classes.
 * These are simplified chart visualizations for preview purposes.
 */

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface ChartDataPoint {
  label: string;
  value: number;
}

const barData: ChartDataPoint[] = [
  { label: 'Jan', value: 40 },
  { label: 'Feb', value: 30 },
  { label: 'Mar', value: 45 },
  { label: 'Apr', value: 50 },
  { label: 'May', value: 35 },
];

const pieData: ChartDataPoint[] = [
  { label: 'Desktop', value: 60 },
  { label: 'Mobile', value: 30 },
  { label: 'Tablet', value: 10 },
];

export function ChartBarPreview() {
  const [hovered, setHovered] = useState<number | null>(null);
  const maxValue = Math.max(...barData.map((d) => d.value));

  return (
    <div className="w-full max-w-md p-4 bg-[var(--component-bg-elevated)] border border-[var(--component-border)] rounded-lg">
      <div className="flex items-end gap-2 h-40">
        {barData.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          return (
            <div
              key={item.label}
              className="flex-1 flex flex-col items-center"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative w-full">
                {hovered === index && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--component-bg)] border border-[var(--component-border)] rounded text-xs text-[var(--component-text)] whitespace-nowrap">
                    {item.value}
                  </div>
                )}
                <div
                  className="w-full rounded-t transition-all duration-200"
                  style={{
                    height: `${height}%`,
                    minHeight: 4,
                    backgroundColor: COLORS[index % COLORS.length],
                    opacity: hovered === null || hovered === index ? 1 : 0.5,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 mt-2">
        {barData.map((item) => (
          <div key={item.label} className="flex-1 text-center text-xs text-[var(--component-text-muted)]">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartLinePreview() {
  const maxValue = Math.max(...barData.map((d) => d.value));
  const width = 300;
  const height = 150;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = barData.map((item, index) => {
    const x = padding + (index / (barData.length - 1)) * chartWidth;
    const y = padding + chartHeight - (item.value / maxValue) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full max-w-md p-4 bg-[var(--component-bg-elevated)] border border-[var(--component-border)] rounded-lg">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent) => {
          const y = padding + chartHeight - (percent / 100) * chartHeight;
          return (
            <line
              key={percent}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="var(--component-border)"
              strokeWidth="1"
              strokeDasharray="4"
            />
          );
        })}
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={COLORS[0]}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dots */}
        {barData.map((item, index) => {
          const x = padding + (index / (barData.length - 1)) * chartWidth;
          const y = padding + chartHeight - (item.value / maxValue) * chartHeight;
          return (
            <circle
              key={item.label}
              cx={x}
              cy={y}
              r="4"
              fill={COLORS[0]}
            />
          );
        })}
      </svg>
      <div className="flex justify-between px-5 text-xs text-[var(--component-text-muted)]">
        {barData.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}

export function ChartPiePreview() {
  const [hovered, setHovered] = useState<number | null>(null);
  const total = pieData.reduce((sum, item) => sum + item.value, 0);
  const size = 150;
  const center = size / 2;
  const radius = 60;

  let currentAngle = -90;
  const slices = pieData.map((item, index) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    const endAngle = currentAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    return {
      ...item,
      index,
      d: `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
    };
  });

  return (
    <div className="w-full max-w-md p-4 bg-[var(--component-bg-elevated)] border border-[var(--component-border)] rounded-lg">
      <div className="flex items-center gap-6">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-36 h-36">
          {slices.map((slice) => (
            <path
              key={slice.label}
              d={slice.d}
              fill={COLORS[slice.index]}
              opacity={hovered === null || hovered === slice.index ? 1 : 0.5}
              className="transition-opacity duration-200 cursor-pointer"
              onMouseEnter={() => setHovered(slice.index)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>
        <div className="space-y-2">
          {pieData.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-sm"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
              <span className="text-[var(--component-text)]">{item.label}</span>
              <span className="text-[var(--component-text-muted)]">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ChartDonutPreview() {
  const total = pieData.reduce((sum, item) => sum + item.value, 0);
  const size = 150;
  const center = size / 2;
  const outerRadius = 60;
  const innerRadius = 40;

  let currentAngle = -90;
  const slices = pieData.map((item, index) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    const endAngle = currentAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + outerRadius * Math.cos(startRad);
    const y1 = center + outerRadius * Math.sin(startRad);
    const x2 = center + outerRadius * Math.cos(endRad);
    const y2 = center + outerRadius * Math.sin(endRad);
    const x3 = center + innerRadius * Math.cos(endRad);
    const y3 = center + innerRadius * Math.sin(endRad);
    const x4 = center + innerRadius * Math.cos(startRad);
    const y4 = center + innerRadius * Math.sin(startRad);

    const largeArc = angle > 180 ? 1 : 0;

    return {
      ...item,
      index,
      d: `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`,
    };
  });

  return (
    <div className="w-full max-w-md p-4 bg-[var(--component-bg-elevated)] border border-[var(--component-border)] rounded-lg">
      <div className="flex items-center gap-6">
        <div className="relative">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-36 h-36">
            {slices.map((slice) => (
              <path
                key={slice.label}
                d={slice.d}
                fill={COLORS[slice.index]}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold text-[var(--component-text)]">100%</span>
          </div>
        </div>
        <div className="space-y-2">
          {pieData.map((item, index) => (
            <div key={item.label} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
              <span className="text-[var(--component-text)]">{item.label}</span>
              <span className="text-[var(--component-text-muted)]">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
