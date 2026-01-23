import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Badge,
  Button,
} from '@hyena-studio/react-native';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <View style={styles.container}>
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Account Settings</AccordionTrigger>
          <AccordionContent>
            Manage your account settings including your profile information,
            email preferences, and connected accounts.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Privacy & Security</AccordionTrigger>
          <AccordionContent>
            Control your privacy settings, two-factor authentication,
            and review your recent login activity.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Notifications</AccordionTrigger>
          <AccordionContent>
            Choose which notifications you want to receive via email,
            push notifications, or SMS.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  ),
};

export const SingleExpand: Story = {
  render: function SingleExpandStory() {
    const [value, setValue] = useState<string>('shipping');

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Only one item can be open at a time</Text>
        <Accordion
          type="single"
          value={value}
          onValueChange={(v) => setValue(v as string)}
        >
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping Information</AccordionTrigger>
            <AccordionContent>
              We offer free standard shipping on orders over $50.
              Express shipping is available for an additional $9.99.
              International shipping rates vary by destination.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionTrigger>Return Policy</AccordionTrigger>
            <AccordionContent>
              Items can be returned within 30 days of purchase.
              Products must be unused and in original packaging.
              Refunds are processed within 5-7 business days.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="warranty">
            <AccordionTrigger>Warranty Details</AccordionTrigger>
            <AccordionContent>
              All products come with a 1-year manufacturer warranty.
              Extended warranty options are available at checkout.
              Contact support for warranty claims.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Text style={styles.value}>Selected: {value || '(none)'}</Text>
      </View>
    );
  },
};

export const MultipleExpand: Story = {
  render: function MultipleExpandStory() {
    const [values, setValues] = useState<string[]>(['features', 'specs']);

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Multiple items can be open simultaneously</Text>
        <Accordion
          type="multiple"
          value={values}
          onValueChange={(v) => setValues(v as string[])}
        >
          <AccordionItem value="features">
            <AccordionTrigger>Key Features</AccordionTrigger>
            <AccordionContent>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Ultra-fast performance</Text>
                <Text style={styles.listItem}>• All-day battery life</Text>
                <Text style={styles.listItem}>• Stunning retina display</Text>
                <Text style={styles.listItem}>• Advanced security features</Text>
              </View>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="specs">
            <AccordionTrigger>Technical Specifications</AccordionTrigger>
            <AccordionContent>
              <View style={styles.specList}>
                <View style={styles.specRow}>
                  <Text style={styles.specLabel}>Processor</Text>
                  <Text style={styles.specValue}>M3 Pro Chip</Text>
                </View>
                <View style={styles.specRow}>
                  <Text style={styles.specLabel}>Memory</Text>
                  <Text style={styles.specValue}>16GB Unified</Text>
                </View>
                <View style={styles.specRow}>
                  <Text style={styles.specLabel}>Storage</Text>
                  <Text style={styles.specValue}>512GB SSD</Text>
                </View>
              </View>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="reviews">
            <AccordionTrigger>Customer Reviews</AccordionTrigger>
            <AccordionContent>
              Rated 4.8 out of 5 stars based on 2,847 reviews.
              Customers love the performance and build quality.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Text style={styles.value}>Open: {values.join(', ') || '(none)'}</Text>
      </View>
    );
  },
};

export const DefaultOpen: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.label}>First item expanded by default</Text>
      <Accordion type="single" defaultValue="overview">
        <AccordionItem value="overview">
          <AccordionTrigger>Project Overview</AccordionTrigger>
          <AccordionContent>
            This project aims to build a modern component library for
            React Native applications. It includes 45+ components with
            comprehensive documentation and Storybook stories.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="timeline">
          <AccordionTrigger>Timeline</AccordionTrigger>
          <AccordionContent>
            Phase 1: Core components (Complete)
            Phase 2: Documentation (In Progress)
            Phase 3: Testing (Upcoming)
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="team">
          <AccordionTrigger>Team Members</AccordionTrigger>
          <AccordionContent>
            The project is maintained by a dedicated team of developers
            focused on creating high-quality, accessible components.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  ),
};

