"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";


export function StudentNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, admin, isAuthenticated, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const displayName = user?.name || admin?.name || user?.email || admin?.email || "User";
  const email = user?.email || admin?.email || "";
  const initial = displayName.charAt(0).toUpperCase();

  const coursesHref = admin ? "/admin" : isAuthenticated ? "/courses" : "/login?redirect=/courses";

  const handleNavigate = (path: string) => {
    setIsModalOpen(false);
    router.push(path);
  };

  const handleLogoutClick = () => {
    setIsModalOpen(false);
    logout();
    router.push("/");
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex flex-1 items-center justify-start">
            <Link
              href="/"
              onClick={handleBrandClick}
              className="text-lg font-bold tracking-tight text-ink hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded shrink-0 cursor-pointer"
            >
              Edemy
            </Link>
          </div>

          <nav className="hidden md:flex items-center justify-center gap-1 sm:gap-2 md:gap-3">
            <Link
              href={coursesHref}
              className="text-sm font-medium text-ink hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2.5 py-1.5 hover:bg-slate-50"
            >
              Courses
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium text-ink hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2.5 py-1.5 hover:bg-slate-50"
            >
              About Us
            </Link>
            <Link
              href="/#benefits"
              className="text-sm font-medium text-ink hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2.5 py-1.5 hover:bg-slate-50"
            >
              Benefits
            </Link>
            <Link
              href="/#get-started"
              className="text-sm font-medium text-ink hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2.5 py-1.5 hover:bg-slate-50"
            >
              Get Started
            </Link>
          </nav>

          <div className="hidden md:flex flex-1 items-center justify-end gap-2 sm:gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Open profile modal with Home and Logout options"
                  aria-haspopup="dialog"
                  className="group flex items-center gap-2 rounded-full border border-border bg-surface py-1 pl-1 pr-3 shadow-xs hover:border-primary hover:bg-slate-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-xs group-hover:scale-105 transition-transform">
                    {initial}
                  </div>
                  <span className="text-xs font-medium text-ink max-w-[110px] truncate sm:max-w-[150px]">
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
            ) : (
              <div className="flex items-center">
                <Link href="/login">
                  <Button variant="primary" size="sm">
                    Sign in
                  </Button>
                </Link>
              </div>
            )}
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
            {isAuthenticated && (
              <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-xs">
                  {initial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink truncate">{displayName}</p>
                  {email && <p className="text-xs text-muted truncate">{email}</p>}
                  {admin ? (
                    <span className="inline-block mt-1 rounded bg-primary-soft text-primary border border-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                      Administrator
                    </span>
                  ) : (
                    <span className="inline-block mt-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-muted uppercase tracking-wider">
                      Student
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (pathname === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <span>Home</span>
                <span className="text-muted text-xs">→</span>
              </Link>

              <Link
                href={coursesHref}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <span>Courses</span>
                <span className="text-muted text-xs">→</span>
              </Link>

              <Link
                href="/#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <span>About Us</span>
                <span className="text-muted text-xs">→</span>
              </Link>

              <Link
                href="/#benefits"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <span>Benefits</span>
                <span className="text-muted text-xs">→</span>
              </Link>

              <Link
                href="/#get-started"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <span>How It Works</span>
                <span className="text-muted text-xs">→</span>
              </Link>

              {admin && (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-primary hover:bg-primary-soft transition-colors"
                >
                  <span className="font-semibold">Admin Dashboard</span>
                  <span className="text-primary text-xs">→</span>
                </Link>
              )}
            </div>

            <div className="pt-2 border-t border-border">
              {isAuthenticated ? (
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
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <Button variant="primary" size="md" className="w-full">
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={admin ? "Admin Account & Navigation" : "Account & Navigation"}
      >
        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-sm">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink truncate">{displayName}</p>
              {email && <p className="text-xs text-muted truncate">{email}</p>}
              {admin ? (
                <span className="inline-block mt-1 rounded bg-primary-soft text-primary border border-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  Administrator
                </span>
              ) : (
                <span className="inline-block mt-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-muted uppercase tracking-wider">
                  Student
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => handleNavigate("/")}
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
                  <p className="text-xs text-muted">
                    {admin ? "Return to student platform homepage" : "Platform homepage"}
                  </p>
                </div>
              </div>
              <span className="text-muted text-xs group-hover:text-primary group-hover:translate-x-0.5 transition-all">→</span>
            </button>

            {!admin && (
              <button
                type="button"
                onClick={() => handleNavigate("/courses")}
                className="w-full flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-ink hover:bg-slate-50 hover:border-primary transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-ink group-hover:bg-primary-soft group-hover:text-primary transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-ink group-hover:text-primary transition-colors">Courses</p>
                    <p className="text-xs text-muted">Browse complete curriculum catalog</p>
                  </div>
                </div>
                <span className="text-muted text-xs group-hover:text-primary group-hover:translate-x-0.5 transition-all">→</span>
              </button>
            )}

            {admin && (
              <button
                type="button"
                onClick={() => handleNavigate("/admin")}
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
            )}

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
                  <p className="text-xs text-red-500">
                    {admin ? "Sign out of administrator session" : "Sign out of your session"}
                  </p>
                </div>
              </div>
              <span className="text-muted text-xs group-hover:text-primary group-hover:translate-x-0.5 transition-all">→</span>
            </button>
          </div>

          <div className="flex justify-end pt-2 border-t border-border">
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
