'use client';

import { useState } from 'react';

const buttonStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all active:scale-[0.98] px-4 py-2 text-sm';

interface ComponentShowcaseProps {
  name: string;
  description: string;
  children: React.ReactNode;
  href?: string;
}

function ComponentShowcase({ name, description, children, href = '#' }: ComponentShowcaseProps) {
  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg hover:-translate-y-1">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="min-h-[120px] flex items-center justify-center">
        {children}
      </div>
      <a
        href={`/docs/components/${name.toLowerCase()}`}
        className="absolute inset-0 rounded-2xl z-10"
        aria-label={`View ${name} documentation`}
      >
        <span className="sr-only">View {name} documentation</span>
      </a>
    </div>
  );
}

// Card Demo Component
function CardDemo() {
  return (
    <div className="w-full max-w-[280px] rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-gray-100">
        <h4 className="text-sm font-semibold text-gray-900">Project Update</h4>
        <p className="text-xs text-gray-500">2 minutes ago</p>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm text-gray-600">Your deployment is complete.</p>
      </div>
      <div className="px-4 py-3 border-t border-gray-100">
        <button className={`${buttonStyles} bg-gray-900 text-white text-xs px-3 py-1.5`}>
          View Details
        </button>
      </div>
    </div>
  );
}

// Button Demo Component
function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button className={`${buttonStyles} bg-gray-900 text-white`}>
        Primary
      </button>
      <button className={`${buttonStyles} bg-gray-100 text-gray-700 border border-gray-200`}>
        Secondary
      </button>
      <button className={`${buttonStyles} bg-transparent text-gray-600 border border-gray-300`}>
        Outline
      </button>
      <button className={`${buttonStyles} bg-transparent text-gray-500`}>
        Ghost
      </button>
    </div>
  );
}

// Toast Demo Component
function ToastDemo() {
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          className={`${buttonStyles} bg-gray-900 text-white relative z-20`}
        >
          Show Toast
        </button>
      </div>
      {showToast && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-30 w-64 animate-slideDown">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-200 shadow-lg">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-gray-900 font-medium">Event created!</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Dialog Demo Component
function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${buttonStyles} bg-gray-900 text-white relative z-20`}
      >
        Open Dialog
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-sm mx-4 p-6 rounded-xl bg-white border border-gray-200 shadow-xl animate-in zoom-in-95">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Are you sure?</h3>
            <p className="text-sm text-gray-500 mb-4">This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className={`${buttonStyles} bg-gray-100 text-gray-700 border border-gray-200`}
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(false)}
                className={`${buttonStyles} bg-gray-900 text-white`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Select Demo Component
function SelectDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const options = [
    { value: 'expo', label: 'Expo' },
    { value: 'rncli', label: 'React Native CLI' },
    { value: 'next', label: 'Next.js' },
  ];

  return (
    <div className="relative w-48 z-20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border bg-white border-gray-200 transition-colors hover:border-gray-300"
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {options.find(o => o.value === value)?.label || 'Select framework'}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 py-1 rounded-lg bg-white border border-gray-200 shadow-lg z-30">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setValue(option.value);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors hover:bg-gray-50 ${
                option.value === value ? 'bg-gray-50' : ''
              }`}
            >
              {option.label}
              {option.value === value && (
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Switch Demo Component
function SwitchDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="flex items-center gap-3 relative z-20">
      <span className="text-sm text-gray-600">Notifications</span>
      <button
        onClick={() => setChecked(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-500' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

export function ComponentGallery() {
  return (
    <section className="py-20 px-6 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Components that just work
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Every component is tested across iOS, Android, and Web
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ComponentShowcase name="Card" description="Flexible container with variants">
            <CardDemo />
          </ComponentShowcase>

          <ComponentShowcase name="Button" description="Multiple variants & sizes">
            <ButtonDemo />
          </ComponentShowcase>

          <ComponentShowcase name="Toast" description="Non-intrusive notifications">
            <ToastDemo />
          </ComponentShowcase>

          <ComponentShowcase name="Dialog" description="Modal dialogs with focus trap">
            <DialogDemo />
          </ComponentShowcase>

          <ComponentShowcase name="Select" description="Native-feeling dropdowns">
            <SelectDemo />
          </ComponentShowcase>

          <ComponentShowcase name="Switch" description="Toggle controls">
            <SwitchDemo />
          </ComponentShowcase>
        </div>
      </div>
    </section>
  );
}
