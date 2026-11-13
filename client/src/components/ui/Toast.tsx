"use client";

import { motion } from "framer-motion";

export type ToastType = "success" | "error" | "info";

export type ToastMessage = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastProps = {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
};

export function Toast({ toast, onDismiss }: ToastProps) {
  const typeStyles: Record<ToastType, string> = {
    success: "border-green-200 bg-green-50 text-success",
    error: "border-red-200 bg-red-50 text-danger",
    info: "border-blue-200 bg-blue-50 text-primary",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center justify-between gap-3 rounded-md border px-4 py-3 text-sm shadow-md pointer-events-auto ${
        typeStyles[toast.type]
      }`}
      role="status"
    >
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="ml-2 text-current opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current rounded"
        aria-label="Dismiss toast"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}

