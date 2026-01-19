import type { ComponentData } from '../components/playground';

// ========================================
// DatePicker Component Data
// ========================================

export const datePickerData: ComponentData = {
  slug: 'date-picker',
  name: 'DatePicker',
  description: 'A calendar-based date selection component with month/year navigation and keyboard support.',
  category: 'Form',
  categorySlug: 'form',
  variants: [
    {
      id: 'basic',
      label: 'Basic Usage',
      code: `import { useState } from 'react'
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native'

export default function BasicDatePicker() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker value={date} onValueChange={setDate}>
      <DatePickerTrigger placeholder="Select date..." />
      <DatePickerContent>
        <DatePickerHeader />
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}`,
    },
    {
      id: 'with-default',
      label: 'With Default Value',
      code: `import { useState } from 'react'
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native'

export default function DatePickerWithDefault() {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <DatePicker value={date} onValueChange={setDate}>
      <DatePickerTrigger />
      <DatePickerContent>
        <DatePickerHeader />
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}`,
    },
    {
      id: 'with-min-max',
      label: 'With Min/Max Dates',
      code: `import { useState } from 'react'
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native'

export default function DatePickerWithMinMax() {
  const [date, setDate] = useState<Date | null>(null)

  // Only allow dates in the current month
  const today = new Date()
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1)
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  return (
    <DatePicker
      value={date}
      onValueChange={setDate}
      minDate={minDate}
      maxDate={maxDate}
    >
      <DatePickerTrigger placeholder="Select date this month..." />
      <DatePickerContent>
        <DatePickerHeader />
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}`,
    },
    {
      id: 'no-weekends',
      label: 'No Weekends',
      code: `import { useState } from 'react'
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native'

export default function DatePickerNoWeekends() {
  const [date, setDate] = useState<Date | null>(null)

  // Disable weekends
  const disabledDates = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  return (
    <DatePicker
      value={date}
      onValueChange={setDate}
      disabledDates={disabledDates}
    >
      <DatePickerTrigger placeholder="Select weekday..." />
      <DatePickerContent>
        <DatePickerHeader />
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}`,
    },
    {
      id: 'disabled',
      label: 'Disabled',
      code: `import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native'

export default function DatePickerDisabled() {
  return (
    <DatePicker disabled value={new Date()}>
      <DatePickerTrigger />
      <DatePickerContent>
        <DatePickerHeader />
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}`,
    },
    {
      id: 'custom-format',
      label: 'Custom Format',
      code: `import { useState } from 'react'
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native'

export default function DatePickerCustomFormat() {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <DatePicker
      value={date}
      onValueChange={setDate}
      format="dd/MM/yyyy"
    >
      <DatePickerTrigger />
      <DatePickerContent>
        <DatePickerHeader />
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}`,
    },
  ],
  installation: 'npx r-ui add date-picker',
  usage: `import { useState } from 'react'
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native'

export default function MyComponent() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker value={date} onValueChange={setDate}>
      <DatePickerTrigger placeholder="Select date..." />
      <DatePickerContent>
        <DatePickerHeader />
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}`,
  features: [
    'Month navigation with prev/next buttons',
    'Year/month picker - click the header to switch views',
    'Today indicator with subtle border',
    'Disabled dates with min/max or custom logic',
    'Custom date format support',
    'Full ARIA accessibility support',
    'Keyboard navigation',
  ],
  props: [
    {
      component: 'DatePicker',
      props: [
        { name: 'value', type: 'Date | null', default: '-', description: 'Selected date (controlled)' },
        { name: 'onValueChange', type: '(date: Date | null) => void', default: '-', description: 'Called when date changes' },
        { name: 'defaultValue', type: 'Date | null', default: 'null', description: 'Default date (uncontrolled)' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the picker' },
        { name: 'placeholder', type: 'string', default: '"Select date..."', description: 'Placeholder text' },
        { name: 'format', type: 'string', default: '"MMM d, yyyy"', description: 'Date display format' },
        { name: 'minDate', type: 'Date', default: '-', description: 'Minimum selectable date' },
        { name: 'maxDate', type: 'Date', default: '-', description: 'Maximum selectable date' },
        { name: 'disabledDates', type: '(date: Date) => boolean', default: '-', description: 'Custom disabled date logic' },
        { name: 'open', type: 'boolean', default: '-', description: 'Controlled open state' },
        { name: 'onOpenChange', type: '(open: boolean) => void', default: '-', description: 'Called when open state changes' },
      ],
    },
    {
      component: 'DatePickerTrigger',
      props: [
        { name: 'placeholder', type: 'string', default: '-', description: 'Override placeholder text' },
        { name: 'style', type: 'ViewStyle', default: '-', description: 'Additional styles' },
      ],
    },
  ],
  accessibility: `The DatePicker component follows WAI-ARIA guidelines:

- The trigger button has role="button" and aria-haspopup="dialog"
- The calendar popup has role="dialog" and aria-modal="true"
- Calendar days are navigable with arrow keys
- Today's date is announced to screen readers
- Disabled dates are marked with aria-disabled
- Selected date is marked with aria-selected
- Month/year navigation is keyboard accessible`,
};

// ========================================
// Button Component Data
// ========================================

export const buttonData: ComponentData = {
  slug: 'button',
  name: 'Button',
  description: 'A clickable button component with multiple variants and sizes.',
  category: 'Components',
  categorySlug: 'components',
  variants: [
    {
      id: 'variants',
      label: 'Variants',
      code: `import { Button } from '@r-ui/react-native'

export default function ButtonVariants() {
  return (
    <div className="flex flex-row gap-3 flex-wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`,
    },
    {
      id: 'sizes',
      label: 'Sizes',
      code: `import { Button } from '@r-ui/react-native'

export default function ButtonSizes() {
  return (
    <div className="flex flex-row items-center gap-3 flex-wrap">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}`,
    },
    {
      id: 'loading',
      label: 'Loading',
      code: `import { Button } from '@r-ui/react-native'

export default function ButtonLoading() {
  return (
    <Button loading>Loading...</Button>
  )
}`,
    },
    {
      id: 'disabled',
      label: 'Disabled',
      code: `import { Button } from '@r-ui/react-native'

export default function ButtonDisabled() {
  return (
    <div className="flex flex-row gap-3 flex-wrap">
      <Button disabled>Disabled</Button>
      <Button disabled variant="secondary">Disabled</Button>
    </div>
  )
}`,
    },
  ],
  installation: 'npx r-ui add button',
  usage: `import { Button } from '@r-ui/react-native'

export default function MyComponent() {
  return (
    <Button onPress={() => console.log('Pressed!')}>
      Click me
    </Button>
  )
}`,
  features: [
    'Multiple variants: primary, secondary, ghost, destructive',
    'Three sizes: sm, md, lg',
    'Loading state with spinner',
    'Disabled state',
    'Full keyboard accessibility',
  ],
  props: [
    {
      component: 'Button',
      props: [
        { name: 'variant', type: '"primary" | "secondary" | "ghost" | "destructive"', default: '"primary"', description: 'Visual style variant' },
        { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
        { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button' },
        { name: 'onPress', type: '() => void', default: '-', description: 'Press handler' },
        { name: 'children', type: 'ReactNode', default: '-', description: 'Button content' },
      ],
    },
  ],
};

// ========================================
// Accordion Component Data
// ========================================

export const accordionData: ComponentData = {
  slug: 'accordion',
  name: 'Accordion',
  description: 'A vertically stacked set of interactive headings that reveal or hide associated content.',
  category: 'Data Display',
  categorySlug: 'data-display',
  variants: [
    {
      id: 'basic',
      label: 'Basic',
      code: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@r-ui/react-native'

export default function BasicAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components' aesthetic.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
    },
    {
      id: 'multiple',
      label: 'Multiple',
      code: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@r-ui/react-native'

export default function MultipleAccordion() {
  return (
    <Accordion type="multiple" defaultValue={['item-1']}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          Content for section 1.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          Content for section 2.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>
          Content for section 3.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
    },
    {
      id: 'disabled',
      label: 'Disabled Item',
      code: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@r-ui/react-native'

export default function DisabledAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Available</AccordionTrigger>
        <AccordionContent>
          This item is available.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled</AccordionTrigger>
        <AccordionContent>
          This item is disabled.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
    },
  ],
  installation: 'npx r-ui add accordion',
  usage: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@r-ui/react-native'

export default function MyComponent() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Click to expand</AccordionTrigger>
        <AccordionContent>
          Hidden content revealed on click.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
  features: [
    'Single or multiple items can be expanded',
    'Collapsible mode for single type',
    'Smooth expand/collapse animations',
    'Disabled item support',
    'Controlled or uncontrolled usage',
    'Full keyboard navigation',
  ],
  props: [
    {
      component: 'Accordion',
      props: [
        { name: 'type', type: '"single" | "multiple"', default: '"single"', description: 'Allow one or multiple items open' },
        { name: 'collapsible', type: 'boolean', default: 'false', description: 'Allow closing all items (single type only)' },
        { name: 'value', type: 'string | string[]', default: '-', description: 'Controlled value' },
        { name: 'defaultValue', type: 'string | string[]', default: '-', description: 'Default value (uncontrolled)' },
        { name: 'onValueChange', type: '(value) => void', default: '-', description: 'Called when value changes' },
      ],
    },
    {
      component: 'AccordionItem',
      props: [
        { name: 'value', type: 'string', default: '-', description: 'Unique identifier (required)' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable this item' },
      ],
    },
  ],
};

// ========================================
// Input Component Data
// ========================================

export const inputData: ComponentData = {
  slug: 'input',
  name: 'Input',
  description: 'A text input field for collecting user data.',
  category: 'Form',
  categorySlug: 'form',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Input } from '@r-ui/react-native'\n\nexport default function BasicInput() {\n  return <Input placeholder="Enter your email" />\n}` },
    { id: 'with-label', label: 'With Label', code: `import { Input, Label } from '@r-ui/react-native'\n\nexport default function InputWithLabel() {\n  return (\n    <div className="space-y-1.5">\n      <Label>Email</Label>\n      <Input placeholder="you@example.com" />\n    </div>\n  )\n}` },
    { id: 'error', label: 'Error State', code: `import { Input, Label } from '@r-ui/react-native'\n\nexport default function InputError() {\n  return <Input error defaultValue="invalid-email" />\n}` },
    { id: 'sizes', label: 'Sizes', code: `import { Input } from '@r-ui/react-native'\n\nexport default function InputSizes() {\n  return (\n    <div className="space-y-3">\n      <Input size="sm" placeholder="Small" />\n      <Input size="md" placeholder="Medium" />\n      <Input size="lg" placeholder="Large" />\n    </div>\n  )\n}` },
    { id: 'disabled', label: 'Disabled', code: `import { Input } from '@r-ui/react-native'\n\nexport default function InputDisabled() {\n  return <Input disabled value="Can't edit this" />\n}` },
  ],
  installation: 'npx r-ui add input',
  usage: `import { Input } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return <Input placeholder="Enter text..." />\n}`,
  features: ['Multiple sizes: sm, md, lg', 'Error state styling', 'Disabled state', 'Focus ring on interaction'],
  props: [{ component: 'Input', props: [
    { name: 'value', type: 'string', default: '-', description: 'Input value' },
    { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text' },
    { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Input size' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Show error state' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input' },
  ]}],
};

// ========================================
// Switch Component Data
// ========================================

export const switchData: ComponentData = {
  slug: 'switch',
  name: 'Switch',
  description: 'A toggle switch for binary on/off states.',
  category: 'Form',
  categorySlug: 'form',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { useState } from 'react'\nimport { Switch } from '@r-ui/react-native'\n\nexport default function BasicSwitch() {\n  const [checked, setChecked] = useState(false)\n  return <Switch checked={checked} onCheckedChange={setChecked} />\n}` },
    { id: 'with-label', label: 'With Label', code: `import { useState } from 'react'\nimport { Switch, Label } from '@r-ui/react-native'\n\nexport default function SwitchWithLabel() {\n  const [checked, setChecked] = useState(true)\n  return (\n    <div className="flex items-center justify-between">\n      <Label>Push Notifications</Label>\n      <Switch checked={checked} onCheckedChange={setChecked} />\n    </div>\n  )\n}` },
    { id: 'disabled', label: 'Disabled', code: `import { Switch } from '@r-ui/react-native'\n\nexport default function SwitchDisabled() {\n  return (\n    <div className="flex gap-4">\n      <Switch checked={false} disabled />\n      <Switch checked={true} disabled />\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add switch',
  usage: `import { useState } from 'react'\nimport { Switch } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  const [enabled, setEnabled] = useState(false)\n  return <Switch checked={enabled} onCheckedChange={setEnabled} />\n}`,
  features: ['Smooth toggle animation', 'Keyboard accessible', 'Disabled state', 'ARIA compliant'],
  props: [{ component: 'Switch', props: [
    { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the switch is on' },
    { name: 'onCheckedChange', type: '(checked: boolean) => void', default: '-', description: 'Called when toggled' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the switch' },
  ]}],
};

// ========================================
// Checkbox Component Data
// ========================================

export const checkboxData: ComponentData = {
  slug: 'checkbox',
  name: 'Checkbox',
  description: 'A checkbox input for selecting multiple options.',
  category: 'Form',
  categorySlug: 'form',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { useState } from 'react'\nimport { Checkbox } from '@r-ui/react-native'\n\nexport default function BasicCheckbox() {\n  const [checked, setChecked] = useState(false)\n  return (\n    <label className="flex items-center gap-2">\n      <Checkbox checked={checked} onCheckedChange={setChecked} />\n      <span>Accept terms</span>\n    </label>\n  )\n}` },
    { id: 'with-label', label: 'With Label', code: `import { useState } from 'react'\nimport { Checkbox } from '@r-ui/react-native'\n\nexport default function CheckboxWithLabel() {\n  const [terms, setTerms] = useState(false)\n  const [newsletter, setNewsletter] = useState(true)\n  return (\n    <div className="space-y-3">\n      <label className="flex items-center gap-2">\n        <Checkbox checked={terms} onCheckedChange={setTerms} />\n        <span>I accept the terms</span>\n      </label>\n      <label className="flex items-center gap-2">\n        <Checkbox checked={newsletter} onCheckedChange={setNewsletter} />\n        <span>Subscribe to newsletter</span>\n      </label>\n    </div>\n  )\n}` },
    { id: 'disabled', label: 'Disabled', code: `import { Checkbox } from '@r-ui/react-native'\n\nexport default function CheckboxDisabled() {\n  return (\n    <div className="flex gap-4">\n      <Checkbox checked={false} disabled />\n      <Checkbox checked={true} disabled />\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add checkbox',
  usage: `import { useState } from 'react'\nimport { Checkbox } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  const [checked, setChecked] = useState(false)\n  return <Checkbox checked={checked} onCheckedChange={setChecked} />\n}`,
  features: ['Controlled and uncontrolled modes', 'Disabled state', 'Keyboard accessible', 'ARIA compliant'],
  props: [{ component: 'Checkbox', props: [
    { name: 'checked', type: 'boolean', default: 'false', description: 'Whether checked' },
    { name: 'onCheckedChange', type: '(checked: boolean) => void', default: '-', description: 'Called when toggled' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the checkbox' },
  ]}],
};

// ========================================
// Select Component Data
// ========================================

export const selectData: ComponentData = {
  slug: 'select',
  name: 'Select',
  description: 'A dropdown selection component for choosing from a list of options.',
  category: 'Form',
  categorySlug: 'form',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { useState } from 'react'\nimport { Select } from '@r-ui/react-native'\n\nexport default function BasicSelect() {\n  const [value, setValue] = useState<string>()\n  return (\n    <Select\n      value={value}\n      onValueChange={setValue}\n      placeholder="Select a fruit"\n      options={[\n        { value: 'apple', label: 'Apple' },\n        { value: 'banana', label: 'Banana' },\n        { value: 'orange', label: 'Orange' },\n      ]}\n    />\n  )\n}` },
    { id: 'with-label', label: 'With Label', code: `import { useState } from 'react'\nimport { Select, Label } from '@r-ui/react-native'\n\nexport default function SelectWithLabel() {\n  const [value, setValue] = useState('react')\n  return (\n    <div className="space-y-1.5">\n      <Label>Framework</Label>\n      <Select value={value} onValueChange={setValue} options={[\n        { value: 'react', label: 'React' },\n        { value: 'vue', label: 'Vue' },\n        { value: 'angular', label: 'Angular' },\n      ]} />\n    </div>\n  )\n}` },
    { id: 'disabled-options', label: 'Disabled Options', code: `import { Select } from '@r-ui/react-native'\n\nexport default function SelectDisabledOptions() {\n  return (\n    <Select placeholder="Select a plan" options={[\n      { value: 'free', label: 'Free Plan' },\n      { value: 'pro', label: 'Pro Plan', disabled: true },\n      { value: 'enterprise', label: 'Enterprise', disabled: true },\n    ]} />\n  )\n}` },
    { id: 'disabled', label: 'Disabled', code: `import { Select } from '@r-ui/react-native'\n\nexport default function SelectDisabled() {\n  return <Select value="option1" disabled options={[{ value: 'option1', label: 'Option 1' }]} />\n}` },
  ],
  installation: 'npx r-ui add select',
  usage: `import { useState } from 'react'\nimport { Select } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  const [value, setValue] = useState<string>()\n  return <Select value={value} onValueChange={setValue} placeholder="Select" options={[]} />\n}`,
  features: ['Keyboard navigation', 'Disabled options support', 'Customizable trigger', 'ARIA compliant'],
  props: [{ component: 'Select', props: [
    { name: 'value', type: 'string', default: '-', description: 'Selected value' },
    { name: 'onValueChange', type: '(value: string) => void', default: '-', description: 'Called when selection changes' },
    { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the select' },
  ]}],
};

// ========================================
// Textarea Component Data
// ========================================

export const textareaData: ComponentData = {
  slug: 'textarea',
  name: 'Textarea',
  description: 'A multi-line text input for longer content.',
  category: 'Form',
  categorySlug: 'form',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Textarea } from '@r-ui/react-native'\n\nexport default function BasicTextarea() {\n  return <Textarea placeholder="Type your message here..." rows={4} />\n}` },
    { id: 'with-label', label: 'With Label', code: `import { Textarea, Label } from '@r-ui/react-native'\n\nexport default function TextareaWithLabel() {\n  return (\n    <div className="space-y-1.5">\n      <Label>Bio</Label>\n      <Textarea placeholder="Tell us about yourself..." rows={4} />\n    </div>\n  )\n}` },
    { id: 'disabled', label: 'Disabled', code: `import { Textarea } from '@r-ui/react-native'\n\nexport default function TextareaDisabled() {\n  return <Textarea disabled value="This textarea is disabled." rows={3} />\n}` },
    { id: 'error', label: 'Error State', code: `import { Textarea } from '@r-ui/react-native'\n\nexport default function TextareaError() {\n  return <Textarea error placeholder="Your feedback..." rows={3} />\n}` },
  ],
  installation: 'npx r-ui add textarea',
  usage: `import { Textarea } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return <Textarea placeholder="Enter text..." rows={4} />\n}`,
  features: ['Character count support', 'Error state styling', 'Disabled state', 'Customizable rows'],
  props: [{ component: 'Textarea', props: [
    { name: 'value', type: 'string', default: '-', description: 'Textarea value' },
    { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text' },
    { name: 'rows', type: 'number', default: '3', description: 'Number of visible rows' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Show error state' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the textarea' },
  ]}],
};

// ========================================
// RadioGroup Component Data
// ========================================

export const radioGroupData: ComponentData = {
  slug: 'radio-group',
  name: 'RadioGroup',
  description: 'A group of radio buttons for selecting a single option.',
  category: 'Form',
  categorySlug: 'form',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { useState } from 'react'\nimport { RadioGroup, RadioGroupItem } from '@r-ui/react-native'\n\nexport default function BasicRadioGroup() {\n  const [value, setValue] = useState('option1')\n  return (\n    <RadioGroup value={value} onValueChange={setValue}>\n      <RadioGroupItem value="option1" label="Default" />\n      <RadioGroupItem value="option2" label="Comfortable" />\n      <RadioGroupItem value="option3" label="Compact" />\n    </RadioGroup>\n  )\n}` },
    { id: 'with-descriptions', label: 'With Descriptions', code: `import { useState } from 'react'\nimport { RadioGroup, RadioGroupItem } from '@r-ui/react-native'\n\nexport default function RadioGroupWithDescriptions() {\n  const [value, setValue] = useState('card')\n  return (\n    <RadioGroup value={value} onValueChange={setValue}>\n      <RadioGroupItem value="card" label="Credit Card" description="Pay with card" />\n      <RadioGroupItem value="paypal" label="PayPal" description="Pay with PayPal" />\n    </RadioGroup>\n  )\n}` },
    { id: 'disabled', label: 'Disabled Options', code: `import { RadioGroup, RadioGroupItem } from '@r-ui/react-native'\n\nexport default function RadioGroupDisabled() {\n  return (\n    <RadioGroup defaultValue="free">\n      <RadioGroupItem value="free" label="Free Plan" />\n      <RadioGroupItem value="pro" label="Pro Plan" disabled />\n    </RadioGroup>\n  )\n}` },
    { id: 'cards', label: 'Card Style', code: `import { useState } from 'react'\nimport { RadioGroup, RadioGroupCard } from '@r-ui/react-native'\n\nexport default function RadioGroupCards() {\n  const [value, setValue] = useState('startup')\n  return (\n    <RadioGroup value={value} onValueChange={setValue} variant="card">\n      <RadioGroupCard value="startup" label="Startup" description="$29/month" />\n      <RadioGroupCard value="business" label="Business" description="$99/month" />\n    </RadioGroup>\n  )\n}` },
  ],
  installation: 'npx r-ui add radio-group',
  usage: `import { useState } from 'react'\nimport { RadioGroup, RadioGroupItem } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  const [value, setValue] = useState('option1')\n  return (\n    <RadioGroup value={value} onValueChange={setValue}>\n      <RadioGroupItem value="option1" label="Option 1" />\n      <RadioGroupItem value="option2" label="Option 2" />\n    </RadioGroup>\n  )\n}`,
  features: ['Single selection', 'Description text support', 'Disabled options', 'Card variant', 'Full keyboard navigation'],
  props: [{ component: 'RadioGroup', props: [
    { name: 'value', type: 'string', default: '-', description: 'Selected value' },
    { name: 'onValueChange', type: '(value: string) => void', default: '-', description: 'Called when selection changes' },
  ]}],
};

