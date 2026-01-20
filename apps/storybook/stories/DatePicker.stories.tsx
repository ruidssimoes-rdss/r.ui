import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Forms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A date picker component with calendar interface. Supports min/max date constraints, disabled dates, and custom formatting.',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable the date picker',
    },
    format: {
      control: 'text',
      description: 'Date format string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// ============================================================================
// Helper Functions
// ============================================================================

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const formatDateToString = (date: Date | null): string => {
  if (!date) return 'None';
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// ============================================================================
// Story: Default
// ============================================================================
function DefaultDatePicker() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <View style={styles.container}>
      <DatePicker value={date} onValueChange={setDate}>
        <DatePickerTrigger />
        <DatePickerContent>
          <DatePickerHeader />
          <DatePickerCalendar />
        </DatePickerContent>
      </DatePicker>
      <Text style={styles.stateText}>
        Selected: {formatDateToString(date)}
      </Text>
    </View>
  );
}

export const Default: Story = {
  render: () => <DefaultDatePicker />,
};

// ============================================================================
// Story: WithDefaultDate
// ============================================================================
function WithDefaultDatePicker() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event Date</Text>
      <DatePicker value={date} onValueChange={setDate}>
        <DatePickerTrigger />
        <DatePickerContent>
          <DatePickerHeader />
          <DatePickerCalendar />
        </DatePickerContent>
      </DatePicker>
      <Text style={styles.helperText}>
        Today's date is pre-selected
      </Text>
    </View>
  );
}

export const WithDefaultDate: Story = {
  render: () => <WithDefaultDatePicker />,
};

// ============================================================================
// Story: Controlled
// ============================================================================
function ControlledDatePicker() {
  const [date, setDate] = useState<Date | null>(new Date());

  const setToToday = () => setDate(new Date());
  const setToTomorrow = () => setDate(addDays(new Date(), 1));
  const setToNextWeek = () => setDate(addDays(new Date(), 7));
  const clearDate = () => setDate(null);

  return (
    <View style={styles.controlledContainer}>
      <Text style={styles.formTitle}>Controlled DatePicker</Text>

      <View style={styles.quickSelect}>
        <Text style={styles.quickSelectLabel}>Quick select:</Text>
        <View style={styles.quickSelectButtons}>
          <Pressable style={styles.quickSelectButton} onPress={setToToday}>
            <Text style={styles.quickSelectButtonText}>Today</Text>
          </Pressable>
          <Pressable style={styles.quickSelectButton} onPress={setToTomorrow}>
            <Text style={styles.quickSelectButtonText}>Tomorrow</Text>
          </Pressable>
          <Pressable style={styles.quickSelectButton} onPress={setToNextWeek}>
            <Text style={styles.quickSelectButtonText}>Next Week</Text>
          </Pressable>
          <Pressable style={styles.clearButton} onPress={clearDate}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </Pressable>
        </View>
      </View>

      <DatePicker value={date} onValueChange={setDate}>
        <DatePickerTrigger />
        <DatePickerContent>
          <DatePickerHeader />
          <DatePickerCalendar />
        </DatePickerContent>
      </DatePicker>

      <View style={styles.selectedInfo}>
        <Text style={styles.selectedInfoLabel}>Selected date:</Text>
        <Text style={styles.selectedInfoValue}>
          {date ? formatDateToString(date) : 'No date selected'}
        </Text>
      </View>
    </View>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDatePicker />,
};

// ============================================================================
// Story: WithLabel
// ============================================================================
function WithLabelDatePicker() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <DatePicker
          value={date}
          onValueChange={setDate}
          placeholder="Select your birth date..."
        >
          <DatePickerTrigger />
          <DatePickerContent>
            <DatePickerHeader />
            <DatePickerCalendar />
          </DatePickerContent>
        </DatePicker>
        <Text style={styles.helperText}>
          Click to open the calendar
        </Text>
      </View>
    </View>
  );
}

export const WithLabel: Story = {
  render: () => <WithLabelDatePicker />,
};

