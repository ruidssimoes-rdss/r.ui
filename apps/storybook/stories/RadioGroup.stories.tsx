import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem, RadioGroupLabel } from '@r-ui/react-native';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// ============================================================================
// Story: Default
// ============================================================================
function DefaultRadioGroup() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioGroupItem value="option1">Option 1</RadioGroupItem>
        <RadioGroupItem value="option2">Option 2</RadioGroupItem>
        <RadioGroupItem value="option3">Option 3</RadioGroupItem>
      </RadioGroup>
      <Text style={styles.stateText}>
        Selected: {value || 'None'}
      </Text>
    </View>
  );
}

export const Default: Story = {
  render: () => <DefaultRadioGroup />,
};

// ============================================================================
// Story: DefaultValue
// ============================================================================
function DefaultValueRadioGroup() {
  const [value, setValue] = useState('option2');

  return (
    <View style={styles.container}>
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioGroupItem value="option1">First option</RadioGroupItem>
        <RadioGroupItem value="option2">Second option (default)</RadioGroupItem>
        <RadioGroupItem value="option3">Third option</RadioGroupItem>
      </RadioGroup>
      <Text style={styles.stateText}>
        Selected: {value}
      </Text>
    </View>
  );
}

export const DefaultValue: Story = {
  render: () => <DefaultValueRadioGroup />,
};

// ============================================================================
// Story: Disabled
// ============================================================================
export const Disabled: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Entire group disabled</Text>
      <RadioGroup defaultValue="option1" disabled>
        <RadioGroupItem value="option1">Selected option</RadioGroupItem>
        <RadioGroupItem value="option2">Another option</RadioGroupItem>
        <RadioGroupItem value="option3">Third option</RadioGroupItem>
      </RadioGroup>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Individual item disabled</Text>
      <RadioGroup defaultValue="option1">
        <RadioGroupItem value="option1">Available option</RadioGroupItem>
        <RadioGroupItem value="option2" disabled>Disabled option</RadioGroupItem>
        <RadioGroupItem value="option3">Another available option</RadioGroupItem>
      </RadioGroup>
    </View>
  ),
};

// ============================================================================
// Story: Horizontal
// ============================================================================
function HorizontalRadioGroup() {
  const [value, setValue] = useState('medium');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Size</Text>
      <RadioGroup value={value} onValueChange={setValue} orientation="horizontal">
        <RadioGroupItem value="small">Small</RadioGroupItem>
        <RadioGroupItem value="medium">Medium</RadioGroupItem>
        <RadioGroupItem value="large">Large</RadioGroupItem>
      </RadioGroup>
    </View>
  );
}

export const Horizontal: Story = {
  render: () => <HorizontalRadioGroup />,
};

// ============================================================================
// Story: Vertical
// ============================================================================
function VerticalRadioGroup() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose your preference</Text>
      <RadioGroup value={value} onValueChange={setValue} orientation="vertical">
        <RadioGroupItem value="email">Email notifications</RadioGroupItem>
        <RadioGroupItem value="sms">SMS notifications</RadioGroupItem>
        <RadioGroupItem value="push">Push notifications</RadioGroupItem>
        <RadioGroupItem value="none">No notifications</RadioGroupItem>
      </RadioGroup>
    </View>
  );
}

export const Vertical: Story = {
  render: () => <VerticalRadioGroup />,
};

// ============================================================================
// Story: WithDescriptions
// ============================================================================
function WithDescriptionsRadioGroup() {
  const [value, setValue] = useState('comfort');

  return (
    <View style={styles.containerWide}>
      <Text style={styles.formTitle}>Delivery Speed</Text>
      <RadioGroup value={value} onValueChange={setValue}>
        <View style={styles.optionCard}>
          <RadioGroupItem value="comfort">
            <View style={styles.optionContent}>
              <RadioGroupLabel>Comfort</RadioGroupLabel>
              <Text style={styles.optionDescription}>
                Delivery within 5-7 business days. Most affordable option.
              </Text>
            </View>
          </RadioGroupItem>
        </View>

        <View style={styles.optionCard}>
          <RadioGroupItem value="standard">
            <View style={styles.optionContent}>
              <RadioGroupLabel>Standard</RadioGroupLabel>
              <Text style={styles.optionDescription}>
                Delivery within 3-5 business days. Balanced speed and price.
              </Text>
            </View>
          </RadioGroupItem>
        </View>

        <View style={styles.optionCard}>
          <RadioGroupItem value="express">
            <View style={styles.optionContent}>
              <RadioGroupLabel>Express</RadioGroupLabel>
              <Text style={styles.optionDescription}>
                Delivery within 1-2 business days. Fastest option available.
              </Text>
            </View>
          </RadioGroupItem>
        </View>
      </RadioGroup>
    </View>
  );
}

