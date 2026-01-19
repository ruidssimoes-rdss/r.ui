'use client';

import { useState } from 'react';

/**
 * Form Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const inputBaseStyles = `
  w-full rounded-lg border bg-[var(--input-bg)] border-[var(--input-border)]
  text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]
  px-3 py-2 text-sm
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-[var(--switch-bg-checked)] focus:border-transparent
`;

const labelStyles = 'text-sm font-medium text-[var(--component-text)]';
const descriptionStyles = 'text-xs text-[var(--component-text-muted)]';
const errorStyles = 'text-xs text-red-500';

export function FormBasicPreview() {
  const [name, setName] = useState('');

  return (
    <form className="space-y-4 w-full max-w-sm">
      <div className="space-y-1.5">
        <label className={labelStyles}>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputBaseStyles}
        />
        <p className={descriptionStyles}>Your full legal name.</p>
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-[var(--button-primary-bg)] hover:bg-[var(--button-primary-hover)] rounded-lg transition-colors"
      >
        Submit
      </button>
    </form>
  );
}

export function FormWithValidationPreview() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      console.log('Form submitted!');
    }
  };

  return (
    <form className="space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <label className={labelStyles}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${inputBaseStyles} ${submitted && errors.email ? '!border-red-500' : ''}`}
        />
        {submitted && errors.email && <p className={errorStyles}>{errors.email}</p>}
      </div>
      <div className="space-y-1.5">
        <label className={labelStyles}>
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${inputBaseStyles} ${submitted && errors.password ? '!border-red-500' : ''}`}
        />
        {submitted && errors.password && <p className={errorStyles}>{errors.password}</p>}
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-[var(--button-primary-bg)] hover:bg-[var(--button-primary-hover)] rounded-lg transition-colors"
      >
        Sign Up
      </button>
    </form>
  );
}

export function FormHorizontalPreview() {
  return (
    <form className="space-y-4 w-full max-w-md">
      <div className="flex items-center gap-4">
        <label className={`${labelStyles} w-24 text-right`}>First Name</label>
        <input
          type="text"
          placeholder="John"
          className={`${inputBaseStyles} flex-1`}
        />
      </div>
      <div className="flex items-center gap-4">
        <label className={`${labelStyles} w-24 text-right`}>Last Name</label>
        <input
          type="text"
          placeholder="Doe"
          className={`${inputBaseStyles} flex-1`}
        />
      </div>
    </form>
  );
}
