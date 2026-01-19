/**
 * ComponentPreviewThumbnail
 *
 * Renders tiny visual previews of each component for the components landing page.
 * These are static, stylized representations - not live components.
 */

// ========================================
// Preview Components
// ========================================

function ButtonPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="px-3 py-1.5 bg-[#111827] text-white text-xs font-medium rounded-md">
        Button
      </div>
    </div>
  );
}

function TextPreview() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-1">
      <div className="text-sm font-semibold text-[#111827]">Heading</div>
      <div className="text-xs text-[#6B7280]">Body text</div>
    </div>
  );
}

function CardPreview() {
  return (
    <div className="flex items-center justify-center h-full p-3">
      <div className="w-full max-w-[80px] bg-white rounded-md border border-[#E5E7EB] p-2">
        <div className="h-1.5 w-10 bg-[#E5E7EB] rounded mb-1.5" />
        <div className="h-1 w-14 bg-[#F3F4F6] rounded" />
      </div>
    </div>
  );
}

function BadgePreview() {
  return (
    <div className="flex items-center justify-center h-full gap-1.5">
      <div className="px-1.5 py-0.5 bg-[#DBEAFE] text-[#1D4ED8] text-[10px] font-medium rounded">
        New
      </div>
      <div className="px-1.5 py-0.5 bg-[#D1FAE5] text-[#059669] text-[10px] font-medium rounded">
        Active
      </div>
    </div>
  );
}

function AvatarPreview() {
  return (
    <div className="flex items-center justify-center h-full gap-1">
      <div className="w-7 h-7 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[10px] font-medium text-[#6B7280]">
        AB
      </div>
      <div className="w-7 h-7 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[10px] font-medium text-[#1D4ED8]">
        CD
      </div>
    </div>
  );
}

function ProgressPreview() {
  return (
    <div className="flex items-center justify-center h-full px-4">
      <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div className="w-2/3 h-full bg-[#3B82F6] rounded-full" />
      </div>
    </div>
  );
}

function SkeletonPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="w-full space-y-1.5">
        <div className="h-2 bg-[#E5E7EB] rounded animate-pulse" />
        <div className="h-2 bg-[#E5E7EB] rounded animate-pulse w-3/4" />
      </div>
    </div>
  );
}

function TablePreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="w-full border border-[#E5E7EB] rounded text-[8px]">
        <div className="flex border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <div className="flex-1 px-1.5 py-1 font-medium text-[#374151]">Name</div>
          <div className="flex-1 px-1.5 py-1 font-medium text-[#374151]">Status</div>
        </div>
        <div className="flex">
          <div className="flex-1 px-1.5 py-1 text-[#6B7280]">Item 1</div>
          <div className="flex-1 px-1.5 py-1 text-[#6B7280]">Active</div>
        </div>
      </div>
    </div>
  );
}

function AccordionPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="w-full border border-[#E5E7EB] rounded text-[9px]">
        <div className="flex items-center justify-between px-2 py-1.5 border-b border-[#E5E7EB]">
          <span className="text-[#374151] font-medium">Section 1</span>
          <span className="text-[#9CA3AF]">-</span>
        </div>
        <div className="px-2 py-1 text-[#6B7280] text-[8px]">Content...</div>
      </div>
    </div>
  );
}

function CollapsiblePreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="w-full">
        <div className="flex items-center gap-1 text-[9px] text-[#374151] font-medium">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
          Toggle
        </div>
        <div className="mt-1 pl-3 text-[8px] text-[#6B7280] border-l border-[#E5E7EB]">
          Hidden content
        </div>
      </div>
    </div>
  );
}

function CarouselPreview() {
  return (
    <div className="flex items-center justify-center h-full gap-1 px-2">
      <div className="w-3 h-3 rounded bg-[#E5E7EB] opacity-50" />
      <div className="w-8 h-8 rounded bg-[#E5E7EB]" />
      <div className="w-3 h-3 rounded bg-[#E5E7EB] opacity-50" />
    </div>
  );
}

function AlertPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="w-full px-2 py-1.5 bg-[#FEF2F2] border border-[#FECACA] rounded text-[9px] text-[#991B1B]">
        Alert message
      </div>
    </div>
  );
}

function AlertDialogPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white border border-[#E5E7EB] rounded-md shadow-sm p-2 text-center">
        <div className="text-[9px] font-medium text-[#111827] mb-1">Confirm?</div>
        <div className="flex gap-1 justify-center">
          <div className="px-1.5 py-0.5 bg-[#F3F4F6] text-[8px] text-[#374151] rounded">No</div>
          <div className="px-1.5 py-0.5 bg-[#111827] text-[8px] text-white rounded">Yes</div>
        </div>
      </div>
    </div>
  );
}

function ToastPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="w-full px-2 py-1.5 bg-[#111827] rounded text-[9px] text-white flex items-center justify-between">
        <span>Toast message</span>
        <span className="text-[#9CA3AF]">×</span>
      </div>
    </div>
  );
}

function DialogPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-2.5 w-20">
        <div className="h-1.5 w-10 bg-[#E5E7EB] rounded mb-1" />
        <div className="h-1 w-14 bg-[#F3F4F6] rounded mb-2" />
        <div className="h-4 w-full bg-[#111827] rounded text-[7px] text-white flex items-center justify-center">
          Close
        </div>
      </div>
    </div>
  );
}

function SpinnerPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-5 h-5 border-2 border-[#E5E7EB] border-t-[#3B82F6] rounded-full animate-spin" />
    </div>
  );
}

function ActionSheetPreview() {
  return (
    <div className="flex items-end justify-center h-full pb-1 px-2">
      <div className="w-full bg-white border border-[#E5E7EB] rounded-t-lg p-1.5">
        <div className="h-0.5 w-6 bg-[#D1D5DB] rounded mx-auto mb-1" />
        <div className="space-y-0.5 text-[8px] text-[#374151]">
          <div className="py-0.5 text-center">Action 1</div>
          <div className="py-0.5 text-center border-t border-[#E5E7EB]">Action 2</div>
        </div>
      </div>
    </div>
  );
}

function CommandPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="w-full border border-[#E5E7EB] rounded bg-white">
        <div className="px-2 py-1 border-b border-[#E5E7EB]">
          <div className="h-1.5 w-12 bg-[#E5E7EB] rounded" />
        </div>
        <div className="px-2 py-1 text-[8px] text-[#374151]">Search...</div>
      </div>
    </div>
  );
}

function ContextMenuPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white border border-[#E5E7EB] rounded shadow-sm p-1 text-[8px]">
        <div className="px-2 py-0.5 text-[#374151] hover:bg-[#F3F4F6] rounded">Copy</div>
        <div className="px-2 py-0.5 text-[#374151] hover:bg-[#F3F4F6] rounded">Paste</div>
        <div className="px-2 py-0.5 text-[#EF4444]">Delete</div>
      </div>
    </div>
  );
}

function DropdownPreview() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-1">
      <div className="px-2 py-1 bg-white border border-[#E5E7EB] rounded text-[9px] text-[#374151] flex items-center gap-1">
        Options
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}

function HoverCardPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="px-1.5 py-0.5 text-[9px] text-[#2563EB] underline">Hover me</div>
        <div className="absolute -top-1 left-full ml-1 bg-white border border-[#E5E7EB] rounded shadow-sm p-1.5 text-[7px] text-[#6B7280] w-14">
          Preview card
        </div>
      </div>
    </div>
  );
}

function PopoverPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="w-5 h-5 bg-[#E5E7EB] rounded flex items-center justify-center text-[10px] text-[#6B7280]">?</div>
        <div className="absolute -top-1 left-full ml-0.5 bg-white border border-[#E5E7EB] rounded shadow-sm p-1 text-[7px] text-[#6B7280] whitespace-nowrap">
          Info
        </div>
      </div>
    </div>
  );
}

function TooltipPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="w-6 h-6 bg-[#F3F4F6] rounded flex items-center justify-center text-[10px] text-[#6B7280]">?</div>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-0.5 bg-[#111827] text-white rounded px-1.5 py-0.5 text-[7px] whitespace-nowrap">
          Tooltip
        </div>
      </div>
    </div>
  );
}

function SheetPreview() {
  return (
    <div className="flex items-end justify-center h-full">
      <div className="w-full bg-white border-t border-x border-[#E5E7EB] rounded-t-lg p-2">
        <div className="h-0.5 w-8 bg-[#D1D5DB] rounded mx-auto mb-1.5" />
        <div className="h-1.5 w-12 bg-[#E5E7EB] rounded mx-auto" />
      </div>
    </div>
  );
}

function CheckboxPreview() {
  return (
    <div className="flex items-center justify-center h-full gap-2">
      <div className="w-4 h-4 border-2 border-[#3B82F6] rounded bg-[#3B82F6] flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="w-4 h-4 border-2 border-[#D1D5DB] rounded bg-white" />
    </div>
  );
}

function ComboboxPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="w-full px-2 py-1 bg-white border border-[#E5E7EB] rounded text-[9px] text-[#9CA3AF] flex items-center justify-between">
        Select...
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}

function DatePickerPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="w-full px-2 py-1 bg-white border border-[#E5E7EB] rounded text-[9px] text-[#374151] flex items-center justify-between">
        Jan 19, 2025
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
    </div>
  );
}

