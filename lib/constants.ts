import type { Store } from "@/lib/types";

export const TITLE_MAX = 40;
export const DURATION_MAX = 720; // minutes
export const STORAGE_KEY = "task-scheduler-v2";

export const DEFAULT_STORE: Store = {
  onboarded: false,
  breakMin: 10,
  template: { startTime: "06:00", tasks: [] },
  overrides: {},
  completed: {},
};

export const QUICK_ROUTINES = [
  { title: "Eat", duration: 30 },
  { title: "Cook / meal prep", duration: 45 },
  { title: "Get ready", duration: 30 },
];
