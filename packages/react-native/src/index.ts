// Components
export { Button, ButtonGroup } from './components/Button';
export type { ButtonProps, ButtonGroupProps, ButtonVariant, ButtonSize } from './components/Button';

export { Text, Heading, Code, Label } from './components/Text';
export type {
  TextProps,
  TextVariant,
  TextWeight,
  TextColor,
  TextAlign,
} from './components/Text';

// Data Display Components
export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from './components/Card';
export type {
  CardProps,
  CardVariant,
  CardPadding,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
  CardTitleProps,
  CardDescriptionProps,
} from './components/Card';

export { Badge } from './components/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './components/Badge';

export { Avatar, AvatarImage, AvatarFallback } from './components/Avatar';
export type {
  AvatarProps,
  AvatarSize,
  AvatarImageProps,
  AvatarFallbackProps,
} from './components/Avatar';

export { Progress } from './components/Progress';
export type { ProgressProps, ProgressVariant, ProgressSize } from './components/Progress';

export { Skeleton } from './components/Skeleton';
export type { SkeletonProps, SkeletonVariant } from './components/Skeleton';

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './components/Table';
export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  Column,
} from './components/Table';

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './components/Accordion';
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionType,
} from './components/Accordion';

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './components/Collapsible';
export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from './components/Collapsible';

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from './components/Carousel';
export type {
  CarouselProps,
  CarouselContentProps,
  CarouselItemProps,
  CarouselPreviousProps,
  CarouselNextProps,
  CarouselDotsProps,
} from './components/Carousel';

// Feedback Components
export { Alert, AlertTitle, AlertDescription } from './components/Alert';
export type {
  AlertProps,
  AlertVariant,
  AlertTitleProps,
  AlertDescriptionProps,
} from './components/Alert';

export { ToastProvider, useToast } from './components/Toast';
export type {
  ToastProviderProps,
  ToastOptions,
  ToastVariant,
  ToastAction,
} from './components/Toast';

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './components/Dialog';
export type {
  DialogProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
} from './components/Dialog';

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './components/AlertDialog';
export type {
  AlertDialogProps,
  AlertDialogTriggerProps,
  AlertDialogPortalProps,
  AlertDialogOverlayProps,
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogFooterProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
} from './components/AlertDialog';

export { Spinner } from './components/Spinner';
export type { SpinnerProps, SpinnerSize, SpinnerVariant } from './components/Spinner';

// Overlay Components
export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from './components/Dropdown';
export type {
  DropdownProps,
  DropdownAlign,
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownItemProps,
  DropdownSeparatorProps,
} from './components/Dropdown';

export { Popover, PopoverTrigger, PopoverContent, PopoverClose } from './components/Popover';
export type {
  PopoverProps,
  PopoverSide,
  PopoverAlign,
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverCloseProps,
} from './components/Popover';

export { Tooltip, TooltipTrigger, TooltipContent } from './components/Tooltip';
export type {
  TooltipProps,
  TooltipSide,
  TooltipTriggerProps,
  TooltipContentProps,
} from './components/Tooltip';

export { HoverCard, HoverCardTrigger, HoverCardContent } from './components/HoverCard';
export type {
  HoverCardProps,
  HoverCardTriggerProps,
  HoverCardContentProps,
  HoverCardSide,
  HoverCardAlign,
} from './components/HoverCard';

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuCheckboxItem,
} from './components/ContextMenu';
export type {
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuSeparatorProps,
  ContextMenuLabelProps,
  ContextMenuCheckboxItemProps,
  ContextMenuAlign,
} from './components/ContextMenu';

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from './components/Sheet';
export type {
  SheetProps,
  SheetSide,
  SheetTriggerProps,
  SheetContentProps,
  SheetHeaderProps,
  SheetFooterProps,
  SheetTitleProps,
  SheetDescriptionProps,
  SheetCloseProps,
} from './components/Sheet';

export {
  ActionSheet,
  ActionSheetTrigger,
  ActionSheetContent,
  ActionSheetHeader,
  ActionSheetTitle,
  ActionSheetDescription,
  ActionSheetItem,
  ActionSheetCancel,
  ActionSheetSeparator,
} from './components/ActionSheet';
export type {
  ActionSheetProps,
  ActionSheetTriggerProps,
  ActionSheetContentProps,
  ActionSheetHeaderProps,
  ActionSheetTitleProps,
  ActionSheetDescriptionProps,
  ActionSheetItemProps,
  ActionSheetCancelProps,
  ActionSheetSeparatorProps,
} from './components/ActionSheet';

