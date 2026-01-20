import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { ComponentPageHeader } from '@/components/ComponentPageHeader';

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
    // Typography - clean, better hierarchy
    h1: ({ children }) => <ComponentPageHeader>{children}</ComponentPageHeader>,
    h2: ({ children }) => (
      <h2 className="text-lg font-semibold mt-10 mb-4 text-gray-900 border-b border-gray-100 pb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-medium mt-8 mb-3 text-gray-900">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-base text-gray-600 mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="text-base text-gray-600 mb-4 leading-relaxed list-disc list-inside space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="text-base text-gray-600 mb-4 leading-relaxed list-decimal list-inside space-y-1">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-600">{children}</li>
    ),
    // Inline code - subtle background
    code: ({ children }) => (
      <code className="text-sm font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    // Code blocks - subtle background, better padding
    pre: ({ children }) => (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-800 leading-relaxed">
          {children}
        </pre>
      </div>
    ),
    // Tables - clean borders, subtle header
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6 border border-gray-200 rounded-lg">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="text-left px-4 py-3 bg-gray-50 border-b border-gray-200 text-gray-600 text-xs font-semibold uppercase tracking-wide">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 border-b border-gray-100 text-gray-600 text-sm">
        {children}
      </td>
    ),
    // Links
    a: ({ children, href }) => (
      <a href={href} className="text-gray-900 underline underline-offset-2 hover:text-gray-600 transition-colors">
        {children}
      </a>
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
    ...components,
  };
}
