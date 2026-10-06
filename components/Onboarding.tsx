"use client";

import { useState } from "react";
import AddTaskForm from "@/components/AddTaskForm";
import { isRoutine } from "@/lib/schedule";
import { fmtDuration, fmtTime, nowHHMM, toMinutes } from "@/lib/time";
import type { Task } from "@/lib/types";

export default function Onboarding({
  onFinish,
}: {
  onFinish: (startTime: string, tasks: Task[]) => void;
}) {
  const [startTime, setStartTime] = useState("06:00");
  const [tasks, setTasks] = useState<Task[]>([]);

  const total = tasks.reduce((a, t) => a + t.duration, 0);

  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-zinc-100 sm:p-8">
      <div className="mx-auto max-w-xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold">Welcome 👋</h1>
          <p className="text-sm text-zinc-400">
            What do you want to do every day? Add your daily tasks and how long
            each one should take. Don&apos;t forget meals and prep time. You can
            change all of this later, for every day or just for one day.
          </p>
        </header>

        <label className="block rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm">
          <span className="mb-1 block text-zinc-400">
            Your first task starts at
          </span>
          <div className="flex gap-2">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value || startTime)}
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
            <button
              onClick={() => setStartTime(nowHHMM())}
              className="rounded-lg border border-zinc-700 px-3 py-2 text-zinc-300 hover:bg-zinc-800"
            >
              Now
            </button>
          </div>
        </label>

        <ul className="space-y-2">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-3"
            >
              <div className="min-w-0">
                <div className="truncate font-medium">{t.title}</div>
                <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                  <span>{fmtDuration(t.duration)}</span>
                  {isRoutine(t) && (
                    <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-zinc-400">
                      Routine
                    </span>
                  )}
                  {t.fixedTime && (
                    <span>📌 {fmtTime(toMinutes(t.fixedTime))}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() =>
                  setTasks((prev) => prev.filter((x) => x.id !== t.id))
                }
                className="rounded px-2 py-1 text-red-400 hover:bg-zinc-800"
              >
                ✕
              </button>
            </li>
          ))}
          {tasks.length === 0 && (
            <li className="rounded-xl border border-dashed border-zinc-800 p-6 text-center text-zinc-500">
              No tasks yet. Add your first one below.
            </li>
          )}
        </ul>

        <AddTaskForm
          label="Add task"
          onAdd={(n) =>
            setTasks((prev) => [...prev, { id: crypto.randomUUID(), ...n }])
          }
        />

        <div className="space-y-2">
          {tasks.length > 0 && (
            <p className="text-center text-sm text-zinc-400">
              {tasks.length} task{tasks.length > 1 ? "s" : ""} ·{" "}
              {fmtDuration(total)} total
            </p>
          )}
          <button
            onClick={() => onFinish(startTime, tasks)}
            disabled={tasks.length === 0}
            className="w-full rounded-lg bg-emerald-500 px-4 py-3 font-semibold text-zinc-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Build my schedule
          </button>
        </div>
      </div>
    </main>
  );
}
