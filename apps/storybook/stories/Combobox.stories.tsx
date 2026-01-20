import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
} from '@r-ui/react-native';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Forms/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A searchable select component with autocomplete functionality. Supports keyboard navigation, custom filtering, and grouped options.',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable the combobox',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

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

const countries = [
  { value: 'us', label: 'United States', keywords: ['usa', 'america'] },
  { value: 'uk', label: 'United Kingdom', keywords: ['england', 'britain'] },
  { value: 'ca', label: 'Canada', keywords: ['canadian'] },
  { value: 'au', label: 'Australia', keywords: ['aussie'] },
  { value: 'de', label: 'Germany', keywords: ['deutschland'] },
  { value: 'fr', label: 'France', keywords: ['french'] },
  { value: 'jp', label: 'Japan', keywords: ['nippon'] },
  { value: 'br', label: 'Brazil', keywords: ['brasil'] },
  { value: 'in', label: 'India', keywords: ['indian'] },
  { value: 'mx', label: 'Mexico', keywords: ['mexican'] },
];

const groupedOptions = {
  frontend: [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ],
  backend: [
    { value: 'node', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
  ],
  mobile: [
    { value: 'react-native', label: 'React Native' },
    { value: 'flutter', label: 'Flutter' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
  ],
};

// ============================================================================
// Story: Default
// ============================================================================
function DefaultCombobox() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Combobox value={value} onValueChange={setValue}>
        <ComboboxTrigger placeholder="Select a framework..." />
        <ComboboxContent>
          <ComboboxInput placeholder="Search frameworks..." />
          <ComboboxList>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework.value} value={framework.value}>
                {framework.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <Text style={styles.stateText}>
        Selected: {value || 'None'}
      </Text>
    </View>
  );
}

export const Default: Story = {
  render: () => <DefaultCombobox />,
};

// ============================================================================
// Story: WithDefaultValue
// ============================================================================
function WithDefaultValueCombobox() {
  const [value, setValue] = useState('react');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Favorite Framework</Text>
      <Combobox value={value} onValueChange={setValue}>
        <ComboboxTrigger placeholder="Select a framework..." />
        <ComboboxContent>
          <ComboboxInput placeholder="Search..." />
          <ComboboxList>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework.value} value={framework.value}>
                {framework.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty />
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </View>
  );
}

export const WithDefaultValue: Story = {
  render: () => <WithDefaultValueCombobox />,
};

// ============================================================================
// Story: Controlled
// ============================================================================
function ControlledCombobox() {
  const [value, setValue] = useState('vue');

  return (
    <View style={styles.controlledContainer}>
      <Text style={styles.formTitle}>Controlled Combobox</Text>

      <View style={styles.quickSelect}>
        <Text style={styles.quickSelectLabel}>Quick select:</Text>
        <View style={styles.quickSelectButtons}>
          {frameworks.slice(0, 4).map((fw) => (
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

      <Combobox value={value} onValueChange={setValue}>
        <ComboboxTrigger placeholder="Select a framework..." />
        <ComboboxContent>
          <ComboboxInput />
          <ComboboxList>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework.value} value={framework.value}>
                {framework.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty />
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

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
  render: () => <ControlledCombobox />,
};

// ============================================================================
// Story: WithLabel
// ============================================================================
function WithLabelCombobox() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Country</Text>
        <Combobox value={value} onValueChange={setValue}>
          <ComboboxTrigger placeholder="Select a country..." />
          <ComboboxContent>
            <ComboboxInput placeholder="Search countries..." />
            <ComboboxList>
              {countries.map((country) => (
                <ComboboxItem
                  key={country.value}
                  value={country.value}
                  keywords={country.keywords}
                >
                  {country.label}
                </ComboboxItem>
              ))}
              <ComboboxEmpty />
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <Text style={styles.helperText}>
          Search by country name or keywords (e.g., "usa" for United States)
        </Text>
      </View>
    </View>
  );
}

export const WithLabel: Story = {
  render: () => <WithLabelCombobox />,
};

// ============================================================================
// Story: Disabled
// ============================================================================
export const Disabled: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.label}>Framework (Disabled)</Text>
      <Combobox value="react" disabled>
        <ComboboxTrigger placeholder="Select a framework..." />
        <ComboboxContent>
          <ComboboxInput />
          <ComboboxList>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework.value} value={framework.value}>
                {framework.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <Text style={styles.hint}>This combobox is disabled</Text>
    </View>
  ),
};

