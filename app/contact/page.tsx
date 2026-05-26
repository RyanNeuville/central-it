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
      title: 'E-mail',
      content: 'hello@central-it.com',
      link: 'mailto:hello@central-it.com',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+33 (0)1 23 45 67 89',
      link: 'tel:+33123456789',
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: '14 Rue de l\'Innovation, 75008 Paris, France',
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
          <h1 className="relative mb-8">
              <svg
                width="219"
                height="24"
                viewBox="0 0 219 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-x-0 -bottom-6 w-full text-blue-500"
              >
                <path
                  d="M0.5 2H218L21 12.5H182.5L48.5 21.5H151"
                  stroke="currentColor"
                  stroke-width="4"
                ></path>
              </svg>
              <span className="relative heading-section">Contactez-nous</span>
            </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Besoin d&apos;un devis, d&apos;un conseil technique ou d&apos;un suivi SAV ? Notre équipe d&apos;ingénieurs répond sous 4 heures ouvrables.
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
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Envoyez-nous un Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Jean"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Adresse E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="jean.dupont@example.com"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-semibold mb-2">
                  Type de Demande
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                >
                  <option value="general">Demande Générale</option>
                  <option value="devis">Demande de Devis</option>
                  <option value="support">Support Technique</option>
                  <option value="order">Statut de Commande</option>
                  <option value="rma">Retour / RMA</option>
                  <option value="partnership">Partenariat Revendeur</option>
                  <option value="other">Autre</option>
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
                  placeholder="Dites-nous ce que vous avez en tête..."
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
                {submitted ? 'Message envoyé !' : 'Envoyer le Message'}
              </motion.button>
            </form>

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 text-center text-sm font-medium mt-6"
              >
                Merci de nous avoir contactés ! Nous vous répondrons très bientôt.
              </motion.p>
            )}

            <p className="text-xs text-gray-600 text-center mt-6">
              Nous respectons votre vie privée. Vos informations seront uniquement utilisées pour répondre à votre demande.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
