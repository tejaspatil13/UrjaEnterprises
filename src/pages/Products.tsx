import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getProducts, PRODUCT_CATALOG } from "@/lib/products";
import { Product, CATEGORIES } from "@/types/product";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [subCategory, setSubCategory] = useState<string>("All");

  useEffect(() => {
    document.title = "Products | Urja Enterprises";
    const refresh = async () => setProducts(await getProducts());
    refresh();
    window.addEventListener("urja:products-updated", refresh);
    return () => window.removeEventListener("urja:products-updated", refresh);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQ = query === "" || p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase());
      const matchesC = category === "All" || p.category === category;
      const matchesSC = subCategory === "All" || p.subCategory === subCategory;
      return matchesQ && matchesC && matchesSC;
    });
  }, [products, query, category, subCategory]);

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground">
        <div className="container-pro py-16">
          <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">Catalog</div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-3">Our Products</h1>
          <p className="opacity-85 max-w-2xl">Browse our complete range of electrical equipment, circuit breakers, transformers and panel spares.</p>
        </div>
      </section>

      <section className="container-pro py-12">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        <div className="grid lg:grid-cols-[280px,1fr] gap-8">
          <aside className="h-fit lg:sticky lg:top-24 rounded-lg border border-border bg-card p-4 shadow-card">
            <h2 className="font-display font-semibold text-primary mb-3">Product Categories</h2>
            <div className="space-y-2">
              <Button
                variant={category === "All" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setCategory("All");
                  setSubCategory("All");
                }}
              >
                All Products
              </Button>
              {CATEGORIES.map((c) => (
                <div key={c} className="rounded-md border border-border p-2">
                  <Button
                    variant={category === c ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setCategory(c);
                      setSubCategory("All");
                    }}
                  >
                    {c}
                  </Button>
                  {category === c && (
                    <div className="mt-2 space-y-1">
                      <Button
                        variant={subCategory === "All" ? "secondary" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSubCategory("All")}
                      >
                        All in {c}
                      </Button>
                      {(PRODUCT_CATALOG[c] ?? []).map((sc) => (
                        <Button
                          key={sc}
                          variant={subCategory === sc ? "secondary" : "ghost"}
                          size="sm"
                          className="w-full justify-start whitespace-normal h-auto py-1.5"
                          onClick={() => setSubCategory(sc)}
                        >
                          {sc}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {(["All", ...CATEGORIES] as string[]).map((c) => (
                <Button
                  key={c}
                  variant={category === c ? "default" : "outline"}
                  onClick={() => {
                    setCategory(c);
                    setSubCategory("All");
                  }}
                  size="sm"
                  className={category === c ? "bg-primary text-primary-foreground" : ""}
                >
                  {c}
                </Button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                No products match your current filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
