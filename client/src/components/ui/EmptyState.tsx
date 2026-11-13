import React from "react";
import Link from "next/link";
import { Button } from "./Button";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  children?: React.ReactNode;
};

export function EmptyState({
  title,
  description,
  action,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface px-6 py-12 text-center">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>

      {description && (
        <p className="mt-1 text-sm text-muted max-w-sm">{description}</p>
      )}

      {action && (
        <div className="mt-5">
          {action.href ? (
            <Link href={action.href}>
              <Button size="sm">{action.label}</Button>
            </Link>
          ) : (
            <Button size="sm" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
      )}

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

