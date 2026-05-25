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
    name: 'Switch Géré 48 Ports - ProLink 48G',
    price: 849,
    category: 'Réseau',
    image: 'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg',
    images: [
      'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg',
      'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
    ],
    description: 'Switch réseau géré professionnel 48 ports Gigabit avec 4 ports SFP uplink. Idéal pour les infrastructures d\'entreprise exigeant fiabilité et performance maximale.',
    rating: 4.8,
    reviews: 214,
    badge: 'Nouveauté',
    isNew: true,
    specs: {
      'Ports': '48x RJ45 + 4x SFP',
      'Débit': '10/100/1000 Mbps',
      'VLAN': 'IEEE 802.1Q',
      'Gestion': 'Web / CLI / SNMP',
    },
  },
  {
    id: '2',
    name: 'Routeur Firewall UTM - SecureEdge Pro',
    price: 1290,
    category: 'Réseau',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    images: [
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg',
    ],
    description: 'Routeur firewall UTM nouvelle génération avec inspection profonde des paquets, VPN intégré et protection contre les menaces avancées. Conçu pour les environnements professionnels.',
    rating: 4.9,
    reviews: 187,
    isBestseller: true,
    specs: {
      'Débit Firewall': '5 Gbps',
      'VPN': 'IPsec / SSL',
      'Interfaces': '8x GbE + 2x SFP+',
      'IPS/IDS': 'Intégré',
    },
  },
  {
    id: '3',
    name: 'Serveur Rack 2U - PowerNode 2240',
    price: 3499,
    category: 'Serveurs',
    image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
    images: [
      'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
      'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
    ],
    description: 'Serveur rack 2U double processeur haute performance. Parfait pour la virtualisation, les bases de données et les applications critiques d\'entreprise.',
    rating: 4.9,
    reviews: 98,
    isBestseller: true,
    specs: {
      'CPU': '2x Intel Xeon Silver 4310',
      'RAM': '64 Go DDR4 ECC',
      'Stockage': '2x 960 Go SSD NVMe',
      'Réseau': '2x 10GbE',
    },
  },
  {
    id: '4',
    name: 'NAS 8 Baies - DataVault 800',
    price: 1150,
    category: 'Stockage',
    image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg',
    images: [
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg',
      'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
    ],
    description: 'Solution NAS 8 baies professionnelle pour la sauvegarde, le partage de fichiers et la surveillance. Compatible RAID 0/1/5/6/10. Accès distant sécurisé intégré.',
    rating: 4.7,
    reviews: 312,
    specs: {
      'Baies': '8x 3.5" SATA',
      'CPU': 'Quad-Core 2.0 GHz',
      'RAM': '8 Go DDR4',
      'Réseau': '2x 2.5GbE',
    },
  },
  {
    id: '5',
    name: 'Station de Travail - DevStation Pro X',
    price: 2299,
    category: 'Workstations',
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
    images: [
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    ],
    description: 'Station de travail haute performance pour développeurs, data scientists et ingénieurs. Compilation ultra-rapide, virtualisation native et mémoire extensible jusqu\'à 128 Go.',
    rating: 4.9,
    reviews: 143,
    badge: 'Top Dev',
    isNew: true,
    specs: {
      'CPU': 'AMD Ryzen 9 7950X',
      'RAM': '64 Go DDR5 6000 MHz',
      'GPU': 'NVIDIA RTX 4070',
      'SSD': '2 To NVMe Gen4',
    },
  },
  {
    id: '6',
    name: 'Câbles RJ45 Cat6A - Pack Pro 50',
    price: 89,
    category: 'Câblage',
    image: 'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg',
    images: [
      'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg',
    ],
    description: 'Pack de 50 câbles RJ45 Cat6A blindés (STP) pour installations réseau professionnelles. Prise en charge de la PoE++ et des débits jusqu\'à 10 Gbps sur 100 m.',
    rating: 4.6,
    reviews: 521,
    specs: {
      'Catégorie': 'Cat6A STP',
      'Débit': 'Jusqu\'à 10 Gbps',
      'Longueur': '1m / 2m / 5m / 10m',
      'Quantité': '50 câbles',
    },
  },
  {
    id: '7',
    name: 'KVM Switch 8 Ports - MultiDesk 8P',
    price: 349,
    category: 'Périphériques',
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
    images: [
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
    ],
    description: 'Switch KVM 8 ports HDMI + USB pour gérer jusqu\'à 8 serveurs ou postes depuis un seul écran, clavier et souris. Commutation instantanée par touche ou raccourci clavier.',
    rating: 4.7,
    reviews: 278,
    specs: {
      'Ports': '8x HDMI + USB',
      'Résolution': 'Jusqu\'à 4K@60Hz',
      'Commutation': 'Hotkey / Bouton frontal',
      'Audio': 'Stéréo intégré',
    },
  },
  {
    id: '8',
    name: 'UPS Onduleur 3000VA - PowerSafe 3K',
    price: 499,
    category: 'Alimentation',
    image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
    images: [
      'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
    ],
    description: 'Onduleur professionnel 3000VA / 2700W ligne-interactive pour protéger serveurs, NAS et équipements réseau. Gestion réseau SNMP et arrêt automatique inclus.',
    rating: 4.8,
    reviews: 196,
    isBestseller: true,
    specs: {
      'Puissance': '3000VA / 2700W',
      'Technologie': 'Ligne-interactive',
      'Autonomie': '8 min à pleine charge',
      'Gestion': 'SNMP / USB',
    },
  },
  {
    id: '9',
    name: 'Point d\'Accès Wi-Fi 6E - AirNode 6E',
    price: 389,
    category: 'Réseau',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    images: [
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    ],
    description: 'Point d\'accès Wi-Fi 6E tri-bande (2.4 / 5 / 6 GHz) jusqu\'à 7.8 Gbps agrégé. Support de 500 clients simultanés, PoE+ et gestion centralisée cloud.',
    rating: 4.8,
    reviews: 167,
    specs: {
      'Standard': 'Wi-Fi 6E (802.11ax)',
      'Débit': 'Jusqu\'à 7.8 Gbps',
      'Clients': '500+ simultanés',
      'Alimentation': 'PoE+ (802.3at)',
    },
  },
  {
    id: '10',
    name: 'Rack Baie 12U - RackPro 12U 600',
    price: 275,
    category: 'Infrastructure',
    image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
    images: [
      'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
    ],
    description: 'Baie rack 12U ouverte, profondeur 600 mm, avec panneau de brassage intégré et kit de montage. Idéale pour les petites salles serveurs et les datacenters de proximité.',
    rating: 4.6,
    reviews: 234,
    specs: {
      'Taille': '12U',
      'Profondeur': '600 mm',
      'Charge max': '80 kg',
      'Livré': 'Panneau de brassage inclus',
    },
  },
  {
    id: '11',
    name: 'SSD NVMe Enterprise 4 To - UltraStore E4',
    price: 699,
    category: 'Stockage',
    image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg',
    images: [
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg',
    ],
    description: 'SSD NVMe PCIe Gen4 de classe enterprise, 4 To. Conçu pour les charges de travail intensives avec une endurance maximale (3 DWPD), cryptage AES-256 et faible latence garantie.',
    rating: 4.9,
    reviews: 89,
    badge: 'Enterprise',
    specs: {
      'Interface': 'NVMe PCIe Gen4 x4',
      'Capacité': '4 To',
      'Lecture séq.': '7200 Mo/s',
      'Endurance': '3 DWPD',
    },
  },
  {
    id: '12',
    name: 'Kit Fibre Optique LC-LC - Pack 10',
    price: 149,
    category: 'Câblage',
    image: 'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg',
    images: [
      'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg',
    ],
    description: 'Pack de 10 câbles fibre optique LC-LC duplex monomode OS2, 10 m. Perte d\'insertion ≤ 0.3 dB. Gaine LSZH. Parfait pour les liaisons inter-baies et les connexions SFP+.',
    rating: 4.9,
    reviews: 403,
    isBestseller: true,
    specs: {
      'Type': 'OS2 Monomode',
      'Connecteurs': 'LC/UPC Duplex',
      'Longueur': '10 m',
      'Quantité': '10 câbles',
    },
  },
];

