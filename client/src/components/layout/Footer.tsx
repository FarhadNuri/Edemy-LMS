"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-surface text-ink">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-border">
          <div className="space-y-3">
            <Link
              href="/"
              onClick={handleBrandClick}
              className="text-base font-bold tracking-tight text-ink hover:text-primary transition-colors inline-block cursor-pointer"
            >
              Edemy
            </Link>
            <p className="text-xs text-muted leading-relaxed max-w-sm">
              A calm, modular learning management system engineered for modern developers to master
              real-world technical skills at their own pace.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  Course Catalog
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-primary transition-colors">
                  Core Highlights
                </Link>
              </li>
              <li>
                <Link href="/#benefits" className="hover:text-primary transition-colors">
                  Why Learn With Us
                </Link>
              </li>
              <li>
                <Link href="/#get-started" className="hover:text-primary transition-colors">
                  Getting Started
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Account
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  Student Sign In
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-primary transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Privacy & Terms
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <span className="hover:text-primary transition-colors cursor-default">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-default">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-default">
                  Cookie Policy
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-default">
                  Security Overview
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 text-center text-xs text-muted">
          <p>© 2026 Edemy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
