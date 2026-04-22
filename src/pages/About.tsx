import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { Layout } from "@/components/Layout";
import companyImage from "@/assets/hero-substation.jpg";
import { addReview, getReviews } from "@/lib/reviews";
import { Review } from "@/types/review";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const About = () => {
  useEffect(() => { document.title = "About Us | Urja Enterprises"; }, []);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    productName: "",
    dateLabel: "",
    rating: "5",
    comment: "",
  });

  useEffect(() => {
    const load = async () => setReviews(await getReviews());
    load();
    window.addEventListener("urja:reviews-updated", load);
    return () => window.removeEventListener("urja:reviews-updated", load);
  }, []);

  const sorted = useMemo(() => {
    return [...reviews].sort((a, b) => b.createdAt - a.createdAt);
  }, [reviews]);

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground">
        <div className="container-pro py-16">
          <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">About Us</div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-3">Built on trust, powered by expertise</h1>
          <p className="opacity-85 max-w-2xl">Urja Enterprises has been a trusted name in electrical equipment supply since 2015.</p>
        </div>
      </section>

      <section className="container-pro py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-5 text-foreground/85 leading-relaxed">
          <p>
            Founded in <strong>2015</strong>, <strong className="text-primary">Urja Enterprises</strong> has built a well-known position as a trader-retailer and exporter of electrical products across Maharashtra and beyond.
          </p>
          <p>
            We deal in circuit breakers, spring charging motors, tripping coils, current transformers, VCB panel spares and allied HT electrical equipment. Our team supports customer requirements with practical recommendations and timely delivery.
          </p>
          <p>
            Guided by <strong className="text-primary">Mr. R Patil</strong>, we maintain quality-focused operations with customer-first service. Our major strengths include premium products, quick response and multiple payment/shipment options.
          </p>
        </div>

        <aside className="bg-card border border-border rounded-lg p-6 shadow-card h-fit">
          <h3 className="font-display font-semibold text-primary mb-4">Company Snapshot</h3>
          <dl className="space-y-3 text-sm">
            {[
              ["Founded", "2015"],
              ["Nature of Business", "Trader - Retailer"],
              ["CEO", "R Patil"],
              ["Location", "Nashik - 422009, Maharashtra"],
              ["GST Number", "27AIXPP3393C1ZQ"],
              ["Employees", "Upto 10 People"],
              ["Annual Turnover", "40 L - 1.5 Cr"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium text-primary text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section className="container-pro py-16">
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-card">
          <h2 className="font-display font-bold text-2xl text-primary mb-6">User Review Summary</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="text-4xl font-display font-bold text-primary">4.3/5</div>
              <p className="text-sm text-muted-foreground mt-1">Overall rating from 51 total ratings</p>
              <div className="mt-5 space-y-3">
                {[
                  ["5 Star", 68],
                  ["4 Star", 12],
                  ["3 Star", 8],
                  ["2 Star", 2],
                  ["1 Star", 10],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-4">User Satisfaction Ratings</h3>
              <div className="space-y-4">
                {[
                  ["Response", 94],
                  ["Quality", 90],
                  ["Delivery", 88],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-pro pb-16">
        <div className="grid lg:grid-cols-[1fr,420px] gap-8 items-start">
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-card">
            <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
              <div>
                <h2 className="font-display font-bold text-2xl text-primary">Customer Reviews</h2>
                <p className="text-sm text-muted-foreground">Latest customer feedback.</p>
              </div>
            </div>

            {sorted.length === 0 ? (
              <div className="text-sm text-muted-foreground">No reviews yet.</div>
            ) : (
              <ul className="space-y-4">
                {sorted.map((r) => (
                  <li key={r.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-primary">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1 text-accent">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} className={`h-4 w-4 ${idx < r.rating ? "fill-current" : "opacity-30"}`} />
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{r.dateLabel} | Product Name : {r.productName}</div>
                      </div>
                    </div>

                    {(r.tags?.length ?? 0) > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {r.tags.map((t) => (
                          <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-muted text-muted-foreground">{t}</span>
                        ))}
                      </div>
                    )}

                    {r.comment && (
                      <p className="text-sm text-foreground/85 mt-3 leading-relaxed">{r.comment}</p>
                    )}

                    {typeof r.helpfulCount === "number" && r.helpfulCount > 0 && (
                      <div className="text-xs text-muted-foreground mt-3">{r.helpfulCount} user found this helpful</div>
                    )}

                    {r.sellerResponse && (
                      <div className="mt-4 rounded-md bg-muted p-3 text-sm">
                        <div className="font-medium text-primary">Response from Seller ({r.sellerResponse.dateLabel})</div>
                        <div className="text-muted-foreground mt-1">{r.sellerResponse.comment}</div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-card">
            <h3 className="font-display font-bold text-xl text-primary mb-2">Add a Review</h3>
            <p className="text-sm text-muted-foreground mb-6">Share your experience with Urja Enterprises.</p>

            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                try {
                  await addReview({
                    name: form.name.trim(),
                    location: form.location.trim(),
                    productName: form.productName.trim(),
                    dateLabel: form.dateLabel.trim(),
                    rating: Math.max(1, Math.min(5, Number(form.rating || 5))),
                    comment: form.comment.trim(),
                    tags: [],
                  });
                  setForm({ name: "", location: "", productName: "", dateLabel: "", rating: "5", comment: "" });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div>
                <Label htmlFor="r-name">Name</Label>
                <Input id="r-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="r-loc">Location</Label>
                <Input id="r-loc" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="r-prod">Product Name</Label>
                <Input id="r-prod" value={form.productName} onChange={(e) => setForm((f) => ({ ...f, productName: e.target.value }))} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="r-date">Date (e.g. 18-February-21)</Label>
                  <Input id="r-date" value={form.dateLabel} onChange={(e) => setForm((f) => ({ ...f, dateLabel: e.target.value }))} required />
                </div>
                <div>
                  <Label htmlFor="r-rating">Rating (1-5)</Label>
                  <Input id="r-rating" type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))} required />
                </div>
              </div>
              <div>
                <Label htmlFor="r-comment">Comment</Label>
                <Textarea id="r-comment" rows={3} value={form.comment} onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))} />
              </div>

              <Button type="submit" disabled={submitting} className="w-full bg-accent text-accent-foreground hover:bg-accent-glow font-semibold">
                {submitting ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default About;
