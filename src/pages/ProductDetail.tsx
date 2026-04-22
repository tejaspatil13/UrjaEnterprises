import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Phone, Mail } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { QuoteDialog } from "@/components/QuoteDialog";
import { getProduct } from "@/lib/products";
import { Product } from "@/types/product";
import fallbackImage from "@/assets/product-circuit-breaker.jpg";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>();

  useEffect(() => {
    if (!id) return;
    const loadProduct = async () => {
      const p = await getProduct(id);
      setProduct(p);
      if (p) document.title = `${p.name} | Urja Enterprises`;
    };
    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div className="container-pro py-32 text-center">
          <h1 className="font-display text-2xl text-primary mb-4">Product not found</h1>
          <Button asChild><Link to="/products">Back to Products</Link></Button>
        </div>
      </Layout>
    );
  }

  const specs = [
    { label: "Brand", value: product.brand },
    { label: "Voltage", value: product.voltage },
    { label: "Phase", value: product.phase },
    { label: "Material", value: product.material },
    { label: "Usage / Application", value: product.usage },
    { label: "Country of Origin", value: product.countryOfOrigin },
    { label: "Category", value: product.category },
    { label: "Sub-Category", value: product.subCategory },
    { label: "IndiaMART Link", value: product.productUrl },
  ].filter((s) => s.value);

  const dynamicSpecifications = Object.entries(product.specifications ?? {});

  const priceRows = product.priceTable ?? [
    {
      variant: "Standard",
      specification: product.subCategory,
      unit: product.unit,
      price: product.price,
      availability: "Inquire",
    },
  ];

  return (
    <Layout>
      <div className="container-pro py-8">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to="/products"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Products</Link>
        </Button>

        <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary mb-2">{product.name}</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>
        {product.productInfo && (
          <p className="text-sm text-foreground/80 mb-8">{product.productInfo}</p>
        )}

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-muted rounded-lg overflow-hidden border border-border">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover aspect-square"
              width={800}
              height={800}
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">Price Table</div>
              <div className="rounded-lg border border-border bg-card p-4">
                <dl className="space-y-3 text-sm">
                  {priceRows.map((row, idx) => (
                    <div key={`${row.variant}-${idx}`} className="border-b border-border pb-3 last:border-0">
                      <div className="grid grid-cols-2 gap-2">
                        <dt className="text-muted-foreground">Variant</dt>
                        <dd className="font-medium text-primary text-right">{row.variant}</dd>
                        <dt className="text-muted-foreground">Specification</dt>
                        <dd className="font-medium text-primary text-right">{row.specification}</dd>
                        <dt className="text-muted-foreground">Unit</dt>
                        <dd className="font-medium text-primary text-right">{row.unit}</dd>
                        <dt className="text-muted-foreground">Price</dt>
                        <dd className="font-medium text-primary text-right">{row.price}</dd>
                        <dt className="text-muted-foreground">Availability</dt>
                        <dd className="font-medium text-primary text-right">{row.availability}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl text-primary mb-4">Product Specifications</h2>
              <div className="bg-card border border-border rounded-lg overflow-hidden shadow-card">
                <dl className="divide-y divide-border">
                  {specs.map((spec) => (
                    <div key={spec.label} className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4">
                      <dt className="text-sm font-medium text-muted-foreground">{spec.label}</dt>
                      <dd className="sm:col-span-2 text-sm font-medium text-primary">{spec.value}</dd>
                    </div>
                  ))}
                  {dynamicSpecifications.map(([key, value]) => (
                    <div key={key} className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4">
                      <dt className="text-sm font-medium text-muted-foreground">{key.replaceAll("_", " ")}</dt>
                      <dd className="sm:col-span-2 text-sm font-medium text-primary">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <QuoteDialog product={product}>
                <Button size="lg" className="flex-1 bg-accent text-accent-foreground hover:bg-accent-glow font-semibold">
                  Get Quote
                </Button>
              </QuoteDialog>
              <Button asChild size="lg" variant="outline">
                <a href="tel:9823888629"><Phone className="mr-2 h-4 w-4" /> Call</a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              {["Quality Assured", "Pan-India Delivery", "Expert Support"].map((b) => (
                <div key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full">
                  <CheckCircle2 className="h-3 w-3 text-success" /> {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-12 bg-card border border-border rounded-xl p-6">
          <h3 className="font-display font-bold text-xl text-primary mb-3">Company Information</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Urja Enterprises is a Nashik, Maharashtra based trader-retailer and exporter with focus on
            circuit breaker systems, tripping coils, spring charging motors, current transformers and
            panel spares. We provide reliable stock support, product guidance and timely delivery.
          </p>
        </section>

        {/* CONTACT BLOCK */}
        <section className="mt-12 bg-primary text-primary-foreground rounded-2xl p-8 grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-display font-bold text-xl mb-2">Need more details?</h3>
            <p className="opacity-80 text-sm">Our team is ready to help with technical specifications, bulk pricing and delivery timelines.</p>
          </div>
          <div className="space-y-2 sm:text-right">
            <a href="tel:9823888629" className="flex sm:justify-end items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4" /> +91 98238 88629
            </a>
            <a href="mailto:Vaishnotej629@gmail.com" className="flex sm:justify-end items-center gap-2 hover:text-accent transition-colors break-all">
              <Mail className="h-4 w-4" /> Vaishnotej629@gmail.com
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetail;
