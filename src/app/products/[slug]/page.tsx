import Link from "next/link";
import { FrameArt } from "@/components/frame-art";
import { ProductOptions } from "@/components/product-options";
import { SiteHeader } from "@/components/site-header";
import { formatMoney, getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return <main className="grid min-h-screen place-items-center p-10">Product not found.</main>;
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <main className="min-h-screen px-5 pb-16 pt-28">
      <SiteHeader />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between rounded-full bg-white/70 px-5 py-4 backdrop-blur-xl">
          <Link href="/" className="font-semibold text-[#11263d]">← Continue shopping</Link>
          <Link href="/cart" className="rounded-full bg-[#11263d] px-5 py-3 text-sm font-semibold text-white">View cart</Link>
        </div>
        <section className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="grid gap-5">
            <FrameArt gradient={product.gradient} large />
            <div className="grid gap-4 sm:grid-cols-3">
              {product.features.map((feature) => <div key={feature} className="rounded-3xl bg-white/70 p-4 text-sm font-semibold text-[#11263d]">✓ {feature}</div>)}
            </div>
          </div>
          <div className="glass-card rounded-[2.5rem] p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#0f766e]">{product.collection}</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-[-.05em] text-[#0c1b2a]">{product.name}</h1>
            <p className="mt-4 text-lg leading-8 text-[#5b6b7d]">{product.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">{product.tags.map((tag) => <span key={tag} className="rounded-full bg-[#e8f0ef] px-3 py-1 text-sm font-semibold text-[#0f766e]">{tag}</span>)}</div>
            <div className="mt-8 flex items-end gap-3"><span className="text-4xl font-semibold">{formatMoney(product.price)}</span>{product.compareAt && <span className="pb-1 text-lg text-[#5b6b7d] line-through">{formatMoney(product.compareAt)}</span>}</div>
            <p className="mt-2 text-sm text-[#5b6b7d]">★ {product.rating} from {product.reviews} verified reviews</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-5"><p className="text-sm text-[#5b6b7d]">Default color</p><b>{product.color}</b></div>
              <div className="rounded-3xl bg-white p-5"><p className="text-sm text-[#5b6b7d]">Recommended fit</p><b>{product.fit}</b></div>
              <div className="rounded-3xl bg-white p-5 sm:col-span-2"><p className="text-sm text-[#5b6b7d]">Lens compatibility</p><b>{product.lens}</b></div>
            </div>
            <ProductOptions product={product} />
          </div>
        </section>
        <section className="mt-16">
          <h2 className="text-3xl font-semibold tracking-[-.04em]">You may also like</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">{related.map((item) => <Link href={`/products/${item.slug}`} key={item.slug} className="rounded-[2rem] bg-white/70 p-4"><FrameArt gradient={item.gradient} /><b className="mt-4 block text-xl">{item.name}</b><span className="text-[#5b6b7d]">{formatMoney(item.price)}</span></Link>)}</div>
        </section>
      </div>
    </main>
  );
}
