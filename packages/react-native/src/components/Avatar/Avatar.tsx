import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  ImageProps,
  ViewProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends Omit<ViewProps, 'style'> {
  /** Image source URL */
  src?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Fallback initials when image fails to load */
  fallback?: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Additional container styles */
  style?: ViewStyle;
}

export interface AvatarImageProps extends Omit<ImageProps, 'style' | 'source'> {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Additional styles */
  style?: ImageStyle;
}

export interface AvatarFallbackProps {
  /** Fallback content (usually initials) */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

const sizeStyles: Record<AvatarSize, { container: ViewStyle; text: TextStyle }> = {
  sm: {
    container: { width: 32, height: 32 },
    text: { fontSize: 12 },
  },
  md: {
    container: { width: 40, height: 40 },
    text: { fontSize: 14 },
  },
  lg: {
    container: { width: 56, height: 56 },
    text: { fontSize: 18 },
  },
  xl: {
    container: { width: 80, height: 80 },
    text: { fontSize: 24 },
  },
};

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  style,
  children,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const sizeStyle = sizeStyles[size];

  const showFallback = !src || hasError;

  return (
    <View style={[styles.base, sizeStyle.container, style]} {...props}>
      {children ? (
        children
      ) : showFallback ? (
        <AvatarFallback style={sizeStyle.text}>{fallback}</AvatarFallback>
      ) : (
        <AvatarImage
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          style={styles.image}
        />
      )}
    </View>
  );
}

export function AvatarImage({ src, alt, style, ...props }: AvatarImageProps) {
  return (
    <Image
      source={{ uri: src }}
      accessibilityLabel={alt}
      style={[styles.image, style]}
      {...props}
    />
  );
}

export function AvatarFallback({ children, style }: AvatarFallbackProps) {
  return <Text style={[styles.fallback, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 9999,
    overflow: 'hidden',
    backgroundColor: colors.bg.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    color: colors.text.primary,
    fontWeight: '600',
  },
});
