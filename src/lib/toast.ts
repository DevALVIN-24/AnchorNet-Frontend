/**
 * Pure state helpers for the app-wide toast notification stack.
 */

/** A single toast notification. */
export interface Toast {
  id: number;
  kind: "success" | "error";
  message: string;
}

/** Maximum number of toasts visible at once; older ones are dropped. */
export const MAX_TOASTS = 3;

/** Appends a toast to the stack, keeping only the most recent {@link MAX_TOASTS}. */
export function pushToast(toasts: Toast[], toast: Toast): Toast[] {
  return [...toasts, toast].slice(-MAX_TOASTS);
}

/** Removes a toast by id, leaving the rest of the stack untouched. */
export function dismissToast(toasts: Toast[], id: number): Toast[] {
  return toasts.filter((toast) => toast.id !== id);
}
