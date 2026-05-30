/**
 * products.ts — La Base de Données Locale ("le catalogue")
 * ==========================================================
 * Rédigé par Ryan Neuville
 *
 * Ce fichier est NOTRE "base de données". Pas de MySQL, pas de Supabase,
 * juste un beau tableau TypeScript avec 20 produits soigneusement choisis.
 *
 * Dans une vraie app d'e-commerce, ces données viendraient d'une API.
 * Mais pour ce projet (version démo), on les stocke ici directement.
 * C'est plus simple pour le grand frère qui veut comprendre le code !
 *
 * Ce fichier exporte :
 *   - Product       → L'interface TypeScript (le "contrat" que chaque produit suit)
 *   - products      → Le tableau des 20 produits du catalogue
 *   - categories    → Les catégories pour le filtre de la page /shop
 *   - categoryIdMap → La correspondance entre ID de catégorie et nom
 *   - testimonials  → Les avis clients affichés sur la page d'accueil
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  rating: number;
  reviews: number;
  badge?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  specs?: Record<string, string>;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Souris Gaming Apex Pro Wireless',
    price: 159,
    category: 'Souris',
    image: 'https://i.pinimg.com/736x/11/d3/8f/11d38fea4c5dcfbb0145dd46ad3b836d.jpg',
    images: [
      'https://i.pinimg.com/736x/11/d3/8f/11d38fea4c5dcfbb0145dd46ad3b836d.jpg',
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: 'Souris gaming sans fil ultra-légère (54g) dotée d\'un capteur optique haute précision de 26 000 DPI. Conçue pour l\'e-sport avec un taux de rapport de 8000Hz et des switches optiques ultra-rapides.',
    rating: 4.9,
    reviews: 245,
    badge: 'Nouveauté',
    isNew: true,
    specs: {
      'Capteur': 'Apex Optical 26K DPI',
      'Poids': '54 grammes',
      'Connexion': '2.4 GHz / Bluetooth / Filaire',
      'Autonomie': 'Jusqu\'à 90 heures',
    },
  },
  {
    id: '2',
    name: 'Clavier Mécanique Apex RGB - Switchs Red',
    price: 189,
    category: 'Claviers',
    image: 'https://i.pinimg.com/736x/b9/ba/6b/b9ba6bbe50f20f4ad4b9ef4b935d0206.jpg',
    images: [
      'https://i.pinimg.com/736x/b9/ba/6b/b9ba6bbe50f20f4ad4b9ef4b935d0206.jpg',
      'https://i.pinimg.com/736x/75/b6/b4/75b6b42183b4d5ae826d46f5f09ac1a5.jpg',
    ],
    description: 'Clavier mécanique haut de gamme pour joueurs et développeurs. Rétroéclairage RGB touche par touche, switches linéaires opto-mécaniques ultra-réactifs et châssis robuste en aluminium.',
    rating: 4.8,
    reviews: 198,
    isBestseller: true,
    specs: {
      'Switches': 'Opto-mécaniques rouges (linéaires)',
      'Format': 'TKL (Sans pavé numérique)',
      'Rétroéclairage': 'RGB 16.8M de couleurs',
      'Châssis': 'Aluminium de qualité aéronautique',
    },
  },
  {
    id: '3',
    name: 'Casque Gaming Apex Audio 7.1',
    price: 149,
    category: 'Audio',
    image: 'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/610945/pexels-photo-610945.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: 'Casque de jeu sans fil offrant un son spatialisé 7.1 haute fidélité. Confort exceptionnel avec coussinets en mousse à mémoire de forme et micro bidirectionnel rétractable antibruit.',
    rating: 4.7,
    reviews: 156,
    specs: {
      'Audio': 'Son Spatial 7.1 virtuel',
      'Transducteurs': 'Néodyme 50 mm',
      'Micro': 'Rétractable avec annulation de bruit',
      'Compatibilité': 'PC, Mac, Console, Mobile',
    },
  },
  {
    id: '4',
    name: 'Souris Ergonomique ErgoMaster Pro',
    price: 119,
    category: 'Souris',
    image: 'https://i.pinimg.com/736x/ee/f2/74/eef274ed6edd234344df8339af0d5eb7.jpg',
    images: [
      'https://i.pinimg.com/736x/ee/f2/74/eef274ed6edd234344df8339af0d5eb7.jpg',
      'https://i.pinimg.com/736x/7d/40/9d/7d409d1cc8112f22464c835324f59422.jpg'
    ],
    description: 'Souris ergonomique verticale conçue pour réduire les tensions musculaires et la fatigue du poignet. Idéale pour les longues journées de développement et de travail de bureau.',
    rating: 4.8,
    reviews: 312,
    isBestseller: true,
    specs: {
      'Angle vertical': '57 degrés',
      'Capteur': 'Optique 4000 DPI ajustable',
      'Autonomie': 'Jusqu\'à 4 mois (charge rapide)',
      'Multidispositif': 'Appairage jusqu\'à 3 appareils',
    },
  },
  {
    id: '5',
    name: 'Clavier Ergonomique ErgoBoard Pro',
    price: 229,
    category: 'Claviers',
    image: 'https://images.pexels.com/photos/399160/pexels-photo-399160.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/399160/pexels-photo-399160.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://i.pinimg.com/736x/54/39/07/543907524d49717c7c2f10c40f7a9ffd.jpg',
    ],
    description: 'Clavier ergonomique divisé avec switches mécaniques silencieux. Favorise une posture naturelle des bras et des mains, réduisant le risque de TMS (Troubles Musculosquelettiques).',
    rating: 4.9,
    reviews: 122,
    badge: 'Recommandé Pro',
    isNew: true,
    specs: {
      'Design': 'Divisé (Split-layout) avec inclinaison',
      'Switches': 'Mécaniques Silent Brown (tactile feutré)',
      'Repose-poignet': 'Mousse haute densité intégré',
      'Autonomie': 'Rechargeable USB-C (2 mois)',
    },
  },
  {
    id: '6',
    name: 'Écouteurs Pro StudioBuds ANC',
    price: 199,
    category: 'Audio',
    image: 'https://i.pinimg.com/736x/1c/b5/f4/1cb5f46addf116c3f95c509bf57f633f.jpg',
    images: [
      'https://i.pinimg.com/736x/1c/b5/f4/1cb5f46addf116c3f95c509bf57f633f.jpg',
      'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: 'Écouteurs intra-auriculaires haut de gamme avec réduction active du bruit (ANC) intelligente. Son cristallin certifié Hi-Res Audio et microphones de qualité studio pour vos réunions professionnelles.',
    rating: 4.7,
    reviews: 188,
    specs: {
      'Technologie': 'Réduction active du bruit adaptative',
      'Autonomie': '8h (ANC activé) / 32h avec boîtier',
      'Codec': 'LDAC, AAC, SBC',
      'Résistance': 'IPX4 (sueur et éclaboussures)',
    },
  },
  {
    id: '7',
    name: 'Tablette Graphique Vision Draw Pro 16',
    price: 599,
    category: 'Tablettes',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: 'Écran de création graphique interactif 16 pouces avec résolution 4K. Couverture colorimétrique de 99% sRGB et stylet haute sensibilité de 8192 niveaux de pression sans pile.',
    rating: 4.9,
    reviews: 84,
    badge: 'Top Créatif',
    specs: {
      'Écran': '15.6" IPS 4K Ultra HD',
      'Stylet': 'Passif (sans batterie) avec inclinaison',
      'Sensibilité': '8192 niveaux de pression',
      'Gamme de couleurs': '99% sRGB, 94% Adobe RGB',
    },
  },
  {
    id: '8',
    name: 'Tablette Tactile VisionPad Pro 12',
    price: 899,
    category: 'Tablettes',
    image: 'https://i.pinimg.com/736x/60/2c/75/602c757cfc37eb34b59cfbe7ef4ed2ad.jpg',
    images: [
      'https://i.pinimg.com/736x/60/2c/75/602c757cfc37eb34b59cfbe7ef4ed2ad.jpg',
      'https://i.pinimg.com/1200x/b5/6a/42/b56a4252da2381dec2d51ecdeb8c7ee3.jpg'
    ],
    description: 'Tablette tactile ultra-puissante dotée d\'un processeur de dernière génération et d\'un écran 120Hz Liquid Retina. Outil idéal pour la productivité nomade, les croquis et la validation de maquettes UI.',
    rating: 4.8,
    reviews: 142,
    isBestseller: true,
    specs: {
      'Écran': '12.4" Liquid Retina XDR 120Hz',
      'CPU': 'Processeur Octa-Core ultra-puissant',
      'Stockage': '256 Go / 512 Go SSD interne',
      'Compatibilité': 'Stylet et clavier magnétique (option)',
    },
  },
  {
    id: '9',
    name: 'Moniteur VisionArt 27" UltraSharp 4K',
    price: 749,
    category: 'Écrans',
    image: 'https://i.pinimg.com/1200x/b0/5e/74/b05e7489dd413581866b7e11741597a2.jpg',
    images: [
      'https://i.pinimg.com/1200x/b0/5e/74/b05e7489dd413581866b7e11741597a2.jpg',
      'https://i.pinimg.com/1200x/f7/99/ff/f799ffc2d4fabaab2e9d3041b6a3f787.jpg',
    ],
    description: 'Écran de création professionnelle avec dalle IPS 27 pouces 4K. Calibrage d\'usine rigoureux avec Delta E < 1 pour un rendu colorimétrique absolument parfait. Hub USB-C intégré avec charge 90W.',
    rating: 4.9,
    reviews: 95,
    specs: {
      'Taille & Type': '27" IPS 4K (3840 x 2160)',
      'Couleurs': '99% DCI-P3, HDR400',
      'Connectique': 'USB-C (PD 90W), DisplayPort, HDMI',
      'Ergonomie': 'Pivotant, inclinable et réglable en hauteur',
    },
  },
  {
    id: '10',
    name: 'Souris Nomade GoMouse Wireless',
    price: 49,
    category: 'Souris',
    image: 'https://i.pinimg.com/736x/2d/bf/a3/2dbfa300bc1963ef9193148f4bc1ab0d.jpg',
    images: [
      'https://i.pinimg.com/736x/2d/bf/a3/2dbfa300bc1963ef9193148f4bc1ab0d.jpg',
      'https://i.pinimg.com/1200x/2b/64/bf/2b64bf30a079300231de0427bca58b10.jpg',
    ],
    description: 'Souris portable sans fil ultra-plate et silencieuse. Elle se glisse facilement dans une sacoche de voyage et propose une double connectivité Bluetooth et dongle USB.',
    rating: 4.5,
    reviews: 134,
    specs: {
      'Format': 'Ultra-plat nomade',
      'Clics': 'Technologie clic silencieux',
      'Autonomie': 'Rechargeable via USB-C (30 jours)',
      'Sensibilité': '1000 - 2400 DPI',
    },
  },
  {
    id: '11',
    name: 'Clavier Bluetooth SlimKeys Multi-Sync',
    price: 89,
    category: 'Claviers',
    image: 'https://i.pinimg.com/1200x/61/5e/07/615e07bc563976d415edb3ccb16b4505.jpg',
    images: [
      'https://i.pinimg.com/736x/72/ad/ed/72aded2cc04429cafd0d23030f10923a.jpg',
      'https://i.pinimg.com/736x/3c/01/0b/3c010b3dad8cdfb20dae9700203486b9.jpg',
    ],
    description: 'Clavier Bluetooth ultra-fin en aluminium. switches à ciseaux de précision pour une frappe douce et silencieuse. Associez et basculez instantanément entre 3 appareils.',
    rating: 4.6,
    reviews: 167,
    specs: {
      'Matériau': 'Châssis en aluminium anodisé',
      'Mécanisme': 'Switches à ciseaux',
      'Connexion': 'Bluetooth 5.1 triple canal',
      'Rétroéclairage': 'Blanc avec capteur d\'intensité',
    },
  },
  {
    id: '12',
    name: 'Casque Studio Monitor HD-600',
    price: 299,
    category: 'Audio',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: 'Casque audio circum-aural de studio professionnel à conception ouverte. Rendement sonore linéaire et ultra-neutre, idéal pour les producteurs de musique, vidéastes et créatifs exigeants.',
    rating: 4.9,
    reviews: 112,
    badge: 'Studio',
    specs: {
      'Type': 'Ouvert, filaire',
      'Réponse en fréquence': '12 Hz - 40 500 Hz',
      'Impédance': '300 Ohms (amplificateur recommandé)',
      'Connecteur': 'Jack 3.5mm avec adaptateur 6.35mm plaqué or',
    },
  },
  {
    id: '13',
    name: 'Souris FPS UltraLight 47g',
    price: 129,
    category: 'Souris',
    image: 'https://i.pinimg.com/736x/ba/b4/d9/bab4d90debea9d675b0da79657296de6.jpg',
    images: [
      'https://i.pinimg.com/736x/ba/b4/d9/bab4d90debea9d675b0da79657296de6.jpg',
      'https://i.pinimg.com/736x/b4/14/0b/b4140b948d43eacd4a3757bb2d7b68f9.jpg',
    ],
    description: 'Souris gaming filaire ultra-légère de seulement 47 grammes avec coque en nid d\'abeille. Capteur PixArt 3395 et câble paracord pour un glissement sans friction, parfaite pour les FPS compétitifs.',
    rating: 4.8,
    reviews: 189,
    isNew: true,
    specs: {
      'Capteur': 'PixArt PAW3395 26K DPI',
      'Poids': '47 grammes',
      'Câble': 'Paracord ultra-souple',
      'Switches': 'Optiques 100M clics',
    },
  },
  {
    id: '14',
    name: 'Souris MMO MultiAction 12 Boutons',
    price: 79,
    category: 'Souris',
    image: 'https://images.pexels.com/photos/5082570/pexels-photo-5082570.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/5082570/pexels-photo-5082570.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: 'Souris MMO avec grille latérale de 12 boutons programmables. Idéale pour les jeux de rôle en ligne et la productivité avancée avec profils de macros personnalisables.',
    rating: 4.6,
    reviews: 97,
    specs: {
      'Boutons': '12 boutons latéraux + 7 standard',
      'Capteur': 'Optique 16 000 DPI',
      'Mémoire': '5 profils embarqués',
      'Poids': 'Ajustable (6 poids inclus)',
    },
  },
  {
    id: '15',
    name: 'Pavé Numérique MechPad Pro',
    price: 69,
    category: 'Claviers',
    image: 'https://i.pinimg.com/1200x/bf/e7/60/bfe760e67f6c564a764bc3e991fa1964.jpg',
    images: [
      'https://i.pinimg.com/1200x/bf/e7/60/bfe760e67f6c564a764bc3e991fa1964.jpg',
      'https://i.pinimg.com/1200x/c6/d1/f2/c6d1f20d38c3d4770bca89dba4091763.jpg',
    ],
    description: 'Pavé numérique mécanique sans fil avec rétroéclairage RGB et switches hot-swappable. Compagnon idéal des claviers TKL pour la comptabilité, la modélisation 3D et le data entry.',
    rating: 4.7,
    reviews: 143,
    specs: {
      'Switches': 'Mécaniques hot-swappable (Gateron)',
      'Connexion': 'Bluetooth 5.0 / USB-C',
      'Rétroéclairage': 'RGB par touche',
      'Autonomie': '40 heures (RGB activé)',
    },
  },
  {
    id: '16',
    name: 'Microphone USB StreamVox Pro',
    price: 169,
    category: 'Audio',
    image: 'https://i.pinimg.com/1200x/07/60/81/076081d73c6d3cf41b231d6ee2d13c7c.jpg',
    images: [
      'https://i.pinimg.com/1200x/07/60/81/076081d73c6d3cf41b231d6ee2d13c7c.jpg',
      'https://i.pinimg.com/736x/47/6e/ee/476eeec23adb8053b07fd0a850706893.jpg',
    ],
    description: 'Microphone USB à condensateur cardioïde de qualité broadcast. Résolution 24 bits / 96 kHz, contrôle de gain intégré et sortie casque sans latence pour le streaming, le podcast et les visioconférences.',
    rating: 4.8,
    reviews: 221,
    badge: 'Top Streamer',
    isBestseller: true,
    specs: {
      'Type': 'Condensateur cardioïde',
      'Résolution': '24 bits / 96 kHz',
      'Connectique': 'USB-C (plug & play)',
      'Monitoring': 'Sortie casque jack 3.5mm zéro latence',
    },
  },
  {
    id: '17',
    name: 'Enceinte de Bureau SoundDesk 50',
    price: 249,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1545454675-a6aa34b1d61c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545454675-a6aa34b1d61c?auto=format&fit=crop&w=800&q=80',
      'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: 'Paire d\'enceintes de bureau actives 2.0 avec amplification 50W RMS par canal. Son haute fidélité avec DAC USB intégré et connectivité Bluetooth aptX HD. Design épuré pour les studios et bureaux.',
    rating: 4.7,
    reviews: 78,
    specs: {
      'Puissance': '2x 50W RMS',
      'DAC': 'USB intégré 24 bits / 192 kHz',
      'Bluetooth': '5.2 avec aptX HD',
      'Entrées': 'USB-C, Optique, Jack 3.5mm, Bluetooth',
    },
  },
  {
    id: '18',
    name: 'Tablette Graphique SketchPad Mini 10',
    price: 199,
    category: 'Tablettes',
    image: 'https://i.pinimg.com/736x/a1/43/82/a14382928dc591f3f0bcc9536b8bf943.jpg',
    images: [
      'https://i.pinimg.com/736x/a1/43/82/a14382928dc591f3f0bcc9536b8bf943.jpg',
      'https://i.pinimg.com/736x/e4/9a/61/e49a61d6d07dfbc5e72f441e6ef9f5ad.jpg',
    ],
    description: 'Tablette graphique compacte 10 pouces sans écran avec surface de dessin texturée et stylet passif 8192 niveaux. Format nomade idéal pour la retouche photo, l\'annotation et l\'illustration digitale.',
    rating: 4.6,
    reviews: 203,
    specs: {
      'Surface active': '10" x 6.25"',
      'Stylet': 'Passif (sans batterie)',
      'Sensibilité': '8192 niveaux de pression + inclinaison',
      'Compatibilité': 'Windows, macOS, ChromeOS, Android',
    },
  },
  {
    id: '19',
    name: 'Moniteur Gaming ArcView 32" 165Hz',
    price: 449,
    category: 'Écrans',
    image: 'https://i.pinimg.com/1200x/33/52/f5/3352f5175f7485c76e9327ebf34fa5ce.jpg',
    images: [
      'https://i.pinimg.com/1200x/33/52/f5/3352f5175f7485c76e9327ebf34fa5ce.jpg',
      'https://i.pinimg.com/1200x/02/7f/6e/027f6ea5636fc40d93dc18ec32979780.jpg',
    ],
    description: 'Écran gaming QHD 32 pouces avec dalle VA incurvée 1500R et taux de rafraîchissement de 165Hz. Temps de réponse de 1ms MPRT, compatible FreeSync Premium et G-Sync. Immersion totale pour le jeu.',
    rating: 4.8,
    reviews: 167,
    badge: 'Gaming',
    isNew: true,
    specs: {
      'Taille & Type': '32" VA incurvée 1500R',
      'Résolution': 'QHD 2560 x 1440',
      'Rafraîchissement': '165Hz, 1ms MPRT',
      'Sync': 'FreeSync Premium + G-Sync Compatible',
    },
  },
  {
    id: '20',
    name: 'Moniteur Ultrawide CurveMax 34"',
    price: 899,
    category: 'Écrans',
    image: 'https://i.pinimg.com/1200x/80/55/26/805526612f0d47aee02340b79be5a9b2.jpg',
    images: [
      'https://i.pinimg.com/1200x/80/55/26/805526612f0d47aee02340b79be5a9b2.jpg',
      'https://i.pinimg.com/1200x/e2/48/88/e2488893df500d417c8aa4ff198dcd52.jpg',
    ],
    description: 'Écran ultra-large incurvé 34 pouces UWQHD (3440x1440) avec dalle IPS Nano et couverture 98% DCI-P3. USB-C avec Power Delivery 90W, KVM intégré. L\'outil ultime pour le multitâche et la création.',
    rating: 4.9,
    reviews: 64,
    badge: 'Premium',
    isBestseller: true,
    specs: {
      'Taille & Type': '34" IPS Nano incurvée',
      'Résolution': 'UWQHD 3440 x 1440',
      'Couleurs': '98% DCI-P3, HDR600',
      'Connectique': 'USB-C PD 90W, HDMI 2.1, DP 1.4, KVM',
    },
  },
];

/**
 * categories — La Liste des Catégories pour les Filtres
 * -------------------------------------------------------
 * Utilisées par la page /shop pour afficher les boutons de filtre
 * dans la barre latérale. Chaque catégorie a un id (court, technique)
 * et un name (lisible, pour l'affichage).
 *
 * L'id "all" est spécial : il signifie "afficher tous les produits".
 */
