# LumaLens Glasses Store

Production-grade frontend demo for a modern eyeglasses ecommerce store built with Next.js App Router, Tailwind CSS, and static export for GitHub Pages.

Live route target: `/glasses-store`

## Included

- Modern responsive storefront and product catalog
- Hamburger menu navigation on mobile
- Static product detail pages with color, lens, fit, and prescription options
- Dedicated full cart page with line editing, tax, shipping, and order summary
- Full real-looking payment process with contact, shipping, delivery, billing, card, Apple Pay, and PayPal-style options
- Stripe-style checkout UI ready to wire to real Checkout Sessions
- Facebook Pixel browser event hooks with `event_id` shape for CAPI deduplication
- Supabase-ready product/order data structure in `src/lib/products.ts`

## Not included by request

- Admin dashboard
- Real Supabase database credentials
- Real Stripe secret-key routes

## Development

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

## Production wiring notes

For production payments, replace the mock order handler with a server-side Stripe Checkout Session endpoint or Supabase Edge Function. Mirror browser events to Facebook Conversions API from the server with a shared `event_id` to deduplicate Pixel and CAPI events.