// ========================================
// Slider Component Data
// ========================================

export const sliderData: ComponentData = {
  slug: 'slider',
  name: 'Slider',
  description: 'A range slider for selecting numeric values.',
  category: 'Form',
  categorySlug: 'form',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { useState } from 'react'\nimport { Slider } from '@r-ui/react-native'\n\nexport default function BasicSlider() {\n  const [value, setValue] = useState(50)\n  return <Slider value={value} onValueChange={setValue} />\n}` },
    { id: 'with-labels', label: 'With Labels', code: `import { useState } from 'react'\nimport { Slider, Label } from '@r-ui/react-native'\n\nexport default function SliderWithLabels() {\n  const [value, setValue] = useState(25)\n  return (\n    <div className="space-y-3">\n      <div className="flex justify-between">\n        <Label>Volume</Label>\n        <span className="text-sm text-muted">{value}%</span>\n      </div>\n      <Slider value={value} onValueChange={setValue} />\n    </div>\n  )\n}` },
    { id: 'range', label: 'Custom Range', code: `import { useState } from 'react'\nimport { Slider } from '@r-ui/react-native'\n\nexport default function SliderRange() {\n  const [value, setValue] = useState(500)\n  return <Slider value={value} onValueChange={setValue} min={0} max={1000} step={50} />\n}` },
    { id: 'disabled', label: 'Disabled', code: `import { Slider } from '@r-ui/react-native'\n\nexport default function SliderDisabled() {\n  return <Slider value={60} disabled />\n}` },
  ],
  installation: 'npx r-ui add slider',
  usage: `import { useState } from 'react'\nimport { Slider } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  const [value, setValue] = useState(50)\n  return <Slider value={value} onValueChange={setValue} />\n}`,
  features: ['Customizable min/max/step', 'Keyboard navigation', 'Smooth drag interaction', 'Disabled state'],
  props: [{ component: 'Slider', props: [
    { name: 'value', type: 'number', default: '0', description: 'Current value' },
    { name: 'onValueChange', type: '(value: number) => void', default: '-', description: 'Called when value changes' },
    { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
    { name: 'step', type: 'number', default: '1', description: 'Step increment' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the slider' },
  ]}],
};

// ========================================
// Dialog Component Data
// ========================================

export const dialogData: ComponentData = {
  slug: 'dialog',
  name: 'Dialog',
  description: 'A modal dialog for important content and actions.',
  category: 'Feedback',
  categorySlug: 'feedback',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Dialog, Button } from '@r-ui/react-native'\n\nexport default function BasicDialog() {\n  return (\n    <Dialog trigger={<Button>Open Dialog</Button>}>\n      <Dialog.Title>Dialog Title</Dialog.Title>\n      <Dialog.Description>This is a basic dialog.</Dialog.Description>\n      <Dialog.Footer>\n        <Button variant="secondary">Cancel</Button>\n        <Button>Continue</Button>\n      </Dialog.Footer>\n    </Dialog>\n  )\n}` },
    { id: 'with-form', label: 'With Form', code: `import { Dialog, Button, Input, Label } from '@r-ui/react-native'\n\nexport default function DialogWithForm() {\n  return (\n    <Dialog trigger={<Button>Edit Profile</Button>}>\n      <Dialog.Title>Edit Profile</Dialog.Title>\n      <div className="space-y-4">\n        <div><Label>Name</Label><Input defaultValue="John Doe" /></div>\n        <div><Label>Email</Label><Input type="email" defaultValue="john@example.com" /></div>\n      </div>\n      <Dialog.Footer>\n        <Button variant="secondary">Cancel</Button>\n        <Button>Save Changes</Button>\n      </Dialog.Footer>\n    </Dialog>\n  )\n}` },
    { id: 'alert', label: 'Alert Dialog', code: `import { Dialog, Button } from '@r-ui/react-native'\n\nexport default function AlertDialog() {\n  return (\n    <Dialog trigger={<Button variant="destructive">Delete Account</Button>}>\n      <Dialog.Title>Delete Account</Dialog.Title>\n      <Dialog.Description>This action cannot be undone.</Dialog.Description>\n      <Dialog.Footer>\n        <Button variant="secondary">Cancel</Button>\n        <Button variant="destructive">Delete</Button>\n      </Dialog.Footer>\n    </Dialog>\n  )\n}` },
  ],
  installation: 'npx r-ui add dialog',
  usage: `import { Dialog, Button } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Dialog trigger={<Button>Open</Button>}>\n      <Dialog.Title>Title</Dialog.Title>\n      <Dialog.Description>Description</Dialog.Description>\n    </Dialog>\n  )\n}`,
  features: ['Modal overlay with backdrop', 'Focus trap', 'Escape key to close', 'Click outside to close', 'ARIA compliant'],
  props: [{ component: 'Dialog', props: [
    { name: 'open', type: 'boolean', default: '-', description: 'Controlled open state' },
    { name: 'onOpenChange', type: '(open: boolean) => void', default: '-', description: 'Called when open state changes' },
    { name: 'trigger', type: 'ReactNode', default: '-', description: 'Trigger element' },
  ]}],
};

// ========================================
// Toast Component Data
// ========================================

