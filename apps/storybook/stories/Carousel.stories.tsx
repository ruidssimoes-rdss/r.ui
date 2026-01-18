import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  Card,
  CardContent,
  Button,
  Badge,
} from '@r-ui/react-native';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

const sampleImages = [
  { id: 1, color: '#3b82f6', label: 'Mountain Vista' },
  { id: 2, color: '#8b5cf6', label: 'Ocean Sunset' },
  { id: 3, color: '#ec4899', label: 'Forest Trail' },
  { id: 4, color: '#f59e0b', label: 'Desert Dunes' },
  { id: 5, color: '#10b981', label: 'Northern Lights' },
];

export const Default: Story = {
  render: () => (
    <View style={styles.container}>
      <Carousel>
        <CarouselContent>
          {sampleImages.map((image) => (
            <CarouselItem key={image.id}>
              <View style={[styles.slide, { backgroundColor: image.color }]}>
                <Text style={styles.slideText}>{image.label}</Text>
              </View>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </View>
  ),
};

export const WithDots: Story = {
  render: () => (
    <View style={styles.container}>
      <Carousel showDots>
        <CarouselContent>
          {sampleImages.map((image) => (
            <CarouselItem key={image.id}>
              <View style={[styles.slide, { backgroundColor: image.color }]}>
                <Text style={styles.slideText}>{image.label}</Text>
              </View>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    </View>
  ),
};

export const WithArrows: Story = {
  render: () => (
    <View style={styles.container}>
      <Carousel showArrows>
        <CarouselContent>
          {sampleImages.map((image) => (
            <CarouselItem key={image.id}>
              <View style={[styles.slide, { backgroundColor: image.color }]}>
                <Text style={styles.slideText}>{image.label}</Text>
              </View>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </View>
  ),
};

export const AutoPlay: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.label}>Auto-advances every 3 seconds</Text>
      <Carousel autoplay interval={3000}>
        <CarouselContent>
          {sampleImages.map((image) => (
            <CarouselItem key={image.id}>
              <View style={[styles.slide, { backgroundColor: image.color }]}>
                <Text style={styles.slideText}>{image.label}</Text>
              </View>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    </View>
  ),
};

export const Loop: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.label}>Infinite loop enabled</Text>
      <Carousel loop showArrows>
        <CarouselContent>
          {sampleImages.slice(0, 3).map((image) => (
            <CarouselItem key={image.id}>
              <View style={[styles.slide, { backgroundColor: image.color }]}>
                <Text style={styles.slideText}>{image.label}</Text>
              </View>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    </View>
  ),
};

export const ProductGallery: Story = {
  render: function ProductGalleryStory() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const products = [
      { id: 1, color: '#1a1a2e', name: 'Front View', badge: 'Main' },
      { id: 2, color: '#16213e', name: 'Side View' },
      { id: 3, color: '#0f3460', name: 'Back View' },
      { id: 4, color: '#1a1a2e', name: 'Detail Shot' },
      { id: 5, color: '#16213e', name: 'In Use' },
    ];

    return (
      <View style={styles.productContainer}>
        <View style={styles.productHeader}>
          <Text style={styles.productTitle}>Premium Wireless Headphones</Text>
          <Badge variant="success" size="sm">In Stock</Badge>
        </View>

        <Carousel onSlideChange={setCurrentIndex}>
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id}>
                <View style={[styles.productSlide, { backgroundColor: product.color }]}>
                  {product.badge && (
                    <Badge variant="primary" size="sm" style={styles.productBadge}>
                      {product.badge}
                    </Badge>
                  )}
                  <Text style={styles.productIcon}>🎧</Text>
                </View>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots />
        </Carousel>

        <View style={styles.thumbnailRow}>
          {products.map((product, index) => (
            <View
              key={product.id}
              style={[
                styles.thumbnail,
                { backgroundColor: product.color },
                currentIndex === index && styles.thumbnailActive,
              ]}
            >
              <Text style={styles.thumbnailIcon}>🎧</Text>
            </View>
          ))}
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productPrice}>$299.99</Text>
          <Button size="sm">Add to Cart</Button>
        </View>
      </View>
    );
  },
};

export const Testimonials: Story = {
  render: () => {
    const testimonials = [
      {
        id: 1,
        quote: "This product completely transformed how I work. The quality is exceptional and the support team is incredibly helpful.",
        author: "Sarah Mitchell",
        role: "Product Designer at Figma",
        avatar: "SM",
      },
      {
        id: 2,
        quote: "I've tried many alternatives, but nothing comes close. It's intuitive, fast, and reliable. Highly recommended!",
        author: "James Chen",
        role: "Senior Engineer at Stripe",
        avatar: "JC",
      },
      {
        id: 3,
        quote: "The attention to detail is remarkable. Every feature feels thoughtfully designed. Worth every penny.",
        author: "Emily Rodriguez",
        role: "Founder at TechStart",
        avatar: "ER",
      },
    ];

    return (
      <View style={styles.testimonialContainer}>
        <Text style={styles.testimonialTitle}>What Our Customers Say</Text>

        <Carousel autoplay interval={5000} loop>
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <View style={styles.testimonialSlide}>
                  <Text style={styles.quoteIcon}>"</Text>
                  <Text style={styles.quoteText}>{testimonial.quote}</Text>
                  <View style={styles.testimonialAuthor}>
                    <View style={styles.avatarCircle}>
                      <Text style={styles.avatarText}>{testimonial.avatar}</Text>
                    </View>
                    <View>
                      <Text style={styles.authorName}>{testimonial.author}</Text>
                      <Text style={styles.authorRole}>{testimonial.role}</Text>
                    </View>
                  </View>
                </View>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots />
        </Carousel>
      </View>
    );
  },
};

export const OnboardingFlow: Story = {
  render: function OnboardingFlowStory() {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
      {
        id: 1,
        icon: '👋',
        title: 'Welcome to AppName',
        description: 'Your personal productivity companion. Let us show you around and get you started.',
        color: '#3b82f6',
      },
      {
        id: 2,
        icon: '✨',
        title: 'Organize Everything',
        description: 'Create projects, add tasks, and keep track of your progress all in one place.',
        color: '#8b5cf6',
      },
      {
        id: 3,
        icon: '🔔',
        title: 'Smart Reminders',
        description: 'Never miss a deadline with intelligent notifications that adapt to your schedule.',
        color: '#ec4899',
      },
      {
        id: 4,
        icon: '🚀',
        title: 'Ready to Start!',
        description: "You're all set. Start creating your first project and boost your productivity.",
        color: '#10b981',
      },
    ];

    const isLastStep = currentStep === steps.length - 1;

    return (
      <View style={styles.onboardingContainer}>
        <Carousel onSlideChange={setCurrentStep}>
          <CarouselContent>
            {steps.map((step) => (
              <CarouselItem key={step.id}>
                <View style={styles.onboardingSlide}>
                  <View style={[styles.onboardingIconBg, { backgroundColor: step.color + '20' }]}>
                    <Text style={styles.onboardingIcon}>{step.icon}</Text>
                  </View>
                  <Text style={styles.onboardingTitle}>{step.title}</Text>
                  <Text style={styles.onboardingDescription}>{step.description}</Text>
                </View>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots />
        </Carousel>

        <View style={styles.onboardingFooter}>
          <Button variant="ghost" size="sm">
            Skip
          </Button>
          <Button size="sm">
            {isLastStep ? 'Get Started' : 'Next'}
          </Button>
        </View>
      </View>
    );
  },
};

export const CardCarousel: Story = {
  render: () => {
    const features = [
      {
        id: 1,
        icon: '⚡',
        title: 'Lightning Fast',
        description: 'Optimized for speed with native performance on all platforms.',
      },
      {
        id: 2,
        icon: '🔒',
        title: 'Secure by Default',
        description: 'Enterprise-grade security with end-to-end encryption.',
      },
      {
        id: 3,
        icon: '🎨',
        title: 'Beautiful Design',
        description: 'Carefully crafted components following design best practices.',
      },
      {
        id: 4,
        icon: '📱',
        title: 'Cross Platform',
        description: 'Works seamlessly on iOS, Android, and web applications.',
      },
    ];

    return (
      <View style={styles.cardCarouselContainer}>
        <Text style={styles.sectionTitle}>Why Choose Us</Text>

        <Carousel>
          <CarouselContent>
            {features.map((feature) => (
              <CarouselItem key={feature.id} style={styles.cardSlideWrapper}>
                <Card variant="outlined" padding="md" style={styles.featureCard}>
                  <CardContent>
                    <Text style={styles.featureIcon}>{feature.icon}</Text>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </View>
    );
  },
};

export const CustomControls: Story = {
  render: function CustomControlsStory() {
    const slides = [
      { id: 1, color: '#ef4444', label: 'Slide 1' },
      { id: 2, color: '#f97316', label: 'Slide 2' },
      { id: 3, color: '#eab308', label: 'Slide 3' },
      { id: 4, color: '#22c55e', label: 'Slide 4' },
    ];

    return (
      <View style={styles.container}>
        <Carousel showArrows>
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <View style={[styles.slide, { backgroundColor: slide.color }]}>
                  <Text style={styles.slideText}>{slide.label}</Text>
                </View>
              </CarouselItem>
            ))}
          </CarouselContent>

          <View style={styles.customControlsContainer}>
            <CarouselPrevious style={styles.customArrow}>
              <Text style={styles.customArrowText}>←</Text>
            </CarouselPrevious>
            <CarouselDots
              activeColor="#ffffff"
              inactiveColor="rgba(255,255,255,0.3)"
            />
            <CarouselNext style={styles.customArrow}>
              <Text style={styles.customArrowText}>→</Text>
            </CarouselNext>
          </View>
        </Carousel>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    width: 360,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  slide: {
    height: 200,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  // Product Gallery
  productContainer: {
    width: 360,
    gap: 16,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  productSlide: {
    height: 240,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  productBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  productIcon: {
    fontSize: 80,
  },
  thumbnailRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
  thumbnailActive: {
    opacity: 1,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  thumbnailIcon: {
    fontSize: 20,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  productPrice: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  // Testimonials
  testimonialContainer: {
    width: 360,
    gap: 16,
  },
  testimonialTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  testimonialSlide: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    minHeight: 220,
  },
  quoteIcon: {
    color: '#3b82f6',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 48,
  },
  quoteText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    marginVertical: 16,
  },
  testimonialAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 'auto',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  authorName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  authorRole: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  // Onboarding
  onboardingContainer: {
    width: 360,
    gap: 24,
  },
  onboardingSlide: {
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  onboardingIconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onboardingIcon: {
    fontSize: 48,
  },
  onboardingTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  onboardingDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  onboardingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  // Card Carousel
  cardCarouselContainer: {
    width: 360,
    gap: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  cardSlideWrapper: {
    paddingHorizontal: 4,
  },
  featureCard: {
    minHeight: 180,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    lineHeight: 20,
  },
  // Custom Controls
  customControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
  },
  customArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customArrowText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
