import { prettyDate } from "@/lib/time";

type Props = {
  dateKey: string;
  isToday: boolean;
  hasOverride: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
};

export default function DateNav({
  dateKey,
  isToday,
  hasOverride,
  onPrev,
  onNext,
  onToday,
}: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-3">
      <button
        onClick={onPrev}
        className="rounded-lg px-3 py-1.5 hover:bg-zinc-800"
      >
        ←
      </button>
      <div className="text-center">
        <div className="font-semibold">{prettyDate(dateKey)}</div>
        <div className="text-xs text-zinc-400">
          {isToday ? "Today · " : ""}
          {hasOverride ? "Customized for this day" : "Using template"}
        </div>
        {!isToday && (
          <button
            onClick={onToday}
            className="mt-1 text-xs text-emerald-400 hover:underline"
          >
            Jump to today
          </button>
        )}
      </div>
      <button
        onClick={onNext}
        className="rounded-lg px-3 py-1.5 hover:bg-zinc-800"
      >
        →
      </button>
    </div>
  );
}
