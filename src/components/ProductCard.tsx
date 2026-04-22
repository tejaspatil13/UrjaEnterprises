import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { QuoteDialog } from "./QuoteDialog";
import fallbackImage from "@/assets/product-circuit-breaker.jpg";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group bg-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col">
      <Link to={`/products/${product.id}`} className="block aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs font-medium text-accent uppercase tracking-wider mb-2">
          {product.category}
        </div>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-display font-semibold text-lg text-primary leading-snug mb-2 line-clamp-2 hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-muted-foreground">Price</div>
            <div className="font-semibold text-primary">{product.price} <span className="text-xs text-muted-foreground font-normal">/ {product.unit}</span></div>
          </div>
        </div>

        <div className="flex gap-2">
          <QuoteDialog product={product}>
            <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent-glow font-semibold">
              Get Quote
            </Button>
          </QuoteDialog>
          <Button asChild variant="outline" size="icon" aria-label="View details">
            <Link to={`/products/${product.id}`}>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
