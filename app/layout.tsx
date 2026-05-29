/**
 * layout.tsx — Le Squelette Global de l'Application
 * ==================================================
 * Rédigé par Ryan Neuville
 *
 * Ce fichier est le POINT D'ENTRÉE de toute l'application Next.js.
 * C'est le seul composant qui ne change JAMAIS entre les pages.
 * Toutes les autres pages sont chargées à l'intérieur du {children}.
 *
 * Rôles de ce fichier :
 *   1. Définir la langue du document (lang="fr")
 *   2. Charger la police de caractères (Inter depuis Google Fonts)
 *   3. Configurer les métadonnées SEO globales (titre, description, OpenGraph...)
 *   4. Envelopper toute l'app dans le CartProvider pour que le panier soit disponible partout
 *
 * IMPORTANT : Ce fichier est un SERVER COMPONENT par défaut (pas de 'use client').
 * C'est intentionnel — le layout lui-même n'a pas besoin d'interactivité.
 * Le CartProvider gère son propre côté client en interne.
 */

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/lib/CartContext';

/**
 * Configuration de la police Inter.
 * Next.js télécharge et optimise automatiquement la police depuis Google Fonts
 * au moment du build, ce qui évite un flash de texte non-stylisé (FOUT).
 * "latin" est le subset qui contient tous les caractères latins (français inclus).
 */
const inter = Inter({ subsets: ['latin'] });

/**
 * Métadonnées SEO — Tout ce que Google et les réseaux sociaux lisent
 * -------------------------------------------------------------------
 * Ces métadonnées sont intégrées dans le <head> HTML de chaque page.
 * Elles permettent à Google de bien indexer le site et aux liens partagés
 * sur Twitter/Facebook d'afficher une belle prévisualisation.
 *
 * OpenGraph : protocole utilisé par Facebook, LinkedIn, WhatsApp
 * Twitter Card : format spécifique à Twitter/X
 */
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

/**
 * RootLayout — Le Composant Racine
 * ---------------------------------
 * Chaque page de l'application (shop, panier, checkout...) est reçue
 * via la prop {children} et rendue à l'intérieur de ce layout.
 *
 * Le CartProvider enveloppe {children} pour que toutes les pages aient
 * accès au contexte du panier (voir lib/CartContext.tsx pour les détails).
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* CartProvider rend le panier accessible à toute l'application */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