// Form Components
export { Input, SearchInput, PasswordInput } from './components/Input';
export type { InputProps, InputSize, SearchInputProps, PasswordInputProps } from './components/Input';

export { Textarea } from './components/Textarea';
export type { TextareaProps } from './components/Textarea';

export { Checkbox } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';

export { Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';

export { Select } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';

export { RadioGroup, RadioGroupItem, RadioGroupLabel } from './components/RadioGroup';
export type {
  RadioGroupProps,
  RadioGroupItemProps,
  RadioGroupLabelProps,
  RadioGroupOrientation,
} from './components/RadioGroup';

export { Slider } from './components/Slider';
export type { SliderProps } from './components/Slider';

export {
  OTPInput,
  OTPInputGroup,
  OTPInputSlot,
  OTPInputSeparator,
} from './components/OTPInput';
export type {
  OTPInputProps,
  OTPInputGroupProps,
  OTPInputSlotProps,
  OTPInputSeparatorProps,
} from './components/OTPInput';

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandDialog,
  useCommand,
  defaultFilter,
} from './components/Command';
export type {
  CommandProps,
  CommandInputProps,
  CommandListProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandItemProps,
  CommandSeparatorProps,
  CommandDialogProps,
  CommandContextValue,
  CommandItemData,
} from './components/Command';

export {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  useCombobox,
  defaultComboboxFilter,
} from './components/Combobox';
export type {
  ComboboxProps,
  ComboboxTriggerProps,
  ComboboxContentProps,
  ComboboxInputProps,
  ComboboxListProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxItemProps,
  ComboboxContextValue,
  ComboboxItemData,
} from './components/Combobox';

export {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
  useDatePicker,
  formatDate,
  isSameDay,
  isToday,
  isDateDisabled,
  DAYS,
  DAYS_SHORT,
  MONTHS,
  MONTHS_SHORT,
} from './components/DatePicker';
export type {
  DatePickerProps,
  DatePickerTriggerProps,
  DatePickerContentProps,
  DatePickerHeaderProps,
  DatePickerCalendarProps,
  DatePickerContextValue,
  DatePickerView,
} from './components/DatePicker';

export {
  TimePicker,
  TimePickerTrigger,
  TimePickerContent,
  TimePickerWheel,
  useTimePicker,
  formatTime,
  dateToTime,
  timeToDate,
  to12Hour,
  to24Hour,
  get12Hours,
  get24Hours,
  getMinutes,
  isTimeDisabled,
} from './components/TimePicker';
export type {
  TimePickerProps,
  TimePickerTriggerProps,
  TimePickerContentProps,
  TimePickerWheelProps,
  TimePickerContextValue,
  TimeValue,
} from './components/TimePicker';

export {
  DateRangePicker,
  DateRangePickerTrigger,
  DateRangePickerContent,
  DateRangePickerHeader,
  DateRangePickerCalendar,
  DateRangePickerPresets,
  useDateRangePicker,
  isDateInRange,
  isRangeStart,
  isRangeEnd,
  normalizeDate,
  compareDates,
  normalizeRange,
  formatDateRange,
  getPresetRanges,
  addDays,
  getDaysBetween,
} from './components/DateRangePicker';
export type {
  DateRangePickerProps,
  DateRangePickerTriggerProps,
  DateRangePickerContentProps,
  DateRangePickerHeaderProps,
  DateRangePickerCalendarProps,
  DateRangePickerPresetsProps,
  DateRangePickerContextValue,
  DateRangePickerView,
  SelectionMode,
  DateRange,
  PresetRange,
} from './components/DateRangePicker';

// Navigation Components
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs';
export type {
  TabsProps,
  TabsVariant,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './components/Tabs';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from './components/Breadcrumb';
export type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbSeparatorProps,
  BreadcrumbPageProps,
} from './components/Breadcrumb';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  getPageNumbers,
} from './components/Pagination';
export type {
  PaginationProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationPreviousProps,
  PaginationNextProps,
  PaginationEllipsisProps,
} from './components/Pagination';

