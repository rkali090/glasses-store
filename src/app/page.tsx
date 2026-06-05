"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatMoney, products } from "@/lib/products";

type CartLine = { slug: string; qty: number; lens: string };
const lensPrice: Record<string, number> = { "Demo clear": 0, "Blue-light +$30": 30, "Single vision +$80": 80, "Progressive +$180": 180 };

function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Window & { fbq?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  w.fbq?.("track", event, data);
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...data, event_id: crypto.randomUUID?.() });
}

function FrameArt({ gradient }: { gradient: string }) {
  return (
    <div className={`relative h-56 overflow-hidden rounded-[2rem] bg-gradient-to-br ${gradient} product-lens`}>
      <div className="absolute inset-x-10 top-20 flex items-center justify-center gap-3">
        <span className="h-20 w-28 rounded-full border-[10px] border-[#11263d] bg-white/30 shadow-inner" />
        <span className="h-3 w-10 rounded-full bg-[#11263d]" />
        <span className="h-20 w-28 rounded-full border-[10px] border-[#11263d] bg-white/30 shadow-inner" />
      </div>
      <div className="absolute left-1/2 top-[7.3rem] h-2 w-16 -translate-x-1/2 rounded-full bg-[#b88a44]" />
      <div className="absolute -bottom-10 left-8 h-24 w-24 rounded-full bg-white/35 blur-xl" />
      <div className="absolute right-5 top-5 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#11263d]">Mock frame</div>
    </div>
  );
}

