"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";
import { getLoginFormError } from "@/utils/validators";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageTransition } from "@/components/layout/PageTransition";

function UserLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const { isAuthenticated, isCheckingAuth, userLogin, userRegister } = useAuth();
  const { showToast } = useToast();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isCheckingAuth && isAuthenticated) {
      router.push(redirectUrl);
    }
  }, [isAuthenticated, isCheckingAuth, redirectUrl, router]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (mode === "register" && name.trim() === "") {
      setFormError("Name is required.");
      return;
    }

    const validationError = getLoginFormError(email, password);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      if (mode === "login") {
        await userLogin(email, password);
        showToast("Signed in successfully", "success");
      } else {
        await userRegister(name, email, password);
        showToast("Account created successfully", "success");
      }
      router.push(redirectUrl);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Authentication failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageTransition>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-ink">
              {mode === "login" ? "Sign in to your account" : "Create a student account"}
            </h1>
            <p className="text-sm text-muted">
              {redirectUrl !== "/"
                ? "Please sign in to view the complete course and lectures"
                : "Access your courses, lessons, and learning material"}
            </p>
          </div>

          <div className="flex rounded-md border border-border bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setFormError("");
              }}
              className={`flex-1 rounded py-1.5 text-xs font-semibold transition-colors ${
                mode === "login"
                  ? "bg-surface text-ink shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setFormError("");
              }}
              className={`flex-1 rounded py-1.5 text-xs font-semibold transition-colors ${
                mode === "register"
                  ? "bg-surface text-ink shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div
                  role="alert"
                  className="rounded-md border border-red-200 bg-red-50 p-3 text-xs text-danger"
                >
                  {formError}
                </div>
              )}

              {mode === "register" && (
                <Input
                  label="Full Name"
                  placeholder="e.g. Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              )}

              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                required
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  {mode === "login" ? "Sign In" : "Create Account"}
                </Button>
              </div>
            </form>

            {mode === "login" && (
              <div className="mt-6 border-t border-border pt-4 text-center space-y-1">
                <p className="text-xs text-muted">
                  Demo user:{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("user@example.com");
                      setPassword("User@12345");
                      setFormError("");
                    }}
                    className="font-mono text-ink font-medium hover:text-primary transition-colors cursor-pointer"
                    title="Click to fill credentials"
                  >
                    user@example.com
                  </button>
                </p>
                <p className="text-xs text-muted">
                  Password: <span className="font-mono text-ink font-medium">User@12345</span>
                </p>
              </div>
            )}
          </div>

          <div className="text-center text-xs text-muted">
            Are you an instructor or admin?{" "}
            <Link
              href="/admin/login"
              className="font-medium text-primary hover:underline"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default function UserLoginPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-muted">Loading...</div>}>
      <UserLoginContent />
    </Suspense>
  );
}

