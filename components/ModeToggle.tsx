import type { Mode } from "@/hooks/useScheduler";

export default function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  const btn = (active: boolean) =>
    `rounded-md px-3 py-1 ${active ? "bg-zinc-100 text-zinc-900" : "text-zinc-400"}`;

  return (
    <div className="inline-flex rounded-lg border border-zinc-800 p-1 text-sm">
      <button onClick={() => onChange("day")} className={btn(mode === "day")}>
        Day view
      </button>
      <button
        onClick={() => onChange("template")}
        className={btn(mode === "template")}
      >
        Every day
      </button>
    </div>
  );
}
