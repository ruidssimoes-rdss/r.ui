import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@r-ui/react-native';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// ============================================================================
// Story: Default
// ============================================================================
function DefaultSwitch() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Switch checked={checked} onCheckedChange={setChecked} />
      <Text style={styles.stateText}>
        State: {checked ? 'On' : 'Off'}
      </Text>
    </View>
  );
}

export const Default: Story = {
  render: () => <DefaultSwitch />,
};

// ============================================================================
// Story: Checked
// ============================================================================
function CheckedSwitch() {
  const [checked, setChecked] = useState(true);

  return (
    <View style={styles.container}>
      <Switch checked={checked} onCheckedChange={setChecked} />
      <Text style={styles.stateText}>
        State: {checked ? 'On' : 'Off'}
      </Text>
    </View>
  );
}

export const Checked: Story = {
  render: () => <CheckedSwitch />,
};

// ============================================================================
// Story: Disabled
// ============================================================================
export const Disabled: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.disabledRow}>
        <Switch checked={false} disabled />
        <Text style={styles.disabledLabel}>Disabled (Off)</Text>
      </View>
      <View style={styles.disabledRow}>
        <Switch checked={true} disabled />
        <Text style={styles.disabledLabel}>Disabled (On)</Text>
      </View>
    </View>
  ),
};

// ============================================================================
// Story: WithLabel
// ============================================================================
function WithLabelSwitch() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        label="Enable notifications"
      />
    </View>
  );
}

export const WithLabel: Story = {
  render: () => <WithLabelSwitch />,
};

// ============================================================================
// Story: SettingsList
// ============================================================================
function SettingsListSwitch() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoUpdate: true,
    analytics: false,
    location: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.settingsContainer}>
      <Text style={styles.settingsTitle}>Settings</Text>

      <View style={styles.settingsList}>
        <View style={styles.settingsItem}>
          <Switch
            checked={settings.notifications}
            onCheckedChange={() => toggleSetting('notifications')}
            label="Push Notifications"
            description="Receive alerts about activity"
          />
        </View>

        <View style={styles.settingsDivider} />

        <View style={styles.settingsItem}>
          <Switch
            checked={settings.darkMode}
            onCheckedChange={() => toggleSetting('darkMode')}
            label="Dark Mode"
            description="Use dark theme throughout the app"
          />
        </View>

        <View style={styles.settingsDivider} />

        <View style={styles.settingsItem}>
          <Switch
            checked={settings.autoUpdate}
            onCheckedChange={() => toggleSetting('autoUpdate')}
            label="Auto-Update"
            description="Keep app up to date automatically"
          />
        </View>

        <View style={styles.settingsDivider} />

        <View style={styles.settingsItem}>
          <Switch
            checked={settings.analytics}
            onCheckedChange={() => toggleSetting('analytics')}
            label="Usage Analytics"
            description="Help improve our service"
          />
        </View>

        <View style={styles.settingsDivider} />

        <View style={styles.settingsItem}>
          <Switch
            checked={settings.location}
            onCheckedChange={() => toggleSetting('location')}
            label="Location Services"
            description="Allow access to your location"
          />
        </View>
      </View>
    </View>
  );
}

export const SettingsList: Story = {
  render: () => <SettingsListSwitch />,
};

// ============================================================================
// Story: DarkMode
// ============================================================================
function DarkModeSwitch() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View
      style={[
        styles.darkModeContainer,
        darkMode && styles.darkModeContainerDark,
      ]}
    >
      <View style={styles.darkModeHeader}>
        <Text style={[styles.darkModeIcon, darkMode && { color: '#ffc107' }]}>
          {darkMode ? '🌙' : '☀️'}
        </Text>
        <Text style={[styles.darkModeTitle, darkMode && styles.darkModeTitleDark]}>
          Appearance
        </Text>
      </View>

      <View style={styles.darkModeRow}>
        <View style={styles.darkModeInfo}>
          <Text style={[styles.darkModeLabel, darkMode && styles.darkModeLabelDark]}>
            Dark Mode
          </Text>
          <Text style={[styles.darkModeDescription, darkMode && styles.darkModeDescriptionDark]}>
            {darkMode ? 'Currently using dark theme' : 'Currently using light theme'}
          </Text>
        </View>
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
      </View>

      <View style={[styles.previewCard, darkMode && styles.previewCardDark]}>
        <Text style={[styles.previewTitle, darkMode && styles.previewTitleDark]}>
          Preview Card
        </Text>
        <Text style={[styles.previewText, darkMode && styles.previewTextDark]}>
          This is how content will look with {darkMode ? 'dark' : 'light'} mode enabled.
        </Text>
      </View>
    </View>
  );
}

