'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/support', label: 'Support' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container-premium flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex-shrink-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl md:text-2xl font-bold tracking-tight"
            >
              NEXUS
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden md:inline-flex">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingBag size={20} />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="container-premium py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                  onClick={() => setIsOpen(false)}
                >
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
