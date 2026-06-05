import Link from "next/link";
import { formatMoney, getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

function FrameArt({ gradient }: { gradient: string }) {
  return (
    <div className={`relative h-[28rem] overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${gradient} product-lens stripe-shadow`}>
      <div className="absolute inset-x-8 top-40 flex items-center justify-center gap-4">
        <span className="h-28 w-40 rounded-full border-[14px] border-[#11263d] bg-white/30 shadow-inner" />
        <span className="h-4 w-14 rounded-full bg-[#11263d]" />
        <span className="h-28 w-40 rounded-full border-[14px] border-[#11263d] bg-white/30 shadow-inner" />
      </div>
      <div className="absolute left-1/2 top-[14.5rem] h-3 w-24 -translate-x-1/2 rounded-full bg-[#b88a44]" />
      <div className="absolute right-8 top-8 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-[#11263d]">Mock product render</div>
    </div>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return <main className="grid min-h-screen place-items-center p-10">Product not found.</main>;

  return (
    <main className="min-h-screen px-5 py-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex items-center justify-between rounded-full bg-white/70 px-5 py-4 backdrop-blur-xl">
          <Link href="/" className="font-semibold text-[#11263d]">← LumaLens</Link>
          <Link href="/#shop" className="rounded-full bg-[#11263d] px-5 py-3 text-sm font-semibold text-white">Back to shop</Link>
        </nav>
        <section className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <FrameArt gradient={product.gradient} />
          <div className="glass-card rounded-[2.5rem] p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#0f766e]">{product.collection}</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-[-.05em] text-[#0c1b2a]">{product.name}</h1>
            <p className="mt-4 text-lg leading-8 text-[#5b6b7d]">{product.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">{product.tags.map((tag) => <span key={tag} className="rounded-full bg-[#e8f0ef] px-3 py-1 text-sm font-semibold text-[#0f766e]">{tag}</span>)}</div>
            <div className="mt-8 flex items-end gap-3"><span className="text-4xl font-semibold">{formatMoney(product.price)}</span>{product.compareAt && <span className="pb-1 text-lg text-[#5b6b7d] line-through">{formatMoney(product.compareAt)}</span>}</div>
            <p className="mt-2 text-sm text-[#5b6b7d]">★ {product.rating} from {product.reviews} verified reviews</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-5"><p className="text-sm text-[#5b6b7d]">Color</p><b>{product.color}</b></div>
              <div className="rounded-3xl bg-white p-5"><p className="text-sm text-[#5b6b7d]">Fit</p><b>{product.fit}</b></div>
              <div className="rounded-3xl bg-white p-5 sm:col-span-2"><p className="text-sm text-[#5b6b7d]">Lens compatibility</p><b>{product.lens}</b></div>
            </div>
            <h2 className="mt-9 text-2xl font-semibold">What&apos;s included</h2>
            <ul className="mt-4 space-y-3 text-[#5b6b7d]">{product.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
            <Link href="/#shop" className="mt-9 block rounded-full bg-[#0f766e] px-7 py-4 text-center font-semibold text-white">Add from storefront cart</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