function DateRangePickerPreview() {
  return (
    <div className="flex items-center justify-center h-full px-2">
      <div className="w-full px-1.5 py-1 bg-white border border-[#E5E7EB] rounded text-[8px] text-[#374151] flex items-center gap-1">
        <span>Jan 1</span>
        <span className="text-[#9CA3AF]">-</span>
        <span>Jan 15</span>
      </div>
    </div>
  );
}

function InputPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="w-full px-2 py-1.5 bg-white border border-[#E5E7EB] rounded text-[9px] text-[#9CA3AF]">
        Enter text...
      </div>
    </div>
  );
}

function TimePickerPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="w-full px-2 py-1 bg-white border border-[#E5E7EB] rounded text-[9px] text-[#374151] flex items-center justify-between">
        09:30 AM
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
    </div>
  );
}

function OTPInputPreview() {
  return (
    <div className="flex items-center justify-center h-full gap-1">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-5 h-6 border border-[#E5E7EB] rounded bg-white flex items-center justify-center text-[10px] font-mono text-[#374151]"
        >
          {i < 3 ? i : ''}
        </div>
      ))}
    </div>
  );
}

function RadioGroupPreview() {
  return (
    <div className="flex items-center justify-center h-full gap-3">
      <div className="flex items-center gap-1">
        <div className="w-3.5 h-3.5 rounded-full border-2 border-[#3B82F6] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
        </div>
        <span className="text-[8px] text-[#374151]">A</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3.5 h-3.5 rounded-full border-2 border-[#D1D5DB]" />
        <span className="text-[8px] text-[#374151]">B</span>
      </div>
    </div>
  );
}

function SelectPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="w-full px-2 py-1 bg-white border border-[#E5E7EB] rounded text-[9px] text-[#374151] flex items-center justify-between">
        Option 1
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}

function SliderPreview() {
  return (
    <div className="flex items-center justify-center h-full px-4">
      <div className="w-full relative">
        <div className="h-1 bg-[#E5E7EB] rounded-full">
          <div className="w-1/2 h-full bg-[#3B82F6] rounded-full" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-[#3B82F6] rounded-full" />
      </div>
    </div>
  );
}

function SwitchPreview() {
  return (
    <div className="flex items-center justify-center h-full gap-2">
      <div className="w-7 h-4 bg-[#3B82F6] rounded-full relative">
        <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
      </div>
      <div className="w-7 h-4 bg-[#E5E7EB] rounded-full relative">
        <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
      </div>
    </div>
  );
}

function TextareaPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="w-full h-10 px-2 py-1 bg-white border border-[#E5E7EB] rounded text-[8px] text-[#9CA3AF]">
        Enter message...
      </div>
    </div>
  );
}

function TabsPreview() {
  return (
    <div className="flex items-center justify-center h-full px-2">
      <div className="flex border-b border-[#E5E7EB] text-[8px]">
        <div className="px-2 py-1 text-[#3B82F6] border-b-2 border-[#3B82F6] font-medium">Tab 1</div>
        <div className="px-2 py-1 text-[#6B7280]">Tab 2</div>
        <div className="px-2 py-1 text-[#6B7280]">Tab 3</div>
      </div>
    </div>
  );
}

function BreadcrumbPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center gap-1 text-[8px]">
        <span className="text-[#6B7280]">Home</span>
        <span className="text-[#9CA3AF]">/</span>
        <span className="text-[#6B7280]">Docs</span>
        <span className="text-[#9CA3AF]">/</span>
        <span className="text-[#374151] font-medium">Page</span>
      </div>
    </div>
  );
}

function PaginationPreview() {
  return (
    <div className="flex items-center justify-center h-full gap-0.5">
      <div className="w-5 h-5 border border-[#E5E7EB] rounded text-[8px] text-[#6B7280] flex items-center justify-center">{'<'}</div>
      <div className="w-5 h-5 bg-[#111827] text-white rounded text-[8px] flex items-center justify-center">1</div>
      <div className="w-5 h-5 border border-[#E5E7EB] rounded text-[8px] text-[#374151] flex items-center justify-center">2</div>
      <div className="w-5 h-5 border border-[#E5E7EB] rounded text-[8px] text-[#374151] flex items-center justify-center">3</div>
      <div className="w-5 h-5 border border-[#E5E7EB] rounded text-[8px] text-[#6B7280] flex items-center justify-center">{'>'}</div>
    </div>
  );
}

function LinkPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <span className="text-sm text-[#2563EB] underline underline-offset-2">Link text</span>
    </div>
  );
}

function MenubarPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex bg-white border border-[#E5E7EB] rounded text-[8px]">
        <div className="px-2 py-1 text-[#374151] border-r border-[#E5E7EB]">File</div>
        <div className="px-2 py-1 text-[#374151] border-r border-[#E5E7EB]">Edit</div>
        <div className="px-2 py-1 text-[#374151]">View</div>
      </div>
    </div>
  );
}

