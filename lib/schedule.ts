import { toMinutes } from "@/lib/time";
import type { DayPlan, ScheduledTask, Task } from "@/lib/types";

export const isRoutine = (t: Task) => t.kind === "routine";

/**
 * Chains tasks from the plan's start time. Fixed-time tasks jump to their
 * pinned time; free gaps and overlaps are flagged on the task.
 */
export function buildSchedule(plan: DayPlan, breakMin: number) {
  let cursor = toMinutes(plan.startTime);
  let prevEnd = -1;

  const scheduled: ScheduledTask[] = plan.tasks.map((t) => {
    let start = cursor;
    let gap = 0;
    let conflict = false;

    if (t.fixedTime) {
      const fixed = toMinutes(t.fixedTime);
      start = fixed;
      gap = Math.max(0, fixed - cursor); // free time before this task
      conflict = fixed < prevEnd; // overlaps the task before it
    }

    const end = start + t.duration;
    prevEnd = Math.max(prevEnd, end);
    cursor = Math.max(cursor, end + breakMin);

    return { ...t, start, end, gap, conflict };
  });

  const dayEnd = scheduled.length
    ? Math.max(...scheduled.map((t) => t.end))
    : toMinutes(plan.startTime);

  return {
    scheduled,
    dayEnd,
    overflow: dayEnd > 1440,
    hasConflict: scheduled.some((t) => t.conflict),
  };
}
