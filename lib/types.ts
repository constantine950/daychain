export type Kind = "task" | "routine";

export type Task = {
  id: string;
  title: string;
  duration: number; // minutes
  kind?: Kind; // missing = "task" (keeps old saved data working)
  fixedTime?: string; // "HH:MM" if pinned
};

export type NewTask = {
  title: string;
  duration: number;
  kind: Kind;
  fixedTime?: string;
};

export type DayPlan = {
  startTime: string;
  tasks: Task[];
};

export type Store = {
  onboarded: boolean;
  breakMin: number;
  template: DayPlan;
  overrides: Record<string, DayPlan>; // key: YYYY-MM-DD
  completed: Record<string, string[]>; // key: YYYY-MM-DD -> task ids
};

export type ScheduledTask = Task & {
  start: number; // minutes from midnight
  end: number;
  gap: number; // free minutes before this task (fixed-time tasks only)
  conflict: boolean; // overlaps the task before it
};
