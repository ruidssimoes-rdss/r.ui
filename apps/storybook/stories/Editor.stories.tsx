import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Editor,
  EditorContent,
  EditorToolbar,
  EditorToolbarButton,
  BoldButton,
  ItalicButton,
  UnderlineButton,
  StrikethroughButton,
  CodeButton,
  HeadingButton,
  ListButton,
  QuoteButton,
  UndoButton,
  RedoButton,
  EditorToolbarSeparator,
  getCharacterCount,
  getWordCount,
} from '@r-ui/react-native';

const meta: Meta<typeof Editor> = {
  title: 'Components/Forms/Editor',
  component: Editor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A rich text editor component with formatting toolbar. Supports bold, italic, underline, headings, lists, and more. Includes undo/redo functionality.',
      },
    },
  },
  argTypes: {
    readOnly: {
      control: 'boolean',
      description: 'Read-only mode',
    },
    toolbar: {
      control: 'boolean',
      description: 'Show/hide toolbar',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Editor>;

// ============================================================================
// Story: Default
// ============================================================================
function DefaultEditor() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Editor value={value} onValueChange={setValue}>
        <EditorToolbar>
          <BoldButton />
          <ItalicButton />
          <UnderlineButton />
          <EditorToolbarSeparator />
          <HeadingButton />
          <ListButton />
          <QuoteButton />
          <EditorToolbarSeparator />
          <UndoButton />
          <RedoButton />
        </EditorToolbar>
        <EditorContent />
      </Editor>
    </View>
  );
}

export const Default: Story = {
  render: () => <DefaultEditor />,
};

// ============================================================================
// Story: WithPlaceholder
// ============================================================================
function WithPlaceholderEditor() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <Editor
        value={value}
        onValueChange={setValue}
        placeholder="Write a detailed description of your project..."
      >
        <EditorToolbar>
          <BoldButton />
          <ItalicButton />
          <UnderlineButton />
          <EditorToolbarSeparator />
          <HeadingButton />
          <ListButton />
          <EditorToolbarSeparator />
          <UndoButton />
          <RedoButton />
        </EditorToolbar>
        <EditorContent minLines={4} />
      </Editor>
      <Text style={styles.helperText}>
        Use the toolbar to format your text
      </Text>
    </View>
  );
}

export const WithPlaceholder: Story = {
  render: () => <WithPlaceholderEditor />,
};

// ============================================================================
// Story: WithInitialContent
// ============================================================================
function WithInitialContentEditor() {
  const initialContent = `Welcome to the Editor!

This is a sample document with some initial content. You can:

- Format text with bold, italic, and underline
- Create headings
- Add bullet or numbered lists
- Include quotes

Try editing this content to see how the editor works.`;

  const [value, setValue] = useState(initialContent);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Article Content</Text>
      <Editor value={value} onValueChange={setValue}>
        <EditorToolbar>
          <BoldButton />
          <ItalicButton />
          <UnderlineButton />
          <StrikethroughButton />
          <EditorToolbarSeparator />
          <HeadingButton />
          <ListButton />
          <QuoteButton />
          <CodeButton />
          <EditorToolbarSeparator />
          <UndoButton />
          <RedoButton />
        </EditorToolbar>
        <EditorContent minLines={8} />
      </Editor>
    </View>
  );
}

export const WithInitialContent: Story = {
  render: () => <WithInitialContentEditor />,
};

