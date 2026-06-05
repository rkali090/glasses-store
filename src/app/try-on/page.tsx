import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function TryOnPage() {
  return (
    <main className="min-h-screen px-5 pb-16 pt-28">
      <SiteHeader />
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_.85fr] lg:items-start">
        <div className="rounded-[2.5rem] bg-white/80 p-8 stripe-shadow">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#7a4f17]">Try-on flow</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-semibold leading-tight tracking-[-.05em] text-[#0c1b2a]">A dedicated walkthrough for confident frame selection.</h1>
          <p className="mt-5 text-lg leading-8 text-[#334155]">This page explains how the storefront guides shoppers from frame discovery to fit choices, prescription handling, cart review, and checkout.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {["Choose a silhouette", "Confirm fit and bridge", "Pick lens handling", "Review before payment"].map((item, index) => (
              <div key={item} className="rounded-3xl border border-[#11263d]/10 bg-[#fffdf8] p-5">
                <span className="text-sm font-semibold text-[#0b5f59]">0{index + 1}</span>
                <h2 className="mt-2 text-xl font-semibold tracking-[-.03em] text-[#11263d]">{item}</h2>
              </div>
            ))}
          </div>
        </div>
        <aside className="rounded-[2.5rem] bg-[#11263d] p-8 text-white stripe-shadow">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#d7e3e1]">Checkout preview</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Try the mock payment flow after choosing frames.</h2>
          <p className="mt-4 leading-7 text-[#e8f0ef]">The current demo keeps everything client-side while showing realistic cart and payment steps.</p>
          <div className="mt-7 grid gap-3">
            <Link href="/shop" className="rounded-2xl bg-white p-5 font-semibold text-[#11263d]">Shop frames →</Link>
            <Link href="/checkout" className="rounded-2xl border border-white/20 bg-white/10 p-5 font-semibold text-white">Open payment page →</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
