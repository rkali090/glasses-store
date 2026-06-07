import type { Metadata } from "next";
import { absoluteUrl, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shopping cart",
  description: "Review configured LumaLens frames, lens options, prescription handling, quantities, shipping, and order totals before checkout.",
  alternates: { canonical: absoluteUrl("/cart") },
  openGraph: {
    title: `Shopping cart | ${siteName}`,
    description: "Review your eyewear order before payment.",
    url: absoluteUrl("/cart"),
  },
};

export default function CartLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
