'use client';

import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { generatePlan, generateWeeklyFocus, type GeneratorInput } from '../lib/generator';

const PLATFORM_OPTIONS = [
  'Instagram',
  'TikTok',
  'LinkedIn',
  'YouTube',
  'Twitter / X',
  'Threads',
  'Email',
  'Podcast'
];

const defaultInput: GeneratorInput = {
  brandName: 'Signal Studio',
  mission: 'Helping bootstrapped founders turn consistent storytelling into revenue.',
  tone: 'Bold, empathetic, forward-looking.',
  audience: 'Scrappy founders and marketing leads',
  goal: 'Launch waitlist and convert 100 warm leads',
  startDate: format(new Date(), 'yyyy-MM-dd'),
  platforms: ['Instagram', 'TikTok', 'LinkedIn'],
  pillarPreferences: [
    'Category POV',
    'Customer Proof',
    'Product Innovation'
  ]
};

type GeneratedState = {
  createdAt: Date | null;
  plan: ReturnType<typeof generatePlan> | null;
  focus: ReturnType<typeof generateWeeklyFocus> | null;
};

const initialState: GeneratedState = {
  createdAt: null,
  plan: null,
  focus: null
};

export const ScheduleGenerator = () => {
  const [form, setForm] = useState(defaultInput);
  const [pillarsDraft, setPillarsDraft] = useState(
    defaultInput.pillarPreferences.join('\n')
  );
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const cadenceSummary = useMemo(() => {
    if (!state.plan) return null;
    const formatCounts = state.plan.reduce<Record<string, number>>((acc, item) => {
      acc[item.format] = (acc[item.format] || 0) + 1;
      return acc;
    }, {});
    const topFormats = Object.entries(formatCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const platformCounts = state.plan.reduce<Record<string, number>>(
      (acc, item) => {
        item.platformFocus.forEach((platform) => {
          acc[platform] = (acc[platform] || 0) + 1;
        });
        return acc;
      },
      {}
    );
    const topPlatforms = Object.entries(platformCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return {
      topFormats,
      topPlatforms
    };
  }, [state.plan]);

  const handleTogglePlatform = (platform: string) => {
    setForm((prev) => {
      const already = prev.platforms.includes(platform);
      return {
        ...prev,
        platforms: already
          ? prev.platforms.filter((item) => item !== platform)
          : [...prev.platforms, platform]
      };
    });
  };

  const handleGenerate = () => {
    setLoading(true);
    const trimmedPillars = pillarsDraft
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const payload: GeneratorInput = {
      ...form,
      pillarPreferences: trimmedPillars,
      platforms: form.platforms
    };

    const plan = generatePlan(payload);
    const focus = generateWeeklyFocus(payload);
    setState({
      plan,
      focus,
      createdAt: new Date()
    });
    setLoading(false);
  };

  const handleFormField = <K extends keyof GeneratorInput>(key: K, value: GeneratorInput[K]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-16">
      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8 shadow-2xl shadow-blue-900/30 backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-400">
              30-Day Real Posting Model
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold text-white md:text-5xl">
              Architect your next 30 days of momentum
            </h1>
            <p className="mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
              Input the signal of your brand and get a cinematic, conversion-ready calendar
              tailored to your voice, platforms, and growth objective. No fluff &mdash; just a precise content engine.
            </p>
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl border border-blue-500/60 bg-blue-500/10 px-6 py-3 font-semibold text-blue-200 transition hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Generating…' : 'Generate Calendar'}
          </button>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <fieldset>
              <label className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Brand / Product
              </label>
              <input
                value={form.brandName}
                onChange={(event) => handleFormField('brandName', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-base text-white shadow-inner shadow-black/40 focus:border-blue-500 focus:outline-none"
              />
            </fieldset>
            <fieldset>
              <label className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Mission Signal
              </label>
              <textarea
                value={form.mission}
                onChange={(event) => handleFormField('mission', event.target.value)}
                rows={4}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-base text-white shadow-inner shadow-black/40 focus:border-blue-500 focus:outline-none"
              />
            </fieldset>
            <fieldset>
              <label className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Tone DNA
              </label>
              <input
                value={form.tone}
                onChange={(event) => handleFormField('tone', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-base text-white shadow-inner shadow-black/40 focus:border-blue-500 focus:outline-none"
              />
            </fieldset>
            <fieldset>
              <label className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Audience Profile
              </label>
              <input
                value={form.audience}
                onChange={(event) => handleFormField('audience', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-base text-white shadow-inner shadow-black/40 focus:border-blue-500 focus:outline-none"
              />
            </fieldset>
            <fieldset>
              <label className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Core Outcome
              </label>
              <input
                value={form.goal}
                onChange={(event) => handleFormField('goal', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-base text-white shadow-inner shadow-black/40 focus:border-blue-500 focus:outline-none"
              />
            </fieldset>
          </div>

          <div className="space-y-6">
            <fieldset>
              <label className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Start Date
              </label>
              <input
                type="date"
                value={form.startDate ?? ''}
                onChange={(event) => handleFormField('startDate', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-base text-white shadow-inner shadow-black/40 focus:border-blue-500 focus:outline-none"
              />
            </fieldset>
            <fieldset>
              <label className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Primary Platforms
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {PLATFORM_OPTIONS.map((platform) => {
                  const active = form.platforms.includes(platform);
                  return (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => handleTogglePlatform(platform)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        active
                          ? 'border-blue-400 bg-blue-500/20 text-blue-200'
                          : 'border-slate-700 bg-slate-900/40 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {platform}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <fieldset>
              <label className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Signature Pillars (one per line)
              </label>
              <textarea
                value={pillarsDraft}
                onChange={(event) => setPillarsDraft(event.target.value)}
                rows={6}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-base text-white shadow-inner shadow-black/40 focus:border-blue-500 focus:outline-none"
              />
            </fieldset>
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-400/10 p-5 text-sm text-emerald-100">
              <p className="font-semibold uppercase tracking-widest text-emerald-300">
                Output includes
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-emerald-100/90">
                <li>Hook and content angle for every day</li>
                <li>Format mix engineered for your platforms</li>
                <li>Batching prompts and AI co-pilot suggestions</li>
                <li>Weekly focus map to align the team</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {state.plan && state.focus && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-2xl shadow-blue-900/30 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold text-white">
                Your velocity map
              </h2>
              <p className="mt-2 text-base text-slate-300">
                Generated {state.createdAt ? format(state.createdAt, 'MMM d, HH:mm') : 'now'} —
                optimized for {form.platforms.join(', ')}.
              </p>
            </div>
            {cadenceSummary && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.35em] text-blue-200/80">
                    format stack
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-blue-100">
                    {cadenceSummary.topFormats.map(([name, count]) => (
                      <li key={name}>
                        {name} · {count}x
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-purple-500/40 bg-purple-500/10 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.35em] text-purple-200/80">
                    channel punch
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-purple-100">
                    {cadenceSummary.topPlatforms.map(([name, count]) => (
                      <li key={name}>
                        {name} · {count} posts
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {state.focus.map((week) => (
              <div
                key={week.week}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                  Week {week.week}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">
                  {week.theme}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{week.objective}</p>
                <p className="mt-3 text-xs text-slate-400">
                  Anchor: <span className="text-slate-200">{week.anchorMoment}</span>
                </p>
                <div className="mt-4 space-y-2 text-xs text-slate-300">
                  {week.performanceSignals.map((signal) => (
                    <p key={signal} className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                      {signal}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-slate-800">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-950/70 text-xs uppercase tracking-[0.3em] text-slate-400">
                <tr>
                  <th className="px-4 py-4 text-left">Day</th>
                  <th className="px-4 py-4 text-left">Pillar</th>
                  <th className="px-4 py-4 text-left">Format</th>
                  <th className="px-4 py-4 text-left">Hook + Angle</th>
                  <th className="px-4 py-4 text-left">CTA / Platforms</th>
                  <th className="px-4 py-4 text-left">Batching + AI Assist</th>
                </tr>
              </thead>
              <tbody>
                {state.plan.map((item, index) => (
                  <tr
                    key={item.day}
                    className={index % 2 === 0 ? 'bg-slate-950/60' : 'bg-slate-900/40'}
                  >
                    <td className="align-top px-4 py-4">
                      <div className="text-sm font-semibold text-blue-200">
                        Day {item.day}
                      </div>
                      <div className="text-xs text-slate-400">{item.dateLabel}</div>
                    </td>
                    <td className="align-top px-4 py-4 text-sm text-slate-200">
                      {item.pillar}
                    </td>
                    <td className="align-top px-4 py-4 text-sm text-slate-200">
                      {item.format}
                    </td>
                    <td className="align-top px-4 py-4">
                      <p className="text-sm font-semibold text-white">{item.hook}</p>
                      <pre className="mt-2 whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-xs text-slate-300">
                        {item.prompt}
                      </pre>
                    </td>
                    <td className="align-top px-4 py-4 text-sm text-slate-200">
                      <p>{item.cta}</p>
                      <p className="mt-2 text-xs uppercase tracking-widest text-slate-400">
                        Platforms
                      </p>
                      <p className="text-xs text-slate-200">{item.platformFocus.join(' · ')}</p>
                    </td>
                    <td className="align-top px-4 py-4 text-sm text-slate-200">
                      <p>{item.batchingTip}</p>
                      <p className="mt-2 text-xs uppercase tracking-widest text-slate-400">
                        AI Assist
                      </p>
                      <p className="text-xs text-slate-200">{item.aiAssist}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};