export const AllClosed: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.label}>All items can be closed (collapsible=true)</Text>
      <Accordion type="single" collapsible>
        <AccordionItem value="billing">
          <AccordionTrigger>Billing Address</AccordionTrigger>
          <AccordionContent>
            123 Main Street, Suite 100
            San Francisco, CA 94102
            United States
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger>Shipping Address</AccordionTrigger>
          <AccordionContent>
            456 Oak Avenue, Apt 2B
            Los Angeles, CA 90001
            United States
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="payment">
          <AccordionTrigger>Payment Method</AccordionTrigger>
          <AccordionContent>
            Visa ending in 4242
            Expires 12/2026
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  ),
};

export const Disabled: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.label}>Some items are disabled</Text>
      <Accordion type="single" defaultValue="basic">
        <AccordionItem value="basic">
          <AccordionTrigger>Basic Plan - Free</AccordionTrigger>
          <AccordionContent>
            <View style={styles.list}>
              <Text style={styles.listItem}>• 5 projects</Text>
              <Text style={styles.listItem}>• 1GB storage</Text>
              <Text style={styles.listItem}>• Community support</Text>
            </View>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="pro">
          <AccordionTrigger>Pro Plan - $19/month</AccordionTrigger>
          <AccordionContent>
            <View style={styles.list}>
              <Text style={styles.listItem}>• Unlimited projects</Text>
              <Text style={styles.listItem}>• 100GB storage</Text>
              <Text style={styles.listItem}>• Priority support</Text>
              <Text style={styles.listItem}>• Advanced analytics</Text>
            </View>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="enterprise" disabled>
          <AccordionTrigger>Enterprise Plan - Coming Soon</AccordionTrigger>
          <AccordionContent>
            Enterprise features will be available soon.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <View style={styles.container}>
      <Accordion type="single" defaultValue="inbox">
        <AccordionItem value="inbox">
          <AccordionTrigger>
            <View style={styles.customTrigger}>
              <Text style={styles.customIcon}>📥</Text>
              <Text style={styles.customTriggerText}>Inbox</Text>
              <Badge variant="default" size="sm">12</Badge>
            </View>
          </AccordionTrigger>
          <AccordionContent>
            <View style={styles.messageList}>
              <View style={styles.messageItem}>
                <Text style={styles.messageSender}>John Doe</Text>
                <Text style={styles.messagePreview}>Meeting tomorrow at 3pm...</Text>
              </View>
              <View style={styles.messageItem}>
                <Text style={styles.messageSender}>Jane Smith</Text>
                <Text style={styles.messagePreview}>Here are the files you requested...</Text>
              </View>
            </View>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sent">
          <AccordionTrigger>
            <View style={styles.customTrigger}>
              <Text style={styles.customIcon}>📤</Text>
              <Text style={styles.customTriggerText}>Sent</Text>
            </View>
          </AccordionTrigger>
          <AccordionContent>
            View all sent messages and track delivery status.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="drafts">
          <AccordionTrigger>
            <View style={styles.customTrigger}>
              <Text style={styles.customIcon}>📝</Text>
              <Text style={styles.customTriggerText}>Drafts</Text>
              <Badge variant="secondary" size="sm">3</Badge>
            </View>
          </AccordionTrigger>
          <AccordionContent>
            You have 3 unfinished drafts waiting to be completed.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  ),
};

export const Nested: Story = {
  render: () => (
    <View style={styles.container}>
      <Accordion type="single" defaultValue="electronics">
        <AccordionItem value="electronics">
          <AccordionTrigger>Electronics</AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible style={styles.nestedAccordion}>
              <AccordionItem value="phones">
                <AccordionTrigger>Phones & Tablets</AccordionTrigger>
                <AccordionContent>
                  <View style={styles.list}>
                    <Text style={styles.listItem}>• Smartphones</Text>
                    <Text style={styles.listItem}>• Tablets</Text>
                    <Text style={styles.listItem}>• Accessories</Text>
                  </View>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="computers">
                <AccordionTrigger>Computers</AccordionTrigger>
                <AccordionContent>
                  <View style={styles.list}>
                    <Text style={styles.listItem}>• Laptops</Text>
                    <Text style={styles.listItem}>• Desktops</Text>
                    <Text style={styles.listItem}>• Monitors</Text>
                  </View>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="clothing">
          <AccordionTrigger>Clothing</AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible style={styles.nestedAccordion}>
              <AccordionItem value="mens">
                <AccordionTrigger>Men's</AccordionTrigger>
                <AccordionContent>
                  Shirts, pants, shoes, and accessories for men.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="womens">
                <AccordionTrigger>Women's</AccordionTrigger>
                <AccordionContent>
                  Dresses, tops, shoes, and accessories for women.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="home">
          <AccordionTrigger>Home & Garden</AccordionTrigger>
          <AccordionContent>
            Furniture, decor, kitchen, and outdoor products.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  ),
};

