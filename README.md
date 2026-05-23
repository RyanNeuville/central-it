# NEXUS - Premium Sneaker & Streetwear Collective

A premium e-commerce application showcasing curated sneakers and streetwear. Built with modern technologies to deliver an exceptional user experience.

## Technologies Used

### Core Stack
- **Next.js 15** - React framework for production applications
- **React 18** - UI library with hooks and server components
- **TypeScript** - Type-safe JavaScript development
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth, fluid interactions

### UI & Components
- **shadcn/ui** - High-quality React components built on Radix UI
- **Lucide React** - Beautiful, consistent icon library
- **Radix UI** - Unstyled, accessible component primitives

### Form & State Management
- **React Hook Form** - Efficient form state management
- **Zod** - TypeScript-first schema validation

### Development Tools
- **ESLint** - Code quality and best practices
- **TypeScript** - Static type checking
- **Tailwind CSS Animate** - Animation utilities

## Project Structure

```
/app
  /product/[id]         # Dynamic product pages
  /shop                 # Product catalog with filtering
  /about                # Brand story and team
  /contact              # Contact form and information
  /support              # Customer support and FAQ
  /layout.tsx           # Root layout with metadata
  /page.tsx             # Home page with hero and sections
  /not-found.tsx        # Custom 404 page

/components
  /layout
    - Navbar.tsx        # Sticky navigation with blur effect
    - Footer.tsx        # Multi-column footer with links
  /sections
    - Hero.tsx          # Fullscreen hero section
    - ProductCard.tsx   # Individual product card component
    - FeaturedProducts.tsx # Grid of featured products
    - Newsletter.tsx     # Email subscription form

/lib
  - products.ts         # Product data and constants
  - utils.ts            # Utility functions

/public                 # Static assets

/styles
  - globals.css         # Global styles and Tailwind setup
```

## Design Philosophy

### Premium Minimalism
- Clean, distraction-free interface
- Maximum white space and breathing room
- Intentional use of negative space
- Typography-driven layout hierarchy

### Color Palette
- **Primary**: Black (#1A1A1A) for hierarchy and action
- **Background**: Warm off-white (#FAFAF9) for sophistication
- **Secondary**: Neutral grays for supporting elements
- **Accents**: Strategic use of color for CTAs and highlights

### Typography
- **Display**: Inter Bold for headings (7xl for hero, 5xl for sections)
- **Body**: Inter Regular for content (18px/28px for readability)
- **Maximum 3 font weights**: Bold, Semibold, Regular

### Spacing System
- 8px base unit grid (xs, sm, md, lg, xl, 2xl, 3xl, 4xl)
- Consistent padding/margins throughout
- Breathing room between sections (96-112px vertical spacing)

## Key Features

### Navigation
- Sticky navbar with scroll-triggered blur glass effect
- Responsive mobile menu with smooth animations
- Quick access icons (search, wishlist, cart)

### Product Display
- 12 carefully curated products across 8 categories
- Responsive grid: 1 column (mobile), 2 (tablet), 3+ (desktop)
- Wishlist functionality with visual feedback
- Star ratings with review counts

### Filtering & Sorting
- Real-time category filtering
- Sort by: Newest, Price (low/high), Top Rated
- Persistent filter state during navigation

### Animations
- Framer Motion for smooth, performant animations
- Entrance animations on scroll (fade, slide-up, scale)
- Subtle hover effects on interactive elements
- Staggered animations for list items
- No excessive animations - every motion has purpose

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch-friendly interface on mobile
- Optimized image loading

## Pages

### Home (/)
- Hero section with background image
- New arrivals showcase
- Bestseller products
- Brand values section
- Customer testimonials
- Newsletter subscription
- Footer with links and social media

### Shop (/shop)
- Full product catalog with search
- Category sidebar filters (responsive)
- Price range filtering
- Sort options
- Product cards with ratings
- Wishlist integration

### Product Detail (/product/[id])
- High-resolution image gallery with zoom
- Detailed product specifications
- Star rating and reviews
- Quantity selector
- Add to cart and wishlist buttons
- Related products section

### About (/about)
- Brand story and mission
- Core values (Passion, Excellence, Community)
- By-the-numbers statistics
- Team member profiles with images

### Support (/support)
- Service overview (Shipping, Returns, Payment, Support)
- Comprehensive FAQ with expandable sections
- Key features and guarantees

### Contact (/contact)
- Contact information (email, phone, location)
- Contact form with service selection
- Form validation and success feedback
- Privacy statement

### 404 (/not-found)
- Custom error page with animation
- Links back to home and shop

## Performance Optimizations

- Next.js Image optimization
- Static generation where possible
- Dynamic routes for product pages
- Code splitting by route
- CSS-in-JS with TailwindCSS (no runtime overhead)
- Framer Motion with GPU acceleration
- Lazy loading for images in viewports

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build Production
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run typecheck
```

## Design Inspirations

This project draws inspiration from:
- Apple's minimalist design language
- Linear's clean interface design
- Stripe's premium aesthetic
- Vercel's modern web experience
- Nike's brand sophistication

## Custom Touches

- **Branding**: NEXUS as a premium streetwear collective with authentic curation
- **Product Data**: Realistic 12 products with specifications, ratings, and multiple categories
- **Animations**: Thoughtful Framer Motion animations that enhance UX without distraction
- **Typography**: Carefully chosen hierarchy for visual storytelling
- **Color Consistency**: Strategic use of black, white, and grays for sophistication
- **Spacing**: Professional 8px grid system throughout
- **Interactive States**: Hover effects, loading states, form feedback

## Future Enhancements

- Shopping cart persistence with local storage
- User authentication and account management
- Product review system
- Wishlist persistence
- Search functionality
- Advanced filtering (size, color, brand)
- Product recommendations engine
- Order tracking system
- User reviews and ratings

## License

This project is provided as a demonstration of modern e-commerce development practices.

## Acknowledgments

- Pexels for beautiful stock imagery
- Lucide React for consistent iconography
- shadcn/ui and Radix UI for accessible components
- Framer Motion for smooth animations
- TailwindCSS for utility-first styling

---

**Created with attention to detail and modern design principles.**
