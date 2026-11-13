"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export function AdminNavbar() {
  const router = useRouter();
  const { admin, user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const displayName = admin?.name || admin?.email || user?.name || user?.email || "Admin";
  const email = admin?.email || user?.email || "";
  const initial = displayName.charAt(0).toUpperCase();

  const handleHomeClick = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  const handleAdminDashboardClick = () => {
    setIsModalOpen(false);
    router.push("/admin");
  };

  const handleLogoutClick = () => {
    setIsModalOpen(false);
    logout();
    router.push("/admin/login");
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex flex-1 items-center justify-start gap-3">
            <Link
              href="/admin"
              className="text-lg font-bold tracking-tight text-ink hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              Edemy
            </Link>
            <span className="rounded bg-primary-soft text-primary border border-primary/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider">
              Admin
            </span>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              aria-label="Open admin profile menu with Home and Logout options"
              aria-haspopup="dialog"
              className="group flex items-center gap-2 rounded-full border border-border bg-surface py-1 pl-1 pr-3 shadow-xs hover:border-primary hover:bg-slate-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-xs group-hover:scale-105 transition-transform">
                {initial}
              </div>
              <span className="text-xs font-medium text-ink max-w-[130px] truncate sm:max-w-[170px]">
                {displayName}
              </span>

              <svg
                className="h-3.5 w-3.5 text-muted group-hover:text-ink transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="flex md:hidden items-center justify-end">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-ink hover:bg-slate-100 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-xs">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink truncate">{displayName}</p>
                {email && <p className="text-xs text-muted truncate">{email}</p>}
                <span className="inline-block mt-1 rounded bg-primary-soft text-primary border border-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  Administrator
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <span>Home</span>
                <span className="text-muted text-xs">→</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogoutClick();
                }}
                className="w-full flex items-center justify-between rounded-lg border border-red-200 bg-red-50/40 px-3 py-2.5 text-sm font-medium text-danger hover:bg-red-50 hover:border-danger transition-colors cursor-pointer"
              >
                <span>Logout</span>
                <span className="text-muted text-xs group-hover:text-primary group-hover:translate-x-0.5 transition-all">→</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Admin Account & Navigation"
      >
        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-sm">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink truncate">{displayName}</p>
              {email && <p className="text-xs text-muted truncate">{email}</p>}
              <span className="inline-block mt-1 rounded bg-primary-soft text-primary border border-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                Administrator
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={handleHomeClick}
              className="w-full flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-ink hover:bg-slate-50 hover:border-primary transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-ink group-hover:bg-primary-soft group-hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-ink group-hover:text-primary transition-colors">Home</p>
                  <p className="text-xs text-muted">Return to student platform homepage</p>
                </div>
              </div>
              <span className="text-muted text-xs group-hover:text-primary group-hover:translate-x-0.5 transition-all">→</span>
            </button>

            <button
              type="button"
              onClick={handleAdminDashboardClick}
              className="w-full flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-ink hover:bg-slate-50 hover:border-primary transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-ink group-hover:bg-primary-soft group-hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-ink group-hover:text-primary transition-colors">Admin Dashboard</p>
                  <p className="text-xs text-muted">Manage courses, lectures, and curriculum</p>
                </div>
              </div>
              <span className="text-muted text-xs group-hover:text-primary group-hover:translate-x-0.5 transition-all">→</span>
            </button>

            <button
              type="button"
              onClick={handleLogoutClick}
              className="w-full flex items-center justify-between rounded-lg border border-red-200 bg-red-50/40 px-4 py-3 text-sm font-medium text-danger hover:bg-red-50 hover:border-danger transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-red-100 text-danger group-hover:scale-105 transition-transform">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-danger">Logout</p>
                  <p className="text-xs text-red-500">Sign out of administrator session</p>
                </div>
              </div>
              <span className="text-muted text-xs group-hover:text-primary group-hover:translate-x-0.5 transition-all">→</span>
            </button>
          </div>
          
          <div className="flex justify-end pt-3 border-t border-border">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
