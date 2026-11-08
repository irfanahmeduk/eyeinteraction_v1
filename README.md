# Eye Interaction — Website Boilerplate

Modern, production-ready visa endorsement website built with Next.js 16.

## Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v3 + custom design system
- **Animations**: Framer Motion + GSAP (add when needed)
- **Smooth Scroll**: Lenis
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (navbar, footer, cursor)
│   ├── page.tsx            # Homepage
│   ├── eligibility/        # Multi-step eligibility form
│   ├── success-stories/    # Video testimonials (add page.tsx)
│   ├── about/              # About page (add page.tsx)
│   └── contact/            # Contact page (add page.tsx)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky navbar, dropdown, mobile drawer
│   │   └── Footer.tsx      # Full footer with CTA banner
│   ├── sections/           # Homepage sections
│   │   └── index.tsx       # Stats, Services, Process, Testimonials, CTA
│   ├── sections/
│   │   └── HeroSection.tsx # Hero with animations
│   ├── forms/
│   │   └── EligibilityForm.tsx  # 5-step form
│   └── ui/
│       ├── CustomCursor.tsx
│       └── SmoothScrollProvider.tsx
├── hooks/
│   └── index.ts            # useSmoothScroll, useCustomCursor, useCountUp, useStickyNav
├── lib/
│   └── utils.ts            # cn(), formatNumber(), etc.
└── types/
    └── index.ts            # All TypeScript types
```

## Design System

### Colors (tailwind.config.ts)
- `brand-500` = Light Blue (primary)
- `brand-900` = Dark Blue (secondary)
- Full brand scale: `brand-50` through `brand-950`

### CSS Classes (globals.css)
- `.container-custom` — max-width container
- `.section-padding` — consistent section spacing
- `.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost`, `.btn-white`
- `.card` — base card with hover
- `.glass`, `.glass-blue`, `.glass-dark` — glassmorphism
- `.heading-gradient` — blue gradient text
- `[data-animate]` — scroll animation trigger

### Fonts
- **Body**: Geist Sans (Next.js default, replace with any)
- **Display**: Same (add a display font in layout.tsx if desired)

---

## Adding More Pages

### Success Stories Page
```tsx
// src/app/success-stories/page.tsx
import { VideoGrid } from "@/components/sections/VideoGrid";
export default function SuccessStoriesPage() {
  return <VideoGrid />;
}
```

### About Page
```tsx
// src/app/about/page.tsx
```

### Contact Page
```tsx
// src/app/contact/page.tsx
```

---

## Admin authentication and backend

The admin runs in this Next.js application at `/admin`, using MySQL through
`mysql2`, server-validated sessions, and HTTP-only cookies.

See [backend setup and route conventions](docs/backend-authentication.md) for
configuration, database setup, initial admin creation, and endpoint registration.
See [admin integration](docs/admin-integration.md) for the UI architecture.

New endpoint logic belongs in `src/routes/{domain}/index.js` or
`src/routes/{prefix}/{domain}/index.js`, registered in `src/routes/index.js`.
The Next.js catch-all `/api` handler delegates to that central registry.
The shared database model lives in `src/database/index.js`.

## Deployment (Vercel)

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard:
```
NEXT_PUBLIC_SITE_URL=https://eyeinteraction.com
APP_URL=https://eyeinteraction.com
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-runtime-user
DB_PASSWORD=your-password
DB_NAME=eyeinteraction
DB_SSL=true
```

## Performance Checklist
- [ ] Replace all `<img>` with `next/image`
- [ ] Add blur placeholder to all images
- [ ] Upload videos to Cloudflare Stream / Vimeo
- [ ] Run `next build` and check bundle analyzer
- [ ] Lighthouse score target: 90+ all categories

