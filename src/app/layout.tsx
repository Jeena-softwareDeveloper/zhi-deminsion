import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'ZHI DIMENSION - Steel, Fabrication & Agricultural Solutions',
  description:
    'Engineering Strength. Building Possibilities. High-quality steel products, precise fabrication services and reliable agricultural equipment – all in one place.',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased text-slate-900 bg-[#FAFAFA] selection:bg-orange-500 selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
