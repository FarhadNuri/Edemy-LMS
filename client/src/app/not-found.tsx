import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16 text-center">
      <div className="w-full max-w-md rounded-lg border border-border bg-surface p-8 shadow-sm space-y-4">
        <span className="inline-block rounded bg-slate-100 px-3 py-1 font-mono text-xs font-semibold text-muted">
          404 Error
        </span>

        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Page Not Found
        </h1>

        <p className="text-sm text-muted leading-relaxed">
          The page you are looking for does not exist, has been removed, or is temporarily unavailable.
        </p>

        <div className="pt-4 flex items-center justify-center">
          <Link href="/" className="cursor-pointer">
            <Button variant="primary" size="md" className="cursor-pointer">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

