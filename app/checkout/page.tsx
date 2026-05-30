/**
 * app/checkout/page.tsx — Le Processus de Commande (Route : /checkout)
 * ======================================================================
 * Rédigé par Ryan Neuville
 *
 * C'est la page la plus complexe et la plus importante du projet.
 * Elle gère un formulaire multi-étapes et déclenche l'envoi des emails de confirmation.
 *
 * ─── LES 4 ÉTAPES ───────────────────────────────────────────────────────────────
 *
 *   'info'         → Informations personnelles (prénom, nom, email, téléphone)
 *   'shipping'     → Adresse de livraison (rue, code postal, ville, pays)
 *   'payment'      → Paiement (simulation CB) + envoi des emails via EmailJS
 *   'confirmation' → Page de succès avec récapitulatif de commande
 *
 * ─── LE FLUX D'ENVOI D'EMAILS (SANS BACKEND) ────────────────────────────────────
 *
 *   1. L'utilisateur soumet le formulaire de paiement
 *   2. On génère un numéro de commande aléatoire (format : CMD-XXXXXXX)
 *   3. On génère deux templates HTML d'email (client + admin) depuis lib/emailTemplates.ts
 *   4. EmailJS.send() est appelé deux fois :
 *      - Pour le CLIENT : à l'adresse email saisie dans le formulaire
 *      - Pour L'ADMIN  : à feukouoryan@icloud.com (Ryan)
 *   5. Que l'envoi réussisse ou échoue, la commande est confirmée (on ne bloque jamais l'user)
 *
 * ─── LES CLÉS EMAILJS ───────────────────────────────────────────────────────────
 *
 *   SERVICE_ID  → 'service_0ksrbxk'   (service Gmail connecté sur emailjs.com)
 *   TEMPLATE_ID → 'template_3wspinx'  (template avec {{{html_content}}} et {{email}})
 *   PUBLIC_KEY  → '7Z6usR6NcmAl4vTt7' (clé publique — ne donne pas accès au compte)
 *
 * ─── BIBLIOTHÈQUES UTILISÉES ────────────────────────────────────────────────────
 *
 *   @emailjs/browser  → Envoi d'emails depuis le navigateur (sans serveur)
 *   framer-motion     → Animations de transition entre les étapes (AnimatePresence)
 *   lucide-react      → Icônes (cadenas, carte bancaire, etc.)
 */
'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Lock, CreditCard, User, MapPin, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';
import { generateClientEmailHtml, generateAdminEmailHtml } from '@/lib/emailTemplates';

/** Type des étapes — définit les valeurs valides pour currentStep */
type Step = 'info' | 'shipping' | 'payment' | 'confirmation';

/**
 * CheckoutPage — Composant Principal
 * ------------------------------------
 * États principaux :
 *   - currentStep    : étape actuelle du formulaire
 *   - orderNumber    : numéro de commande généré après paiement (ex: CMD-A8FKZ2P)
 *   - isProcessing   : true pendant l'envoi email → affiche le spinner + désactive le bouton
 *   - info           : données du formulaire étape 1 (infos personnelles)
 *   - address        : données du formulaire étape 2 (adresse)
 */
