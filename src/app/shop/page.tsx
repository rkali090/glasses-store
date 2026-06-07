import type { Metadata } from "next";
import Link from "next/link";
import { LazyFrameArt } from "@/components/lazy-frame-art";
import { SiteHeader } from "@/components/site-header";
import { formatMoney, products } from "@/lib/products";
import { absoluteUrl, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop all premium glasses",
  description: "Browse every LumaLens frame across blue-light, sun, prescription-ready, wide-fit, and luxury eyewear edits.",
  alternates: { canonical: absoluteUrl("/shop") },
  openGraph: {
    title: `Shop all premium glasses | ${siteName}`,
    description: "Compare LumaLens eyewear collections and open product pages to configure frame, fit, lens, and prescription options.",
    url: absoluteUrl("/shop"),
  },
};

export default function ShopPage() {
  return (
    <main className="min-h-screen px-5 pb-16 pt-28">
      <SiteHeader />
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 rounded-[2.5rem] bg-white/80 p-8 stripe-shadow lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#0b5f59]">Shop</p>
            <h1 className="mt-3 max-w-3xl text-5xl font-semibold leading-tight tracking-[-.05em] text-[#0c1b2a]">Browse every LumaLens frame.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334155]">Compare blue-light, sun, prescription-ready, wide-fit, and luxury frames from one dedicated shopping page.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop/blue-light" className="interactive-lift rounded-full border border-[#11263d]/20 bg-white px-5 py-3 text-sm font-semibold text-[#11263d]">Blue-light</Link>
            <Link href="/shop/prescription" className="interactive-lift rounded-full border border-[#11263d]/20 bg-white px-5 py-3 text-sm font-semibold text-[#11263d]">Prescription</Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.slug} className="interactive-lift glass-card rounded-[2rem] p-4 transition hover:-translate-y-1 hover:shadow-2xl">
              <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
                <LazyFrameArt gradient={product.gradient} />
              </Link>
              <div className="p-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {product.tags.slice(0, 2).map((tag) => <span key={tag} className="rounded-full bg-[#e8f0ef] px-3 py-1 text-xs font-semibold text-[#0b5f59]">{tag}</span>)}
                </div>
                <h2 className="text-2xl font-semibold tracking-[-.03em] text-[#11263d]">{product.name}</h2>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[#334155]">{product.description}</p>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xl font-semibold text-[#11263d]">{formatMoney(product.price)}</span>
                    {product.compareAt && <span className="ml-2 text-sm text-[#334155] line-through">{formatMoney(product.compareAt)}</span>}
                    <p className="text-xs text-[#334155]">★ {product.rating} ({product.reviews})</p>
                  </div>
                  <Link href={`/products/${product.slug}`} className="rounded-full bg-[#11263d] px-5 py-3 text-sm font-semibold text-white">View</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
