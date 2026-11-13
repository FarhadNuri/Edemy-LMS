import React from "react";
import { AdminGuard } from "@/components/auth/AdminGuard";
import { AdminNavbar } from "@/components/layout/AdminNavbar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-background flex flex-col">
        <AdminNavbar />
        <main className="flex-1 py-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
        </main>
      </div>
    </AdminGuard>
  );
}

