import { products } from "@/lib/products";

export type CartLine = {
  slug: string;
  qty: number;
  lens: string;
  frameSize: string;
  prescription: string;
  color: string;
};

export const lensOptions = [
  { name: "Demo clear", price: 0, description: "No prescription, showroom lenses" },
  { name: "Blue-light", price: 30, description: "Comfort coating for screen-heavy days" },
  { name: "Single vision", price: 80, description: "Distance or reading prescription lenses" },
  { name: "Progressive", price: 180, description: "Multi-distance premium lenses" },
];

export const sizeOptions = ["Narrow", "Medium", "Wide", "Low bridge"];
export const prescriptionOptions = ["Upload later", "Enter prescription", "Use saved Rx", "Non-prescription"];

export function lineKey(line: CartLine) {
  return [line.slug, line.lens, line.frameSize, line.prescription, line.color].join("::");
}

export function lensUpcharge(name: string) {
  return lensOptions.find((lens) => lens.name === name)?.price ?? 0;
}

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem("lumalens-cart") || "[]") as CartLine[];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartLine[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("lumalens-cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("lumalens-cart-updated"));
}

export function addToCart(item: CartLine) {
  const cart = readCart();
  const key = lineKey(item);
  const next = cart.some((line) => lineKey(line) === key)
    ? cart.map((line) => (lineKey(line) === key ? { ...line, qty: line.qty + item.qty } : line))
    : [...cart, item];
  saveCart(next);
  return next;
}

export function updateCartLine(key: string, qty: number) {
  const next = readCart()
    .map((line) => (lineKey(line) === key ? { ...line, qty } : line))
    .filter((line) => line.qty > 0);
  saveCart(next);
  return next;
}

export function cartDetails(cart: CartLine[]) {
  const lines = cart
    .map((line) => ({ ...line, product: products.find((product) => product.slug === line.slug) }))
    .filter((line) => Boolean(line.product));
  const subtotal = lines.reduce((sum, line) => sum + ((line.product?.price ?? 0) + lensUpcharge(line.lens)) * line.qty, 0);
  const shipping = subtotal === 0 || subtotal > 150 ? 0 : 12;
  const tax = Math.round(subtotal * 0.0825);
  const total = subtotal + shipping + tax;
  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  return { lines, subtotal, shipping, tax, total, count };
}
