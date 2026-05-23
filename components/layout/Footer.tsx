'use client';

import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'New Arrivals', href: '/shop' },
        { label: 'Bestsellers', href: '/shop' },
        { label: 'Collections', href: '/shop' },
        { label: 'Sale', href: '/shop' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Story', href: '/about' },
        { label: 'Careers', href: '/' },
        { label: 'Press', href: '/' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact', href: '/contact' },
        { label: 'FAQ', href: '/support' },
        { label: 'Shipping', href: '/support' },
        { label: 'Returns', href: '/support' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-24">
      <div className="container-premium py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-6">NEXUS</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Premium sneakers and streetwear for the discerning collector.
            </p>
          </motion.div>

          {footerSections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4 text-sm">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-gray-600"
            >
              <p>
                © 2025 NEXUS. All rights reserved. |{' '}
                <Link href="/" className="hover:text-black transition-colors">
                  Privacy Policy
                </Link>{' '}
                |{' '}
                <Link href="/" className="hover:text-black transition-colors">
                  Terms of Service
                </Link>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
