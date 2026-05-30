/**
 * Navbar.tsx — La Barre de Navigation
 * =====================================
 * Rédigé par Ryan Neuville
 *
 * La Navbar est présente sur absolument toutes les pages du site.
 * Elle a un comportement intelligent : elle est transparente sur la page d'accueil
 * et devient blanche avec une ombre dès qu'on défile ou sur les autres pages.
 *
 * Fonctionnalités :
 *   - Navigation desktop (liens + soulignement animé sur le lien actif)
 *   - Menu hamburger mobile (s'ouvre/ferme au clic)
 *   - Icône du panier avec badge "X articles" (lu depuis CartContext)
 *   - Changement de style au scroll via un écouteur d'événement
 *
 * POURQUOI 'use client' ?
 * Ce composant a besoin d'interactivité (écouter le scroll, gérer le menu mobile,
 * lire l'état du panier). Ces actions sont impossibles sur un serveur,
 * donc on déclare ce composant comme "Client Component".
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Cpu, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/CartContext';

/**
 * Navbar — Composant Principal
 * -----------------------------
 * Utilise plusieurs hooks React :
 *   - useState : pour mémoriser si le menu mobile est ouvert et si on a scrollé
 *   - useEffect : pour ajouter/retirer l'écouteur d'événement scroll
 *   - usePathname : pour savoir sur quelle page on est (Next.js hook)
 *   - useCart : pour lire le nombre d'articles dans le panier
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  /**
   * isSolid détermine si la navbar doit être opaque (fond blanc) ou transparente.
   * Elle devient solide si :
   *   - L'utilisateur a scrollé de plus de 20px
   *   - On n'est pas sur la page d'accueil (les autres pages ont un fond clair)
   */
  const isSolid = isScrolled || pathname !== '/';
  const { totalItems } = useCart();

  /**
   * Écouteur d'événement scroll.
   * useEffect avec [] en dépendances = s'exécute UNE SEULE FOIS après le premier rendu.
   * Le "return () => ..." est le "nettoyage" : retire l'écouteur quand le composant est détruit.
   * C'est important pour éviter les fuites mémoire.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** Liste des liens de navigation — modifier ici pour ajouter/retirer des pages. */
  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/shop', label: 'Catalogue' },
    { href: '/about', label: 'À propos' },
    { href: '/support', label: 'Support' },
    { href: '/contact', label: 'Contact' },
  ];

  /**
   * isActive vérifie si un lien correspond à la page actuelle.
   * Pour "/" on vérifie l'égalité exacte (sinon "/" matcherait tout).
   * Pour les autres, on utilise startsWith (ex: "/shop/produit" est considéré actif pour "/shop").
   */
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isSolid
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="container-premium flex items-center justify-between h-16 md:h-20">
          {/* Logo — clique dessus pour revenir à l'accueil */}
          <Link href="/" className="flex-shrink-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight"
            >
              <Cpu size={22} className={isSolid ? 'text-black' : 'text-white'} />
              <span className={isSolid ? 'text-black' : 'text-white'}>
                Central <span className={isSolid ? 'text-blue-600' : 'text-blue-300'}>IT</span>
              </span>
            </motion.div>
          </Link>

          {/* Liens de navigation — visibles uniquement sur écrans md et plus grands */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative"
              >
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? isSolid
                        ? 'text-blue-600'
                        : 'text-white'
                      : isSolid
                        ? 'text-gray-600 hover:text-blue-600'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>

                {/* Soulignement animé sous le lien actif — layoutId permet à Framer Motion
                    de créer une animation fluide quand on passe d'un lien à l'autre */}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="active-underline"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                      isSolid ? 'bg-blue-600' : 'bg-white'
                    }`}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Actions à droite : recherche, panier, menu burger */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              className={`p-2 rounded-lg transition-colors hidden md:inline-flex ${
                isSolid ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Rechercher"
            >
              <Search size={20} />
            </button>

            {/* Lien vers le panier avec badge qui affiche le nombre d'articles */}
            <Link
              href="/cart"
              className={`relative p-2 rounded-lg transition-colors ${
                isSolid ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Panier d'achats"
            >
              <ShoppingCart size={20} />
              {/* Le badge n'apparaît que si totalItems > 0 */}
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Bouton menu hamburger — visible uniquement sur mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isSolid ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Menu"
            >
              {/* Affiche X si ouvert, hamburger si fermé */}
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile — apparaît sous la navbar quand isOpen est true */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="container-premium py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {isActive(link.href) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                  )}
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
}
