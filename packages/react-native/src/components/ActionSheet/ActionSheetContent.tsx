import React, { useRef, useEffect } from 'react';
import {
  View,
  Modal,
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  ViewStyle,
  Dimensions,
  Platform,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { useActionSheet } from './ActionSheetContext';
import { useTheme, ThemeContextValue } from '../../themes/ThemeProvider';

// Safe hook that returns null if ThemeProvider is not present
function useThemeOptional(): ThemeContextValue | null {
  try {
    return useTheme();
  } catch {
    return null;
  }
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface ActionSheetContentProps {
  /** Content */
  children: React.ReactNode;
  /** Show drag handle indicator */
  showHandle?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

// Get content style with glass support
function getContentStyle(isGlass: boolean): ViewStyle {
  const base: ViewStyle = {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: SCREEN_HEIGHT * 0.9,
    paddingBottom: spacing[8],
  };

  if (isGlass) {
    return {
      ...base,
      backgroundColor: 'rgba(255, 255, 255, 0.65)',
      ...(Platform.OS === 'web' ? {
        // @ts-expect-error - web-only CSS properties
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
      } : {}),
    };
  }

  return {
    ...base,
    backgroundColor: colors.bg.elevated,
  };
}

export function ActionSheetContent({
  children,
  showHandle = true,
  style,
}: ActionSheetContentProps) {
  const { open, onOpenChange } = useActionSheet();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const themeContext = useThemeOptional();
  const isGlass = themeContext?.isGlass ?? false;

  const dismissThreshold = 100;

  const openSheet = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 10,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onOpenChange(false));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy }) => dy > 10,
      onPanResponderMove: (_, { dy }) => {
        const value = Math.max(0, dy);
        translateY.setValue(value);
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy > dismissThreshold) {
          closeSheet();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 65,
            friction: 10,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (open) {
      translateY.setValue(SCREEN_HEIGHT);
      openSheet();
    }
  }, [open]);

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={closeSheet}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeSheet}
            accessibilityRole="button"
            accessibilityLabel="Close action sheet"
          />
        </Animated.View>

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            getContentStyle(isGlass),
            { transform: [{ translateY }] },
            style,
          ]}
        >
          {showHandle && <View style={[styles.handle, isGlass && styles.handleGlass]} />}
          <View style={styles.contentInner}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.bg.overlay,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: colors.border.strong,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: spacing[2],
    marginBottom: spacing[2],
  },
  handleGlass: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  contentInner: {
    paddingHorizontal: spacing[4],
  },
});