// ============================================================================
// Story: ErrorState
// ============================================================================
function ErrorStateCombobox() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const hasError = submitted && !value;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Registration Form</Text>

      <View style={styles.fieldContainer}>
        <Text style={[styles.label, hasError && styles.labelError]}>
          Country <Text style={styles.required}>*</Text>
        </Text>
        <View style={[styles.comboboxWrapper, hasError && styles.comboboxWrapperError]}>
          <Combobox
            value={value}
            onValueChange={(val) => {
              setValue(val);
              if (val) setSubmitted(false);
            }}
          >
            <ComboboxTrigger placeholder="Select your country..." />
            <ComboboxContent>
              <ComboboxInput placeholder="Search..." />
              <ComboboxList>
                {countries.map((country) => (
                  <ComboboxItem key={country.value} value={country.value}>
                    {country.label}
                  </ComboboxItem>
                ))}
                <ComboboxEmpty />
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </View>
        {hasError && (
          <Text style={styles.errorText}>Please select a country</Text>
        )}
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

export const ErrorState: Story = {
  render: () => <ErrorStateCombobox />,
};

// ============================================================================
// Story: AsyncLoading
// ============================================================================
function AsyncLoadingCombobox() {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<typeof frameworks>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadOptions = () => {
    if (hasLoaded) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOptions(frameworks);
      setIsLoading(false);
      setHasLoaded(true);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Framework (Async Loading)</Text>
      <Combobox
        value={value}
        onValueChange={setValue}
        onOpenChange={(open) => {
          if (open) loadOptions();
        }}
      >
        <ComboboxTrigger placeholder="Select a framework..." />
        <ComboboxContent>
          <ComboboxInput placeholder="Search..." />
          <ComboboxList>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading options...</Text>
              </View>
            ) : (
              <>
                {options.map((framework) => (
                  <ComboboxItem key={framework.value} value={framework.value}>
                    {framework.label}
                  </ComboboxItem>
                ))}
                <ComboboxEmpty />
              </>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <Text style={styles.hint}>
        Options load when dropdown opens
      </Text>
    </View>
  );
}

export const AsyncLoading: Story = {
  render: () => <AsyncLoadingCombobox />,
};

// ============================================================================
// Story: CustomOptionRendering
// ============================================================================
const usersWithAvatars = [
  { value: 'john', label: 'John Doe', email: 'john@example.com', avatar: 'JD' },
  { value: 'jane', label: 'Jane Smith', email: 'jane@example.com', avatar: 'JS' },
  { value: 'bob', label: 'Bob Wilson', email: 'bob@example.com', avatar: 'BW' },
  { value: 'alice', label: 'Alice Johnson', email: 'alice@example.com', avatar: 'AJ' },
  { value: 'mike', label: 'Mike Brown', email: 'mike@example.com', avatar: 'MB' },
];

function CustomOptionRenderingCombobox() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Assign to User</Text>
      <Combobox value={value} onValueChange={setValue}>
        <ComboboxTrigger placeholder="Select a user..." />
        <ComboboxContent>
          <ComboboxInput placeholder="Search users..." />
          <ComboboxList>
            {usersWithAvatars.map((user) => (
              <ComboboxItem key={user.value} value={user.value}>
                <View style={styles.userOption}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user.avatar}</Text>
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.label}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                  </View>
                </View>
              </ComboboxItem>
            ))}
            <ComboboxEmpty>No users found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </View>
  );
}

export const CustomOptionRendering: Story = {
  render: () => <CustomOptionRenderingCombobox />,
};

