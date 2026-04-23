import { Product } from "@/types/product";

type RawCatalogItem = {
  name: string;
  price: string | null;
  price_unit: string;
  brand: string | null;
  specifications: Record<string, string>;
  image_url: string;
  product_url: string;
  description?: string;
  usage?: string;
  material?: string;
  features?: string[];
};

export const RAW_CATALOG: Array<{
  category: string;
  products: RawCatalogItem[];
}> = [
  {
    category: "Circuit Breaker",
    products: [
      {
        name: "38kv Vacuum Circuit Breaker",
        price: "₹ 5,00,000",
        price_unit: "Piece",
        brand: "ABB",
        specifications: { rated_current: "1250A/2000A", rated_voltage: "38kV", voltage_range_factor: "1 K" },
        image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/400153613/EX/IV/RB/22755035/38kv-vacuum-circuit-breaker-250x250.jpg",
        product_url: "https://www.indiamart.com/proddetail/38kv-vacuum-circuit-breaker-20799714948.html",
      },
      {
        name: "66Kv SF6 Gas Circuit Breaker",
        price: "₹ 8,00,000",
        price_unit: "Piece",
        brand: null,
        specifications: { rated_frequency: "50/60 Hz", rated_insulation_voltage: "66kV", classification: "Type B", power_rating: "Up to 2.5MVA" },
        image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/400961238/BQ/EC/UC/22755035/66kv-sf6-gas-circuit-breaker-250x250.jpg",
        product_url: "https://www.indiamart.com/proddetail/66kv-sf6-gas-circuit-breaker-20799633155.html",
      },
      {
        name: "145 kv SF6 Gas Circuit Breaker",
        price: "₹ 8,00,000",
        price_unit: "Piece",
        brand: null,
        specifications: { rated_voltage: "145kV", rated_current: "2000~4000A", rated_frequency: "50Hz/60Hz", poles_number: "3 Pole" },
        image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/400959428/QB/ZS/ES/22755035/145-kv-sf6-gas-circuit-breaker-250x250.jpg",
        product_url: "https://www.indiamart.com/proddetail/145-kv-sf6-gas-circuit-breaker-20799635355.html",
      },
      {
        name: "Porcelain Clad Vacuum Circuit Breaker",
        price: "₹ 1,45,000",
        price_unit: "Piece",
        brand: null,
        specifications: { making_capacity: "65.5 kAp", breaking_capacity: "Up to 31.5 kA", rated_current: "Up to 2000 A", rated_voltage: "Up to 36 kV" },
        image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/400158242/KQ/MA/CE/22755035/porcelain-clad-vacuum-circuit-breaker-250x250.jpg",
        product_url: "https://www.indiamart.com/proddetail/porcelain-clad-vacuum-circuit-breaker-20799697248.html",
      },
      {
        name: "33Kv Outdoor Vacuum Circuit Breaker",
        price: "₹ 2,45,000",
        price_unit: "Piece",
        brand: null,
        specifications: { rated_voltage: "33 kV", rated_current: "1250 A", making_capacity: "50 kApk", breaking_capacity: "30 kA" },
        image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/400160087/EH/AX/VF/22755035/33kv-outdoor-vacuum-circuit-breaker-250x250.jpg",
        product_url: "https://www.indiamart.com/proddetail/33kv-outdoor-vacuum-circuit-breaker-20799632573.html",
      },
      {
        name: "CG 12Kv Vacuum Circuit Breaker",
        price: "₹ 3,55,000",
        price_unit: "Piece",
        brand: "CG",
        specifications: { rated_voltage: "17.5 kV", rated_current: "4000 A", breaking_capacity: "50 kA" },
        image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/400156763/YG/KH/OD/22755035/cg-12kv-vacuum-circuit-breaker-250x250.jpg",
        product_url: "https://www.indiamart.com/proddetail/cg-12kv-vacuum-circuit-breaker-20800181462.html",
      },
    ],
  },
  {
    category: "Tripping Coil",
    products: [
      { name: "VCB Tripping Coil", price: "₹ 1,200", price_unit: "Piece", brand: null, specifications: { voltage: "24V / 48V / 110V / 220V (varies)" }, description: "Used in vacuum circuit breakers for tripping mechanism to interrupt electrical flow during faults.", material: "Copper Winding / Insulated Coil", usage: "Electrical Panels, Circuit Breakers", features: ["High durability", "Fast tripping response", "Heat resistant", "Reliable performance"], image_url: "https://5.imimg.com/data5/SELLER/Default/2023/1/AB/CD/EF/12345678/tripping-coil-500x500.jpg", product_url: "https://www.indiamart.com/proddetail/shunt-tripping-coil-2853663736755.html" },
      { name: "Closing Tripping Coil", price: "₹ 1,200", price_unit: "Piece", brand: null, specifications: {}, image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/401050974/WL/YT/ZO/22755035/closing-tripping-coil-125x125.jpeg", product_url: "https://www.indiamart.com/proddetail/closing-tripping-coil-2853663738030.html" },
      { name: "110v Dc Tripping Coil", price: "₹ 1,200", price_unit: "Piece", brand: null, specifications: { voltage: "110V DC" }, image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/399424409/EG/EL/VA/22755035/circuit-breakertripping-coil-125x125.jpeg", product_url: "https://www.indiamart.com/proddetail/110v-dc-tripping-coil-2853663774455.html" },
      { name: "Circuit Breaker Tripping Coil", price: "₹ 1,200", price_unit: "Piece", brand: null, specifications: {}, image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/399427441/CF/RS/ZG/22755035/circuit-breakertripping-coil-125x125.jpg", product_url: "https://www.indiamart.com/proddetail/circuit-breakertripping-coil-21029290591.html" },
    ],
  },
  {
    category: "Spring Charging Motor",
    products: [
      { name: "Delco Spring Charging Motor", price: "₹ 3,000", price_unit: "Piece", brand: "Delco", specifications: {}, image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/400162327/OB/YN/RS/22755035/delco-spring-charging-motor-125x125.jpeg", product_url: "https://www.indiamart.com/proddetail/delco-spring-charging-motor-20436359497.html" },
      { name: "Electric Spring Charging Motor", price: "₹ 3,000", price_unit: "Piece", brand: null, specifications: {}, image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/400976234/AH/LZ/NB/22755035/electric-spring-charging-motor-125x125.jpeg", product_url: "https://www.indiamart.com/proddetail/electric-spring-charging-motor-20436359262.html" },
      { name: "Spring Charging Motor for VCB", price: "₹ 3,500 - 5,000", price_unit: "Piece", brand: null, specifications: { power: "AC/DC Motor", voltage: "110V / 220V", color: "Silver" }, description: "Motor used for charging the spring mechanism in circuit breakers to enable automatic operation.", usage: "VCB Mechanism Charging", features: ["High efficiency", "Low maintenance", "Compact design", "Robust construction"], image_url: "https://5.imimg.com/data5/SELLER/Default/2023/1/AB/CD/EF/12345678/spring-charging-motor-500x500.jpg", product_url: "https://www.indiamart.com/proddetail/spring-charging-motor-2853663851948.html" },
      { name: "Spring Charging Mechanism", price: "₹ 15,500", price_unit: "Piece", brand: null, specifications: {}, image_url: "https://5.imimg.com/data5/ZY/XM/XC/IOS-22755035/product-jpeg-125x125.png", product_url: "https://www.indiamart.com/proddetail/spring-charging-mechanism-21996362712.html" },
    ],
  },
  {
    category: "Current Transformer",
    products: [
      { name: "Outdoor Current Transformer", price: "₹ 1,200", price_unit: "Piece", brand: null, specifications: {}, image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/401046463/EF/HR/NE/22755035/outdoor-current-transformer-125x125.jpg", product_url: "https://www.indiamart.com/proddetail/outdoor-current-transformer-20799652930.html" },
      { name: "33KV Outdoor Current Transformer", price: "₹ 33,000", price_unit: "Piece", brand: null, specifications: { rated_voltage: "33kV" }, image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/400972574/GS/JQ/SX/22755035/33kv-outdoor-current-transformer-125x125.jpg", product_url: "https://www.indiamart.com/proddetail/33kv-outdoor-current-transformer-20799663397.html" },
    ],
  },
  {
    category: "Switches",
    products: [
      { name: "TNC (Trip Neutral Close) Single Pole", price: "₹ 700", price_unit: "Piece", brand: null, specifications: { poles: "Single Pole", type: "TNC - Trip Neutral Close" }, image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/397848464/CQ/CV/JU/22755035/tnc-trip-neutral-close-single-pole-125x125.jpeg", product_url: "https://www.indiamart.com/proddetail/tnc-trip-neutral-close-single-pole-2853613048991.html" },
    ],
  },
  {
    category: "VCB Panel Spares",
    products: [
      { name: "VCB Panel Spare Parts Kit", price: "₹ 2,400", price_unit: "Piece", brand: null, specifications: { components: "Auxiliary contacts, Insulators, Mechanical linkages, Contact assemblies" }, description: "Complete set of spare components used in Vacuum Circuit Breaker panels for maintenance and replacement.", material: "Mild Steel / Electrical Grade Components", usage: "VCB Panel Maintenance", features: ["High precision components", "Long service life", "Compatible with multiple panels", "Easy installation"], image_url: "https://5.imimg.com/data5/SELLER/Default/2023/1/AB/CD/EF/12345678/vcb-panel-spares-500x500.jpg", product_url: "https://www.indiamart.com/proddetail/vcb-panel-spares-20436359088.html" },
    ],
  },
  {
    category: "Vacuum Circuit Breaker",
    products: [
      { name: "Crompton Greaves Vacuum Circuit Breaker", price: "₹ 3,55,000", price_unit: "Piece", brand: "Crompton Greaves", specifications: {}, image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/400156249/LD/EH/UG/22755035/crompton-greaves-vacuum-circuit-breaker-125x125.jpg", product_url: "https://www.indiamart.com/proddetail/crompton-greaves-vacuum-circuit-breaker-22113435891.html" },
    ],
  },
  {
    category: "ABB Shunt Opening Release",
    products: [
      { name: "ABB Opening Release Shunt", price: "₹ 6,500", price_unit: "Piece", brand: "ABB", specifications: {}, image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/400970153/IT/ER/XR/22755035/abb-opening-release-shunt-125x125.jpg", product_url: "https://www.indiamart.com/proddetail/abb-opening-release-shunt-20799707748.html" },
    ],
  },
  {
    category: "Potential Transformer",
    products: [
      { name: "11kv Indoor Double Pole Potential Transformer", price: "₹ 19,000", price_unit: "Piece", brand: null, specifications: { rated_voltage: "11kV", installation: "Indoor", poles: "Double Pole" }, image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/400153020/MC/NZ/UB/22755035/11kv-indoor-double-pole-potential-transformer-125x125.jpg", product_url: "https://www.indiamart.com/proddetail/11kv-indoor-double-pole-potential-transformer-20799698597.html" },
    ],
  },
  {
    category: "Busbar Support",
    products: [
      { name: "Busbar Support Insulator", price: null, price_unit: "Piece", brand: null, specifications: {}, image_url: "https://5.imimg.com/data5/SELLER/Default/2024/5/418683178/HX/WB/ZV/22755035/busbar-support-insulator-125x125.jpeg", product_url: "https://www.indiamart.com/proddetail/busbar-support-insulator-2854075525055.html" },
    ],
  },
  {
    category: "Voltage Transformer",
    products: [
      { name: "Capacitive Voltage Transformer", price: "₹ 1,00,000", price_unit: "Piece", brand: null, specifications: {}, image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/400159476/SL/FR/LZ/22755035/capacitive-voltage-transformer-125x125.png", product_url: "https://www.indiamart.com/proddetail/capacitive-voltage-transformer-20799640788.html" },
    ],
  },
  {
    category: "MCB",
    products: [
      { name: "TNC (Trip Neutral Close) Double Pole", price: "₹ 800", price_unit: "Piece", brand: null, specifications: { poles: "Double Pole", type: "TNC - Trip Neutral Close" }, image_url: "https://5.imimg.com/data5/SELLER/Default/2024/3/397849889/MY/FO/BJ/22755035/tnc-trip-neutral-close-double-pole-125x125.jpeg", product_url: "https://www.indiamart.com/proddetail/tnc-trip-neutral-close-double-pole-2853613066488.html" },
    ],
  },
];

export const createSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const CATALOG_PRODUCTS: Product[] = RAW_CATALOG.flatMap((entry, categoryIndex) =>
  entry.products.map((item, itemIndex) => ({
    id: createSlug(item.name),
    name: item.name,
    category: entry.category,
    subCategory: item.name,
    productInfo: item.features?.length ? item.features.join(" • ") : `${item.name} (${entry.category})`,
    description: item.description ?? `${item.name} supplied by Urja Enterprises, Nashik.`,
    price: item.price ?? "Price on Request",
    unit: item.price_unit,
    image: item.image_url,
    productUrl: item.product_url,
    specifications: item.specifications,
    voltage: item.specifications.rated_voltage ?? item.specifications.voltage,
    brand: item.brand ?? "Urja Enterprises",
    usage: item.usage ?? "Industrial & utility applications",
    material: item.material ?? "Industrial grade components",
    phase: "As per model",
    countryOfOrigin: "India",
    priceTable: [
      {
        variant: "Standard",
        specification: item.name,
        unit: item.price_unit,
        price: item.price ?? "Price on Request",
        availability: "Inquire",
      },
    ],
    createdAt: Date.now() - (categoryIndex * 10000 + itemIndex * 1000),
  }))
);

export const CATALOG_CATEGORY_MAP: Record<string, string[]> = RAW_CATALOG.reduce<Record<string, string[]>>(
  (acc, curr) => {
    acc[curr.category] = curr.products.map((p) => p.name);
    return acc;
  },
  {}
);