function NavigationMenuPreview() {
  return (
    <div className="flex items-center justify-center h-full gap-2 text-[8px]">
      <span className="text-[#374151] font-medium">Home</span>
      <span className="text-[#374151]">Products</span>
      <span className="text-[#374151]">About</span>
    </div>
  );
}

function AspectRatioPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-12 h-8 bg-[#F3F4F6] border border-[#E5E7EB] rounded flex items-center justify-center text-[8px] text-[#6B7280]">
        16:9
      </div>
    </div>
  );
}

function ContainerPreview() {
  return (
    <div className="flex items-center justify-center h-full px-2">
      <div className="w-full h-8 border border-dashed border-[#D1D5DB] rounded flex items-center justify-center text-[8px] text-[#6B7280]">
        Container
      </div>
    </div>
  );
}

function FlexPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="flex gap-1">
        <div className="w-6 h-6 bg-[#DBEAFE] rounded" />
        <div className="w-6 h-6 bg-[#DBEAFE] rounded" />
        <div className="w-6 h-6 bg-[#DBEAFE] rounded" />
      </div>
    </div>
  );
}

function GridPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="grid grid-cols-3 gap-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-[#DBEAFE] rounded" />
        ))}
      </div>
    </div>
  );
}

function ScrollAreaPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="w-full h-10 border border-[#E5E7EB] rounded relative overflow-hidden">
        <div className="absolute right-0.5 top-0.5 bottom-0.5 w-1 bg-[#E5E7EB] rounded">
          <div className="w-full h-1/3 bg-[#9CA3AF] rounded" />
        </div>
      </div>
    </div>
  );
}

function SeparatorPreview() {
  return (
    <div className="flex items-center justify-center h-full px-4">
      <div className="w-full flex items-center gap-2">
        <div className="flex-1 h-px bg-[#E5E7EB]" />
        <span className="text-[8px] text-[#9CA3AF]">or</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>
    </div>
  );
}

function SpacerPreview() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="flex items-center w-full">
        <div className="w-5 h-5 bg-[#E5E7EB] rounded" />
        <div className="flex-1 border-b border-dashed border-[#D1D5DB] mx-1" />
        <div className="w-5 h-5 bg-[#E5E7EB] rounded" />
      </div>
    </div>
  );
}

function DefaultPreview({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-[10px] text-[#6B7280] font-medium">{name}</div>
    </div>
  );
}

// ========================================
// Preview Map
// ========================================

const previewMap: Record<string, React.ComponentType<{ name?: string }>> = {
  button: ButtonPreview,
  text: TextPreview,
  card: CardPreview,
  badge: BadgePreview,
  avatar: AvatarPreview,
  progress: ProgressPreview,
  skeleton: SkeletonPreview,
  table: TablePreview,
  accordion: AccordionPreview,
  collapsible: CollapsiblePreview,
  carousel: CarouselPreview,
  alert: AlertPreview,
  'alert-dialog': AlertDialogPreview,
  toast: ToastPreview,
  dialog: DialogPreview,
  spinner: SpinnerPreview,
  'action-sheet': ActionSheetPreview,
  command: CommandPreview,
  'context-menu': ContextMenuPreview,
  dropdown: DropdownPreview,
  'hover-card': HoverCardPreview,
  popover: PopoverPreview,
  tooltip: TooltipPreview,
  sheet: SheetPreview,
  checkbox: CheckboxPreview,
  combobox: ComboboxPreview,
  'date-picker': DatePickerPreview,
  'date-range-picker': DateRangePickerPreview,
  input: InputPreview,
  'time-picker': TimePickerPreview,
  'otp-input': OTPInputPreview,
  'radio-group': RadioGroupPreview,
  select: SelectPreview,
  slider: SliderPreview,
  switch: SwitchPreview,
  textarea: TextareaPreview,
  tabs: TabsPreview,
  breadcrumb: BreadcrumbPreview,
  pagination: PaginationPreview,
  link: LinkPreview,
  menubar: MenubarPreview,
  'navigation-menu': NavigationMenuPreview,
  'aspect-ratio': AspectRatioPreview,
  container: ContainerPreview,
  flex: FlexPreview,
  grid: GridPreview,
  'scroll-area': ScrollAreaPreview,
  separator: SeparatorPreview,
  spacer: SpacerPreview,
};

// ========================================
// Export Component
// ========================================

interface ComponentPreviewThumbnailProps {
  componentSlug: string;
  componentName: string;
}

export function ComponentPreviewThumbnail({ componentSlug, componentName }: ComponentPreviewThumbnailProps) {
  const PreviewComponent = previewMap[componentSlug];

  if (PreviewComponent) {
    return <PreviewComponent />;
  }

  return <DefaultPreview name={componentName} />;
}
