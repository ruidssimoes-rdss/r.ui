import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@r-ui/react-native';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// ============================================================================
// Story: Default
// ============================================================================
function DefaultSelect() {
  const [value, setValue] = useState('');

  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Date', value: 'date' },
    { label: 'Elderberry', value: 'elderberry' },
  ];

  return (
    <View style={styles.container}>
      <Select
        value={value}
        onValueChange={setValue}
        options={options}
      />
      <Text style={styles.stateText}>
        Selected: {value || 'None'}
      </Text>
    </View>
  );
}

export const Default: Story = {
  render: () => <DefaultSelect />,
};

// ============================================================================
// Story: WithPlaceholder
// ============================================================================
function WithPlaceholderSelect() {
  const [value, setValue] = useState('');

  const options = [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
    { label: 'Yellow', value: 'yellow' },
  ];

  return (
    <View style={styles.container}>
      <Select
        value={value}
        onValueChange={setValue}
        options={options}
        placeholder="Choose a color..."
      />
    </View>
  );
}

export const WithPlaceholder: Story = {
  render: () => <WithPlaceholderSelect />,
};

// ============================================================================
// Story: Disabled
// ============================================================================
export const Disabled: Story = {
  render: () => (
    <View style={styles.container}>
      <Select
        value="option1"
        options={[
          { label: 'Selected Option', value: 'option1' },
          { label: 'Another Option', value: 'option2' },
        ]}
        disabled
      />
      <Text style={styles.hint}>This select is disabled</Text>
    </View>
  ),
};

// ============================================================================
// Story: DefaultValue
// ============================================================================
function DefaultValueSelect() {
  const [value, setValue] = useState('medium');

  const options = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
    { label: 'Extra Large', value: 'xl' },
  ];

  return (
    <View style={styles.container}>
      <Select
        value={value}
        onValueChange={setValue}
        options={options}
        label="Size"
      />
    </View>
  );
}

export const DefaultValue: Story = {
  render: () => <DefaultValueSelect />,
};

// ============================================================================
// Story: Countries
// ============================================================================
function CountriesSelect() {
  const [value, setValue] = useState('');

  const countries = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
    { label: 'China', value: 'cn' },
    { label: 'India', value: 'in' },
    { label: 'Brazil', value: 'br' },
    { label: 'Mexico', value: 'mx' },
    { label: 'Spain', value: 'es' },
    { label: 'Italy', value: 'it' },
    { label: 'Netherlands', value: 'nl' },
    { label: 'Sweden', value: 'se' },
    { label: 'Norway', value: 'no' },
    { label: 'Denmark', value: 'dk' },
    { label: 'Finland', value: 'fi' },
    { label: 'Switzerland', value: 'ch' },
    { label: 'Portugal', value: 'pt' },
  ];

  return (
    <View style={styles.container}>
      <Select
        value={value}
        onValueChange={setValue}
        options={countries}
        placeholder="Select a country"
        label="Country"
        helperText="We ship to these countries"
      />
    </View>
  );
}

export const Countries: Story = {
  render: () => <CountriesSelect />,
};

// ============================================================================
// Story: Categories
// ============================================================================
function CategoriesSelect() {
  const [value, setValue] = useState('');

  const categories = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing & Fashion', value: 'clothing' },
    { label: 'Home & Garden', value: 'home' },
    { label: 'Sports & Outdoors', value: 'sports' },
    { label: 'Books & Media', value: 'books' },
    { label: 'Health & Beauty', value: 'health' },
    { label: 'Toys & Games', value: 'toys' },
    { label: 'Food & Beverages', value: 'food' },
  ];

  return (
    <View style={styles.container}>
      <Select
        value={value}
        onValueChange={setValue}
        options={categories}
        placeholder="Select a category"
        label="Product Category"
      />
    </View>
  );
}

export const Categories: Story = {
  render: () => <CategoriesSelect />,
};