export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Calcul des totaux
   * -----------------
   * subtotal : somme des prix HT des articles (depuis CartContext)
   * shipping : 0€ si la commande dépasse 200€ HT, sinon 15€
   * tva      : TVA française à 20%
   * total    : montant final TTC que le client paie
   */
  const subtotal = totalPrice;
  const shipping = subtotal > 200 ? 0 : 15;
  const tva = subtotal * 0.20;
  const total = subtotal + shipping + tva;

  /** États des formulaires — remplis au fur et à mesure par l'utilisateur */
  const [info, setInfo] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [address, setAddress] = useState({ street: '', city: '', zip: '', country: 'France' });

  /**
   * Garde-fou si le panier est vide
   * --------------------------------
   * Si l'utilisateur accède à /checkout avec un panier vide (hors étape confirmation),
   * on affiche un message d'erreur au lieu du formulaire.
   * Note : On exclut 'confirmation' car le panier est vidé APRÈS la commande.
   */
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

  /**
   * Configuration du stepper visuel (indicateur d'étapes)
   * -------------------------------------------------------
   * Chaque objet contient l'ID de l'étape, son libellé et son icône Lucide.
   * On boucle dessus pour afficher la barre de progression en haut du formulaire.
   */
  const steps = [
    { id: 'info', label: 'Informations', icon: User },
    { id: 'shipping', label: 'Livraison', icon: MapPin },
    { id: 'payment', label: 'Paiement', icon: CreditCard },
  ];

  /**
   * handleProcessPayment — La fonction de traitement du paiement
   * ------------------------------------------------------------
   * Déclenchée à la soumission du formulaire de paiement (étape 3).
   * C'est ici que tout le flux EmailJS se passe.
   *
   * Étapes :
   *   1. Empêche le rechargement de la page (e.preventDefault)
   *   2. Active le spinner (isProcessing = true)
   *   3. Génère un numéro de commande unique
   *   4. Génère les HTML des deux emails depuis nos templates
   *   5. Envoie l'email au CLIENT via EmailJS
   *   6. Envoie l'email à l'ADMIN via EmailJS
   *   7. Affiche la page de confirmation et vide le panier
   *   8. En cas d'erreur EmailJS : on confirme quand même la commande
   *      → On ne pénalise pas le client pour un problème technique d'email
   */
  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const newOrderNumber = `CMD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const clientHtml = generateClientEmailHtml(info, address, items, subtotal, shipping, tva, total, newOrderNumber);
    const adminHtml = generateAdminEmailHtml(info, address, items, subtotal, shipping, tva, total, newOrderNumber);
    
    try {
      const SERVICE_ID = 'service_0ksrbxk';
      const TEMPLATE_ID = 'template_3wspinx';
      const PUBLIC_KEY = '7Z6usR6NcmAl4vTt7';

      /** Envoi de l'email au client — à l'adresse saisie dans le formulaire */
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { 
        html_content: clientHtml, 
        email: info.email,
        order_id: newOrderNumber
      }, PUBLIC_KEY);
      
      /** Envoi de la notification à l'admin — Ryan reçoit toutes les commandes ici */
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { 
        html_content: adminHtml, 
        email: 'feukouoryan@icloud.com',
        order_id: newOrderNumber
      }, PUBLIC_KEY);

      setOrderNumber(newOrderNumber);
      setCurrentStep('confirmation');
      clearCart();
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email via EmailJS:", error);
      /**
       * Même si EmailJS échoue (réseau, quota...), on confirme quand même la commande.
       * L'expérience utilisateur passe en premier — un email raté ne doit pas
       * bloquer une commande qui a techniquement été passée.
       */
      setOrderNumber(newOrderNumber);
      setCurrentStep('confirmation');
      clearCart();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête du checkout — simplifié, sans la Navbar principale */}
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
        {/* ===== PAGE DE CONFIRMATION — affichée après paiement validé ===== */}
        {currentStep === 'confirmation' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 text-center"
          >
            {/* Icône de succès verte */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-green-600" size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-4">Commande Confirmée !</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Merci pour votre commande, {info.firstName}. Un email de confirmation a été envoyé à {info.email}.
            </p>
            
            {/* Récapitulatif rapide de la commande confirmée */}
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
          </motion.div>
        ) : (
          /* ===== FORMULAIRE MULTI-ÉTAPES — affiché tant que la commande n'est pas confirmée ===== */
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1">
              {/* ─── STEPPER — barre de progression visuelle ─── */}
              <div className="mb-8 flex items-center justify-between relative">
                {/* Ligne de fond grise qui relie les étapes */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
                {steps.map((step, idx) => {
                  const isCompleted = steps.findIndex(s => s.id === currentStep) > idx;
                  const isActive = step.id === currentStep;
                  const Icon = step.icon;
                  return (
                    <div key={step.id} className="flex flex-col items-center bg-gray-50 px-2">
                      {/* Cercle d'étape : noir si active, vert si complétée, gris sinon */}
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

              {/* ─── ZONE DE FORMULAIRE — change de contenu selon l'étape ─── */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                {/*
                  AnimatePresence permet d'animer la sortie d'un composant avant qu'il soit retiré.
                  mode="wait" attend que l'ancien formulaire disparaisse avant d'afficher le nouveau.
                */}
                <AnimatePresence mode="wait">
                  {/* ══════ ÉTAPE 1 : INFORMATIONS PERSONNELLES ══════ */}
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

                  {/* ══════ ÉTAPE 2 : ADRESSE DE LIVRAISON ══════ */}
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

                      {/* Bloc informatif livraison DHL */}
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

                  {/* ══════ ÉTAPE 3 : PAIEMENT (+ envoi des emails) ══════ */}
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
                          {/* Overlay de chargement pendant l'envoi EmailJS */}
                          {isProcessing && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-lg">
                              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                              <p className="font-semibold text-blue-900">Traitement en cours...</p>
                            </div>
                          )}

                          {/* Champs de carte bancaire (pré-remplis pour la démo) */}
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
                        {/* Bouton de paiement désactivé pendant le traitement */}
                        <button type="submit" disabled={isProcessing} className="px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                          Payer {total.toFixed(2)} € <Lock size={16} />
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ─── SIDEBAR RÉCAPITULATIF — toujours visible à droite ─── */}
            <div className="w-full lg:w-[350px] shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
                <h3 className="text-lg font-bold mb-4">Récapitulatif</h3>
                
                {/* Liste des articles avec miniature + nom + quantité + prix */}
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

                {/* Détail financier */}
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

                {/* Total TTC final */}
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
