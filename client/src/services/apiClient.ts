import { getToken, removeToken } from "@/utils/tokenStorage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  requiresAuth?: boolean; 
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, requiresAuth = false } = options;

  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (requiresAuth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Cannot reach the server. Check your connection and try again.");
  }

  const result = await response.json();

  if (!response.ok) {
    if (response.status === 401 && requiresAuth) {
      removeToken();
    }
    throw new Error(result.message || "Something went wrong. Please try again.");
  }

  return result as T;
}

