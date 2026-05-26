import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/lib/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Central IT - Matériel Informatique Professionnel',
  description: 'Votre expert en équipements et périphériques informatiques haut de gamme : souris gaming, claviers mécaniques, casques audio, tablettes et écrans professionnels.',
  metadataBase: new URL('https://central-it.com'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://central-it.com',
    title: 'Central IT - Matériel Informatique Professionnel',
    description: 'Expert en équipements et périphériques informatiques haut de gamme : souris, claviers, audio, tablettes et écrans.',
    siteName: 'Central IT',
    images: [
      {
        url: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
        width: 1200,
        height: 630,
        alt: 'Équipements Informatiques Premium - Central IT',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Central IT - Matériel Informatique Professionnel',
    description: 'Expert en équipements et périphériques informatiques haut de gamme.',
    images: ['https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