export const LongContent: Story = {
  render: () => (
    <View style={styles.container}>
      <Accordion type="single" defaultValue="terms">
        <AccordionItem value="terms">
          <AccordionTrigger>Terms of Service</AccordionTrigger>
          <AccordionContent>
            <Text style={styles.longText}>
              Welcome to our service. By accessing or using our platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.{'\n\n'}

              1. ACCEPTANCE OF TERMS{'\n'}
              By using this service, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree with any part of these terms, you must not use our service.{'\n\n'}

              2. USE LICENSE{'\n'}
              Permission is granted to temporarily access the materials on our platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.{'\n\n'}

              3. DISCLAIMER{'\n'}
              The materials on our platform are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability.{'\n\n'}

              4. LIMITATIONS{'\n'}
              In no event shall our company or its suppliers be liable for any damages arising out of the use or inability to use the materials on our platform.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="privacy">
          <AccordionTrigger>Privacy Policy</AccordionTrigger>
          <AccordionContent>
            <Text style={styles.longText}>
              Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.{'\n\n'}

              INFORMATION WE COLLECT{'\n'}
              We may collect information about you in a variety of ways. The information we may collect includes personal data such as your name, email address, and telephone number.{'\n\n'}

              HOW WE USE YOUR INFORMATION{'\n'}
              We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our services and users.{'\n\n'}

              DISCLOSURE OF YOUR INFORMATION{'\n'}
              We may share information we have collected about you in certain situations, such as with your consent, for legal purposes, or with service providers who assist us in our operations.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="cookies">
          <AccordionTrigger>Cookie Policy</AccordionTrigger>
          <AccordionContent>
            We use cookies and similar tracking technologies to track activity on our platform and hold certain information.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  ),
};

export const FAQ: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      <Accordion type="single" collapsible>
        <AccordionItem value="q1">
          <AccordionTrigger>How do I reset my password?</AccordionTrigger>
          <AccordionContent>
            To reset your password, click on "Forgot Password" on the login page.
            Enter your email address and we'll send you a link to create a new password.
            The link expires after 24 hours for security reasons.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
          <AccordionContent>
            We accept all major credit cards (Visa, MasterCard, American Express),
            PayPal, Apple Pay, and Google Pay. For enterprise customers, we also
            offer invoice-based billing with NET 30 terms.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger>Can I cancel my subscription anytime?</AccordionTrigger>
          <AccordionContent>
            Yes, you can cancel your subscription at any time from your account settings.
            Your access will continue until the end of your current billing period.
            No refunds are provided for partial months.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q4">
          <AccordionTrigger>How do I contact support?</AccordionTrigger>
          <AccordionContent>
            <View style={styles.supportContent}>
              <Text style={styles.supportText}>You can reach our support team through:</Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Email: support@example.com</Text>
                <Text style={styles.listItem}>• Live chat: Available 24/7 in the app</Text>
                <Text style={styles.listItem}>• Phone: 1-800-123-4567 (Mon-Fri 9am-5pm)</Text>
              </View>
              <Button size="sm" style={styles.supportButton}>
                Contact Support
              </Button>
            </View>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q5">
          <AccordionTrigger>Is my data secure?</AccordionTrigger>
          <AccordionContent>
            Absolutely. We use industry-standard encryption (AES-256) for all data
            at rest and in transit. Our infrastructure is SOC 2 Type II certified
            and we undergo regular third-party security audits.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    width: 360,
    padding: 16,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 12,
  },
  value: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 12,
    fontStyle: 'italic',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  list: {
    gap: 4,
  },
  listItem: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 20,
  },
  specList: {
    gap: 8,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  specValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  customTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  customIcon: {
    fontSize: 16,
  },
  customTriggerText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  messageList: {
    gap: 12,
  },
  messageItem: {
    gap: 2,
  },
  messageSender: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  messagePreview: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
  },
  nestedAccordion: {
    marginTop: 8,
    borderWidth: 0,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  longText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 22,
  },
  supportContent: {
    gap: 12,
  },
  supportText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  supportButton: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
});
