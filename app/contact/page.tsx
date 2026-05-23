'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        service: 'general',
        message: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@nexus.com',
      link: 'mailto:hello@nexus.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: '123 Sneaker Avenue, Los Angeles, CA 90001',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-premium text-center mb-16"
        >
          <h1 className="heading-section mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Our team typically responds within 24 hours.
          </p>
        </motion.div>

        <div className="container-premium grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {contactInfo.map((info, idx) => (
            <motion.a
              key={info.title}
              href={info.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-gray-50 rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
            >
              <info.icon size={32} className="mx-auto mb-4 text-black" />
              <h3 className="text-lg font-bold mb-2">{info.title}</h3>
              <p className="text-gray-700">{info.content}</p>
            </motion.a>
          ))}
        </div>

        <div className="container-premium pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-gradient-subtle rounded-lg p-12 border border-gray-200"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-semibold mb-2">
                  Service Inquiry
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                >
                  <option value="general">General Inquiry</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="shipping">Shipping Question</option>
                  <option value="order">Order Status</option>
                  <option value="authentication">Authentication</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitted}
                className="w-full px-6 py-3 bg-black text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 disabled:bg-gray-600 transition-all duration-300"
              >
                <Send size={18} />
                {submitted ? 'Message Sent!' : 'Send Message'}
              </motion.button>
            </form>

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 text-center text-sm font-medium mt-6"
              >
                Thank you for reaching out! We'll get back to you soon.
              </motion.p>
            )}

            <p className="text-xs text-gray-600 text-center mt-6">
              We respect your privacy. Your information will only be used to respond to your inquiry.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
