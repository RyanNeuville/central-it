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
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg',
    images: [
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg',
      'https://images.pexels.com/photos/5082570/pexels-photo-5082570.jpeg',
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
    image: 'https://i.pinimg.com/736x/ea/a0/70/eaa070fc0b13b034a2f68f37aef1aa9a.jpg',
    images: [
      'https://i.pinimg.com/736x/ea/a0/70/eaa070fc0b13b034a2f68f37aef1aa9a.jpg',
      'https://images.pexels.com/photos/399160/pexels-photo-399160.jpeg',
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
    image: 'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg',
    images: [
      'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg',
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
    image: 'https://i.pinimg.com/736x/c9/d7/c6/c9d7c611057c6ac1c7518e5600d74d03.jpg',
    images: [
      'https://i.pinimg.com/736x/c9/d7/c6/c9d7c611057c6ac1c7518e5600d74d03.jpg',
      'https://i.pinimg.com/736x/75/c1/7e/75c17e816e872a0378336ccda316059f.jpg'
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
    image: 'https://images.pexels.com/photos/399160/pexels-photo-399160.jpeg',
    images: [
      'https://images.pexels.com/photos/399160/pexels-photo-399160.jpeg',
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
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg',
    images: [
      'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg',
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
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
    images: [
      'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
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
    image: 'https://images.pexels.com/photos/106344/pexels-photo-106344.jpeg',
    images: [
      'https://images.pexels.com/photos/106344/pexels-photo-106344.jpeg',
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
    image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg',
    images: [
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg',
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
    image: 'https://i.pinimg.com/1200x/1b/56/3e/1b563e7d910ef8392bf358006f55194e.jpg',
    images: [
      'https://i.pinimg.com/1200x/1b/56/3e/1b563e7d910ef8392bf358006f55194e.jpg',
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
    image: 'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg',
    images: [
      'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg',
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
];

export const categories = [
  { id: 'all', name: 'Tous les produits' },
  { id: 'souris', name: 'Souris' },
  { id: 'claviers', name: 'Claviers' },
  { id: 'audio', name: 'Audio' },
  { id: 'tablettes', name: 'Tablettes' },
  { id: 'ecrans', name: 'Écrans' },
];

export const categoryIdMap: Record<string, string> = {
  'souris': 'Souris',
  'claviers': 'Claviers',
  'audio': 'Audio',
  'tablettes': 'Tablettes',
  'ecrans': 'Écrans',
};

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
