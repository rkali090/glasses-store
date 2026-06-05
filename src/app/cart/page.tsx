"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FrameArt } from "@/components/frame-art";
import { SiteHeader } from "@/components/site-header";
import { CartLine, cartDetails, lineKey, readCart, updateCartLine } from "@/lib/cart";
import { formatMoney } from "@/lib/products";

export default function CartPage() {
  const [cart, setCart] = useState<CartLine[]>(() => readCart());
  const details = cartDetails(cart);

  useEffect(() => {
    const sync = () => setCart(readCart());
    window.addEventListener("storage", sync);
    window.addEventListener("lumalens-cart-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("lumalens-cart-updated", sync);
    };
  }, []);

  function setQty(key: string, qty: number) {
    setCart(updateCartLine(key, qty));
  }

  return (
    <main className="min-h-screen px-5 pb-16 pt-28">
      <SiteHeader />
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><p className="text-sm font-semibold uppercase tracking-[.2em] text-[#0f766e]">Full cart</p><h1 className="mt-3 text-5xl font-semibold tracking-[-.05em]">Review your eyewear order.</h1></div>
          <Link href="/#shop" className="rounded-full border border-[#11263d]/15 bg-white px-6 py-4 text-center font-semibold text-[#11263d]">Continue shopping</Link>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_25rem]">
          <div className="grid gap-4">
            {details.lines.length === 0 ? (
              <div className="rounded-[2rem] bg-white p-10 text-center stripe-shadow"><h2 className="text-2xl font-semibold">Your cart is empty.</h2><p className="mt-3 text-[#5b6b7d]">Add a configured pair from a product page or quick-add from the storefront.</p><Link href="/#shop" className="mt-6 inline-block rounded-full bg-[#11263d] px-7 py-4 font-semibold text-white">Shop frames</Link></div>
            ) : details.lines.map((line) => {
              const product = line.product!;
              const key = lineKey(line);
              return (
                <article key={key} className="grid gap-5 rounded-[2rem] bg-white/80 p-4 stripe-shadow md:grid-cols-[15rem_1fr_auto]">
                  <FrameArt gradient={product.gradient} />
                  <div className="p-2"><Link href={`/products/${product.slug}`} className="text-2xl font-semibold tracking-[-.03em] text-[#11263d]">{product.name}</Link><p className="mt-2 text-[#5b6b7d]">{product.description}</p><div className="mt-4 grid gap-2 text-sm text-[#5b6b7d] sm:grid-cols-2"><span><b className="text-[#11263d]">Lens:</b> {line.lens}</span><span><b className="text-[#11263d]">Fit:</b> {line.frameSize}</span><span><b className="text-[#11263d]">Color:</b> {line.color}</span><span><b className="text-[#11263d]">Rx:</b> {line.prescription}</span></div></div>
                  <div className="flex items-center justify-between gap-4 md:block md:text-right"><select value={line.qty} onChange={(e) => setQty(key, Number(e.target.value))} className="rounded-2xl border border-slate-200 bg-white px-3 py-3">{[0,1,2,3,4,5].map((n) => <option key={n}>{n}</option>)}</select><p className="mt-3 text-xl font-semibold">{formatMoney(((product.price) + (line.lens === "Blue-light" ? 30 : line.lens === "Single vision" ? 80 : line.lens === "Progressive" ? 180 : 0)) * line.qty)}</p><button onClick={() => setQty(key, 0)} className="mt-3 text-sm font-semibold text-red-600">Remove</button></div>
                </article>
              );
            })}
          </div>
          <aside className="h-fit rounded-[2rem] bg-[#11263d] p-6 text-white stripe-shadow">
            <h2 className="text-2xl font-semibold">Order summary</h2>
            <div className="mt-6 space-y-3 text-sm text-white/75"><div className="flex justify-between"><span>Subtotal</span><b className="text-white">{formatMoney(details.subtotal)}</b></div><div className="flex justify-between"><span>Shipping</span><b className="text-white">{details.shipping === 0 ? "Free" : formatMoney(details.shipping)}</b></div><div className="flex justify-between"><span>Estimated tax</span><b className="text-white">{formatMoney(details.tax)}</b></div><div className="flex justify-between border-t border-white/15 pt-4 text-xl text-white"><span>Total</span><b>{formatMoney(details.total)}</b></div></div>
            <div className="mt-6 rounded-3xl bg-white/10 p-4 text-sm text-white/75"><b className="text-white">Options included:</b><p className="mt-2">Lens selection, frame fit, color, prescription handling, and quantity edits are preserved into checkout.</p></div>
            <Link href="/checkout" className={`mt-6 block rounded-full px-7 py-4 text-center font-semibold ${details.count ? "bg-[#0f766e] text-white" : "pointer-events-none bg-white/20 text-white/50"}`}>Proceed to payment</Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
