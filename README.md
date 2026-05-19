# Cooper Fitness

Premium online fitness coaching marketing site built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**
- **Framer Motion**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about` | About Coach Evan |
| `/programs` | Coaching programs |
| `/pricing` | Pricing tiers |

## Inquiry form

Footer inquiries are sent to **evan@cooperfitness.net** via `/api/inquiry`.

By default, emails are delivered through [FormSubmit](https://formsubmit.co) (no API key required). For production, add a [Resend](https://resend.com) API key to `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM_EMAIL=Cooper Fitness <hello@cooperfitness.net>
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint
