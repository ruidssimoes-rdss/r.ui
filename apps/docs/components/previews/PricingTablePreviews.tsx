'use client';

import { useState } from 'react';

/**
 * PricingTable Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 */

function PricingToggle({
  value,
  onChange,
}: {
  value: 'monthly' | 'yearly';
  onChange: (value: 'monthly' | 'yearly') => void;
}) {
  return (
    <div className="flex bg-[var(--component-bg)] rounded-lg p-1 gap-1 border border-[var(--component-border)]">
      <button
        onClick={() => onChange('monthly')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          value === 'monthly'
            ? 'bg-[var(--track-fill)]/10 text-[var(--track-fill)]'
            : 'text-[var(--component-text-muted)] hover:text-[var(--component-text)]'
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange('yearly')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
          value === 'yearly'
            ? 'bg-[var(--track-fill)]/10 text-[var(--track-fill)]'
            : 'text-[var(--component-text-muted)] hover:text-[var(--component-text)]'
        }`}
      >
        Yearly
        <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">
          Save 20%
        </span>
      </button>
    </div>
  );
}

function PricingCard({
  name,
  description,
  price,
  period,
  features,
  popular = false,
  badge,
  buttonText = 'Get Started',
  buttonVariant = 'secondary',
}: {
  name: string;
  description?: string;
  price: number;
  period: string;
  features: { text: string; included: boolean }[];
  popular?: boolean;
  badge?: string;
  buttonText?: string;
  buttonVariant?: 'primary' | 'secondary';
}) {
  return (
    <div
      className={`relative p-6 rounded-xl border-2 ${
        popular
          ? 'border-[var(--track-fill)] bg-[var(--component-bg)]'
          : 'border-[var(--component-border)] bg-[var(--component-bg)]'
      }`}
    >
      {(popular || badge) && (
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium ${
            popular
              ? 'bg-[var(--track-fill)] text-white'
              : 'bg-[var(--component-bg)] border border-[var(--component-border)] text-[var(--component-text-muted)]'
          }`}
        >
          {badge || 'Most Popular'}
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-[var(--component-text)]">{name}</h3>
        {description && (
          <p className="text-sm text-[var(--component-text-muted)] mt-1">{description}</p>
        )}
      </div>

      <div className="flex items-baseline mb-6">
        <span className="text-xl font-semibold text-[var(--component-text)]">$</span>
        <span className="text-4xl font-bold text-[var(--component-text)]">{price}</span>
        <span className="text-sm text-[var(--component-text-muted)] ml-1">/{period}</span>
      </div>

      <div className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                feature.included
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : 'bg-[var(--component-border)] text-[var(--component-text-muted)]'
              }`}
            >
              {feature.included ? '✓' : '×'}
            </div>
            <span
              className={`text-sm ${
                feature.included
                  ? 'text-[var(--component-text-muted)]'
                  : 'text-[var(--component-text-muted)] line-through'
              }`}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-3 rounded-lg font-medium text-sm transition-colors ${
          buttonVariant === 'primary'
            ? 'bg-[var(--track-fill)] text-white hover:opacity-90'
            : 'bg-[var(--component-bg)] border border-[var(--component-border)] text-[var(--component-text)] hover:bg-[var(--track-fill)]/5'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}

export function PricingTableBasicPreview() {
  const features = [
    { text: '10 projects', included: true },
    { text: '5GB storage', included: true },
    { text: 'Email support', included: true },
    { text: 'API access', included: false },
  ];

  return (
    <div className="w-full max-w-3xl flex gap-4">
      <PricingCard
        name="Starter"
        description="For individuals"
        price={9}
        period="month"
        features={features}
      />
      <PricingCard
        name="Pro"
        description="For teams"
        price={29}
        period="month"
        popular
        features={features.map((f) => ({ ...f, included: true }))}
        buttonVariant="primary"
      />
      <PricingCard
        name="Enterprise"
        description="For large orgs"
        price={99}
        period="month"
        features={[
          ...features.map((f) => ({ ...f, included: true })),
          { text: 'Custom integrations', included: true },
        ]}
      />
    </div>
  );
}

export function PricingTableWithTogglePreview() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const prices = {
    monthly: { starter: 9, pro: 29, enterprise: 99 },
    yearly: { starter: 90, pro: 290, enterprise: 990 },
  };

  return (
    <div className="w-full max-w-3xl space-y-8">
      <div className="flex justify-center">
        <PricingToggle value={billing} onChange={setBilling} />
      </div>
      <div className="flex gap-4">
        <PricingCard
          name="Starter"
          price={prices[billing].starter}
          period={billing === 'yearly' ? 'year' : 'month'}
          features={[
            { text: '10 projects', included: true },
            { text: '5GB storage', included: true },
          ]}
        />
        <PricingCard
          name="Pro"
          price={prices[billing].pro}
          period={billing === 'yearly' ? 'year' : 'month'}
          popular
          features={[
            { text: 'Unlimited projects', included: true },
            { text: '100GB storage', included: true },
          ]}
          buttonVariant="primary"
        />
        <PricingCard
          name="Enterprise"
          price={prices[billing].enterprise}
          period={billing === 'yearly' ? 'year' : 'month'}
          features={[
            { text: 'Unlimited everything', included: true },
            { text: 'Priority support', included: true },
          ]}
        />
      </div>
    </div>
  );
}

export function PricingTablePopularPreview() {
  return (
    <div className="w-full max-w-3xl flex gap-4 items-end">
      <PricingCard
        name="Basic"
        price={0}
        period="month"
        features={[
          { text: '3 projects', included: true },
          { text: '1GB storage', included: true },
          { text: 'Community support', included: true },
        ]}
        buttonText="Start Free"
      />
      <div className="transform scale-105 z-10">
        <PricingCard
          name="Professional"
          price={29}
          period="month"
          popular
          features={[
            { text: 'Unlimited projects', included: true },
            { text: '50GB storage', included: true },
            { text: 'Priority support', included: true },
            { text: 'Advanced analytics', included: true },
          ]}
          buttonVariant="primary"
        />
      </div>
      <PricingCard
        name="Team"
        price={79}
        period="month"
        features={[
          { text: 'Everything in Pro', included: true },
          { text: '500GB storage', included: true },
          { text: 'Team collaboration', included: true },
        ]}
      />
    </div>
  );
}

export function PricingTableWithBadgesPreview() {
  return (
    <div className="w-full max-w-3xl flex gap-4">
      <PricingCard
        name="Hobby"
        price={0}
        period="forever"
        badge="Free"
        features={[
          { text: '1 project', included: true },
          { text: 'Basic features', included: true },
        ]}
        buttonText="Get Started"
      />
      <PricingCard
        name="Growth"
        price={49}
        period="month"
        popular
        features={[
          { text: 'Unlimited projects', included: true },
          { text: 'All features', included: true },
        ]}
        buttonVariant="primary"
      />
      <PricingCard
        name="Scale"
        price={149}
        period="month"
        badge="Best Value"
        features={[
          { text: 'Unlimited everything', included: true },
          { text: 'White-label option', included: true },
        ]}
      />
    </div>
  );
}

export function PricingTableComparisonPreview() {
  const features = [
    'Projects',
    'Storage',
    'Team members',
    'API access',
    'Support',
    'Custom domains',
  ];

  const plans = [
    { name: 'Free', values: ['3', '1GB', '1', '×', 'Community', '×'] },
    { name: 'Pro', values: ['Unlimited', '100GB', '10', '✓', 'Email', '✓'], popular: true },
    { name: 'Enterprise', values: ['Unlimited', '1TB', 'Unlimited', '✓', '24/7 Phone', '✓'] },
  ];

  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-[var(--component-border)]">
      <table className="w-full">
        <thead>
          <tr className="bg-[var(--component-bg)]">
            <th className="p-4 text-left text-sm font-medium text-[var(--component-text-muted)]">
              Features
            </th>
            {plans.map((plan) => (
              <th
                key={plan.name}
                className={`p-4 text-center ${
                  plan.popular ? 'bg-[var(--track-fill)]/5' : ''
                }`}
              >
                <span className="text-lg font-semibold text-[var(--component-text)]">
                  {plan.name}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, i) => (
            <tr key={feature} className="border-t border-[var(--component-border)]">
              <td className="p-4 text-sm text-[var(--component-text-muted)]">{feature}</td>
              {plans.map((plan) => (
                <td
                  key={plan.name}
                  className={`p-4 text-center text-sm ${
                    plan.popular ? 'bg-[var(--track-fill)]/5' : ''
                  } ${
                    plan.values[i] === '✓'
                      ? 'text-emerald-500'
                      : plan.values[i] === '×'
                      ? 'text-[var(--component-text-muted)]'
                      : 'text-[var(--component-text)]'
                  }`}
                >
                  {plan.values[i]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PricingTableSinglePreview() {
  return (
    <div className="w-full max-w-md">
      <PricingCard
        name="Professional"
        description="Everything you need to build and scale your product"
        price={49}
        period="month"
        features={[
          { text: 'Unlimited projects', included: true },
          { text: '100GB storage', included: true },
          { text: 'Priority support', included: true },
          { text: 'Advanced analytics', included: true },
          { text: 'Custom integrations', included: true },
          { text: 'Team collaboration', included: true },
        ]}
        buttonVariant="primary"
        buttonText="Start 14-day trial"
      />
    </div>
  );
}
