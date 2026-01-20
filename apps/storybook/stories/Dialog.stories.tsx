import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Button,
  Input,
  Checkbox,
  Switch,
  Separator,
  Badge,
} from '@r-ui/react-native';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <View style={styles.container}>
      <Dialog>
        <DialogTrigger>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>
              This is a basic dialog with a title and description.
              Use dialogs for important information that requires user attention.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button>Continue</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  ),
};

export const WithForm: Story = {
  render: function WithFormStory() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    return (
      <View style={styles.container}>
        <Dialog>
          <DialogTrigger>
            <Button>Sign In</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Welcome back</DialogTitle>
              <DialogDescription>
                Sign in to your account to continue
              </DialogDescription>
            </DialogHeader>

            <View style={styles.formContainer}>
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Email</Text>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Password</Text>
                <Input
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry
                />
              </View>
              <View style={styles.formRow}>
                <Checkbox
                  checked={remember}
                  onCheckedChange={setRemember}
                  label="Remember me"
                />
                <Pressable>
                  <Text style={styles.linkText}>Forgot password?</Text>
                </Pressable>
              </View>
            </View>

            <DialogFooter>
              <DialogClose>
                <Button style={styles.fullWidth}>Sign In</Button>
              </DialogClose>
            </DialogFooter>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <Button variant="secondary" style={styles.socialButton}>
                Google
              </Button>
              <Button variant="secondary" style={styles.socialButton}>
                GitHub
              </Button>
            </View>
          </DialogContent>
        </Dialog>
      </View>
    );
  },
};

export const Scrollable: Story = {
  render: () => (
    <View style={styles.container}>
      <Dialog>
        <DialogTrigger>
          <Button>View License</Button>
        </DialogTrigger>
        <DialogContent style={styles.scrollableDialog}>
          <DialogHeader>
            <DialogTitle>MIT License</DialogTitle>
          </DialogHeader>

          <ScrollView style={styles.scrollContent}>
            <Text style={styles.legalText}>
              Copyright (c) 2026 r-ui{'\n\n'}

              Permission is hereby granted, free of charge, to any person obtaining a copy
              of this software and associated documentation files (the "Software"), to deal
              in the Software without restriction, including without limitation the rights
              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:{'\n\n'}

              The above copyright notice and this permission notice shall be included in all
              copies or substantial portions of the Software.{'\n\n'}

              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              SOFTWARE.{'\n\n'}

              ADDITIONAL TERMS{'\n\n'}

              This license grants you the freedom to use, modify, and distribute this
              software for any purpose. However, you must include the original copyright
              notice in any copies or substantial portions.{'\n\n'}

              For commercial use, please ensure compliance with all applicable laws and
              regulations in your jurisdiction.
            </Text>
          </ScrollView>

          <DialogFooter>
            <DialogClose>
              <Button variant="ghost">Decline</Button>
            </DialogClose>
            <DialogClose>
              <Button>Accept License</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Dialog>
          <DialogTrigger>
            <Button variant="secondary" size="sm">Small</Button>
          </DialogTrigger>
          <DialogContent style={styles.smallDialog}>
            <DialogHeader>
              <DialogTitle>Compact Dialog</DialogTitle>
              <DialogDescription>
                A smaller dialog for quick actions.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button size="sm">OK</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <Button variant="secondary" size="sm">Medium</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Standard Dialog</DialogTitle>
              <DialogDescription>
                Default size dialog, suitable for most use cases.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button>Continue</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <Button variant="secondary" size="sm">Large</Button>
          </DialogTrigger>
          <DialogContent style={styles.largeDialog}>
            <DialogHeader>
              <DialogTitle>Wide Dialog</DialogTitle>
              <DialogDescription>
                A larger dialog for content that needs more space, such as forms
                with multiple columns or data tables.
              </DialogDescription>
            </DialogHeader>
            <View style={styles.dialogBody}>
              <Text style={styles.bodyText}>
                Use wider dialogs sparingly. They work best for complex forms
                or content that benefits from horizontal space.
              </Text>
            </View>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button>Confirm</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    </View>
  ),
};

