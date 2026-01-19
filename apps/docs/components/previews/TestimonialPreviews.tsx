'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Testimonial Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 */

function Avatar({ src, name, size = 'md' }: { src?: string; name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' };
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-[var(--track-fill)]/10 flex items-center justify-center`}>
      <span className="text-sm font-medium text-[var(--track-fill)]">{initials}</span>
    </div>
  );
}

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={i < value ? 'text-amber-400' : 'text-[var(--component-border)]'}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
  showQuotes = true,
}: {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  showQuotes?: boolean;
}) {
  return (
    <div className="p-6 rounded-xl bg-[var(--component-bg)] border border-[var(--component-border)]">
      <div className="relative">
        {showQuotes && (
          <span className="absolute -top-4 -left-2 text-5xl text-[var(--component-text-muted)] opacity-30 font-serif">
            "
          </span>
        )}
        <p className="text-[var(--component-text-muted)] italic leading-relaxed">
          {quote}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Avatar src={avatar} name={author} />
        <div>
          <p className="text-sm font-semibold text-[var(--component-text)]">{author}</p>
          {(role || company) && (
            <p className="text-xs text-[var(--component-text-muted)]">
              {role}
              {role && company && ' at '}
              {company}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function TestimonialBasicPreview() {
  return (
    <div className="w-full max-w-md">
      <TestimonialCard
        quote="This UI library has completely transformed how we build our products. The components are beautifully designed and work flawlessly on all platforms."
        author="Sarah Chen"
        role="Lead Developer"
        company="TechCorp"
      />
    </div>
  );
}

export function TestimonialLargePreview() {
  return (
    <div className="w-full max-w-2xl text-center py-8">
      <span className="text-6xl text-[var(--component-text-muted)] opacity-30 font-serif">"</span>
      <p className="text-xl text-[var(--component-text-muted)] italic leading-relaxed max-w-xl mx-auto">
        The attention to detail in every component is remarkable. It's clear that the team behind r/ui deeply understands what developers need.
      </p>
      <div className="mt-6 flex flex-col items-center">
        <Avatar src="https://i.pravatar.cc/150?img=32" name="Alex Johnson" size="lg" />
        <p className="mt-3 font-semibold text-[var(--component-text)]">Alex Johnson</p>
        <p className="text-sm text-[var(--component-text-muted)]">CEO at StartupXYZ</p>
      </div>
    </div>
  );
}

export function TestimonialWithAvatarPreview() {
  return (
    <div className="w-full max-w-md">
      <TestimonialCard
        quote="I've tried many UI libraries, but this one stands out for its performance and flexibility. Highly recommended!"
        author="Michael Park"
        role="Senior Engineer"
        company="DevStudio"
        avatar="https://i.pravatar.cc/150?img=11"
      />
    </div>
  );
}

export function TestimonialWithRatingPreview() {
  return (
    <div className="w-full max-w-md p-6 rounded-xl bg-[var(--component-bg)] border border-[var(--component-border)]">
      <StarRating value={5} />
      <p className="mt-4 text-[var(--component-text-muted)] italic">
        "Absolutely amazing! The best UI library I've ever used. The documentation is excellent and the components just work."
      </p>
      <div className="mt-4 flex items-center gap-3">
        <Avatar src="https://i.pravatar.cc/150?img=23" name="Emily Davis" />
        <div>
          <p className="text-sm font-semibold text-[var(--component-text)]">Emily Davis</p>
          <p className="text-xs text-[var(--component-text-muted)]">Product Designer</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialCarouselPreview() {
  const testimonials = [
    { quote: "Game-changing for our development workflow.", author: "James Wilson", role: "CTO" },
    { quote: "The best investment we made for our frontend.", author: "Lisa Thompson", role: "Tech Lead" },
    { quote: "Reduced our development time by 50%.", author: "David Kim", role: "Full Stack Dev" },
  ];

  const [active, setActive] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active, testimonials.length]);

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="w-full flex-shrink-0 px-1">
              <TestimonialCard quote={t.quote} author={t.author} role={t.role} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? 'w-6 bg-[var(--track-fill)]' : 'w-2 bg-[var(--component-border)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function TestimonialGridPreview() {
  const testimonials = [
    { quote: "Incredibly well-designed components.", author: "Tom Harris", role: "Designer" },
    { quote: "Perfect for cross-platform apps.", author: "Anna Lee", role: "Mobile Dev" },
    { quote: "Great DX and documentation.", author: "Chris Martin", role: "Engineer" },
    { quote: "Our team loves using this library.", author: "Maya Patel", role: "PM" },
  ];

  return (
    <div className="w-full max-w-2xl grid grid-cols-2 gap-4">
      {testimonials.map((t, i) => (
        <TestimonialCard
          key={i}
          quote={t.quote}
          author={t.author}
          role={t.role}
          showQuotes={false}
        />
      ))}
    </div>
  );
}
