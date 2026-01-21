'use client';

interface DifferentiatorCardProps {
  title: string;
  description: string;
}

function DifferentiatorCard({ title, description }: DifferentiatorCardProps) {
  return (
    <div className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-md transition-all">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

export function WhyHyena() {
  return (
    <section className="py-20 px-6 bg-gray-50/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Hyena?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DifferentiatorCard
            title="Mobile-first, not mobile-ported"
            description="Built for React Native from day one. Not a web library awkwardly adapted for mobile platforms."
          />
          <DifferentiatorCard
            title="True universal components"
            description="Same component code runs on iOS, Android, and Web. No platform-specific variants or conditional imports."
          />
          <DifferentiatorCard
            title="Glass morphism built-in"
            description="The only React Native library with a complete glass theme. Frosted effects that actually work on all platforms."
          />
          <DifferentiatorCard
            title="shadcn/ui philosophy"
            description="Copy the code into your project. No black-box dependencies. You own it, you control it."
          />
        </div>
      </div>
    </section>
  );
}
