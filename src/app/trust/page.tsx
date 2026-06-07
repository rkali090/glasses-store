import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trust center",
  description: "Review LumaLens fit protection, prescription handling, shipping clarity, and secure mock checkout details.",
  alternates: { canonical: absoluteUrl("/trust") },
  openGraph: {
    title: `Trust center | ${siteName}`,
    description: "Dedicated trust details for fit, prescription handling, shipping, and payment review.",
    url: absoluteUrl("/trust"),
  },
};

const trustCards = [
  ["Fit protected", "Every order includes a 30-day comfort window and clear adjustment guidance.", "↺"],
  ["Secure mock checkout", "Payment UI is realistic for validation while keeping data local in this static demo.", "⌁"],
  ["Prescription-ready", "Product and cart pages preserve Rx handling choices before checkout.", "+"],
  ["Fast delivery", "Free shipping over $150 and visible delivery options keep totals easy to review.", "→"],
];

export default function TrustPage() {
  return (
    <main className="min-h-screen px-5 pb-16 pt-28">
      <SiteHeader />
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2.5rem] bg-white/80 p-8 stripe-shadow">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#0b5f59]">Trust center</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-semibold leading-tight tracking-[-.05em] text-[#0c1b2a]">Buying glasses online should feel clear and safe.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334155]">Dedicated trust details for fit, prescription handling, shipping, and payment review.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {trustCards.map(([title, detail, icon]) => (
            <article key={title} className="rounded-[2rem] border border-[#11263d]/10 bg-gradient-to-br from-white via-[#fffdf8] to-[#e8f0ef] p-6 stripe-shadow">
              <div className="mb-5 inline-grid size-12 place-items-center rounded-2xl bg-[#11263d] text-lg font-semibold text-white">{icon}</div>
              <h2 className="text-xl font-semibold tracking-[-.03em] text-[#11263d]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#334155]">{detail}</p>
            </article>
          ))}
        </div>
        <Link href="/shop" className="mt-8 inline-flex rounded-full bg-[#11263d] px-7 py-4 font-semibold text-white">Shop with confidence</Link>
      </section>
    </main>
  );
}