// ============================================================================
// Story: Disabled
// ============================================================================
export const Disabled: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.label}>Appointment Date (Disabled)</Text>
      <DatePicker value={new Date()} disabled>
        <DatePickerTrigger />
        <DatePickerContent>
          <DatePickerHeader />
          <DatePickerCalendar />
        </DatePickerContent>
      </DatePicker>
      <Text style={styles.hint}>This date picker is disabled</Text>
    </View>
  ),
};

// ============================================================================
// Story: ErrorState
// ============================================================================
function ErrorStateDatePicker() {
  const [date, setDate] = useState<Date | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const hasError = submitted && !date;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Booking Form</Text>

      <View style={styles.fieldContainer}>
        <Text style={[styles.label, hasError && styles.labelError]}>
          Booking Date <Text style={styles.required}>*</Text>
        </Text>
        <View style={[styles.pickerWrapper, hasError && styles.pickerWrapperError]}>
          <DatePicker
            value={date}
            onValueChange={(val) => {
              setDate(val);
              if (val) setSubmitted(false);
            }}
            placeholder="Select a date..."
          >
            <DatePickerTrigger />
            <DatePickerContent>
              <DatePickerHeader />
              <DatePickerCalendar />
            </DatePickerContent>
          </DatePicker>
        </View>
        {hasError && (
          <Text style={styles.errorText}>Please select a booking date</Text>
        )}
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Book Now</Text>
      </Pressable>
    </View>
  );
}

export const ErrorState: Story = {
  render: () => <ErrorStateDatePicker />,
};

// ============================================================================
// Story: WithMinMaxDateConstraints
// ============================================================================
function MinMaxDatePicker() {
  const [date, setDate] = useState<Date | null>(null);

  const today = new Date();
  const minDate = today;
  const maxDate = addMonths(today, 3);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Appointment Date</Text>
      <DatePicker
        value={date}
        onValueChange={setDate}
        minDate={minDate}
        maxDate={maxDate}
        placeholder="Select a date..."
      >
        <DatePickerTrigger />
        <DatePickerContent>
          <DatePickerHeader />
          <DatePickerCalendar />
        </DatePickerContent>
      </DatePicker>
      <Text style={styles.helperText}>
        Only dates from today to 3 months from now are selectable
      </Text>
      <View style={styles.constraintInfo}>
        <Text style={styles.constraintLabel}>Min date:</Text>
        <Text style={styles.constraintValue}>{minDate.toLocaleDateString()}</Text>
      </View>
      <View style={styles.constraintInfo}>
        <Text style={styles.constraintLabel}>Max date:</Text>
        <Text style={styles.constraintValue}>{maxDate.toLocaleDateString()}</Text>
      </View>
    </View>
  );
}

export const WithMinMaxDateConstraints: Story = {
  render: () => <MinMaxDatePicker />,
};

// ============================================================================
// Story: CustomDateFormat
// ============================================================================
function CustomFormatDatePicker() {
  const [date1, setDate1] = useState<Date | null>(new Date());
  const [date2, setDate2] = useState<Date | null>(new Date());
  const [date3, setDate3] = useState<Date | null>(new Date());

  return (
    <View style={styles.formatsContainer}>
      <Text style={styles.formTitle}>Date Format Examples</Text>

      <View style={styles.formatRow}>
        <Text style={styles.formatLabel}>Default (MMM d, yyyy):</Text>
        <DatePicker value={date1} onValueChange={setDate1}>
          <DatePickerTrigger />
          <DatePickerContent>
            <DatePickerHeader />
            <DatePickerCalendar />
          </DatePickerContent>
        </DatePicker>
      </View>

      <View style={styles.formatRow}>
        <Text style={styles.formatLabel}>Short (MM/dd/yyyy):</Text>
        <DatePicker value={date2} onValueChange={setDate2} format="MM/dd/yyyy">
          <DatePickerTrigger />
          <DatePickerContent>
            <DatePickerHeader />
            <DatePickerCalendar />
          </DatePickerContent>
        </DatePicker>
      </View>

      <View style={styles.formatRow}>
        <Text style={styles.formatLabel}>Full (MMMM d, yyyy):</Text>
        <DatePicker value={date3} onValueChange={setDate3} format="MMMM d, yyyy">
          <DatePickerTrigger />
          <DatePickerContent>
            <DatePickerHeader />
            <DatePickerCalendar />
          </DatePickerContent>
        </DatePicker>
      </View>
    </View>
  );
}