export const NoCloseOnOverlay: Story = {
  render: function NoCloseOnOverlayStory() {
    const [open, setOpen] = useState(false);
    const [agreed, setAgreed] = useState(false);

    return (
      <View style={styles.container}>
        <Text style={styles.hint}>Must click a button to close</Text>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button>Accept Terms</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Terms of Service</DialogTitle>
              <DialogDescription>
                Please read and accept our terms to continue.
              </DialogDescription>
            </DialogHeader>

            <View style={styles.dialogBody}>
              <Text style={styles.bodyText}>
                By clicking "I Agree", you accept our Terms of Service and
                Privacy Policy. You acknowledge that you have read and understood
                these documents in their entirety.
              </Text>
              <View style={styles.checkboxRow}>
                <Checkbox
                  checked={agreed}
                  onCheckedChange={setAgreed}
                  label="I have read and agree to the terms"
                />
              </View>
            </View>

            <DialogFooter>
              <Button variant="ghost" onPress={() => setOpen(false)}>
                Cancel
              </Button>
              <Button disabled={!agreed} onPress={() => setOpen(false)}>
                I Agree
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    );
  },
};

export const NestedDialog: Story = {
  render: () => (
    <View style={styles.container}>
      <Dialog>
        <DialogTrigger>
          <Button>Open Settings</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Manage your account settings
            </DialogDescription>
          </DialogHeader>

          <View style={styles.settingsList}>
            <View style={styles.settingsItem}>
              <View>
                <Text style={styles.settingsLabel}>Notifications</Text>
                <Text style={styles.settingsDescription}>
                  Configure notification preferences
                </Text>
              </View>
              <Switch />
            </View>

            <Separator />

            <View style={styles.settingsItem}>
              <View>
                <Text style={styles.settingsLabel}>Dark Mode</Text>
                <Text style={styles.settingsDescription}>
                  Use dark theme
                </Text>
              </View>
              <Switch defaultChecked />
            </View>

            <Separator />

            <View style={styles.settingsItem}>
              <View style={styles.settingsInfo}>
                <Text style={styles.settingsLabel}>Delete Account</Text>
                <Text style={styles.settingsDescription}>
                  Permanently remove your account
                </Text>
              </View>
              <Dialog>
                <DialogTrigger>
                  <Button variant="destructive" size="sm">Delete</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>
                      <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <DialogClose>
                      <Button variant="destructive">Delete Account</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </View>
          </View>

          <DialogFooter>
            <DialogClose>
              <Button>Done</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  ),
};

export const ImagePreview: Story = {
  render: () => (
    <View style={styles.container}>
      <Dialog>
        <DialogTrigger>
          <View style={styles.imageThumbnail}>
            <Text style={styles.thumbnailEmoji}>🏔️</Text>
            <Text style={styles.thumbnailText}>View Full Image</Text>
          </View>
        </DialogTrigger>
        <DialogContent style={styles.imageDialog}>
          <View style={styles.imagePreviewContainer}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageEmoji}>🏔️</Text>
            </View>
          </View>
          <View style={styles.imageInfo}>
            <Text style={styles.imageName}>mountain_vista.jpg</Text>
            <Text style={styles.imageMeta}>3840 × 2160 • 4.2 MB</Text>
          </View>
          <DialogFooter>
            <DialogClose>
              <Button variant="ghost">Close</Button>
            </DialogClose>
            <Button>Download</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  ),
};

export const ConfirmDelete: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.hint}>
        For destructive actions, consider using AlertDialog instead
      </Text>
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive">Delete Project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "My Awesome Project"?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <View style={styles.warningBox}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <View style={styles.warningContent}>
              <Text style={styles.warningTitle}>This will permanently delete:</Text>
              <Text style={styles.warningItem}>• 24 files and documents</Text>
              <Text style={styles.warningItem}>• 156 comments and discussions</Text>
              <Text style={styles.warningItem}>• All project history</Text>
            </View>
          </View>

          <DialogFooter>
            <DialogClose>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button variant="destructive">Delete Project</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  ),
};

