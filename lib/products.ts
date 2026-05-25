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
    name: 'Stellar Air High - Obsidienne',
    price: 189,
    category: 'Montantes',
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
    images: [
      'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
      'https://images.pexels.com/photos/3987014/pexels-photo-3987014.jpeg',
    ],
    description: 'Silhouette montante emblématique avec cuir de première qualité et technologie de confort de pointe. Une pièce intemporelle pour le collectionneur moderne.',
    rating: 4.8,
    reviews: 342,
    badge: 'Nouveauté',
    isNew: true,
    specs: {
      'Matériau': 'Cuir Premium',
      'Technologie': 'Coussin d\'Air',
      'Sortie': '2025',
    },
  },
  {
    id: '2',
    name: 'UrbanFlow Low - Titane',
    price: 145,
    category: 'Basses',
    image: 'https://images.pexels.com/photos/3945681/pexels-photo-3945681.jpeg',
    images: [
      'https://images.pexels.com/photos/3945681/pexels-photo-3945681.jpeg',
      'https://images.pexels.com/photos/3987012/pexels-photo-3987012.jpeg',
    ],
    description: 'Modèle bas épuré et minimaliste offrant un confort sans compromis. Parfait pour une sophistication au quotidien.',
    rating: 4.7,
    reviews: 521,
    isBestseller: true,
    specs: {
      'Matériau': 'Mesh & Suède',
      'Technologie': 'Mousse Réactive',
      'Coloris': '3 Disponibles',
    },
  },
  {
    id: '3',
    name: 'PropelForce Mid - Perle',
    price: 165,
    category: 'Semi-montantes',
    image: 'https://images.pexels.com/photos/3349900/pexels-photo-3349900.jpeg',
    images: [
      'https://images.pexels.com/photos/3349900/pexels-photo-3349900.jpeg',
      'https://images.pexels.com/photos/3945682/pexels-photo-3945682.jpeg',
    ],
    description: 'Modèle semi-montant audacieux doté d\'une technologie de semelle intermédiaire innovante. Conçu pour la performance et le style.',
    rating: 4.9,
    reviews: 287,
    isBestseller: true,
    specs: {
      'Matériau': 'Tissu Boost',
      'Technologie': 'Système de Propulsion',
      'Édition': 'Limitée',
    },
  },
  {
    id: '4',
    name: 'ZenWalk Classic - Crème',
    price: 129,
    category: 'Décontracté',
    image: 'https://images.pexels.com/photos/3726210/pexels-photo-3726210.jpeg',
    images: [
      'https://images.pexels.com/photos/3726210/pexels-photo-3726210.jpeg',
      'https://images.pexels.com/photos/3945680/pexels-photo-3945680.jpeg',
    ],
    description: 'Un essentiel quotidien polyvalent avec un confort haut de gamme. La basket qui sait tout faire.',
    rating: 4.6,
    reviews: 689,
    specs: {
      'Matériau': 'Toile & Cuir',
      'Technologie': 'Semelle Intérieure Amortie',
      'Pointure': 'Taille Normale',
    },
  },
  {
    id: '5',
    name: 'VelocityMax Pro - Onyx',
    price: 199,
    category: 'Performance',
    image: 'https://images.pexels.com/photos/3926883/pexels-photo-3926883.jpeg',
    images: [
      'https://images.pexels.com/photos/3926883/pexels-photo-3926883.jpeg',
      'https://images.pexels.com/photos/3945685/pexels-photo-3945685.jpeg',
    ],
    description: 'Basket de performance de qualité professionnelle. Conçue pour les athlètes qui exigent l\'excellence.',
    rating: 4.9,
    reviews: 156,
    badge: 'Série Pro',
    isNew: true,
    specs: {
      'Matériau': 'Mesh en Fibre de Carbone',
      'Technologie': 'Ultra Boost 3.0',
      'Poids': '285g',
    },
  },
  {
    id: '6',
    name: 'Casquette StreetStyle - Anthracite',
    price: 35,
    category: 'Accessoires',
    image: 'https://images.pexels.com/photos/3099527/pexels-photo-3099527.jpeg',
    images: [
      'https://images.pexels.com/photos/3099527/pexels-photo-3099527.jpeg',
    ],
    description: 'Casquette premium à 6 panneaux en coton respirant. Complétez votre collection G-Shop.',
    rating: 4.5,
    reviews: 203,
    specs: {
      'Matériau': '100% Coton',
      'Taille': 'Taille Unique',
      'Coloris': '5 Disponibles',
    },
  },
  {
    id: '7',
    name: 'Sweat à capuche IconicLace - Noir',
    price: 89,
    category: 'Vêtements',
    image: 'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg',
    images: [
      'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg',
    ],
    description: 'Sweat à capuche confortable et minimaliste en tissu premium. Conçu pour l\'élégance de tous les jours.',
    rating: 4.7,
    reviews: 425,
    specs: {
      'Matériau': 'Mélange de Coton Biologique',
      'Coupe': 'Oversize',
      'Tailles': 'XS - 3XL',
    },
  },
  {
    id: '8',
    name: 'Sac EliteGrip - Ardoise',
    price: 125,
    category: 'Accessoires',
    image: 'https://images.pexels.com/photos/3945619/pexels-photo-3945619.jpeg',
    images: [
      'https://images.pexels.com/photos/3945619/pexels-photo-3945619.jpeg',
    ],
    description: 'Sac bandoulière professionnel au design ergonomique. Parfait pour le style de vie moderne.',
    rating: 4.8,
    reviews: 312,
    isBestseller: true,
    specs: {
      'Matériau': 'Nylon Balistique',
      'Capacité': '15L',
      'Compartiments': '5',
    },
  },
  {
    id: '9',
    name: 'PrimeStride Running - Bleu Marine',
    price: 155,
    category: 'Performance',
    image: 'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg',
    images: [
      'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg',
    ],
    description: 'Conçu pour les coureurs qui apprécient les détails soignés. La vitesse rencontre la sophistication.',
    rating: 4.7,
    reviews: 234,
    specs: {
      'Matériau': 'Mesh Avancé',
      'Technologie': 'Retour d\'Énergie',
      'Drop': '10mm',
    },
  },
  {
    id: '10',
    name: 'MinimalEdge Slip-On - Blanc',
    price: 119,
    category: 'Décontracté',
    image: 'https://images.pexels.com/photos/3824574/pexels-photo-3824574.jpeg',
    images: [
      'https://images.pexels.com/photos/3824574/pexels-photo-3824574.jpeg',
    ],
    description: 'Élégance sans effort. La chaussure sans lacets conçue pour ceux qui apprécient la simplicité.',
    rating: 4.6,
    reviews: 456,
    specs: {
      'Matériau': 'Toile Premium',
      'Coupe': 'Ajustée',
      'Coloris': '6 Disponibles',
    },
  },
  {
    id: '11',
    name: 'VintageVibe Retro - Rouille',
    price: 135,
    category: 'Montantes',
    image: 'https://images.pexels.com/photos/3822847/pexels-photo-3822847.jpeg',
    images: [
      'https://images.pexels.com/photos/3822847/pexels-photo-3822847.jpeg',
    ],
    description: 'Le design nostalgique rencontre le savoir-faire moderne. Une silhouette intemporelle réinventée.',
    rating: 4.8,
    reviews: 378,
    badge: 'Héritage',
    specs: {
      'Matériau': 'Suède Vintage',
      'Style': 'Inspiration Rétro',
      'Limité': 'Oui',
    },
  },
  {
    id: '12',
    name: 'Chaussettes LuxurySocks Triple - Multicolore',
    price: 32,
    category: 'Accessoires',
    image: 'https://images.pexels.com/photos/3962272/pexels-photo-3962272.jpeg',
    images: [
      'https://images.pexels.com/photos/3962272/pexels-photo-3962272.jpeg',
    ],
    description: 'Chaussettes confort premium conçues pour les passionnés de baskets. Lot de 3 paires.',
    rating: 4.9,
    reviews: 512,
    isBestseller: true,
    specs: {
      'Matériau': 'Mélange de Laine Mérinos',
      'Quantité': '3 Paires',
      'Tailles': 'Taille Unique',
    },
  },
];

