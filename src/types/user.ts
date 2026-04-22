export type UserRole = "admin" | "user";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: UserRole;
  status: "active";
  createdAt: number;
}
