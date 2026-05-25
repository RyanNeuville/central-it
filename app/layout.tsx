import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'G-Shop - Collection Premium de Baskets & Streetwear',
  description: 'Découvrez des baskets de marque sélectionnées et du streetwear exclusif. L\'authenticité, la rareté et le style rencontrent l\'innovation.',
  metadataBase: new URL('https://g-shop.com'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://g-shop.com',
    title: 'G-Shop - Collection Premium de Baskets & Streetwear',
    description: 'Découvrez des baskets de marque sélectionnées et du streetwear exclusif.',
    siteName: 'G-Shop',
    images: [
      {
        url: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
        width: 1200,
        height: 630,
        alt: 'Collection de Baskets Premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'G-Shop - Collection Premium de Baskets & Streetwear',
    description: 'Découvrez des baskets de marque sélectionnées et du streetwear exclusif.',
    images: ['https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
