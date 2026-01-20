'use client';

import { useState } from 'react';
import { PreviewMode } from '@/lib/studio/types';
import {
  Button,
  Switch,
  Input,
  Badge,
  Progress,
  Checkbox,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  Slider,
} from '@r-ui/react-native';
import { View, Text } from 'react-native';

interface PreviewShowcaseProps {
  mode: PreviewMode;
}

// Icons
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}

// Preview Block Component
function PreviewBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-[#737373] px-1.5 py-2">{label}</span>
      <div className="border border-dashed border-[#E5E5E5] bg-white p-6">
        {children}
      </div>
    </div>
  );
}

// Card Preview using r/ui Card component
function CardPreview() {
  return (
    <div className="flex justify-center">
      <View style={{ width: 384, maxWidth: '100%' }}>
        <Card>
          {/* Image Placeholder with grayscale gradient */}
          <div
            className="w-full relative overflow-hidden rounded-t-xl"
            style={{
              height: '180px',
              background: 'linear-gradient(135deg, #374151 0%, #1f2937 50%, #111827 100%)',
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>
          <CardHeader>
            <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
            <CardDescription>
              Switch to the improved way to explore your data, with natural language.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Button size="sm">
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={{ color: '#FAFAFA' }}>Create Query</Text>
                  <PlusIcon />
                </View>
              </Button>
              <Badge variant="secondary">Warning</Badge>
            </View>
          </CardFooter>
        </Card>
      </View>
    </div>
  );
}

// Form Preview using r/ui components
function FormPreview() {
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');

  return (
    <View style={{ width: '100%', maxWidth: 400 }}>
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Please fill in your details below</CardDescription>
        </CardHeader>
        <CardContent>
          <View style={{ gap: 16 }}>
            {/* Name & Role Row */}
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <View style={{ flex: 1, gap: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: 'var(--color-foreground)' }}>
                  Name
                </Text>
                <Input
                  placeholder="Enter name"
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={{ flex: 1, gap: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: 'var(--color-foreground)' }}>
                  Role
                </Text>
                <Input
                  placeholder="Select a role"
                  editable={false}
                />
              </View>
            </View>

            {/* Comments */}
            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: 'var(--color-foreground)' }}>
                Comments
              </Text>
              <Input
                placeholder="Enter comments..."
                value={comments}
                onChangeText={setComments}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        </CardContent>
        <CardFooter>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button>Submit</Button>
            <Button variant="outline">Cancel</Button>
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}

// Complex Form Preview (Settings) using r/ui components
function ComplexFormPreview() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [progress, setProgress] = useState(65);

  return (
    <View style={{ width: '100%', maxWidth: 400 }}>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your preferences and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <View style={{ gap: 20 }}>
            {/* Switch options */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ gap: 2 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: 'var(--color-foreground)' }}>
                  Push Notifications
                </Text>
                <Text style={{ fontSize: 12, color: 'var(--color-muted-foreground)' }}>
                  Receive alerts on your device
                </Text>
              </View>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ gap: 2 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: 'var(--color-foreground)' }}>
                  Marketing Emails
                </Text>
                <Text style={{ fontSize: 12, color: 'var(--color-muted-foreground)' }}>
                  Get product updates and offers
                </Text>
              </View>
              <Switch checked={marketing} onCheckedChange={setMarketing} />
            </View>

            {/* Progress indicator */}
            <View style={{ gap: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: 'var(--color-foreground)' }}>
                  Profile Completion
                </Text>
                <Text style={{ fontSize: 12, color: 'var(--color-muted-foreground)' }}>
                  {progress}%
                </Text>
              </View>
              <Progress value={progress} />
            </View>

            {/* Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Checkbox checked={true} />
              <Text style={{ fontSize: 14, color: 'var(--color-foreground)' }}>
                I agree to the terms and conditions
              </Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

// Fields Preview using r/ui components
function FieldsPreview() {
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <View style={{ gap: 20 }}>
      {/* Badges showcase */}
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: 'var(--color-foreground)' }}>
          Status Badges
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Error</Badge>
        </View>
      </View>

      {/* Slider */}
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: 'var(--color-foreground)' }}>
            Volume Control
          </Text>
          <Text style={{ fontSize: 12, color: 'var(--color-muted-foreground)' }}>
            {sliderValue[0]}%
          </Text>
        </View>
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          max={100}
          step={1}
        />
      </View>

      {/* Button variants */}
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: 'var(--color-foreground)' }}>
          Button Styles
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="secondary">Secondary</Button>
          <Button size="sm" variant="outline">Outline</Button>
          <Button size="sm" variant="ghost">Ghost</Button>
        </View>
      </View>
    </View>
  );
}

export function PreviewShowcase({ mode }: PreviewShowcaseProps) {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Left Column */}
      <div className="space-y-8">
        <PreviewBlock label="Card">
          <CardPreview />
        </PreviewBlock>

        <PreviewBlock label="Settings">
          <ComplexFormPreview />
        </PreviewBlock>
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        <PreviewBlock label="Form">
          <FormPreview />
        </PreviewBlock>

        <PreviewBlock label="Components">
          <FieldsPreview />
        </PreviewBlock>
      </div>
    </div>
  );
}
