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
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary">Urja Enterprises — Featured Products</h1>
            <p className="text-muted-foreground mt-1 max-w-xl text-sm sm:text-base">
              Quick access to our top-selling electrical equipment and spares directly from Urja Enterprises.
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

      {/* SEO CONTENT SECTION */}
      <section className="container-pro py-16 border-t border-border bg-card">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="space-y-6">
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary">
              Premium VCB Closing & Tripping Coils – Siemens, CGL Compatible
            </h1>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Urja Enterprises manufactures and supplies high-quality VCB closing coils and tripping coils suitable for Siemens, CGL, and other leading breaker brands. Our coils are designed for 11KV and 33KV systems with reliable performance.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-2xl text-primary">Our Product Range</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-lg">
              <li>VCB Closing & Tripping Coils (Siemens/CGL Compatible)</li>
              <li>VCB Spring Charging Mechanism & Spare Parts</li>
              <li>Auxiliary Switches & Limit Switches</li>
              <li>Epoxy Pole Assembly & Insulators</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl text-primary">Siemens VCB Compatible Coils</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our premium VCB tripping and closing coils are precisely engineered to be fully compatible with major Siemens VCB models, including the widely used 3AH series, 3WL series, and SION vacuum circuit breakers. They ensure immediate, reliable interruption of abnormal fault currents perfectly matching Siemens' exact specifications.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl text-primary">CGL 11KV VCB Trip & Close Coils</h2>
              <p className="text-muted-foreground leading-relaxed">
                We offer highly reliable Trip & Close Coils designed specifically for Crompton Greaves (CGL) 11KV Vacuum Circuit Breakers as well as various SF6 gas circuit breakers. Whether your CGL breaker requires rapid energy release or dependable shunt opening, our coils guarantee maximum lifecycle durability.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-2xl text-primary">Technical Specifications</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Parameter</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  <tr>
                    <td className="px-6 py-4 font-medium">Voltage Range</td>
                    <td className="px-6 py-4 text-muted-foreground">24V DC / 48V DC / 110V DC</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Suitable For</td>
                    <td className="px-6 py-4 text-muted-foreground">Siemens, CGL, ABB VCB</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Type</td>
                    <td className="px-6 py-4 text-muted-foreground">Closing Coil / Tripping Coil</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Breaker Type</td>
                    <td className="px-6 py-4 text-muted-foreground">VCB / SF6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl text-primary">Common Questions About VCB Coils</h2>
            <div className="space-y-5">
              <div className="bg-muted p-5 rounded-lg border border-border">
                <h3 className="font-semibold text-lg text-primary mb-2">How do I know if my tripping coil needs replacement?</h3>
                <p className="text-muted-foreground">
                  You may need a replacement if your circuit breaker fails to trip during a fault, shows sluggish opening times, or if the coil exhibits visible burn marks, physical damage, or low insulation resistance.
                </p>
              </div>
              <div className="bg-muted p-5 rounded-lg border border-border">
                <h3 className="font-semibold text-lg text-primary mb-2">Are these coils suitable for CGL 11 KV SF6 breakers?</h3>
                <p className="text-muted-foreground">
                  Yes, our trip and close coils are fully compatible. Finding a <strong>Trip Close Coil Suitable CGL SF6 Breaker</strong> is critical for system safety, and our components meet all essential operational ratings for CGL 11KV setups.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent-glow font-semibold w-full sm:w-auto text-lg h-14">
              <a href={quoteUrl} target="_blank" rel="noreferrer">
                📞 Contact Us for Price & Availability
              </a>
            </Button>
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
