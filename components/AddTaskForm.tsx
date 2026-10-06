"use client";

import { useState } from "react";
import { DURATION_MAX, QUICK_ROUTINES, TITLE_MAX } from "@/lib/constants";
import { fmtDuration } from "@/lib/time";
import type { Kind, NewTask } from "@/lib/types";

export default function AddTaskForm({
  onAdd,
  label,
}: {
  onAdd: (t: NewTask) => void;
  label: string;
}) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(60);
  const [kind, setKind] = useState<Kind>("task");
  const [pinned, setPinned] = useState(false);
  const [fixedTime, setFixedTime] = useState("13:00");

  function submit() {
    const t = title.trim();
    if (!t || duration <= 0) return;
    onAdd({
      title: t,
      duration: Math.min(duration, DURATION_MAX),
      kind,
      fixedTime: pinned ? fixedTime : undefined,
    });
    setTitle("");
    setKind("task");
    setPinned(false);
  }

  return (
    <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      {/* Quick routines */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-zinc-500">Quick add:</span>
        {QUICK_ROUTINES.map((q) => (
          <button
            key={q.title}
            onClick={() => {
              setTitle(q.title);
              setDuration(q.duration);
              setKind("routine");
            }}
            className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 hover:bg-zinc-800"
          >
            {q.title}
          </button>
        ))}
      </div>

      <div className="relative">
        <input
          value={title}
          maxLength={TITLE_MAX}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Task name, e.g. Play keyboard"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 py-2 pl-3 pr-16"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
          {title.length}/{TITLE_MAX}
        </span>
      </div>

      {/* Kind toggle */}
      <div className="inline-flex rounded-lg border border-zinc-800 p-1 text-sm">
        <button
          onClick={() => setKind("task")}
          className={`rounded-md px-3 py-1 ${kind === "task" ? "bg-zinc-100 text-zinc-900" : "text-zinc-400"}`}
        >
          Task
        </button>
        <button
          onClick={() => setKind("routine")}
          className={`rounded-md px-3 py-1 ${kind === "routine" ? "bg-zinc-100 text-zinc-900" : "text-zinc-400"}`}
        >
          Routine (eat, prep…)
        </button>
      </div>

      {/* Duration */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={5}
            max={DURATION_MAX}
            step={5}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value) || 0)}
            className="w-24 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          />
          <span className="text-sm text-zinc-400">min</span>
        </div>
        {[30, 60, 90, 120].map((m) => (
          <button
            key={m}
            onClick={() => setDuration(m)}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
          >
            {fmtDuration(m)}
          </button>
        ))}
      </div>

      {/* Fixed time */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <label className="flex items-center gap-2 text-zinc-300">
          <input
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Fixed time 📌
        </label>
        {pinned && (
          <input
            type="time"
            value={fixedTime}
            onChange={(e) => setFixedTime(e.target.value || fixedTime)}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5"
          />
        )}
      </div>

      <button
        onClick={submit}
        className="w-full rounded-lg bg-zinc-100 px-4 py-2 font-medium text-zinc-900 hover:bg-white"
      >
        {label}
      </button>
    </div>
  );
}
