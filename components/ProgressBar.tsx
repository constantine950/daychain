import { fmtDuration } from "@/lib/time";

type Props = {
  doneCount: number;
  taskCount: number;
  doneMin: number;
  totalMin: number;
};

export default function ProgressBar({
  doneCount,
  taskCount,
  doneMin,
  totalMin,
}: Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-zinc-400">
        <span>
          {doneCount}/{taskCount} tasks done
        </span>
        <span>
          {fmtDuration(doneMin)} of {fmtDuration(totalMin)}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full bg-emerald-500 transition-all"
          style={{ width: `${totalMin ? (doneMin / totalMin) * 100 : 0}%` }}
        />
      </div>
    </div>
  );
}
