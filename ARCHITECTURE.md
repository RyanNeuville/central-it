# NEXUS Architecture & Design System

## Project Structure Overview

### `/app` - Next.js App Router
- **Root Files**: `layout.tsx`, `page.tsx`, `globals.css`
- **Nested Routes**: Organized by feature (shop, product, about, contact, support)
- **Dynamic Routes**: Product details use `[id]` parameter
- **Error Pages**: `not-found.tsx` for 404 handling

### `/components` - React Components
- **Layout**: Navbar and Footer - persistent across all pages
- **Sections**: Reusable page sections (Hero, ProductCard, FeaturedProducts, Newsletter, StatsSection)
- **UI**: shadcn/ui components (imported as needed)

### `/lib` - Utilities & Data
- `products.ts` - Product data, categories, testimonials
- `schema.ts` - Structured data for SEO
- `utils.ts` - Helper functions

### `/public` - Static Assets
- Favicon, robots.txt, sitemap configuration

## Design System

### Color Palette

| Role | Color | Usage |
|------|-------|-------|
| Primary | #1A1A1A (Black) | Headers, CTAs, text hierarchy |
| Background | #FAFAF9 (Off-white) | Page backgrounds |
| Secondary | #8B8B8B (Gray) | Supporting text |
| Accent | #000000 (Pure Black) | Emphasis |
| Muted | #E8E8E8 (Light Gray) | Borders, dividers |

### Typography Scale

```
Display:   7xl (48px)  - Hero headlines
Section:   5xl (48px)  - Section headings
Card:      2xl (24px)  - Card titles
Heading:   lg  (18px)  - Subheadings
Body:      base(16px)  - Body text
Small:     sm  (14px)  - Captions
```

Font: Inter (400, 500, 600, 700 weights)
Line Heights: 150% for body, 120% for headings

### Spacing System (8px Grid)

```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 40px
3xl: 48px
4xl: 64px
```

### Border Radius

```
xs: 4px    - Subtle
sm: 6px    - Inputs
md: 8px    - Cards
lg: 12px   - Buttons
xl: 16px   - Large elements
```

### Shadow System

```
sm:      Light elevation
md:      Standard cards
lg:      Hover effects
xl:      Prominent elements
premium: Premium cards (20px, 40px blur)
```

## Component Architecture

### Page Templates

Each page follows a consistent pattern:
```tsx
export default function PageName() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Page-specific content */}
      <Footer />
    </div>
  );
}
```

### Product Card Component

- Responsive image with hover effects
- Rating and review count display
- Wishlist toggle with visual feedback
- Price and quick-add button
- Badge support for promotions

### Section Components

- `Hero`: Full-screen background with overlay, CTA buttons
- `FeaturedProducts`: Grid with animated product cards
- `Newsletter`: Email subscription with validation
- `StatsSection`: Statistics showcase with counters

## Animation Strategy

### Framer Motion Usage

**Entrance Animations:**
- `initial={{ opacity: 0, y: 20 }}` - Fade in from below
- `whileInView={{ opacity: 1, y: 0 }}` - Trigger on viewport
- `viewport={{ once: true }}` - Only animate once

**Interaction Animations:**
- `whileHover={{ scale: 1.05 }}` - Subtle scale on hover
- `whileTap={{ scale: 0.95 }}` - Press feedback
- Staggered delays for list items

**Key Principles:**
- Duration: 0.3s - 0.8s (fast but not jarring)
- Easing: Default ease-out for natural feel
- No animation lasts longer than 1 second
- Animations enhance, never distract

## Data Management

### Product Data (`lib/products.ts`)

```typescript
interface Product {
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
```

- 12 products across 8 categories
- Real images from Pexels
- Realistic pricing and ratings
- Detailed specifications

### State Management

- React hooks for local component state
- No global state manager needed (data-driven)
- Form state with React Hook Form
- Wishlist state maintained per session

## Responsive Breakpoints

```
Mobile:   < 640px  - 1 column, full-width
Tablet:   640px+   - 2 columns, adjusted spacing
Desktop:  1024px+  - 3+ columns, expanded layout
Large:    1280px+  - Full featured layout
```

### Responsive Considerations

- Touch-friendly tap targets (min 44x44px)
- Mobile-first CSS approach
- Collapsible navigation on mobile
- Stacked forms on mobile
- Images optimized per viewport

## Accessibility Features

- Semantic HTML structure
- ARIA labels on buttons and icons
- Color contrast ratios > 4.5:1
- Keyboard navigation support
- Focus states visible on all interactive elements
- Form labels properly associated with inputs

## Performance Optimizations

### Image Optimization

- External images from Pexels (CDN-served)
- No local images for faster builds
- Alt text on all images
- Lazy loading via viewport detection

### Code Splitting

- Dynamic imports for heavy components
- Route-based code splitting (automatic with Next.js)
- Tree-shaking of unused utilities

### Bundle Size

- TailwindCSS: ~60KB (with purging)
- Framer Motion: ~40KB
- React + React DOM: ~40KB
- Other libraries: ~20KB
- **Total**: ~160KB gzipped

## SEO Strategy

- Meta tags in layout.tsx
- Structured data (schema.org)
- Semantic HTML
- Mobile-responsive design
- Fast page load times
- Accessible navigation

## Security Considerations

- No sensitive data in frontend
- Form validation on client and server (future)
- Content Security Policy (optional)
- HTTPS enforcement (production)
- No hardcoded credentials

## Future Enhancements

### E-commerce Features
- Shopping cart state management
- Checkout process
- Payment integration
- Order history

### User Features
- Authentication system
- User profiles
- Saved addresses
- Order tracking

### Admin Features
- Product management
- Inventory tracking
- Order management
- Analytics dashboard

### Performance
- Service Worker for PWA
- Offline support
- Advanced image optimization
- API caching strategies

## Deployment

### Recommended Platforms
- Vercel (Native Next.js support)
- Netlify (Next.js support)
- Self-hosted on Node.js

### Environment Variables
- `NEXT_PUBLIC_SITE_URL` - Base URL for OG tags
- Optional: Analytics, CDN, API URLs

### Build Process
```bash
npm install
npm run build
npm start
```

## Code Quality Standards

### TypeScript
- Strict mode enabled
- No `any` types without justification
- Proper interface definitions

### Naming Conventions
- Components: PascalCase (ProductCard)
- Functions: camelCase (getProductList)
- Constants: UPPER_SNAKE_CASE (API_KEY)
- CSS Classes: kebab-case (product-card)

### File Organization
- One component per file
- Related utilities grouped together
- Clear import paths using @ alias
- Consistent file structure

## Documentation

- README.md: Project overview
- ARCHITECTURE.md: This file
- Inline code comments: For complex logic only
- Component props: TypeScript interfaces for self-documentation

---

**Last Updated**: 2025
**Status**: Production Ready
