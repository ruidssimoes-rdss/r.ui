import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormDescription,
  Input,
  Select,
  Checkbox,
  Switch,
  Textarea,
} from '@r-ui/react-native';

const meta: Meta<typeof Form> = {
  title: 'Components/Forms/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form component with field validation, error handling, and accessibility features. Provides context for labels, messages, and form state management.',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable all form fields',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

// ============================================================================
// Story: Default
// ============================================================================
function DefaultForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Form>
        <FormField name="name">
          <FormLabel>Name</FormLabel>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
          <FormMessage />
        </FormField>

        <View style={styles.spacer} />

        <FormField name="email">
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <FormMessage />
        </FormField>
      </Form>
    </View>
  );
}

export const Default: Story = {
  render: () => <DefaultForm />,
};

// ============================================================================
// Story: SimpleForm
// ============================================================================
function SimpleFormDemo() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Contact Information</Text>

      <Form onSubmit={handleSubmit}>
        <View style={styles.formRow}>
          <View style={styles.formRowField}>
            <FormField name="firstName">
              <FormLabel>First Name</FormLabel>
              <Input
                value={formData.firstName}
                onChangeText={handleChange('firstName')}
                placeholder="John"
              />
            </FormField>
          </View>
          <View style={styles.formRowField}>
            <FormField name="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input
                value={formData.lastName}
                onChangeText={handleChange('lastName')}
                placeholder="Doe"
              />
            </FormField>
          </View>
        </View>

        <View style={styles.spacer} />

        <FormField name="email">
          <FormLabel>Email</FormLabel>
          <Input
            value={formData.email}
            onChangeText={handleChange('email')}
            placeholder="john@example.com"
            keyboardType="email-address"
          />
          <FormDescription>We'll never share your email.</FormDescription>
        </FormField>

        <View style={styles.spacer} />

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Contact</Text>
        </Pressable>
      </Form>
    </View>
  );
}

export const SimpleForm: Story = {
  render: () => <SimpleFormDemo />,
};

// ============================================================================
// Story: WithValidation
// ============================================================================
function ValidationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (validate()) {
      console.log('Form valid, submitting:', formData);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Create Account</Text>

      <Form>
        <FormField name="username" error={errors.username} required>
          <FormLabel>Username</FormLabel>
          <Input
            value={formData.username}
            onChangeText={handleChange('username')}
            placeholder="johndoe"
            error={!!errors.username}
          />
          <FormMessage />
        </FormField>

        <View style={styles.spacer} />

        <FormField name="email" error={errors.email} required>
          <FormLabel>Email</FormLabel>
          <Input
            value={formData.email}
            onChangeText={handleChange('email')}
            placeholder="john@example.com"
            keyboardType="email-address"
            error={!!errors.email}
          />
          <FormMessage />
        </FormField>

        <View style={styles.spacer} />

        <FormField name="password" error={errors.password} required>
          <FormLabel>Password</FormLabel>
          <Input
            value={formData.password}
            onChangeText={handleChange('password')}
            placeholder="Enter password"
            secureTextEntry
            error={!!errors.password}
          />
          <FormDescription>Must be at least 8 characters</FormDescription>
          <FormMessage />
        </FormField>

        <View style={styles.spacer} />

        <FormField name="confirmPassword" error={errors.confirmPassword} required>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            value={formData.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            placeholder="Confirm password"
            secureTextEntry
            error={!!errors.confirmPassword}
          />
          <FormMessage />
        </FormField>

        <View style={styles.spacer} />

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Create Account</Text>
        </Pressable>
      </Form>
    </View>
  );
}

export const WithValidation: Story = {
  render: () => <ValidationForm />,
};

// ============================================================================
// Story: AllFieldTypes
// ============================================================================
function AllFieldTypesForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    bio: '',
    newsletter: false,
    notifications: true,
  });

  const countries = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
  ];

  const handleChange = (field: string) => (value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.wideFormContainer}>
      <Text style={styles.formTitle}>Profile Settings</Text>

      <Form>
        <FormField name="fullName">
          <FormLabel>Full Name</FormLabel>
          <Input
            value={formData.fullName}
            onChangeText={handleChange('fullName')}
            placeholder="Enter your full name"
          />
        </FormField>

        <View style={styles.spacer} />

        <FormField name="email">
          <FormLabel>Email Address</FormLabel>
          <Input
            value={formData.email}
            onChangeText={handleChange('email')}
            placeholder="your@email.com"
            keyboardType="email-address"
          />
          <FormDescription>Your primary email address</FormDescription>
        </FormField>

        <View style={styles.spacer} />

        <FormField name="country">
          <FormLabel>Country</FormLabel>
          <Select
            value={formData.country}
            onValueChange={handleChange('country')}
            options={countries}
            placeholder="Select your country"
          />
        </FormField>

        <View style={styles.spacer} />

        <FormField name="bio">
          <FormLabel>Bio</FormLabel>
          <Textarea
            value={formData.bio}
            onChangeText={handleChange('bio')}
            placeholder="Tell us about yourself..."
          />
          <FormDescription>Brief description for your profile</FormDescription>
        </FormField>

        <View style={styles.spacer} />

        <View style={styles.checkboxRow}>
          <Checkbox
            checked={formData.newsletter}
            onCheckedChange={handleChange('newsletter')}
          />
          <View style={styles.checkboxContent}>
            <Text style={styles.checkboxLabel}>Subscribe to newsletter</Text>
            <Text style={styles.checkboxDescription}>
              Get updates about new features and promotions
            </Text>
          </View>
        </View>

        <View style={styles.spacer} />

        <View style={styles.switchRow}>
          <View style={styles.switchContent}>
            <Text style={styles.switchLabel}>Push Notifications</Text>
            <Text style={styles.switchDescription}>
              Receive push notifications on your device
            </Text>
          </View>
          <Switch
            checked={formData.notifications}
            onCheckedChange={handleChange('notifications')}
          />
        </View>

        <View style={styles.spacer} />

        <Pressable style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Save Settings</Text>
        </Pressable>
      </Form>
    </View>
  );
}

