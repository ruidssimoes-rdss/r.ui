import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';
import { spacing } from '../../tokens/spacing';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

export interface ContainerProps extends Omit<ViewProps, 'style'> {
  /** Container content */
  children: React.ReactNode;
  /** Maximum width size */
  size?: ContainerSize;
  /** Horizontal padding */
  padding?: ContainerPadding;
  /** Center the container horizontally */
  centered?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

const maxWidths: Record<ContainerSize, number | '100%'> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  full: '100%',
};

const paddingStyles: Record<ContainerPadding, ViewStyle> = {
  none: { paddingHorizontal: 0 },
  sm: { paddingHorizontal: spacing[3] },
  md: { paddingHorizontal: spacing[4] },
  lg: { paddingHorizontal: spacing[6] },
};

export function Container({
  children,
  size = 'lg',
  padding = 'md',
  centered = true,
  style,
  ...props
}: ContainerProps) {
  const maxWidth = maxWidths[size];

  return (
    <View
      style={[
        styles.base,
        paddingStyles[padding],
        centered && styles.centered,
        { maxWidth },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
  centered: {
    alignSelf: 'center',
  },
});