export const DarkMode: Story = {
  render: () => <DarkModeSwitch />,
};

// ============================================================================
// Story: Notifications
// ============================================================================
function NotificationsSwitch() {
  const [notifications, setNotifications] = useState({
    all: true,
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });

  const toggleAll = () => {
    const newState = !notifications.all;
    setNotifications({
      all: newState,
      email: newState,
      push: newState,
      sms: newState,
      marketing: newState,
    });
  };

  const toggleIndividual = (key: keyof Omit<typeof notifications, 'all'>) => {
    const newNotifications = { ...notifications, [key]: !notifications[key] };
    const allChecked = newNotifications.email && newNotifications.push &&
                       newNotifications.sms && newNotifications.marketing;
    setNotifications({ ...newNotifications, all: allChecked });
  };

  return (
    <View style={styles.notificationsContainer}>
      <Text style={styles.notificationsTitle}>Notification Preferences</Text>

      <View style={styles.notificationsMaster}>
        <Switch
          checked={notifications.all}
          onCheckedChange={toggleAll}
          label="All Notifications"
          description="Enable or disable all notifications at once"
        />
      </View>

      <View style={styles.notificationsDivider} />

      <View style={styles.notificationsList}>
        <View style={styles.notificationItem}>
          <View style={styles.notificationIcon}>
            <Text>📧</Text>
          </View>
          <View style={styles.notificationInfo}>
            <Text style={styles.notificationLabel}>Email</Text>
            <Text style={styles.notificationDescription}>Receive email updates</Text>
          </View>
          <Switch
            checked={notifications.email}
            onCheckedChange={() => toggleIndividual('email')}
          />
        </View>

        <View style={styles.notificationItem}>
          <View style={styles.notificationIcon}>
            <Text>🔔</Text>
          </View>
          <View style={styles.notificationInfo}>
            <Text style={styles.notificationLabel}>Push</Text>
            <Text style={styles.notificationDescription}>App notifications</Text>
          </View>
          <Switch
            checked={notifications.push}
            onCheckedChange={() => toggleIndividual('push')}
          />
        </View>

        <View style={styles.notificationItem}>
          <View style={styles.notificationIcon}>
            <Text>💬</Text>
          </View>
          <View style={styles.notificationInfo}>
            <Text style={styles.notificationLabel}>SMS</Text>
            <Text style={styles.notificationDescription}>Text message alerts</Text>
          </View>
          <Switch
            checked={notifications.sms}
            onCheckedChange={() => toggleIndividual('sms')}
          />
        </View>

        <View style={styles.notificationItem}>
          <View style={styles.notificationIcon}>
            <Text>📢</Text>
          </View>
          <View style={styles.notificationInfo}>
            <Text style={styles.notificationLabel}>Marketing</Text>
            <Text style={styles.notificationDescription}>Promotions and offers</Text>
          </View>
          <Switch
            checked={notifications.marketing}
            onCheckedChange={() => toggleIndividual('marketing')}
          />
        </View>
      </View>
    </View>
  );
}

export const Notifications: Story = {
  render: () => <NotificationsSwitch />,
};

