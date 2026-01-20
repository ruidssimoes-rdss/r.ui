import Link from 'next/link';

export default function GetStartedPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Get Started with r/ui</h1>
        <p className="text-lg text-muted-foreground">
          Beautiful, accessible components for React Native. Ready in 60 seconds.
        </p>
      </div>

      {/* Step 1: Install */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
            1
          </span>
          <h2 className="text-xl font-semibold text-foreground">Install the package</h2>
        </div>
        <div className="bg-muted rounded-lg p-4 font-mono text-sm text-foreground">
          npm install @r-ui/react-native
        </div>
      </section>

      {/* Step 2: Import */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
            2
          </span>
          <h2 className="text-xl font-semibold text-foreground">Import and use</h2>
        </div>
        <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-foreground">{`import { Button, Card, Text } from '@r-ui/react-native';

export default function App() {
  return (
    <Card>
      <Text variant="h2">Welcome to r/ui</Text>
      <Button onPress={() => alert('Hello!')}>
        Get Started
      </Button>
    </Card>
  );
}`}</code>
        </pre>
      </section>

      {/* Step 3: Explore */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
            3
          </span>
          <h2 className="text-xl font-semibold text-foreground">Explore components</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          68+ production-ready components. Here are some favorites:
        </p>

        {/* Featured Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ComponentCard
            name="Button"
            description="Flexible button with variants"
            href="/docs/components/button"
          />
          <ComponentCard
            name="Card"
            description="Container for content"
            href="/docs/components/card"
          />
          <ComponentCard
            name="Dialog"
            description="Modal dialogs"
            href="/docs/components/dialog"
          />
          <ComponentCard
            name="Toast"
            description="Notification toasts"
            href="/docs/components/toast"
          />
          <ComponentCard
            name="DataTable"
            description="Advanced data tables"
            href="/docs/components/data-table"
          />
          <ComponentCard
            name="Command"
            description="Command palette"
            href="/docs/components/command"
          />
        </div>

        <Link
          href="/docs/components/button"
          className="inline-flex items-center text-primary hover:underline"
        >
          Browse all 68+ components →
        </Link>
      </section>

      {/* Bonus: Lint */}
      <section className="border border-border rounded-lg p-6 bg-muted/30">
        <h3 className="font-semibold mb-2 text-foreground">Pro tip: Use the Design Linter</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Catch accessibility and design issues before they reach production.
        </p>
        <Link href="/lint" className="text-sm text-primary hover:underline">
          Try the linter →
        </Link>
      </section>
    </div>
  );
}

function ComponentCard({
  name,
  description,
  href,
}: {
  name: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block p-4 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-colors"
    >
      <h4 className="font-medium mb-1 text-foreground">{name}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
