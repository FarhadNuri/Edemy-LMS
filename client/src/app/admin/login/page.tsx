"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";
import { getLoginFormError } from "@/utils/validators";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageTransition } from "@/components/layout/PageTransition";

export default function AdminLoginPage() {
  const router = useRouter();
  const { admin, isCheckingAuth, login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isCheckingAuth && admin) {
      router.push("/admin");
    }
  }, [admin, isCheckingAuth, router]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const validationError = getLoginFormError(email, password);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      showToast("Signed in successfully", "success");
      router.push("/admin");
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Unable to sign in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Admin Login</h1>
            <p className="text-sm text-muted">
              Enter your administrator credentials to manage courses
            </p>
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

              <Input
                label="Email"
                type="email"
                placeholder="admin@example.com"
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
                autoComplete="current-password"
                required
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-6 border-t border-border pt-4 text-center space-y-1">
              <p className="text-xs text-muted">
                Demo admin:{" "}
                <button
                  type="button"
                  onClick={() => {
                    setEmail("admin@example.com");
                    setPassword("Admin@12345");
                    setFormError("");
                  }}
                  className="font-mono text-ink font-medium hover:text-primary transition-colors cursor-pointer"
                  title="Click to fill credentials"
                >
                  admin@example.com
                </button>
              </p>
              <p className="text-xs text-muted">
                Password: <span className="font-mono text-ink font-medium">Admin@12345</span>
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-xs font-medium text-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              ← Return to public site
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

