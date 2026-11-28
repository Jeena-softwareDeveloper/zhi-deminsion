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
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body
        className={`${inter.className} antialiased text-slate-900 bg-[#FAFAFA] selection:bg-[#0066FF] selection:text-white`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