export const Settings: Story = {
  render: function SettingsStory() {
    const [notifications, setNotifications] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(false);
    const [autoSave, setAutoSave] = useState(true);

    return (
      <View style={styles.container}>
        <Dialog>
          <DialogTrigger>
            <Button variant="secondary">Preferences</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Preferences</DialogTitle>
              <DialogDescription>
                Customize your experience
              </DialogDescription>
            </DialogHeader>

            <View style={styles.preferencesContainer}>
              <View style={styles.preferenceItem}>
                <View style={styles.preferenceInfo}>
                  <Text style={styles.preferenceLabel}>Push Notifications</Text>
                  <Text style={styles.preferenceDescription}>
                    Receive push notifications for important updates
                  </Text>
                </View>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </View>

              <Separator />

              <View style={styles.preferenceItem}>
                <View style={styles.preferenceInfo}>
                  <Text style={styles.preferenceLabel}>Email Updates</Text>
                  <Text style={styles.preferenceDescription}>
                    Get weekly digest emails
                  </Text>
                </View>
                <Switch
                  checked={emailUpdates}
                  onCheckedChange={setEmailUpdates}
                />
              </View>

              <Separator />

              <View style={styles.preferenceItem}>
                <View style={styles.preferenceInfo}>
                  <Text style={styles.preferenceLabel}>Auto-save</Text>
                  <Text style={styles.preferenceDescription}>
                    Automatically save your work
                  </Text>
                </View>
                <Switch
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </View>

              <Separator />

              <View style={styles.preferenceItem}>
                <View style={styles.preferenceInfo}>
                  <Text style={styles.preferenceLabel}>Language</Text>
                  <Text style={styles.preferenceDescription}>
                    Select your preferred language
                  </Text>
                </View>
                <Badge variant="secondary">English</Badge>
              </View>
            </View>

            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button>Save Changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    );
  },
};

export const VideoPlayer: Story = {
  render: () => (
    <View style={styles.container}>
      <Dialog>
        <DialogTrigger>
          <View style={styles.videoThumbnail}>
            <Text style={styles.playIcon}>▶️</Text>
            <Text style={styles.videoTitle}>Watch Demo Video</Text>
          </View>
        </DialogTrigger>
        <DialogContent style={styles.videoDialog}>
          <View style={styles.videoContainer}>
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoPlaceholderIcon}>🎬</Text>
              <Text style={styles.videoPlaceholderText}>Video Player</Text>
            </View>
            <View style={styles.videoControls}>
              <Text style={styles.videoTime}>1:24 / 3:45</Text>
              <View style={styles.progressBar}>
                <View style={styles.progressFilled} />
              </View>
              <View style={styles.controlButtons}>
                <Text style={styles.controlIcon}>⏮️</Text>
                <Text style={styles.controlIcon}>⏸️</Text>
                <Text style={styles.controlIcon}>⏭️</Text>
                <Text style={styles.controlIcon}>🔊</Text>
                <Text style={styles.controlIcon}>⛶</Text>
              </View>
            </View>
          </View>
          <View style={styles.videoInfo}>
            <Text style={styles.videoInfoTitle}>Getting Started with r-ui</Text>
            <Text style={styles.videoInfoMeta}>
              Learn how to build beautiful React Native apps with our component library.
            </Text>
          </View>
          <DialogFooter>
            <DialogClose>
              <Button variant="ghost">Close</Button>
            </DialogClose>
            <Button>Share Video</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  ),
};

// === Close Button Stories ===

export const WithCloseButton: Story = {
  render: () => (
    <View style={styles.container}>
      <Dialog>
        <DialogTrigger>
          <Button>Open with Close Button</Button>
        </DialogTrigger>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              This dialog has a built-in close button in the top-right corner.
              Click the X to close it.
            </DialogDescription>
          </DialogHeader>
          <View style={styles.dialogBody}>
            <Text style={styles.bodyText}>
              The close button provides a familiar pattern for users who expect
              an X button to dismiss dialogs.
            </Text>
          </View>
          <DialogFooter>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  ),
};

