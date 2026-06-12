import { ReactNode } from "react";

/** A bordered surface used to group dashboard content. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 ${className}`}
    >
      {children}
    </div>
  );
}
