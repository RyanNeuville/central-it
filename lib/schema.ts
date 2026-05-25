export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'G-Shop',
  url: 'https://g-shop.com',
  logo: 'https://g-shop.com/logo.svg',
  sameAs: [
    'https://www.instagram.com/g-shop',
    'https://www.twitter.com/g-shop',
    'https://www.facebook.com/g-shop',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Service Client',
    email: 'support@g-shop.com',
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
    url: `https://g-shop.com/product/${product.id}`,
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