// ============================================================================
// Story: Controlled
// ============================================================================
function ControlledEditor() {
  const [value, setValue] = useState('');

  const templates = [
    { label: 'Meeting Notes', content: 'Meeting Date:\nAttendees:\n\nAgenda:\n1. \n2. \n3. \n\nAction Items:\n- ' },
    { label: 'Bug Report', content: 'Bug Description:\n\nSteps to Reproduce:\n1. \n2. \n3. \n\nExpected Behavior:\n\nActual Behavior:\n\nEnvironment:' },
    { label: 'Feature Request', content: 'Feature Title:\n\nDescription:\n\nUse Case:\n\nProposed Solution:\n\nAlternatives Considered:' },
  ];

  return (
    <View style={styles.controlledContainer}>
      <Text style={styles.formTitle}>Controlled Editor</Text>

      <View style={styles.quickSelect}>
        <Text style={styles.quickSelectLabel}>Templates:</Text>
        <View style={styles.quickSelectButtons}>
          {templates.map((template) => (
            <Pressable
              key={template.label}
              style={styles.quickSelectButton}
              onPress={() => setValue(template.content)}
            >
              <Text style={styles.quickSelectButtonText}>{template.label}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.clearButton} onPress={() => setValue('')}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </Pressable>
        </View>
      </View>

      <Editor value={value} onValueChange={setValue}>
        <EditorToolbar>
          <BoldButton />
          <ItalicButton />
          <UnderlineButton />
          <EditorToolbarSeparator />
          <HeadingButton />
          <ListButton />
          <EditorToolbarSeparator />
          <UndoButton />
          <RedoButton />
        </EditorToolbar>
        <EditorContent minLines={6} />
      </Editor>

      <View style={styles.statsRow}>
        <Text style={styles.statsText}>
          Characters: {getCharacterCount(value)}
        </Text>
        <Text style={styles.statsText}>
          Words: {getWordCount(value)}
        </Text>
      </View>
    </View>
  );
}

export const Controlled: Story = {
  render: () => <ControlledEditor />,
};

// ============================================================================
// Story: ReadOnly
// ============================================================================
export const ReadOnly: Story = {
  render: () => {
    const content = `This is a read-only editor.

The content cannot be modified by the user. This is useful for displaying formatted content that shouldn't be edited.

Key features:
- Toolbar is hidden automatically
- Text cannot be selected for editing
- Content is preserved exactly as provided`;

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Published Article (Read-Only)</Text>
        <Editor value={content} readOnly>
          <EditorToolbar>
            <BoldButton />
            <ItalicButton />
          </EditorToolbar>
          <EditorContent minLines={6} />
        </Editor>
        <Text style={styles.hint}>This editor is in read-only mode</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: MinimalToolbar
// ============================================================================
function MinimalToolbarEditor() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Quick Note</Text>
      <Editor value={value} onValueChange={setValue} placeholder="Write a quick note...">
        <EditorToolbar>
          <BoldButton />
          <ItalicButton />
          <ListButton />
        </EditorToolbar>
        <EditorContent minLines={3} />
      </Editor>
      <Text style={styles.helperText}>
        Minimal toolbar with just bold, italic, and lists
      </Text>
    </View>
  );
}

export const MinimalToolbar: Story = {
  render: () => <MinimalToolbarEditor />,
};

// ============================================================================
// Story: FullToolbar
// ============================================================================
function FullToolbarEditor() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.wideContainer}>
      <Text style={styles.label}>Full-Featured Editor</Text>
      <Editor value={value} onValueChange={setValue} placeholder="Start writing...">
        <EditorToolbar>
          <UndoButton />
          <RedoButton />
          <EditorToolbarSeparator />
          <BoldButton />
          <ItalicButton />
          <UnderlineButton />
          <StrikethroughButton />
          <EditorToolbarSeparator />
          <HeadingButton />
          <QuoteButton />
          <CodeButton />
          <EditorToolbarSeparator />
          <ListButton />
        </EditorToolbar>
        <EditorContent minLines={8} />
      </Editor>
      <Text style={styles.helperText}>
        Full toolbar with all formatting options
      </Text>
    </View>
  );
}

export const FullToolbar: Story = {
  render: () => <FullToolbarEditor />,
};

