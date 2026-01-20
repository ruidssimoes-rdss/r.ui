import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectContent,
  MultiSelectInput,
  MultiSelectList,
  MultiSelectOption,
  MultiSelectEmpty,
  MultiSelectOption as MultiSelectOptionType,
} from '@r-ui/react-native';

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/Forms/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A multi-select component that allows selecting multiple options. Supports search/filter, grouped options, max selection limits, and creatable items.',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable the multi-select',
    },
    creatable: {
      control: 'boolean',
      description: 'Allow creating new options',
    },
    maxItems: {
      control: 'number',
      description: 'Maximum number of selections',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

// ============================================================================
// Mock Data
// ============================================================================

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
  { value: 'preact', label: 'Preact' },
  { value: 'qwik', label: 'Qwik' },
  { value: 'lit', label: 'Lit' },
];

const skills = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
  { value: 'swift', label: 'Swift' },
];

const categories = [
  { value: 'electronics', label: 'Electronics', group: 'Products' },
  { value: 'clothing', label: 'Clothing & Fashion', group: 'Products' },
  { value: 'home', label: 'Home & Garden', group: 'Products' },
  { value: 'sports', label: 'Sports & Outdoors', group: 'Products' },
  { value: 'bugs', label: 'Bug Reports', group: 'Support' },
  { value: 'features', label: 'Feature Requests', group: 'Support' },
  { value: 'questions', label: 'Questions', group: 'Support' },
  { value: 'feedback', label: 'Feedback', group: 'Support' },
];

const teamMembers = [
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'bob', label: 'Bob Wilson' },
  { value: 'alice', label: 'Alice Johnson' },
  { value: 'mike', label: 'Mike Brown' },
  { value: 'sarah', label: 'Sarah Davis' },
  { value: 'tom', label: 'Tom Anderson' },
  { value: 'emma', label: 'Emma White' },
];

const technologies = [
  { value: 'react', label: 'React', group: 'Frontend' },
  { value: 'vue', label: 'Vue', group: 'Frontend' },
  { value: 'angular', label: 'Angular', group: 'Frontend' },
  { value: 'svelte', label: 'Svelte', group: 'Frontend' },
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'python', label: 'Python', group: 'Backend' },
  { value: 'go', label: 'Go', group: 'Backend' },
  { value: 'rust', label: 'Rust', group: 'Backend' },
  { value: 'postgresql', label: 'PostgreSQL', group: 'Database' },
  { value: 'mongodb', label: 'MongoDB', group: 'Database' },
  { value: 'redis', label: 'Redis', group: 'Database' },
  { value: 'mysql', label: 'MySQL', group: 'Database' },
];

// ============================================================================
// Story: Default
// ============================================================================
function DefaultMultiSelect() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <MultiSelect
        value={value}
        onValueChange={setValue}
        options={frameworks}
        placeholder="Select frameworks..."
      >
        <MultiSelectTrigger />
        <MultiSelectContent>
          <MultiSelectInput />
          <MultiSelectList />
          <MultiSelectEmpty />
        </MultiSelectContent>
      </MultiSelect>
      <Text style={styles.stateText}>
        Selected: {value.length > 0 ? value.join(', ') : 'None'}
      </Text>
    </View>
  );
}

export const Default: Story = {
  render: () => <DefaultMultiSelect />,
};

// ============================================================================
// Story: WithDefaultValues
// ============================================================================
function WithDefaultValuesMultiSelect() {
  const [value, setValue] = useState<string[]>(['react', 'typescript']);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Skills</Text>
      <MultiSelect
        value={value}
        onValueChange={setValue}
        options={skills}
        placeholder="Select your skills..."
      >
        <MultiSelectTrigger />
        <MultiSelectContent>
          <MultiSelectInput placeholder="Search skills..." />
          <MultiSelectList />
          <MultiSelectEmpty />
        </MultiSelectContent>
      </MultiSelect>
      <Text style={styles.helperText}>
        Pre-selected: React and TypeScript
      </Text>
    </View>
  );
}

