# Eye Interaction — Website Boilerplate

Modern, production-ready visa endorsement website built with Next.js 14.

## Stack
- **Framework**: Next.js 14 (App Router)
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

## Admin Portal — Phase 2 Roadmap

### When to add it
After the main website is live and you're receiving form submissions.

### Stack additions for admin
```
Admin Stack:
├── NextAuth.js v5          # Authentication
├── PostgreSQL + Prisma     # Database
├── Resend                  # Email notifications
└── Recharts                # Analytics charts
```

### Implementation plan

**1. Database (Prisma + PostgreSQL)**
```bash
npm install prisma @prisma/client
npx prisma init
```

Schema: Users, Applications, Notes, StatusHistory

**2. Auth (NextAuth.js)**
```bash
npm install next-auth@beta
```
- `/admin/login` — credentials or Google
- Route Groups: `(admin)` with middleware protection

**3. Admin Routes**
```
src/app/
└── (admin)/
    ├── layout.tsx          # Admin shell (sidebar, auth check)
    ├── dashboard/          # Stats overview
    ├── applications/       # All form submissions
    │   └── [id]/           # Individual application detail
    ├── settings/           # Company settings
    └── team/               # Team management
```

**4. API Routes (form submission)**
```
src/app/api/
├── eligibility/route.ts    # Save form to DB, send email
├── applications/route.ts   # Admin CRUD
└── auth/[...nextauth]/     # NextAuth handler
```

### The beauty of this stack
Your current boilerplate is already admin-ready because:
- Next.js App Router supports route groups natively
- TypeScript types are already defined (EligibilityFormData)
- No separate backend needed — API routes live in the same project
- Deploy everything on Vercel — zero config

---

## Deployment (Vercel)

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard:
```
NEXT_PUBLIC_SITE_URL=https://eyeinteraction.com
DATABASE_URL=postgresql://...           # Phase 2
NEXTAUTH_SECRET=your-secret             # Phase 2
RESEND_API_KEY=re_...                   # Phase 2
```

## Performance Checklist
- [ ] Replace all `<img>` with `next/image`
- [ ] Add blur placeholder to all images
- [ ] Upload videos to Cloudflare Stream / Vimeo
- [ ] Run `next build` and check bundle analyzer
- [ ] Lighthouse score target: 90+ all categories