export const CloseButtonComparison: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Dialog>
          <DialogTrigger>
            <Button variant="outline">Without X</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>No Close Button</DialogTitle>
              <DialogDescription>
                This dialog requires clicking a button or the backdrop to close.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <Button>With X</Button>
          </DialogTrigger>
          <DialogContent showCloseButton>
            <DialogHeader>
              <DialogTitle>With Close Button</DialogTitle>
              <DialogDescription>
                This dialog has a built-in X button in the corner.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </View>
    </View>
  ),
};

export const WithCloseButtonAndAsChild: Story = {
  render: () => (
    <View style={styles.container}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Open (asChild trigger)</Button>
        </DialogTrigger>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>asChild Pattern</DialogTitle>
            <DialogDescription>
              This dialog uses asChild on the trigger for polymorphic rendering.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel (asChild)</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Confirm (asChild)</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  ),
};

export const CloseButtonWithForm: Story = {
  render: function CloseButtonWithFormStory() {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john@example.com');

    return (
      <View style={styles.container}>
        <Dialog>
          <DialogTrigger>
            <Button>Edit Profile</Button>
          </DialogTrigger>
          <DialogContent showCloseButton>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile. Click the X or save to close.
              </DialogDescription>
            </DialogHeader>

            <View style={styles.formContainer}>
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Name</Text>
                <Input
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Email</Text>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button>Save Changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    width: 360,
    alignItems: 'center',
    padding: 16,
  },
  hint: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  fullWidth: {
    width: '100%',
  },
  // Form
  formContainer: {
    gap: 16,
    marginVertical: 16,
  },
  formField: {
    gap: 6,
  },
  formLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    color: '#3b82f6',
    fontSize: 14,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
  },
  // Scrollable
  scrollableDialog: {
    maxHeight: '80%',
  },
  scrollContent: {
    maxHeight: 200,
    marginVertical: 16,
  },
  legalText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    lineHeight: 20,
  },
  // Sizes
  smallDialog: {
    maxWidth: 280,
  },
  largeDialog: {
    maxWidth: 500,
  },
  dialogBody: {
    marginVertical: 16,
  },
  bodyText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 22,
  },
  // No Close
  checkboxRow: {
    marginTop: 16,
  },
  // Settings
  settingsList: {
    marginVertical: 16,
    gap: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsInfo: {
    flex: 1,
  },
  settingsLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  settingsDescription: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 2,
  },
  // Image Preview
  imageThumbnail: {
    width: 120,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  thumbnailEmoji: {
    fontSize: 24,
  },
  thumbnailText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
  },
  imageDialog: {
    maxWidth: 500,
  },
  imagePreviewContainer: {
    marginVertical: 16,
  },
  imagePlaceholder: {
    height: 240,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEmoji: {
    fontSize: 80,
  },
  imageInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imageName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  imageMeta: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 4,
  },
  // Warning
  warningBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginVertical: 16,
    gap: 12,
  },
  warningIcon: {
    fontSize: 20,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  warningItem: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    lineHeight: 18,
  },
  // Preferences
  preferencesContainer: {
    marginVertical: 16,
    gap: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preferenceInfo: {
    flex: 1,
    marginRight: 16,
  },
  preferenceLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  preferenceDescription: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 2,
  },
  // Video
  videoThumbnail: {
    width: 180,
    height: 100,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  playIcon: {
    fontSize: 32,
  },
  videoTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  videoDialog: {
    maxWidth: 500,
  },
  videoContainer: {
    marginVertical: 16,
  },
  videoPlaceholder: {
    height: 220,
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  videoPlaceholderIcon: {
    fontSize: 48,
  },
  videoPlaceholderText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },
  videoControls: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: -12,
    gap: 8,
  },
  videoTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
  progressFilled: {
    width: '38%',
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  controlIcon: {
    fontSize: 18,
  },
  videoInfo: {
    marginBottom: 16,
  },
  videoInfoTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  videoInfoMeta: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    marginTop: 4,
    lineHeight: 20,
  },
});
