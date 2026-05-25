'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Cpu, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isSolid = isScrolled || pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/shop', label: 'Catalogue' },
    { href: '/about', label: 'À propos' },
    { href: '/support', label: 'Support' },
    { href: '/contact', label: 'Contact' },
  ];

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

          <div className="flex items-center gap-4 md:gap-6">
            <button
              className={`p-2 rounded-lg transition-colors hidden md:inline-flex ${
                isSolid ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Rechercher"
            >
              <Search size={20} />
            </button>
            <Link
              href="/shop"
              className={`p-2 rounded-lg transition-colors ${
                isSolid ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Catalogue produits"
            >
              <ShoppingCart size={20} />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isSolid ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

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
