import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@r-ui/react-native';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ============================================================================
// Story: Default
// ============================================================================
function DefaultCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <Text style={styles.stateText}>
        State: {checked ? 'Checked' : 'Unchecked'}
      </Text>
    </View>
  );
}

export const Default: Story = {
  render: () => <DefaultCheckbox />,
};

// ============================================================================
// Story: Checked
// ============================================================================
function CheckedCheckbox() {
  const [checked, setChecked] = useState(true);

  return (
    <View style={styles.container}>
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <Text style={styles.stateText}>
        State: {checked ? 'Checked' : 'Unchecked'}
      </Text>
    </View>
  );
}

export const Checked: Story = {
  render: () => <CheckedCheckbox />,
};

// ============================================================================
// Story: Disabled
// ============================================================================
export const Disabled: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.row}>
        <Checkbox checked={false} disabled />
        <Text style={styles.labelText}>Disabled unchecked</Text>
      </View>
      <View style={styles.row}>
        <Checkbox checked={true} disabled />
        <Text style={styles.labelText}>Disabled checked</Text>
      </View>
    </View>
  ),
};

// ============================================================================
// Story: WithLabel
// ============================================================================
function WithLabelCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        label="Remember me"
      />
    </View>
  );
}

export const WithLabel: Story = {
  render: () => <WithLabelCheckbox />,
};

// ============================================================================
// Story: WithDescription
// ============================================================================
function WithDescriptionCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.containerWide}>
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        label="Marketing emails"
        description="Receive emails about new products, features, and more."
      />
    </View>
  );
}

export const WithDescription: Story = {
  render: () => <WithDescriptionCheckbox />,
};

// ============================================================================
// Story: Indeterminate
// ============================================================================
function IndeterminateCheckbox() {
  const [state, setState] = useState<'none' | 'some' | 'all'>('some');

  const handleChange = () => {
    if (state === 'none') setState('all');
    else if (state === 'all') setState('none');
    else setState('all');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>
        Note: Indeterminate state is typically visual-only.
        This example shows the concept using custom styling.
      </Text>
      <View style={styles.indeterminateRow}>
        <Pressable onPress={handleChange} style={styles.indeterminateBox}>
          <View
            style={[
              styles.indeterminateIndicator,
              state === 'all' && styles.indeterminateChecked,
              state === 'some' && styles.indeterminateSome,
            ]}
          >
            {state === 'all' && <Text style={styles.checkmark}>✓</Text>}
            {state === 'some' && <Text style={styles.dash}>−</Text>}
          </View>
        </Pressable>
        <Text style={styles.labelText}>Select all items</Text>
      </View>
      <Text style={styles.stateText}>
        State: {state === 'none' ? 'None selected' : state === 'all' ? 'All selected' : 'Some selected'}
      </Text>
    </View>
  );
}

export const Indeterminate: Story = {
  render: () => <IndeterminateCheckbox />,
};

// ============================================================================
// Story: TermsAndConditions
// ============================================================================
function TermsCheckbox() {
  const [agreed, setAgreed] = useState(false);

  return (
    <View style={styles.containerWide}>
      <View style={styles.termsCard}>
        <Text style={styles.termsTitle}>Create Account</Text>
        <Text style={styles.termsText}>
          Please review and accept our terms before continuing.
        </Text>

        <Checkbox
          checked={agreed}
          onCheckedChange={setAgreed}
          label="I agree to the Terms of Service and Privacy Policy"
          description="You must agree to our terms to create an account."
        />

        <Pressable
          style={[styles.submitButton, !agreed && styles.submitButtonDisabled]}
          disabled={!agreed}
        >
          <Text style={[styles.submitButtonText, !agreed && styles.submitButtonTextDisabled]}>
            Create Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export const TermsAndConditions: Story = {
  render: () => <TermsCheckbox />,
};

// ============================================================================
// Story: TodoList
// ============================================================================
function TodoListCheckbox() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review pull request', done: true },
    { id: 2, text: 'Write unit tests', done: false },
    { id: 3, text: 'Update documentation', done: false },
    { id: 4, text: 'Deploy to staging', done: false },
    { id: 5, text: 'Send release notes', done: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const completedCount = todos.filter((t) => t.done).length;

  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoHeader}>
        <Text style={styles.todoTitle}>Today's Tasks</Text>
        <Text style={styles.todoCount}>
          {completedCount}/{todos.length} completed
        </Text>
      </View>

      <View style={styles.todoList}>
        {todos.map((todo) => (
          <View key={todo.id} style={styles.todoItem}>
            <Checkbox
              checked={todo.done}
              onCheckedChange={() => toggleTodo(todo.id)}
              label={todo.text}
            />
          </View>
        ))}
      </View>

      {completedCount === todos.length && (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>🎉 All tasks completed!</Text>
        </View>
      )}
    </View>
  );
}