export const WithDefaultValues: Story = {
  render: () => <WithDefaultValuesMultiSelect />,
};

// ============================================================================
// Story: Controlled
// ============================================================================
function ControlledMultiSelect() {
  const [value, setValue] = useState<string[]>(['react', 'vue']);

  const toggleValue = (val: string) => {
    setValue((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  return (
    <View style={styles.controlledContainer}>
      <Text style={styles.formTitle}>Controlled MultiSelect</Text>

      <View style={styles.quickSelect}>
        <Text style={styles.quickSelectLabel}>Quick select:</Text>
        <View style={styles.quickSelectButtons}>
          {frameworks.slice(0, 4).map((fw) => (
            <Pressable
              key={fw.value}
              style={[
                styles.quickSelectButton,
                value.includes(fw.value) && styles.quickSelectButtonActive,
              ]}
              onPress={() => toggleValue(fw.value)}
            >
              <Text
                style={[
                  styles.quickSelectButtonText,
                  value.includes(fw.value) && styles.quickSelectButtonTextActive,
                ]}
              >
                {fw.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <MultiSelect
        value={value}
        onValueChange={setValue}
        options={frameworks}
        placeholder="Select frameworks..."
      >
        <MultiSelectTrigger />
        <MultiSelectContent>
          <MultiSelectInput />
          <MultiSelectList />
          <MultiSelectEmpty />
        </MultiSelectContent>
      </MultiSelect>

      <View style={styles.selectedInfo}>
        <Text style={styles.selectedInfoLabel}>Selected ({value.length}):</Text>
        <Text style={styles.selectedInfoValue}>
          {value.length > 0 ? value.join(', ') : 'None'}
        </Text>
      </View>
    </View>
  );
}

export const Controlled: Story = {
  render: () => <ControlledMultiSelect />,
};

// ============================================================================
// Story: WithLabel
// ============================================================================
function WithLabelMultiSelect() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Programming Languages</Text>
        <MultiSelect
          value={value}
          onValueChange={setValue}
          options={skills}
          placeholder="Select languages..."
        >
          <MultiSelectTrigger />
          <MultiSelectContent>
            <MultiSelectInput placeholder="Search languages..." />
            <MultiSelectList />
            <MultiSelectEmpty />
          </MultiSelectContent>
        </MultiSelect>
        <Text style={styles.helperText}>
          Select all languages you're proficient in
        </Text>
      </View>
    </View>
  );
}

export const WithLabel: Story = {
  render: () => <WithLabelMultiSelect />,
};

// ============================================================================
// Story: Disabled
// ============================================================================
export const Disabled: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.label}>Technologies (Disabled)</Text>
      <MultiSelect
        value={['react', 'node']}
        options={frameworks}
        disabled
        placeholder="Select..."
      >
        <MultiSelectTrigger />
        <MultiSelectContent>
          <MultiSelectInput />
          <MultiSelectList />
        </MultiSelectContent>
      </MultiSelect>
      <Text style={styles.hint}>This multi-select is disabled</Text>
    </View>
  ),
};

// ============================================================================
// Story: ErrorState
// ============================================================================
function ErrorStateMultiSelect() {
  const [value, setValue] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const hasError = submitted && value.length === 0;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Team Assignment</Text>

      <View style={styles.fieldContainer}>
        <Text style={[styles.label, hasError && styles.labelError]}>
          Assign Team Members <Text style={styles.required}>*</Text>
        </Text>
        <View style={[styles.selectWrapper, hasError && styles.selectWrapperError]}>
          <MultiSelect
            value={value}
            onValueChange={(val) => {
              setValue(val);
              if (val.length > 0) setSubmitted(false);
            }}
            options={teamMembers}
            placeholder="Select team members..."
          >
            <MultiSelectTrigger />
            <MultiSelectContent>
              <MultiSelectInput placeholder="Search members..." />
              <MultiSelectList />
              <MultiSelectEmpty />
            </MultiSelectContent>
          </MultiSelect>
        </View>
        {hasError && (
          <Text style={styles.errorText}>Please select at least one team member</Text>
        )}
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Assign Team</Text>
      </Pressable>
    </View>
  );
}

export const ErrorState: Story = {
  render: () => <ErrorStateMultiSelect />,
};

// ============================================================================
// Story: MaxSelectionsLimit
// ============================================================================
function MaxSelectionsMultiSelect() {
  const [value, setValue] = useState<string[]>([]);
  const maxItems = 3;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Top 3 Skills</Text>
      <MultiSelect
        value={value}
        onValueChange={setValue}
        options={skills}
        maxItems={maxItems}
        placeholder="Select up to 3 skills..."
      >
        <MultiSelectTrigger />
        <MultiSelectContent>
          <MultiSelectInput placeholder="Search..." />
          <MultiSelectList />
          <MultiSelectEmpty />
        </MultiSelectContent>
      </MultiSelect>
      <View style={styles.limitInfo}>
        <Text style={[
          styles.limitText,
          value.length >= maxItems && styles.limitTextReached,
        ]}>
          {value.length} / {maxItems} selected
        </Text>
        {value.length >= maxItems && (
          <Text style={styles.limitWarning}>Maximum selections reached</Text>
        )}
      </View>
    </View>
  );
}

