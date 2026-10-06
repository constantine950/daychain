"use client";

import { useEffect, useState } from "react";
import { DEFAULT_STORE, STORAGE_KEY } from "@/lib/constants";
import { buildSchedule, isRoutine } from "@/lib/schedule";
import { addDays, toDateKey } from "@/lib/time";
import type { DayPlan, NewTask, Store, Task } from "@/lib/types";

export type Mode = "day" | "template";

export function useScheduler() {
  const [store, setStore] = useState<Store>(DEFAULT_STORE);
  const [loaded, setLoaded] = useState(false);
  const [dateKey, setDateKey] = useState(() => toDateKey(new Date()));
  const [mode, setMode] = useState<Mode>("day");

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStore(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setLoaded(true);
  }, []);

  // save to localStorage
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      // storage full or blocked
    }
  }, [store, loaded]);

  // ---------- derived state ----------
  const todayKey = toDateKey(new Date());
  const isToday = dateKey === todayKey;
  const isPast = dateKey < todayKey;
  const inTemplate = mode === "template";
  const hasOverride = !!store.overrides[dateKey];

  const plan: DayPlan = inTemplate
    ? store.template
    : (store.overrides[dateKey] ?? store.template);
  const doneIds = store.completed[dateKey] ?? [];

  const canEdit = inTemplate || !isPast; // past days are view-only
  const canCheck = !inTemplate && isToday; // only today can be checked off

  const schedule = buildSchedule(plan, store.breakMin);

  // progress only counts real tasks, not routines
  const mainTasks = plan.tasks.filter((t) => !isRoutine(t));
  const mainDone = mainTasks.filter((t) => doneIds.includes(t.id));
  const progress = {
    taskCount: mainTasks.length,
    doneCount: mainDone.length,
    totalMin: mainTasks.reduce((a, t) => a + t.duration, 0),
    doneMin: mainDone.reduce((a, t) => a + t.duration, 0),
  };

  // ---------- actions ----------
  // edits whichever plan is currently active (template, or this day's copy)
  function updatePlan(fn: (p: DayPlan) => DayPlan) {
    setStore((s) => {
      if (mode === "template") return { ...s, template: fn(s.template) };
      const base = s.overrides[dateKey] ?? s.template;
      return { ...s, overrides: { ...s.overrides, [dateKey]: fn(base) } };
    });
  }

  const actions = {
    addTask(n: NewTask) {
      const task: Task = { id: crypto.randomUUID(), ...n };
      updatePlan((p) => ({ ...p, tasks: [...p.tasks, task] }));
    },

    removeTask(id: string) {
      updatePlan((p) => ({ ...p, tasks: p.tasks.filter((t) => t.id !== id) }));
    },

    moveTask(index: number, dir: -1 | 1) {
      updatePlan((p) => {
        const j = index + dir;
        if (j < 0 || j >= p.tasks.length) return p;
        const tasks = [...p.tasks];
        [tasks[index], tasks[j]] = [tasks[j], tasks[index]];
        return { ...p, tasks };
      });
    },

    setStartTime(time: string) {
      updatePlan((p) => ({ ...p, startTime: time || p.startTime }));
    },

    setBreakMin(value: number) {
      setStore((s) => ({ ...s, breakMin: Math.max(0, value || 0) }));
    },

    toggleDone(id: string) {
      if (!canCheck) return;
      setStore((s) => {
        const current = s.completed[dateKey] ?? [];
        const next = current.includes(id)
          ? current.filter((x) => x !== id)
          : [...current, id];
        return { ...s, completed: { ...s.completed, [dateKey]: next } };
      });
    },

    resetToday() {
      setStore((s) => ({ ...s, completed: { ...s.completed, [dateKey]: [] } }));
    },

    revertToTemplate() {
      setStore((s) => {
        const overrides = { ...s.overrides };
        delete overrides[dateKey];
        return { ...s, overrides };
      });
    },

    finishOnboarding(startTime: string, tasks: Task[]) {
      setStore((s) => ({
        ...s,
        onboarded: true,
        template: { startTime, tasks },
      }));
    },

    goToPrevDay: () => setDateKey((k) => addDays(k, -1)),
    goToNextDay: () => setDateKey((k) => addDays(k, 1)),
    goToToday: () => setDateKey(toDateKey(new Date())),
  };

  return {
    loaded,
    store,
    mode,
    setMode,
    dateKey,
    isToday,
    isPast,
    inTemplate,
    hasOverride,
    plan,
    doneIds,
    canEdit,
    canCheck,
    schedule,
    progress,
    actions,
  };
}
