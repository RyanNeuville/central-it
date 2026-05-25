import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Central IT - Matériel Informatique Professionnel',
  description: 'Votre expert en matériel informatique professionnel : réseaux, serveurs, stockage, workstations et infrastructure IT. Qualité enterprise, livraison rapide.',
  metadataBase: new URL('https://central-it.com'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://central-it.com',
    title: 'Central IT - Matériel Informatique Professionnel',
    description: 'Expert en matériel informatique professionnel : réseaux, serveurs, stockage et infrastructure IT.',
    siteName: 'Central IT',
    images: [
      {
        url: 'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg',
        width: 1200,
        height: 630,
        alt: 'Matériel Informatique Professionnel - Central IT',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Central IT - Matériel Informatique Professionnel',
    description: 'Expert en matériel informatique professionnel : réseaux, serveurs, stockage et infrastructure IT.',
    images: ['https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg'],
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