export const CustomDateFormat: Story = {
  render: () => <CustomFormatDatePicker />,
};

// ============================================================================
// Story: DisabledSpecificDates
// ============================================================================
function DisabledDatesPicker() {
  const [date, setDate] = useState<Date | null>(null);

  // Disable weekends
  const isDateDisabled = (date: Date) => isWeekend(date);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Business Day Selection</Text>
      <DatePicker
        value={date}
        onValueChange={setDate}
        disabledDates={isDateDisabled}
        placeholder="Select a business day..."
      >
        <DatePickerTrigger />
        <DatePickerContent>
          <DatePickerHeader />
          <DatePickerCalendar />
        </DatePickerContent>
      </DatePicker>
      <Text style={styles.helperText}>
        Weekends (Saturday & Sunday) are disabled
      </Text>
      {date && (
        <Text style={styles.stateText}>
          Selected: {formatDateToString(date)}
        </Text>
      )}
    </View>
  );
}

export const DisabledSpecificDates: Story = {
  render: () => <DisabledDatesPicker />,
};

// ============================================================================
// Story: DisabledHolidays
// ============================================================================
function DisabledHolidaysPicker() {
  const [date, setDate] = useState<Date | null>(null);

  // Sample US holidays for current year
  const holidays = [
    new Date(new Date().getFullYear(), 0, 1), // New Year's Day
    new Date(new Date().getFullYear(), 6, 4), // Independence Day
    new Date(new Date().getFullYear(), 11, 25), // Christmas
    new Date(new Date().getFullYear(), 10, 28), // Thanksgiving (simplified)
  ];

  const isHoliday = (date: Date) => {
    return holidays.some(
      (holiday) =>
        holiday.getDate() === date.getDate() &&
        holiday.getMonth() === date.getMonth()
    );
  };

  // Disable weekends and holidays
  const isDateDisabled = (date: Date) => isWeekend(date) || isHoliday(date);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Delivery Date</Text>
      <DatePicker
        value={date}
        onValueChange={setDate}
        disabledDates={isDateDisabled}
        minDate={new Date()}
        placeholder="Select a delivery date..."
      >
        <DatePickerTrigger />
        <DatePickerContent>
          <DatePickerHeader />
          <DatePickerCalendar />
        </DatePickerContent>
      </DatePicker>
      <View style={styles.holidayInfo}>
        <Text style={styles.holidayTitle}>Disabled dates:</Text>
        <Text style={styles.holidayText}>- All weekends</Text>
        <Text style={styles.holidayText}>- New Year's Day (Jan 1)</Text>
        <Text style={styles.holidayText}>- Independence Day (Jul 4)</Text>
        <Text style={styles.holidayText}>- Thanksgiving (Nov 28)</Text>
        <Text style={styles.holidayText}>- Christmas (Dec 25)</Text>
      </View>
    </View>
  );
}

export const DisabledHolidays: Story = {
  render: () => <DisabledHolidaysPicker />,
};

// ============================================================================
// Story: AllSizes (placeholder - component may not have sizes)
// ============================================================================
function DatePickerForm() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <View style={styles.dateRangeContainer}>
      <Text style={styles.formTitle}>Date Range Selection</Text>

      <View style={styles.dateRangeRow}>
        <View style={styles.dateRangeField}>
          <Text style={styles.label}>Start Date</Text>
          <DatePicker
            value={startDate}
            onValueChange={setStartDate}
            maxDate={endDate || undefined}
            placeholder="Start..."
          >
            <DatePickerTrigger />
            <DatePickerContent>
              <DatePickerHeader />
              <DatePickerCalendar />
            </DatePickerContent>
          </DatePicker>
        </View>

        <View style={styles.dateRangeField}>
          <Text style={styles.label}>End Date</Text>
          <DatePicker
            value={endDate}
            onValueChange={setEndDate}
            minDate={startDate || undefined}
            placeholder="End..."
          >
            <DatePickerTrigger />
            <DatePickerContent>
              <DatePickerHeader />
              <DatePickerCalendar />
            </DatePickerContent>
          </DatePicker>
        </View>
      </View>

      {startDate && endDate && (
        <View style={styles.dateRangeSummary}>
          <Text style={styles.dateRangeSummaryTitle}>Selected Range:</Text>
          <Text style={styles.dateRangeSummaryText}>
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </Text>
          <Text style={styles.dateRangeDuration}>
            ({Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days)
          </Text>
        </View>
      )}
    </View>
  );
}

