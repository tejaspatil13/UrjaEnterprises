import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Package, Lock, Database, Pencil } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import { addProduct, deleteProduct, getProducts, updateProduct } from "@/lib/products";
import { CATEGORIES, Product } from "@/types/product";
import { toast } from "sonner";
import { setupFirebaseDatabase } from "@/lib/databaseSetup";
import { signInOrCreateUser, signInWithGoogle } from "@/lib/auth";
import { useAuth } from "@/lib/authContext";

const empty = {
  name: "",
  category: "Circuit Breaker",
  subCategory: "",
  description: "",
  price: "Ask Price",
  unit: "Unit",
  image: "",
  voltage: "",
  brand: "",
  usage: "",
  material: "",
  phase: "",
  countryOfOrigin: "India",
};

const Admin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(empty);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [settingUpDb, setSettingUpDb] = useState(false);
  const [tab, setTab] = useState<"add" | "manage">("manage");
  const [editingId, setEditingId] = useState<string | null>(null);
  const { user, loading, role, roleLoading } = useAuth();

  useEffect(() => { document.title = "Admin | Urja Enterprises"; }, []);

  useEffect(() => {
    if (loading || roleLoading) return;
    if (user && role !== "admin") navigate("/products");
  }, [user, role, loading, roleLoading, navigate]);

  useEffect(() => {
    setTab(role === "admin" ? "add" : "manage");
  }, [role]);

  useEffect(() => {
    if (!user || role !== "admin") return;
    const load = async () => {
      setProducts(await getProducts());
    };
    load();
    window.addEventListener("urja:products-updated", load);
    return () => window.removeEventListener("urja:products-updated", load);
  }, [user, role]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setForm((f) => ({ ...f, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) {
      toast.error("Please upload a product image");
      return;
    }
    if (editingId) {
      const existing = products.find((p) => p.id === editingId);
      if (!existing) {
        toast.error("Product not found for edit");
        return;
      }
      await updateProduct({
        ...existing,
        ...form,
        id: existing.id,
        createdAt: existing.createdAt,
      });
      toast.success("Product updated!");
    } else {
      await addProduct(form);
      toast.success("Product added!");
    }
    setForm(empty);
    setImagePreview("");
    setEditingId(null);
    setProducts(await getProducts());
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
    setProducts(await getProducts());
    toast.success("Product deleted");
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      name: p.name ?? "",
      category: p.category ?? "Circuit Breaker",
      subCategory: p.subCategory ?? "",
      description: p.description ?? "",
      price: p.price ?? "Ask Price",
      unit: p.unit ?? "Unit",
      image: p.image ?? "",
      voltage: p.voltage ?? "",
      brand: p.brand ?? "",
      usage: p.usage ?? "",
      material: p.material ?? "",
      phase: p.phase ?? "",
      countryOfOrigin: p.countryOfOrigin ?? "India",
    });
    setImagePreview(p.image ?? "");
    setTab("add");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(empty);
    setImagePreview("");
  };

  const handleSetupDatabase = async () => {
    try {
      setSettingUpDb(true);
      const result = await setupFirebaseDatabase();
      toast.success(
        `Firebase setup complete: ${result.adminsCreated} admins, ${result.normalUsersCreated} users, ${result.productsUpserted} products`
      );
      setProducts(await getProducts());
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to setup Firebase database";
      toast.error(message);
    } finally {
      setSettingUpDb(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container-pro py-20 max-w-md">
          <div className="bg-card border border-border rounded-lg p-8 shadow-card">
            <div className="h-12 w-12 rounded-md bg-accent/10 text-accent grid place-items-center mb-4">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="font-display font-bold text-2xl text-primary mb-2">Sign In</h1>
            <p className="text-sm text-muted-foreground mb-6">Use email and password to sign in. New users are auto-created.</p>
            <Button
              type="button"
              variant="outline"
              className="w-full mb-4"
              onClick={async () => {
                try {
                  const result = await signInWithGoogle();
                  toast.success(result.role === "admin" ? "Signed in as Admin" : "Signed in as User");
                  navigate(result.role === "admin" ? "/admin" : "/products");
                } catch (error) {
                  const message = error instanceof Error ? error.message : "Google sign-in failed";
                  toast.error(message);
                }
              }}
            >
              Continue with Google
            </Button>
            <div className="text-center text-xs text-muted-foreground mb-4">or</div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                const result = await signInOrCreateUser(email, pass);
                toast.success(result.role === "admin" ? "Signed in as Admin" : "Signed in as User");
                navigate(result.role === "admin" ? "/admin" : "/products");
              } catch (error) {
                const message = error instanceof Error ? error.message : "Sign in failed";
                toast.error(message);
              }
            }} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="pass">Password</Label>
                <Input id="pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-primary">Sign In</Button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  if (roleLoading) {
    return (
      <Layout>
        <div className="container-pro py-16 text-muted-foreground">Loading...</div>
      </Layout>
    );
  }

  if (role !== "admin") {
    return null;
  }

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground">
        <div className="container-pro py-12 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">Dashboard</div>
            <h1 className="font-display font-bold text-3xl">Admin Panel</h1>
            <p className="text-xs opacity-80 mt-1">Signed in as admin: {user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={handleSetupDatabase}
              disabled={settingUpDb}
            >
              <Database className="h-4 w-4 mr-2" />
              {settingUpDb ? "Setting up..." : "Setup Firebase DB"}
            </Button>
          </div>
        </div>
      </section>

      <section className="container-pro py-10">
        <Tabs value={tab} onValueChange={(v) => setTab(v as "add" | "manage")}>
          <TabsList className="mb-6">
            <TabsTrigger value="add"><Plus className="h-4 w-4 mr-2" /> Add Product</TabsTrigger>
            <TabsTrigger value="manage"><Package className="h-4 w-4 mr-2" /> Manage ({products.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="add">
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 sm:p-8 shadow-card grid gap-5">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="font-display font-bold text-xl text-primary">
                  {editingId ? "Edit Product" : "New Product"}
                </h2>
                {editingId && (
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    Cancel Edit
                  </Button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Category *</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sub">Sub-Category</Label>
                  <Input id="sub" value={form.subCategory} onChange={(e) => setForm({ ...form, subCategory: e.target.value })} />
                </div>
              </div>

              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>

              <div>
                <Label htmlFor="desc">Description *</Label>
                <Textarea id="desc" rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input id="price" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. ₹25,000 or Ask Price" />
                </div>
                <div>
                  <Label htmlFor="unit">Unit *</Label>
                  <Input id="unit" required value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="Piece / Unit / Set" />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="voltage">Voltage</Label>
                  <Input id="voltage" value={form.voltage} onChange={(e) => setForm({ ...form, voltage: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="phase">Phase</Label>
                  <Input id="phase" value={form.phase} onChange={(e) => setForm({ ...form, phase: e.target.value })} />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="material">Material</Label>
                  <Input id="material" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="usage">Usage / Application</Label>
                  <Input id="usage" value={form.usage} onChange={(e) => setForm({ ...form, usage: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="origin">Country of Origin</Label>
                  <Input id="origin" value={form.countryOfOrigin} onChange={(e) => setForm({ ...form, countryOfOrigin: e.target.value })} />
                </div>
              </div>

              <div>
                <Label htmlFor="img">Product Image *</Label>
                <Input id="img" type="file" accept="image/*" onChange={handleImage} />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-3 h-32 w-32 object-cover rounded border border-border" />
                )}
              </div>

              <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent-glow font-semibold sm:w-fit">
                <Plus className="h-4 w-4 mr-2" /> {editingId ? "Save Changes" : "Add Product"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="manage">
            <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
              {products.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">No products yet.</div>
              ) : (
                <ul className="divide-y divide-border">
                  {products.map((p) => (
                    <li key={p.id} className="flex items-center gap-4 p-4">
                      <img src={p.image} alt={p.name} className="h-16 w-16 object-cover rounded border border-border shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-accent font-semibold uppercase tracking-wider">{p.category}</div>
                        <div className="font-medium text-primary truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.price} / {p.unit}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => startEdit(p)} aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} aria-label="Delete">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
};

export default Admin;