export const toastData: ComponentData = {
  slug: 'toast',
  name: 'Toast',
  description: 'Temporary notifications that appear at the edge of the screen.',
  category: 'Feedback',
  categorySlug: 'feedback',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Button, useToast } from '@r-ui/react-native'\n\nexport default function BasicToast() {\n  const { toast } = useToast()\n  return <Button onClick={() => toast({ title: 'Event has been created' })}>Show Toast</Button>\n}` },
    { id: 'variants', label: 'Variants', code: `import { Button, useToast } from '@r-ui/react-native'\n\nexport default function ToastVariants() {\n  const { toast } = useToast()\n  return (\n    <div className="flex gap-2">\n      <Button onClick={() => toast({ title: 'Settings updated' })}>Default</Button>\n      <Button onClick={() => toast({ variant: 'success', title: 'Success!' })}>Success</Button>\n      <Button onClick={() => toast({ variant: 'error', title: 'Error' })}>Error</Button>\n    </div>\n  )\n}` },
    { id: 'static', label: 'Static Examples', code: `import { Toast } from '@r-ui/react-native'\n\nexport default function ToastStatic() {\n  return (\n    <div className="space-y-3">\n      <Toast title="Scheduled: Catch up" description="Friday at 5:57 PM" />\n      <Toast variant="success" title="Message sent" />\n      <Toast variant="error" title="Failed to send" />\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add toast',
  usage: `import { Button, useToast, Toaster } from '@r-ui/react-native'\n\nfunction App() {\n  return <><YourApp /><Toaster /></>\n}\n\nfunction MyComponent() {\n  const { toast } = useToast()\n  return <Button onClick={() => toast({ title: 'Hello!' })}>Show Toast</Button>\n}`,
  features: ['Multiple variants: default, success, error', 'Auto-dismiss', 'Dismissible with close button', 'Stacked notifications'],
  props: [{ component: 'toast()', props: [
    { name: 'title', type: 'string', default: '-', description: 'Toast title' },
    { name: 'description', type: 'string', default: '-', description: 'Toast description' },
    { name: 'variant', type: '"default" | "success" | "error"', default: '"default"', description: 'Toast variant' },
    { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss duration (ms)' },
  ]}],
};

// ========================================
// Alert Component Data
// ========================================

export const alertData: ComponentData = {
  slug: 'alert',
  name: 'Alert',
  description: 'Contextual feedback messages for user actions.',
  category: 'Feedback',
  categorySlug: 'feedback',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Alert } from '@r-ui/react-native'\n\nexport default function BasicAlert() {\n  return (\n    <Alert title="Heads up!">\n      You can add components to your app using the CLI.\n    </Alert>\n  )\n}` },
    { id: 'variants', label: 'Variants', code: `import { Alert } from '@r-ui/react-native'\n\nexport default function AlertVariants() {\n  return (\n    <div className="space-y-3">\n      <Alert variant="default" title="Note">This is a default alert.</Alert>\n      <Alert variant="success" title="Success">Changes saved successfully.</Alert>\n      <Alert variant="warning" title="Warning">Session expires in 5 minutes.</Alert>\n      <Alert variant="error" title="Error">There was a problem.</Alert>\n      <Alert variant="info" title="Info">A new update is available.</Alert>\n    </div>\n  )\n}` },
    { id: 'without-title', label: 'Without Title', code: `import { Alert } from '@r-ui/react-native'\n\nexport default function AlertWithoutTitle() {\n  return (\n    <div className="space-y-3">\n      <Alert variant="success">Your profile has been updated.</Alert>\n      <Alert variant="error">Failed to load data. Please try again.</Alert>\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add alert',
  usage: `import { Alert } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Alert variant="success" title="Success!">\n      Your action was completed.\n    </Alert>\n  )\n}`,
  features: ['Multiple variants: default, success, warning, error, info', 'Icon support', 'Optional title', 'ARIA compliant'],
  props: [{ component: 'Alert', props: [
    { name: 'variant', type: '"default" | "success" | "warning" | "error" | "info"', default: '"default"', description: 'Alert variant' },
    { name: 'title', type: 'string', default: '-', description: 'Alert title' },
    { name: 'children', type: 'ReactNode', default: '-', description: 'Alert content' },
  ]}],
};

// ========================================
// Spinner Component Data
// ========================================

export const spinnerData: ComponentData = {
  slug: 'spinner',
  name: 'Spinner',
  description: 'A loading spinner to indicate progress.',
  category: 'Feedback',
  categorySlug: 'feedback',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Spinner } from '@r-ui/react-native'\n\nexport default function BasicSpinner() {\n  return <Spinner />\n}` },
    { id: 'sizes', label: 'Sizes', code: `import { Spinner } from '@r-ui/react-native'\n\nexport default function SpinnerSizes() {\n  return (\n    <div className="flex items-center gap-4">\n      <Spinner size="sm" />\n      <Spinner size="md" />\n      <Spinner size="lg" />\n    </div>\n  )\n}` },
    { id: 'colors', label: 'Colors', code: `import { Spinner } from '@r-ui/react-native'\n\nexport default function SpinnerColors() {\n  return (\n    <div className="flex items-center gap-4">\n      <Spinner />\n      <Spinner className="text-emerald-500" />\n      <Spinner className="text-amber-500" />\n      <Spinner className="text-red-500" />\n    </div>\n  )\n}` },
    { id: 'with-text', label: 'With Text', code: `import { Spinner } from '@r-ui/react-native'\n\nexport default function SpinnerWithText() {\n  return (\n    <div className="flex flex-col items-center gap-3">\n      <Spinner size="lg" />\n      <span className="text-sm text-muted">Loading...</span>\n    </div>\n  )\n}` },
    { id: 'button', label: 'In Button', code: `import { Button, Spinner } from '@r-ui/react-native'\n\nexport default function SpinnerButton() {\n  return <Button disabled><Spinner size="sm" /> Processing...</Button>\n}` },
  ],
  installation: 'npx r-ui add spinner',
  usage: `import { Spinner } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return <Spinner />\n}`,
  features: ['Multiple sizes: sm, md, lg', 'Custom colors', 'Smooth rotation animation', 'Works in buttons'],
  props: [{ component: 'Spinner', props: [
    { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Spinner size' },
    { name: 'className', type: 'string', default: '-', description: 'Additional classes' },
  ]}],
};

// ========================================
// Badge Component Data
// ========================================

export const badgeData: ComponentData = {
  slug: 'badge',
  name: 'Badge',
  description: 'Small labels for status, categories, or counts.',
  category: 'Data Display',
  categorySlug: 'data-display',
  variants: [
    { id: 'variants', label: 'Variants', code: `import { Badge } from '@r-ui/react-native'\n\nexport default function BadgeVariants() {\n  return (\n    <div className="flex gap-2 flex-wrap">\n      <Badge>Default</Badge>\n      <Badge variant="secondary">Secondary</Badge>\n      <Badge variant="success">Success</Badge>\n      <Badge variant="warning">Warning</Badge>\n      <Badge variant="error">Error</Badge>\n      <Badge variant="outline">Outline</Badge>\n    </div>\n  )\n}` },
    { id: 'sizes', label: 'Sizes', code: `import { Badge } from '@r-ui/react-native'\n\nexport default function BadgeSizes() {\n  return (\n    <div className="flex gap-2 items-center">\n      <Badge size="sm">Small</Badge>\n      <Badge size="md">Medium</Badge>\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add badge',
  usage: `import { Badge } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return <Badge variant="success">Active</Badge>\n}`,
  features: ['Multiple variants', 'Two sizes: sm, md', 'Rounded pill shape', 'Works inline with text'],
  props: [{ component: 'Badge', props: [
    { name: 'variant', type: '"default" | "secondary" | "success" | "warning" | "error" | "outline"', default: '"default"', description: 'Badge variant' },
    { name: 'size', type: '"sm" | "md"', default: '"md"', description: 'Badge size' },
  ]}],
};

// ========================================
// Progress Component Data
// ========================================

export const progressData: ComponentData = {
  slug: 'progress',
  name: 'Progress',
  description: 'A progress bar to show completion status.',
  category: 'Data Display',
  categorySlug: 'data-display',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Progress } from '@r-ui/react-native'\n\nexport default function BasicProgress() {\n  return <Progress value={60} />\n}` },
    { id: 'animated', label: 'Animated', code: `import { useState, useEffect } from 'react'\nimport { Progress } from '@r-ui/react-native'\n\nexport default function AnimatedProgress() {\n  const [progress, setProgress] = useState(0)\n  useEffect(() => {\n    const timer = setInterval(() => {\n      setProgress((prev) => (prev >= 100 ? 0 : prev + 10))\n    }, 500)\n    return () => clearInterval(timer)\n  }, [])\n  return <Progress value={progress} />\n}` },
    { id: 'variants', label: 'Variants', code: `import { Progress } from '@r-ui/react-native'\n\nexport default function ProgressVariants() {\n  return (\n    <div className="space-y-3">\n      <Progress value={25} variant="default" />\n      <Progress value={50} variant="success" />\n      <Progress value={75} variant="warning" />\n      <Progress value={90} variant="error" />\n    </div>\n  )\n}` },
    { id: 'sizes', label: 'Sizes', code: `import { Progress } from '@r-ui/react-native'\n\nexport default function ProgressSizes() {\n  return (\n    <div className="space-y-3">\n      <Progress value={60} size="sm" />\n      <Progress value={60} size="md" />\n      <Progress value={60} size="lg" />\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add progress',
  usage: `import { Progress } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return <Progress value={60} />\n}`,
  features: ['Multiple variants', 'Three sizes', 'Smooth animations', 'Accessible'],
  props: [{ component: 'Progress', props: [
    { name: 'value', type: 'number', default: '0', description: 'Progress value (0-100)' },
    { name: 'variant', type: '"default" | "success" | "warning" | "error"', default: '"default"', description: 'Color variant' },
    { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Bar height' },
  ]}],
};

// ========================================
// Skeleton Component Data
// ========================================

export const skeletonData: ComponentData = {
  slug: 'skeleton',
  name: 'Skeleton',
  description: 'Placeholder loading states for content.',
  category: 'Data Display',
  categorySlug: 'data-display',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Skeleton } from '@r-ui/react-native'\n\nexport default function BasicSkeleton() {\n  return (\n    <div className="flex items-center space-x-4">\n      <Skeleton className="h-12 w-12 rounded-full" />\n      <div className="space-y-2">\n        <Skeleton className="h-4 w-[200px]" />\n        <Skeleton className="h-4 w-[150px]" />\n      </div>\n    </div>\n  )\n}` },
    { id: 'card', label: 'Card Skeleton', code: `import { Skeleton } from '@r-ui/react-native'\n\nexport default function SkeletonCard() {\n  return (\n    <div className="rounded-xl border p-6 max-w-sm space-y-4">\n      <Skeleton className="h-32 w-full rounded-lg" />\n      <Skeleton className="h-5 w-3/4" />\n      <Skeleton className="h-4 w-full" />\n      <div className="flex gap-2">\n        <Skeleton className="h-9 w-20 rounded-lg" />\n        <Skeleton className="h-9 w-20 rounded-lg" />\n      </div>\n    </div>\n  )\n}` },
    { id: 'table', label: 'Table Skeleton', code: `import { Skeleton } from '@r-ui/react-native'\n\nexport default function SkeletonTable() {\n  return (\n    <div className="rounded-lg border overflow-hidden">\n      <div className="grid grid-cols-4 gap-4 p-4 border-b bg-muted/50">\n        {[1,2,3,4].map((i) => <Skeleton key={i} className="h-4 w-20" />)}\n      </div>\n      {[1,2,3].map((row) => (\n        <div key={row} className="grid grid-cols-4 gap-4 p-4 border-b last:border-b-0">\n          {[1,2,3,4].map((col) => <Skeleton key={col} className="h-4 w-16" />)}\n        </div>\n      ))}\n    </div>\n  )\n}` },
    { id: 'list', label: 'List Skeleton', code: `import { Skeleton } from '@r-ui/react-native'\n\nexport default function SkeletonList() {\n  return (\n    <div className="space-y-3">\n      {[1,2,3,4].map((i) => (\n        <div key={i} className="flex items-center space-x-4 p-3 rounded-lg border">\n          <Skeleton className="h-10 w-10 rounded-full" />\n          <div className="flex-1 space-y-2">\n            <Skeleton className="h-4 w-32" />\n            <Skeleton className="h-3 w-48" />\n          </div>\n          <Skeleton className="h-8 w-16 rounded-md" />\n        </div>\n      ))}\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add skeleton',
  usage: `import { Skeleton } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return <Skeleton className="h-4 w-[200px]" />\n}`,
  features: ['Pulse animation', 'Flexible sizing', 'Works with any shape', 'Easy to compose'],
  props: [{ component: 'Skeleton', props: [
    { name: 'className', type: 'string', default: '-', description: 'Custom classes for sizing/shape' },
  ]}],
};

// ========================================
// Avatar Component Data
// ========================================

export const avatarData: ComponentData = {
  slug: 'avatar',
  name: 'Avatar',
  description: 'User profile images with fallback support.',
  category: 'Data Display',
  categorySlug: 'data-display',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Avatar } from '@r-ui/react-native'\n\nexport default function BasicAvatar() {\n  return (\n    <div className="flex items-center gap-4">\n      <Avatar src="https://example.com/avatar.jpg" fallback="JD" />\n      <Avatar fallback="JD" />\n    </div>\n  )\n}` },
    { id: 'sizes', label: 'Sizes', code: `import { Avatar } from '@r-ui/react-native'\n\nexport default function AvatarSizes() {\n  return (\n    <div className="flex items-end gap-4">\n      <Avatar fallback="SM" size="sm" />\n      <Avatar fallback="MD" size="md" />\n      <Avatar fallback="LG" size="lg" />\n      <Avatar fallback="XL" size="xl" />\n    </div>\n  )\n}` },
    { id: 'group', label: 'Avatar Group', code: `import { Avatar, AvatarGroup } from '@r-ui/react-native'\n\nexport default function AvatarGroupExample() {\n  return (\n    <AvatarGroup>\n      <Avatar src="https://example.com/1.jpg" fallback="JD" />\n      <Avatar src="https://example.com/2.jpg" fallback="AS" />\n      <Avatar fallback="+3" />\n    </AvatarGroup>\n  )\n}` },
    { id: 'with-status', label: 'With Status', code: `import { Avatar } from '@r-ui/react-native'\n\nexport default function AvatarWithStatus() {\n  return (\n    <div className="flex items-center gap-6">\n      <Avatar src="https://example.com/avatar.jpg" fallback="JD" status="online" />\n      <Avatar fallback="AW" status="away" />\n      <Avatar fallback="MK" status="offline" />\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add avatar',
  usage: `import { Avatar } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return <Avatar src="https://example.com/avatar.jpg" fallback="JD" />\n}`,
  features: ['Image with fallback', 'Multiple sizes', 'Avatar groups', 'Status indicators'],
  props: [{ component: 'Avatar', props: [
    { name: 'src', type: 'string', default: '-', description: 'Image source URL' },
    { name: 'fallback', type: 'string', default: '-', description: 'Fallback text (initials)' },
    { name: 'size', type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Avatar size' },
    { name: 'status', type: '"online" | "away" | "offline"', default: '-', description: 'Status indicator' },
  ]}],
};

// ========================================
// Card Component Data
// ========================================

export const cardData: ComponentData = {
  slug: 'card',
  name: 'Card',
  description: 'A container for grouping related content.',
  category: 'Data Display',
  categorySlug: 'data-display',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Card } from '@r-ui/react-native'\n\nexport default function BasicCard() {\n  return (\n    <Card>\n      <Card.Header>\n        <Card.Title>Card Title</Card.Title>\n        <Card.Description>This is a basic card.</Card.Description>\n      </Card.Header>\n      <Card.Content>Card content goes here.</Card.Content>\n    </Card>\n  )\n}` },
    { id: 'with-header', label: 'With Header & Footer', code: `import { Card, Button } from '@r-ui/react-native'\n\nexport default function CardWithHeader() {\n  return (\n    <Card>\n      <Card.Header>\n        <Card.Title>Notifications</Card.Title>\n        <Card.Description>You have 3 unread messages.</Card.Description>\n      </Card.Header>\n      <Card.Content>\n        <div className="space-y-3">...</div>\n      </Card.Content>\n      <Card.Footer>\n        <Button variant="link">View all notifications</Button>\n      </Card.Footer>\n    </Card>\n  )\n}` },
    { id: 'with-image', label: 'With Image', code: `import { Card, Button } from '@r-ui/react-native'\n\nexport default function CardWithImage() {\n  return (\n    <Card className="max-w-sm overflow-hidden">\n      <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-500" />\n      <Card.Header>\n        <Card.Title>Beautiful Sunset</Card.Title>\n        <Card.Description>A stunning view.</Card.Description>\n      </Card.Header>\n      <Card.Footer>\n        <Button>View</Button>\n        <Button variant="secondary">Share</Button>\n      </Card.Footer>\n    </Card>\n  )\n}` },
    { id: 'interactive', label: 'Interactive', code: `import { Card } from '@r-ui/react-native'\n\nexport default function CardInteractive() {\n  return (\n    <Card asChild>\n      <button className="w-full text-left hover:border-primary hover:shadow-md">\n        <Card.Header>\n          <Card.Title>Quick Start</Card.Title>\n          <Card.Description>Get up and running in minutes</Card.Description>\n        </Card.Header>\n      </button>\n    </Card>\n  )\n}` },
  ],
  installation: 'npx r-ui add card',
  usage: `import { Card } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Card>\n      <Card.Header>\n        <Card.Title>Title</Card.Title>\n      </Card.Header>\n      <Card.Content>Content</Card.Content>\n    </Card>\n  )\n}`,
  features: ['Composable structure', 'Header, content, footer sections', 'Image support', 'Interactive variant'],
  props: [{ component: 'Card', props: [
    { name: 'asChild', type: 'boolean', default: 'false', description: 'Render as child element' },
    { name: 'children', type: 'ReactNode', default: '-', description: 'Card content' },
  ]}],
};

// ========================================
// Table Component Data
// ========================================

export const tableData: ComponentData = {
  slug: 'table',
  name: 'Table',
  description: 'A data table for displaying tabular information.',
  category: 'Data Display',
  categorySlug: 'data-display',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Table } from '@r-ui/react-native'\n\nexport default function BasicTable() {\n  return (\n    <Table>\n      <Table.Header>\n        <Table.Row>\n          <Table.Head>Name</Table.Head>\n          <Table.Head>Email</Table.Head>\n          <Table.Head>Role</Table.Head>\n        </Table.Row>\n      </Table.Header>\n      <Table.Body>\n        <Table.Row>\n          <Table.Cell>John Doe</Table.Cell>\n          <Table.Cell>john@example.com</Table.Cell>\n          <Table.Cell>Admin</Table.Cell>\n        </Table.Row>\n      </Table.Body>\n    </Table>\n  )\n}` },
  ],
  installation: 'npx r-ui add table',
  usage: `import { Table } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Table>\n      <Table.Header>\n        <Table.Row>\n          <Table.Head>Column</Table.Head>\n        </Table.Row>\n      </Table.Header>\n      <Table.Body>\n        <Table.Row>\n          <Table.Cell>Data</Table.Cell>\n        </Table.Row>\n      </Table.Body>\n    </Table>\n  )\n}`,
  features: ['Header and body sections', 'Striped rows option', 'Responsive scrolling', 'Accessible markup'],
  props: [{ component: 'Table', props: [
    { name: 'striped', type: 'boolean', default: 'false', description: 'Alternate row colors' },
  ]}],
};

// ========================================
// Collapsible Component Data
// ========================================

export const collapsibleData: ComponentData = {
  slug: 'collapsible',
  name: 'Collapsible',
  description: 'A single expand/collapse container.',
  category: 'Data Display',
  categorySlug: 'data-display',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Collapsible, Button } from '@r-ui/react-native'\n\nexport default function BasicCollapsible() {\n  return (\n    <Collapsible>\n      <Collapsible.Trigger asChild>\n        <Button variant="secondary">Toggle Content</Button>\n      </Collapsible.Trigger>\n      <Collapsible.Content>\n        <p className="p-4 bg-muted rounded-lg mt-2">\n          This content can be collapsed and expanded.\n        </p>\n      </Collapsible.Content>\n    </Collapsible>\n  )\n}` },
  ],
  installation: 'npx r-ui add collapsible',
  usage: `import { Collapsible } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Collapsible>\n      <Collapsible.Trigger>Toggle</Collapsible.Trigger>\n      <Collapsible.Content>Hidden content</Collapsible.Content>\n    </Collapsible>\n  )\n}`,
  features: ['Controlled and uncontrolled modes', 'Smooth animation', 'Custom trigger', 'Accessible'],
  props: [{ component: 'Collapsible', props: [
    { name: 'open', type: 'boolean', default: '-', description: 'Controlled open state' },
    { name: 'onOpenChange', type: '(open: boolean) => void', default: '-', description: 'Called when state changes' },
  ]}],
};

// ========================================
// Sheet Component Data
// ========================================

export const sheetData: ComponentData = {
  slug: 'sheet',
  name: 'Sheet',
  description: 'A slide-out panel for navigation or additional content.',
  category: 'Overlay',
  categorySlug: 'overlay',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Sheet, Button } from '@r-ui/react-native'\n\nexport default function BasicSheet() {\n  return (\n    <Sheet trigger={<Button>Open Sheet</Button>}>\n      <Sheet.Header>\n        <Sheet.Title>Sheet Title</Sheet.Title>\n      </Sheet.Header>\n      <p className="text-sm text-muted">\n        This is a sheet component that slides in from the side.\n      </p>\n    </Sheet>\n  )\n}` },
    { id: 'bottom', label: 'Bottom Sheet', code: `import { Sheet, Button } from '@r-ui/react-native'\n\nexport default function BottomSheet() {\n  return (\n    <Sheet trigger={<Button>Open Bottom Sheet</Button>} side="bottom">\n      <Sheet.Header>\n        <Sheet.Title>Share</Sheet.Title>\n      </Sheet.Header>\n      <p className="text-sm text-muted">Choose how you want to share.</p>\n    </Sheet>\n  )\n}` },
    { id: 'with-form', label: 'With Form', code: `import { Sheet, Button, Input, Label, Textarea } from '@r-ui/react-native'\n\nexport default function SheetWithForm() {\n  return (\n    <Sheet trigger={<Button>Add New Item</Button>}>\n      <Sheet.Header>\n        <Sheet.Title>Add New Item</Sheet.Title>\n      </Sheet.Header>\n      <div className="space-y-4">\n        <div><Label>Name</Label><Input placeholder="Enter name" /></div>\n        <div><Label>Description</Label><Textarea placeholder="Enter description" /></div>\n      </div>\n      <Sheet.Footer>\n        <Button variant="secondary">Cancel</Button>\n        <Button>Save</Button>\n      </Sheet.Footer>\n    </Sheet>\n  )\n}` },
  ],
  installation: 'npx r-ui add sheet',
  usage: `import { Sheet, Button } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Sheet trigger={<Button>Open</Button>}>\n      <Sheet.Header>\n        <Sheet.Title>Title</Sheet.Title>\n      </Sheet.Header>\n      Content here\n    </Sheet>\n  )\n}`,
  features: ['Multiple sides: left, right, top, bottom', 'Backdrop overlay', 'Click outside to close', 'Smooth animation'],
  props: [{ component: 'Sheet', props: [
    { name: 'side', type: '"left" | "right" | "top" | "bottom"', default: '"right"', description: 'Side to slide from' },
    { name: 'trigger', type: 'ReactNode', default: '-', description: 'Trigger element' },
  ]}],
};

// ========================================
// Dropdown Component Data
// ========================================

export const dropdownData: ComponentData = {
  slug: 'dropdown',
  name: 'Dropdown',
  description: 'A menu that appears below a trigger element.',
  category: 'Overlay',
  categorySlug: 'overlay',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Dropdown, Button } from '@r-ui/react-native'\n\nexport default function BasicDropdown() {\n  return (\n    <Dropdown trigger={<Button variant="secondary">Open Menu</Button>}>\n      <Dropdown.Item>Profile</Dropdown.Item>\n      <Dropdown.Item>Settings</Dropdown.Item>\n      <Dropdown.Separator />\n      <Dropdown.Item>Team</Dropdown.Item>\n      <Dropdown.Separator />\n      <Dropdown.Item variant="destructive">Log out</Dropdown.Item>\n    </Dropdown>\n  )\n}` },
    { id: 'with-icons', label: 'With Icons', code: `import { Dropdown, Button } from '@r-ui/react-native'\n\nexport default function DropdownWithIcons() {\n  return (\n    <Dropdown trigger={<Button variant="secondary" size="icon">⋮</Button>} align="end">\n      <Dropdown.Item icon={<EditIcon />}>Edit</Dropdown.Item>\n      <Dropdown.Item icon={<CopyIcon />}>Duplicate</Dropdown.Item>\n      <Dropdown.Separator />\n      <Dropdown.Item icon={<TrashIcon />} variant="destructive">Delete</Dropdown.Item>\n    </Dropdown>\n  )\n}` },
    { id: 'disabled-items', label: 'Disabled Items', code: `import { Dropdown, Button } from '@r-ui/react-native'\n\nexport default function DropdownDisabledItems() {\n  return (\n    <Dropdown trigger={<Button>Actions</Button>}>\n      <Dropdown.Item>New file</Dropdown.Item>\n      <Dropdown.Item>New folder</Dropdown.Item>\n      <Dropdown.Separator />\n      <Dropdown.Item disabled>Share</Dropdown.Item>\n      <Dropdown.Item>Download</Dropdown.Item>\n      <Dropdown.Separator />\n      <Dropdown.Item variant="destructive">Move to trash</Dropdown.Item>\n    </Dropdown>\n  )\n}` },
  ],
  installation: 'npx r-ui add dropdown-menu',
  usage: `import { Dropdown, Button } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Dropdown trigger={<Button>Open</Button>}>\n      <Dropdown.Item>Item 1</Dropdown.Item>\n      <Dropdown.Item>Item 2</Dropdown.Item>\n    </Dropdown>\n  )\n}`,
  features: ['Keyboard navigation', 'Icon support', 'Separators', 'Disabled items', 'Destructive variant'],
  props: [{ component: 'Dropdown', props: [
    { name: 'trigger', type: 'ReactNode', default: '-', description: 'Trigger element' },
    { name: 'align', type: '"start" | "end"', default: '"start"', description: 'Horizontal alignment' },
  ]}],
};

