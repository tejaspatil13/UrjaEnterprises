import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, isFirebaseEnabled } from "@/lib/firebase";
import { sanitizeForFirestore } from "@/lib/firestoreSanitize";
import { AppUser } from "@/types/user";

const ADMIN_EMAILS = new Set([
  "admin1@urjaenterprises.in",
  "admin2@urjaenterprises.in",
  "ravindra629@urjaenterprises.in",
]);
const ADMIN_PASSWORDS: Record<string, string> = {
  "admin1@urjaenterprises.in": "tejas9288",
  "admin2@urjaenterprises.in": "tejas9288",
  "ravindra629@urjaenterprises.in": "ravi629",
};

const EMAIL_ALIASES: Record<string, string> = {
  "ravindra@629": "ravindra629@urjaenterprises.in",
};

function normalizeLoginEmail(email: string) {
  const cleaned = email.trim().toLowerCase();
  return EMAIL_ALIASES[cleaned] ?? cleaned;
}

function buildUserProfile(uid: string, email: string, password: string): AppUser {
  const isAdmin = ADMIN_EMAILS.has(email) && ADMIN_PASSWORDS[email] === password;
  const name = isAdmin
    ? email === "admin1@urjaenterprises.in"
      ? "R Patil"
      : email === "admin2@urjaenterprises.in"
        ? "Tejas Patil"
        : "Ravindra Patil"
    : email.split("@")[0];

  return {
    id: uid,
    email,
    name,
    phone: isAdmin ? (email === "admin1@urjaenterprises.in" ? "+91-9823888629" : email === "admin2@urjaenterprises.in" ? "+91-9000000002" : "+91-9000000006") : "",
    password: isAdmin ? ADMIN_PASSWORDS[email] : password,
    role: isAdmin ? "admin" : "user",
    status: "active",
    createdAt: Date.now(),
  };
}

export async function signInOrCreateUser(email: string, password: string) {
  if (!isFirebaseEnabled || !auth || !db) {
    throw new Error("Firebase is not configured");
  }
  const normalizedEmail = normalizeLoginEmail(email);
  const shouldBeAdmin =
    ADMIN_EMAILS.has(normalizedEmail) && ADMIN_PASSWORDS[normalizedEmail] === password;

  let userCred;
  try {
    userCred = await signInWithEmailAndPassword(auth, normalizedEmail, password);
  } catch {
    userCred = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
  }

  const uid = userCred.user.uid;
  const userRef = doc(db, "users", uid);
  const existing = await getDoc(userRef);
  if (!existing.exists()) {
    const profile = buildUserProfile(uid, normalizedEmail, password);
    await setDoc(userRef, sanitizeForFirestore(profile), { merge: true });
    await updateProfile(userCred.user, { displayName: profile.name });
  } else if (shouldBeAdmin && existing.data()?.role !== "admin") {
    // Promote known admin accounts if they previously got created as normal users.
    await setDoc(
      userRef,
      sanitizeForFirestore({
        role: "admin",
        password: ADMIN_PASSWORDS[normalizedEmail],
      }),
      { merge: true }
    );
  }

  const roleSnap = await getDoc(userRef);
  const role = (roleSnap.data()?.role as "admin" | "user" | undefined) ?? "user";
  return { user: userCred.user, role };
}

export async function signInWithGoogle() {
  if (!isFirebaseEnabled || !auth || !db) {
    throw new Error("Firebase is not configured");
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const userCred = await signInWithPopup(auth, provider);
  const email = userCred.user.email;
  if (!email) throw new Error("Google sign-in did not return an email.");

  const uid = userCred.user.uid;
  const userRef = doc(db, "users", uid);
  const existing = await getDoc(userRef);

  if (!existing.exists()) {
    const profile = buildUserProfile(uid, email, "");
    // For Google sign-in, keep password empty (we don't store real passwords).
    profile.password = undefined;
    await setDoc(userRef, sanitizeForFirestore(profile), { merge: true });
    await updateProfile(userCred.user, { displayName: profile.name });
  } else if (ADMIN_EMAILS.has(email) && existing.data()?.role !== "admin") {
    await setDoc(userRef, sanitizeForFirestore({ role: "admin" }), { merge: true });
  }

  const roleSnap = await getDoc(userRef);
  const role = (roleSnap.data()?.role as "admin" | "user" | undefined) ?? "user";
  return { user: userCred.user, role };
}

