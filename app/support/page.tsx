'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, Lock, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function Support() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const services = [
    {
      icon: Truck,
      title: 'Fast & Secure Shipping',
      description: 'We ship worldwide within 2-5 business days with full tracking and insurance on all orders.',
      details: [
        'Free shipping on orders over $100',
        'Express shipping available',
        'Real-time tracking',
        'Fully insured packages',
      ],
    },
    {
      icon: RotateCcw,
      title: 'Hassle-Free Returns',
      description: 'Not satisfied? Return within 30 days for a full refund or exchange.',
      details: [
        '30-day return window',
        'Free return shipping',
        'No questions asked',
        'Fast refund processing',
      ],
    },
    {
      icon: Lock,
      title: 'Secure Payment',
      description: 'Your payment information is protected with industry-leading encryption.',
      details: [
        'Multiple payment methods',
        '256-bit SSL encryption',
        'Fraud protection',
        'Privacy guaranteed',
      ],
    },
    {
      icon: HelpCircle,
      title: 'Expert Support',
      description: 'Our team is here to help 24/7 with any questions or concerns.',
      details: [
        'Live chat support',
        'Email support',
        'Phone support available',
        'Average response: 2 hours',
      ],
    },
  ];

  const faqs = [
    {
      id: '1',
      question: 'How do I know if my sneakers are authentic?',
      answer: 'All NEXUS products are thoroughly verified by our expert authentication team. We guarantee 100% authenticity or your money back. Every item comes with an authenticity certificate.',
    },
    {
      id: '2',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy from the date of purchase. Items must be unused and in original condition. Returns are free, and refunds are processed within 5 business days.',
    },
    {
      id: '3',
      question: 'Do you ship internationally?',
      answer: 'Yes! We ship to over 45 countries worldwide. Shipping costs vary by location, but we offer competitive rates and full tracking on all international orders.',
    },
    {
      id: '4',
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days within the US. International shipping typically takes 7-14 business days depending on your location. Express options are available.',
    },
    {
      id: '5',
      question: 'Can I modify or cancel my order?',
      answer: 'Orders can be modified or cancelled within 24 hours of purchase. After that, the order enters the fulfillment process and cannot be changed.',
    },
    {
      id: '6',
      question: 'Do you offer size exchanges?',
      answer: 'Absolutely. If you need a different size, we offer free exchanges within 30 days. Simply contact our support team and we\'ll arrange everything.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-premium text-center mb-16 md:mb-24"
        >
          <h1 className="heading-section mb-4">Customer Support</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to ensuring your NEXUS experience is exceptional. Learn about our services and policies.
          </p>
        </motion.div>

        <div className="container-premium mb-20 md:mb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-gray-50 rounded-lg"
              >
                <service.icon size={32} className="mb-4 text-black" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <section className="bg-gradient-subtle py-20 md:py-28">
          <div className="container-premium">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-section mb-4">Frequently Asked Questions</h2>
            </motion.div>

            <div className="max-w-2xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 text-left font-semibold flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    {faq.question}
                    <motion.span
                      animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-500"
                    >
                      ▼
                    </motion.span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedFaq === faq.id ? 'auto' : 0,
                      opacity: expandedFaq === faq.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-gray-200"
                  >
                    <p className="px-6 py-4 text-gray-700">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="container-premium py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="heading-section mb-6">Still Have Questions?</h2>
            <p className="text-lg text-gray-600 mb-8">Our support team is ready to help.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:support@nexus.com"
                className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors"
              >
                Email Us
              </a>
              <a
                href="/contact"
                className="px-8 py-3 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Form
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
