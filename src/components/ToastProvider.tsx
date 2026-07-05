"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Toast, pushToast, dismissToast } from "@/lib/toast";

export interface ToastContextValue {
  toasts: Toast[];
  /** Queues a toast notification for display. */
  notify: (kind: Toast["kind"], message: string) => void;
  /** Dismisses a toast before its auto-dismiss timer fires. */
  dismiss: (id: number) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

/** How long a toast stays visible before auto-dismissing, in milliseconds. */
const AUTO_DISMISS_MS = 5000;

/** Provides an app-wide toast notification stack and renders it fixed to the viewport. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => dismissToast(prev, id));
  }, []);

  const notify = useCallback((kind: Toast["kind"], message: string) => {
    const toast: Toast = { id: nextId.current++, kind, message };
    setToasts((prev) => pushToast(prev, toast));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, notify, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: number) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const styles =
    toast.kind === "success"
      ? "border-emerald-500/30 bg-emerald-950/90 text-emerald-300"
      : "border-red-500/30 bg-red-950/90 text-red-300";

  return (
    <div
      role="status"
      className={`pointer-events-auto w-full max-w-sm rounded-lg border px-4 py-3 text-sm shadow-lg backdrop-blur ${styles}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p>{toast.message}</p>
        <button
          onClick={() => onDismiss(toast.id)}
          aria-label="Dismiss notification"
          className="shrink-0 text-xs opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
