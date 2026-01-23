// Mock for expo-haptics for web
// Haptic feedback is not available on web, so we provide no-op implementations

const ImpactFeedbackStyle = {
  Light: 'light',
  Medium: 'medium',
  Heavy: 'heavy',
  Soft: 'soft',
  Rigid: 'rigid',
};

const NotificationFeedbackType = {
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
};

// No-op haptic functions
async function impactAsync(style) {
  // No haptics on web
}

async function notificationAsync(type) {
  // No haptics on web
}

async function selectionAsync() {
  // No haptics on web
}

module.exports = {
  ImpactFeedbackStyle,
  NotificationFeedbackType,
  impactAsync,
  notificationAsync,
  selectionAsync,
  default: {
    ImpactFeedbackStyle,
    NotificationFeedbackType,
    impactAsync,
    notificationAsync,
    selectionAsync,
  },
};
