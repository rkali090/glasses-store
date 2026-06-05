import Link from "next/link";
import { LazyFrameArt } from "@/components/lazy-frame-art";
import { SiteHeader } from "@/components/site-header";
import { formatMoney, products } from "@/lib/products";

const prescriptionFrames = products.filter((product) => product.tags.includes("Prescription") || product.lens.toLowerCase().includes("prescription"));

export default function PrescriptionShopPage() {
  return (
    <main className="min-h-screen px-5 pb-16 pt-28">
      <SiteHeader />
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-[2.5rem] bg-white/80 p-8 stripe-shadow">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#0b5f59]">Prescription ready</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-semibold leading-tight tracking-[-.05em] text-[#0c1b2a]">Optical frames ready for your Rx.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334155]">Choose frames that preserve prescription handling through product configuration, cart review, and checkout.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {prescriptionFrames.map((product) => (
            <article key={product.slug} className="interactive-lift glass-card rounded-[2rem] p-4 transition hover:-translate-y-1 hover:shadow-2xl">
              <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}><LazyFrameArt gradient={product.gradient} /></Link>
              <div className="p-4">
                <p className="text-sm font-semibold uppercase tracking-[.18em] text-[#7a4f17]">{product.fit}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-.03em] text-[#11263d]">{product.name}</h2>
                <p className="mt-2 text-sm leading-6 text-[#334155]">{product.description}</p>
                <div className="mt-5 flex items-center justify-between"><span className="text-xl font-semibold text-[#11263d]">{formatMoney(product.price)}</span><Link href={`/products/${product.slug}`} className="rounded-full bg-[#11263d] px-5 py-3 text-sm font-semibold text-white">Configure</Link></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