export const WithDescriptions: Story = {
  render: () => <WithDescriptionsRadioGroup />,
};

// ============================================================================
// Story: PaymentMethod
// ============================================================================
function PaymentMethodRadioGroup() {
  const [value, setValue] = useState('card');

  return (
    <View style={styles.paymentContainer}>
      <Text style={styles.formTitle}>Payment Method</Text>
      <RadioGroup value={value} onValueChange={setValue}>
        <View style={[styles.paymentOption, value === 'card' && styles.paymentOptionSelected]}>
          <RadioGroupItem value="card">
            <View style={styles.paymentContent}>
              <Text style={styles.paymentIcon}>💳</Text>
              <View style={styles.paymentInfo}>
                <RadioGroupLabel>Credit Card</RadioGroupLabel>
                <Text style={styles.paymentDescription}>Visa, Mastercard, Amex</Text>
              </View>
            </View>
          </RadioGroupItem>
        </View>

        <View style={[styles.paymentOption, value === 'paypal' && styles.paymentOptionSelected]}>
          <RadioGroupItem value="paypal">
            <View style={styles.paymentContent}>
              <Text style={styles.paymentIcon}>🅿️</Text>
              <View style={styles.paymentInfo}>
                <RadioGroupLabel>PayPal</RadioGroupLabel>
                <Text style={styles.paymentDescription}>Pay with your PayPal account</Text>
              </View>
            </View>
          </RadioGroupItem>
        </View>

        <View style={[styles.paymentOption, value === 'bank' && styles.paymentOptionSelected]}>
          <RadioGroupItem value="bank">
            <View style={styles.paymentContent}>
              <Text style={styles.paymentIcon}>🏦</Text>
              <View style={styles.paymentInfo}>
                <RadioGroupLabel>Bank Transfer</RadioGroupLabel>
                <Text style={styles.paymentDescription}>Direct bank payment</Text>
              </View>
            </View>
          </RadioGroupItem>
        </View>
      </RadioGroup>

      <Pressable style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue to Payment</Text>
      </Pressable>
    </View>
  );
}

export const PaymentMethod: Story = {
  render: () => <PaymentMethodRadioGroup />,
};

// ============================================================================
// Story: ShippingOptions
// ============================================================================
function ShippingOptionsRadioGroup() {
  const [value, setValue] = useState('standard');

  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', price: 'Free', time: '5-7 days' },
    { id: 'express', name: 'Express Shipping', price: '$9.99', time: '2-3 days' },
    { id: 'overnight', name: 'Overnight Shipping', price: '$24.99', time: 'Next day' },
  ];

  return (
    <View style={styles.shippingContainer}>
      <Text style={styles.formTitle}>Shipping Options</Text>
      <RadioGroup value={value} onValueChange={setValue}>
        {shippingOptions.map((option) => (
          <View
            key={option.id}
            style={[
              styles.shippingOption,
              value === option.id && styles.shippingOptionSelected,
            ]}
          >
            <RadioGroupItem value={option.id}>
              <View style={styles.shippingContent}>
                <View style={styles.shippingInfo}>
                  <RadioGroupLabel>{option.name}</RadioGroupLabel>
                  <Text style={styles.shippingTime}>Estimated: {option.time}</Text>
                </View>
                <Text style={styles.shippingPrice}>{option.price}</Text>
              </View>
            </RadioGroupItem>
          </View>
        ))}
      </RadioGroup>
    </View>
  );
}

export const ShippingOptions: Story = {
  render: () => <ShippingOptionsRadioGroup />,
};

// ============================================================================
// Story: PlanSelection
// ============================================================================
function PlanSelectionRadioGroup() {
  const [value, setValue] = useState('pro');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/month',
      features: ['5 projects', '1 GB storage', 'Email support'],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19',
      period: '/month',
      features: ['Unlimited projects', '100 GB storage', 'Priority support'],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      features: ['Everything in Pro', 'Custom integrations', 'Dedicated manager'],
    },
  ];

  return (
    <View style={styles.plansContainer}>
      <Text style={styles.plansTitle}>Choose your plan</Text>
      <RadioGroup value={value} onValueChange={setValue}>
        <View style={styles.plansGrid}>
          {plans.map((plan) => (
            <View
              key={plan.id}
              style={[
                styles.planCard,
                value === plan.id && styles.planCardSelected,
                plan.popular && styles.planCardPopular,
              ]}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Popular</Text>
                </View>
              )}
              <RadioGroupItem value={plan.id}>
                <View style={styles.planContent}>
                  <RadioGroupLabel>{plan.name}</RadioGroupLabel>
                  <View style={styles.planPricing}>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                    <Text style={styles.planPeriod}>{plan.period}</Text>
                  </View>
                  <View style={styles.planFeatures}>
                    {plan.features.map((feature, index) => (
                      <Text key={index} style={styles.planFeature}>
                        ✓ {feature}
                      </Text>
                    ))}
                  </View>
                </View>
              </RadioGroupItem>
            </View>
          ))}
        </View>
      </RadioGroup>
    </View>
  );
}

