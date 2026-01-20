import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { ComponentPageHeader } from '@/components/ComponentPageHeader';
import {
  GuideLayout,
  QuickStartCard,
  InfoCard,
  FeatureGrid,
  FeatureCard,
} from '@/components/GuideLayout';

// Import React Native components from client wrapper for live previews
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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Alert,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  View,
  Text,
  Pressable,
} from '@/components/RNComponents';

// Import pre-built preview components (these handle interactivity)
import {
  // Button
  ButtonVariantsPreview,
  ButtonSizesPreview,
  ButtonLoadingPreview,
  ButtonDisabledPreview,
  // Switch
  SwitchBasicPreview,
  SwitchWithLabelPreview,
  SwitchDisabledPreview,
  // Input
  InputBasicPreview,
  InputWithLabelPreview,
  InputErrorPreview,
  InputSizesPreview,
  InputDisabledPreview,
  // Badge
  BadgeVariantsPreview,
  BadgeSizesPreview,
  // Progress
  ProgressBasicPreview,
  ProgressAnimatedPreview,
  ProgressVariantsPreview,
  ProgressSizesPreview,
  // Checkbox
  CheckboxBasicPreview,
  CheckboxWithLabelPreview,
  CheckboxDisabledPreview,
  // Slider
  SliderBasicPreview,
  SliderWithLabelsPreview,
  SliderRangePreview,
  SliderDisabledPreview,
  // Tabs
  TabsBasicPreview,
  TabsWithContentPreview,
  TabsPillVariantPreview,
  // Accordion
  AccordionBasicPreview,
  AccordionMultiplePreview,
  AccordionWithContentPreview,
  // Dialog
  DialogBasicPreview,
  DialogWithFormPreview,
  DialogAlertPreview,
  // Card
  CardBasicPreview,
  CardWithHeaderPreview,
  CardWithImagePreview,
  CardInteractivePreview,
  // Alert
  AlertBasicPreview,
  AlertVariantsPreview,
  AlertWithoutTitlePreview,
  // Toast
  ToastBasicPreview,
  ToastVariantsPreview,
  ToastStaticPreview,
  // Sheet
  SheetBasicPreview,
  SheetBottomPreview,
  SheetWithFormPreview,
  // Popover
  PopoverBasicPreview,
  PopoverWithFormPreview,
  PopoverMenuPreview,
  // Tooltip
  TooltipBasicPreview,
  TooltipSidesPreview,
  TooltipWithIconsPreview,
  // Dropdown
  DropdownBasicPreview,
  DropdownWithIconsPreview,
  DropdownDisabledItemsPreview,
  // Select
  SelectBasicPreview,
  SelectWithLabelPreview,
  SelectDisabledOptionsPreview,
  SelectDisabledPreview,
  // Textarea
  TextareaBasicPreview,
  TextareaWithLabelPreview,
  TextareaDisabledPreview,
  TextareaErrorPreview,
  // RadioGroup
  RadioGroupBasicPreview,
  RadioGroupWithDescriptionsPreview,
  RadioGroupDisabledPreview,
  RadioGroupCardsPreview,
  // Skeleton
  SkeletonBasicPreview,
  SkeletonCardPreview,
  SkeletonTablePreview,
  SkeletonListPreview,
  // Spinner
  SpinnerBasicPreview,
  SpinnerSizesPreview,
  SpinnerColorsPreview,
  SpinnerWithTextPreview,
  SpinnerButtonPreview,
  // Avatar
  AvatarBasicPreview,
  AvatarSizesPreview,
  AvatarGroupPreview,
  AvatarWithStatusPreview,
  // Table
  TableBasicPreview,
  TableStripedPreview,
  TableWithActionsPreview,
  // Separator
  SeparatorBasicPreview,
  SeparatorVerticalPreview,
  SeparatorWithLabelPreview,
  SeparatorInCardPreview,
  // Collapsible
  CollapsibleBasicPreview,
  CollapsibleWithContentPreview,
  CollapsibleFAQPreview,
  // OTPInput
  OTPInputBasicPreview,
  OTPInputWithSeparatorPreview,
  OTPInputFourDigitsPreview,
  OTPInputMaskedPreview,
  OTPInputErrorPreview,
  OTPInputDisabledPreview,
  OTPInputPrefilledPreview,
  // Combobox
  ComboboxBasicPreview,
  ComboboxWithGroupsPreview,
  ComboboxDisabledPreview,
  ComboboxWithDisabledItemsPreview,
  // DatePicker
  DatePickerBasicPreview,
  DatePickerWithDefaultPreview,
  DatePickerWithMinMaxPreview,
  DatePickerNoWeekendsPreview,
  DatePickerDisabledPreview,
  DatePickerCustomFormatPreview,
  // TimePicker
  TimePickerBasicPreview,
  TimePickerWithDefaultPreview,
  TimePicker24HourPreview,
  TimePickerWithIntervalPreview,
  TimePickerWithMinMaxPreview,
  TimePickerDisabledPreview,
  TimePickerCustomFormatPreview,
  // DateRangePicker
  DateRangePickerBasicPreview,
  DateRangePickerWithDefaultPreview,
  DateRangePickerWithPresetsPreview,
  DateRangePickerNoPresetsPreview,
  DateRangePickerWithMinMaxPreview,
  DateRangePickerDisabledPreview,
  DateRangePickerNoWeekendsPreview,
} from '@/components/previews';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Typography - improved hierarchy with more breathing room
    h1: ({ children }) => <ComponentPageHeader>{children}</ComponentPageHeader>,
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold mt-14 mb-5 text-gray-900 pb-3 border-b border-gray-100 scroll-mt-24">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-semibold mt-10 mb-4 text-gray-900 scroll-mt-24">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-sm font-semibold mt-6 mb-3 text-gray-800 scroll-mt-24">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="text-[15px] text-gray-600 mb-5 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="text-[15px] text-gray-600 mb-6 leading-relaxed list-disc pl-5 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="text-[15px] text-gray-600 mb-6 leading-relaxed list-decimal pl-5 space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-600 pl-1">{children}</li>
    ),
    // Horizontal rule - subtle visual separator
    hr: () => (
      <hr className="my-10 border-0 h-px bg-gray-100" />
    ),
    // Blockquote - for callouts
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-4 border-l-2 border-gray-200 text-gray-600 italic">
        {children}
      </blockquote>
    ),
    // Inline code - more subtle styling
    code: ({ children }) => (
      <code className="text-[13px] font-mono text-gray-700 bg-gray-100/70 px-1.5 py-0.5 rounded-md">
        {children}
      </code>
    ),
    // Code blocks - premium styling with subtle shadow
    pre: ({ children }) => (
      <div className="my-6 bg-[#FAFAFA] border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <pre className="p-5 overflow-x-auto text-[13px] font-mono text-gray-800 leading-relaxed">
          {children}
        </pre>
      </div>
    ),
    // Tables - cleaner design
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="text-left px-4 py-3 bg-gray-50 border-b border-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-wide">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 border-b border-gray-50 text-gray-600 text-sm">
        {children}
      </td>
    ),
    // Links - more subtle
    a: ({ children, href }) => (
      <a href={href} className="text-gray-800 font-medium underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">
        {children}
      </a>
    ),
    // Strong/Bold
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    // Documentation components
    CodeBlock,
    ComponentPreview,
    ComponentPageHeader,
    // Pre-built preview components (handle interactivity)
    // Button
    ButtonVariantsPreview,
    ButtonSizesPreview,
    ButtonLoadingPreview,
    ButtonDisabledPreview,
    // Switch
    SwitchBasicPreview,
    SwitchWithLabelPreview,
    SwitchDisabledPreview,
    // Input
    InputBasicPreview,
    InputWithLabelPreview,
    InputErrorPreview,
    InputSizesPreview,
    InputDisabledPreview,
    // Badge
    BadgeVariantsPreview,
    BadgeSizesPreview,
    // Progress
    ProgressBasicPreview,
    ProgressAnimatedPreview,
    ProgressVariantsPreview,
    ProgressSizesPreview,
    // Checkbox
    CheckboxBasicPreview,
    CheckboxWithLabelPreview,
    CheckboxDisabledPreview,
    // Slider
    SliderBasicPreview,
    SliderWithLabelsPreview,
    SliderRangePreview,
    SliderDisabledPreview,
    // Tabs
    TabsBasicPreview,
    TabsWithContentPreview,
    TabsPillVariantPreview,
    // Accordion
    AccordionBasicPreview,
    AccordionMultiplePreview,
    AccordionWithContentPreview,
    // Dialog
    DialogBasicPreview,
    DialogWithFormPreview,
    DialogAlertPreview,
    // Card
    CardBasicPreview,
    CardWithHeaderPreview,
    CardWithImagePreview,
    CardInteractivePreview,
    // Alert
    AlertBasicPreview,
    AlertVariantsPreview,
    AlertWithoutTitlePreview,
    // Toast
    ToastBasicPreview,
    ToastVariantsPreview,
    ToastStaticPreview,
    // Sheet
    SheetBasicPreview,
    SheetBottomPreview,
    SheetWithFormPreview,
    // Popover
    PopoverBasicPreview,
    PopoverWithFormPreview,
    PopoverMenuPreview,
    // Tooltip
    TooltipBasicPreview,
    TooltipSidesPreview,
    TooltipWithIconsPreview,
    // Dropdown
    DropdownBasicPreview,
    DropdownWithIconsPreview,
    DropdownDisabledItemsPreview,
    // Select
    SelectBasicPreview,
    SelectWithLabelPreview,
    SelectDisabledOptionsPreview,
    SelectDisabledPreview,
    // Textarea
    TextareaBasicPreview,
    TextareaWithLabelPreview,
    TextareaDisabledPreview,
    TextareaErrorPreview,
    // RadioGroup
    RadioGroupBasicPreview,
    RadioGroupWithDescriptionsPreview,
    RadioGroupDisabledPreview,
    RadioGroupCardsPreview,
    // Skeleton
    SkeletonBasicPreview,
    SkeletonCardPreview,
    SkeletonTablePreview,
    SkeletonListPreview,
    // Spinner
    SpinnerBasicPreview,
    SpinnerSizesPreview,
    SpinnerColorsPreview,
    SpinnerWithTextPreview,
    SpinnerButtonPreview,
    // Avatar
    AvatarBasicPreview,
    AvatarSizesPreview,
    AvatarGroupPreview,
    AvatarWithStatusPreview,
    // Table
    TableBasicPreview,
    TableStripedPreview,
    TableWithActionsPreview,
    // Separator
    SeparatorBasicPreview,
    SeparatorVerticalPreview,
    SeparatorWithLabelPreview,
    SeparatorInCardPreview,
    // Collapsible
    CollapsibleBasicPreview,
    CollapsibleWithContentPreview,
    CollapsibleFAQPreview,
    // OTPInput
    OTPInputBasicPreview,
    OTPInputWithSeparatorPreview,
    OTPInputFourDigitsPreview,
    OTPInputMaskedPreview,
    OTPInputErrorPreview,
    OTPInputDisabledPreview,
    OTPInputPrefilledPreview,
    // Combobox
    ComboboxBasicPreview,
    ComboboxWithGroupsPreview,
    ComboboxDisabledPreview,
    ComboboxWithDisabledItemsPreview,
    // DatePicker
    DatePickerBasicPreview,
    DatePickerWithDefaultPreview,
    DatePickerWithMinMaxPreview,
    DatePickerNoWeekendsPreview,
    DatePickerDisabledPreview,
    DatePickerCustomFormatPreview,
    // TimePicker
    TimePickerBasicPreview,
    TimePickerWithDefaultPreview,
    TimePicker24HourPreview,
    TimePickerWithIntervalPreview,
    TimePickerWithMinMaxPreview,
    TimePickerDisabledPreview,
    TimePickerCustomFormatPreview,
    // DateRangePicker
    DateRangePickerBasicPreview,
    DateRangePickerWithDefaultPreview,
    DateRangePickerWithPresetsPreview,
    DateRangePickerNoPresetsPreview,
    DateRangePickerWithMinMaxPreview,
    DateRangePickerDisabledPreview,
    DateRangePickerNoWeekendsPreview,
    // React Native components for static previews
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
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Alert,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Avatar,
    AvatarImage,
    AvatarFallback,
    // React Native primitives
    View,
    Text,
    Pressable,
    // Guide layout components
    GuideLayout,
    QuickStartCard,
    InfoCard,
    FeatureGrid,
    FeatureCard,
    ...components,
  };
}
