import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Mono, Sacramento } from 'next/font/google';
import './globals.css';
import { DocsLayout } from '@/components/DocsLayout';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-space-mono',
});

const sacramento = Sacramento({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
});

export const metadata: Metadata = {
  title: 'r/ui - Universal React Native Components',
  description: 'r/ui is a universal React Native component library with beautiful defaults.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceMono.variable} ${sacramento.variable} font-sans antialiased bg-white`}>
        <ThemeProvider>
          <DocsLayout>{children}</DocsLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