// ============================================================================
// Story: GroupedOptions
// ============================================================================
function GroupedOptionsCombobox() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Technology Stack</Text>
      <Combobox value={value} onValueChange={setValue}>
        <ComboboxTrigger placeholder="Select a technology..." />
        <ComboboxContent>
          <ComboboxInput placeholder="Search technologies..." />
          <ComboboxList>
            <ComboboxGroup heading="Frontend">
              {groupedOptions.frontend.map((item) => (
                <ComboboxItem key={item.value} value={item.value}>
                  {item.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
            <ComboboxGroup heading="Backend">
              {groupedOptions.backend.map((item) => (
                <ComboboxItem key={item.value} value={item.value}>
                  {item.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
            <ComboboxGroup heading="Mobile">
              {groupedOptions.mobile.map((item) => (
                <ComboboxItem key={item.value} value={item.value}>
                  {item.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
            <ComboboxEmpty>No technologies found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <Text style={styles.stateText}>
        Selected: {value || 'None'}
      </Text>
    </View>
  );
}

export const GroupedOptions: Story = {
  render: () => <GroupedOptionsCombobox />,
};

// ============================================================================
// Story: EmptyState
// ============================================================================
function EmptyStateCombobox() {
  const [value, setValue] = useState('');

  const emptyOptions: typeof frameworks = [];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Empty State Demo</Text>
      <Combobox value={value} onValueChange={setValue}>
        <ComboboxTrigger placeholder="Search..." />
        <ComboboxContent>
          <ComboboxInput placeholder="Type to search..." />
          <ComboboxList>
            {emptyOptions.map((item) => (
              <ComboboxItem key={item.value} value={item.value}>
                {item.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty>
              <View style={styles.emptyStateContent}>
                <Text style={styles.emptyStateIcon}>🔍</Text>
                <Text style={styles.emptyStateTitle}>No results found</Text>
                <Text style={styles.emptyStateText}>
                  Try adjusting your search terms
                </Text>
              </View>
            </ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <Text style={styles.hint}>
        Type anything to see the custom empty state
      </Text>
    </View>
  );
}

export const EmptyState: Story = {
  render: () => <EmptyStateCombobox />,
};

// ============================================================================
// Story: KeyboardNavigationDemo
// ============================================================================
function KeyboardNavigationCombobox() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsTitle}>Keyboard Navigation</Text>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Tab</Text>
          <Text style={styles.instructionText}>Focus the combobox</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Space/Enter</Text>
          <Text style={styles.instructionText}>Open dropdown</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>↑ / ↓</Text>
          <Text style={styles.instructionText}>Navigate options</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Enter</Text>
          <Text style={styles.instructionText}>Select highlighted option</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Escape</Text>
          <Text style={styles.instructionText}>Close dropdown</Text>
        </View>
      </View>

      <Combobox value={value} onValueChange={setValue}>
        <ComboboxTrigger placeholder="Try keyboard navigation..." />
        <ComboboxContent>
          <ComboboxInput placeholder="Type to filter..." />
          <ComboboxList>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework.value} value={framework.value}>
                {framework.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty />
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <Text style={styles.stateText}>
        Selected: {value || 'None'}
      </Text>
    </View>
  );
}

export const KeyboardNavigationDemo: Story = {
  render: () => <KeyboardNavigationCombobox />,
};

// ============================================================================
// Story: AccessibilityDemo
// ============================================================================
function AccessibilityCombobox() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.accessibilityInfo}>
        <Text style={styles.accessibilityTitle}>Accessibility Features</Text>
        <Text style={styles.accessibilityText}>
          This component includes proper ARIA labels, keyboard support, and screen reader announcements.
        </Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text nativeID="country-label" style={styles.label}>
          Select your country
        </Text>
        <Combobox value={value} onValueChange={setValue}>
          <ComboboxTrigger
            placeholder="Choose a country..."
          />
          <ComboboxContent>
            <ComboboxInput
              placeholder="Type to search..."
            />
            <ComboboxList>
              {countries.map((country) => (
                <ComboboxItem
                  key={country.value}
                  value={country.value}
                  keywords={country.keywords}
                >
                  {country.label}
                </ComboboxItem>
              ))}
              <ComboboxEmpty />
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <Text nativeID="country-description" style={styles.helperText}>
          Use arrow keys to navigate, Enter to select
        </Text>
      </View>
    </View>
  );
}

export const AccessibilityDemo: Story = {
  render: () => <AccessibilityCombobox />,
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
  fieldContainer: {
    gap: 6,
  },
  comboboxWrapper: {
    borderRadius: 8,
  },
  comboboxWrapperError: {
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
  loadingContainer: {
    padding: 24,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  userOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  userEmail: {
    fontSize: 12,
    color: '#666',
  },
  emptyStateContent: {
    alignItems: 'center',
    gap: 8,
  },
  emptyStateIcon: {
    fontSize: 32,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
  },
  instructionsBox: {
    backgroundColor: '#f0f7ff',
    padding: 16,
    borderRadius: 8,
    gap: 8,
    marginBottom: 8,
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
});
