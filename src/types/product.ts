export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  productInfo?: string;
  description: string;
  price: string;
  unit: string;
  image: string;
  productUrl?: string;
  specifications?: Record<string, string>;
  voltage?: string;
  brand?: string;
  usage?: string;
  material?: string;
  phase?: string;
  countryOfOrigin?: string;
  priceTable?: ProductPriceRow[];
  createdAt: number;
}

export interface ProductPriceRow {
  variant: string;
  specification: string;
  unit: string;
  price: string;
  availability: string;
}

export const CATEGORIES = [
  "Circuit Breaker",
  "Tripping Coil",
  "Spring Charging Motor",
  "Current Transformer",
  "Switches",
  "VCB Panel Spares",
  "Vacuum Circuit Breaker",
  "ABB Shunt Opening Release",
  "Potential Transformer",
  "Busbar Support",
  "Voltage Transformer",
  "MCB",
] as const;