// ============================================================================
// Story: WiFi
// ============================================================================
function WiFiSwitch() {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [connectedNetwork, setConnectedNetwork] = useState('Home_Network_5G');

  const networks = [
    { name: 'Home_Network_5G', signal: 'strong', locked: true },
    { name: 'Neighbors_WiFi', signal: 'medium', locked: true },
    { name: 'Coffee_Shop_Free', signal: 'weak', locked: false },
    { name: 'Office_Guest', signal: 'medium', locked: true },
  ];

  return (
    <View style={styles.wifiContainer}>
      <View style={styles.wifiHeader}>
        <View style={styles.wifiTitleRow}>
          <Text style={styles.wifiIcon}>📶</Text>
          <Text style={styles.wifiTitle}>Wi-Fi</Text>
        </View>
        <Switch checked={wifiEnabled} onCheckedChange={setWifiEnabled} />
      </View>

      {wifiEnabled ? (
        <>
          <View style={styles.wifiConnected}>
            <Text style={styles.wifiConnectedLabel}>Connected to</Text>
            <Text style={styles.wifiConnectedNetwork}>{connectedNetwork}</Text>
          </View>

          <Text style={styles.wifiNetworksTitle}>Available Networks</Text>
          <View style={styles.wifiNetworks}>
            {networks.map((network) => (
              <Pressable
                key={network.name}
                style={[
                  styles.wifiNetwork,
                  network.name === connectedNetwork && styles.wifiNetworkConnected,
                ]}
                onPress={() => setConnectedNetwork(network.name)}
              >
                <Text style={styles.wifiNetworkName}>{network.name}</Text>
                <View style={styles.wifiNetworkIcons}>
                  {network.locked && <Text style={styles.wifiLockIcon}>🔒</Text>}
                  <Text style={styles.wifiSignalIcon}>
                    {network.signal === 'strong' ? '📶' : network.signal === 'medium' ? '📶' : '📶'}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.wifiDisabled}>
          <Text style={styles.wifiDisabledText}>
            Wi-Fi is turned off. Enable it to see available networks.
          </Text>
        </View>
      )}
    </View>
  );
}

export const WiFi: Story = {
  render: () => <WiFiSwitch />,
};

// ============================================================================
// Story: Controlled
// ============================================================================
function ControlledSwitch() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.controlledContainer}>
      <Text style={styles.controlledTitle}>Controlled Switch</Text>

      <View style={styles.controlledButtons}>
        <Pressable
          style={[styles.controlledButton, checked && styles.controlledButtonActive]}
          onPress={() => setChecked(true)}
        >
          <Text style={[styles.controlledButtonText, checked && styles.controlledButtonTextActive]}>
            Turn ON
          </Text>
        </Pressable>
        <Pressable
          style={[styles.controlledButton, !checked && styles.controlledButtonActive]}
          onPress={() => setChecked(false)}
        >
          <Text style={[styles.controlledButtonText, !checked && styles.controlledButtonTextActive]}>
            Turn OFF
          </Text>
        </Pressable>
      </View>

      <View style={styles.controlledSwitchRow}>
        <Switch checked={checked} onCheckedChange={setChecked} />
        <Text style={styles.controlledState}>
          {checked ? 'ON' : 'OFF'}
        </Text>
      </View>

      <Text style={styles.controlledHint}>
        The switch can be controlled both by tapping it or using the buttons above
      </Text>
    </View>
  );
}

export const Controlled: Story = {
  render: () => <ControlledSwitch />,
};

// ============================================================================
// Story: FormField
// ============================================================================
function FormFieldSwitch() {
  const [preferences, setPreferences] = useState({
    publicProfile: true,
    showEmail: false,
    twoFactor: false,
  });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Privacy Settings</Text>
      <Text style={styles.formDescription}>
        Manage your privacy and security preferences.
      </Text>

      <View style={styles.formFields}>
        <View style={styles.formField}>
          <View style={styles.formFieldHeader}>
            <Text style={styles.formFieldLabel}>Public Profile</Text>
            <Switch
              checked={preferences.publicProfile}
              onCheckedChange={() => togglePreference('publicProfile')}
            />
          </View>
          <Text style={styles.formFieldDescription}>
            Allow others to see your profile
          </Text>
        </View>

        <View style={styles.formDivider} />

        <View style={styles.formField}>
          <View style={styles.formFieldHeader}>
            <Text style={styles.formFieldLabel}>Show Email</Text>
            <Switch
              checked={preferences.showEmail}
              onCheckedChange={() => togglePreference('showEmail')}
            />
          </View>
          <Text style={styles.formFieldDescription}>
            Display email on your public profile
          </Text>
          {!preferences.publicProfile && (
            <Text style={styles.formFieldWarning}>
              ⚠️ This requires a public profile
            </Text>
          )}
        </View>

        <View style={styles.formDivider} />

        <View style={styles.formField}>
          <View style={styles.formFieldHeader}>
            <View style={styles.formFieldLabelRow}>
              <Text style={styles.formFieldLabel}>Two-Factor Auth</Text>
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedBadgeText}>Recommended</Text>
              </View>
            </View>
            <Switch
              checked={preferences.twoFactor}
              onCheckedChange={() => togglePreference('twoFactor')}
            />
          </View>
          <Text style={styles.formFieldDescription}>
            Add an extra layer of security to your account
          </Text>
        </View>
      </View>

      <Pressable style={styles.formSaveButton}>
        <Text style={styles.formSaveButtonText}>Save Changes</Text>
      </Pressable>
    </View>
  );
}

