import type { Metadata } from "next";
import { absoluteUrl, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Secure mock checkout",
  description: "Complete a realistic local checkout flow for configured LumaLens eyewear with delivery, wallet, and card-style payment options.",
  alternates: { canonical: absoluteUrl("/checkout") },
  openGraph: {
    title: `Secure mock checkout | ${siteName}`,
    description: "Try the LumaLens payment flow while keeping card data local to the browser demo.",
    url: absoluteUrl("/checkout"),
  },
};

export default function CheckoutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