export const categories = [
  { id: 'all', name: 'Tous les produits' },
  { id: 'high-tops', name: 'Montantes' },
  { id: 'low-tops', name: 'Basses' },
  { id: 'mid-tops', name: 'Semi-montantes' },
  { id: 'casual', name: 'Décontracté' },
  { id: 'performance', name: 'Performance' },
  { id: 'apparel', name: 'Vêtements' },
  { id: 'accessories', name: 'Accessoires' },
];

export const categoryIdMap: Record<string, string> = {
  'high-tops': 'Montantes',
  'low-tops': 'Basses',
  'mid-tops': 'Semi-montantes',
  'casual': 'Décontracté',
  'performance': 'Performance',
  'apparel': 'Vêtements',
  'accessories': 'Accessoires',
};

export const testimonials = [
  {
    id: '1',
    author: 'Marcus J.',
    role: 'Collectionneur de Baskets',
    content: 'G-Shop a complètement changé ma façon d\'acheter des baskets premium. La sélection est impeccable.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  },
  {
    id: '2',
    author: 'Elena R.',
    role: 'Blogueuse Mode & Style',
    content: 'La qualité et l\'attention portée aux détails sont inégalées. Chaque produit raconte une histoire.',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
  },
  {
    id: '3',
    author: 'David K.',
    role: 'Athlète',
    content: 'La performance rencontre le style. G-Shop comprend vraiment nos besoins.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
  },
];
