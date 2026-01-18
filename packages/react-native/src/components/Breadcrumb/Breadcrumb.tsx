import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';

export interface BreadcrumbProps {
  /** Breadcrumb children (BreadcrumbList) */
  children: React.ReactNode;
  /** Custom separator element */
  separator?: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface BreadcrumbListProps {
  /** BreadcrumbItem children */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface BreadcrumbItemProps {
  /** Item content (BreadcrumbLink, BreadcrumbSeparator, or BreadcrumbPage) */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface BreadcrumbLinkProps {
  /** Link destination or handler */
  onPress?: () => void;
  /** Link content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export interface BreadcrumbSeparatorProps {
  /** Custom separator content */
  children?: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface BreadcrumbPageProps {
  /** Current page text */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

function ChevronIcon() {
  return (
    <View style={styles.chevron}>
      <View style={styles.chevronLine1} />
      <View style={styles.chevronLine2} />
    </View>
  );
}

export function Breadcrumb({ children, separator, style }: BreadcrumbProps) {
  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="navigation"
      accessibilityLabel="Breadcrumb"
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === BreadcrumbList) {
          return React.cloneElement(child as React.ReactElement<{ separator?: React.ReactNode }>, {
            separator,
          });
        }
        return child;
      })}
    </View>
  );
}

export function BreadcrumbList({
  children,
  style,
  separator,
}: BreadcrumbListProps & { separator?: React.ReactNode }) {
  const childArray = React.Children.toArray(children);
  const itemsWithSeparators: React.ReactNode[] = [];

  childArray.forEach((child, index) => {
    itemsWithSeparators.push(child);

    if (index < childArray.length - 1) {
      itemsWithSeparators.push(
        <BreadcrumbSeparator key={`separator-${index}`}>{separator}</BreadcrumbSeparator>
      );
    }
  });

  return <View style={[styles.list, style]}>{itemsWithSeparators}</View>;
}

export function BreadcrumbItem({ children, style }: BreadcrumbItemProps) {
  return <View style={[styles.item, style]}>{children}</View>;
}

export function BreadcrumbLink({ onPress, children, style, textStyle }: BreadcrumbLinkProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.link, pressed && styles.linkPressed, style]}
      accessibilityRole="link"
    >
      <Text style={[styles.linkText, textStyle]}>{children}</Text>
    </Pressable>
  );
}

export function BreadcrumbSeparator({ children, style }: BreadcrumbSeparatorProps) {
  return (
    <View style={[styles.separator, style]} accessibilityHidden>
      {children || <ChevronIcon />}
    </View>
  );
}

export function BreadcrumbPage({ children, style, textStyle }: BreadcrumbPageProps) {
  return (
    <View style={[styles.page, style]} accessibilityRole="text" accessibilityCurrent="page">
      <Text style={[styles.pageText, textStyle]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    paddingVertical: spacing[1],
  },
  linkPressed: {
    opacity: 0.7,
  },
  linkText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.secondary,
  },
  separator: {
    marginHorizontal: spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronLine1: {
    position: 'absolute',
    width: 6,
    height: 1.5,
    backgroundColor: colors.text.muted,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }, { translateY: -2 }],
  },
  chevronLine2: {
    position: 'absolute',
    width: 6,
    height: 1.5,
    backgroundColor: colors.text.muted,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }, { translateY: 2 }],
  },
  page: {
    paddingVertical: spacing[1],
  },
  pageText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.primary,
  },
});
