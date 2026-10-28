"use client";

import { useState } from "react";

const reasons = ["Check-up & clean", "Toothache", "Filling or repair", "Whitening", "Not sure"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday morning"];
const times = ["Morning", "Midday", "Late afternoon"];
const box = "mt-1 w-full rounded-2xl border border-clinic-line bg-clinic-bg px-3 py-2 text-base outline-none focus:border-clinic-accent";

/** Three-step appointment request. Nothing is sent anywhere: it's a demo. */
export function BookingSteps() {
  const [step, setStep] = useState(0);
  const [reason, setReason] = useState(reasons[0]);
  const [done, setDone] = useState(false);
  const titles = ["What brings you in?", "When suits you?", "How do we reach you?"];

  if (done)
    return (
      <p role="status" className="rounded-2xl bg-clinic-bg p-6 text-clinic-ink">
        Thank you — this is a demo, so nothing was sent. On a live site, the practice would reply to confirm a time for your {reason.toLowerCase()} appointment.
      </p>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 2) setStep(step + 1);
        else setDone(true);
      }}
      className="rounded-3xl bg-clinic-bg p-4 shadow-e1 md:p-6"
    >
      <ol className="flex gap-2" aria-label="Progress">
        {titles.map((t, i) => (
          <li key={t} aria-current={i === step ? "step" : undefined} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-clinic-accent" : "bg-clinic-line"}`} />
        ))}
      </ol>
      <p className="mt-3 text-xs uppercase tracking-wide text-clinic-ink/60">Step {step + 1} of 3</p>
      <h3 className="font-clinic-display text-2xl">{titles[step]}</h3>

      {step === 0 && (
        <fieldset className="min-w-0 mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <legend className="sr-only">Reason for your visit</legend>
          {reasons.map((r) => (
            <label key={r}>
              <input type="radio" name="reason" value={r} checked={reason === r} onChange={() => setReason(r)} className="peer sr-only" />
              <span className="block cursor-pointer rounded-2xl border border-clinic-line px-4 py-3 text-sm peer-checked:border-clinic-accent peer-checked:bg-clinic-panel peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-clinic-accent">{r}</span>
            </label>
          ))}
        </fieldset>
      )}
      {step === 1 && (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="text-sm">Preferred day<select name="day" className={box}>{days.map((d) => <option key={d}>{d}</option>)}</select></label>
          <label className="text-sm">Time of day<select name="time" className={box}>{times.map((d) => <option key={d}>{d}</option>)}</select></label>
        </div>
      )}
      {step === 2 && (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="text-sm">Name<input required name="name" autoComplete="name" className={box} /></label>
          <label className="text-sm">Email or phone<input required name="contact" className={box} /></label>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className="rounded-2xl px-4 py-3 text-sm text-clinic-ink/70 hover:text-clinic-ink">Back</button> : <span />}
        <button className="rounded-2xl bg-clinic-accent px-4 py-2 text-sm font-medium text-white hover:brightness-95">{step < 2 ? "Continue" : "Request appointment"}</button>
      </div>
    </form>
  );
}
