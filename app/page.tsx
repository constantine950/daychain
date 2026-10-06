import Link from "next/link";
import SchedulePreview from "@/components/landing/SchedulePreview";

const STEPS = [
  {
    title: "List your tasks",
    body: "Name each task and say how long it takes. Add routines too, like meals and getting ready.",
  },
  {
    title: "Pick a start time",
    body: "Your first task starts then, and every other task chains from it. Pin lunch to 1:00 PM and Daychain schedules around it.",
  },
  {
    title: "Work the plan",
    body: "Check tasks off as you go. Tomorrow starts fresh from your template, ready to tweak.",
  },
];

const FEATURES = [
  {
    title: "Times that build themselves",
    body: "Reorder a task and every start time after it recalculates.",
  },
  {
    title: "Fixed times, handled",
    body: "Pin a task to a time. See the free time before it, or a warning when tasks collide.",
  },
  {
    title: "Routines stay out of your progress",
    body: "Meals and prep take up time in the plan but don't count as work done.",
  },
  {
    title: "One template, any day",
    body: "Tweak a single day without touching the rest, then revert in a tap.",
  },
  {
    title: "Honest history",
    body: "Past days are locked, so yesterday stays exactly what you did.",
  },
  {
    title: "Installs like an app",
    body: "Add it to your home screen and keep planning, even offline.",
  },
];

const primaryBtn =
  "rounded-full bg-sun px-6 py-3 font-semibold text-ink transition hover:brightness-110";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight"
        >
          Daychain
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#how" className="hidden text-haze hover:text-sand sm:inline">
            How it works
          </a>
          <a
            href="#features"
            className="hidden text-haze hover:text-sand sm:inline"
          >
            Features
          </a>
          <Link
            href="/app"
            className="rounded-full bg-sun px-4 py-2 font-semibold text-ink hover:brightness-110"
          >
            Open app
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-2 lg:pt-20">
          <div>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              Your whole day, chained together.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-haze">
              List what you want to do and how long each takes. Daychain builds
              the schedule from the moment you start, so every hour has a place.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/app" className={primaryBtn}>
                Open Daychain
              </Link>
              <a
                href="#how"
                className="rounded-full border border-edge px-6 py-3 font-semibold text-sand hover:bg-card"
              >
                See how it works
              </a>
            </div>
            <p className="mt-4 text-sm text-haze">
              No account needed. Your plan saves on your device.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <SchedulePreview />
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-t border-edge">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Three steps to a day with a plan.
            </h2>
            <ol className="mt-12 grid gap-10 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="font-display text-5xl text-sun">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-haze">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-edge">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Built for days with real constraints.
            </h2>
            <dl className="mt-12 grid gap-x-16 md:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f.title} className="border-t border-edge py-6">
                  <dt className="text-lg font-semibold">{f.title}</dt>
                  <dd className="mt-1 text-haze">{f.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-edge">
          <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8">
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              Plan tomorrow in two minutes.
            </h2>
            <Link
              href="/app"
              className={`${primaryBtn} mt-8 inline-block px-8 text-lg`}
            >
              Open Daychain
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-edge">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-8 text-sm text-haze sm:px-8">
          <span>© 2026 Daychain</span>
          <Link href="/app" className="hover:text-sand">
            Open app
          </Link>
        </div>
      </footer>
    </div>
  );
}
