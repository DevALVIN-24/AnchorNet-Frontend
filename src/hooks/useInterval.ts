"use client";

import { useEffect, useRef } from "react";

/**
 * Calls `callback` every `delayMs`. Pass `null` to pause. The latest callback
 * is always invoked without resetting the timer.
 */
export function useInterval(callback: () => void, delayMs: number | null): void {
  const saved = useRef(callback);

  useEffect(() => {
    saved.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delayMs === null) return;
    const id = setInterval(() => saved.current(), delayMs);
    return () => clearInterval(id);
  }, [delayMs]);
}
