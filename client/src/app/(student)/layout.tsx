import React from "react";
import { StudentNavbar } from "@/components/layout/StudentNavbar";
import { Footer } from "@/components/layout/Footer";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StudentNavbar />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