// ============================================================================
// Story: NoToolbar
// ============================================================================
function NoToolbarEditor() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Plain Text Input</Text>
      <Editor
        value={value}
        onValueChange={setValue}
        toolbar={false}
        placeholder="Enter plain text..."
      >
        <EditorToolbar>
          <BoldButton />
        </EditorToolbar>
        <EditorContent minLines={4} />
      </Editor>
      <Text style={styles.helperText}>
        Toolbar is hidden - plain text only
      </Text>
    </View>
  );
}

export const NoToolbar: Story = {
  render: () => <NoToolbarEditor />,
};

// ============================================================================
// Story: CharacterWordCount
// ============================================================================
function CharacterWordCountEditor() {
  const [value, setValue] = useState('');
  const maxChars = 500;

  const charCount = getCharacterCount(value);
  const wordCount = getWordCount(value);
  const isOverLimit = charCount > maxChars;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bio (max {maxChars} characters)</Text>
      <Editor value={value} onValueChange={setValue} placeholder="Write your bio...">
        <EditorToolbar>
          <BoldButton />
          <ItalicButton />
          <EditorToolbarSeparator />
          <ListButton />
        </EditorToolbar>
        <EditorContent minLines={4} />
      </Editor>
      <View style={styles.countContainer}>
        <View style={styles.countRow}>
          <Text style={[styles.countText, isOverLimit && styles.countTextError]}>
            {charCount} / {maxChars} characters
          </Text>
          <Text style={styles.countText}>
            {wordCount} words
          </Text>
        </View>
        {isOverLimit && (
          <Text style={styles.errorText}>
            Character limit exceeded
          </Text>
        )}
      </View>
    </View>
  );
}

export const CharacterWordCount: Story = {
  render: () => <CharacterWordCountEditor />,
};

// ============================================================================
// Story: ErrorState
// ============================================================================
function ErrorStateEditor() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const hasError = submitted && !value.trim();

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Article Submission</Text>

      <View style={styles.fieldContainer}>
        <Text style={[styles.label, hasError && styles.labelError]}>
          Content <Text style={styles.required}>*</Text>
        </Text>
        <View style={[styles.editorWrapper, hasError && styles.editorWrapperError]}>
          <Editor
            value={value}
            onValueChange={(val) => {
              setValue(val);
              if (val.trim()) setSubmitted(false);
            }}
            placeholder="Write your article content..."
          >
            <EditorToolbar>
              <BoldButton />
              <ItalicButton />
              <UnderlineButton />
              <EditorToolbarSeparator />
              <HeadingButton />
              <ListButton />
              <QuoteButton />
              <EditorToolbarSeparator />
              <UndoButton />
              <RedoButton />
            </EditorToolbar>
            <EditorContent minLines={6} />
          </Editor>
        </View>
        {hasError && (
          <Text style={styles.errorText}>Article content is required</Text>
        )}
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Article</Text>
      </Pressable>
    </View>
  );
}

export const ErrorState: Story = {
  render: () => <ErrorStateEditor />,
};