export const AllFieldTypes: Story = {
  render: () => <AllFieldTypesForm />,
};

// ============================================================================
// Story: FormSubmission
// ============================================================================
function FormSubmissionDemo() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>✓</Text>
        <Text style={styles.successTitle}>Message Sent!</Text>
        <Text style={styles.successText}>
          Thank you for your message. We'll get back to you soon.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Contact Us</Text>

      <Form disabled={isSubmitting}>
        <FormField name="name" required>
          <FormLabel>Name</FormLabel>
          <Input
            value={formData.name}
            onChangeText={handleChange('name')}
            placeholder="Your name"
          />
        </FormField>

        <View style={styles.spacer} />

        <FormField name="email" required>
          <FormLabel>Email</FormLabel>
          <Input
            value={formData.email}
            onChangeText={handleChange('email')}
            placeholder="your@email.com"
            keyboardType="email-address"
          />
        </FormField>

        <View style={styles.spacer} />

        <FormField name="message" required>
          <FormLabel>Message</FormLabel>
          <Textarea
            value={formData.message}
            onChangeText={handleChange('message')}
            placeholder="Your message..."
          />
        </FormField>

        <View style={styles.spacer} />

        <Pressable
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Text>
        </Pressable>
      </Form>
    </View>
  );
}

export const FormSubmission: Story = {
  render: () => <FormSubmissionDemo />,
};

// ============================================================================
// Story: ResetFunctionality
// ============================================================================
function ResetForm() {
  const initialData = {
    title: '',
    description: '',
    category: '',
    priority: 'medium',
  };

  const [formData, setFormData] = useState(initialData);
  const [isDirty, setIsDirty] = useState(false);

  const categories = [
    { label: 'Bug Report', value: 'bug' },
    { label: 'Feature Request', value: 'feature' },
    { label: 'Support', value: 'support' },
    { label: 'Other', value: 'other' },
  ];

  const handleChange = (field: string) => (value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleReset = () => {
    setFormData(initialData);
    setIsDirty(false);
  };

  const handleSubmit = () => {
    console.log('Submitted:', formData);
    setIsDirty(false);
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <Text style={styles.formTitle}>Create Ticket</Text>
        {isDirty && (
          <View style={styles.dirtyBadge}>
            <Text style={styles.dirtyBadgeText}>Unsaved changes</Text>
          </View>
        )}
      </View>

      <Form>
        <FormField name="title" required>
          <FormLabel>Title</FormLabel>
          <Input
            value={formData.title}
            onChangeText={handleChange('title')}
            placeholder="Brief description of the issue"
          />
        </FormField>

        <View style={styles.spacer} />

        <FormField name="category" required>
          <FormLabel>Category</FormLabel>
          <Select
            value={formData.category}
            onValueChange={handleChange('category')}
            options={categories}
            placeholder="Select category"
          />
        </FormField>

        <View style={styles.spacer} />

        <FormField name="description">
          <FormLabel>Description</FormLabel>
          <Textarea
            value={formData.description}
            onChangeText={handleChange('description')}
            placeholder="Detailed description..."
          />
        </FormField>

        <View style={styles.spacer} />

        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.resetButton, !isDirty && styles.buttonDisabled]}
            onPress={handleReset}
            disabled={!isDirty}
          >
            <Text style={[styles.resetButtonText, !isDirty && styles.textDisabled]}>
              Reset Form
            </Text>
          </Pressable>

          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Ticket</Text>
          </Pressable>
        </View>
      </Form>
    </View>
  );
}

export const ResetFunctionality: Story = {
  render: () => <ResetForm />,
};

