import { Product } from "@/types/product";
import { db, isFirebaseEnabled } from "@/lib/firebase";
import { CATALOG_CATEGORY_MAP, CATALOG_PRODUCTS } from "@/lib/catalogData";
import { sanitizeForFirestore } from "@/lib/firestoreSanitize";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

const STORAGE_KEY = "urja_products_v2";
const PRODUCTS_COLLECTION = "products_v2";

export const PRODUCT_CATALOG: Record<string, string[]> = {
  ...CATALOG_CATEGORY_MAP,
};

const SEED_PRODUCTS: Product[] = CATALOG_PRODUCTS;

function getProductsLocal(): Product[] {
  if (typeof window === "undefined") return SEED_PRODUCTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PRODUCTS));
      return SEED_PRODUCTS;
    }
    const parsed = JSON.parse(raw) as Product[];
    // Keep local cache aligned with latest catalog dataset.
    if (parsed.length < SEED_PRODUCTS.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PRODUCTS));
      return SEED_PRODUCTS;
    }
    return parsed;
  } catch {
    return SEED_PRODUCTS;
  }
}

function saveProductsLocal(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event("urja:products-updated"));
}

export async function getProducts(): Promise<Product[]> {
  if (!isFirebaseEnabled || !db) {
    return getProductsLocal();
  }

  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty || snapshot.size < SEED_PRODUCTS.length) {
      // Seed or update Firebase with full catalog dataset
      await Promise.all(
        SEED_PRODUCTS.map((p) =>
          setDoc(doc(db, PRODUCTS_COLLECTION, p.id), sanitizeForFirestore(p))
        )
      );
      return SEED_PRODUCTS;
    }

    return snapshot.docs.map((item) => item.data() as Product);
  } catch (error) {
    console.error("Firestore getProducts failed, using local fallback:", error);
    return getProductsLocal();
  }
}

export async function addProduct(p: Omit<Product, "id" | "createdAt">) {
  const newProduct: Product = {
    ...p,
    id: `p-${Date.now()}`,
    createdAt: Date.now(),
  };

  if (isFirebaseEnabled && db) {
    try {
      await setDoc(
        doc(db, PRODUCTS_COLLECTION, newProduct.id),
        sanitizeForFirestore(newProduct)
      );
      window.dispatchEvent(new Event("urja:products-updated"));
      return newProduct;
    } catch (error) {
      console.error("Firestore addProduct failed, using local fallback:", error);
    }
  }

  const products = getProductsLocal();
  saveProductsLocal([newProduct, ...products]);
  return newProduct;
}

export async function updateProduct(p: Product) {
  if (isFirebaseEnabled && db) {
    await setDoc(doc(db, PRODUCTS_COLLECTION, p.id), sanitizeForFirestore(p), { merge: true });
    window.dispatchEvent(new Event("urja:products-updated"));
    return p;
  }

  const products = getProductsLocal().map((x) => (x.id === p.id ? p : x));
  saveProductsLocal(products);
  return p;
}

export async function deleteProduct(id: string) {
  if (isFirebaseEnabled && db) {
    try {
      await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
      window.dispatchEvent(new Event("urja:products-updated"));
      return;
    } catch (error) {
      console.error("Firestore deleteProduct failed, using local fallback:", error);
    }
  }
  const products = getProductsLocal().filter((p) => p.id !== id);
  saveProductsLocal(products);
}

export async function getProduct(id: string) {
  if (isFirebaseEnabled && db) {
    try {
      const snapshot = await getDoc(doc(db, PRODUCTS_COLLECTION, id));
      if (snapshot.exists()) return snapshot.data() as Product;
    } catch (error) {
      console.error("Firestore getProduct failed, using local fallback:", error);
    }
  }
  return getProductsLocal().find((p) => p.id === id);
}
