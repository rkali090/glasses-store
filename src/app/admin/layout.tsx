import type { Metadata } from "next";
import { absoluteUrl, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Demo admin dashboard",
  description: "Manage demo LumaLens products, KPIs, orders, and customers with cookie-gated localStorage persistence in a static admin workspace.",
  alternates: { canonical: absoluteUrl("/admin") },
  openGraph: {
    title: `Demo admin dashboard | ${siteName}`,
    description: "A static, client-side merchant dashboard for the LumaLens storefront demo.",
    url: absoluteUrl("/admin"),
  },
  robots: { index: false, follow: true },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
