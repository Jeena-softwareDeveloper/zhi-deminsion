import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'ZHI DIMENSION - Steel, Fabrication & Agricultural Solutions',
  description:
    'Engineering Strength. Building Possibilities. High-quality steel products, precise fabrication services and reliable agricultural equipment – all in one place.',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  keywords: [
    'steel products',
    'welding services',
    'fabrication',
    'agricultural equipment',
    'rotavator',
    'plough',
    'steel pipes',
    'ZHI Dimension',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className="antialiased text-slate-900 bg-[#FAFAFA] selection:bg-[#0066FF] selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
