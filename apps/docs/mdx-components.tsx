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
} from '@/components/previews';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <ComponentPageHeader>{children}</ComponentPageHeader>,
    h2: ({ children }) => (
      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-3 text-[var(--docs-text)]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold mt-6 mb-2 text-[var(--docs-text)]">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-base text-[var(--docs-text-secondary)] mb-4 leading-relaxed">{children}</p>
    ),
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-[var(--docs-sidebar-active)] border border-[var(--docs-border)] text-sm font-mono text-[var(--docs-text)]">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-[var(--docs-code-bg)] border border-[var(--docs-code-border)] rounded-xl p-4 overflow-x-auto mb-6 text-sm backdrop-blur-sm transition-colors duration-200">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6 rounded-lg border border-[var(--docs-border)]">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="text-left px-3 py-2.5 bg-[var(--docs-sidebar-active)] border-b border-[var(--docs-border)] text-[var(--docs-text-muted)] text-xs font-medium uppercase tracking-wide">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-3 py-2.5 border-b border-[var(--docs-border)] text-[var(--docs-text-secondary)] text-sm">
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
