import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import Svg, { Path, Circle, Rect, Line, Polyline } from 'react-native-svg';
import { Onboarding, Button, colors } from '@r-ui/react-native';

// Placeholder illustrations (using colored views)
function IllustrationPlaceholder({
  color = colors.accent.blue.DEFAULT,
  label = 'Illustration',
}: {
  color?: string;
  label?: string;
}) {
  return (
    <View
      style={{
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: `${color}20`,
        borderWidth: 2,
        borderColor: `${color}40`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg
        width={80}
        height={80}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.5}
      >
        <Rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <Circle cx="8.5" cy="8.5" r="1.5" />
        <Polyline points="21 15 16 10 5 21" />
      </Svg>
      <Text
        style={{
          marginTop: 16,
          color: colors.text.secondary,
          fontSize: 14,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

// Welcome icon
function WelcomeIcon({ size = 80, color = colors.accent.blue.DEFAULT }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </Svg>
  );
}

// Features icon
function FeaturesIcon({ size = 80, color = colors.accent.green.DEFAULT }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Polyline points="9 11 12 14 22 4" />
      <Path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </Svg>
  );
}

// Rocket icon
function RocketIcon({ size = 80, color = colors.accent.purple.DEFAULT }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <Path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <Path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <Path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </Svg>
  );
}

// Icon wrapper
function IconWrapper({ children, bgColor }: { children: React.ReactNode; bgColor: string }) {
  return (
    <View
      style={{
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: `${bgColor}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
      }}
    >
      {children}
    </View>
  );
}

const meta: Meta<typeof Onboarding> = {
  title: 'Components/Onboarding',
  component: Onboarding,
  argTypes: {
    initialStep: {
      control: { type: 'number', min: 0 },
      description: 'Initial step index',
    },
    loop: {
      control: 'boolean',
      description: 'Allow cycling through steps',
    },
    swipeEnabled: {
      control: 'boolean',
      description: 'Enable swipe gestures',
    },
    keyboardEnabled: {
      control: 'boolean',
      description: 'Enable keyboard navigation (web)',
    },
  },
  args: {
    initialStep: 0,
    loop: false,
    swipeEnabled: true,
    keyboardEnabled: true,
  },
  decorators: [
    (Story) => (
      <View style={{ flex: 1, minHeight: 600 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Onboarding>;

// === Default Story ===

export const Default: Story = {
  render: (args) => (
    <Onboarding
      {...args}
      onComplete={() => Alert.alert('Onboarding Complete', 'Welcome to the app!')}
      onStepChange={(step) => console.log('Step changed to:', step)}
    >
      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.blue.DEFAULT}>
            <WelcomeIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>Welcome to AppName</Onboarding.Title>
        <Onboarding.Description>
          Discover a better way to manage your tasks and boost your productivity.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.green.DEFAULT}>
            <FeaturesIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>Powerful Features</Onboarding.Title>
        <Onboarding.Description>
          Everything you need to stay organized, collaborate with your team, and achieve your goals.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.purple.DEFAULT}>
            <RocketIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>Ready to Start?</Onboarding.Title>
        <Onboarding.Description>
          Let's get you set up in seconds. Your productivity journey begins now.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Dots />
      <Onboarding.Actions>
        <Onboarding.SkipButton />
        <Onboarding.NextButton />
      </Onboarding.Actions>
    </Onboarding>
  ),
};

// === With Images ===

export const WithImages: Story = {
  render: (args) => (
    <Onboarding
      {...args}
      onComplete={() => Alert.alert('Done!')}
    >
      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 40 }}>
          <IllustrationPlaceholder color={colors.accent.blue.DEFAULT} label="Welcome" />
        </View>
        <Onboarding.Title>Welcome</Onboarding.Title>
        <Onboarding.Description>
          Your journey to productivity starts here.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 40 }}>
          <IllustrationPlaceholder color={colors.accent.green.DEFAULT} label="Features" />
        </View>
        <Onboarding.Title>Discover Features</Onboarding.Title>
        <Onboarding.Description>
          Explore our powerful tools designed for you.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 40 }}>
          <IllustrationPlaceholder color={colors.accent.purple.DEFAULT} label="Get Started" />
        </View>
        <Onboarding.Title>Get Started</Onboarding.Title>
        <Onboarding.Description>
          Create your first project in minutes.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Dots variant="pills" />
      <Onboarding.Actions>
        <Onboarding.SkipButton />
        <Onboarding.NextButton labelNext="Continue" labelLast="Let's Go!" />
      </Onboarding.Actions>
    </Onboarding>
  ),
};

// === Custom Animations ===

export const CustomAnimations: Story = {
  render: (args) => (
    <Onboarding
      {...args}
      onComplete={() => Alert.alert('Complete!')}
    >
      <Onboarding.Step animation="fade">
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.blue.DEFAULT}>
            <WelcomeIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title animation="slideDown">Fade Animation</Onboarding.Title>
        <Onboarding.Description animation="fadeIn" delay={150}>
          This step uses a simple fade transition.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Step animation="slide">
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.green.DEFAULT}>
            <FeaturesIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title animation="slideUp">Slide Animation</Onboarding.Title>
        <Onboarding.Description animation="slideUp" delay={100}>
          This step slides in from the side.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Step animation="scale">
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.purple.DEFAULT}>
            <RocketIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title animation="fadeIn">Scale Animation</Onboarding.Title>
        <Onboarding.Description animation="fadeIn" delay={50}>
          This step scales in for emphasis.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Dots />
      <Onboarding.Actions>
        <Onboarding.BackButton />
        <Onboarding.NextButton />
      </Onboarding.Actions>
    </Onboarding>
  ),
};

// === Progress Bar ===

export const ProgressBar: Story = {
  render: (args) => (
    <Onboarding
      {...args}
      onComplete={() => Alert.alert('Done!')}
    >
      <Onboarding.Progress />

      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.blue.DEFAULT}>
            <WelcomeIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>Step 1</Onboarding.Title>
        <Onboarding.Description>
          Progress bar shows your advancement through the onboarding.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.green.DEFAULT}>
            <FeaturesIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>Step 2</Onboarding.Title>
        <Onboarding.Description>
          The bar animates smoothly between steps.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.purple.DEFAULT}>
            <RocketIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>Step 3</Onboarding.Title>
        <Onboarding.Description>
          Almost there! Complete to finish onboarding.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Actions>
        <Onboarding.BackButton />
        <Onboarding.NextButton />
      </Onboarding.Actions>
    </Onboarding>
  ),
};

// === Segmented Progress ===

export const SegmentedProgress: Story = {
  render: (args) => (
    <Onboarding
      {...args}
      onComplete={() => Alert.alert('Done!')}
    >
      <Onboarding.Progress variant="segmented" color={colors.accent.green.DEFAULT} height={6} />

      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.blue.DEFAULT}>
            <WelcomeIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>Profile Setup</Onboarding.Title>
        <Onboarding.Description>
          Let's set up your profile to personalize your experience.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.green.DEFAULT}>
            <FeaturesIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>Preferences</Onboarding.Title>
        <Onboarding.Description>
          Choose your notification and display preferences.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.purple.DEFAULT}>
            <RocketIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>All Set!</Onboarding.Title>
        <Onboarding.Description>
          Your account is ready. Let's get started!
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Actions>
        <Onboarding.BackButton />
        <Onboarding.NextButton labelNext="Continue" labelLast="Finish Setup" />
      </Onboarding.Actions>
    </Onboarding>
  ),
};

// === Minimal ===

export const Minimal: Story = {
  render: (args) => (
    <Onboarding
      {...args}
      onComplete={() => Alert.alert('Done!')}
    >
      <Onboarding.Step>
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
          <Onboarding.Title style={{ fontSize: 32, marginBottom: 16 }}>
            Welcome
          </Onboarding.Title>
          <Onboarding.Description style={{ fontSize: 18, lineHeight: 28 }}>
            A minimalist onboarding experience that focuses on your content.
          </Onboarding.Description>
        </View>
      </Onboarding.Step>

      <Onboarding.Step>
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
          <Onboarding.Title style={{ fontSize: 32, marginBottom: 16 }}>
            Simple
          </Onboarding.Title>
          <Onboarding.Description style={{ fontSize: 18, lineHeight: 28 }}>
            No distractions. Just the information you need to get started.
          </Onboarding.Description>
        </View>
      </Onboarding.Step>

      <Onboarding.Step>
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
          <Onboarding.Title style={{ fontSize: 32, marginBottom: 16 }}>
            Ready
          </Onboarding.Title>
          <Onboarding.Description style={{ fontSize: 18, lineHeight: 28 }}>
            Let's begin your journey.
          </Onboarding.Description>
        </View>
      </Onboarding.Step>

      <Onboarding.Dots variant="numbers" />
      <Onboarding.Actions>
        <View style={{ flex: 1 }} />
        <Onboarding.NextButton />
      </Onboarding.Actions>
    </Onboarding>
  ),
};

// === Custom Buttons ===

export const CustomButtons: Story = {
  render: (args) => (
    <Onboarding
      {...args}
      onComplete={() => Alert.alert('Done!')}
    >
      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.blue.DEFAULT}>
            <WelcomeIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>Custom Styling</Onboarding.Title>
        <Onboarding.Description>
          Buttons can be customized with different variants and labels.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.green.DEFAULT}>
            <FeaturesIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>Flexible Actions</Onboarding.Title>
        <Onboarding.Description>
          Mix and match button styles to fit your brand.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.purple.DEFAULT}>
            <RocketIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>Let's Go!</Onboarding.Title>
        <Onboarding.Description>
          You're all set to start using the app.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Dots activeColor={colors.accent.green.DEFAULT} />
      <Onboarding.Actions>
        <Onboarding.BackButton variant="outline">Previous</Onboarding.BackButton>
        <Onboarding.SkipButton variant="ghost">Skip Tour</Onboarding.SkipButton>
        <Onboarding.NextButton
          labelNext="Next Step"
          labelLast="Start Now"
          style={{ backgroundColor: colors.accent.green.DEFAULT }}
        />
      </Onboarding.Actions>
    </Onboarding>
  ),
};

// === Controlled ===

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [step, setStep] = useState(0);

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
            padding: 16,
            backgroundColor: colors.bg.surface,
          }}
        >
          <Button size="sm" variant="outline" onPress={() => setStep(0)}>
            Go to 1
          </Button>
          <Button size="sm" variant="outline" onPress={() => setStep(1)}>
            Go to 2
          </Button>
          <Button size="sm" variant="outline" onPress={() => setStep(2)}>
            Go to 3
          </Button>
        </View>

        <Onboarding
          {...args}
          initialStep={step}
          onComplete={() => Alert.alert('Complete!')}
          onStepChange={setStep}
        >
          <Onboarding.Step>
            <View style={{ alignItems: 'center', paddingTop: 60 }}>
              <IconWrapper bgColor={colors.accent.blue.DEFAULT}>
                <WelcomeIcon />
              </IconWrapper>
            </View>
            <Onboarding.Title>Step One</Onboarding.Title>
            <Onboarding.Description>
              Use the buttons above to jump between steps.
            </Onboarding.Description>
          </Onboarding.Step>

          <Onboarding.Step>
            <View style={{ alignItems: 'center', paddingTop: 60 }}>
              <IconWrapper bgColor={colors.accent.green.DEFAULT}>
                <FeaturesIcon />
              </IconWrapper>
            </View>
            <Onboarding.Title>Step Two</Onboarding.Title>
            <Onboarding.Description>
              External state controls the current step.
            </Onboarding.Description>
          </Onboarding.Step>

          <Onboarding.Step>
            <View style={{ alignItems: 'center', paddingTop: 60 }}>
              <IconWrapper bgColor={colors.accent.purple.DEFAULT}>
                <RocketIcon />
              </IconWrapper>
            </View>
            <Onboarding.Title>Step Three</Onboarding.Title>
            <Onboarding.Description>
              Great for wizard-style flows with validation.
            </Onboarding.Description>
          </Onboarding.Step>

          <Onboarding.Dots />
          <Onboarding.Actions>
            <Onboarding.BackButton />
            <Onboarding.NextButton />
          </Onboarding.Actions>
        </Onboarding>
      </View>
    );
  },
};

// === Pills Variant ===

export const PillsDots: Story = {
  render: (args) => (
    <Onboarding
      {...args}
      onComplete={() => Alert.alert('Done!')}
    >
      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.blue.DEFAULT}>
            <WelcomeIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>Pills Style</Onboarding.Title>
        <Onboarding.Description>
          The pills variant provides a sleek alternative to standard dots.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.green.DEFAULT}>
            <FeaturesIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>Animated Transition</Onboarding.Title>
        <Onboarding.Description>
          Watch the pills expand and contract as you navigate.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Step>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <IconWrapper bgColor={colors.accent.purple.DEFAULT}>
            <RocketIcon />
          </IconWrapper>
        </View>
        <Onboarding.Title>Modern Design</Onboarding.Title>
        <Onboarding.Description>
          Popular in apps like Instagram and Spotify.
        </Onboarding.Description>
      </Onboarding.Step>

      <Onboarding.Dots variant="pills" size="lg" activeColor={colors.accent.purple.DEFAULT} />
      <Onboarding.Actions>
        <Onboarding.SkipButton />
        <Onboarding.NextButton />
      </Onboarding.Actions>
    </Onboarding>
  ),
};

// === All Dot Variants ===

export const AllDotVariants: Story = {
  render: () => (
    <View style={{ flex: 1, gap: 48, padding: 24 }}>
      <View>
        <Text style={{ color: colors.text.secondary, marginBottom: 12 }}>
          Dots (default)
        </Text>
        <View style={{ backgroundColor: colors.bg.surface, padding: 16, borderRadius: 12 }}>
          <Onboarding onComplete={() => {}}>
            <Onboarding.Step>
              <Onboarding.Title>Dots</Onboarding.Title>
            </Onboarding.Step>
            <Onboarding.Step>
              <Onboarding.Title>Dots</Onboarding.Title>
            </Onboarding.Step>
            <Onboarding.Step>
              <Onboarding.Title>Dots</Onboarding.Title>
            </Onboarding.Step>
            <Onboarding.Dots />
          </Onboarding>
        </View>
      </View>

      <View>
        <Text style={{ color: colors.text.secondary, marginBottom: 12 }}>
          Pills variant
        </Text>
        <View style={{ backgroundColor: colors.bg.surface, padding: 16, borderRadius: 12 }}>
          <Onboarding onComplete={() => {}}>
            <Onboarding.Step>
              <Onboarding.Title>Pills</Onboarding.Title>
            </Onboarding.Step>
            <Onboarding.Step>
              <Onboarding.Title>Pills</Onboarding.Title>
            </Onboarding.Step>
            <Onboarding.Step>
              <Onboarding.Title>Pills</Onboarding.Title>
            </Onboarding.Step>
            <Onboarding.Dots variant="pills" />
          </Onboarding>
        </View>
      </View>

      <View>
        <Text style={{ color: colors.text.secondary, marginBottom: 12 }}>
          Numbers variant
        </Text>
        <View style={{ backgroundColor: colors.bg.surface, padding: 16, borderRadius: 12 }}>
          <Onboarding onComplete={() => {}}>
            <Onboarding.Step>
              <Onboarding.Title>Numbers</Onboarding.Title>
            </Onboarding.Step>
            <Onboarding.Step>
              <Onboarding.Title>Numbers</Onboarding.Title>
            </Onboarding.Step>
            <Onboarding.Step>
              <Onboarding.Title>Numbers</Onboarding.Title>
            </Onboarding.Step>
            <Onboarding.Dots variant="numbers" />
          </Onboarding>
        </View>
      </View>
    </View>
  ),
};
