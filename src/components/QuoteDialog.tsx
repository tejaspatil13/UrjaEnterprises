import { ReactElement } from "react";
import { Product } from "@/types/product";
import { buildQuoteMessage, getWhatsAppUrl, WHATSAPP_NUMBERS } from "@/lib/whatsapp";

interface Props {
  product?: Product;
  children: ReactElement;
}

export function QuoteDialog({ product, children }: Props) {
  const message = buildQuoteMessage(product);
  const primaryUrl = getWhatsAppUrl(WHATSAPP_NUMBERS[0], message);
  const secondaryUrl = getWhatsAppUrl(WHATSAPP_NUMBERS[1], message);

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        window.open(primaryUrl, "_blank", "noopener,noreferrer");
        window.open(secondaryUrl, "_blank", "noopener,noreferrer");
      }}
    >
      {children}
    </div>
  );
}
