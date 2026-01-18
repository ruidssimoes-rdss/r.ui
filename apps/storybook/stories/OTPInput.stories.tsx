import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  OTPInput,
  OTPInputGroup,
  OTPInputSlot,
  OTPInputSeparator,
  Button,
} from '@r-ui/react-native';

const meta: Meta<typeof OTPInput> = {
  title: 'Components/OTPInput',
  component: OTPInput,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof OTPInput>;

export const Basic: Story = {
  render: function BasicStory() {
    const [code, setCode] = useState('');

    return (
      <View style={styles.container}>
        <OTPInput
          length={6}
          value={code}
          onValueChange={setCode}
          onComplete={(value) => console.log('Complete:', value)}
        />
        <Text style={styles.value}>Value: {code || '(empty)'}</Text>
      </View>
    );
  },
};

export const FourDigits: Story = {
  render: function FourDigitsStory() {
    const [code, setCode] = useState('');

    return (
      <View style={styles.container}>
        <OTPInput
          length={4}
          value={code}
          onValueChange={setCode}
          onComplete={(value) => console.log('PIN:', value)}
        />
        <Text style={styles.value}>PIN: {code || '(empty)'}</Text>
      </View>
    );
  },
};

export const WithSeparator: Story = {
  render: function WithSeparatorStory() {
    const [code, setCode] = useState('');

    return (
      <View style={styles.container}>
        <OTPInput length={6} value={code} onValueChange={setCode}>
          <OTPInputGroup>
            <OTPInputSlot index={0} />
            <OTPInputSlot index={1} />
            <OTPInputSlot index={2} />
          </OTPInputGroup>
          <OTPInputSeparator />
          <OTPInputGroup>
            <OTPInputSlot index={3} />
            <OTPInputSlot index={4} />
            <OTPInputSlot index={5} />
          </OTPInputGroup>
        </OTPInput>
        <Text style={styles.value}>Value: {code || '(empty)'}</Text>
      </View>
    );
  },
};

export const TwoGroups: Story = {
  render: function TwoGroupsStory() {
    const [code, setCode] = useState('');

    return (
      <View style={styles.container}>
        <OTPInput length={6} value={code} onValueChange={setCode}>
          <OTPInputGroup>
            <OTPInputSlot index={0} />
            <OTPInputSlot index={1} />
          </OTPInputGroup>
          <OTPInputSeparator>·</OTPInputSeparator>
          <OTPInputGroup>
            <OTPInputSlot index={2} />
            <OTPInputSlot index={3} />
          </OTPInputGroup>
          <OTPInputSeparator>·</OTPInputSeparator>
          <OTPInputGroup>
            <OTPInputSlot index={4} />
            <OTPInputSlot index={5} />
          </OTPInputGroup>
        </OTPInput>
        <Text style={styles.value}>Value: {code || '(empty)'}</Text>
      </View>
    );
  },
};

export const Prefilled: Story = {
  render: function PrefilledStory() {
    const [code, setCode] = useState('123456');

    return (
      <View style={styles.container}>
        <OTPInput
          length={6}
          value={code}
          onValueChange={setCode}
        />
        <Text style={styles.value}>Value: {code}</Text>
      </View>
    );
  },
};

export const ErrorState: Story = {
  render: function ErrorStateStory() {
    const [code, setCode] = useState('123456');
    const [error, setError] = useState(true);

    return (
      <View style={styles.container}>
        <OTPInput
          length={6}
          value={code}
          onValueChange={(value) => {
            setCode(value);
            setError(false);
          }}
          error={error}
        />
        <Text style={[styles.value, error && styles.errorText]}>
          {error ? 'Invalid code. Please try again.' : `Value: ${code}`}
        </Text>
        <Button
          variant="ghost"
          size="sm"
          onPress={() => {
            setCode('');
            setError(false);
          }}
        >
          Clear
        </Button>
      </View>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <View style={styles.container}>
      <OTPInput
        length={6}
        value="123456"
        disabled
      />
      <Text style={styles.value}>Disabled state</Text>
    </View>
  ),
};

export const VerificationFlow: Story = {
  render: function VerificationFlowStory() {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');

    const handleComplete = (value: string) => {
      setStatus('verifying');

      // Simulate API call
      setTimeout(() => {
        if (value === '123456') {
          setStatus('success');
        } else {
          setStatus('error');
        }
      }, 1500);
    };

    const handleRetry = () => {
      setCode('');
      setStatus('idle');
    };

    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.title}>Enter verification code</Text>
        <Text style={styles.subtitle}>
          We sent a code to your email. Enter it below.
        </Text>

        <View style={styles.inputWrapper}>
          <OTPInput
            length={6}
            value={code}
            onValueChange={setCode}
            onComplete={handleComplete}
            error={status === 'error'}
            disabled={status === 'verifying' || status === 'success'}
          />
        </View>

        {status === 'idle' && (
          <Text style={styles.hint}>
            Hint: Try 123456 for success
          </Text>
        )}

        {status === 'verifying' && (
          <Text style={styles.verifyingText}>Verifying...</Text>
        )}

        {status === 'success' && (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>Verified successfully!</Text>
          </View>
        )}

        {status === 'error' && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>Invalid code. Please try again.</Text>
            <Button size="sm" onPress={handleRetry}>
              Try Again
            </Button>
          </View>
        )}
      </View>
    );
  },
};

export const PhoneVerification: Story = {
  render: function PhoneVerificationStory() {
    const [code, setCode] = useState('');

    return (
      <View style={styles.phoneContainer}>
        <View style={styles.phoneIcon}>
          <Text style={styles.phoneEmoji}>📱</Text>
        </View>
        <Text style={styles.phoneTitle}>Verify your phone</Text>
        <Text style={styles.phoneSubtitle}>
          Enter the 4-digit code sent to{'\n'}+1 (555) ***-**89
        </Text>

        <View style={styles.inputWrapper}>
          <OTPInput
            length={4}
            value={code}
            onValueChange={setCode}
            onComplete={(value) => console.log('Phone verification:', value)}
          />
        </View>

        <Button variant="ghost" size="sm">
          Resend Code
        </Button>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
  },
  value: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  errorText: {
    color: '#ef4444',
  },
  verificationContainer: {
    alignItems: 'center',
    padding: 24,
    width: 360,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  hint: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
  },
  verifyingText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  successContainer: {
    alignItems: 'center',
    gap: 8,
  },
  successText: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    alignItems: 'center',
    gap: 12,
  },
  errorMessage: {
    color: '#ef4444',
    fontSize: 14,
  },
  phoneContainer: {
    alignItems: 'center',
    padding: 24,
    width: 320,
  },
  phoneIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  phoneEmoji: {
    fontSize: 28,
  },
  phoneTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  phoneSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
});