// ========================================
// Popover Component Data
// ========================================

export const popoverData: ComponentData = {
  slug: 'popover',
  name: 'Popover',
  description: 'Floating content that appears next to a trigger.',
  category: 'Overlay',
  categorySlug: 'overlay',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Popover, Button } from '@r-ui/react-native'\n\nexport default function BasicPopover() {\n  return (\n    <Popover trigger={<Button variant="secondary">Open Popover</Button>}>\n      <h4 className="font-medium text-sm">Dimensions</h4>\n      <p className="text-sm text-muted">Set the dimensions for the layer.</p>\n    </Popover>\n  )\n}` },
    { id: 'with-form', label: 'With Form', code: `import { Popover, Button, Input, Label } from '@r-ui/react-native'\n\nexport default function PopoverWithForm() {\n  return (\n    <Popover trigger={<Button>Update dimensions</Button>}>\n      <h4 className="font-medium text-sm mb-2">Dimensions</h4>\n      <div className="grid grid-cols-2 gap-3">\n        <div><Label>Width</Label><Input defaultValue="100%" /></div>\n        <div><Label>Height</Label><Input defaultValue="25px" /></div>\n      </div>\n    </Popover>\n  )\n}` },
    { id: 'menu', label: 'Menu Style', code: `import { Popover, Button } from '@r-ui/react-native'\n\nexport default function PopoverMenu() {\n  return (\n    <Popover trigger={<Button variant="secondary">+ New</Button>} align="start">\n      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md">\n        New Document\n      </button>\n      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md">\n        New Folder\n      </button>\n    </Popover>\n  )\n}` },
  ],
  installation: 'npx r-ui add popover',
  usage: `import { Popover, Button } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Popover trigger={<Button>Open</Button>}>\n      Content here\n    </Popover>\n  )\n}`,
  features: ['Click outside to close', 'Alignment options', 'Customizable content', 'Smooth animations'],
  props: [{ component: 'Popover', props: [
    { name: 'trigger', type: 'ReactNode', default: '-', description: 'Trigger element' },
    { name: 'align', type: '"start" | "center" | "end"', default: '"center"', description: 'Horizontal alignment' },
  ]}],
};

// ========================================
// Tooltip Component Data
// ========================================

export const tooltipData: ComponentData = {
  slug: 'tooltip',
  name: 'Tooltip',
  description: 'A popup that displays helpful information on hover.',
  category: 'Overlay',
  categorySlug: 'overlay',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Tooltip, Button } from '@r-ui/react-native'\n\nexport default function BasicTooltip() {\n  return (\n    <Tooltip content="Add to library">\n      <Button variant="secondary">Hover me</Button>\n    </Tooltip>\n  )\n}` },
    { id: 'sides', label: 'Placement', code: `import { Tooltip, Button } from '@r-ui/react-native'\n\nexport default function TooltipSides() {\n  return (\n    <div className="flex gap-4">\n      <Tooltip content="Top tooltip" side="top"><Button variant="secondary">Top</Button></Tooltip>\n      <Tooltip content="Bottom tooltip" side="bottom"><Button variant="secondary">Bottom</Button></Tooltip>\n      <Tooltip content="Left tooltip" side="left"><Button variant="secondary">Left</Button></Tooltip>\n      <Tooltip content="Right tooltip" side="right"><Button variant="secondary">Right</Button></Tooltip>\n    </div>\n  )\n}` },
    { id: 'with-icons', label: 'Icon Buttons', code: `import { Tooltip } from '@r-ui/react-native'\n\nexport default function TooltipWithIcons() {\n  return (\n    <div className="flex items-center gap-2">\n      <Tooltip content="Bold"><button className="p-2 rounded-md hover:bg-muted">B</button></Tooltip>\n      <Tooltip content="Italic"><button className="p-2 rounded-md hover:bg-muted">I</button></Tooltip>\n      <Tooltip content="Underline"><button className="p-2 rounded-md hover:bg-muted">U</button></Tooltip>\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add tooltip',
  usage: `import { Tooltip, Button } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Tooltip content="Helpful tip">\n      <Button>Hover</Button>\n    </Tooltip>\n  )\n}`,
  features: ['Multiple placements', 'Delay before showing', 'Arrow pointer', 'Accessible'],
  props: [{ component: 'Tooltip', props: [
    { name: 'content', type: 'string', default: '-', description: 'Tooltip content' },
    { name: 'side', type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: 'Placement side' },
    { name: 'delayDuration', type: 'number', default: '400', description: 'Delay before showing (ms)' },
  ]}],
};

// ========================================
// Tabs Component Data
// ========================================

export const tabsData: ComponentData = {
  slug: 'tabs',
  name: 'Tabs',
  description: 'Tabbed navigation for switching between content panels.',
  category: 'Navigation',
  categorySlug: 'navigation',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Tabs } from '@r-ui/react-native'\n\nexport default function BasicTabs() {\n  return (\n    <Tabs defaultValue="account">\n      <Tabs.List>\n        <Tabs.Trigger value="account">Account</Tabs.Trigger>\n        <Tabs.Trigger value="password">Password</Tabs.Trigger>\n        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>\n      </Tabs.List>\n      <Tabs.Content value="account"><p>Make changes to your account.</p></Tabs.Content>\n      <Tabs.Content value="password"><p>Change your password.</p></Tabs.Content>\n      <Tabs.Content value="settings"><p>Configure your settings.</p></Tabs.Content>\n    </Tabs>\n  )\n}` },
    { id: 'with-content', label: 'With Content', code: `import { Tabs } from '@r-ui/react-native'\n\nexport default function TabsWithContent() {\n  return (\n    <Tabs defaultValue="overview">\n      <Tabs.List>\n        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>\n        <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>\n        <Tabs.Trigger value="reports">Reports</Tabs.Trigger>\n      </Tabs.List>\n      <Tabs.Content value="overview">\n        <h4 className="font-medium">Dashboard Overview</h4>\n        <p className="text-sm text-muted">View your key metrics.</p>\n      </Tabs.Content>\n      <Tabs.Content value="analytics">\n        <h4 className="font-medium">Analytics Data</h4>\n      </Tabs.Content>\n      <Tabs.Content value="reports">\n        <h4 className="font-medium">Reports</h4>\n      </Tabs.Content>\n    </Tabs>\n  )\n}` },
    { id: 'pill', label: 'Pill Variant', code: `import { Tabs } from '@r-ui/react-native'\n\nexport default function TabsPill() {\n  return (\n    <Tabs defaultValue="all" variant="pill">\n      <Tabs.List>\n        <Tabs.Trigger value="all">All</Tabs.Trigger>\n        <Tabs.Trigger value="active">Active</Tabs.Trigger>\n        <Tabs.Trigger value="archived">Archived</Tabs.Trigger>\n      </Tabs.List>\n      <Tabs.Content value="all"><p className="text-sm text-muted">Showing all items</p></Tabs.Content>\n      <Tabs.Content value="active"><p className="text-sm text-muted">Showing active items</p></Tabs.Content>\n      <Tabs.Content value="archived"><p className="text-sm text-muted">Showing archived items</p></Tabs.Content>\n    </Tabs>\n  )\n}` },
  ],
  installation: 'npx r-ui add tabs',
  usage: `import { Tabs } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Tabs defaultValue="tab1">\n      <Tabs.List>\n        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>\n        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>\n      </Tabs.List>\n      <Tabs.Content value="tab1">Content 1</Tabs.Content>\n      <Tabs.Content value="tab2">Content 2</Tabs.Content>\n    </Tabs>\n  )\n}`,
  features: ['Underline and pill variants', 'Keyboard navigation', 'Controlled and uncontrolled modes', 'ARIA compliant'],
  props: [{ component: 'Tabs', props: [
    { name: 'value', type: 'string', default: '-', description: 'Controlled value' },
    { name: 'defaultValue', type: 'string', default: '-', description: 'Default value' },
    { name: 'onValueChange', type: '(value: string) => void', default: '-', description: 'Called when tab changes' },
    { name: 'variant', type: '"underline" | "pill"', default: '"underline"', description: 'Visual variant' },
  ]}],
};

// ========================================
// OTPInput Component Data
// ========================================

