import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { useTimePicker } from './TimePickerContext';
import {
  TimeValue,
  get12Hours,
  get24Hours,
  getMinutes,
  to12Hour,
  to24Hour,
  isHourDisabled,
  isMinuteDisabled,
} from './utils';

export interface TimePickerWheelProps {
  /** Additional styles */
  style?: ViewStyle;
}

const ITEM_HEIGHT = 44;

export function TimePickerWheel({ style }: TimePickerWheelProps) {
  const {
    value,
    onValueChange,
    use24Hour,
    minuteInterval,
    minTime,
    maxTime,
  } = useTimePicker();

  // Local state for selections before confirming
  const [selectedHour, setSelectedHour] = useState<number>(() => {
    if (!value) return use24Hour ? 9 : 9;
    return use24Hour ? value.hours : to12Hour(value.hours).hour;
  });

  const [selectedMinute, setSelectedMinute] = useState<number>(() => {
    if (!value) return 0;
    return value.minutes;
  });

  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>(() => {
    if (!value) return 'AM';
    return to12Hour(value.hours).period;
  });

  const hours = use24Hour ? get24Hours() : get12Hours();
  const minutes = getMinutes(minuteInterval);

  // Update local state when value changes
  useEffect(() => {
    if (value) {
      if (use24Hour) {
        setSelectedHour(value.hours);
      } else {
        const { hour, period } = to12Hour(value.hours);
        setSelectedHour(hour);
        setSelectedPeriod(period);
      }
      setSelectedMinute(value.minutes);
    }
  }, [value, use24Hour]);

  const handleConfirm = () => {
    let hours24: number;
    if (use24Hour) {
      hours24 = selectedHour;
    } else {
      hours24 = to24Hour(selectedHour, selectedPeriod);
    }

    const newValue: TimeValue = {
      hours: hours24,
      minutes: selectedMinute,
    };

    onValueChange(newValue);
  };

  // Get 24-hour value for the current selection (for checking disabled state)
  const get24HourValue = (): number => {
    if (use24Hour) return selectedHour;
    return to24Hour(selectedHour, selectedPeriod);
  };

  return (
    <View style={[styles.container, style]}>
      {/* Wheels Container */}
      <View style={styles.wheelsContainer}>
        {/* Hour Wheel */}
        <View style={styles.wheelColumn}>
          <Text style={styles.wheelLabel}>Hour</Text>
          <ScrollView
            style={styles.wheel}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
          >
            {hours.map((hour) => {
              const isSelected = selectedHour === hour;
              const isDisabled = isHourDisabled(hour, minTime, maxTime, use24Hour);

              return (
                <Pressable
                  key={hour}
                  onPress={() => !isDisabled && setSelectedHour(hour)}
                  disabled={isDisabled}
                  style={[
                    styles.wheelItem,
                    isSelected && styles.wheelItemSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.wheelItemText,
                      isSelected && styles.wheelItemTextSelected,
                      isDisabled && styles.wheelItemTextDisabled,
                    ]}
                  >
                    {use24Hour ? String(hour).padStart(2, '0') : hour}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Separator */}
        <Text style={styles.separator}>:</Text>

        {/* Minute Wheel */}
        <View style={styles.wheelColumn}>
          <Text style={styles.wheelLabel}>Min</Text>
          <ScrollView
            style={styles.wheel}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
          >
            {minutes.map((minute) => {
              const isSelected = selectedMinute === minute;
              const isDisabled = isMinuteDisabled(get24HourValue(), minute, minTime, maxTime);

              return (
                <Pressable
                  key={minute}
                  onPress={() => !isDisabled && setSelectedMinute(minute)}
                  disabled={isDisabled}
                  style={[
                    styles.wheelItem,
                    isSelected && styles.wheelItemSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.wheelItemText,
                      isSelected && styles.wheelItemTextSelected,
                      isDisabled && styles.wheelItemTextDisabled,
                    ]}
                  >
                    {String(minute).padStart(2, '0')}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* AM/PM Wheel (only for 12-hour format) */}
        {!use24Hour && (
          <View style={styles.wheelColumn}>
            <Text style={styles.wheelLabel}> </Text>
            <View style={styles.periodColumn}>
              {(['AM', 'PM'] as const).map((period) => {
                const isSelected = selectedPeriod === period;

                return (
                  <Pressable
                    key={period}
                    onPress={() => setSelectedPeriod(period)}
                    style={[
                      styles.periodItem,
                      isSelected && styles.periodItemSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.periodText,
                        isSelected && styles.periodTextSelected,
                      ]}
                    >
                      {period}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}
      </View>

      {/* Confirm Button */}
      <Pressable
        onPress={handleConfirm}
        style={({ pressed }) => [
          styles.confirmButton,
          pressed && styles.confirmButtonPressed,
        ]}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing[3],
  },
  wheelsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[2],
  },
  wheelColumn: {
    alignItems: 'center',
  },
  wheelLabel: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    color: colors.text.muted,
    marginBottom: spacing[2],
  },
  wheel: {
    height: ITEM_HEIGHT * 5,
    width: 60,
  },
  wheelItem: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  wheelItemSelected: {
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  wheelItemText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    color: colors.text.primary,
  },
  wheelItemTextSelected: {
    color: colors.white,
  },
  wheelItemTextDisabled: {
    color: colors.text.muted,
    opacity: 0.5,
  },
  separator: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    color: colors.text.primary,
    marginHorizontal: spacing[2],
    marginTop: spacing[6],
  },
  periodColumn: {
    height: ITEM_HEIGHT * 2 + spacing[2],
    justifyContent: 'center',
    gap: spacing[2],
  },
  periodItem: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.md,
    alignItems: 'center',
  },
  periodItemSelected: {
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  periodText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.text.primary,
  },
  periodTextSelected: {
    color: colors.white,
  },
  confirmButton: {
    marginTop: spacing[3],
    paddingVertical: spacing[3],
    borderRadius: radius.md,
    backgroundColor: colors.accent.blue.DEFAULT,
    alignItems: 'center',
  },
  confirmButtonPressed: {
    backgroundColor: colors.accent.blue.hover,
  },
  confirmButtonText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: colors.white,
  },
});
