type State = "done" | "next" | "todo" | "fixed";

const ROWS: { time: string; name: string; meta: string; state: State }[] = [
  { time: "6:00 AM", name: "Morning run", meta: "45m", state: "done" },
  { time: "6:55 AM", name: "Deep work", meta: "2h", state: "done" },
  { time: "9:05 AM", name: "Study session", meta: "1h", state: "next" },
  { time: "10:15 AM", name: "Read", meta: "30m", state: "todo" },
  { time: "1:00 PM", name: "Lunch", meta: "30m · fixed time", state: "fixed" },
];

function Marker({ state }: { state: State }) {
  return (
    <span className="relative z-10 grid h-6 w-6 place-items-center">
      {state === "done" && (
        <span className="grid h-6 w-6 place-items-center rounded-full bg-sun text-xs font-bold text-ink">
          ✓
        </span>
      )}
      {state === "next" && (
        <span className="h-6 w-6 rounded-full border-[3px] border-sun bg-card" />
      )}
      {state === "todo" && (
        <span className="h-6 w-6 rounded-full border-[3px] border-haze/40 bg-card" />
      )}
      {state === "fixed" && (
        <span className="h-4 w-4 rotate-45 rounded-[3px] border-[3px] border-sun bg-card" />
      )}
    </span>
  );
}

export default function SchedulePreview() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-edge bg-card p-6 shadow-2xl shadow-black/30 sm:p-8">
      <p className="mb-6 text-lg font-semibold text-sand">Today</p>
      <ol>
        {ROWS.map((r, i) => {
          const last = i === ROWS.length - 1;
          const done = r.state === "done";
          return (
            <li
              key={r.name}
              className={`grid grid-cols-[4.75rem_1.5rem_1fr] gap-x-3 ${last ? "" : "pb-7"}`}
            >
              <span
                className={`text-right text-sm leading-6 tabular-nums ${done ? "text-haze" : "text-sand"}`}
              >
                {r.time}
              </span>

              <span className="relative flex justify-center">
                <Marker state={r.state} />
                {!last && (
                  <span
                    aria-hidden
                    className={`absolute -bottom-10 left-1/2 top-3 w-0.5 -translate-x-1/2 ${
                      done ? "bg-sun" : "bg-edge"
                    }`}
                  />
                )}
              </span>

              <div className="min-w-0">
                <p
                  className={`font-semibold leading-6 ${
                    done ? "text-haze line-through" : "text-sand"
                  }`}
                >
                  {r.name}
                </p>
                <p className="text-sm text-haze">{r.meta}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