export const otpInputData: ComponentData = {
  slug: 'otp-input',
  name: 'OTPInput',
  description: 'A one-time password input with individual digit fields.',
  category: 'Form',
  categorySlug: 'form',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { useState } from 'react'\nimport { OTPInput } from '@r-ui/react-native'\n\nexport default function BasicOTPInput() {\n  const [value, setValue] = useState('')\n  return <OTPInput value={value} onChange={setValue} length={6} />\n}` },
    { id: 'with-separator', label: 'With Separator', code: `import { useState } from 'react'\nimport { OTPInput } from '@r-ui/react-native'\n\nexport default function OTPInputWithSeparator() {\n  const [value, setValue] = useState('')\n  return <OTPInput value={value} onChange={setValue} length={6} separator={3} />\n}` },
    { id: 'four-digits', label: 'Four Digits', code: `import { useState } from 'react'\nimport { OTPInput } from '@r-ui/react-native'\n\nexport default function OTPInputFourDigits() {\n  const [value, setValue] = useState('')\n  return <OTPInput value={value} onChange={setValue} length={4} />\n}` },
    { id: 'masked', label: 'Masked', code: `import { useState } from 'react'\nimport { OTPInput } from '@r-ui/react-native'\n\nexport default function OTPInputMasked() {\n  const [value, setValue] = useState('')\n  return <OTPInput value={value} onChange={setValue} length={6} masked />\n}` },
    { id: 'error', label: 'Error State', code: `import { OTPInput } from '@r-ui/react-native'\n\nexport default function OTPInputError() {\n  return <OTPInput defaultValue="123456" error length={6} />\n}` },
    { id: 'disabled', label: 'Disabled', code: `import { OTPInput } from '@r-ui/react-native'\n\nexport default function OTPInputDisabled() {\n  return <OTPInput defaultValue="123456" disabled length={6} />\n}` },
  ],
  installation: 'npx r-ui add otp-input',
  usage: `import { useState } from 'react'\nimport { OTPInput } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  const [value, setValue] = useState('')\n  return <OTPInput value={value} onChange={setValue} length={6} />\n}`,
  features: ['Auto-focus next field on input', 'Backspace navigation', 'Paste support', 'Masked/hidden mode', 'Error state'],
  props: [{ component: 'OTPInput', props: [
    { name: 'value', type: 'string', default: '-', description: 'OTP value' },
    { name: 'onChange', type: '(value: string) => void', default: '-', description: 'Called when value changes' },
    { name: 'length', type: 'number', default: '6', description: 'Number of input fields' },
    { name: 'separator', type: 'number', default: '-', description: 'Position to show separator' },
    { name: 'masked', type: 'boolean', default: 'false', description: 'Hide input values' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Show error state' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input' },
  ]}],
};

// ========================================
// TimePicker Component Data
// ========================================

export const timePickerData: ComponentData = {
  slug: 'time-picker',
  name: 'TimePicker',
  description: 'A time selection component with hour and minute pickers.',
  category: 'Form',
  categorySlug: 'form',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { useState } from 'react'\nimport { TimePicker } from '@r-ui/react-native'\n\nexport default function BasicTimePicker() {\n  const [time, setTime] = useState<Date | null>(null)\n  return <TimePicker value={time} onValueChange={setTime} placeholder="Select time..." />\n}` },
    { id: 'with-default', label: 'With Default', code: `import { useState } from 'react'\nimport { TimePicker } from '@r-ui/react-native'\n\nexport default function TimePickerWithDefault() {\n  const [time, setTime] = useState(new Date())\n  return <TimePicker value={time} onValueChange={setTime} />\n}` },
    { id: '24-hour', label: '24 Hour Format', code: `import { useState } from 'react'\nimport { TimePicker } from '@r-ui/react-native'\n\nexport default function TimePicker24Hour() {\n  const [time, setTime] = useState<Date | null>(null)\n  return <TimePicker value={time} onValueChange={setTime} format="24h" />\n}` },
    { id: 'with-interval', label: 'With Interval', code: `import { useState } from 'react'\nimport { TimePicker } from '@r-ui/react-native'\n\nexport default function TimePickerWithInterval() {\n  const [time, setTime] = useState<Date | null>(null)\n  return <TimePicker value={time} onValueChange={setTime} minuteInterval={15} />\n}` },
    { id: 'with-min-max', label: 'With Min/Max', code: `import { useState } from 'react'\nimport { TimePicker } from '@r-ui/react-native'\n\nexport default function TimePickerWithMinMax() {\n  const [time, setTime] = useState<Date | null>(null)\n  const minTime = new Date(); minTime.setHours(9, 0)\n  const maxTime = new Date(); maxTime.setHours(17, 0)\n  return <TimePicker value={time} onValueChange={setTime} minTime={minTime} maxTime={maxTime} />\n}` },
    { id: 'disabled', label: 'Disabled', code: `import { TimePicker } from '@r-ui/react-native'\n\nexport default function TimePickerDisabled() {\n  return <TimePicker value={new Date()} disabled />\n}` },
  ],
  installation: 'npx r-ui add time-picker',
  usage: `import { useState } from 'react'\nimport { TimePicker } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  const [time, setTime] = useState<Date | null>(null)\n  return <TimePicker value={time} onValueChange={setTime} />\n}`,
  features: ['12/24 hour format', 'Minute intervals', 'Min/max time constraints', 'Keyboard navigation', 'ARIA compliant'],
  props: [{ component: 'TimePicker', props: [
    { name: 'value', type: 'Date | null', default: '-', description: 'Selected time' },
    { name: 'onValueChange', type: '(time: Date | null) => void', default: '-', description: 'Called when time changes' },
    { name: 'format', type: '"12h" | "24h"', default: '"12h"', description: 'Time format' },
    { name: 'minuteInterval', type: 'number', default: '1', description: 'Minute step interval' },
    { name: 'minTime', type: 'Date', default: '-', description: 'Minimum selectable time' },
    { name: 'maxTime', type: 'Date', default: '-', description: 'Maximum selectable time' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the picker' },
  ]}],
};

// ========================================
// DateRangePicker Component Data
// ========================================

export const dateRangePickerData: ComponentData = {
  slug: 'date-range-picker',
  name: 'DateRangePicker',
  description: 'A calendar-based date range selection component.',
  category: 'Form',
  categorySlug: 'form',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { useState } from 'react'\nimport { DateRangePicker } from '@r-ui/react-native'\n\nexport default function BasicDateRangePicker() {\n  const [range, setRange] = useState({ from: null, to: null })\n  return <DateRangePicker value={range} onValueChange={setRange} />\n}` },
    { id: 'with-default', label: 'With Default', code: `import { useState } from 'react'\nimport { DateRangePicker } from '@r-ui/react-native'\n\nexport default function DateRangePickerWithDefault() {\n  const [range, setRange] = useState({\n    from: new Date(),\n    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)\n  })\n  return <DateRangePicker value={range} onValueChange={setRange} />\n}` },
    { id: 'with-presets', label: 'With Presets', code: `import { useState } from 'react'\nimport { DateRangePicker } from '@r-ui/react-native'\n\nexport default function DateRangePickerWithPresets() {\n  const [range, setRange] = useState({ from: null, to: null })\n  return <DateRangePicker value={range} onValueChange={setRange} showPresets />\n}` },
    { id: 'no-presets', label: 'No Presets', code: `import { useState } from 'react'\nimport { DateRangePicker } from '@r-ui/react-native'\n\nexport default function DateRangePickerNoPresets() {\n  const [range, setRange] = useState({ from: null, to: null })\n  return <DateRangePicker value={range} onValueChange={setRange} showPresets={false} />\n}` },
    { id: 'with-min-max', label: 'With Min/Max', code: `import { useState } from 'react'\nimport { DateRangePicker } from '@r-ui/react-native'\n\nexport default function DateRangePickerWithMinMax() {\n  const [range, setRange] = useState({ from: null, to: null })\n  const today = new Date()\n  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 0)\n  return <DateRangePicker value={range} onValueChange={setRange} minDate={today} maxDate={maxDate} />\n}` },
    { id: 'disabled', label: 'Disabled', code: `import { DateRangePicker } from '@r-ui/react-native'\n\nexport default function DateRangePickerDisabled() {\n  return <DateRangePicker value={{ from: new Date(), to: new Date() }} disabled />\n}` },
  ],
  installation: 'npx r-ui add date-range-picker',
  usage: `import { useState } from 'react'\nimport { DateRangePicker } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  const [range, setRange] = useState({ from: null, to: null })\n  return <DateRangePicker value={range} onValueChange={setRange} />\n}`,
  features: ['Two-month calendar view', 'Quick presets (Today, Last 7 days, etc.)', 'Min/max date constraints', 'Range highlighting', 'Keyboard navigation'],
  props: [{ component: 'DateRangePicker', props: [
    { name: 'value', type: '{ from: Date | null, to: Date | null }', default: '-', description: 'Selected date range' },
    { name: 'onValueChange', type: '(range) => void', default: '-', description: 'Called when range changes' },
    { name: 'showPresets', type: 'boolean', default: 'true', description: 'Show quick presets' },
    { name: 'minDate', type: 'Date', default: '-', description: 'Minimum selectable date' },
    { name: 'maxDate', type: 'Date', default: '-', description: 'Maximum selectable date' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the picker' },
  ]}],
};

// ========================================
// Combobox Component Data
// ========================================

export const comboboxData: ComponentData = {
  slug: 'combobox',
  name: 'Combobox',
  description: 'A searchable dropdown with filtering and keyboard navigation.',
  category: 'Form',
  categorySlug: 'form',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { useState } from 'react'\nimport { Combobox } from '@r-ui/react-native'\n\nexport default function BasicCombobox() {\n  const [value, setValue] = useState('')\n  return (\n    <Combobox value={value} onValueChange={setValue} placeholder="Search...">\n      <Combobox.Item value="react">React</Combobox.Item>\n      <Combobox.Item value="vue">Vue</Combobox.Item>\n      <Combobox.Item value="angular">Angular</Combobox.Item>\n    </Combobox>\n  )\n}` },
    { id: 'with-groups', label: 'With Groups', code: `import { useState } from 'react'\nimport { Combobox } from '@r-ui/react-native'\n\nexport default function ComboboxWithGroups() {\n  const [value, setValue] = useState('')\n  return (\n    <Combobox value={value} onValueChange={setValue} placeholder="Search frameworks...">\n      <Combobox.Group label="Frontend">\n        <Combobox.Item value="react">React</Combobox.Item>\n        <Combobox.Item value="vue">Vue</Combobox.Item>\n      </Combobox.Group>\n      <Combobox.Group label="Backend">\n        <Combobox.Item value="node">Node.js</Combobox.Item>\n        <Combobox.Item value="django">Django</Combobox.Item>\n      </Combobox.Group>\n    </Combobox>\n  )\n}` },
    { id: 'disabled', label: 'Disabled', code: `import { Combobox } from '@r-ui/react-native'\n\nexport default function ComboboxDisabled() {\n  return (\n    <Combobox value="react" disabled>\n      <Combobox.Item value="react">React</Combobox.Item>\n    </Combobox>\n  )\n}` },
    { id: 'disabled-items', label: 'Disabled Items', code: `import { useState } from 'react'\nimport { Combobox } from '@r-ui/react-native'\n\nexport default function ComboboxDisabledItems() {\n  const [value, setValue] = useState('')\n  return (\n    <Combobox value={value} onValueChange={setValue} placeholder="Search...">\n      <Combobox.Item value="react">React</Combobox.Item>\n      <Combobox.Item value="vue" disabled>Vue (coming soon)</Combobox.Item>\n      <Combobox.Item value="angular">Angular</Combobox.Item>\n    </Combobox>\n  )\n}` },
  ],
  installation: 'npx r-ui add combobox',
  usage: `import { useState } from 'react'\nimport { Combobox } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  const [value, setValue] = useState('')\n  return (\n    <Combobox value={value} onValueChange={setValue} placeholder="Search...">\n      <Combobox.Item value="option1">Option 1</Combobox.Item>\n      <Combobox.Item value="option2">Option 2</Combobox.Item>\n    </Combobox>\n  )\n}`,
  features: ['Text filtering', 'Grouped items', 'Keyboard navigation', 'Disabled items', 'ARIA compliant'],
  props: [{ component: 'Combobox', props: [
    { name: 'value', type: 'string', default: '-', description: 'Selected value' },
    { name: 'onValueChange', type: '(value: string) => void', default: '-', description: 'Called when selection changes' },
    { name: 'placeholder', type: 'string', default: '-', description: 'Search placeholder text' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the combobox' },
  ]}],
};

// ========================================
// Separator Component Data
// ========================================

export const separatorData: ComponentData = {
  slug: 'separator',
  name: 'Separator',
  description: 'A visual divider between content sections.',
  category: 'Layout',
  categorySlug: 'layout',
  variants: [
    { id: 'horizontal', label: 'Horizontal', code: `import { Separator } from '@r-ui/react-native'\n\nexport default function HorizontalSeparator() {\n  return (\n    <div>\n      <p>Content above</p>\n      <Separator className="my-4" />\n      <p>Content below</p>\n    </div>\n  )\n}` },
    { id: 'vertical', label: 'Vertical', code: `import { Separator } from '@r-ui/react-native'\n\nexport default function VerticalSeparator() {\n  return (\n    <div className="flex h-5 items-center gap-4">\n      <span>Item 1</span>\n      <Separator orientation="vertical" />\n      <span>Item 2</span>\n      <Separator orientation="vertical" />\n      <span>Item 3</span>\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add separator',
  usage: `import { Separator } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return <Separator />\n}`,
  features: ['Horizontal and vertical orientation', 'Decorative role', 'Customizable styling'],
  props: [{ component: 'Separator', props: [
    { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Divider direction' },
  ]}],
};

// ========================================
// Text Component Data
// ========================================

export const textData: ComponentData = {
  slug: 'text',
  name: 'Text',
  description: 'A component for rendering text with various styles.',
  category: 'Typography',
  categorySlug: 'typography',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Text } from '@r-ui/react-native'\n\nexport default function BasicText() {\n  return <Text>The quick brown fox jumps over the lazy dog.</Text>\n}` },
    { id: 'sizes', label: 'Sizes', code: `import { Text } from '@r-ui/react-native'\n\nexport default function TextSizes() {\n  return (\n    <div className="space-y-2">\n      <Text size="xs">Extra Small</Text>\n      <Text size="sm">Small</Text>\n      <Text size="base">Base</Text>\n      <Text size="lg">Large</Text>\n      <Text size="xl">Extra Large</Text>\n    </div>\n  )\n}` },
    { id: 'weights', label: 'Weights', code: `import { Text } from '@r-ui/react-native'\n\nexport default function TextWeights() {\n  return (\n    <div className="space-y-2">\n      <Text weight="normal">Normal weight</Text>\n      <Text weight="medium">Medium weight</Text>\n      <Text weight="semibold">Semibold weight</Text>\n      <Text weight="bold">Bold weight</Text>\n    </div>\n  )\n}` },
    { id: 'colors', label: 'Colors', code: `import { Text } from '@r-ui/react-native'\n\nexport default function TextColors() {\n  return (\n    <div className="space-y-2">\n      <Text>Default color</Text>\n      <Text color="muted">Muted color</Text>\n      <Text color="primary">Primary color</Text>\n      <Text color="success">Success color</Text>\n      <Text color="error">Error color</Text>\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add text',
  usage: `import { Text } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return <Text>Hello, world!</Text>\n}`,
  features: ['Multiple sizes', 'Font weights', 'Color variants', 'Accessible by default'],
  props: [{ component: 'Text', props: [
    { name: 'size', type: '"xs" | "sm" | "base" | "lg" | "xl"', default: '"base"', description: 'Text size' },
    { name: 'weight', type: '"normal" | "medium" | "semibold" | "bold"', default: '"normal"', description: 'Font weight' },
    { name: 'color', type: '"default" | "muted" | "primary" | "success" | "error"', default: '"default"', description: 'Text color' },
  ]}],
};

// ========================================
// Heading Component Data
// ========================================

export const headingData: ComponentData = {
  slug: 'heading',
  name: 'Heading',
  description: 'Semantic heading components for page structure.',
  category: 'Typography',
  categorySlug: 'typography',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Heading } from '@r-ui/react-native'\n\nexport default function BasicHeading() {\n  return <Heading level={1}>Page Title</Heading>\n}` },
    { id: 'levels', label: 'All Levels', code: `import { Heading } from '@r-ui/react-native'\n\nexport default function HeadingLevels() {\n  return (\n    <div className="space-y-4">\n      <Heading level={1}>Heading 1</Heading>\n      <Heading level={2}>Heading 2</Heading>\n      <Heading level={3}>Heading 3</Heading>\n      <Heading level={4}>Heading 4</Heading>\n      <Heading level={5}>Heading 5</Heading>\n      <Heading level={6}>Heading 6</Heading>\n    </div>\n  )\n}` },
    { id: 'with-description', label: 'With Description', code: `import { Heading, Text } from '@r-ui/react-native'\n\nexport default function HeadingWithDescription() {\n  return (\n    <div>\n      <Heading level={2}>Dashboard</Heading>\n      <Text color="muted">Welcome back! Here's what's happening.</Text>\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add heading',
  usage: `import { Heading } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return <Heading level={1}>Page Title</Heading>\n}`,
  features: ['Semantic HTML levels (h1-h6)', 'Consistent styling', 'Accessible heading hierarchy'],
  props: [{ component: 'Heading', props: [
    { name: 'level', type: '1 | 2 | 3 | 4 | 5 | 6', default: '1', description: 'Heading level (h1-h6)' },
    { name: 'children', type: 'ReactNode', default: '-', description: 'Heading content' },
  ]}],
};

// ========================================
// Code Component Data
// ========================================

export const codeData: ComponentData = {
  slug: 'code',
  name: 'Code',
  description: 'Display code snippets with syntax highlighting.',
  category: 'Typography',
  categorySlug: 'typography',
  variants: [
    { id: 'inline', label: 'Inline', code: `import { Code, Text } from '@r-ui/react-native'\n\nexport default function InlineCode() {\n  return <Text>Use the <Code>useState</Code> hook to manage state.</Text>\n}` },
    { id: 'block', label: 'Block', code: `import { CodeBlock } from '@r-ui/react-native'\n\nexport default function CodeBlockExample() {\n  const code = \`import { Button } from '@r-ui/react-native'\n\nexport default function App() {\n  return <Button>Click me</Button>\n}\`\n  return <CodeBlock language="tsx">{code}</CodeBlock>\n}` },
    { id: 'with-copy', label: 'With Copy', code: `import { CodeBlock } from '@r-ui/react-native'\n\nexport default function CodeBlockWithCopy() {\n  return <CodeBlock copyable>npx r-ui add button</CodeBlock>\n}` },
  ],
  installation: 'npx r-ui add code',
  usage: `import { Code, CodeBlock } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <>\n      <Text>Inline: <Code>code</Code></Text>\n      <CodeBlock>Multi-line code</CodeBlock>\n    </>\n  )\n}`,
  features: ['Inline and block variants', 'Syntax highlighting', 'Copy to clipboard', 'Language detection'],
  props: [{ component: 'Code', props: [
    { name: 'children', type: 'string', default: '-', description: 'Code content' },
  ]}, { component: 'CodeBlock', props: [
    { name: 'language', type: 'string', default: '-', description: 'Programming language' },
    { name: 'copyable', type: 'boolean', default: 'false', description: 'Show copy button' },
  ]}],
};

