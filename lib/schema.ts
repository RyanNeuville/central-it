export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NEXUS',
  url: 'https://nexus-collective.com',
  logo: 'https://nexus-collective.com/logo.svg',
  sameAs: [
    'https://www.instagram.com/nexus-collective',
    'https://www.twitter.com/nexus-collective',
    'https://www.facebook.com/nexus-collective',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'support@nexus-collective.com',
    telephone: '+1-555-123-4567',
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
    url: `https://nexus-collective.com/product/${product.id}`,
    priceCurrency: 'USD',
    price: product.price,
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: product.rating,
    reviewCount: product.reviews,
  },
});
