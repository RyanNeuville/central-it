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
    name: 'Stellar Air High - Obsidian',
    price: 189,
    category: 'High Tops',
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
    images: [
      'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
      'https://images.pexels.com/photos/3987014/pexels-photo-3987014.jpeg',
    ],
    description: 'Iconic high-top silhouette with premium leather and cutting-edge comfort technology. A timeless piece for the modern collector.',
    rating: 4.8,
    reviews: 342,
    badge: 'New Arrival',
    isNew: true,
    specs: {
      Material: 'Premium Leather',
      Technology: 'Air Cushion',
      Release: '2025',
    },
  },
  {
    id: '2',
    name: 'UrbanFlow Low - Titanium',
    price: 145,
    category: 'Low Tops',
    image: 'https://images.pexels.com/photos/3945681/pexels-photo-3945681.jpeg',
    images: [
      'https://images.pexels.com/photos/3945681/pexels-photo-3945681.jpeg',
      'https://images.pexels.com/photos/3987012/pexels-photo-3987012.jpeg',
    ],
    description: 'Sleek minimalist low-top with uncompromising comfort. Perfect for everyday sophistication.',
    rating: 4.7,
    reviews: 521,
    isBestseller: true,
    specs: {
      Material: 'Mesh & Suede',
      Technology: 'Responsive Foam',
      Colorway: '3 Available',
    },
  },
  {
    id: '3',
    name: 'PropelForce Mid - Pearl',
    price: 165,
    category: 'Mid Tops',
    image: 'https://images.pexels.com/photos/3349900/pexels-photo-3349900.jpeg',
    images: [
      'https://images.pexels.com/photos/3349900/pexels-photo-3349900.jpeg',
      'https://images.pexels.com/photos/3945682/pexels-photo-3945682.jpeg',
    ],
    description: 'Statement mid-top with innovative midsole technology. Engineered for performance and style.',
    rating: 4.9,
    reviews: 287,
    isBestseller: true,
    specs: {
      Material: 'Boost Fabric',
      Technology: 'Propel System',
      Release: 'Limited',
    },
  },
  {
    id: '4',
    name: 'ZenWalk Classic - Cream',
    price: 129,
    category: 'Casual',
    image: 'https://images.pexels.com/photos/3726210/pexels-photo-3726210.jpeg',
    images: [
      'https://images.pexels.com/photos/3726210/pexels-photo-3726210.jpeg',
      'https://images.pexels.com/photos/3945680/pexels-photo-3945680.jpeg',
    ],
    description: 'Versatile daily essential with premium comfort. The sneaker that does it all.',
    rating: 4.6,
    reviews: 689,
    specs: {
      Material: 'Canvas & Leather',
      Technology: 'Cushioned Insole',
      Sizing: 'True to Size',
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
    description: 'Professional-grade performance sneaker. Built for athletes who demand excellence.',
    rating: 4.9,
    reviews: 156,
    badge: 'Pro Series',
    isNew: true,
    specs: {
      Material: 'Carbon Fiber Mesh',
      Technology: 'Ultra Boost 3.0',
      Weight: '285g',
    },
  },
  {
    id: '6',
    name: 'StreetStyle Cap - Charcoal',
    price: 35,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/3099527/pexels-photo-3099527.jpeg',
    images: [
      'https://images.pexels.com/photos/3099527/pexels-photo-3099527.jpeg',
    ],
    description: 'Premium 6-panel cap in breathable cotton. Complete your NEXUS collection.',
    rating: 4.5,
    reviews: 203,
    specs: {
      Material: '100% Cotton',
      Size: 'One Size Fits All',
      Color: '5 Available',
    },
  },
  {
    id: '7',
    name: 'IconicLace Hoodie - Black',
    price: 89,
    category: 'Apparel',
    image: 'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg',
    images: [
      'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg',
    ],
    description: 'Minimalist comfort hoodie with premium fabric. Designed for everyday elegance.',
    rating: 4.7,
    reviews: 425,
    specs: {
      Material: 'Organic Cotton Blend',
      Fit: 'Oversized',
      Sizes: 'XS - 3XL',
    },
  },
  {
    id: '8',
    name: 'EliteGrip Bag - Slate',
    price: 125,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/3945619/pexels-photo-3945619.jpeg',
    images: [
      'https://images.pexels.com/photos/3945619/pexels-photo-3945619.jpeg',
    ],
    description: 'Professional crossbody bag with ergonomic design. Perfect for the modern lifestyle.',
    rating: 4.8,
    reviews: 312,
    isBestseller: true,
    specs: {
      Material: 'Ballistic Nylon',
      Capacity: '15L',
      Compartments: '5',
    },
  },
  {
    id: '9',
    name: 'PrimeStride Running - Navy',
    price: 155,
    category: 'Performance',
    image: 'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg',
    images: [
      'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg',
    ],
    description: 'Engineered for runners who appreciate the finer details. Speed meets sophistication.',
    rating: 4.7,
    reviews: 234,
    specs: {
      Material: 'Advanced Mesh',
      Technology: 'Energy Return',
      Drop: '10mm',
    },
  },
  {
    id: '10',
    name: 'MinimalEdge Slip-On - White',
    price: 119,
    category: 'Casual',
    image: 'https://images.pexels.com/photos/3824574/pexels-photo-3824574.jpeg',
    images: [
      'https://images.pexels.com/photos/3824574/pexels-photo-3824574.jpeg',
    ],
    description: 'Effortless elegance. The slip-on designed for those who value simplicity.',
    rating: 4.6,
    reviews: 456,
    specs: {
      Material: 'Premium Canvas',
      Fit: 'Snug',
      Colors: '6 Available',
    },
  },
  {
    id: '11',
    name: 'VintageVibe Retro - Rust',
    price: 135,
    category: 'High Tops',
    image: 'https://images.pexels.com/photos/3822847/pexels-photo-3822847.jpeg',
    images: [
      'https://images.pexels.com/photos/3822847/pexels-photo-3822847.jpeg',
    ],
    description: 'Nostalgic design meets modern craftsmanship. A timeless silhouette reimagined.',
    rating: 4.8,
    reviews: 378,
    badge: 'Heritage',
    specs: {
      Material: 'Vintage Suede',
      Style: 'Retro Inspired',
      Limited: 'Yes',
    },
  },
  {
    id: '12',
    name: 'LuxurySocks Triple - Multi',
    price: 32,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/3962272/pexels-photo-3962272.jpeg',
    images: [
      'https://images.pexels.com/photos/3962272/pexels-photo-3962272.jpeg',
    ],
    description: 'Premium comfort socks crafted for sneaker enthusiasts. Pack of 3.',
    rating: 4.9,
    reviews: 512,
    isBestseller: true,
    specs: {
      Material: 'Merino Wool Blend',
      Quantity: '3 Pairs',
      Sizes: 'One Size',
    },
  },
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'high-tops', name: 'High Tops' },
  { id: 'low-tops', name: 'Low Tops' },
  { id: 'mid-tops', name: 'Mid Tops' },
  { id: 'casual', name: 'Casual' },
  { id: 'performance', name: 'Performance' },
  { id: 'apparel', name: 'Apparel' },
  { id: 'accessories', name: 'Accessories' },
];

export const testimonials = [
  {
    id: '1',
    author: 'Marcus J.',
    role: 'Sneaker Collector',
    content: 'NEXUS has completely changed how I shop for premium sneakers. The curation is impeccable.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  },
  {
    id: '2',
    author: 'Elena R.',
    role: 'Lifestyle Blogger',
    content: 'The quality and attention to detail is unmatched. Every product tells a story.',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
  },
  {
    id: '3',
    author: 'David K.',
    role: 'Athlete',
    content: 'Performance meets style. NEXUS understands what we really need.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
  },
];
