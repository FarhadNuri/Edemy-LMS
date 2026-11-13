"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Admin, User } from "@/types";
import {
  getToken,
  saveToken,
  removeToken,
  getUser,
  saveUser,
  removeUser,
} from "@/utils/tokenStorage";
import {
  login as apiAdminLogin,
  studentLogin as apiStudentLogin,
  studentRegister as apiStudentRegister,
  getCurrentAdmin,
} from "@/services/authService";

type AuthContextValue = {
  user: User | null;
  admin: Admin | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  login: (email: string, password: string) => Promise<void>;
  userLogin: (email: string, password: string) => Promise<{ isAdmin: boolean }>;
  userRegister: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const token = getToken();
      const cachedUser = getUser();

      if (!token) {
        setIsCheckingAuth(false);
        return;
      }

      if (cachedUser) {
        setUser(cachedUser);

        if (cachedUser.role === "admin") {
          try {
            const currentAdmin = await getCurrentAdmin();
            setAdmin(currentAdmin);
          } catch {
            removeToken();
            removeUser();
            setAdmin(null);
            setUser(null);
          }
        }
      } else {
        try {
          const currentAdmin = await getCurrentAdmin();
          setAdmin(currentAdmin);
          const adminProfile: User = {
            id: currentAdmin.id || currentAdmin._id,
            name: currentAdmin.name,
            email: currentAdmin.email,
            role: "admin",
          };
          saveUser(adminProfile);
          setUser(adminProfile);
        } catch {
          removeToken();
          removeUser();
          setAdmin(null);
          setUser(null);
        }
      }

      setIsCheckingAuth(false);
    }

    restoreSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { token, admin: loggedInAdmin } = await apiAdminLogin(email, password);
    saveToken(token);
    setAdmin(loggedInAdmin);
    const userProfile: User = {
      id: loggedInAdmin.id || loggedInAdmin._id,
      name: loggedInAdmin.name,
      email: loggedInAdmin.email,
      role: "admin",
    };
    saveUser(userProfile);
    setUser(userProfile);
  }, []);

  const userLogin = useCallback(async (email: string, password: string) => {
    const { token, user: loggedInUser, isAdmin } = await apiStudentLogin(email, password);
    saveToken(token);
    saveUser(loggedInUser);
    setUser(loggedInUser);

    if (isAdmin) {
      setAdmin({
        id: loggedInUser.id || loggedInUser._id,
        name: loggedInUser.name,
        email: loggedInUser.email,
      });
    }

    return { isAdmin };
  }, []);

  const userRegister = useCallback(
    async (name: string, email: string, password: string) => {
      const { token, user: registeredUser } = await apiStudentRegister(name, email, password);
      saveToken(token);
      saveUser(registeredUser);
      setUser(registeredUser);
    },
    []
  );

  const logout = useCallback(() => {
    removeToken();
    removeUser();
    setAdmin(null);
    setUser(null);
    router.push("/");
  }, [router]);

  const isAuthenticated = Boolean(user || admin);

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        isAuthenticated,
        isCheckingAuth,
        login,
        userLogin,
        userRegister,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