// ========================================
// Label Component Data
// ========================================

export const labelData: ComponentData = {
  slug: 'label',
  name: 'Label',
  description: 'Accessible labels for form controls.',
  category: 'Typography',
  categorySlug: 'typography',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Label } from '@r-ui/react-native'\n\nexport default function BasicLabel() {\n  return <Label>Email address</Label>\n}` },
    { id: 'with-input', label: 'With Input', code: `import { Label, Input } from '@r-ui/react-native'\n\nexport default function LabelWithInput() {\n  return (\n    <div className="space-y-1.5">\n      <Label htmlFor="email">Email</Label>\n      <Input id="email" placeholder="you@example.com" />\n    </div>\n  )\n}` },
    { id: 'required', label: 'Required', code: `import { Label, Input } from '@r-ui/react-native'\n\nexport default function LabelRequired() {\n  return (\n    <div className="space-y-1.5">\n      <Label htmlFor="name" required>Full name</Label>\n      <Input id="name" placeholder="John Doe" />\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add label',
  usage: `import { Label, Input } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <div>\n      <Label htmlFor="field">Field</Label>\n      <Input id="field" />\n    </div>\n  )\n}`,
  features: ['Accessible form labels', 'Required indicator', 'Associates with form controls'],
  props: [{ component: 'Label', props: [
    { name: 'htmlFor', type: 'string', default: '-', description: 'ID of the associated form element' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Show required indicator' },
  ]}],
};

// ========================================
// Container Component Data
// ========================================

export const containerData: ComponentData = {
  slug: 'container',
  name: 'Container',
  description: 'A responsive container for centering content.',
  category: 'Layout',
  categorySlug: 'layout',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Container } from '@r-ui/react-native'\n\nexport default function BasicContainer() {\n  return <Container>Centered content with max-width</Container>\n}` },
    { id: 'sizes', label: 'Sizes', code: `import { Container } from '@r-ui/react-native'\n\nexport default function ContainerSizes() {\n  return (\n    <div className="space-y-4">\n      <Container size="sm">Small container</Container>\n      <Container size="md">Medium container</Container>\n      <Container size="lg">Large container</Container>\n      <Container size="xl">Extra large container</Container>\n    </div>\n  )\n}` },
    { id: 'with-padding', label: 'With Padding', code: `import { Container } from '@r-ui/react-native'\n\nexport default function ContainerWithPadding() {\n  return <Container padding>Content with horizontal padding</Container>\n}` },
  ],
  installation: 'npx r-ui add container',
  usage: `import { Container } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return <Container>Your content here</Container>\n}`,
  features: ['Responsive max-width', 'Multiple sizes', 'Optional padding', 'Centers content'],
  props: [{ component: 'Container', props: [
    { name: 'size', type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"lg"', description: 'Container max-width' },
    { name: 'padding', type: 'boolean', default: 'true', description: 'Add horizontal padding' },
  ]}],
};

// ========================================
// Flex Component Data
// ========================================

export const flexData: ComponentData = {
  slug: 'flex',
  name: 'Flex',
  description: 'A flexbox container for flexible layouts.',
  category: 'Layout',
  categorySlug: 'layout',
  variants: [
    { id: 'row', label: 'Row', code: `import { Flex } from '@r-ui/react-native'\n\nexport default function FlexRow() {\n  return (\n    <Flex direction="row" gap={4}>\n      <div>Item 1</div>\n      <div>Item 2</div>\n      <div>Item 3</div>\n    </Flex>\n  )\n}` },
    { id: 'column', label: 'Column', code: `import { Flex } from '@r-ui/react-native'\n\nexport default function FlexColumn() {\n  return (\n    <Flex direction="column" gap={4}>\n      <div>Item 1</div>\n      <div>Item 2</div>\n      <div>Item 3</div>\n    </Flex>\n  )\n}` },
    { id: 'justify', label: 'Justify', code: `import { Flex } from '@r-ui/react-native'\n\nexport default function FlexJustify() {\n  return (\n    <Flex justify="between">\n      <div>Start</div>\n      <div>End</div>\n    </Flex>\n  )\n}` },
    { id: 'gap', label: 'Gap', code: `import { Flex } from '@r-ui/react-native'\n\nexport default function FlexGap() {\n  return (\n    <Flex gap={8}>\n      <div>Item 1</div>\n      <div>Item 2</div>\n      <div>Item 3</div>\n    </Flex>\n  )\n}` },
  ],
  installation: 'npx r-ui add flex',
  usage: `import { Flex } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Flex direction="row" gap={4} align="center">\n      <Child />\n    </Flex>\n  )\n}`,
  features: ['Row and column direction', 'Justify and align options', 'Gap spacing', 'Wrap support'],
  props: [{ component: 'Flex', props: [
    { name: 'direction', type: '"row" | "column"', default: '"row"', description: 'Flex direction' },
    { name: 'justify', type: '"start" | "end" | "center" | "between" | "around"', default: '"start"', description: 'Justify content' },
    { name: 'align', type: '"start" | "end" | "center" | "stretch"', default: '"stretch"', description: 'Align items' },
    { name: 'gap', type: 'number', default: '0', description: 'Gap between items' },
    { name: 'wrap', type: 'boolean', default: 'false', description: 'Allow wrapping' },
  ]}],
};

// ========================================
// Grid Component Data
// ========================================

export const gridData: ComponentData = {
  slug: 'grid',
  name: 'Grid',
  description: 'A CSS grid container for complex layouts.',
  category: 'Layout',
  categorySlug: 'layout',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Grid } from '@r-ui/react-native'\n\nexport default function BasicGrid() {\n  return (\n    <Grid cols={3} gap={4}>\n      <div>1</div>\n      <div>2</div>\n      <div>3</div>\n      <div>4</div>\n      <div>5</div>\n      <div>6</div>\n    </Grid>\n  )\n}` },
    { id: 'responsive', label: 'Responsive', code: `import { Grid } from '@r-ui/react-native'\n\nexport default function ResponsiveGrid() {\n  return (\n    <Grid cols={{ sm: 1, md: 2, lg: 4 }} gap={4}>\n      <div>Item 1</div>\n      <div>Item 2</div>\n      <div>Item 3</div>\n      <div>Item 4</div>\n    </Grid>\n  )\n}` },
    { id: 'span', label: 'Column Span', code: `import { Grid, GridItem } from '@r-ui/react-native'\n\nexport default function GridSpan() {\n  return (\n    <Grid cols={4} gap={4}>\n      <GridItem colSpan={2}>Span 2</GridItem>\n      <div>1</div>\n      <div>1</div>\n      <GridItem colSpan={4}>Full width</GridItem>\n    </Grid>\n  )\n}` },
  ],
  installation: 'npx r-ui add grid',
  usage: `import { Grid } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Grid cols={3} gap={4}>\n      <div>Item 1</div>\n      <div>Item 2</div>\n      <div>Item 3</div>\n    </Grid>\n  )\n}`,
  features: ['Fixed or responsive columns', 'Gap spacing', 'Column spanning', 'Row spanning'],
  props: [{ component: 'Grid', props: [
    { name: 'cols', type: 'number | ResponsiveValue', default: '1', description: 'Number of columns' },
    { name: 'gap', type: 'number', default: '0', description: 'Gap between items' },
  ]}],
};

// ========================================
// Spacer Component Data
// ========================================

export const spacerData: ComponentData = {
  slug: 'spacer',
  name: 'Spacer',
  description: 'A flexible spacer for adding space between elements.',
  category: 'Layout',
  categorySlug: 'layout',
  variants: [
    { id: 'vertical', label: 'Vertical', code: `import { Spacer } from '@r-ui/react-native'\n\nexport default function VerticalSpacer() {\n  return (\n    <div>\n      <div>Content above</div>\n      <Spacer size={8} />\n      <div>Content below</div>\n    </div>\n  )\n}` },
    { id: 'horizontal', label: 'Horizontal', code: `import { Spacer } from '@r-ui/react-native'\n\nexport default function HorizontalSpacer() {\n  return (\n    <div className="flex">\n      <div>Left</div>\n      <Spacer size={4} direction="horizontal" />\n      <div>Right</div>\n    </div>\n  )\n}` },
    { id: 'sizes', label: 'Sizes', code: `import { Spacer } from '@r-ui/react-native'\n\nexport default function SpacerSizes() {\n  return (\n    <div>\n      <Spacer size={2} /> {/* 8px */}\n      <Spacer size={4} /> {/* 16px */}\n      <Spacer size={8} /> {/* 32px */}\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add spacer',
  usage: `import { Spacer } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <div>\n      <Content />\n      <Spacer size={4} />\n      <MoreContent />\n    </div>\n  )\n}`,
  features: ['Vertical and horizontal spacing', 'Multiple sizes', 'Flexible in flex containers'],
  props: [{ component: 'Spacer', props: [
    { name: 'size', type: 'number', default: '4', description: 'Space size (in spacing units)' },
    { name: 'direction', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Spacing direction' },
  ]}],
};

// ========================================
// AspectRatio Component Data
// ========================================

export const aspectRatioData: ComponentData = {
  slug: 'aspect-ratio',
  name: 'AspectRatio',
  description: 'Maintain a consistent aspect ratio for content.',
  category: 'Layout',
  categorySlug: 'layout',
  variants: [
    { id: 'video', label: '16:9 Video', code: `import { AspectRatio } from '@r-ui/react-native'\n\nexport default function VideoAspectRatio() {\n  return (\n    <AspectRatio ratio={16 / 9}>\n      <img src="/video-thumbnail.jpg" alt="Video" className="object-cover" />\n    </AspectRatio>\n  )\n}` },
    { id: 'square', label: 'Square', code: `import { AspectRatio } from '@r-ui/react-native'\n\nexport default function SquareAspectRatio() {\n  return (\n    <AspectRatio ratio={1}>\n      <img src="/avatar.jpg" alt="Avatar" className="object-cover rounded-full" />\n    </AspectRatio>\n  )\n}` },
    { id: 'image', label: 'Image Ratios', code: `import { AspectRatio } from '@r-ui/react-native'\n\nexport default function ImageRatios() {\n  return (\n    <div className="grid grid-cols-3 gap-4">\n      <AspectRatio ratio={1}>Square</AspectRatio>\n      <AspectRatio ratio={4 / 3}>4:3</AspectRatio>\n      <AspectRatio ratio={3 / 4}>Portrait</AspectRatio>\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add aspect-ratio',
  usage: `import { AspectRatio } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <AspectRatio ratio={16 / 9}>\n      <img src="/image.jpg" alt="..." className="object-cover" />\n    </AspectRatio>\n  )\n}`,
  features: ['Maintains aspect ratio', 'Common presets (16:9, 4:3, 1:1)', 'Responsive'],
  props: [{ component: 'AspectRatio', props: [
    { name: 'ratio', type: 'number', default: '1', description: 'Aspect ratio (width / height)' },
  ]}],
};

// ========================================
// ScrollArea Component Data
// ========================================

export const scrollAreaData: ComponentData = {
  slug: 'scroll-area',
  name: 'ScrollArea',
  description: 'A scrollable container with custom scrollbars.',
  category: 'Layout',
  categorySlug: 'layout',
  variants: [
    { id: 'vertical', label: 'Vertical', code: `import { ScrollArea } from '@r-ui/react-native'\n\nexport default function VerticalScroll() {\n  return (\n    <ScrollArea className="h-48">\n      <div className="space-y-2">\n        {Array.from({ length: 20 }).map((_, i) => (\n          <div key={i}>Item {i + 1}</div>\n        ))}\n      </div>\n    </ScrollArea>\n  )\n}` },
    { id: 'horizontal', label: 'Horizontal', code: `import { ScrollArea } from '@r-ui/react-native'\n\nexport default function HorizontalScroll() {\n  return (\n    <ScrollArea orientation="horizontal">\n      <div className="flex gap-4">\n        {['React', 'Vue', 'Angular', 'Svelte', 'Solid'].map(tag => (\n          <span key={tag} className="px-4 py-2 rounded-full bg-muted">{tag}</span>\n        ))}\n      </div>\n    </ScrollArea>\n  )\n}` },
    { id: 'both', label: 'Both Directions', code: `import { ScrollArea } from '@r-ui/react-native'\n\nexport default function BothScroll() {\n  return (\n    <ScrollArea className="h-48 w-64" orientation="both">\n      <div className="w-[500px]">\n        {/* Large content */}\n      </div>\n    </ScrollArea>\n  )\n}` },
  ],
  installation: 'npx r-ui add scroll-area',
  usage: `import { ScrollArea } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <ScrollArea className="h-48">\n      <LongContent />\n    </ScrollArea>\n  )\n}`,
  features: ['Custom scrollbar styling', 'Vertical, horizontal, or both', 'Touch-friendly', 'Accessible'],
  props: [{ component: 'ScrollArea', props: [
    { name: 'orientation', type: '"vertical" | "horizontal" | "both"', default: '"vertical"', description: 'Scroll direction' },
  ]}],
};

// ========================================
// Breadcrumb Component Data
// ========================================

export const breadcrumbData: ComponentData = {
  slug: 'breadcrumb',
  name: 'Breadcrumb',
  description: 'Navigation breadcrumb trail.',
  category: 'Navigation',
  categorySlug: 'navigation',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Breadcrumb } from '@r-ui/react-native'\n\nexport default function BasicBreadcrumb() {\n  return (\n    <Breadcrumb>\n      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>\n      <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>\n      <Breadcrumb.Item>Electronics</Breadcrumb.Item>\n    </Breadcrumb>\n  )\n}` },
    { id: 'with-icons', label: 'With Icons', code: `import { Breadcrumb, HomeIcon } from '@r-ui/react-native'\n\nexport default function BreadcrumbWithIcons() {\n  return (\n    <Breadcrumb>\n      <Breadcrumb.Item href="/"><HomeIcon /></Breadcrumb.Item>\n      <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>\n      <Breadcrumb.Item>Breadcrumb</Breadcrumb.Item>\n    </Breadcrumb>\n  )\n}` },
    { id: 'collapsed', label: 'Collapsed', code: `import { Breadcrumb } from '@r-ui/react-native'\n\nexport default function CollapsedBreadcrumb() {\n  return (\n    <Breadcrumb maxItems={3}>\n      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>\n      <Breadcrumb.Item href="/a">Level 1</Breadcrumb.Item>\n      <Breadcrumb.Item href="/a/b">Level 2</Breadcrumb.Item>\n      <Breadcrumb.Item href="/a/b/c">Level 3</Breadcrumb.Item>\n      <Breadcrumb.Item>Current</Breadcrumb.Item>\n    </Breadcrumb>\n  )\n}` },
  ],
  installation: 'npx r-ui add breadcrumb',
  usage: `import { Breadcrumb } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Breadcrumb>\n      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>\n      <Breadcrumb.Item>Current Page</Breadcrumb.Item>\n    </Breadcrumb>\n  )\n}`,
  features: ['Automatic separator', 'Collapsible for long paths', 'Custom separators', 'Accessible navigation'],
  props: [{ component: 'Breadcrumb', props: [
    { name: 'maxItems', type: 'number', default: '-', description: 'Max visible items before collapsing' },
    { name: 'separator', type: 'ReactNode', default: '"/"', description: 'Custom separator' },
  ]}],
};

// ========================================
// Pagination Component Data
// ========================================

export const paginationData: ComponentData = {
  slug: 'pagination',
  name: 'Pagination',
  description: 'Navigation for paginated content.',
  category: 'Navigation',
  categorySlug: 'navigation',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Pagination } from '@r-ui/react-native'\n\nexport default function BasicPagination() {\n  return (\n    <Pagination\n      total={50}\n      page={3}\n      onChange={(page) => console.log(page)}\n    />\n  )\n}` },
    { id: 'with-ellipsis', label: 'With Ellipsis', code: `import { Pagination } from '@r-ui/react-native'\n\nexport default function PaginationWithEllipsis() {\n  return (\n    <Pagination\n      total={100}\n      page={5}\n      siblingCount={1}\n      onChange={(page) => console.log(page)}\n    />\n  )\n}` },
    { id: 'compact', label: 'Compact', code: `import { Pagination } from '@r-ui/react-native'\n\nexport default function CompactPagination() {\n  return (\n    <Pagination\n      total={10}\n      page={3}\n      variant="compact"\n      onChange={(page) => console.log(page)}\n    />\n  )\n}` },
  ],
  installation: 'npx r-ui add pagination',
  usage: `import { Pagination } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  const [page, setPage] = useState(1)\n  return <Pagination total={50} page={page} onChange={setPage} />\n}`,
  features: ['Page numbers with ellipsis', 'Prev/Next buttons', 'Compact variant', 'Keyboard navigation'],
  props: [{ component: 'Pagination', props: [
    { name: 'total', type: 'number', default: '-', description: 'Total number of pages' },
    { name: 'page', type: 'number', default: '1', description: 'Current page' },
    { name: 'onChange', type: '(page: number) => void', default: '-', description: 'Page change handler' },
    { name: 'variant', type: '"default" | "compact"', default: '"default"', description: 'Display variant' },
  ]}],
};