export { Link } from './components/Link';
export type { LinkProps, LinkVariant, LinkUnderline } from './components/Link';

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
} from './components/Menubar';
export type {
  MenubarProps,
  MenubarMenuProps,
  MenubarTriggerProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarSeparatorProps,
  MenubarCheckboxItemProps,
  MenubarRadioGroupProps,
  MenubarRadioItemProps,
  MenubarOrientation,
} from './components/Menubar';

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './components/NavigationMenu';
export type {
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
  NavigationMenuOrientation,
} from './components/NavigationMenu';

// Layout Components
export { Container } from './components/Container';
export type { ContainerProps, ContainerSize, ContainerPadding } from './components/Container';

export { Flex } from './components/Flex';
export type {
  FlexProps,
  FlexDirection,
  FlexJustify,
  FlexAlign,
  FlexWrap,
  FlexGap,
} from './components/Flex';

export { Grid, GridItem } from './components/Grid';
export type { GridProps, GridItemProps, GridColumns, GridGap } from './components/Grid';

export { Separator } from './components/Separator';
export type { SeparatorProps, SeparatorOrientation, SeparatorLabelPosition } from './components/Separator';

export { Spacer } from './components/Spacer';
export type { SpacerProps, SpacerSize, SpacerAxis } from './components/Spacer';

export { AspectRatio } from './components/AspectRatio';
export type { AspectRatioProps } from './components/AspectRatio';

export {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from './components/ScrollArea';
export type {
  ScrollAreaProps,
  ScrollAreaViewportProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaCornerProps,
  ScrollAreaOrientation,
} from './components/ScrollArea';

// Form System Components
export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useForm,
  useFormField,
} from './components/Form';
export type {
  FormProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
  FormContextValue,
  FormFieldContextValue,
  FormFieldState,
} from './components/Form';

export {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItem,
  useFileUpload,
  formatFileSize,
  validateFileType,
  validateFileSize,
  getFileIconType,
} from './components/FileUpload';
export type {
  FileUploadProps,
  FileUploadDropzoneProps,
  FileUploadTriggerProps,
  FileUploadListProps,
  FileUploadItemProps,
  FileUploadContextValue,
  UploadedFile,
  FileValidationResult,
  FileIconType,
} from './components/FileUpload';

export {
  Calendar,
  CalendarHeader,
  CalendarGrid,
  CalendarDay,
  useCalendar,
} from './components/Calendar';
export type {
  CalendarProps,
  CalendarValue,
  CalendarHeaderProps,
  CalendarGridProps,
  CalendarDayProps,
  CalendarContextValue,
  CalendarMode,
  CalendarWeekStart,
  DateRange as CalendarDateRange,
} from './components/Calendar';

export {
  Callout,
  CalloutIcon,
  CalloutTitle,
  CalloutDescription,
} from './components/Callout';
export type {
  CalloutProps,
  CalloutVariant,
  CalloutIconProps,
  CalloutTitleProps,
  CalloutDescriptionProps,
} from './components/Callout';

export {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
  SidebarNavGroup,
  SidebarSeparator,
  useSidebar,
} from './components/Sidebar';
export type {
  SidebarProps,
  SidebarTriggerProps,
  SidebarContentProps,
  SidebarHeaderProps,
  SidebarFooterProps,
  SidebarNavProps,
  SidebarNavItemProps,
  SidebarNavGroupProps,
  SidebarSeparatorProps,
  SidebarContextValue,
  SidebarSide,
} from './components/Sidebar';

export {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
  useNavbar,
} from './components/Navbar';
export type {
  NavbarProps,
  NavbarPosition,
  NavbarMaxWidth,
  NavbarContextValue,
  NavbarBrandProps,
  NavbarContentProps,
  NavbarContentJustify,
  NavbarItemProps,
  NavbarMenuProps,
  NavbarMenuToggleProps,
  NavbarMenuItemProps,
} from './components/Navbar';

export {
  Chart,
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  ChartLegend,
  ChartTooltip,
  ChartAxis,
  useChart,
  defaultChartColors,
  calculateMaxValue,
  generateYAxisTicks,
  formatValue as formatChartValue,
  calculatePercentages,
  getDataColor,
} from './components/Chart';
export type {
  ChartProps,
  BarChartProps,
  LineChartProps,
  AreaChartProps,
  PieChartProps,
  ChartLegendProps,
  ChartLegendPosition,
  ChartTooltipProps,
  ChartAxisProps,
  ChartAxisType,
  ChartContextValue,
  ChartDataPoint,
  ChartConfig,
} from './components/Chart';

