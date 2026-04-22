import { Product } from "@/types/product";

export const WHATSAPP_NUMBERS = ["919823888629", "917709288629"] as const;

function imageLine(product?: Product) {
  if (!product?.image) return "";
  return product.image.startsWith("http")
    ? `Photo: ${product.image}`
    : "Photo: Shared in website listing";
}

export function buildQuoteMessage(product?: Product) {
  const lines = [
    "Hello Urja Enterprises, I want a quote.",
    product ? `Product: ${product.name}` : "",
    product?.category ? `Category: ${product.category}` : "",
    product?.productUrl ? `IndiaMart Link: ${product.productUrl}` : "",
    imageLine(product),
    "Please share price, availability and delivery timeline.",
  ].filter(Boolean);

  return lines.join("\n");
}

export function getWhatsAppUrl(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

