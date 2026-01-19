import React, { useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { useTimePicker } from './TimePickerContext';
import {
  TimeValue,
  TimeSlot,
  generateTimeSlots,
  findClosestSlotIndex,
  isTimeEqual,
} from './utils';

export interface TimePickerListProps {
  /** Additional styles */
  style?: ViewStyle;
}

const ITEM_HEIGHT = 40;
const MAX_HEIGHT = 280;

export function TimePickerList({ style }: TimePickerListProps) {
  const {
    value,
    onValueChange,
    use24Hour,
    interval,
    minTime,
    maxTime,
    disabledTimes,
    scrollToTime,
  } = useTimePicker();

  const scrollViewRef = useRef<ScrollView>(null);

  const slots = useMemo(
    () => generateTimeSlots(interval, use24Hour, minTime, maxTime, disabledTimes),
    [interval, use24Hour, minTime, maxTime, disabledTimes]
  );

  // Auto-scroll to selected time or scrollToTime prop
  useEffect(() => {
    const targetTime = scrollToTime || value;
    const targetIndex = findClosestSlotIndex(slots, targetTime);

    // Delay to ensure layout is complete
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: Math.max(0, targetIndex * ITEM_HEIGHT - MAX_HEIGHT / 2 + ITEM_HEIGHT / 2),
        animated: false,
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [slots, value, scrollToTime]);

  const handleSelect = (slot: TimeSlot) => {
    if (slot.disabled) return;
    onValueChange(slot.time);
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {slots.map((slot, index) => {
          const isSelected = isTimeEqual(value, slot.time);

          return (
            <Pressable
              key={index}
              onPress={() => handleSelect(slot)}
              disabled={slot.disabled}
              style={({ pressed }) => [
                styles.item,
                isSelected && styles.itemSelected,
                pressed && !slot.disabled && !isSelected && styles.itemPressed,
                slot.disabled && styles.itemDisabled,
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  isSelected && styles.itemTextSelected,
                  slot.disabled && styles.itemTextDisabled,
                ]}
              >
                {slot.label}
              </Text>
              {isSelected && <CheckIcon />}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

function CheckIcon() {
  return (
    <View style={styles.checkIcon}>
      <View style={styles.checkIconShort} />
      <View style={styles.checkIconLong} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: MAX_HEIGHT,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: spacing[1],
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: ITEM_HEIGHT,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    marginHorizontal: spacing[1],
    borderRadius: radius.md,
  },
  itemSelected: {
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  itemPressed: {
    backgroundColor: colors.bg.surface,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    color: colors.text.primary,
  },
  itemTextSelected: {
    color: colors.white,
    fontWeight: fontWeights.medium,
  },
  itemTextDisabled: {
    color: colors.text.muted,
  },
  checkIcon: {
    width: 12,
    height: 10,
    position: 'relative',
  },
  checkIconShort: {
    position: 'absolute',
    width: 2,
    height: 6,
    backgroundColor: colors.white,
    borderRadius: 1,
    bottom: 0,
    left: 1,
    transform: [{ rotate: '-45deg' }],
  },
  checkIconLong: {
    position: 'absolute',
    width: 2,
    height: 10,
    backgroundColor: colors.white,
    borderRadius: 1,
    bottom: 0,
    right: 2,
    transform: [{ rotate: '45deg' }],
  },
});
