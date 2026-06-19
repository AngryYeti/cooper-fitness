# Cooper Fitness

Premium online fitness coaching marketing site built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- Stripe Payment Element

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about` | About Coach Evan |
| `/programs` | Coaching programs |
| `/pricing` | Pricing tiers |
| `/services/online-weight-loss-coaching` | Weight loss coaching service |
| `/services/online-personal-training` | Online personal training service |
| `/services/nutrition-coaching` | Nutrition coaching service |
| `/faq` | Frequently asked questions |
| `/testimonials` | Testimonials |
| `/blog` | Blog index |

## Inquiry form

Footer inquiries are sent to **evan@cooper.fitness** via `/api/inquiry`.

Emails are delivered via EmailJS. Add these to `.env.local`:

```env
EMAILJS_SERVICE_ID=service_xxxxxxxx
EMAILJS_TEMPLATE_ID=template_xxxxxxxx
EMAILJS_PUBLIC_KEY=xxxxxxxx
EMAILJS_PRIVATE_KEY=xxxxxxxx
```

Optionally, forward leads to a CRM by setting `CRM_WEBHOOK_URL`. The inquiry is posted to `${CRM_WEBHOOK_URL}/api/webhooks/new-lead`.

```env
CRM_WEBHOOK_URL=https://example.com
CRM_WEBHOOK_SECRET=
```

## Stripe checkout

Pricing checkout uses Stripe Payment Element and fulfills paid-client notifications from `/api/stripe-webhook`.

Required Stripe env vars:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=rk_live_xxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
```

Configure a Stripe webhook endpoint for:

```text
https://cooper.fitness/api/stripe-webhook
```

Subscribed event:

```text
payment_intent.succeeded
```

## Scripts

- `npm run dev` - development server
- `npm run build` - production build
- `npm run start` - start production server
- `npm run lint` - ESLint
- `npm run test` - launch-readiness regression checks

