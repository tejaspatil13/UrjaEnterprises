import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type AuthState = {
  user: User | null;
  loading: boolean;
  role: "admin" | "user" | null;
  roleLoading: boolean;
  signOutUser: () => Promise<void>;
};

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      setRoleLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const loadRole = async () => {
      if (!user || !db) {
        setRole(null);
        setRoleLoading(false);
        return;
      }
      setRoleLoading(true);
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const r = (snap.data()?.role as "admin" | "user" | undefined) ?? "user";
        setRole(r);
      } catch {
        setRole("user");
      } finally {
        setRoleLoading(false);
      }
    };
    loadRole();
  }, [user]);

  const value = useMemo<AuthState>(
    () => ({
      user,
      loading,
      role,
      roleLoading,
      signOutUser: async () => {
        if (!auth) return;
        await signOut(auth);
      },
    }),
    [user, loading, role, roleLoading]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}

