import { nowHHMM } from "@/lib/time";

type Props = {
  startTime: string;
  breakMin: number;
  canEdit: boolean;
  onStartTimeChange: (time: string) => void;
  onBreakChange: (min: number) => void;
};

export default function ScheduleSettings({
  startTime,
  breakMin,
  canEdit,
  onStartTimeChange,
  onBreakChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-end gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <label className="text-sm">
        <span className="mb-1 block text-zinc-400">First task starts at</span>
        <div className="flex gap-2">
          <input
            type="time"
            value={startTime}
            disabled={!canEdit}
            onChange={(e) => onStartTimeChange(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 disabled:opacity-50"
          />
          {canEdit && (
            <button
              onClick={() => onStartTimeChange(nowHHMM())}
              className="rounded-lg border border-zinc-700 px-3 py-2 text-zinc-300 hover:bg-zinc-800"
            >
              Now
            </button>
          )}
        </div>
      </label>
      <label className="text-sm">
        <span className="mb-1 block text-zinc-400">Break between (min)</span>
        <input
          type="number"
          min={0}
          value={breakMin}
          disabled={!canEdit}
          onChange={(e) => onBreakChange(Number(e.target.value))}
          className="w-24 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 disabled:opacity-50"
        />
      </label>
    </div>
  );
}