// ========================================
// Link Component Data
// ========================================

export const linkData: ComponentData = {
  slug: 'link',
  name: 'Link',
  description: 'Styled anchor links for navigation.',
  category: 'Navigation',
  categorySlug: 'navigation',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Link } from '@r-ui/react-native'\n\nexport default function BasicLink() {\n  return <Link href="/docs">View documentation</Link>\n}` },
    { id: 'external', label: 'External', code: `import { Link } from '@r-ui/react-native'\n\nexport default function ExternalLink() {\n  return <Link href="https://github.com" external>GitHub</Link>\n}` },
    { id: 'variants', label: 'Variants', code: `import { Link } from '@r-ui/react-native'\n\nexport default function LinkVariants() {\n  return (\n    <div className="space-y-2">\n      <Link href="#">Default link</Link>\n      <Link href="#" variant="underline">Underlined link</Link>\n      <Link href="#" variant="subtle">Subtle link</Link>\n    </div>\n  )\n}` },
  ],
  installation: 'npx r-ui add link',
  usage: `import { Link } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return <Link href="/about">About us</Link>\n}`,
  features: ['Multiple variants', 'External link indicator', 'Works with Next.js Link', 'Accessible'],
  props: [{ component: 'Link', props: [
    { name: 'href', type: 'string', default: '-', description: 'Link destination' },
    { name: 'external', type: 'boolean', default: 'false', description: 'Opens in new tab with icon' },
    { name: 'variant', type: '"default" | "underline" | "subtle"', default: '"default"', description: 'Link style' },
  ]}],
};

// ========================================
// Menubar Component Data
// ========================================

export const menubarData: ComponentData = {
  slug: 'menubar',
  name: 'Menubar',
  description: 'A horizontal menu bar with dropdown menus.',
  category: 'Navigation',
  categorySlug: 'navigation',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Menubar } from '@r-ui/react-native'\n\nexport default function BasicMenubar() {\n  return (\n    <Menubar>\n      <Menubar.Menu>\n        <Menubar.Trigger>File</Menubar.Trigger>\n        <Menubar.Content>\n          <Menubar.Item>New File</Menubar.Item>\n          <Menubar.Item>Open...</Menubar.Item>\n          <Menubar.Separator />\n          <Menubar.Item>Exit</Menubar.Item>\n        </Menubar.Content>\n      </Menubar.Menu>\n    </Menubar>\n  )\n}` },
    { id: 'with-shortcuts', label: 'With Shortcuts', code: `import { Menubar } from '@r-ui/react-native'\n\nexport default function MenubarWithShortcuts() {\n  return (\n    <Menubar>\n      <Menubar.Menu>\n        <Menubar.Trigger>File</Menubar.Trigger>\n        <Menubar.Content>\n          <Menubar.Item shortcut="⌘N">New File</Menubar.Item>\n          <Menubar.Item shortcut="⌘O">Open...</Menubar.Item>\n          <Menubar.Item shortcut="⌘S">Save</Menubar.Item>\n        </Menubar.Content>\n      </Menubar.Menu>\n    </Menubar>\n  )\n}` },
    { id: 'with-submenus', label: 'With Submenus', code: `import { Menubar } from '@r-ui/react-native'\n\nexport default function MenubarWithSubmenus() {\n  return (\n    <Menubar>\n      <Menubar.Menu>\n        <Menubar.Trigger>File</Menubar.Trigger>\n        <Menubar.Content>\n          <Menubar.Item>New File</Menubar.Item>\n          <Menubar.Sub>\n            <Menubar.SubTrigger>Open Recent</Menubar.SubTrigger>\n            <Menubar.SubContent>\n              <Menubar.Item>Document.tsx</Menubar.Item>\n              <Menubar.Item>styles.css</Menubar.Item>\n            </Menubar.SubContent>\n          </Menubar.Sub>\n        </Menubar.Content>\n      </Menubar.Menu>\n    </Menubar>\n  )\n}` },
  ],
  installation: 'npx r-ui add menubar',
  usage: `import { Menubar } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Menubar>\n      <Menubar.Menu>\n        <Menubar.Trigger>File</Menubar.Trigger>\n        <Menubar.Content>\n          <Menubar.Item>New</Menubar.Item>\n        </Menubar.Content>\n      </Menubar.Menu>\n    </Menubar>\n  )\n}`,
  features: ['Dropdown menus', 'Keyboard shortcuts', 'Nested submenus', 'Full keyboard navigation'],
  props: [{ component: 'Menubar.Item', props: [
    { name: 'shortcut', type: 'string', default: '-', description: 'Keyboard shortcut display' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the item' },
  ]}],
};

// ========================================
// NavigationMenu Component Data
// ========================================

export const navigationMenuData: ComponentData = {
  slug: 'navigation-menu',
  name: 'NavigationMenu',
  description: 'A horizontal navigation menu with dropdowns.',
  category: 'Navigation',
  categorySlug: 'navigation',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { NavigationMenu } from '@r-ui/react-native'\n\nexport default function BasicNavigationMenu() {\n  return (\n    <NavigationMenu>\n      <NavigationMenu.List>\n        <NavigationMenu.Item>\n          <NavigationMenu.Trigger>Getting Started</NavigationMenu.Trigger>\n          <NavigationMenu.Content>\n            <ul className="grid gap-3 p-4 w-[400px]">\n              <li><a href="#">Introduction</a></li>\n              <li><a href="#">Installation</a></li>\n            </ul>\n          </NavigationMenu.Content>\n        </NavigationMenu.Item>\n        <NavigationMenu.Item>\n          <NavigationMenu.Link href="/docs">Documentation</NavigationMenu.Link>\n        </NavigationMenu.Item>\n      </NavigationMenu.List>\n    </NavigationMenu>\n  )\n}` },
    { id: 'with-indicator', label: 'With Indicator', code: `import { NavigationMenu } from '@r-ui/react-native'\n\nexport default function NavigationMenuWithIndicator() {\n  return (\n    <NavigationMenu>\n      <NavigationMenu.List>\n        <NavigationMenu.Item>\n          <NavigationMenu.Link href="/" active>Home</NavigationMenu.Link>\n        </NavigationMenu.Item>\n        <NavigationMenu.Item>\n          <NavigationMenu.Link href="/products">Products</NavigationMenu.Link>\n        </NavigationMenu.Item>\n        <NavigationMenu.Item>\n          <NavigationMenu.Link href="/about">About</NavigationMenu.Link>\n        </NavigationMenu.Item>\n      </NavigationMenu.List>\n      <NavigationMenu.Indicator />\n    </NavigationMenu>\n  )\n}` },
  ],
  installation: 'npx r-ui add navigation-menu',
  usage: `import { NavigationMenu } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <NavigationMenu>\n      <NavigationMenu.List>\n        <NavigationMenu.Item>\n          <NavigationMenu.Link href="/">Home</NavigationMenu.Link>\n        </NavigationMenu.Item>\n      </NavigationMenu.List>\n    </NavigationMenu>\n  )\n}`,
  features: ['Rich dropdown content', 'Active indicator', 'Keyboard navigation', 'Accessible'],
  props: [{ component: 'NavigationMenu.Link', props: [
    { name: 'href', type: 'string', default: '-', description: 'Link destination' },
    { name: 'active', type: 'boolean', default: 'false', description: 'Mark as active' },
  ]}],
};

// ========================================
// AlertDialog Component Data
// ========================================

export const alertDialogData: ComponentData = {
  slug: 'alert-dialog',
  name: 'AlertDialog',
  description: 'A modal dialog for important confirmations.',
  category: 'Overlay',
  categorySlug: 'overlay',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { AlertDialog, Button } from '@r-ui/react-native'\n\nexport default function BasicAlertDialog() {\n  return (\n    <AlertDialog>\n      <AlertDialog.Trigger asChild>\n        <Button>Show Dialog</Button>\n      </AlertDialog.Trigger>\n      <AlertDialog.Content>\n        <AlertDialog.Title>Are you sure?</AlertDialog.Title>\n        <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>\n        <AlertDialog.Footer>\n          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>\n          <AlertDialog.Action>Continue</AlertDialog.Action>\n        </AlertDialog.Footer>\n      </AlertDialog.Content>\n    </AlertDialog>\n  )\n}` },
    { id: 'destructive', label: 'Destructive', code: `import { AlertDialog, Button } from '@r-ui/react-native'\n\nexport default function DestructiveAlertDialog() {\n  return (\n    <AlertDialog>\n      <AlertDialog.Trigger asChild>\n        <Button variant="destructive">Delete Account</Button>\n      </AlertDialog.Trigger>\n      <AlertDialog.Content>\n        <AlertDialog.Title>Delete Account</AlertDialog.Title>\n        <AlertDialog.Description>This will permanently delete your account and all data.</AlertDialog.Description>\n        <AlertDialog.Footer>\n          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>\n          <AlertDialog.Action variant="destructive">Delete</AlertDialog.Action>\n        </AlertDialog.Footer>\n      </AlertDialog.Content>\n    </AlertDialog>\n  )\n}` },
    { id: 'with-input', label: 'With Input', code: `import { AlertDialog, Button, Input } from '@r-ui/react-native'\n\nexport default function AlertDialogWithInput() {\n  return (\n    <AlertDialog>\n      <AlertDialog.Trigger asChild>\n        <Button>Delete Project</Button>\n      </AlertDialog.Trigger>\n      <AlertDialog.Content>\n        <AlertDialog.Title>Delete Project</AlertDialog.Title>\n        <AlertDialog.Description>Type "delete" to confirm.</AlertDialog.Description>\n        <Input placeholder="Type 'delete'" />\n        <AlertDialog.Footer>\n          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>\n          <AlertDialog.Action>Delete</AlertDialog.Action>\n        </AlertDialog.Footer>\n      </AlertDialog.Content>\n    </AlertDialog>\n  )\n}` },
  ],
  installation: 'npx r-ui add alert-dialog',
  usage: `import { AlertDialog, Button } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <AlertDialog>\n      <AlertDialog.Trigger asChild>\n        <Button>Open</Button>\n      </AlertDialog.Trigger>\n      <AlertDialog.Content>\n        <AlertDialog.Title>Title</AlertDialog.Title>\n        <AlertDialog.Description>Description</AlertDialog.Description>\n        <AlertDialog.Footer>\n          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>\n          <AlertDialog.Action>Confirm</AlertDialog.Action>\n        </AlertDialog.Footer>\n      </AlertDialog.Content>\n    </AlertDialog>\n  )\n}`,
  features: ['Modal with backdrop', 'Focus trap', 'Cancel and confirm actions', 'Accessible'],
  props: [{ component: 'AlertDialog.Action', props: [
    { name: 'variant', type: '"default" | "destructive"', default: '"default"', description: 'Action button style' },
  ]}],
};

// ========================================
// ActionSheet Component Data
// ========================================

