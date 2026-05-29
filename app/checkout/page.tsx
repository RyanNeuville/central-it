'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Lock, CreditCard, User, MapPin, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';
import { generateClientEmailHtml, generateAdminEmailHtml } from '@/lib/emailTemplates';

type Step = 'info' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientEmailPreview, setClientEmailPreview] = useState<string>('');
  const [adminEmailPreview, setAdminEmailPreview] = useState<string>('');

  const subtotal = totalPrice;
  const shipping = subtotal > 200 ? 0 : 15;
  const tva = subtotal * 0.20;
  const total = subtotal + shipping + tva;

  // Form states
  const [info, setInfo] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [address, setAddress] = useState({ street: '', city: '', zip: '', country: 'France' });

  // If cart is empty and not on confirmation page, redirect logic would normally go here
  // For demo purposes we just show empty state if not confirmed
  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-gray-400" size={24} />
          </div>
          <h2 className="text-xl font-bold mb-2">Checkout Indisponible</h2>
          <p className="text-gray-500 mb-6">Votre panier est vide.</p>
          <Link href="/shop" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors">
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 'info', label: 'Informations', icon: User },
    { id: 'shipping', label: 'Livraison', icon: MapPin },
    { id: 'payment', label: 'Paiement', icon: CreditCard },
  ];

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // 1. On génère le numéro de commande et les templates HTML (100% Frontend)
    const newOrderNumber = `CMD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const clientHtml = generateClientEmailHtml(info, address, items, subtotal, shipping, tva, total, newOrderNumber);
    const adminHtml = generateAdminEmailHtml(info, address, items, subtotal, shipping, tva, total, newOrderNumber);
    
    try {
      /* 
        === INTEGRATION EMAILJS (SANS BACKEND) ===
        Créez un compte gratuit sur emailjs.com
        1. Ajoutez un service email (ex: Gmail)
        2. Créez un template avec les variables {{{html_content}}} et {{{to_email}}}
        3. Remplacez les clés ci-dessous par les vôtres
      */
      const SERVICE_ID = 'YOUR_SERVICE_ID';
      const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
      const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

      // Pour activer l'envoi réel, décommentez les lignes ci-dessous avec vos vraies clés EmailJS :
      
      // await emailjs.send(SERVICE_ID, TEMPLATE_ID, { html_content: clientHtml, to_email: info.email }, PUBLIC_KEY);
      // await emailjs.send(SERVICE_ID, TEMPLATE_ID, { html_content: adminHtml, to_email: 'admin@central-it.com' }, PUBLIC_KEY);

      // Simulation d'attente pour le feedback UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      setOrderNumber(newOrderNumber);
      setClientEmailPreview(clientHtml);
      setAdminEmailPreview(adminHtml);
      setCurrentStep('confirmation');
      clearCart();
    } catch (error) {
      console.error(error);
      alert("Erreur lors du traitement de la commande.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container-premium h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl flex items-center gap-2">
            Central <span className="text-blue-600">IT</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <Lock size={16} /> Paiement Sécurisé
          </div>
        </div>
      </header>

      <div className="container-premium py-8 md:py-12">
        {currentStep === 'confirmation' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-green-600" size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-4">Commande Confirmée !</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Merci pour votre commande, {info.firstName}. Un email de confirmation a été envoyé à {info.email}.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Numéro de commande</p>
                  <p className="font-bold">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Méthode de livraison</p>
                  <p className="font-bold">Livraison Express (24-48h)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Adresse de livraison</p>
                  <p className="font-medium">{address.street}<br/>{address.zip} {address.city}<br/>{address.country}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link href="/" className="px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-colors inline-block">
                Retour à l&apos;accueil
              </Link>
            </div>

            <div className="text-left mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold mb-2 text-center">👀 Prévisualisation des Emails (Frontend Only)</h3>
              <p className="text-sm text-gray-500 mb-8 text-center max-w-lg mx-auto">
                Voici exactement les emails qui seront envoyés via EmailJS au client et à l&apos;administrateur. Le code d&apos;intégration est prêt dans <code className="bg-gray-100 px-1 rounded">page.tsx</code>.
              </p>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                    <User size={18} /> Email envoyé au Client ({info.email})
                  </h4>
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 p-2 shadow-inner">
                     <iframe srcDoc={clientEmailPreview} className="w-full h-[650px] bg-white rounded-lg shadow-sm" title="Email Client" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                    <ShieldCheck size={18} /> Email envoyé à l&apos;Admin (admin@central-it.com)
                  </h4>
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 p-2 shadow-inner">
                     <iframe srcDoc={adminEmailPreview} className="w-full h-[650px] bg-white rounded-lg shadow-sm" title="Email Admin" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1">
              {/* Stepper */}
              <div className="mb-8 flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
                {steps.map((step, idx) => {
                  const isCompleted = steps.findIndex(s => s.id === currentStep) > idx;
                  const isActive = step.id === currentStep;
                  const Icon = step.icon;
                  return (
                    <div key={step.id} className="flex flex-col items-center bg-gray-50 px-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                        isActive ? 'bg-black text-white ring-4 ring-black/10' : 
                        isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                      </div>
                      <span className={`mt-2 text-xs font-semibold uppercase tracking-wider ${
                        isActive ? 'text-black' : isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Form Content */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {currentStep === 'info' && (
                    <motion.form
                      key="info"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={(e) => { e.preventDefault(); setCurrentStep('shipping'); }}
                      className="space-y-6"
                    >
                      <h2 className="text-xl font-bold mb-6">Informations Personnelles</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                          <input required type="text" value={info.firstName} onChange={e => setInfo({...info, firstName: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                          <input required type="text" value={info.lastName} onChange={e => setInfo({...info, lastName: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
                        <input required type="email" value={info.email} onChange={e => setInfo({...info, email: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                        <input required type="tel" value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all" />
                      </div>
                      <div className="pt-4 flex justify-end">
                        <button type="submit" className="px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-colors flex items-center gap-2">
                          Continuer vers Livraison <ChevronRight size={18} />
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {currentStep === 'shipping' && (
                    <motion.form
                      key="shipping"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={(e) => { e.preventDefault(); setCurrentStep('payment'); }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Adresse de Livraison</h2>
                        <button type="button" onClick={() => setCurrentStep('info')} className="text-sm font-medium text-blue-600 hover:underline">Modifier infos</button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse complète</label>
                        <input required type="text" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} placeholder="123 Rue de la République" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Code Postal</label>
                          <input required type="text" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                          <input required type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                        <select value={address.country} onChange={e => setAddress({...address, country: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all bg-white">
                          <option value="France">France</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Suisse">Suisse</option>
                        </select>
                      </div>

                      <div className="mt-6 border border-blue-100 bg-blue-50/50 rounded-xl p-4 flex gap-4">
                        <Truck className="text-blue-600 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-blue-900">Livraison Express DHL</h4>
                          <p className="text-sm text-blue-700 mt-1">Livraison prévue dans les 24-48h ouvrées. {shipping === 0 ? 'Offerte pour votre commande.' : `${shipping} €`}</p>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button type="button" onClick={() => setCurrentStep('info')} className="px-6 py-3 text-gray-600 font-medium hover:text-black transition-colors">Retour</button>
                        <button type="submit" className="px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-colors flex items-center gap-2">
                          Aller au Paiement <ChevronRight size={18} />
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {currentStep === 'payment' && (
                    <motion.form
                      key="payment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleProcessPayment}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Paiement</h2>
                        <button type="button" onClick={() => setCurrentStep('shipping')} className="text-sm font-medium text-blue-600 hover:underline">Modifier adresse</button>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
                        <div className="flex items-center gap-3 mb-4 text-green-700">
                          <ShieldCheck size={24} />
                          <span className="font-medium">Paiement 100% Sécurisé (Simulation)</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Ceci est une simulation de paiement. Aucune donnée réelle ne sera traitée.</p>
                        
                        <div className="space-y-4 relative">
                          {isProcessing && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-lg">
                              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                              <p className="font-semibold text-blue-900">Traitement en cours...</p>
                            </div>
                          )}

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de carte</label>
                            <input required type="text" placeholder="0000 0000 0000 0000" defaultValue="4242 4242 4242 4242" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all font-mono" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
                              <input required type="text" placeholder="MM/YY" defaultValue="12/26" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all font-mono" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                              <input required type="text" placeholder="123" defaultValue="123" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all font-mono" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-between items-center">
                        <button type="button" onClick={() => setCurrentStep('shipping')} className="px-6 py-3 text-gray-600 font-medium hover:text-black transition-colors" disabled={isProcessing}>Retour</button>
                        <button type="submit" disabled={isProcessing} className="px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                          Payer {total.toFixed(2)} € <Lock size={16} />
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="w-full lg:w-[350px] shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
                <h3 className="text-lg font-bold mb-4">Récapitulatif</h3>
                
                <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-50 rounded-md overflow-hidden shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium line-clamp-2">{item.product.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">Qté: {item.quantity}</p>
                        <p className="text-sm font-bold mt-1">{item.product.price * item.quantity} €</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sous-total HT</span>
                    <span className="font-medium">{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">TVA (20%)</span>
                    <span className="font-medium">{tva.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Frais de port</span>
                    <span className="font-medium">{shipping === 0 ? 'Offert' : `${shipping.toFixed(2)} €`}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total TTC</span>
                    <span className="font-bold text-2xl">{total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
