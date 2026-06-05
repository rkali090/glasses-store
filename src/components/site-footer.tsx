import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

const shopLinks = [
  { label: "Shop all frames", href: "/shop" },
  { label: "Blue-light glasses", href: "/shop/blue-light" },
  { label: "Prescription ready", href: "/shop/prescription" },
  { label: "Checkout demo", href: "/checkout" },
];

const supportLinks = [
  { label: "Fit guarantee", href: "/trust" },
  { label: "Lens options", href: "/products/atlas-tortoise" },
  { label: "Cart review", href: "/cart" },
  { label: "Payment security", href: "/checkout" },
];

const companyLinks = [
  { label: "Our promise", href: "/trust" },
  { label: "Try-on flow", href: "/try-on" },
  { label: "Storefront features", href: "/features" },
  { label: "Developer notes", href: "/features" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="min-w-0">
      <h2 className="text-sm font-semibold uppercase tracking-[.2em] text-[#d7e3e1]">{title}</h2>
      <nav className="mt-6 grid gap-4" aria-label={`${title} footer links`}>
        {links.map((link) => (
          <Link key={link.label} href={link.href} className="text-[0.95rem] font-medium leading-6 text-[#e8f0ef] transition hover:text-white">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="lazy-render mt-24 border-t border-[#11263d]/10 bg-[#0c1b2a] text-white">
      <div className="mx-auto max-w-7xl px-5 py-[4.5rem] md:px-8 md:py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 font-semibold tracking-tight text-white" aria-label="LumaLens home">
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-[#11263d]">LL</span>
              <span className="text-xl">LumaLens</span>
            </Link>
            <p className="mt-6 max-w-md text-[0.95rem] leading-8 text-[#d7e3e1]">
              Premium eyewear storefront demo with product options, cart review, and a Stripe-ready checkout experience designed for confident online buying.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:gap-12">
            <FooterColumn title="Shop" links={shopLinks} />
            <FooterColumn title="Support" links={supportLinks} />
            <FooterColumn title="Company" links={companyLinks} />
          </div>
        </div>

        <div className="mt-16 grid gap-4 text-[0.95rem] font-medium leading-6 text-[#e8f0ef] sm:grid-cols-2 lg:grid-cols-4">
          <p className="flex min-h-20 items-center rounded-[1.35rem] border border-white/15 bg-white/10 px-5 py-4">✓ Free shipping over $150</p>
          <p className="flex min-h-20 items-center rounded-[1.35rem] border border-white/15 bg-white/10 px-5 py-4">✓ 30-day fit guarantee</p>
          <p className="flex min-h-20 items-center rounded-[1.35rem] border border-white/15 bg-white/10 px-5 py-4">✓ Prescription-ready lenses</p>
          <p className="flex min-h-20 items-center rounded-[1.35rem] border border-white/15 bg-white/10 px-5 py-4">✓ Secure mock checkout</p>
        </div>

        <div className="mt-16 grid gap-8 rounded-[2.25rem] border border-white/15 bg-white/10 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-.03em]">Get frame drops and lens updates.</h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-[#d7e3e1]">Be first to see new frame drops, fit guides, and seasonal lens offers.</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-8 text-sm leading-6 text-[#d7e3e1] md:flex-row md:items-center md:justify-between">
          <p>© 2026 LumaLens Eyewear. Mock commerce experience for production storefront validation.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/accessibility" className="hover:text-white">Accessibility</Link>
            <Link href="/trust" className="hover:text-white">Trust</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
