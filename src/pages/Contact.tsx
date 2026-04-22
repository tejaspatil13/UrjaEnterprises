import { useEffect, useState } from "react";
import { Mail, MapPin, Phone, Clock, FileText } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  useEffect(() => { document.title = "Contact Us | Urja Enterprises"; }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message sent!", { description: "We'll respond within 24 hours." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 700);
  };

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground">
        <div className="container-pro py-16">
          <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">Get in Touch</div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-3">Contact Us</h1>
          <p className="opacity-85 max-w-2xl">We'd love to hear from you. Send us a message and our team will get back to you shortly.</p>
        </div>
      </section>

      <section className="container-pro py-16 grid lg:grid-cols-5 gap-10">
        <aside className="lg:col-span-2 space-y-5">
          {[
            { icon: MapPin, title: "Address", value: "401, Samarth Heights, Watala, Pathardi Road, Indira Nagar, Nashik, Maharashtra 422009, India" },
            { icon: Phone, title: "Phone", value: "+91 98238 88629", href: "tel:9823888629" },
            { icon: Mail, title: "Email", value: "Vaishnotej629@gmail.com", href: "mailto:Vaishnotej629@gmail.com" },
            { icon: FileText, title: "GST Number", value: "27AIXPP3393C1ZQ" },
            { icon: Clock, title: "Business Hours", value: "Mon – Sat: 9:30 AM – 7:00 PM" },
          ].map((c) => (
            <div key={c.title} className="bg-card border border-border rounded-lg p-5 shadow-card flex gap-4">
              <div className="h-10 w-10 rounded-md bg-accent/10 text-accent grid place-items-center shrink-0">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display font-semibold text-primary mb-1">{c.title}</div>
                {c.href ? (
                  <a href={c.href} className="text-sm text-muted-foreground hover:text-accent break-all">{c.value}</a>
                ) : (
                  <div className="text-sm text-muted-foreground">{c.value}</div>
                )}
              </div>
            </div>
          ))}
        </aside>

        <form onSubmit={handleSubmit} className="lg:col-span-3 bg-card border border-border rounded-lg p-8 shadow-card grid gap-5">
          <h2 className="font-display font-bold text-2xl text-primary">Send us a message</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full name *</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            </div>
          </div>
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea id="message" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <Button type="submit" disabled={submitting} size="lg" className="bg-accent text-accent-foreground hover:bg-accent-glow font-semibold w-full sm:w-auto">
            {submitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </section>
    </Layout>
  );
};

export default Contact;
