import React from 'react';
import { View, ViewStyle, ViewProps } from 'react-native';
import { spacing } from '../../tokens/spacing';

export type SpacerSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
export type SpacerAxis = 'horizontal' | 'vertical' | 'both';

export interface SpacerProps extends Omit<ViewProps, 'style'> {
  /** Space size (uses spacing tokens) */
  size?: SpacerSize;
  /** Direction of spacing */
  axis?: SpacerAxis;
  /** Take up remaining space (flex: 1) */
  flex?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

export function Spacer({
  size = 4,
  axis = 'vertical',
  flex = false,
  style,
  ...props
}: SpacerProps) {
  const spaceValue = spacing[size];

  const spacerStyle: ViewStyle = {
    ...(flex && { flex: 1 }),
    ...(axis === 'horizontal' && { width: spaceValue, height: 1 }),
    ...(axis === 'vertical' && { height: spaceValue, width: 1 }),
    ...(axis === 'both' && { width: spaceValue, height: spaceValue }),
  };

  return (
    <View
      style={[spacerStyle, style]}
      accessibilityRole="none"
      accessible={false}
      {...props}
    />
  );
}