// ============================================================================
// Story: Disabled
// ============================================================================
export const Disabled: Story = {
  render: () => {
    const content = 'This content is locked and cannot be edited.';

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Locked Content</Text>
        <View style={styles.disabledWrapper}>
          <Editor value={content} readOnly>
            <EditorToolbar>
              <BoldButton />
              <ItalicButton />
            </EditorToolbar>
            <EditorContent minLines={3} />
          </Editor>
        </View>
        <Text style={styles.hint}>This editor is disabled</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: BlogPostEditor
// ============================================================================
function BlogPostEditorDemo() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <View style={styles.blogContainer}>
      <Text style={styles.formTitle}>Create Blog Post</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Title</Text>
        <View style={styles.titleInput}>
          <Text style={styles.titleInputPlaceholder}>
            {title || 'Enter post title...'}
          </Text>
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Content</Text>
        <Editor
          value={content}
          onValueChange={setContent}
          placeholder="Write your blog post content here..."
        >
          <EditorToolbar>
            <UndoButton />
            <RedoButton />
            <EditorToolbarSeparator />
            <BoldButton />
            <ItalicButton />
            <UnderlineButton />
            <StrikethroughButton />
            <EditorToolbarSeparator />
            <HeadingButton />
            <QuoteButton />
            <CodeButton />
            <EditorToolbarSeparator />
            <ListButton />
          </EditorToolbar>
          <EditorContent minLines={10} />
        </Editor>
      </View>

      <View style={styles.blogFooter}>
        <View style={styles.blogStats}>
          <Text style={styles.blogStatsText}>
            {getWordCount(content)} words
          </Text>
          <Text style={styles.blogStatsText}>
            ~{Math.ceil(getWordCount(content) / 200)} min read
          </Text>
        </View>
        <View style={styles.blogActions}>
          <Pressable style={styles.saveDraftButton}>
            <Text style={styles.saveDraftButtonText}>Save Draft</Text>
          </Pressable>
          <Pressable style={styles.publishButton}>
            <Text style={styles.publishButtonText}>Publish</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export const BlogPostEditor: Story = {
  render: () => <BlogPostEditorDemo />,
};

// ============================================================================
// Story: AccessibilityDemo
// ============================================================================
function AccessibilityEditor() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.accessibilityInfo}>
        <Text style={styles.accessibilityTitle}>Accessibility Features</Text>
        <Text style={styles.accessibilityText}>
          The editor includes keyboard shortcuts for formatting and proper ARIA labels for screen readers.
        </Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text nativeID="editor-label" style={styles.label}>
          Compose Message
        </Text>
        <Editor
          value={value}
          onValueChange={setValue}
          placeholder="Type your message..."
        >
          <EditorToolbar>
            <BoldButton />
            <ItalicButton />
            <UnderlineButton />
            <EditorToolbarSeparator />
            <ListButton />
            <EditorToolbarSeparator />
            <UndoButton />
            <RedoButton />
          </EditorToolbar>
          <EditorContent minLines={5} />
        </Editor>
        <Text nativeID="editor-description" style={styles.helperText}>
          Use toolbar buttons to format text
        </Text>
      </View>

      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsTitle}>Toolbar Buttons</Text>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>B</Text>
          <Text style={styles.instructionText}>Bold text</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>I</Text>
          <Text style={styles.instructionText}>Italic text</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>U</Text>
          <Text style={styles.instructionText}>Underline text</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>H</Text>
          <Text style={styles.instructionText}>Cycle headings (H1/H2/H3)</Text>
        </View>
      </View>
    </View>
  );
}

export const AccessibilityDemo: Story = {
  render: () => <AccessibilityEditor />,
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
  wideContainer: {
    width: 500,
    padding: 24,
    gap: 16,
  },
  controlledContainer: {
    width: 450,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 16,
  },
  formContainer: {
    width: 450,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 16,
  },
  blogContainer: {
    width: 600,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 20,
  },
  fieldContainer: {
    gap: 6,
  },
  editorWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  editorWrapperError: {
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  disabledWrapper: {
    opacity: 0.6,
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  statsText: {
    fontSize: 12,
    color: '#666',
  },
  countContainer: {
    gap: 4,
  },
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countText: {
    fontSize: 12,
    color: '#666',
  },
  countTextError: {
    color: '#ef4444',
    fontWeight: '500',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  titleInputPlaceholder: {
    fontSize: 14,
    color: '#999',
  },
  blogFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  blogStats: {
    flexDirection: 'row',
    gap: 16,
  },
  blogStatsText: {
    fontSize: 13,
    color: '#666',
  },
  blogActions: {
    flexDirection: 'row',
    gap: 12,
  },
  saveDraftButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  saveDraftButtonText: {
    fontSize: 14,
    color: '#333',
  },
  publishButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  publishButtonText: {
    fontSize: 14,
    color: '#fff',
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
    minWidth: 30,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 13,
    color: '#1e40af',
  },
});