export const PlanSelection: Story = {
  render: () => <PlanSelectionRadioGroup />,
};

// ============================================================================
// Story: SurveyQuestion
// ============================================================================
function SurveyQuestionRadioGroup() {
  const [value, setValue] = useState('');

  const ratings = [
    { value: '1', label: '1', description: 'Very Unsatisfied' },
    { value: '2', label: '2', description: 'Unsatisfied' },
    { value: '3', label: '3', description: 'Neutral' },
    { value: '4', label: '4', description: 'Satisfied' },
    { value: '5', label: '5', description: 'Very Satisfied' },
  ];

  return (
    <View style={styles.surveyContainer}>
      <Text style={styles.surveyQuestion}>
        How satisfied are you with our service?
      </Text>

      <RadioGroup value={value} onValueChange={setValue} orientation="horizontal">
        <View style={styles.ratingScale}>
          {ratings.map((rating) => (
            <View key={rating.value} style={styles.ratingItem}>
              <View
                style={[
                  styles.ratingCircle,
                  value === rating.value && styles.ratingCircleSelected,
                ]}
              >
                <RadioGroupItem value={rating.value}>
                  <Text
                    style={[
                      styles.ratingLabel,
                      value === rating.value && styles.ratingLabelSelected,
                    ]}
                  >
                    {rating.label}
                  </Text>
                </RadioGroupItem>
              </View>
            </View>
          ))}
        </View>
      </RadioGroup>

      <View style={styles.ratingLabels}>
        <Text style={styles.ratingLabelText}>Very Unsatisfied</Text>
        <Text style={styles.ratingLabelText}>Very Satisfied</Text>
      </View>

      {value && (
        <View style={styles.surveyFeedback}>
          <Text style={styles.surveyFeedbackText}>
            You selected: {ratings.find((r) => r.value === value)?.description}
          </Text>
        </View>
      )}

      <Pressable
        style={[styles.submitSurvey, !value && styles.submitSurveyDisabled]}
        disabled={!value}
      >
        <Text style={[styles.submitSurveyText, !value && styles.submitSurveyTextDisabled]}>
          Submit Feedback
        </Text>
      </Pressable>
    </View>
  );
}

export const SurveyQuestion: Story = {
  render: () => <SurveyQuestionRadioGroup />,
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  containerWide: {
    width: 360,
    padding: 24,
    gap: 12,
  },
  stateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  optionCard: {
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8,
  },
  optionContent: {
    marginLeft: 8,
  },
  optionDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    lineHeight: 18,
  },
  paymentContainer: {
    width: 360,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  paymentOption: {
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8,
  },
  paymentOptionSelected: {
    backgroundColor: '#e3f2fd',
    borderColor: '#007AFF',
  },
  paymentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentIcon: {
    fontSize: 24,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  shippingContainer: {
    width: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  shippingOption: {
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8,
  },
  shippingOptionSelected: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4caf50',
  },
  shippingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 8,
  },
  shippingInfo: {
    flex: 1,
  },
  shippingTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  shippingPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  plansContainer: {
    width: 500,
    padding: 24,
  },
  plansTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  plansGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  planCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: '#007AFF',
  },
  planCardPopular: {
    borderColor: '#007AFF',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 12,
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  planContent: {
    alignItems: 'center',
    gap: 8,
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 8,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
  },
  planPeriod: {
    fontSize: 14,
    color: '#666',
  },
  planFeatures: {
    alignSelf: 'stretch',
    gap: 6,
    marginTop: 8,
  },
  planFeature: {
    fontSize: 13,
    color: '#666',
  },
  surveyContainer: {
    width: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  surveyQuestion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  ratingScale: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  ratingItem: {
    alignItems: 'center',
  },
  ratingCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingCircleSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  ratingLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  ratingLabelSelected: {
    color: '#fff',
  },
  ratingLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
    paddingHorizontal: 8,
  },
  ratingLabelText: {
    fontSize: 12,
    color: '#999',
  },
  surveyFeedback: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
  },
  surveyFeedbackText: {
    fontSize: 14,
    color: '#1976d2',
    textAlign: 'center',
  },
  submitSurvey: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
  },
  submitSurveyDisabled: {
    backgroundColor: '#e0e0e0',
  },
  submitSurveyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitSurveyTextDisabled: {
    color: '#999',
  },
});
