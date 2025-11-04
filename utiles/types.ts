export type Laptop = {
  
  name?: string;
  brand: string;
  model: string;
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  display: string;
  weightKg: string;
  batteryHours: string;
  year: string;
  formFactor: string;
  os: string;
  match: number;
  plainSummary: string;
  pros: string;
  cons: string;
  priceAmazon: string;
  priceWorten: string;
  amazonLink: string;
  wortenLink: string;
  imageQuery: string;
  reason: string;
    // ✅ Add this line:
  imageUrl: string;
  
}
export type UsageType =
  | "gaming"
  | "office"
  | "design"
  | "general"
  | "programming"
  | "video editing"
  | "student"
  | "3d modeling"
  | "content creation"
  | "business travel"
  | "music production";



export type LaptopFormData = {
  usage: UsageType[];
  budget: [number, number]; // e.g., [1000, 3000]

  performance: "basic" | "moderate" | "high-end" | string;
  brand: string[]; };

  export function parsePriceRange(raw?: string) {
  if (!raw) return null;
  const match = raw.match(/([€$£])\s?([\d.,]+)\s?(?:-|to|–)\s?([\d.,]+)/i);
  if (!match) return null;
  const [, currency, minStr, maxStr] = match;
  const normalize = (s: string) => Number(s.replace(/[.,](?=.*\d{3}\b)/g, '').replace(',', '.'));
  return { currency, min: normalize(minStr), max: normalize(maxStr) };
}

export function bestAvailablePrice(p1?: string, p2?: string) {
  const a = parsePriceRange(p1);
  const b = parsePriceRange(p2);
  if (a && b) return a.min <= b.min ? { source: "Amazon", ...a } : { source: "Worten", ...b };
  if (a) return { source: "Amazon", ...a };
  if (b) return { source: "Worten", ...b };
  return null;
}

