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

Footer inquiries are sent to **evan@cooper.fitness** via `/api/inquiry`.

Emails are delivered via [EmailJS](https://www.emailjs.com/). Add these to your `.env.local`:

```env
EMAILJS_SERVICE_ID=service_xxxxxxxx
EMAILJS_TEMPLATE_ID=template_xxxxxxxx
EMAILJS_PUBLIC_KEY=xxxxxxxx
EMAILJS_PRIVATE_KEY=xxxxxxxx
```

Optionally, forward leads to a CRM by setting `CRM_WEBHOOK_URL`. The inquiry is POSTed to `${CRM_WEBHOOK_URL}/api/webhooks/new-lead`.

```env
CRM_WEBHOOK_URL=https://example.com
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint
