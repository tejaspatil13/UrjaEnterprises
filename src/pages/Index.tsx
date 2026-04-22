import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";

import { getProducts } from "@/lib/products";
import { Product } from "@/types/product";
import { buildQuoteMessage, getWhatsAppUrl, WHATSAPP_NUMBERS } from "@/lib/whatsapp";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    document.title = "Urja Enterprises | Electrical Equipment & Circuit Breakers, Nashik";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "Urja Enterprises — Nashik-based supplier of SF6 circuit breakers, VCB panels, transformers and electrical spares. Get a quote today.");
    const load = async () => {
      const allProducts = await getProducts();
      // Prioritize motor, coil, and mechanism products
      const sorted = [...allProducts].sort((a, b) => {
        const isPriority = (p: Product) => {
          const str = (p.name + " " + p.category).toLowerCase();
          return str.includes("spring charging") || str.includes("coil") || str.includes("mechanism");
        };
        const pA = isPriority(a) ? 1 : 0;
        const pB = isPriority(b) ? 1 : 0;
        return pB - pA;
      });
      setProducts(sorted);
    };
    load();
  }, []);


  const quoteUrl = getWhatsAppUrl(WHATSAPP_NUMBERS[0], buildQuoteMessage());

  return (
    <Layout>
      {/* DIRECT PRODUCTS GRID */}
      <section className="container-pro pt-6 pb-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary">Featured Products</h1>
            <p className="text-muted-foreground mt-1 max-w-xl text-sm sm:text-base">
              Quick access to our top-selling electrical equipment and spares.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link to="/products">View Full Catalog <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
          {products.slice(0, 10).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link to="/products">View Full Catalog <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-gradient-surface border-y border-border">
        <div className="container-pro py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">About Urja Enterprises</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary mb-5">
              Engineering reliability into every product since 2015
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              With immense passion and dedication, Urja Enterprises started its venture in 2015 with the
              vision of introducing efficient electrical products. We supply premium-quality SF6 gas circuit
              breakers, Delco spring charging motors, VCB panel spares, current transformers, and indoor VCB panels.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Under the guidance of <span className="font-semibold text-primary">Mr. Ravindra Patil</span>,
              our team brings together experience, knowledge and resources to deliver favorable results
              for every client.
            </p>
            <Button asChild>
              <Link to="/about">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "2015", label: "Founded" },
              { num: "Nashik", label: "Headquartered" },
              { num: "Proprietor", label: "Business Type" },
              { num: "B2B", label: "Industry Focus" },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-lg p-6 shadow-card">
                <div className="font-display font-bold text-2xl text-primary">{s.num}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-pro py-20">
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-10 sm:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-accent opacity-10" />
          <div className="relative">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4 text-balance">
              Ready to power your next project?
            </h2>
            <p className="opacity-85 max-w-xl mx-auto mb-8">
              Send us your specifications and our team will respond with a tailored quote within 24 hours.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent-glow font-semibold">
              <a href={quoteUrl} target="_blank" rel="noreferrer">Request a Quote</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
