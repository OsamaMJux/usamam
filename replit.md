# Portfolio Website - Creative Strategist & Marketing Expert

## Overview
This is a portfolio website for a creative strategist and marketing expert, imported from Lovable. It's a React-based single-page application with multiple sections showcasing services, portfolio, products, testimonials, and case studies.

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **Build Tool**: Vite

## Project Structure
```
src/
├── assets/          # Static images (hero-bg, portfolio images)
├── components/
│   ├── case-study/  # Case study page components
│   ├── interactive/ # Animated/interactive components
│   └── ui/          # shadcn/ui components
├── data/            # Static data (case studies, products)
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── pages/           # Page components (Index, Products, CaseStudy, etc.)
```

## Running the Project
- Development: `npm run dev` (runs on port 5000)
- Build: `npm run build` (outputs to dist/)
- Preview: `npm run preview`

## Deployment
Configured for static deployment. The build output in `dist/` is served directly.
