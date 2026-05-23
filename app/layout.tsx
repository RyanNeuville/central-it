import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NEXUS - Premium Sneaker & Streetwear Collective',
  description: 'Discover curated premium sneakers and exclusive streetwear. Authenticity, rarity, and style meet innovation.',
  metadataBase: new URL('https://nexus-collective.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nexus-collective.com',
    title: 'NEXUS - Premium Sneaker & Streetwear Collective',
    description: 'Discover curated premium sneakers and exclusive streetwear.',
    siteName: 'NEXUS',
    images: [
      {
        url: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
        width: 1200,
        height: 630,
        alt: 'Premium Sneakers Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXUS - Premium Sneaker & Streetwear Collective',
    description: 'Discover curated premium sneakers and exclusive streetwear.',
    images: ['https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
