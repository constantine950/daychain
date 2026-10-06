"use client";

import Link from "next/link";
import DateNav from "@/components/DateNav";
import ModeToggle from "@/components/ModeToggle";
import Notice from "@/components/Notice";
import Onboarding from "@/components/Onboarding";
import ProgressBar from "@/components/ProgressBar";
import ScheduleSettings from "@/components/ScheduleSettings";
import TaskItem from "@/components/TaskItem";
import { useScheduler } from "@/hooks/useScheduler";
import { fmtTime } from "@/lib/time";
import AddTaskForm from "@/components/AddTaskForm";

export default function TaskScheduler() {
  const {
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
  } = useScheduler();

  if (!loaded) return null;

  if (!store.onboarded) {
    return <Onboarding onFinish={actions.finishOnboarding} />;
  }

  const { scheduled, dayEnd, overflow, hasConflict } = schedule;

  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-zinc-100 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Daychain</h1>
            <Link
              href="/"
              className="text-sm text-zinc-400 hover:text-zinc-100 standalone:hidden"
            >
              ← Home
            </Link>
          </div>
          <p className="text-sm text-zinc-400">
            Plan your day, then work the plan.
          </p>
        </header>

        {/* Date nav (replaced by a title while editing the template) */}
        {inTemplate ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-center font-semibold">
            Your daily template
          </div>
        ) : (
          <DateNav
            dateKey={dateKey}
            isToday={isToday}
            hasOverride={hasOverride}
            onPrev={actions.goToPrevDay}
            onNext={actions.goToNextDay}
            onToday={actions.goToToday}
          />
        )}

        {/* Mode + day actions */}
        <div className="flex flex-wrap items-center gap-2">
          <ModeToggle mode={mode} onChange={setMode} />
          {!inTemplate && hasOverride && canEdit && (
            <button
              onClick={actions.revertToTemplate}
              className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800"
            >
              Revert to template
            </button>
          )}
          {canCheck && (
            <button
              onClick={actions.resetToday}
              className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800"
            >
              Reset checks
            </button>
          )}
        </div>

        {inTemplate && (
          <Notice tone="warning">
            Editing the template. Changes apply to every day that hasn&apos;t
            been customized.
          </Notice>
        )}
        {!inTemplate && isPast && (
          <Notice tone="muted">Past day: view only.</Notice>
        )}

        <ScheduleSettings
          startTime={plan.startTime}
          breakMin={store.breakMin}
          canEdit={canEdit}
          onStartTimeChange={actions.setStartTime}
          onBreakChange={actions.setBreakMin}
        />

        {!inTemplate && progress.taskCount > 0 && <ProgressBar {...progress} />}

        {overflow && (
          <Notice tone="danger">
            Heads up: this plan runs past midnight (ends {fmtTime(dayEnd)}).
            Trim some tasks.
          </Notice>
        )}
        {hasConflict && (
          <Notice tone="danger">
            A fixed-time task overlaps the one before it. Shorten something,
            reorder, or move the fixed time.
          </Notice>
        )}

        {/* Task list */}
        <ul className="space-y-2">
          {scheduled.length === 0 && (
            <li className="rounded-xl border border-dashed border-zinc-800 p-6 text-center text-zinc-500">
              No tasks. {canEdit ? "Add one below." : ""}
            </li>
          )}
          {scheduled.map((t, i) => (
            <TaskItem
              key={t.id}
              task={t}
              showCheckbox={!inTemplate}
              done={!inTemplate && doneIds.includes(t.id)}
              canCheck={canCheck}
              canEdit={canEdit}
              isFirst={i === 0}
              isLast={i === scheduled.length - 1}
              onToggle={() => actions.toggleDone(t.id)}
              onMoveUp={() => actions.moveTask(i, -1)}
              onMoveDown={() => actions.moveTask(i, 1)}
              onRemove={() => actions.removeTask(t.id)}
            />
          ))}
        </ul>

        {canEdit && (
          <AddTaskForm
            label={`Add to ${inTemplate ? "template" : "this day"}`}
            onAdd={actions.addTask}
          />
        )}
      </div>
    </main>
  );
}
