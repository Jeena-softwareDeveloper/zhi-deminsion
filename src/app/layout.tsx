import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/AppShell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ZHI DIMENSION | Built with Purpose. Made for Progress.',
  description:
    'ZHI DIMENSION is an independent product manufacturing brand developing practical, reliable products for agriculture, home & residential, and industrial bulk orders.',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  keywords: [
    'ZHI DIMENSION',
    'product manufacturing',
    'bulk product orders',
    'agriculture products',
    'home and residential products',
    'industrial products',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body
        className={`${inter.className} font-sans antialiased text-slate-900 bg-white selection:bg-[#0052CC] selection:text-white`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
