import { User } from "@/types";

const TOKEN_KEY = "edemy_token";
const USER_KEY = "edemy_user_info";

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY) || localStorage.getItem("lms_admin_token");
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("lms_admin_token");
}

export function saveUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(USER_KEY) || localStorage.getItem("lms_user_info");
  if (!data) return null;
  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
}

export function removeUser(): void {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem("lms_user_info");
}
