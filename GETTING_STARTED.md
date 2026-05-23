# NEXUS - Getting Started Guide

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run typecheck
```

## File Structure

```
nexus-ecommerce/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── globals.css                # Global styles
│   ├── shop/page.tsx              # Shop page
│   ├── product/[id]/page.tsx      # Product detail
│   ├── about/page.tsx             # About page
│   ├── contact/page.tsx           # Contact page
│   ├── support/page.tsx           # Support page
│   └── not-found.tsx              # 404 page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── ProductCard.tsx
│       ├── FeaturedProducts.tsx
│       ├── Newsletter.tsx
│       └── StatsSection.tsx
│
├── lib/
│   ├── products.ts                # Product data
│   ├── schema.ts                  # SEO schemas
│   └── utils.ts                   # Helper functions
│
├── public/                        # Static assets
├── tailwind.config.ts             # Tailwind config
├── tsconfig.json                  # TypeScript config
├── next.config.js                 # Next.js config
├── README.md                      # Project overview
├── ARCHITECTURE.md                # Design system
└── package.json
```

## Key Features

### Navigation
- Sticky navbar with scroll effects
- Mobile-responsive menu
- Quick access to wishlist and cart

### Product Display
- 12 curated products
- 8 categories
- Star ratings and reviews
- Image galleries

### Filtering & Sorting
- Real-time category filtering
- Price range filters
- Sort options (newest, price, rating)

### Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Showcase new & bestselling products |
| Shop | `/shop` | Full catalog with filters |
| Product | `/product/[id]` | Detailed view with gallery |
| About | `/about` | Brand story and team |
| Support | `/support` | FAQs and customer services |
| Contact | `/contact` | Contact form and info |
| 404 | `/not-found` | Error page |

## Customization

### Change Brand Name
Edit in:
- `app/layout.tsx` - metadata title
- `components/layout/Navbar.tsx` - logo text
- `components/layout/Footer.tsx` - brand name

### Update Products
Edit `lib/products.ts`:
```typescript
export const products: Product[] = [
  {
    id: '1',
    name: 'Your Product',
    price: 99,
    // ... other fields
  }
];
```

### Customize Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  background: '#FAFAF9',  // Main background
  foreground: '#1A1A1A',  // Main text
  primary: '#1A1A1A',     // Primary color
  // ... others
}
```

### Add New Pages
1. Create folder in `/app` (e.g., `/app/blog`)
2. Create `page.tsx` inside
3. Add route to navbar

## Development Tips

### Using Framer Motion
All animations use:
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### Responsive Classes
- `md:` - 768px breakpoint
- `lg:` - 1024px breakpoint
- `xl:` - 1280px breakpoint

### Adding Components
Create reusable components in `/components`:
```tsx
export function ComponentName() {
  return <div>Component</div>;
}
```

## Performance

### Image Optimization
- Uses external Pexels images (CDN-served)
- Automatically optimized by browser
- Lazy loading via viewport detection

### Bundle Size
- Next.js: Automatic code splitting
- TailwindCSS: Tree-shaking of unused utilities
- Build output: ~160KB gzipped

## Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`

### Self-Host
```bash
npm run build
npm start
```

## Troubleshooting

### TypeScript Errors
```bash
npm run typecheck
```

### Build Issues
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Testing

### Manual Testing Checklist
- [ ] Navigation links work
- [ ] Product filtering works
- [ ] Forms validate correctly
- [ ] Responsive design on mobile (375px)
- [ ] Responsive design on tablet (768px)
- [ ] Responsive design on desktop (1920px)
- [ ] All images load
- [ ] Animations are smooth
- [ ] No console errors

## Next Steps

### To Add E-Commerce Functionality:
1. Set up database (Supabase, Firebase, etc.)
2. Add authentication
3. Implement shopping cart
4. Set up payment processing (Stripe, PayPal)
5. Add order management

### To Enhance:
1. Add search functionality
2. Implement user accounts
3. Add product reviews
4. Set up email notifications
5. Create admin dashboard

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org)

## Performance Metrics

Target metrics:
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 95+
- Lighthouse SEO: 95+

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

**Last Updated**: 2025-05-23
**Status**: Ready for Development
