import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps, FlexStyle } from 'react-native';
import { spacing } from '../../tokens/spacing';

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type FlexAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';
export type FlexGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

export interface FlexProps extends Omit<ViewProps, 'style'> {
  /** Flex content */
  children: React.ReactNode;
  /** Flex direction */
  direction?: FlexDirection;
  /** Justify content alignment */
  justify?: FlexJustify;
  /** Align items */
  align?: FlexAlign;
  /** Gap between items (uses spacing tokens) */
  gap?: FlexGap;
  /** Flex wrap behavior */
  wrap?: FlexWrap;
  /** Take up remaining space (flex: 1) */
  flex?: boolean | number;
  /** Additional styles */
  style?: ViewStyle;
}

const justifyMap: Record<FlexJustify, FlexStyle['justifyContent']> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const alignMap: Record<FlexAlign, FlexStyle['alignItems']> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
};

export function Flex({
  children,
  direction = 'row',
  justify = 'start',
  align = 'stretch',
  gap = 0,
  wrap = 'nowrap',
  flex,
  style,
  ...props
}: FlexProps) {
  const flexValue = typeof flex === 'number' ? flex : flex ? 1 : undefined;

  return (
    <View
      style={[
        styles.base,
        {
          flexDirection: direction,
          justifyContent: justifyMap[justify],
          alignItems: alignMap[align],
          gap: spacing[gap],
          flexWrap: wrap,
          flex: flexValue,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {},
});
