import { doc, setDoc } from "firebase/firestore";
import { db, isFirebaseEnabled } from "@/lib/firebase";
import { AppUser } from "@/types/user";
import { Product } from "@/types/product";
import { CATALOG_PRODUCTS } from "@/lib/catalogData";
import { sanitizeForFirestore } from "@/lib/firestoreSanitize";

const USERS_COLLECTION = "users";
const PRODUCTS_COLLECTION = "products";

const SEED_USERS: AppUser[] = [
  {
    id: "u-admin-1",
    name: "R Patil",
    email: "admin1@urjaenterprises.in",
    phone: "+91-9823888629",
    password: "tejas9288",
    role: "admin",
    status: "active",
    createdAt: Date.now() - 5000,
  },
  {
    id: "u-admin-2",
    name: "Tejas Patil",
    email: "admin2@urjaenterprises.in",
    phone: "+91-9000000002",
    password: "tejas9288",
    role: "admin",
    status: "active",
    createdAt: Date.now() - 4000,
  },
  {
    id: "u-user-1",
    name: "Procurement User 1",
    email: "user1@client.com",
    phone: "+91-9000000003",
    role: "user",
    status: "active",
    createdAt: Date.now() - 3000,
  },
  {
    id: "u-user-2",
    name: "Procurement User 2",
    email: "user2@client.com",
    phone: "+91-9000000004",
    role: "user",
    status: "active",
    createdAt: Date.now() - 2000,
  },
  {
    id: "u-user-3",
    name: "Procurement User 3",
    email: "user3@client.com",
    phone: "+91-9000000005",
    role: "user",
    status: "active",
    createdAt: Date.now() - 1000,
  },
  {
    id: "u-admin-3",
    name: "Ravindra Patil",
    email: "ravindra629@urjaenterprises.in",
    phone: "+91-9000000006",
    password: "ravi629",
    role: "admin",
    status: "active",
    createdAt: Date.now() - 3500,
  },
];

export async function setupFirebaseDatabase() {
  if (!isFirebaseEnabled || !db) {
    throw new Error("Firebase is not configured. Add env values first.");
  }

  // Always seed from the full catalog source, not current DB state.
  const normalizedProducts: Product[] = CATALOG_PRODUCTS.map((p) => ({
    ...p,
    productInfo:
      p.productInfo ??
      `${p.name} (${p.category} / ${p.subCategory}) by Urja Enterprises, Nashik.`,
  }));

  await Promise.all([
    ...SEED_USERS.map((u) =>
      setDoc(doc(db, USERS_COLLECTION, u.id), sanitizeForFirestore(u), { merge: true })
    ),
    ...normalizedProducts.map((p) =>
      setDoc(doc(db, PRODUCTS_COLLECTION, p.id), sanitizeForFirestore(p), { merge: true })
    ),
  ]);

  return {
    usersCreated: SEED_USERS.length,
    adminsCreated: SEED_USERS.filter((u) => u.role === "admin").length,
    normalUsersCreated: SEED_USERS.filter((u) => u.role === "user").length,
    productsUpserted: normalizedProducts.length,
  };
}
