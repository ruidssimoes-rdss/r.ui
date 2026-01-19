import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  TimePicker,
  TimePickerTrigger,
  TimePickerContent,
  TimePickerWheel,
  Button,
} from '@r-ui/react-native';
import type { TimeValue } from '@r-ui/react-native';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

// ============================================================================
// Helper to format time for display
// ============================================================================
function formatTimeDisplay(time: TimeValue | null, use24Hour = false): string {
  if (!time) return 'No time selected';
  const { hours, minutes } = time;
  if (use24Hour) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
}

// ============================================================================
// Story: Default
// ============================================================================
export const Default: Story = {
  render: function DefaultStory() {
    const [time, setTime] = useState<TimeValue | null>(null);

    return (
      <View style={styles.container}>
        <TimePicker value={time} onValueChange={setTime}>
          <TimePickerTrigger placeholder="Select time..." />
          <TimePickerContent>
            <TimePickerWheel />
          </TimePickerContent>
        </TimePicker>
        <Text style={styles.value}>{formatTimeDisplay(time)}</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: WithValue
// ============================================================================
export const WithValue: Story = {
  render: function WithValueStory() {
    const [time, setTime] = useState<TimeValue | null>({ hours: 9, minutes: 30 });

    return (
      <View style={styles.container}>
        <TimePicker value={time} onValueChange={setTime}>
          <TimePickerTrigger />
          <TimePickerContent>
            <TimePickerWheel />
          </TimePickerContent>
        </TimePicker>
        <Text style={styles.value}>{formatTimeDisplay(time)}</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: TwentyFourHour
// ============================================================================
export const TwentyFourHour: Story = {
  render: function TwentyFourHourStory() {
    const [time, setTime] = useState<TimeValue | null>({ hours: 14, minutes: 30 });

    return (
      <View style={styles.container}>
        <TimePicker value={time} onValueChange={setTime} use24Hour>
          <TimePickerTrigger />
          <TimePickerContent>
            <TimePickerWheel />
          </TimePickerContent>
        </TimePicker>
        <Text style={styles.value}>{formatTimeDisplay(time, true)}</Text>
        <Text style={styles.hint}>24-hour format</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: FifteenMinuteIntervals
// ============================================================================
export const FifteenMinuteIntervals: Story = {
  render: function FifteenMinuteIntervalsStory() {
    const [time, setTime] = useState<TimeValue | null>(null);

    return (
      <View style={styles.container}>
        <TimePicker value={time} onValueChange={setTime} minuteInterval={15}>
          <TimePickerTrigger placeholder="Select time..." />
          <TimePickerContent>
            <TimePickerWheel />
          </TimePickerContent>
        </TimePicker>
        <Text style={styles.value}>{formatTimeDisplay(time)}</Text>
        <Text style={styles.hint}>15-minute intervals (00, 15, 30, 45)</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: FiveMinuteIntervals
// ============================================================================
export const FiveMinuteIntervals: Story = {
  render: function FiveMinuteIntervalsStory() {
    const [time, setTime] = useState<TimeValue | null>(null);

    return (
      <View style={styles.container}>
        <TimePicker value={time} onValueChange={setTime} minuteInterval={5}>
          <TimePickerTrigger placeholder="Select time..." />
          <TimePickerContent>
            <TimePickerWheel />
          </TimePickerContent>
        </TimePicker>
        <Text style={styles.value}>{formatTimeDisplay(time)}</Text>
        <Text style={styles.hint}>5-minute intervals</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: WithMinMax
// ============================================================================
export const WithMinMax: Story = {
  render: function WithMinMaxStory() {
    const [time, setTime] = useState<TimeValue | null>(null);

    return (
      <View style={styles.container}>
        <TimePicker
          value={time}
          onValueChange={setTime}
          minTime={{ hours: 9, minutes: 0 }}
          maxTime={{ hours: 17, minutes: 0 }}
        >
          <TimePickerTrigger placeholder="Business hours only..." />
          <TimePickerContent>
            <TimePickerWheel />
          </TimePickerContent>
        </TimePicker>
        <Text style={styles.value}>{formatTimeDisplay(time)}</Text>
        <Text style={styles.hint}>9:00 AM - 5:00 PM only</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: Disabled
// ============================================================================
export const Disabled: Story = {
  render: () => (
    <View style={styles.container}>
      <TimePicker disabled value={{ hours: 10, minutes: 30 }}>
        <TimePickerTrigger />
        <TimePickerContent>
          <TimePickerWheel />
        </TimePickerContent>
      </TimePicker>
      <Text style={styles.hint}>Disabled state</Text>
    </View>
  ),
};

// ============================================================================
// Story: CustomFormat
// ============================================================================
export const CustomFormat: Story = {
  render: function CustomFormatStory() {
    const [time, setTime] = useState<TimeValue | null>({ hours: 14, minutes: 30 });

    return (
      <View style={styles.container}>
        <Text style={styles.label}>12-hour format (h:mm A)</Text>
        <TimePicker value={time} onValueChange={setTime} format="h:mm A">
          <TimePickerTrigger />
          <TimePickerContent>
            <TimePickerWheel />
          </TimePickerContent>
        </TimePicker>

        <View style={styles.spacer} />

        <Text style={styles.label}>24-hour format (HH:mm)</Text>
        <TimePicker value={time} onValueChange={setTime} format="HH:mm" use24Hour>
          <TimePickerTrigger />
          <TimePickerContent>
            <TimePickerWheel />
          </TimePickerContent>
        </TimePicker>
      </View>
    );
  },
};

// ============================================================================
// Story: MeetingScheduler
// ============================================================================
export const MeetingScheduler: Story = {
  render: function MeetingSchedulerStory() {
    const [startTime, setStartTime] = useState<TimeValue | null>({ hours: 10, minutes: 0 });
    const [endTime, setEndTime] = useState<TimeValue | null>({ hours: 11, minutes: 0 });

    return (
      <View style={styles.formContainer}>
        <Text style={styles.title}>Schedule Meeting</Text>

        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>Start Time</Text>
          <TimePicker
            value={startTime}
            onValueChange={setStartTime}
            minuteInterval={15}
            minTime={{ hours: 8, minutes: 0 }}
            maxTime={{ hours: 18, minutes: 0 }}
          >
            <TimePickerTrigger placeholder="Select start time..." />
            <TimePickerContent>
              <TimePickerWheel />
            </TimePickerContent>
          </TimePicker>
        </View>

        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>End Time</Text>
          <TimePicker
            value={endTime}
            onValueChange={setEndTime}
            minuteInterval={15}
            minTime={startTime || { hours: 8, minutes: 0 }}
            maxTime={{ hours: 20, minutes: 0 }}
          >
            <TimePickerTrigger placeholder="Select end time..." />
            <TimePickerContent>
              <TimePickerWheel />
            </TimePickerContent>
          </TimePicker>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Meeting: {formatTimeDisplay(startTime)} - {formatTimeDisplay(endTime)}
          </Text>
        </View>

        <Button onPress={() => console.log('Meeting scheduled:', { startTime, endTime })}>
          Schedule Meeting
        </Button>
      </View>
    );
  },
};

// ============================================================================
// Story: AlarmClock
// ============================================================================
export const AlarmClock: Story = {
  render: function AlarmClockStory() {
    const [alarmTime, setAlarmTime] = useState<TimeValue | null>({ hours: 7, minutes: 0 });
    const [isEnabled, setIsEnabled] = useState(true);

    return (
      <View style={styles.alarmContainer}>
        <Text style={styles.alarmEmoji}>⏰</Text>
        <Text style={styles.alarmTitle}>Wake Up Alarm</Text>

        <TimePicker value={alarmTime} onValueChange={setAlarmTime} minuteInterval={5}>
          <TimePickerTrigger />
          <TimePickerContent>
            <TimePickerWheel />
          </TimePickerContent>
        </TimePicker>

        <View style={styles.alarmToggle}>
          <Text style={styles.alarmToggleText}>
            Alarm {isEnabled ? 'Enabled' : 'Disabled'}
          </Text>
          <Button
            variant={isEnabled ? 'primary' : 'secondary'}
            size="sm"
            onPress={() => setIsEnabled(!isEnabled)}
          >
            {isEnabled ? 'Turn Off' : 'Turn On'}
          </Button>
        </View>

        {isEnabled && alarmTime && (
          <Text style={styles.alarmInfo}>
            Alarm set for {formatTimeDisplay(alarmTime)}
          </Text>
        )}
      </View>
    );
  },
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    width: 300,
    alignItems: 'center',
    gap: 16,
  },
  value: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  hint: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  spacer: {
    height: 24,
  },
  formContainer: {
    width: 360,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 24,
    gap: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  formField: {
    gap: 8,
  },
  fieldLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  summary: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  summaryText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  alarmContainer: {
    width: 320,
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  alarmEmoji: {
    fontSize: 48,
  },
  alarmTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
  },
  alarmToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 8,
  },
  alarmToggleText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  alarmInfo: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: '500',
  },
});
