import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { QuoteDialog } from "@/components/QuoteDialog";
import { getProducts } from "@/lib/products";
import { Product } from "@/types/product";
import { buildQuoteMessage, getWhatsAppUrl, WHATSAPP_NUMBERS } from "@/lib/whatsapp";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);

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
      setProducts(await getProducts());
    };
    load();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const timer = window.setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % Math.min(products.length, 5));
    }, 3500);
    return () => window.clearInterval(timer);
  }, [products]);

  const featured = products.slice(0, 5);
  const quoteUrl = getWhatsAppUrl(WHATSAPP_NUMBERS[0], buildQuoteMessage());

  return (
    <Layout>
      {/* PRODUCTS SHOWCASE */}
      <section className="container-pro py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">Our Catalog</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary">Featured Products Showcase</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Auto-swiping product highlights with quick quote access.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/products">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        {featured.length > 0 && (
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-card mb-8">
            <div className="grid md:grid-cols-2 gap-4 p-5 md:p-8 items-center">
              <div className="bg-muted rounded-lg overflow-hidden">
                <img
                  src={featured[featuredIndex].image}
                  alt={featured[featuredIndex].name}
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
              <div>
                <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                  {featured[featuredIndex].category}
                </div>
                <h3 className="font-display font-bold text-2xl text-primary mb-3">
                  {featured[featuredIndex].name}
                </h3>
                <p className="text-muted-foreground mb-5">
                  {featured[featuredIndex].description}
                </p>
                <div className="flex gap-3">
                  <QuoteDialog product={featured[featuredIndex]}>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent-glow font-semibold">
                      Get Quote
                    </Button>
                  </QuoteDialog>
                  <Button asChild variant="outline">
                    <Link to={`/products/${featured[featuredIndex].id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 pb-5">
              {featured.map((item, idx) => (
                <button
                  key={item.id}
                  aria-label={`Go to ${item.name}`}
                  onClick={() => setFeaturedIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${featuredIndex === idx ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/40"}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
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