export const MaxSelectionsLimit: Story = {
  render: () => <MaxSelectionsMultiSelect />,
};

// ============================================================================
// Story: WithSearchFilter
// ============================================================================
function WithSearchMultiSelect() {
  const [value, setValue] = useState<string[]>([]);

  const manyOptions = [
    ...skills,
    { value: 'cpp', label: 'C++' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'scala', label: 'Scala' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'clojure', label: 'Clojure' },
    { value: 'fsharp', label: 'F#' },
    { value: 'dart', label: 'Dart' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Languages (with search)</Text>
      <MultiSelect
        value={value}
        onValueChange={setValue}
        options={manyOptions}
        placeholder="Select languages..."
      >
        <MultiSelectTrigger />
        <MultiSelectContent>
          <MultiSelectInput placeholder="Type to filter..." />
          <MultiSelectList />
          <MultiSelectEmpty>
            <Text style={styles.emptyText}>No languages found</Text>
          </MultiSelectEmpty>
        </MultiSelectContent>
      </MultiSelect>
      <Text style={styles.helperText}>
        Use search to quickly find options from {manyOptions.length} available
      </Text>
    </View>
  );
}

export const WithSearchFilter: Story = {
  render: () => <WithSearchMultiSelect />,
};

// ============================================================================
// Story: GroupedOptions
// ============================================================================
function GroupedOptionsMultiSelect() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tech Stack</Text>
      <MultiSelect
        value={value}
        onValueChange={setValue}
        options={technologies}
        placeholder="Select technologies..."
      >
        <MultiSelectTrigger />
        <MultiSelectContent>
          <MultiSelectInput placeholder="Search technologies..." />
          <MultiSelectList />
          <MultiSelectEmpty />
        </MultiSelectContent>
      </MultiSelect>
      <Text style={styles.stateText}>
        Selected: {value.length > 0 ? value.join(', ') : 'None'}
      </Text>
    </View>
  );
}

export const GroupedOptions: Story = {
  render: () => <GroupedOptionsMultiSelect />,
};

