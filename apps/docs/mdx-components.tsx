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
    // Minimal typography - clean, no backgrounds
    h1: ({ children }) => <ComponentPageHeader>{children}</ComponentPageHeader>,
    h2: ({ children }) => (
      <h2 className="text-sm font-semibold mt-8 mb-3 text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-medium mt-6 mb-2 text-gray-900">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{children}</p>
    ),
    // Inline code - plain text, no background
    code: ({ children }) => (
      <code className="text-xs font-mono text-gray-700">
        {children}
      </code>
    ),
    // Code blocks - bordered container, no background
    pre: ({ children }) => (
      <div className="border border-gray-200 rounded-lg p-6 mb-4 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-800 leading-relaxed">
          {children}
        </pre>
      </div>
    ),
    // Tables - clean borders, no grey backgrounds
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4 border border-gray-200 rounded-lg">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="text-left px-3 py-2 border-b border-gray-200 text-gray-500 text-xs font-medium uppercase tracking-wide">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-3 py-2 border-b border-gray-100 text-gray-600 text-sm">
        {children}
      </td>
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
