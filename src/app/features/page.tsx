import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const notes = [
  ["Static-safe architecture", "Catalog, cart, checkout, and product pages work as a GitHub Pages static export with client-side cart state."],
  ["Client-side commerce demo", "Cart and payment controls use localStorage and mock form state so no backend or credentials are required."],
  ["Accessible navigation", "The header, mobile menu, footer, cart, and payment routes now point to dedicated pages rather than section anchors."],
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen px-5 pb-16 pt-28">
      <SiteHeader />
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2.5rem] bg-[#11263d] p-8 text-white stripe-shadow">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#d7e3e1]">Storefront features</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-semibold leading-tight tracking-[-.05em]">Developer notes for the LumaLens demo.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#e8f0ef]">A dedicated page for how the storefront is structured, why the flow is static-safe, and what would connect to production services later.</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {notes.map(([title, detail]) => (
            <article key={title} className="rounded-[2rem] bg-white/80 p-7 stripe-shadow">
              <h2 className="text-2xl font-semibold tracking-[-.03em] text-[#11263d]">{title}</h2>
              <p className="mt-4 leading-7 text-[#334155]">{detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/shop" className="rounded-full bg-[#11263d] px-7 py-4 font-semibold text-white">Shop frames</Link>
          <Link href="/trust" className="rounded-full border border-[#11263d]/25 bg-white px-7 py-4 font-semibold text-[#11263d]">View trust center</Link>
        </div>
      </section>
    </main>
  );
}
