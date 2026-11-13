"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/Skeleton";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { admin, isCheckingAuth } = useAuth();

  useEffect(() => {
    if (!isCheckingAuth && !admin) {
      router.push("/admin/login");
    }
  }, [admin, isCheckingAuth, router]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <Skeleton className="h-14 w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return <>{children}</>;
}