export {
  Editor,
  EditorContent,
  EditorToolbar,
  EditorToolbarButton,
  EditorToolbarSeparator,
  BoldButton,
  ItalicButton,
  UnderlineButton,
  StrikethroughButton,
  CodeButton,
  HeadingButton,
  ListButton,
  QuoteButton,
  UndoButton,
  RedoButton,
  useEditor,
  markdownToHtml,
  htmlToMarkdown,
  stripHtml,
  getCharacterCount,
  getWordCount,
} from './components/Editor';
export type {
  EditorProps,
  EditorContentProps,
  EditorToolbarProps,
  EditorToolbarButtonProps,
  EditorToolbarSeparatorProps,
  EditorContextValue,
  TextFormat,
  BlockFormat,
  FormatState,
} from './components/Editor';

export {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectContent,
  MultiSelectInput,
  MultiSelectOption,
  MultiSelectTag,
  MultiSelectEmpty,
  MultiSelectList,
  useMultiSelect,
} from './components/MultiSelect';
export type {
  MultiSelectProps,
  MultiSelectOptionType,
  MultiSelectContextValue,
  MultiSelectTriggerProps,
  MultiSelectContentProps,
  MultiSelectInputProps,
  MultiSelectOptionProps,
  MultiSelectTagProps,
  MultiSelectEmptyProps,
} from './components/MultiSelect';

export {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateAction,
} from './components/EmptyState';
export type {
  EmptyStateProps,
  EmptyStateVariant,
  EmptyStateIconType,
  EmptyStateIconProps,
  EmptyStateTitleProps,
  EmptyStateDescriptionProps,
  EmptyStateActionProps,
} from './components/EmptyState';

export {
  StatsCard,
  StatsCardIcon,
  StatsCardTitle,
  StatsCardValue,
  StatsCardTrend,
  StatsCardDescription,
} from './components/StatsCard';
export type {
  StatsCardProps,
  StatsCardVariant,
  StatsCardIconProps,
  StatsCardTitleProps,
  StatsCardValueProps,
  StatsCardTrendProps,
  StatsCardDescriptionProps,
} from './components/StatsCard';

export {
  Timeline,
  TimelineItem,
  TimelineIcon,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
} from './components/Timeline';
export type {
  TimelineProps,
  TimelineLayout,
  TimelineItemProps,
  TimelineItemStatus,
  TimelineIconProps,
  TimelineConnectorProps,
  TimelineContentProps,
  TimelineTitleProps,
  TimelineDescriptionProps,
  TimelineTimeProps,
} from './components/Timeline';

export { BentoGrid, BentoGridItem } from './components/BentoGrid';
export type {
  BentoGridProps,
  BentoGridItemProps,
  ResponsiveValue,
} from './components/BentoGrid';

export {
  ResizablePanels,
  ResizablePanel,
  ResizableHandle,
  useResizablePanels,
} from './components/ResizablePanels';
export type {
  ResizablePanelsProps,
  ResizablePanelProps,
  ResizableHandleProps,
  ResizablePanelsContextValue,
} from './components/ResizablePanels';

export {
  Dock,
  DockItem,
  DockSeparator,
  DockTooltip,
  useDock,
} from './components/Dock';
export type {
  DockProps,
  DockItemProps,
  DockSeparatorProps,
  DockTooltipProps,
  DockContextValue,
} from './components/Dock';

export { Masonry, MasonryItem } from './components/Masonry';
export type {
  MasonryProps,
  MasonryItemProps,
  ResponsiveColumns,
} from './components/Masonry';

export {
  DataTable,
  DataTableHeader,
  DataTableHeaderCell,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableFooter,
  DataTablePagination,
  DataTableSearch,
  DataTableEmpty,
  DataTableLoading,
  useDataTable,
} from './components/DataTable';
export type {
  DataTableProps,
  DataTableHeaderProps,
  DataTableHeaderCellProps,
  DataTableBodyProps,
  DataTableRowProps,
  DataTableCellProps,
  DataTableFooterProps,
  DataTablePaginationProps,
  DataTableSearchProps,
  DataTableEmptyProps,
  DataTableLoadingProps,
  DataTableContextValue,
  ColumnDef,
  SortDirection,
  SortState,
} from './components/DataTable';

export {
  Hero,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  HeroImage,
  HeroBadge,
  useHero,
} from './components/Hero';
export type {
  HeroProps,
  HeroContentProps,
  HeroTitleProps,
  HeroSubtitleProps,
  HeroActionsProps,
  HeroImageProps,
  HeroBadgeProps,
  HeroVariant,
  HeroAlign,
} from './components/Hero';