// ============================================================================
// Story: Grouped
// ============================================================================
function GroupedSelect() {
  const [value, setValue] = useState('');

  // Note: Since the component doesn't support groups natively,
  // we simulate grouping with prefixed labels
  const options = [
    { label: '── Fruits ──', value: '_fruits_header' },
    { label: '  Apple', value: 'apple' },
    { label: '  Banana', value: 'banana' },
    { label: '  Orange', value: 'orange' },
    { label: '── Vegetables ──', value: '_veg_header' },
    { label: '  Carrot', value: 'carrot' },
    { label: '  Broccoli', value: 'broccoli' },
    { label: '  Spinach', value: 'spinach' },
    { label: '── Dairy ──', value: '_dairy_header' },
    { label: '  Milk', value: 'milk' },
    { label: '  Cheese', value: 'cheese' },
    { label: '  Yogurt', value: 'yogurt' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>
        Groups are simulated with formatted labels
      </Text>
      <Select
        value={value}
        onValueChange={setValue}
        options={options}
        placeholder="Select an item"
        label="Groceries"
      />
    </View>
  );
}

export const Grouped: Story = {
  render: () => <GroupedSelect />,
};

// ============================================================================
// Story: WithIcons
// ============================================================================
function WithIconsSelect() {
  const [value, setValue] = useState('');

  // Note: Using emoji as icons since the component uses text labels
  const options = [
    { label: '🔔 All notifications', value: 'all' },
    { label: '📧 Email only', value: 'email' },
    { label: '💬 SMS only', value: 'sms' },
    { label: '📱 Push only', value: 'push' },
    { label: '🔕 None', value: 'none' },
  ];

  return (
    <View style={styles.container}>
      <Select
        value={value}
        onValueChange={setValue}
        options={options}
        placeholder="Select notification type"
        label="Notification Preferences"
      />
    </View>
  );
}

export const WithIcons: Story = {
  render: () => <WithIconsSelect />,
};

// ============================================================================
// Story: FormField
// ============================================================================
function FormFieldSelect() {
  const [department, setDepartment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const hasError = submitted && !department;

  const departments = [
    { label: 'Engineering', value: 'engineering' },
    { label: 'Design', value: 'design' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Sales', value: 'sales' },
    { label: 'Human Resources', value: 'hr' },
    { label: 'Finance', value: 'finance' },
  ];

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Employee Registration</Text>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Full Name</Text>
        <View style={styles.formInput}>
          <Text style={styles.formInputText}>John Smith</Text>
        </View>
      </View>

      <Select
        value={department}
        onValueChange={(val) => {
          setDepartment(val);
          if (val) setSubmitted(false);
        }}
        options={departments}
        placeholder="Select a department"
        label="Department"
        error={hasError}
        helperText={hasError ? 'Please select a department' : 'Which team will you join?'}
      />

      <Pressable style={styles.formButton} onPress={handleSubmit}>
        <Text style={styles.formButtonText}>Register</Text>
      </Pressable>
    </View>
  );
}

export const FormField: Story = {
  render: () => <FormFieldSelect />,
};

// ============================================================================
// Story: Controlled
// ============================================================================
function ControlledSelect() {
  const [value, setValue] = useState('react');

  const frameworks = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
  ];

  return (
    <View style={styles.controlledContainer}>
      <Text style={styles.formTitle}>Controlled Select</Text>

      <View style={styles.quickSelect}>
        <Text style={styles.quickSelectLabel}>Quick select:</Text>
        <View style={styles.quickSelectButtons}>
          {frameworks.slice(0, 3).map((fw) => (
            <Pressable
              key={fw.value}
              style={[
                styles.quickSelectButton,
                value === fw.value && styles.quickSelectButtonActive,
              ]}
              onPress={() => setValue(fw.value)}
            >
              <Text
                style={[
                  styles.quickSelectButtonText,
                  value === fw.value && styles.quickSelectButtonTextActive,
                ]}
              >
                {fw.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Select
        value={value}
        onValueChange={setValue}
        options={frameworks}
        label="Framework"
        helperText="State is controlled externally"
      />

      <View style={styles.selectedInfo}>
        <Text style={styles.selectedInfoLabel}>Current value:</Text>
        <View style={styles.selectedInfoBadge}>
          <Text style={styles.selectedInfoBadgeText}>{value}</Text>
        </View>
      </View>
    </View>
  );
}

export const Controlled: Story = {
  render: () => <ControlledSelect />,
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    width: 300,
    padding: 24,
    gap: 16,
  },
  stateText: {
    fontSize: 14,
    color: '#666',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
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
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  formField: {
    gap: 6,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  formInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  formInputText: {
    fontSize: 14,
    color: '#333',
  },
  formButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  formButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  controlledContainer: {
    width: 360,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 20,
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
    gap: 8,
  },
  quickSelectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quickSelectButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  quickSelectButtonText: {
    fontSize: 14,
    color: '#333',
  },
  quickSelectButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  selectedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  selectedInfoLabel: {
    fontSize: 14,
    color: '#666',
  },
  selectedInfoBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  selectedInfoBadgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