export const TodoList: Story = {
  render: () => <TodoListCheckbox />,
};

// ============================================================================
// Story: SelectAll
// ============================================================================
function SelectAllCheckbox() {
  const [items, setItems] = useState([
    { id: 1, name: 'document.pdf', selected: false },
    { id: 2, name: 'image.png', selected: true },
    { id: 3, name: 'spreadsheet.xlsx', selected: false },
    { id: 4, name: 'presentation.pptx', selected: true },
  ]);

  const selectedCount = items.filter((i) => i.selected).length;
  const allSelected = selectedCount === items.length;
  const someSelected = selectedCount > 0 && !allSelected;

  const toggleAll = () => {
    const newState = !allSelected;
    setItems((prev) => prev.map((item) => ({ ...item, selected: newState })));
  };

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  return (
    <View style={styles.selectAllContainer}>
      <View style={styles.selectAllHeader}>
        <View style={styles.selectAllRow}>
          <Checkbox
            checked={allSelected}
            onCheckedChange={toggleAll}
            label={someSelected ? `${selectedCount} selected` : 'Select all'}
          />
        </View>
        {selectedCount > 0 && (
          <Pressable style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete ({selectedCount})</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.fileList}>
        {items.map((item) => (
          <View key={item.id} style={styles.fileItem}>
            <Checkbox
              checked={item.selected}
              onCheckedChange={() => toggleItem(item.id)}
            />
            <View style={styles.fileIcon}>
              <Text>📄</Text>
            </View>
            <Text style={styles.fileName}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export const SelectAll: Story = {
  render: () => <SelectAllCheckbox />,
};

// ============================================================================
// Story: FormValidation
// ============================================================================
function FormValidationCheckbox() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const hasError = submitted && !agreed;

  const handleSubmit = () => {
    setSubmitted(true);
    if (agreed) {
      // Form would submit
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Newsletter Signup</Text>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Email</Text>
        <View style={styles.formInput}>
          <Text style={styles.formInputText}>user@example.com</Text>
        </View>
      </View>

      <View style={[styles.checkboxField, hasError && styles.checkboxFieldError]}>
        <Checkbox
          checked={agreed}
          onCheckedChange={(checked) => {
            setAgreed(checked);
            if (checked) setSubmitted(false);
          }}
          label="I agree to receive marketing communications"
          description="We'll send you updates about our products and promotions."
        />
        {hasError && (
          <Text style={styles.errorText}>
            You must agree to receive our newsletter
          </Text>
        )}
      </View>

      <Pressable style={styles.formButton} onPress={handleSubmit}>
        <Text style={styles.formButtonText}>Subscribe</Text>
      </Pressable>
    </View>
  );
}

export const FormValidation: Story = {
  render: () => <FormValidationCheckbox />,
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    gap: 16,
  },
  containerWide: {
    width: 360,
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  labelText: {
    fontSize: 14,
    color: '#333',
  },
  stateText: {
    fontSize: 14,
    color: '#666',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 8,
    maxWidth: 280,
  },
  indeterminateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  indeterminateBox: {
    width: 20,
    height: 20,
  },
  indeterminateIndicator: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indeterminateChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  indeterminateSome: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  dash: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: -2,
  },
  termsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 16,
  },
  termsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonTextDisabled: {
    color: '#999',
  },
  todoContainer: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  todoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  todoCount: {
    fontSize: 14,
    color: '#666',
  },
  todoList: {
    gap: 12,
  },
  todoItem: {
    paddingVertical: 4,
  },
  successBanner: {
    backgroundColor: '#e8f5e9',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  successText: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  selectAllContainer: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectAllHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  selectAllRow: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#ef5350',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  fileList: {
    padding: 8,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 8,
    borderRadius: 6,
  },
  fileIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
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
    color: '#666',
  },
  checkboxField: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  checkboxFieldError: {
    backgroundColor: '#ffebee',
    borderWidth: 1,
    borderColor: '#ef5350',
  },
  errorText: {
    fontSize: 12,
    color: '#ef5350',
    marginTop: 8,
    marginLeft: 32,
  },
  formButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  formButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
