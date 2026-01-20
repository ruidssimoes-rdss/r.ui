export const ruleExplanations: Record<
  string,
  {
    title: string;
    why: string;
    impact: string;
    learnMore: string;
  }
> = {
  'missing-accessibility-label': {
    title: 'Missing Accessibility Label',
    why: "Screen readers announce buttons by their label. Without one, blind users hear \"button\" with no context about what it does.",
    impact:
      'Affects ~2.2% of users who rely on screen readers. Also impacts voice control users who navigate by speaking button names.',
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
  },
  'missing-accessibility-role': {
    title: 'Missing Accessibility Role',
    why: 'The accessibility role tells assistive technology what type of element this is. Without it, a Pressable might not be announced as a button.',
    impact: 'Screen reader users may not know the element is interactive.',
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
  },
  'touchable-missing-feedback': {
    title: 'No Touch Feedback',
    why: "TouchableWithoutFeedback provides no visual response when pressed. Users can't tell if their tap registered.",
    impact: 'Creates uncertainty — users may tap multiple times thinking the first tap failed.',
    learnMore: 'https://reactnative.dev/docs/pressable',
  },
  'image-missing-alt': {
    title: 'Image Missing Alt Text',
    why: 'Images without descriptions are invisible to screen reader users. They\'ll hear nothing or just "image".',
    impact: 'Critical content may be completely missed by blind users.',
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html',
  },
  'small-touch-target': {
    title: 'Touch Target Too Small',
    why: 'Small targets are hard to tap accurately, especially for users with motor impairments or on mobile devices.',
    impact: 'WCAG recommends minimum 44x44px. Smaller targets increase mis-taps and frustration.',
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/target-size.html',
  },
  'hardcoded-color': {
    title: 'Hardcoded Color Value',
    why: "Hardcoded colors bypass your design system. They won't update with theme changes and may not meet contrast requirements.",
    impact: 'Creates inconsistency and makes dark mode support harder.',
    learnMore: '/docs/theming',
  },
  'hardcoded-spacing': {
    title: 'Non-Standard Spacing',
    why: 'Using arbitrary spacing values (like 13px) breaks visual rhythm. Design systems use consistent scales (4, 8, 12, 16...).',
    impact: 'Subtle visual inconsistency that makes the UI feel "off".',
    learnMore: '/docs/tokens',
  },
  'inconsistent-radius': {
    title: 'Non-Standard Border Radius',
    why: 'Random radius values create inconsistent curves throughout your UI.',
    impact: 'Minor visual issue, but contributes to an unpolished feel.',
    learnMore: '/docs/tokens',
  },
  'missing-dark-mode': {
    title: 'Missing Dark Mode Variant',
    why: 'Using light-only colors (like bg-white) without dark: variants means dark mode will look broken.',
    impact: 'Dark mode users see incorrect colors or poor contrast.',
    learnMore: '/docs/theming',
  },
  'non-token-font-size': {
    title: 'Non-Standard Font Size',
    why: 'Typography scales exist for visual harmony. Arbitrary sizes (like 13px) break the rhythm.',
    impact: 'Text may look inconsistent with the rest of the UI.',
    learnMore: '/docs/typography',
  },
};
