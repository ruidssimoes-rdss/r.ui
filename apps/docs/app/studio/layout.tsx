import { StudioProvider } from '@/lib/studio/studio-context';

export const metadata = {
  title: 'r/ui Studio - Visual Theme Builder',
  description:
    'Design your theme visually, preview on real components, export production-ready code.',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudioProvider>{children}</StudioProvider>;
}
