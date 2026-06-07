export const siteUrl = "https://rkali090.github.io/glasses-store";
export const siteName = "LumaLens Eyewear";
export const siteDescription = "A premium, responsive eyewear storefront with configurable glasses, cart, checkout, and demo admin workflows.";

export function absoluteUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized === "/" ? "" : normalized}`;
}