export const categories = [
  { id: 'all', name: 'Tous les produits' },
  { id: 'souris', name: 'Souris' },
  { id: 'claviers', name: 'Claviers' },
  { id: 'audio', name: 'Audio' },
  { id: 'tablettes', name: 'Tablettes' },
  { id: 'ecrans', name: 'Écrans' },
];

/**
 * categoryIdMap — Correspondance entre ID et Nom de Catégorie
 * ------------------------------------------------------------
 * Dans la page /shop, on filtre les produits par catégorie.
 * Les produits ont un champ "category" qui contient le nom lisible (ex: "Souris").
 * Les filtres utilisent un id court (ex: "souris").
 *
 * Ce mapping permet de convertir l'ID du filtre en nom pour la comparaison :
 *   categoryIdMap["souris"] → "Souris"
 *   products[i].category    → "Souris"  → match !
 */
export const categoryIdMap: Record<string, string> = {
  'souris': 'Souris',
  'claviers': 'Claviers',
  'audio': 'Audio',
  'tablettes': 'Tablettes',
  'ecrans': 'Écrans',
};

/**
 * testimonials — Les Avis Clients pour la Page d'Accueil
 * -------------------------------------------------------
 * Affichés dans la section "Approuvé par la Communauté" de la page d'accueil.
 * Chaque témoignage a un auteur, un rôle, un contenu et un avatar (photo).
 *
 * Ce sont des faux avis (je les ai inventés), mais ils donnent du cachet au site.
 */
export const testimonials = [
  {
    id: '1',
    author: 'Thomas L.',
    role: 'Joueur E-sport Pro',
    content: 'La souris Apex Pro Wireless est incroyablement réactive et légère. Elle a complètement redéfini mes sensations de jeu en tournoi.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  },
  {
    id: '2',
    author: 'Sophie M.',
    role: 'Développeuse Full-Stack',
    content: 'Mon clavier mécanique ergonomique ErgoBoard Pro a changé mon quotidien. La frappe silencieuse est un délice et mes douleurs au poignet ont disparu.',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
  },
  {
    id: '3',
    author: 'Karim B.',
    role: 'Designer UI/UX & Illustrateur',
    content: 'La tablette graphique Vision Draw Pro 16 offre une fidélité de couleurs et une sensibilité de stylet optimales pour valider mes maquettes et illustrations.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
  },
];