export const FormField: Story = {
  render: () => <FormFieldSwitch />,
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    gap: 16,
  },
  stateText: {
    fontSize: 14,
    color: '#666',
  },
  disabledRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  disabledLabel: {
    fontSize: 14,
    color: '#999',
  },
  settingsContainer: {
    width: 360,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  settingsList: {},
  settingsItem: {
    paddingVertical: 12,
  },
  settingsDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  darkModeContainer: {
    width: 360,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  darkModeContainerDark: {
    backgroundColor: '#1a1a2e',
    borderColor: '#333',
  },
  darkModeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  darkModeIcon: {
    fontSize: 24,
  },
  darkModeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  darkModeTitleDark: {
    color: '#fff',
  },
  darkModeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  darkModeInfo: {
    flex: 1,
  },
  darkModeLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  darkModeLabelDark: {
    color: '#fff',
  },
  darkModeDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  darkModeDescriptionDark: {
    color: '#999',
  },
  previewCard: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  previewCardDark: {
    backgroundColor: '#2d2d44',
    borderColor: '#444',
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  previewTitleDark: {
    color: '#fff',
  },
  previewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  previewTextDark: {
    color: '#aaa',
  },
  notificationsContainer: {
    width: 360,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  notificationsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  notificationsMaster: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  notificationsDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  notificationsList: {
    gap: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationInfo: {
    flex: 1,
  },
  notificationLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  notificationDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  wifiContainer: {
    width: 360,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  wifiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  wifiTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  wifiIcon: {
    fontSize: 24,
  },
  wifiTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  wifiConnected: {
    padding: 16,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    marginBottom: 20,
  },
  wifiConnectedLabel: {
    fontSize: 12,
    color: '#2e7d32',
    marginBottom: 4,
  },
  wifiConnectedNetwork: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1b5e20',
  },
  wifiNetworksTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 12,
  },
  wifiNetworks: {
    gap: 8,
  },
  wifiNetwork: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  wifiNetworkConnected: {
    backgroundColor: '#e3f2fd',
    borderColor: '#90caf9',
  },
  wifiNetworkName: {
    fontSize: 14,
    color: '#333',
  },
  wifiNetworkIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  wifiLockIcon: {
    fontSize: 14,
  },
  wifiSignalIcon: {
    fontSize: 14,
  },
  wifiDisabled: {
    padding: 24,
    alignItems: 'center',
  },
  wifiDisabledText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  controlledContainer: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    gap: 20,
  },
  controlledTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  controlledButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  controlledButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  controlledButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  controlledButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  controlledButtonTextActive: {
    color: '#fff',
  },
  controlledSwitchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  controlledState: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  controlledHint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  formContainer: {
    width: 360,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  formDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  formFields: {},
  formField: {
    paddingVertical: 12,
  },
  formFieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  formFieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  formFieldLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  formFieldDescription: {
    fontSize: 13,
    color: '#666',
  },
  formFieldWarning: {
    fontSize: 12,
    color: '#ff9800',
    marginTop: 4,
  },
  recommendedBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  recommendedBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1976d2',
  },
  formDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  formSaveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  formSaveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
