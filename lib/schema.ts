export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Central IT',
  url: 'https://central-it.com',
  logo: 'https://central-it.com/logo.svg',
  sameAs: [
    'https://www.instagram.com/central-it',
    'https://www.twitter.com/central-it',
    'https://www.facebook.com/central-it',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Service Client',
    email: 'support@central-it.com',
    telephone: '+33 1 23 45 67 89',
  },
};

export const productSchema = (product: {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
}) => ({
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: product.name,
  image: product.image,
  description: product.description,
  sku: product.id,
  offers: {
    '@type': 'Offer',
    url: `https://central-it.com/product/${product.id}`,
    priceCurrency: 'EUR',
    price: product.price,
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: product.rating,
    reviewCount: product.reviews,
  },
});
