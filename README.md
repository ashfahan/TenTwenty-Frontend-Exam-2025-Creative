# TenTwenty Frontend Exam 2025

A modern, performant web application showcasing agricultural products with smooth animations, responsive design, and accessible user interface.

## Tech Stack

- **Framework:** React 18 with TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with PostCSS
- **Bundling:** Webpack 5
- **Language:** TypeScript with strict type checking
- **Build Tools:** Babel 7, PostCSS

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Primary button component
│   ├── Container.tsx   # Layout container
│   └── Icons.tsx       # SVG icon components
├── containers/         # Feature containers
│   ├── HeroSection.tsx
│   ├── HeroSlide.tsx
│   ├── HeroButton.tsx
│   ├── HeroProgressBar.tsx
│   ├── QualityCarousel.tsx
│   └── QualityProductsSection.tsx
├── hooks/              # Custom React hooks
│   ├── useCarousel.ts
│   ├── useDrag.ts
│   ├── useAnimationProgress.ts
│   └── useIntersectionObserver.ts
├── layout/             # Layout components
│   └── Header.tsx
├── styles/             # Global styles
│   └── global.css
├── constants/          # Application constants
│   ├── heroSlides.ts
│   ├── qualitySlides.ts
│   └── site.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── cn.ts           # Class name utility
├── App.tsx             # Root application component
├── JsonLd.tsx          # Structured data (JSON-LD)
└── index.tsx           # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 16+ or Bun
- npm or Bun package manager

### Installation

```bash
bun install
```

### Development

Start the development server with hot module replacement:

```bash
bun run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
bun run build
```

Output files are generated in the `dist/` directory.

### Verify Build

Run TypeScript type checking and production build:

```bash
bun run build:verify
```

## Key Features

### Responsive Design
- Mobile-first approach with responsive breakpoints
- Optimized layouts for mobile, tablet, and desktop
- Touch-friendly interface with appropriate spacing

### Animations
- GPU-accelerated CSS animations using `transform3d`
- Scroll-triggered animations with IntersectionObserver
- Smooth transitions and micro-interactions
- Respects `prefers-reduced-motion` for accessibility

### Carousel Component
- Custom pointer-based drag interaction
- Smooth card centering and scaling
- Responsive spacing and card dimensions
- Touch and mouse support

### Accessibility
- Semantic HTML5 markup
- ARIA attributes for screen readers
- Proper heading hierarchy
- Color contrast compliance (WCAG AA)
- Keyboard navigation support

### Performance
- Code splitting with vendor bundle separation
- CSS extraction and minification
- JavaScript minification and optimization
- Lazy loading with IntersectionObserver
- Optimized Google Fonts (weights: 400, 600, 700)
- Custom SVG icons instead of icon libraries

## Configuration Files

- **webpack.config.js** - Bundler configuration with code splitting
- **tsconfig.json** - TypeScript compiler options
- **.babelrc** - Babel preset configuration
- **postcss.config.js** - PostCSS plugins configuration

## Bundle Analysis

- **Main Bundle:** ~18.6 KiB (gzipped)
- **Vendor Bundle:** ~212 KiB (React, React DOM, utilities)
- **CSS:** ~32.9 KiB (Tailwind + custom animations)
- **Total:** ~265 KiB (uncompressed)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- ✅ Semantic HTML
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Color contrast (WCAG AA)
- ✅ Reduced motion support
- ✅ Screen reader compatible

## Development Guidelines

### Code Style
- TypeScript strict mode enforced
- Consistent formatting with Prettier
- No unused variables or imports
- Explicit return types for functions

### Component Structure
- Functional components with hooks
- Custom hooks for reusable logic
- Prop interfaces for type safety
- Clean separation of concerns

### Styling
- Tailwind CSS utility classes
- Custom CSS for animations only
- No inline styles
- Mobile-first responsive design

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run build:verify` - Verify TypeScript and build
- `bun run typecheck` - Run TypeScript type checking

## Performance Considerations

- Minimal third-party dependencies
- Custom SVG components instead of icon libraries
- Optimized image delivery
- Efficient CSS with Tailwind
- Code splitting for better caching
- Production source maps for debugging

## Deployment

The `dist/` directory contains production-ready files. Deploy to any static hosting:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Traditional web server

The application uses relative URLs and works correctly from subdirectories.
