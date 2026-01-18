import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@r-ui/react-native';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
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
    rows: {
      control: 'number',
    },
    maxLength: {
      control: 'number',
    },
    showCount: {
      control: 'boolean',
    },
    autoGrow: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// ============================================================================
// Story: Default
// ============================================================================
function DefaultTextarea() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Textarea
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
}

export const Default: Story = {
  render: () => <DefaultTextarea />,
};

// ============================================================================
// Story: WithPlaceholder
// ============================================================================
function WithPlaceholderTextarea() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Textarea
        value={value}
        onChangeText={setValue}
        placeholder="Enter your message here..."
      />
    </View>
  );
}

export const WithPlaceholder: Story = {
  render: () => <WithPlaceholderTextarea />,
};

// ============================================================================
// Story: Disabled
// ============================================================================
export const Disabled: Story = {
  render: () => (
    <View style={styles.container}>
      <Textarea
        value="This textarea is disabled and cannot be edited."
        disabled
        label="Disabled Textarea"
      />
    </View>
  ),
};

// ============================================================================
// Story: WithValue
// ============================================================================
function WithValueTextarea() {
  const [value, setValue] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  );

  return (
    <View style={styles.container}>
      <Textarea
        value={value}
        onChangeText={setValue}
        label="Pre-filled Content"
      />
    </View>
  );
}

export const WithValue: Story = {
  render: () => <WithValueTextarea />,
};

// ============================================================================
// Story: MaxLength
// ============================================================================
function MaxLengthTextarea() {
  const [value, setValue] = useState('');
  const maxLength = 280;

  return (
    <View style={styles.container}>
      <Textarea
        value={value}
        onChangeText={setValue}
        placeholder="What's happening?"
        maxLength={maxLength}
        showCount
        label="Tweet"
        helperText={`${maxLength - value.length} characters remaining`}
      />
    </View>
  );
}

export const MaxLength: Story = {
  render: () => <MaxLengthTextarea />,
};

// ============================================================================
// Story: AutoResize
// ============================================================================
function AutoResizeTextarea() {
  const [value, setValue] = useState('Start typing and watch me grow...');

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>
        This textarea grows as you type (up to 10 rows)
      </Text>
      <Textarea
        value={value}
        onChangeText={setValue}
        placeholder="Type here..."
        autoGrow
        rows={2}
        maxRows={10}
        label="Auto-growing Textarea"
      />
    </View>
  );
}

export const AutoResize: Story = {
  render: () => <AutoResizeTextarea />,
};

// ============================================================================
// Story: Comment
// ============================================================================
function CommentTextarea() {
  const [value, setValue] = useState('');
  const [comments, setComments] = useState([
    { id: 1, author: 'Alice', text: 'Great article! Very informative.', time: '2 hours ago' },
    { id: 2, author: 'Bob', text: 'Thanks for sharing this.', time: '1 hour ago' },
  ]);

  const handleSubmit = () => {
    if (value.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), author: 'You', text: value, time: 'Just now' },
      ]);
      setValue('');
    }
  };

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentTitle}>Comments ({comments.length})</Text>

      <View style={styles.commentList}>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.commentItem}>
            <View style={styles.commentAvatar}>
              <Text style={styles.commentAvatarText}>
                {comment.author[0]}
              </Text>
            </View>
            <View style={styles.commentContent}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>{comment.author}</Text>
                <Text style={styles.commentTime}>{comment.time}</Text>
              </View>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.commentInput}>
        <Textarea
          value={value}
          onChangeText={setValue}
          placeholder="Write a comment..."
          rows={2}
          autoGrow
          maxRows={5}
        />
        <Pressable
          style={[styles.commentButton, !value.trim() && styles.commentButtonDisabled]}
          onPress={handleSubmit}
          disabled={!value.trim()}
        >
          <Text style={[styles.commentButtonText, !value.trim() && styles.commentButtonTextDisabled]}>
            Post
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export const Comment: Story = {
  render: () => <CommentTextarea />,
};

// ============================================================================
// Story: Description
// ============================================================================
function DescriptionTextarea() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>Add New Product</Text>

      <View style={styles.productField}>
        <Text style={styles.productLabel}>Product Name</Text>
        <View style={styles.productInput}>
          <Text style={styles.productInputText}>Wireless Bluetooth Headphones</Text>
        </View>
      </View>

      <View style={styles.productField}>
        <Text style={styles.productLabel}>Price</Text>
        <View style={styles.productInput}>
          <Text style={styles.productInputText}>$79.99</Text>
        </View>
      </View>

      <Textarea
        value={value}
        onChangeText={setValue}
        label="Product Description"
        placeholder="Describe your product in detail. Include key features, specifications, and what makes it unique..."
        rows={6}
        maxLength={500}
        showCount
        helperText="Write a compelling description to attract buyers"
      />

      <Pressable style={styles.productButton}>
        <Text style={styles.productButtonText}>Save Product</Text>
      </Pressable>
    </View>
  );
}

