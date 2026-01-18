import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
  Button,
  Input,
  Checkbox,
  Switch,
  Separator,
  Badge,
} from '@r-ui/react-native';

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => (
    <View style={styles.container}>
      <Sheet>
        <SheetTrigger>
          <Button>Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>
              This is a basic bottom sheet that slides up from the bottom of the screen.
            </SheetDescription>
          </SheetHeader>
          <View style={styles.sheetBody}>
            <Text style={styles.bodyText}>
              Add your content here. Sheets are great for displaying
              additional information or actions without navigating away.
            </Text>
          </View>
          <SheetFooter>
            <SheetClose>
              <Button variant="ghost">Cancel</Button>
            </SheetClose>
            <SheetClose>
              <Button>Confirm</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </View>
  ),
};

export const FromTop: Story = {
  render: () => (
    <View style={styles.container}>
      <Sheet side="top">
        <SheetTrigger>
          <Button>Open from Top</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Notification Center</SheetTitle>
            <SheetDescription>
              Your recent notifications will appear here.
            </SheetDescription>
          </SheetHeader>
          <View style={styles.notificationList}>
            {['New message from Sarah', 'Your order has shipped', 'Payment confirmed'].map((notification, i) => (
              <View key={i} style={styles.notificationItem}>
                <Text style={styles.notificationText}>{notification}</Text>
                <Text style={styles.notificationTime}>{i + 1}h ago</Text>
              </View>
            ))}
          </View>
        </SheetContent>
      </Sheet>
    </View>
  ),
};

