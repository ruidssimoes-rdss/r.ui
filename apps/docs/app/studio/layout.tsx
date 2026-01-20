import { TokenProvider } from '@/lib/studio/context';

export const metadata = {
  title: 'r/ui Token Builder - Design System Generator',
  description:
    'Define your design system once. Get production-ready code for everything.',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TokenProvider>{children}</TokenProvider>;
}