export const Description: Story = {
  render: () => <DescriptionTextarea />,
};

// ============================================================================
// Story: CodeInput
// ============================================================================
function CodeInputTextarea() {
  const [value, setValue] = useState(`{
  "name": "r-ui",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "react-native": "^0.72.0"
  }
}`);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(value);
      setValue(JSON.stringify(parsed, null, 2));
    } catch {
      // Invalid JSON, do nothing
    }
  };

  const isValidJSON = () => {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <View style={styles.codeContainer}>
      <View style={styles.codeHeader}>
        <Text style={styles.codeTitle}>JSON Editor</Text>
        <View style={styles.codeActions}>
          <Pressable style={styles.codeAction} onPress={formatJSON}>
            <Text style={styles.codeActionText}>Format</Text>
          </Pressable>
          <Pressable style={styles.codeAction} onPress={() => setValue('')}>
            <Text style={styles.codeActionText}>Clear</Text>
          </Pressable>
        </View>
      </View>

      <Textarea
        value={value}
        onChangeText={setValue}
        placeholder="Paste your JSON here..."
        rows={10}
        inputStyle={styles.codeInputStyle}
      />

      <View style={[styles.codeStatus, isValidJSON() ? styles.codeStatusValid : styles.codeStatusInvalid]}>
        <Text style={styles.codeStatusText}>
          {isValidJSON() ? '✓ Valid JSON' : '✗ Invalid JSON'}
        </Text>
      </View>
    </View>
  );
}

export const CodeInput: Story = {
  render: () => <CodeInputTextarea />,
};

// ============================================================================
// Story: FormValidation
// ============================================================================
function FormValidationTextarea() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const minLength = 50;
  const hasError = submitted && value.length < minLength;

  const handleSubmit = () => {
    setSubmitted(true);
    if (value.length >= minLength) {
      // Form would submit
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Contact Us</Text>
      <Text style={styles.formDescription}>
        Please describe your issue in detail so we can help you better.
      </Text>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Email</Text>
        <View style={styles.formInput}>
          <Text style={styles.formInputText}>user@example.com</Text>
        </View>
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Subject</Text>
        <View style={styles.formInput}>
          <Text style={styles.formInputText}>Technical Support Request</Text>
        </View>
      </View>

      <Textarea
        value={value}
        onChangeText={(text) => {
          setValue(text);
          if (text.length >= minLength) setSubmitted(false);
        }}
        label="Message"
        placeholder="Please describe your issue..."
        rows={5}
        showCount
        error={hasError}
        helperText={
          hasError
            ? `Please enter at least ${minLength} characters (${minLength - value.length} more needed)`
            : `Minimum ${minLength} characters required`
        }
      />

      <Pressable style={styles.formButton} onPress={handleSubmit}>
        <Text style={styles.formButtonText}>Submit Request</Text>
      </Pressable>
    </View>
  );
}

export const FormValidation: Story = {
  render: () => <FormValidationTextarea />,
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    width: 360,
    padding: 24,
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
    textAlign: 'center',
  },
  commentContainer: {
    width: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  commentList: {
    gap: 16,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  commentItem: {
    flexDirection: 'row',
    gap: 12,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  commentTime: {
    fontSize: 12,
    color: '#999',
  },
  commentText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  commentInput: {
    gap: 12,
  },
  commentButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  commentButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  commentButtonTextDisabled: {
    color: '#999',
  },
  productContainer: {
    width: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 16,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  productField: {
    gap: 6,
  },
  productLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  productInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  productInputText: {
    fontSize: 14,
    color: '#333',
  },
  productButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  productButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  codeContainer: {
    width: 450,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  codeActions: {
    flexDirection: 'row',
    gap: 8,
  },
  codeAction: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  codeActionText: {
    fontSize: 12,
    color: '#fff',
  },
  codeInputStyle: {
    fontFamily: 'monospace',
    fontSize: 13,
    backgroundColor: '#2d2d2d',
    color: '#d4d4d4',
  },
  codeStatus: {
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  codeStatusValid: {
    backgroundColor: '#1b4332',
  },
  codeStatusInvalid: {
    backgroundColor: '#5c1d1d',
  },
  codeStatusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
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
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  formDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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
});
