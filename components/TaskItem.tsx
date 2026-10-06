import { isRoutine } from "@/lib/schedule";
import { fmtDuration, fmtTime } from "@/lib/time";
import type { ScheduledTask } from "@/lib/types";

type Props = {
  task: ScheduledTask;
  showCheckbox: boolean;
  done: boolean;
  canCheck: boolean;
  canEdit: boolean;
  isFirst: boolean;
  isLast: boolean;
  onToggle: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
};

export default function TaskItem({
  task: t,
  showCheckbox,
  done,
  canCheck,
  canEdit,
  isFirst,
  isLast,
  onToggle,
  onMoveUp,
  onMoveDown,
  onRemove,
}: Props) {
  return (
    <>
      {t.gap > 0 && (
        <li className="px-3 text-xs text-zinc-500">
          Free time · {fmtDuration(t.gap)}
        </li>
      )}

      <li
        className={`flex items-center gap-3 rounded-xl border bg-zinc-900 p-3 ${
          t.conflict ? "border-red-500/50" : "border-zinc-800"
        } ${done ? "opacity-50" : ""}`}
      >
        {showCheckbox && (
          <input
            type="checkbox"
            checked={done}
            disabled={!canCheck}
            onChange={onToggle}
            className="h-5 w-5 accent-emerald-500 disabled:cursor-not-allowed"
          />
        )}

        <div className="w-32 shrink-0 text-sm tabular-nums text-zinc-400">
          <div>
            {t.fixedTime ? "📌 " : ""}
            {fmtTime(t.start)}
          </div>
          <div className="text-xs">→ {fmtTime(t.end)}</div>
        </div>

        <div className="min-w-0 flex-1">
          <div className={`truncate font-medium ${done ? "line-through" : ""}`}>
            {t.title}
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
            <span>{fmtDuration(t.duration)}</span>
            {isRoutine(t) && (
              <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-zinc-400">
                Routine
              </span>
            )}
            {t.conflict && (
              <span className="text-red-400">Overlaps previous task</span>
            )}
          </div>
        </div>

        {canEdit && (
          <div className="flex shrink-0 items-center gap-1 text-zinc-400">
            <button
              onClick={onMoveUp}
              disabled={isFirst}
              className="rounded px-2 py-1 hover:bg-zinc-800 disabled:opacity-30"
            >
              ↑
            </button>
            <button
              onClick={onMoveDown}
              disabled={isLast}
              className="rounded px-2 py-1 hover:bg-zinc-800 disabled:opacity-30"
            >
              ↓
            </button>
            <button
              onClick={onRemove}
              className="rounded px-2 py-1 text-red-400 hover:bg-zinc-800"
            >
              ✕
            </button>
          </div>
        )}
      </li>
    </>
  );
}
