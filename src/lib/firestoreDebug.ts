import { addDoc, collection, deleteDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseEnabled } from "@/lib/firebase";

export async function runFirestoreDiagnostic() {
  if (!isFirebaseEnabled || !db) {
    throw new Error("Firebase not enabled. Check .env values and restart dev server.");
  }

  const ref = await addDoc(collection(db, "_health_checks"), {
    source: "web-admin-diagnostic",
    createdAt: serverTimestamp(),
  });

  const snap = await getDoc(doc(db, "_health_checks", ref.id));
  if (!snap.exists()) {
    throw new Error("Write succeeded but read failed on Firestore.");
  }

  await deleteDoc(doc(db, "_health_checks", ref.id));
  return { id: ref.id };
}