// ============================================================================
// Story: Creatable
// ============================================================================
function CreatableMultiSelect() {
  const [value, setValue] = useState<string[]>([]);
  const [options, setOptions] = useState(skills);

  const handleValueChange = (newValue: string[]) => {
    // Check if any new values were added that don't exist in options
    newValue.forEach((val) => {
      if (!options.some((opt) => opt.value === val)) {
        setOptions((prev) => [...prev, { value: val, label: val }]);
      }
    });
    setValue(newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tags (Creatable)</Text>
      <MultiSelect
        value={value}
        onValueChange={handleValueChange}
        options={options}
        creatable
        placeholder="Select or create tags..."
      >
        <MultiSelectTrigger />
        <MultiSelectContent>
          <MultiSelectInput placeholder="Search or type to create..." />
          <MultiSelectList />
          <MultiSelectEmpty>
            <Text style={styles.emptyHint}>
              Press Enter to create a new tag
            </Text>
          </MultiSelectEmpty>
        </MultiSelectContent>
      </MultiSelect>
      <Text style={styles.helperText}>
        Type a new value and press Enter to create it
      </Text>
    </View>
  );
}

export const Creatable: Story = {
  render: () => <CreatableMultiSelect />,
};

// ============================================================================
// Story: CustomTagRendering
// ============================================================================
function CustomTagMultiSelect() {
  const [value, setValue] = useState<string[]>(['react', 'typescript', 'node']);

  const getColor = (val: string) => {
    const colors: Record<string, string> = {
      react: '#61dafb',
      vue: '#42b883',
      angular: '#dd0031',
      typescript: '#3178c6',
      javascript: '#f7df1e',
      python: '#3776ab',
      node: '#339933',
    };
    return colors[val] || '#6b7280';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Skills with Custom Tags</Text>
      <MultiSelect
        value={value}
        onValueChange={setValue}
        options={skills}
        placeholder="Select skills..."
      >
        <MultiSelectTrigger />
        <MultiSelectContent>
          <MultiSelectInput />
          <MultiSelectList />
          <MultiSelectEmpty />
        </MultiSelectContent>
      </MultiSelect>

      <View style={styles.customTagsContainer}>
        {value.map((val) => {
          const option = skills.find((s) => s.value === val);
          return (
            <View
              key={val}
              style={[styles.customTag, { backgroundColor: getColor(val) }]}
            >
              <Text style={styles.customTagText}>{option?.label || val}</Text>
              <Pressable
                onPress={() => setValue((prev) => prev.filter((v) => v !== val))}
                style={styles.customTagRemove}
              >
                <Text style={styles.customTagRemoveText}>×</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export const CustomTagRendering: Story = {
  render: () => <CustomTagMultiSelect />,
};

// ============================================================================
// Story: AsyncOptionsLoading
// ============================================================================
function AsyncMultiSelect() {
  const [value, setValue] = useState<string[]>([]);
  const [options, setOptions] = useState<typeof frameworks>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadOptions = () => {
    if (hasLoaded) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOptions(skills);
      setIsLoading(false);
      setHasLoaded(true);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Skills (Async Loading)</Text>
      <MultiSelect
        value={value}
        onValueChange={setValue}
        options={options}
        placeholder="Select skills..."
      >
        <MultiSelectTrigger />
        <MultiSelectContent>
          <MultiSelectInput
            placeholder="Search..."
          />
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading options...</Text>
            </View>
          ) : (
            <>
              <MultiSelectList />
              <MultiSelectEmpty />
            </>
          )}
        </MultiSelectContent>
      </MultiSelect>
      <Pressable style={styles.loadButton} onPress={loadOptions}>
        <Text style={styles.loadButtonText}>
          {hasLoaded ? 'Options Loaded' : 'Load Options'}
        </Text>
      </Pressable>
    </View>
  );
}

export const AsyncOptionsLoading: Story = {
  render: () => <AsyncMultiSelect />,
};

// ============================================================================
// Story: SelectAll
// ============================================================================
function SelectAllMultiSelect() {
  const [value, setValue] = useState<string[]>([]);

  const allSelected = value.length === frameworks.length;
  const someSelected = value.length > 0 && value.length < frameworks.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setValue([]);
    } else {
      setValue(frameworks.map((f) => f.value));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Frameworks</Text>

      <Pressable style={styles.selectAllRow} onPress={toggleSelectAll}>
        <View style={[
          styles.selectAllCheckbox,
          allSelected && styles.selectAllCheckboxChecked,
          someSelected && styles.selectAllCheckboxIndeterminate,
        ]}>
          {allSelected && <Text style={styles.selectAllCheck}>✓</Text>}
          {someSelected && <Text style={styles.selectAllCheck}>−</Text>}
        </View>
        <Text style={styles.selectAllText}>
          {allSelected ? 'Deselect All' : 'Select All'}
        </Text>
      </Pressable>

      <MultiSelect
        value={value}
        onValueChange={setValue}
        options={frameworks}
        placeholder="Select frameworks..."
      >
        <MultiSelectTrigger />
        <MultiSelectContent>
          <MultiSelectInput />
          <MultiSelectList />
          <MultiSelectEmpty />
        </MultiSelectContent>
      </MultiSelect>

      <Text style={styles.stateText}>
        {value.length} of {frameworks.length} selected
      </Text>
    </View>
  );
}

export const SelectAll: Story = {
  render: () => <SelectAllMultiSelect />,
};

// ============================================================================
// Story: AccessibilityDemo
// ============================================================================
function AccessibilityMultiSelect() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <View style={styles.accessibilityInfo}>
        <Text style={styles.accessibilityTitle}>Accessibility Features</Text>
        <Text style={styles.accessibilityText}>
          The multi-select includes keyboard navigation, screen reader labels, and proper ARIA attributes.
        </Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text nativeID="skills-label" style={styles.label}>
          Select your skills
        </Text>
        <MultiSelect
          value={value}
          onValueChange={setValue}
          options={skills}
          placeholder="Choose skills..."
        >
          <MultiSelectTrigger />
          <MultiSelectContent>
            <MultiSelectInput placeholder="Type to search..." />
            <MultiSelectList />
            <MultiSelectEmpty />
          </MultiSelectContent>
        </MultiSelect>
        <Text nativeID="skills-description" style={styles.helperText}>
          Use Tab to navigate, Space to select
        </Text>
      </View>

      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsTitle}>Keyboard Navigation</Text>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Tab</Text>
          <Text style={styles.instructionText}>Focus trigger</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Enter/Space</Text>
          <Text style={styles.instructionText}>Open dropdown</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>↑ / ↓</Text>
          <Text style={styles.instructionText}>Navigate options</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Space</Text>
          <Text style={styles.instructionText}>Toggle selection</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Escape</Text>
          <Text style={styles.instructionText}>Close dropdown</Text>
        </View>
      </View>
    </View>
  );
}

export const AccessibilityDemo: Story = {
  render: () => <AccessibilityMultiSelect />,
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    width: 360,
    padding: 24,
    gap: 16,
  },
  controlledContainer: {
    width: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 20,
  },
  formContainer: {
    width: 400,
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
  selectWrapper: {
    borderRadius: 8,
  },
  selectWrapperError: {
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
  quickSelectButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  quickSelectButtonText: {
    fontSize: 13,
    color: '#333',
  },
  quickSelectButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
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
  limitInfo: {
    gap: 4,
  },
  limitText: {
    fontSize: 13,
    color: '#666',
  },
  limitTextReached: {
    color: '#f59e0b',
    fontWeight: '500',
  },
  limitWarning: {
    fontSize: 12,
    color: '#f59e0b',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  emptyHint: {
    fontSize: 13,
    color: '#007AFF',
    textAlign: 'center',
  },
  customTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  customTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 6,
    borderRadius: 16,
  },
  customTagText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
  },
  customTagRemove: {
    marginLeft: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customTagRemoveText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    padding: 24,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  loadButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  loadButtonText: {
    fontSize: 13,
    color: '#333',
  },
  selectAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  selectAllCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectAllCheckboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  selectAllCheckboxIndeterminate: {
    backgroundColor: '#93c5fd',
    borderColor: '#93c5fd',
  },
  selectAllCheck: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  selectAllText: {
    fontSize: 14,
    color: '#333',
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
    minWidth: 80,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 13,
    color: '#1e40af',
  },
});