// ============================================================================
// Story: DisabledForm
// ============================================================================
function DisabledFormDemo() {
  const [formData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    department: 'engineering',
  });

  const departments = [
    { label: 'Engineering', value: 'engineering' },
    { label: 'Design', value: 'design' },
    { label: 'Marketing', value: 'marketing' },
  ];

  return (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <Text style={styles.formTitle}>Employee Profile</Text>
        <View style={styles.lockedBadge}>
          <Text style={styles.lockedBadgeText}>Locked</Text>
        </View>
      </View>

      <Form disabled>
        <FormField name="name">
          <FormLabel>Name</FormLabel>
          <Input value={formData.name} placeholder="..." />
        </FormField>

        <View style={styles.spacer} />

        <FormField name="email">
          <FormLabel>Email</FormLabel>
          <Input value={formData.email} placeholder="..." />
        </FormField>

        <View style={styles.spacer} />

        <FormField name="department">
          <FormLabel>Department</FormLabel>
          <Select
            value={formData.department}
            options={departments}
            placeholder="..."
          />
        </FormField>

        <View style={styles.spacer} />

        <Pressable style={[styles.submitButton, styles.submitButtonDisabled]} disabled>
          <Text style={styles.submitButtonText}>Save Changes</Text>
        </Pressable>
      </Form>

      <Text style={styles.hint}>
        This form is disabled. Contact admin to make changes.
      </Text>
    </View>
  );
}

export const DisabledForm: Story = {
  render: () => <DisabledFormDemo />,
};

// ============================================================================
// Story: LoadingState
// ============================================================================
function LoadingStateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ query: '' });

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Search</Text>

      <Form disabled={isLoading}>
        <FormField name="query">
          <FormLabel>Search Query</FormLabel>
          <Input
            value={formData.query}
            onChangeText={(v) => setFormData({ query: v })}
            placeholder="Enter search terms..."
          />
        </FormField>

        <View style={styles.spacer} />

        <Pressable
          style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
          onPress={handleSearch}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Searching...' : 'Search'}
          </Text>
        </Pressable>
      </Form>

      {isLoading && (
        <View style={styles.loadingIndicator}>
          <Text style={styles.loadingText}>Loading results...</Text>
        </View>
      )}
    </View>
  );
}

export const LoadingState: Story = {
  render: () => <LoadingStateForm />,
};

// ============================================================================
// Story: AccessibilityDemo
// ============================================================================
function AccessibilityForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.accessibilityInfo}>
        <Text style={styles.accessibilityTitle}>Accessibility Features</Text>
        <Text style={styles.accessibilityText}>
          Form fields include proper labels, descriptions, and error messages with ARIA support for screen readers.
        </Text>
      </View>

      <Form>
        <FormField name="name" required>
          <FormLabel>Full Name</FormLabel>
          <Input
            value={formData.name}
            onChangeText={handleChange('name')}
            placeholder="Enter your full name"
          />
          <FormDescription>
            Your name as it appears on official documents
          </FormDescription>
          <FormMessage />
        </FormField>

        <View style={styles.spacer} />

        <FormField name="email" required>
          <FormLabel>Email Address</FormLabel>
          <Input
            value={formData.email}
            onChangeText={handleChange('email')}
            placeholder="you@example.com"
            keyboardType="email-address"
          />
          <FormDescription>
            We'll use this to contact you
          </FormDescription>
          <FormMessage />
        </FormField>

        <View style={styles.spacer} />

        <Pressable style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>
      </Form>

      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsTitle}>Form Accessibility</Text>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Tab</Text>
          <Text style={styles.instructionText}>Navigate between fields</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Enter</Text>
          <Text style={styles.instructionText}>Submit form</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Labels</Text>
          <Text style={styles.instructionText}>Linked to inputs</Text>
        </View>
      </View>
    </View>
  );
}

export const AccessibilityDemo: Story = {
  render: () => <AccessibilityForm />,
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    width: 400,
    padding: 24,
    gap: 16,
  },
  formContainer: {
    width: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 4,
  },
  wideFormContainer: {
    width: 500,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 4,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formRowField: {
    flex: 1,
  },
  spacer: {
    height: 16,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkboxContent: {
    flex: 1,
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  checkboxDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchContent: {
    flex: 1,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  switchDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  textDisabled: {
    color: '#999',
  },
  successContainer: {
    width: 400,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 32,
    borderWidth: 1,
    borderColor: '#86efac',
    alignItems: 'center',
    gap: 8,
  },
  successIcon: {
    fontSize: 48,
    color: '#22c55e',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#166534',
  },
  successText: {
    fontSize: 14,
    color: '#166534',
    textAlign: 'center',
  },
  dirtyBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dirtyBadgeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#92400e',
  },
  lockedBadge: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  lockedBadgeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#b91c1c',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  loadingIndicator: {
    padding: 16,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
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
    marginTop: 8,
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
    minWidth: 60,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 13,
    color: '#1e40af',
  },
});
