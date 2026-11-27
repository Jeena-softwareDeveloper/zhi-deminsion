import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/AppShell';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
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
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className={`${plusJakartaSans.className} font-sans antialiased text-slate-900 bg-white selection:bg-[#0052CC] selection:text-white`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