export {
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  useFeatureGrid,
} from './components/FeatureGrid';
export type {
  FeatureGridProps,
  FeatureCardProps,
  FeatureIconProps,
  FeatureTitleProps,
  FeatureDescriptionProps,
  FeatureCardVariant,
  FeatureGridColumns,
  FeatureGridGap,
} from './components/FeatureGrid';

export {
  PricingTable,
  PricingToggle,
  PricingCard,
  PricingHeader,
  PricingPrice,
  PricingFeatures,
  PricingFeature,
  PricingAction,
  usePricingTable,
} from './components/PricingTable';
export type {
  PricingTableProps,
  PricingCardProps,
  PricingHeaderProps,
  PricingPriceProps,
  PricingFeaturesProps,
  PricingFeatureProps,
  PricingActionProps,
  PricingToggleProps,
  PricingTableContextValue,
  BillingPeriod,
} from './components/PricingTable';

export {
  Testimonial,
  TestimonialContent,
  TestimonialAuthor,
  TestimonialAvatar,
  TestimonialName,
  TestimonialRole,
  TestimonialRating,
  TestimonialCarousel,
  useTestimonial,
} from './components/Testimonial';
export type {
  TestimonialProps,
  TestimonialContentProps,
  TestimonialAuthorProps,
  TestimonialAvatarProps,
  TestimonialNameProps,
  TestimonialRoleProps,
  TestimonialRatingProps,
  TestimonialCarouselProps,
  TestimonialVariant,
} from './components/Testimonial';

export {
  CTA,
  CTAContent,
  CTATitle,
  CTADescription,
  CTAActions,
  useCTA,
} from './components/CTA';
export type {
  CTAProps,
  CTAContentProps,
  CTATitleProps,
  CTADescriptionProps,
  CTAActionsProps,
  CTAVariant,
  CTABackground,
  CTAAlign,
} from './components/CTA';

export {
  Footer,
  FooterContent,
  FooterBrand,
  FooterLinks,
  FooterLinkGroup,
  FooterLink,
  FooterSocial,
  FooterCopyright,
  FooterNewsletter,
  useFooter,
} from './components/Footer';
export type {
  FooterProps,
  FooterContentProps,
  FooterBrandProps,
  FooterLinksProps,
  FooterLinkGroupProps,
  FooterLinkProps,
  FooterSocialProps,
  FooterCopyrightProps,
  FooterNewsletterProps,
  FooterVariant,
} from './components/Footer';

export {
  Announcement,
  AnnouncementContent,
  AnnouncementAction,
  AnnouncementClose,
  AnnouncementCountdown,
  useAnnouncement,
} from './components/Announcement';
export type {
  AnnouncementProps,
  AnnouncementContentProps,
  AnnouncementActionProps,
  AnnouncementCloseProps,
  AnnouncementCountdownProps,
  AnnouncementVariant,
} from './components/Announcement';

export {
  Onboarding,
  useOnboarding,
  OnboardingStep,
  OnboardingImage,
  OnboardingTitle,
  OnboardingDescription,
  OnboardingDots,
  OnboardingProgress,
  OnboardingActions,
  OnboardingNextButton,
  OnboardingBackButton,
  OnboardingSkipButton,
} from './components/Onboarding';
export type {
  OnboardingProps,
  OnboardingStepProps,
  OnboardingImageProps,
  OnboardingTitleProps,
  OnboardingDescriptionProps,
  OnboardingDotsProps,
  OnboardingProgressProps,
  OnboardingActionsProps,
  OnboardingNextButtonProps,
  OnboardingBackButtonProps,
  OnboardingSkipButtonProps,
  StepAnimation,
  ImageAnimation,
  TextAnimation,
  NavigationDirection,
  OnboardingContextValue,
  StepInfo,
} from './components/Onboarding';

// GlassSurface
export { GlassSurface } from './components/GlassSurface';
export type { GlassSurfaceProps } from './components/GlassSurface';

// Tokens
export * from './tokens';

// Themes
export * from './themes';

// Hooks
export { useReducedMotion, useIsVisible } from './hooks';

// Utils (Responsive)
export {
  breakpoints,
  useResponsiveValue,
  useCurrentBreakpoint,
} from './utils/responsive';
export type { Breakpoint, ResponsiveValue } from './utils/responsive';