export const actionSheetData: ComponentData = {
  slug: 'action-sheet',
  name: 'ActionSheet',
  description: 'iOS-style bottom action sheet.',
  category: 'Overlay',
  categorySlug: 'overlay',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { ActionSheet, Button } from '@r-ui/react-native'\n\nexport default function BasicActionSheet() {\n  return (\n    <ActionSheet>\n      <ActionSheet.Trigger asChild>\n        <Button>Show Actions</Button>\n      </ActionSheet.Trigger>\n      <ActionSheet.Content>\n        <ActionSheet.Item>Share</ActionSheet.Item>\n        <ActionSheet.Item>Add to Favorites</ActionSheet.Item>\n        <ActionSheet.Item>Download</ActionSheet.Item>\n      </ActionSheet.Content>\n    </ActionSheet>\n  )\n}` },
    { id: 'destructive', label: 'Destructive', code: `import { ActionSheet, Button } from '@r-ui/react-native'\n\nexport default function DestructiveActionSheet() {\n  return (\n    <ActionSheet>\n      <ActionSheet.Trigger asChild>\n        <Button variant="secondary">More Options</Button>\n      </ActionSheet.Trigger>\n      <ActionSheet.Content>\n        <ActionSheet.Item>Edit</ActionSheet.Item>\n        <ActionSheet.Item>Duplicate</ActionSheet.Item>\n        <ActionSheet.Item variant="destructive">Delete</ActionSheet.Item>\n      </ActionSheet.Content>\n    </ActionSheet>\n  )\n}` },
    { id: 'with-cancel', label: 'With Cancel', code: `import { ActionSheet, Button } from '@r-ui/react-native'\n\nexport default function ActionSheetWithCancel() {\n  return (\n    <ActionSheet>\n      <ActionSheet.Trigger asChild>\n        <Button>Share Photo</Button>\n      </ActionSheet.Trigger>\n      <ActionSheet.Content>\n        <ActionSheet.Item>Message</ActionSheet.Item>\n        <ActionSheet.Item>Email</ActionSheet.Item>\n        <ActionSheet.Item>Copy Link</ActionSheet.Item>\n        <ActionSheet.Cancel>Cancel</ActionSheet.Cancel>\n      </ActionSheet.Content>\n    </ActionSheet>\n  )\n}` },
  ],
  installation: 'npx r-ui add action-sheet',
  usage: `import { ActionSheet, Button } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <ActionSheet>\n      <ActionSheet.Trigger asChild>\n        <Button>Open</Button>\n      </ActionSheet.Trigger>\n      <ActionSheet.Content>\n        <ActionSheet.Item>Action 1</ActionSheet.Item>\n        <ActionSheet.Item>Action 2</ActionSheet.Item>\n      </ActionSheet.Content>\n    </ActionSheet>\n  )\n}`,
  features: ['Bottom slide animation', 'Destructive actions', 'Cancel button', 'Touch-friendly'],
  props: [{ component: 'ActionSheet.Item', props: [
    { name: 'variant', type: '"default" | "destructive"', default: '"default"', description: 'Item style' },
    { name: 'icon', type: 'ReactNode', default: '-', description: 'Optional icon' },
  ]}],
};

// ========================================
// ContextMenu Component Data
// ========================================

export const contextMenuData: ComponentData = {
  slug: 'context-menu',
  name: 'ContextMenu',
  description: 'A right-click context menu.',
  category: 'Overlay',
  categorySlug: 'overlay',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { ContextMenu } from '@r-ui/react-native'\n\nexport default function BasicContextMenu() {\n  return (\n    <ContextMenu>\n      <ContextMenu.Trigger className="w-64 h-32 border-2 border-dashed rounded-lg flex items-center justify-center">\n        Right-click here\n      </ContextMenu.Trigger>\n      <ContextMenu.Content>\n        <ContextMenu.Item>Back</ContextMenu.Item>\n        <ContextMenu.Item>Forward</ContextMenu.Item>\n        <ContextMenu.Item>Reload</ContextMenu.Item>\n        <ContextMenu.Separator />\n        <ContextMenu.Item>Save As...</ContextMenu.Item>\n      </ContextMenu.Content>\n    </ContextMenu>\n  )\n}` },
    { id: 'with-icons', label: 'With Icons', code: `import { ContextMenu } from '@r-ui/react-native'\n\nexport default function ContextMenuWithIcons() {\n  return (\n    <ContextMenu>\n      <ContextMenu.Trigger>Right-click target</ContextMenu.Trigger>\n      <ContextMenu.Content>\n        <ContextMenu.Item icon={<CutIcon />} shortcut="⌘X">Cut</ContextMenu.Item>\n        <ContextMenu.Item icon={<CopyIcon />} shortcut="⌘C">Copy</ContextMenu.Item>\n        <ContextMenu.Item icon={<PasteIcon />} shortcut="⌘V">Paste</ContextMenu.Item>\n      </ContextMenu.Content>\n    </ContextMenu>\n  )\n}` },
    { id: 'nested', label: 'Nested', code: `import { ContextMenu } from '@r-ui/react-native'\n\nexport default function NestedContextMenu() {\n  return (\n    <ContextMenu>\n      <ContextMenu.Trigger>Right-click target</ContextMenu.Trigger>\n      <ContextMenu.Content>\n        <ContextMenu.Item>New File</ContextMenu.Item>\n        <ContextMenu.Sub>\n          <ContextMenu.SubTrigger>Share</ContextMenu.SubTrigger>\n          <ContextMenu.SubContent>\n            <ContextMenu.Item>Email</ContextMenu.Item>\n            <ContextMenu.Item>Message</ContextMenu.Item>\n          </ContextMenu.SubContent>\n        </ContextMenu.Sub>\n      </ContextMenu.Content>\n    </ContextMenu>\n  )\n}` },
  ],
  installation: 'npx r-ui add context-menu',
  usage: `import { ContextMenu } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <ContextMenu>\n      <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>\n      <ContextMenu.Content>\n        <ContextMenu.Item>Action</ContextMenu.Item>\n      </ContextMenu.Content>\n    </ContextMenu>\n  )\n}`,
  features: ['Right-click activation', 'Keyboard shortcuts', 'Nested submenus', 'Keyboard navigation'],
  props: [{ component: 'ContextMenu.Item', props: [
    { name: 'shortcut', type: 'string', default: '-', description: 'Keyboard shortcut display' },
    { name: 'icon', type: 'ReactNode', default: '-', description: 'Optional icon' },
  ]}],
};

// ========================================
// HoverCard Component Data
// ========================================

export const hoverCardData: ComponentData = {
  slug: 'hover-card',
  name: 'HoverCard',
  description: 'A card that appears on hover.',
  category: 'Overlay',
  categorySlug: 'overlay',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { HoverCard } from '@r-ui/react-native'\n\nexport default function BasicHoverCard() {\n  return (\n    <HoverCard>\n      <HoverCard.Trigger className="text-blue-500 underline">\n        @r-ui\n      </HoverCard.Trigger>\n      <HoverCard.Content>\n        <h4 className="font-semibold">r/ui Components</h4>\n        <p className="text-sm text-muted">A universal React Native component library.</p>\n      </HoverCard.Content>\n    </HoverCard>\n  )\n}` },
    { id: 'user', label: 'User Preview', code: `import { HoverCard, Avatar } from '@r-ui/react-native'\n\nexport default function UserHoverCard() {\n  return (\n    <HoverCard>\n      <HoverCard.Trigger>@johndoe</HoverCard.Trigger>\n      <HoverCard.Content>\n        <div className="flex gap-4">\n          <Avatar src="/avatar.jpg" fallback="JD" />\n          <div>\n            <h4 className="font-semibold">John Doe</h4>\n            <p className="text-sm text-muted">Software Engineer</p>\n          </div>\n        </div>\n      </HoverCard.Content>\n    </HoverCard>\n  )\n}` },
    { id: 'link', label: 'Link Preview', code: `import { HoverCard } from '@r-ui/react-native'\n\nexport default function LinkHoverCard() {\n  return (\n    <p>\n      Check out the{' '}\n      <HoverCard>\n        <HoverCard.Trigger className="text-blue-500 underline">\n          documentation\n        </HoverCard.Trigger>\n        <HoverCard.Content>\n          <h4 className="font-semibold">r/ui Documentation</h4>\n          <p className="text-sm text-muted">Comprehensive guides and API references.</p>\n        </HoverCard.Content>\n      </HoverCard>{' '}\n      for more info.\n    </p>\n  )\n}` },
  ],
  installation: 'npx r-ui add hover-card',
  usage: `import { HoverCard } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <HoverCard>\n      <HoverCard.Trigger>Hover me</HoverCard.Trigger>\n      <HoverCard.Content>Card content</HoverCard.Content>\n    </HoverCard>\n  )\n}`,
  features: ['Hover activation', 'Open delay', 'Custom positioning', 'Rich content'],
  props: [{ component: 'HoverCard', props: [
    { name: 'openDelay', type: 'number', default: '700', description: 'Delay before opening (ms)' },
    { name: 'closeDelay', type: 'number', default: '300', description: 'Delay before closing (ms)' },
  ]}],
};

// ========================================
// Command Component Data
// ========================================

export const commandData: ComponentData = {
  slug: 'command',
  name: 'Command',
  description: 'A command palette for searching and actions.',
  category: 'Overlay',
  categorySlug: 'overlay',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Command } from '@r-ui/react-native'\n\nexport default function BasicCommand() {\n  return (\n    <Command>\n      <Command.Input placeholder="Type a command..." />\n      <Command.List>\n        <Command.Empty>No results found.</Command.Empty>\n        <Command.Item>New File</Command.Item>\n        <Command.Item>Search</Command.Item>\n        <Command.Item>Settings</Command.Item>\n      </Command.List>\n    </Command>\n  )\n}` },
    { id: 'with-groups', label: 'With Groups', code: `import { Command } from '@r-ui/react-native'\n\nexport default function CommandWithGroups() {\n  return (\n    <Command>\n      <Command.Input placeholder="Search..." />\n      <Command.List>\n        <Command.Group heading="Suggestions">\n          <Command.Item>New Document</Command.Item>\n          <Command.Item>New Spreadsheet</Command.Item>\n        </Command.Group>\n        <Command.Group heading="Settings">\n          <Command.Item>Profile</Command.Item>\n          <Command.Item>Notifications</Command.Item>\n        </Command.Group>\n      </Command.List>\n    </Command>\n  )\n}` },
    { id: 'dialog', label: 'Dialog', code: `import { Command, Button } from '@r-ui/react-native'\n\nexport default function CommandDialog() {\n  const [open, setOpen] = useState(false)\n  return (\n    <>\n      <Button onClick={() => setOpen(true)}>Open Command (⌘K)</Button>\n      <Command.Dialog open={open} onOpenChange={setOpen}>\n        <Command.Input placeholder="Type a command..." />\n        <Command.List>\n          <Command.Item>Home</Command.Item>\n          <Command.Item>Settings</Command.Item>\n          <Command.Item>Toggle Theme</Command.Item>\n        </Command.List>\n      </Command.Dialog>\n    </>\n  )\n}` },
  ],
  installation: 'npx r-ui add command',
  usage: `import { Command } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Command>\n      <Command.Input placeholder="Search..." />\n      <Command.List>\n        <Command.Item>Action 1</Command.Item>\n        <Command.Item>Action 2</Command.Item>\n      </Command.List>\n    </Command>\n  )\n}`,
  features: ['Fuzzy search', 'Grouped items', 'Keyboard navigation', 'Dialog variant'],
  props: [{ component: 'Command.Item', props: [
    { name: 'value', type: 'string', default: '-', description: 'Value for filtering' },
    { name: 'onSelect', type: '() => void', default: '-', description: 'Selection handler' },
  ]}],
};

// ========================================
// Carousel Component Data
// ========================================

export const carouselData: ComponentData = {
  slug: 'carousel',
  name: 'Carousel',
  description: 'A slideshow for cycling through content.',
  category: 'Data Display',
  categorySlug: 'data-display',
  variants: [
    { id: 'basic', label: 'Basic', code: `import { Carousel } from '@r-ui/react-native'\n\nexport default function BasicCarousel() {\n  return (\n    <Carousel>\n      <Carousel.Content>\n        <Carousel.Item>Slide 1</Carousel.Item>\n        <Carousel.Item>Slide 2</Carousel.Item>\n        <Carousel.Item>Slide 3</Carousel.Item>\n      </Carousel.Content>\n      <Carousel.Previous />\n      <Carousel.Next />\n    </Carousel>\n  )\n}` },
    { id: 'with-dots', label: 'With Dots', code: `import { Carousel } from '@r-ui/react-native'\n\nexport default function CarouselWithDots() {\n  return (\n    <Carousel>\n      <Carousel.Content>\n        <Carousel.Item>Slide 1</Carousel.Item>\n        <Carousel.Item>Slide 2</Carousel.Item>\n        <Carousel.Item>Slide 3</Carousel.Item>\n      </Carousel.Content>\n      <Carousel.Dots />\n    </Carousel>\n  )\n}` },
    { id: 'with-arrows', label: 'With Arrows', code: `import { Carousel } from '@r-ui/react-native'\n\nexport default function CarouselWithArrows() {\n  return (\n    <Carousel>\n      <Carousel.Content>\n        <Carousel.Item>Slide 1</Carousel.Item>\n        <Carousel.Item>Slide 2</Carousel.Item>\n        <Carousel.Item>Slide 3</Carousel.Item>\n      </Carousel.Content>\n      <Carousel.Previous />\n      <Carousel.Next />\n    </Carousel>\n  )\n}` },
    { id: 'autoplay', label: 'Autoplay', code: `import { Carousel } from '@r-ui/react-native'\n\nexport default function CarouselAutoplay() {\n  return (\n    <Carousel autoplay interval={3000}>\n      <Carousel.Content>\n        <Carousel.Item>Slide 1</Carousel.Item>\n        <Carousel.Item>Slide 2</Carousel.Item>\n        <Carousel.Item>Slide 3</Carousel.Item>\n      </Carousel.Content>\n      <Carousel.Dots />\n    </Carousel>\n  )\n}` },
  ],
  installation: 'npx r-ui add carousel',
  usage: `import { Carousel } from '@r-ui/react-native'\n\nexport default function MyComponent() {\n  return (\n    <Carousel>\n      <Carousel.Content>\n        <Carousel.Item>Slide 1</Carousel.Item>\n        <Carousel.Item>Slide 2</Carousel.Item>\n      </Carousel.Content>\n      <Carousel.Previous />\n      <Carousel.Next />\n    </Carousel>\n  )\n}`,
  features: ['Prev/Next navigation', 'Dot indicators', 'Autoplay', 'Touch/swipe support'],
  props: [{ component: 'Carousel', props: [
    { name: 'autoplay', type: 'boolean', default: 'false', description: 'Enable auto-advance' },
    { name: 'interval', type: 'number', default: '5000', description: 'Autoplay interval (ms)' },
    { name: 'loop', type: 'boolean', default: 'true', description: 'Loop back to start' },
  ]}],
};

// ========================================
// Registry Map
// ========================================

export const componentRegistry: Record<string, ComponentData> = {
  'date-picker': datePickerData,
  'button': buttonData,
  'accordion': accordionData,
  'input': inputData,
  'switch': switchData,
  'checkbox': checkboxData,
  'select': selectData,
  'textarea': textareaData,
  'radio-group': radioGroupData,
  'slider': sliderData,
  'otp-input': otpInputData,
  'time-picker': timePickerData,
  'date-range-picker': dateRangePickerData,
  'combobox': comboboxData,
  'dialog': dialogData,
  'toast': toastData,
  'alert': alertData,
  'spinner': spinnerData,
  'badge': badgeData,
  'progress': progressData,
  'skeleton': skeletonData,
  'avatar': avatarData,
  'card': cardData,
  'table': tableData,
  'collapsible': collapsibleData,
  'sheet': sheetData,
  'dropdown': dropdownData,
  'popover': popoverData,
  'tooltip': tooltipData,
  'tabs': tabsData,
  'separator': separatorData,
  'text': textData,
  'heading': headingData,
  'code': codeData,
  'label': labelData,
  'container': containerData,
  'flex': flexData,
  'grid': gridData,
  'spacer': spacerData,
  'aspect-ratio': aspectRatioData,
  'scroll-area': scrollAreaData,
  'breadcrumb': breadcrumbData,
  'pagination': paginationData,
  'link': linkData,
  'menubar': menubarData,
  'navigation-menu': navigationMenuData,
  'alert-dialog': alertDialogData,
  'action-sheet': actionSheetData,
  'context-menu': contextMenuData,
  'hover-card': hoverCardData,
  'command': commandData,
  'carousel': carouselData,
};

// ========================================
// Helper Functions
// ========================================

export function getComponentData(slug: string): ComponentData | undefined {
  return componentRegistry[slug];
}

export function getAllComponentSlugs(): string[] {
  return Object.keys(componentRegistry);
}
