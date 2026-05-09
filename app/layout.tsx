import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'HypeHaus — Tonight is yours.',
  description:
    'A premium nightlife and lifestyle ecosystem for India. Mumbai. Nagpur. Pune. The drop is loading.',
  metadataBase: new URL('https://join.hypehaus.org'),
  openGraph: {
    title: 'HypeHaus — Tonight is yours.',
    description:
      'A premium nightlife and lifestyle ecosystem for India. Mumbai. Nagpur. Pune. The drop is loading.',
    url: 'https://join.hypehaus.org',
    siteName: 'HypeHaus',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HypeHaus — Tonight is yours.',
    description: 'Mumbai. Nagpur. Pune. The drop is loading.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f%5B%5D=satoshi@1,2,9&display=swap" />
      </head>
      <body className="min-h-full bg-ink text-white">{children}</body>
    </html>
  );
}
