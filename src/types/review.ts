export interface Review {
  id: string;
  name: string;
  location: string;
  productName: string;
  dateLabel: string; // e.g. "17-December-25"
  rating: number; // 1..5
  comment: string;
  tags: Array<"Response" | "Quality" | "Delivery">;
  sellerResponse?: {
    dateLabel: string;
    comment: string;
  };
  helpfulCount?: number;
  createdAt: number;
}