export default function Home() {
  const [cart, setCart] = useState<CartLine[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = window.localStorage.getItem("lumalens-cart");
    return saved ? (JSON.parse(saved) as CartLine[]) : [];
  });
  const [openCart, setOpenCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    track("PageView", { content_name: "LumaLens storefront" });
  }, []);
  useEffect(() => localStorage.setItem("lumalens-cart", JSON.stringify(cart)), [cart]);

  const lines = useMemo(() => cart.map((line) => ({ ...line, product: products.find((p) => p.slug === line.slug)! })), [cart]);
  const subtotal = lines.reduce((sum, line) => sum + (line.product.price + lensPrice[line.lens]) * line.qty, 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12;
  const tax = Math.round(subtotal * 0.0825);
  const total = subtotal + shipping + tax;
  const count = cart.reduce((sum, line) => sum + line.qty, 0);

  function add(slug: string, lens = "Demo clear") {
    setCart((current) => {
      const found = current.find((line) => line.slug === slug && line.lens === lens);
      return found ? current.map((line) => (line === found ? { ...line, qty: line.qty + 1 } : line)) : [...current, { slug, lens, qty: 1 }];
    });
    setOpenCart(true);
    track("AddToCart", { content_ids: [slug], currency: "USD" });
  }
  function update(slug: string, lens: string, qty: number) {
    setCart((current) => current.map((line) => (line.slug === slug && line.lens === lens ? { ...line, qty } : line)).filter((line) => line.qty > 0));
  }
  function placeOrder() {
    track("Purchase", { value: total, currency: "USD", num_items: count });
    setCheckout(false); setOpenCart(false); setCart([]); setEmail("");
    alert("Mock order placed. Replace this frontend handler with Stripe Checkout + Supabase orders in production.");
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-[#fffdf8]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-3 font-semibold tracking-tight"><span className="grid size-10 place-items-center rounded-2xl bg-[#11263d] text-white">LL</span>LumaLens</a>
          <div className="hidden items-center gap-8 text-sm text-[#5b6b7d] md:flex"><a href="#shop">Shop</a><a href="#tryon">Try-on</a><a href="#trust">Trust</a><a href="#checkout">Checkout</a></div>
          <button onClick={() => setOpenCart(true)} className="rounded-full bg-[#11263d] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">Cart ({count})</button>
        </div>
      </nav>

      <section id="top" className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-32 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-[#b88a44]/30 bg-white/60 px-4 py-2 text-sm font-medium text-[#8a642e]">Prescription-ready eyewear • free shipping over $150</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.05em] text-[#0c1b2a] md:text-7xl">Premium glasses that make buying online feel safe.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5b6b7d]">A polished Next.js storefront with product pages, persistent cart, Stripe-style checkout UI, and event hooks for Facebook Pixel + Conversions API best practices.</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row"><a href="#shop" className="rounded-full bg-[#0f766e] px-7 py-4 text-center font-semibold text-white shadow-xl shadow-teal-900/20">Shop frames</a><a href="#checkout" className="rounded-full border border-[#11263d]/15 bg-white px-7 py-4 text-center font-semibold text-[#11263d]">View checkout flow</a></div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 text-sm"><div><b className="block text-2xl text-[#11263d]">4.8/5</b><span className="text-[#5b6b7d]">customer rating</span></div><div><b className="block text-2xl text-[#11263d]">30 days</b><span className="text-[#5b6b7d]">fit guarantee</span></div><div><b className="block text-2xl text-[#11263d]">UV400</b><span className="text-[#5b6b7d]">lens options</span></div></div>
        </div>
        <div className="glass-card stripe-shadow rounded-[2.5rem] p-5"><FrameArt gradient="from-teal-200 via-stone-100 to-amber-100" /><div className="mt-5 grid grid-cols-2 gap-4"><div className="rounded-3xl bg-[#11263d] p-5 text-white"><p className="text-sm text-white/70">Today only</p><b className="text-3xl">20% off</b><p className="mt-3 text-sm text-white/70">Mock promo applied in cart logic-ready UI.</p></div><div className="rounded-3xl bg-white p-5"><p className="text-sm text-[#5b6b7d]">Secure checkout</p><b className="text-3xl text-[#11263d]">Stripe</b><p className="mt-3 text-sm text-[#5b6b7d]">Frontend flow ready for real Checkout Sessions.</p></div></div></div>
      </section>

      <section id="trust" className="border-y border-[#11263d]/10 bg-[#11263d] px-5 py-10 text-white"><div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4"><p>✓ HIPAA-conscious prescription upload placeholder</p><p>✓ Server-side event IDs planned for CAPI dedupe</p><p>✓ Supabase product/order schema ready to wire</p><p>✓ Mobile-first conversion layout</p></div></section>

      <section id="shop" className="mx-auto max-w-7xl px-5 py-20"><div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-[.2em] text-[#0f766e]">Shop the edit</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.04em] md:text-5xl">Frames for every face.</h2></div><p className="max-w-xl text-[#5b6b7d]">Each mock product has its own static page and a fast add-to-cart action.</p></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{products.map((p) => (<article key={p.slug} className="glass-card rounded-[2rem] p-4 transition hover:-translate-y-1 hover:shadow-2xl"><Link href={`/products/${p.slug}`} onClick={() => track("ViewContent", { content_ids: [p.slug] })}><FrameArt gradient={p.gradient} /></Link><div className="p-4"><div className="mb-3 flex flex-wrap gap-2">{p.tags.slice(0,2).map((tag) => <span key={tag} className="rounded-full bg-[#e8f0ef] px-3 py-1 text-xs font-semibold text-[#0f766e]">{tag}</span>)}</div><h3 className="text-2xl font-semibold tracking-[-.03em]">{p.name}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-[#5b6b7d]">{p.description}</p><div className="mt-5 flex items-center justify-between"><div><span className="text-xl font-semibold">{formatMoney(p.price)}</span>{p.compareAt && <span className="ml-2 text-sm text-[#5b6b7d] line-through">{formatMoney(p.compareAt)}</span>}<p className="text-xs text-[#5b6b7d]">★ {p.rating} ({p.reviews})</p></div><button onClick={() => add(p.slug)} className="rounded-full bg-[#11263d] px-4 py-3 text-sm font-semibold text-white">Add</button></div><Link href={`/products/${p.slug}`} className="mt-4 block text-sm font-semibold text-[#0f766e]">View product page →</Link></div></article>))}</div></section>

      <section id="tryon" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-2"><div className="rounded-[2rem] bg-[#fffdf8] p-8 stripe-shadow"><p className="text-sm font-semibold uppercase tracking-[.2em] text-[#b88a44]">Modern ecommerce features</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.04em]">Built like a real storefront, without requiring admin.</h2><ul className="mt-6 space-y-4 text-[#5b6b7d]"><li>• Product detail pages generated statically with Next.js App Router.</li><li>• Persistent local cart with lens upgrades, tax, shipping, and quantity controls.</li><li>• Stripe Checkout handoff placeholder ready for a server route or Supabase Edge Function.</li><li>• Facebook Pixel browser events with event_id shape for CAPI deduplication.</li></ul></div><div id="checkout" className="rounded-[2rem] bg-[#11263d] p-8 text-white"><p className="text-sm text-white/60">Checkout preview</p><h3 className="mt-2 text-3xl font-semibold">Stripe-style payment card</h3><div className="mt-6 rounded-3xl bg-white p-5 text-[#11263d]"><input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email address" className="mb-3 w-full rounded-2xl border border-slate-200 px-4 py-3"/><div className="rounded-2xl border border-slate-200 p-4"><p className="text-sm text-[#5b6b7d]">Card number</p><p className="mt-2 font-mono text-lg">4242 4242 4242 4242</p></div><button onClick={()=>{setCheckout(true); setOpenCart(true);}} className="mt-4 w-full rounded-2xl bg-[#0f766e] py-4 font-semibold text-white">Continue to cart checkout</button></div></div></section>

      <footer className="px-5 py-12 text-center text-sm text-[#5b6b7d]">© 2026 LumaLens. Mock storefront demo. Replace sample products/images with Supabase data and real Stripe products.</footer>

      {openCart && <aside className="fixed inset-0 z-[60] bg-[#0c1b2a]/50 backdrop-blur-sm" onClick={() => setOpenCart(false)}><div onClick={(e) => e.stopPropagation()} className="ml-auto flex h-full w-full max-w-md flex-col bg-[#fffdf8] p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-2xl font-semibold">Your cart</h2><button onClick={() => setOpenCart(false)} className="rounded-full bg-slate-100 px-4 py-2">Close</button></div><div className="no-scrollbar mt-6 flex-1 space-y-4 overflow-auto">{lines.length === 0 ? <p className="rounded-3xl bg-slate-50 p-6 text-[#5b6b7d]">Your cart is empty. Add a frame to preview checkout.</p> : lines.map(({ product, qty, lens }) => <div key={`${product.slug}-${lens}`} className="rounded-3xl border border-slate-200 bg-white p-4"><div className="flex justify-between gap-4"><div><b>{product.name}</b><p className="text-sm text-[#5b6b7d]">{lens}</p><p className="text-sm font-semibold">{formatMoney(product.price + lensPrice[lens])}</p></div><select value={qty} onChange={(e)=>update(product.slug, lens, Number(e.target.value))} className="h-10 rounded-xl border border-slate-200 px-2">{[0,1,2,3,4,5].map(n=><option key={n}>{n}</option>)}</select></div></div>)}</div><div className="border-t border-slate-200 pt-5 text-sm"><div className="flex justify-between"><span>Subtotal</span><b>{formatMoney(subtotal)}</b></div><div className="mt-2 flex justify-between"><span>Shipping</span><b>{shipping === 0 ? "Free" : formatMoney(shipping)}</b></div><div className="mt-2 flex justify-between"><span>Estimated tax</span><b>{formatMoney(tax)}</b></div><div className="mt-4 flex justify-between text-xl"><span>Total</span><b>{formatMoney(total)}</b></div>{checkout && <p className="mt-3 rounded-2xl bg-[#e8f0ef] p-3 text-[#0f766e]">Mock Stripe checkout selected. In production this button would create a Stripe Checkout Session and mirror the event to Facebook CAPI.</p>}<button disabled={!lines.length} onClick={placeOrder} className="mt-5 w-full rounded-full bg-[#11263d] py-4 font-semibold text-white disabled:opacity-40">Place mock order</button></div></div></aside>}
    </main>
  );
}
