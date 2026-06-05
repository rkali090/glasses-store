export type Product = {
  slug: string;
  name: string;
  collection: string;
  price: number;
  compareAt?: number;
  color: string;
  lens: string;
  fit: string;
  tags: string[];
  rating: number;
  reviews: number;
  gradient: string;
  description: string;
  features: string[];
};

export const products: Product[] = [
  { slug: "atlas-tortoise", name: "Atlas Tortoise", collection: "Signature Acetate", price: 149, compareAt: 189, color: "Warm tortoise", lens: "Blue-light or prescription ready", fit: "Medium / universal bridge", tags: ["Best seller", "Acetate", "Blue-light"], rating: 4.9, reviews: 384, gradient: "from-amber-200 via-stone-100 to-teal-100", description: "A timeless rectangular frame with hand-polished acetate and refined brass rivets.", features: ["Premium Italian acetate", "Anti-reflective lens coating", "Includes hard case and cloth"] },
  { slug: "noir-line", name: "Noir Line", collection: "Minimal Metal", price: 179, color: "Matte black", lens: "Polarized sun lenses", fit: "Narrow / adjustable nose pads", tags: ["Polarized", "Featherweight", "Sun"], rating: 4.8, reviews: 216, gradient: "from-slate-300 via-zinc-100 to-stone-200", description: "A lean stainless frame with polarized smoke lenses for sharp daily wear.", features: ["18g stainless construction", "Polarized UV400 protection", "Adjustable silicone pads"] },
  { slug: "sienna-round", name: "Sienna Round", collection: "Heritage Optical", price: 129, color: "Honey champagne", lens: "Prescription ready", fit: "Small-medium / keyhole bridge", tags: ["Prescription", "Lightweight", "Round"], rating: 4.7, reviews: 171, gradient: "from-orange-100 via-rose-50 to-yellow-100", description: "Soft round lenses and a translucent frame that feels editorial but wearable.", features: ["Spring hinges", "Thin acetate profile", "Virtual try-on ready layout"] },
  { slug: "coastal-green", name: "Coastal Green", collection: "Modern Classics", price: 159, compareAt: 199, color: "Deep sea green", lens: "Blue-light or clear demo", fit: "Wide / low bridge option", tags: ["Wide fit", "New", "Blue-light"], rating: 4.9, reviews: 92, gradient: "from-emerald-200 via-teal-50 to-stone-100", description: "A confident square silhouette in deep green acetate with elevated everyday comfort.", features: ["Low bridge option", "Scratch-resistant coating", "Two-year frame warranty"] },
  { slug: "aurora-gold", name: "Aurora Gold", collection: "Luxury Metal", price: 219, color: "Brushed champagne gold", lens: "Gradient sun lenses", fit: "Medium / adjustable nose pads", tags: ["Luxury", "Sun", "Metal"], rating: 4.8, reviews: 128, gradient: "from-yellow-100 via-stone-50 to-sky-100", description: "Architectural metalwork and gradient lenses for a refined travel-ready look.", features: ["Titanium-blend temples", "UV400 gradient lenses", "Premium travel case"] },
  { slug: "studio-clear", name: "Studio Clear", collection: "Creative Desk", price: 119, color: "Crystal clear", lens: "Blue-light filtering", fit: "Medium-wide / universal bridge", tags: ["Desk", "Blue-light", "Value"], rating: 4.6, reviews: 305, gradient: "from-blue-100 via-white to-amber-50", description: "Clean crystal frames built for long screen days and a polished studio aesthetic.", features: ["Blue-light filter", "Ultra-clear acetate", "30-day fit guarantee"] },
];

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