export const FromLeft: Story = {
  render: () => (
    <View style={styles.container}>
      <Sheet side="left">
        <SheetTrigger>
          <Button>Open Drawer (Left)</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <View style={styles.navList}>
            {[
              { icon: '🏠', label: 'Home' },
              { icon: '👤', label: 'Profile' },
              { icon: '⚙️', label: 'Settings' },
              { icon: '📊', label: 'Analytics' },
              { icon: '💬', label: 'Messages' },
              { icon: '❓', label: 'Help' },
            ].map((item, i) => (
              <View key={i} style={styles.navItem}>
                <Text style={styles.navIcon}>{item.icon}</Text>
                <Text style={styles.navLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
          <SheetFooter>
            <SheetClose>
              <Button variant="ghost" style={styles.fullWidth}>
                Sign Out
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </View>
  ),
};

export const FromRight: Story = {
  render: () => (
    <View style={styles.container}>
      <Sheet side="right">
        <SheetTrigger>
          <Button>Open Drawer (Right)</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>3 items in your cart</SheetDescription>
          </SheetHeader>
          <View style={styles.cartList}>
            {[
              { name: 'Wireless Headphones', price: '$299', qty: 1 },
              { name: 'USB-C Cable', price: '$19', qty: 2 },
              { name: 'Phone Case', price: '$49', qty: 1 },
            ].map((item, i) => (
              <View key={i} style={styles.cartItem}>
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemQty}>Qty: {item.qty}</Text>
                </View>
                <Text style={styles.cartItemPrice}>{item.price}</Text>
              </View>
            ))}
          </View>
          <Separator />
          <View style={styles.cartTotal}>
            <Text style={styles.cartTotalLabel}>Total</Text>
            <Text style={styles.cartTotalPrice}>$386.00</Text>
          </View>
          <SheetFooter>
            <Button style={styles.fullWidth}>Checkout</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </View>
  ),
};

export const WithHandle: Story = {
  render: () => (
    <View style={styles.container}>
      <Sheet>
        <SheetTrigger>
          <Button>Open with Handle</Button>
        </SheetTrigger>
        <SheetContent>
          <View style={styles.handleIndicator} />
          <SheetHeader>
            <SheetTitle>Drag to Dismiss</SheetTitle>
            <SheetDescription>
              This sheet has a drag handle indicator at the top.
            </SheetDescription>
          </SheetHeader>
          <View style={styles.sheetBody}>
            <Text style={styles.bodyText}>
              The handle provides a visual cue that this sheet can be
              dragged to dismiss. Common pattern on mobile apps.
            </Text>
          </View>
        </SheetContent>
      </Sheet>
    </View>
  ),
};

export const EditProfile: Story = {
  render: function EditProfileStory() {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john@example.com');
    const [bio, setBio] = useState('Product designer & developer');

    return (
      <View style={styles.container}>
        <Sheet>
          <SheetTrigger>
            <Button>Edit Profile</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit Profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
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
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Bio</Text>
                <Input
                  value={bio}
                  onChangeText={setBio}
                  placeholder="Tell us about yourself"
                />
              </View>
            </View>
            <SheetFooter>
              <SheetClose>
                <Button variant="ghost">Cancel</Button>
              </SheetClose>
              <SheetClose>
                <Button>Save Changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </View>
    );
  },
};

export const FilterPanel: Story = {
  render: function FilterPanelStory() {
    const [priceRange, setPriceRange] = useState({ min: false, mid: true, max: false });
    const [inStock, setInStock] = useState(true);
    const [freeShipping, setFreeShipping] = useState(false);

    return (
      <View style={styles.container}>
        <Sheet>
          <SheetTrigger>
            <Button variant="secondary">
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Narrow down your search results
              </SheetDescription>
            </SheetHeader>

            <ScrollView style={styles.filterContainer}>
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Price Range</Text>
                <View style={styles.filterOption}>
                  <Checkbox
                    checked={priceRange.min}
                    onCheckedChange={(checked) => setPriceRange({ ...priceRange, min: checked })}
                    label="Under $50"
                  />
                </View>
                <View style={styles.filterOption}>
                  <Checkbox
                    checked={priceRange.mid}
                    onCheckedChange={(checked) => setPriceRange({ ...priceRange, mid: checked })}
                    label="$50 - $200"
                  />
                </View>
                <View style={styles.filterOption}>
                  <Checkbox
                    checked={priceRange.max}
                    onCheckedChange={(checked) => setPriceRange({ ...priceRange, max: checked })}
                    label="Over $200"
                  />
                </View>
              </View>

              <Separator />

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Availability</Text>
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>In Stock Only</Text>
                  <Switch checked={inStock} onCheckedChange={setInStock} />
                </View>
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>Free Shipping</Text>
                  <Switch checked={freeShipping} onCheckedChange={setFreeShipping} />
                </View>
              </View>

              <Separator />

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Categories</Text>
                {['Electronics', 'Clothing', 'Home & Garden', 'Sports'].map((category, i) => (
                  <View key={i} style={styles.filterOption}>
                    <Checkbox label={category} />
                  </View>
                ))}
              </View>
            </ScrollView>

            <SheetFooter>
              <Button variant="ghost">Clear All</Button>
              <SheetClose>
                <Button>Apply Filters</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </View>
    );
  },
};

export const ShareSheet: Story = {
  render: () => (
    <View style={styles.container}>
      <Sheet>
        <SheetTrigger>
          <Button>Share</Button>
        </SheetTrigger>
        <SheetContent>
          <View style={styles.handleIndicator} />
          <SheetHeader>
            <SheetTitle>Share</SheetTitle>
          </SheetHeader>

          <View style={styles.shareGrid}>
            {[
              { icon: '💬', label: 'Message', color: '#22c55e' },
              { icon: '📧', label: 'Email', color: '#3b82f6' },
              { icon: '🐦', label: 'Twitter', color: '#1da1f2' },
              { icon: '📘', label: 'Facebook', color: '#4267b2' },
              { icon: '📸', label: 'Instagram', color: '#e1306c' },
              { icon: '🔗', label: 'Copy Link', color: '#6b7280' },
            ].map((option, i) => (
              <SheetClose key={i}>
                <View style={styles.shareOption}>
                  <View style={[styles.shareIconBg, { backgroundColor: option.color + '20' }]}>
                    <Text style={styles.shareIcon}>{option.icon}</Text>
                  </View>
                  <Text style={styles.shareLabel}>{option.label}</Text>
                </View>
              </SheetClose>
            ))}
          </View>

          <Separator style={styles.shareSeparator} />

          <View style={styles.shareActions}>
            <SheetClose>
              <View style={styles.shareAction}>
                <Text style={styles.shareActionIcon}>📋</Text>
                <Text style={styles.shareActionLabel}>Copy</Text>
              </View>
            </SheetClose>
            <SheetClose>
              <View style={styles.shareAction}>
                <Text style={styles.shareActionIcon}>🖨️</Text>
                <Text style={styles.shareActionLabel}>Print</Text>
              </View>
            </SheetClose>
            <SheetClose>
              <View style={styles.shareAction}>
                <Text style={styles.shareActionIcon}>💾</Text>
                <Text style={styles.shareActionLabel}>Save</Text>
              </View>
            </SheetClose>
          </View>
        </SheetContent>
      </Sheet>
    </View>
  ),
};

export const Comments: Story = {
  render: function CommentsStory() {
    const [comment, setComment] = useState('');

    const comments = [
      { id: 1, author: 'Sarah', text: 'This is amazing! Love the design.', time: '2h ago' },
      { id: 2, author: 'Mike', text: 'Great work on this project 👏', time: '4h ago' },
      { id: 3, author: 'Emily', text: 'Can you share how you made this?', time: '1d ago' },
    ];

    return (
      <View style={styles.container}>
        <Sheet>
          <SheetTrigger>
            <Button variant="secondary">
              View Comments
            </Button>
          </SheetTrigger>
          <SheetContent>
            <View style={styles.handleIndicator} />
            <SheetHeader>
              <View style={styles.commentsHeader}>
                <SheetTitle>Comments</SheetTitle>
                <Badge variant="secondary" size="sm">{comments.length}</Badge>
              </View>
            </SheetHeader>

            <ScrollView style={styles.commentsList}>
              {comments.map((item) => (
                <View key={item.id} style={styles.commentItem}>
                  <View style={styles.commentAvatar}>
                    <Text style={styles.commentAvatarText}>
                      {item.author.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.commentContent}>
                    <View style={styles.commentMeta}>
                      <Text style={styles.commentAuthor}>{item.author}</Text>
                      <Text style={styles.commentTime}>{item.time}</Text>
                    </View>
                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.commentInput}>
              <Input
                value={comment}
                onChangeText={setComment}
                placeholder="Add a comment..."
                style={styles.commentInputField}
              />
              <Button size="sm" disabled={!comment.trim()}>
                Post
              </Button>
            </View>
          </SheetContent>
        </Sheet>
      </View>
    );
  },
};

export const FullHeight: Story = {
  render: () => (
    <View style={styles.container}>
      <Sheet>
        <SheetTrigger>
          <Button>Open Full Sheet</Button>
        </SheetTrigger>
        <SheetContent style={styles.fullHeightSheet}>
          <View style={styles.handleIndicator} />
          <SheetHeader>
            <SheetTitle>Terms of Service</SheetTitle>
            <SheetDescription>Last updated: January 2026</SheetDescription>
          </SheetHeader>

          <ScrollView style={styles.fullHeightContent}>
            <Text style={styles.legalText}>
              Welcome to our service. By accessing or using our platform, you agree
              to be bound by these Terms of Service.{'\n\n'}

              1. ACCEPTANCE OF TERMS{'\n'}
              By using this service, you acknowledge that you have read, understood,
              and agree to be bound by these terms. If you do not agree with any part
              of these terms, you must not use our service.{'\n\n'}

              2. USE LICENSE{'\n'}
              Permission is granted to temporarily access the materials on our platform
              for personal, non-commercial transitory viewing only. This is the grant
              of a license, not a transfer of title.{'\n\n'}

              3. USER RESPONSIBILITIES{'\n'}
              You are responsible for maintaining the confidentiality of your account
              and password and for restricting access to your computer.{'\n\n'}

              4. DISCLAIMER{'\n'}
              The materials on our platform are provided on an 'as is' basis. We make
              no warranties, expressed or implied.{'\n\n'}

              5. LIMITATIONS{'\n'}
              In no event shall our company be liable for any damages arising out of
              the use or inability to use the materials on our platform.{'\n\n'}

              6. REVISIONS{'\n'}
              We may revise these terms of service at any time without notice. By using
              this platform, you agree to be bound by the current version of these terms.
            </Text>
          </ScrollView>

          <SheetFooter>
            <SheetClose>
              <Button variant="ghost">Decline</Button>
            </SheetClose>
            <SheetClose>
              <Button>Accept</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    width: 360,
    alignItems: 'center',
    padding: 16,
  },
  sheetBody: {
    paddingVertical: 16,
  },
  bodyText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 22,
  },
  handleIndicator: {
    width: 36,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  fullWidth: {
    width: '100%',
  },
  // Notifications
  notificationList: {
    gap: 12,
    paddingVertical: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  notificationText: {
    color: '#ffffff',
    fontSize: 14,
    flex: 1,
  },
  notificationTime: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  // Navigation
  navList: {
    gap: 4,
    paddingVertical: 16,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
  },
  navIcon: {
    fontSize: 20,
  },
  navLabel: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },
  // Cart
  cartList: {
    gap: 12,
    paddingVertical: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  cartItemQty: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  cartItemPrice: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  cartTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  cartTotalLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  cartTotalPrice: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  // Form
  formContainer: {
    gap: 16,
    paddingVertical: 16,
  },
  formField: {
    gap: 6,
  },
  formLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
  // Filters
  filterContainer: {
    maxHeight: 300,
  },
  filterSection: {
    paddingVertical: 16,
    gap: 12,
  },
  filterSectionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  filterOption: {
    paddingVertical: 2,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  // Share
  shareGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  shareOption: {
    alignItems: 'center',
    width: 80,
    gap: 8,
  },
  shareIconBg: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    fontSize: 24,
  },
  shareLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  shareSeparator: {
    marginVertical: 8,
  },
  shareActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  shareAction: {
    alignItems: 'center',
    gap: 4,
  },
  shareActionIcon: {
    fontSize: 24,
  },
  shareActionLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  // Comments
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  commentsList: {
    maxHeight: 250,
    marginVertical: 16,
  },
  commentItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentAvatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  commentContent: {
    flex: 1,
  },
  commentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  commentAuthor: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  commentTime: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  commentText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 20,
  },
  commentInput: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  commentInputField: {
    flex: 1,
  },
  // Full Height
  fullHeightSheet: {
    height: '90%',
  },
  fullHeightContent: {
    flex: 1,
    marginVertical: 16,
  },
  legalText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 22,
  },
});
