import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  DateRangePicker,
  DateRangePickerTrigger,
  DateRangePickerContent,
  DateRangePickerHeader,
  DateRangePickerCalendar,
  DateRangePickerPresets,
  Button,
} from '@r-ui/react-native';
import type { DateRange, PresetRange } from '@r-ui/react-native';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof DateRangePicker>;

// ============================================================================
// Helper to format date range for display
// ============================================================================
function formatRangeDisplay(range: DateRange): string {
  if (!range.start && !range.end) return 'No dates selected';
  if (!range.start) return 'No start date';
  if (!range.end) return `From ${formatDate(range.start)}`;

  return `${formatDate(range.start)} - ${formatDate(range.end)}`;
}

function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// ============================================================================
// Story: Default
// ============================================================================
export const Default: Story = {
  render: function DefaultStory() {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    return (
      <View style={styles.container}>
        <DateRangePicker value={range} onValueChange={setRange}>
          <DateRangePickerTrigger placeholder="Select date range..." />
          <DateRangePickerContent>
            <View style={styles.row}>
              <View>
                <DateRangePickerHeader />
                <DateRangePickerCalendar />
              </View>
              <DateRangePickerPresets />
            </View>
          </DateRangePickerContent>
        </DateRangePicker>
        <Text style={styles.value}>{formatRangeDisplay(range)}</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: WithValue
// ============================================================================
export const WithValue: Story = {
  render: function WithValueStory() {
    const today = new Date();
    const [range, setRange] = useState<DateRange>({
      start: addDays(today, -7),
      end: today,
    });

    return (
      <View style={styles.container}>
        <DateRangePicker value={range} onValueChange={setRange}>
          <DateRangePickerTrigger />
          <DateRangePickerContent>
            <View style={styles.row}>
              <View>
                <DateRangePickerHeader />
                <DateRangePickerCalendar />
              </View>
              <DateRangePickerPresets />
            </View>
          </DateRangePickerContent>
        </DateRangePicker>
        <Text style={styles.value}>{formatRangeDisplay(range)}</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: WithPresets
// ============================================================================
export const WithPresets: Story = {
  render: function WithPresetsStory() {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    return (
      <View style={styles.container}>
        <DateRangePicker value={range} onValueChange={setRange}>
          <DateRangePickerTrigger placeholder="Quick select available..." />
          <DateRangePickerContent>
            <View style={styles.row}>
              <View>
                <DateRangePickerHeader />
                <DateRangePickerCalendar />
              </View>
              <DateRangePickerPresets />
            </View>
          </DateRangePickerContent>
        </DateRangePicker>
        <Text style={styles.value}>{formatRangeDisplay(range)}</Text>
        <Text style={styles.hint}>Try the preset buttons on the right</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: WithoutPresets
// ============================================================================
export const WithoutPresets: Story = {
  render: function WithoutPresetsStory() {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    return (
      <View style={styles.container}>
        <DateRangePicker value={range} onValueChange={setRange} presets={false}>
          <DateRangePickerTrigger placeholder="Select dates..." />
          <DateRangePickerContent>
            <DateRangePickerHeader />
            <DateRangePickerCalendar />
          </DateRangePickerContent>
        </DateRangePicker>
        <Text style={styles.value}>{formatRangeDisplay(range)}</Text>
        <Text style={styles.hint}>Calendar only, no presets</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: CustomPresets
// ============================================================================
export const CustomPresets: Story = {
  render: function CustomPresetsStory() {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    const today = new Date();
    const currentYear = today.getFullYear();

    const customPresets: PresetRange[] = [
      {
        label: 'Q1',
        value: {
          start: new Date(currentYear, 0, 1),
          end: new Date(currentYear, 2, 31),
        },
      },
      {
        label: 'Q2',
        value: {
          start: new Date(currentYear, 3, 1),
          end: new Date(currentYear, 5, 30),
        },
      },
      {
        label: 'Q3',
        value: {
          start: new Date(currentYear, 6, 1),
          end: new Date(currentYear, 8, 30),
        },
      },
      {
        label: 'Q4',
        value: {
          start: new Date(currentYear, 9, 1),
          end: new Date(currentYear, 11, 31),
        },
      },
      {
        label: 'YTD',
        value: {
          start: new Date(currentYear, 0, 1),
          end: today,
        },
      },
      {
        label: 'Full Year',
        value: {
          start: new Date(currentYear, 0, 1),
          end: new Date(currentYear, 11, 31),
        },
      },
    ];

    return (
      <View style={styles.container}>
        <DateRangePicker value={range} onValueChange={setRange} presets={customPresets}>
          <DateRangePickerTrigger placeholder="Select fiscal period..." />
          <DateRangePickerContent>
            <View style={styles.row}>
              <View>
                <DateRangePickerHeader />
                <DateRangePickerCalendar />
              </View>
              <DateRangePickerPresets />
            </View>
          </DateRangePickerContent>
        </DateRangePicker>
        <Text style={styles.value}>{formatRangeDisplay(range)}</Text>
        <Text style={styles.hint}>Business quarter presets</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: WithMinMax
// ============================================================================
export const WithMinMax: Story = {
  render: function WithMinMaxStory() {
    const today = new Date();
    const minDate = addDays(today, -30);
    const maxDate = addDays(today, 30);
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    return (
      <View style={styles.container}>
        <DateRangePicker
          value={range}
          onValueChange={setRange}
          minDate={minDate}
          maxDate={maxDate}
          presets={false}
        >
          <DateRangePickerTrigger placeholder="Select within ±30 days..." />
          <DateRangePickerContent>
            <DateRangePickerHeader />
            <DateRangePickerCalendar />
          </DateRangePickerContent>
        </DateRangePicker>
        <Text style={styles.value}>{formatRangeDisplay(range)}</Text>
        <Text style={styles.hint}>Dates outside ±30 days are disabled</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: NoWeekends
// ============================================================================
export const NoWeekends: Story = {
  render: function NoWeekendsStory() {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    const isWeekend = (date: Date) => {
      const day = date.getDay();
      return day === 0 || day === 6;
    };

    return (
      <View style={styles.container}>
        <DateRangePicker
          value={range}
          onValueChange={setRange}
          disabledDates={isWeekend}
          presets={false}
        >
          <DateRangePickerTrigger placeholder="Select weekdays only..." />
          <DateRangePickerContent>
            <DateRangePickerHeader />
            <DateRangePickerCalendar />
          </DateRangePickerContent>
        </DateRangePicker>
        <Text style={styles.value}>{formatRangeDisplay(range)}</Text>
        <Text style={styles.hint}>Weekends are disabled</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: Disabled
// ============================================================================
export const Disabled: Story = {
  render: () => {
    const today = new Date();
    return (
      <View style={styles.container}>
        <DateRangePicker
          disabled
          value={{ start: addDays(today, -7), end: today }}
        >
          <DateRangePickerTrigger />
          <DateRangePickerContent>
            <DateRangePickerHeader />
            <DateRangePickerCalendar />
          </DateRangePickerContent>
        </DateRangePicker>
        <Text style={styles.hint}>Disabled state</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: BookingDates
// ============================================================================
export const BookingDates: Story = {
  render: function BookingDatesStory() {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    const today = new Date();
    const maxDate = addDays(today, 365); // Book up to 1 year ahead

    // Calculate nights
    const getNights = () => {
      if (!range.start || !range.end) return 0;
      const diffTime = range.end.getTime() - range.start.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    return (
      <View style={styles.bookingContainer}>
        <Text style={styles.bookingTitle}>🏨 Hotel Booking</Text>
        <Text style={styles.bookingSubtitle}>Select your check-in and check-out dates</Text>

        <DateRangePicker
          value={range}
          onValueChange={setRange}
          minDate={today}
          maxDate={maxDate}
          placeholder="Select check-in / check-out"
          presets={false}
        >
          <DateRangePickerTrigger />
          <DateRangePickerContent>
            <DateRangePickerHeader />
            <DateRangePickerCalendar />
          </DateRangePickerContent>
        </DateRangePicker>

        {range.start && range.end && (
          <View style={styles.bookingSummary}>
            <View style={styles.bookingRow}>
              <Text style={styles.bookingLabel}>Check-in</Text>
              <Text style={styles.bookingValue}>{formatDate(range.start)}</Text>
            </View>
            <View style={styles.bookingRow}>
              <Text style={styles.bookingLabel}>Check-out</Text>
              <Text style={styles.bookingValue}>{formatDate(range.end)}</Text>
            </View>
            <View style={styles.bookingDivider} />
            <View style={styles.bookingRow}>
              <Text style={styles.bookingLabel}>Duration</Text>
              <Text style={styles.bookingNights}>{getNights()} night{getNights() !== 1 ? 's' : ''}</Text>
            </View>
          </View>
        )}

        <Button
          disabled={!range.start || !range.end}
          onPress={() => console.log('Booking:', range)}
        >
          Book Now
        </Button>
      </View>
    );
  },
};

// ============================================================================
// Story: ReportingPeriod
// ============================================================================
export const ReportingPeriod: Story = {
  render: function ReportingPeriodStory() {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });

    const today = new Date();
    const currentYear = today.getFullYear();

    const reportPresets: PresetRange[] = [
      {
        label: 'Today',
        value: { start: today, end: today },
      },
      {
        label: 'Last 7 days',
        value: { start: addDays(today, -6), end: today },
      },
      {
        label: 'Last 30 days',
        value: { start: addDays(today, -29), end: today },
      },
      {
        label: 'Last 90 days',
        value: { start: addDays(today, -89), end: today },
      },
      {
        label: 'This Year',
        value: { start: new Date(currentYear, 0, 1), end: today },
      },
    ];

    return (
      <View style={styles.reportContainer}>
        <View style={styles.reportHeader}>
          <Text style={styles.reportTitle}>📊 Analytics Report</Text>
          <Text style={styles.reportSubtitle}>Select a date range for your report</Text>
        </View>

        <DateRangePicker value={range} onValueChange={setRange} presets={reportPresets}>
          <DateRangePickerTrigger placeholder="Select reporting period..." />
          <DateRangePickerContent>
            <View style={styles.row}>
              <View>
                <DateRangePickerHeader />
                <DateRangePickerCalendar />
              </View>
              <DateRangePickerPresets />
            </View>
          </DateRangePickerContent>
        </DateRangePicker>

        {range.start && range.end && (
          <View style={styles.reportInfo}>
            <Text style={styles.reportInfoText}>
              Showing data from {formatDate(range.start)} to {formatDate(range.end)}
            </Text>
          </View>
        )}

        <View style={styles.reportActions}>
          <Button
            variant="secondary"
            disabled={!range.start || !range.end}
            onPress={() => console.log('Export:', range)}
          >
            Export CSV
          </Button>
          <Button
            disabled={!range.start || !range.end}
            onPress={() => console.log('Generate:', range)}
          >
            Generate Report
          </Button>
        </View>
      </View>
    );
  },
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    width: 340,
    alignItems: 'center',
    gap: 16,
  },
  row: {
    flexDirection: 'row',
  },
  value: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  hint: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
  },
  bookingContainer: {
    width: 380,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 24,
    gap: 20,
  },
  bookingTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
  },
  bookingSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginTop: -12,
  },
  bookingSummary: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  bookingValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  bookingDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  bookingNights: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  },
  reportContainer: {
    width: 420,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 24,
    gap: 20,
  },
  reportHeader: {
    gap: 4,
  },
  reportTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  reportSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  reportInfo: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  reportInfoText: {
    color: '#3b82f6',
    fontSize: 14,
    textAlign: 'center',
  },
  reportActions: {
    flexDirection: 'row',
    gap: 12,
  },
});