export const DateRangeForm: Story = {
  render: () => <DatePickerForm />,
};

// ============================================================================
// Story: AccessibilityDemo
// ============================================================================
function AccessibilityDatePicker() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.accessibilityInfo}>
        <Text style={styles.accessibilityTitle}>Accessibility Features</Text>
        <Text style={styles.accessibilityText}>
          This date picker supports keyboard navigation and screen readers with proper ARIA labels.
        </Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text nativeID="date-label" style={styles.label}>
          Select a date
        </Text>
        <DatePicker
          value={date}
          onValueChange={setDate}
          placeholder="Choose a date..."
        >
          <DatePickerTrigger />
          <DatePickerContent>
            <DatePickerHeader />
            <DatePickerCalendar />
          </DatePickerContent>
        </DatePicker>
        <Text nativeID="date-description" style={styles.helperText}>
          Use arrow keys in calendar to navigate between dates
        </Text>
      </View>

      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsTitle}>Calendar Navigation</Text>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>← →</Text>
          <Text style={styles.instructionText}>Navigate months</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Click Month</Text>
          <Text style={styles.instructionText}>Switch to month view</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Click Year</Text>
          <Text style={styles.instructionText}>Switch to year view</Text>
        </View>
      </View>
    </View>
  );
}

export const AccessibilityDemo: Story = {
  render: () => <AccessibilityDatePicker />,
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    width: 320,
    padding: 24,
    gap: 16,
  },
  controlledContainer: {
    width: 380,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 20,
  },
  formContainer: {
    width: 360,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 16,
  },
  formatsContainer: {
    width: 380,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 16,
  },
  dateRangeContainer: {
    width: 420,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 16,
  },
  fieldContainer: {
    gap: 6,
  },
  pickerWrapper: {
    borderRadius: 8,
  },
  pickerWrapperError: {
    borderWidth: 2,
    borderColor: '#ef4444',
    borderRadius: 12,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  labelError: {
    color: '#ef4444',
  },
  required: {
    color: '#ef4444',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
  hint: {
    fontSize: 12,
    color: '#999',
  },
  stateText: {
    fontSize: 14,
    color: '#666',
  },
  quickSelect: {
    gap: 8,
  },
  quickSelectLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  quickSelectButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickSelectButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quickSelectButtonText: {
    fontSize: 13,
    color: '#333',
  },
  clearButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  clearButtonText: {
    fontSize: 13,
    color: '#666',
  },
  selectedInfo: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    gap: 4,
  },
  selectedInfoLabel: {
    fontSize: 12,
    color: '#666',
  },
  selectedInfoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  constraintInfo: {
    flexDirection: 'row',
    gap: 8,
  },
  constraintLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  constraintValue: {
    fontSize: 12,
    color: '#333',
  },
  formatRow: {
    gap: 8,
  },
  formatLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  holidayInfo: {
    backgroundColor: '#fef3c7',
    padding: 12,
    borderRadius: 8,
    gap: 4,
  },
  holidayTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 4,
  },
  holidayText: {
    fontSize: 12,
    color: '#92400e',
  },
  dateRangeRow: {
    flexDirection: 'row',
    gap: 16,
  },
  dateRangeField: {
    flex: 1,
    gap: 6,
  },
  dateRangeSummary: {
    backgroundColor: '#e0f2fe',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    gap: 4,
  },
  dateRangeSummaryTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0369a1',
  },
  dateRangeSummaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0369a1',
  },
  dateRangeDuration: {
    fontSize: 12,
    color: '#0369a1',
  },
  accessibilityInfo: {
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  accessibilityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 4,
  },
  accessibilityText: {
    fontSize: 13,
    color: '#166534',
    lineHeight: 18,
  },
  instructionsBox: {
    backgroundColor: '#f0f7ff',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 4,
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  keyBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#1e40af',
    minWidth: 90,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 13,
    color: '#1e40af',
  },
});
