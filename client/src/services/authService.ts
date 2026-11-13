import { apiRequest } from "./apiClient";
import { Admin, ApiSuccess, LoginData, User } from "@/types";

export async function login(
  email: string,
  password: string
): Promise<{ token: string; admin: Admin }> {
  const result = await apiRequest<ApiSuccess<LoginData>>("/auth/login", {
    method: "POST",
    body: { email, password },
  });

  if (!result.data.admin) {
    throw new Error("This account does not have admin access.");
  }

  return {
    token: result.data.token,
    admin: result.data.admin,
  };
}

export async function studentLogin(
  email: string,
  password: string
): Promise<{ token: string; user: User; isAdmin: boolean }> {
  const result = await apiRequest<ApiSuccess<LoginData>>("/auth/login", {
    method: "POST",
    body: { email, password },
  });

  const account = result.data.user || result.data.admin;
  if (!account) {
    throw new Error("Invalid email or password.");
  }

  return {
    token: result.data.token,
    user: account,
    isAdmin: Boolean(result.data.admin),
  };
}

export async function studentRegister(
  name: string,
  email: string,
  password: string
): Promise<{ token: string; user: User }> {
  const result = await apiRequest<ApiSuccess<{ token: string; user: User }>>(
    "/auth/register",
    {
      method: "POST",
      body: { name, email, password },
    }
  );

  return result.data;
}

export async function getCurrentAdmin(): Promise<Admin> {
  const result = await apiRequest<ApiSuccess<{ admin: Admin }>>("/auth/me", {
    requiresAuth: true,
  });
  return result.data.admin;
}