export const categories = [
  { id: 'all', name: 'Tous les produits' },
  { id: 'reseau', name: 'Réseau' },
  { id: 'serveurs', name: 'Serveurs' },
  { id: 'stockage', name: 'Stockage' },
  { id: 'workstations', name: 'Workstations' },
  { id: 'cablage', name: 'Câblage' },
  { id: 'peripheriques', name: 'Périphériques' },
  { id: 'alimentation', name: 'Alimentation' },
  { id: 'infrastructure', name: 'Infrastructure' },
];

export const categoryIdMap: Record<string, string> = {
  'reseau': 'Réseau',
  'serveurs': 'Serveurs',
  'stockage': 'Stockage',
  'workstations': 'Workstations',
  'cablage': 'Câblage',
  'peripheriques': 'Périphériques',
  'alimentation': 'Alimentation',
  'infrastructure': 'Infrastructure',
};

export const testimonials = [
  {
    id: '1',
    author: 'Thomas L.',
    role: 'Responsable Infrastructure IT',
    content: 'Central IT est devenu notre fournisseur de référence pour tout notre matériel réseau. Les délais et la qualité sont impeccables.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  },
  {
    id: '2',
    author: 'Sophie M.',
    role: 'Développeuse Full-Stack',
    content: 'Ma station de travail DevStation Pro X a transformé mon flux de travail. Compilation 3x plus rapide, je ne reviendrais jamais en arrière.',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
  },
  {
    id: '3',
    author: 'Karim B.',
    role: 'Ingénieur Réseau',
    content: 'Le support technique de Central IT est exceptionnel. Ils comprennent nos besoins techniques et proposent toujours la bonne solution.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
  },
];
