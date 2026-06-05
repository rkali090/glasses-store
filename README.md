# LumaLens Glasses Store

Production-grade frontend demo for a modern eyeglasses ecommerce store built with Next.js App Router, Tailwind CSS, and static export for GitHub Pages.

Live route target: `/glasses-store`

## Included

- Modern responsive storefront and product catalog
- Static product detail pages
- Persistent frontend shopping cart
- Lens upgrades, tax, shipping, and mock checkout summary
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
