import type { ReactNode } from "react";

const TONES = {
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  danger: "border-red-500/30 bg-red-500/10 text-red-300",
  muted: "border-zinc-700 bg-zinc-900 text-zinc-400",
};

export default function Notice({
  tone,
  children,
}: {
  tone: keyof typeof TONES;
  children: ReactNode;
}) {
  return (
    <p className={`rounded-lg border p-3 text-sm ${TONES[tone]}`}>{children}</p>
  );
}
