"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Container, buttonClass } from "../ui";
import { getWhatsAppLink, getEmailLink } from "@/config/site";

const businessTypes = [
  "Restaurant",
  "Café",
  "Hotel",
  "Salon",
  "Gym",
  "Shop",
  "Clinic",
  "Real estate",
  "Service business",
  "Other",
];

const needs = [
  "New website",
  "Website redesign",
  "Online menu",
  "Booking system",
  "Business website",
  "E-commerce",
  "Custom web application",
  "Other",
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [problem, setProblem] = useState("");
  const submitted = status === "sent";
  const setSubmitted = (v: boolean) => setStatus(v ? "sent" : "idle");
  const whatsappLink = getWhatsAppLink(
    "Hi! I just requested a free website demo — following up here."
  );
  const emailLink = getEmailLink("Free website demo request");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const f = new FormData(e.currentTarget);
    const payload = {
      name: f.get("name"),
      business: f.get("business"),
      businessType: f.get("businessType"),
      whatsapp: f.get("whatsapp"),
      email: f.get("email"),
      currentWebsite: f.get("currentWebsite"),
      details: f.get("details"),
      needs: f.getAll("needs"),
      company_site: f.get("company_site"),
    };
    setStatus("sending");
    setProblem("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
        return;
      }
      setProblem(
        res.status === 400 || res.status === 429
          ? data.error || "Please check the form and try again."
          : "We could not send your request just now. Nothing has been lost on your side; please use one of the options below, or try again in a minute."
      );
    } catch {
      setProblem("We could not reach the server. Please check your connection and try again.");
    }
    setStatus("error");
  }

  if (submitted) {
    return (
      <section id="contact" className="border-t border-line bg-paper py-8 md:py-12">
        <Container className="max-w-measure-narrow text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Thanks — we received your request.
          </h2>
          <p className="mt-2 text-ink-soft">
            We&apos;ll review your business details and get back to you about
            your website concept.
          </p>
          <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className={buttonClass.solid}
              >
                Continue on WhatsApp <ArrowUpRight size={16} />
              </a>
            )}
            <button
              onClick={() => setSubmitted(false)}
              className={buttonClass.tonal}
            >
              Back to website
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="contact" className="border-t border-line bg-paper py-8 md:py-12">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Let&apos;s build something for your business.
            </h2>
            <p className="mt-3 max-w-measure-narrow text-ink-soft">
              Tell us what you do. We&apos;ll show you what your website
              could look like.
            </p>

            <ol className="mt-4 max-w-measure-narrow divide-y divide-line border-y border-line text-sm">
              {["We read your business details.", "We build a working concept of your website.", "You click through it and decide whether to go ahead."].map((t, n) => (
                <li key={t} className="flex gap-2 py-2"><span className="font-semibold">{n + 1}.</span><span className="text-ink-soft">{t}</span></li>
              ))}
            </ol>

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className={`mt-3 ${buttonClass.tonal}`}
              >
                <MessageCircle size={16} />
                WhatsApp us instead
              </a>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="plate plate-ink relative grid gap-3 bg-paper p-3 sm:grid-cols-2"
          >
            <Field label="Your name" name="name" required className="sm:col-span-1" />
            <Field label="Business name" name="business" required className="sm:col-span-1" />

            <label className="sm:col-span-1">
              <span className="mb-1 block text-sm text-ink-soft">
                Business type
              </span>
              <select
                name="businessType"
                required
                className="w-full rounded-md border border-ink/30 bg-paper px-2 py-1 text-sm outline-none focus:border-ink focus-visible:ring-2 focus-visible:ring-ink"
                defaultValue=""
              >
                <option value="" disabled>
                  Select one
                </option>
                {businessTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <Field label="WhatsApp number" name="whatsapp" required className="sm:col-span-1" />
            <Field label="Email" name="email" type="email" required className="sm:col-span-1" />
            <Field
              label="Current website (optional)"
              name="currentWebsite"
              required={false}
              className="sm:col-span-1"
            />

            <label className="sm:col-span-2">
              <span className="mb-1 block text-sm text-ink-soft">
                Tell us about your business
              </span>
              <textarea
                name="details"
                rows={4}
                className="w-full rounded-md border border-ink/30 bg-paper px-2 py-1 text-sm outline-none focus:border-ink focus-visible:ring-2 focus-visible:ring-ink"
              />
            </label>

            <fieldset className="sm:col-span-2">
              <legend className="mb-2 text-sm text-ink-soft">
                What are you looking for?
              </legend>
              <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-3">
                {needs.map((n) => (
                  <label key={n} className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      name="needs"
                      value={n}
                      className="h-2 w-2 accent-ink"
                    />
                    {n}
                  </label>
                ))}
              </div>
            </fieldset>

            <div aria-hidden="true" className="absolute -left-full h-0 w-0 overflow-hidden">
              <label>
                Leave this field empty
                <input type="text" name="company_site" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className={`${buttonClass.primary} w-full sm:w-auto sm:self-start`}
              >
                {status === "sending" ? "Sending…" : <>Get a free demo <ArrowUpRight size={16} /></>}
              </button>
              <div aria-live="polite">
                {status === "error" && (
                  <div role="alert" className="border-l-2 border-brass-deep pl-2 text-sm">
                    <p>{problem}</p>
                    {(whatsappLink || emailLink) && (
                      <p className="mt-1 flex flex-wrap gap-x-3">
                        {whatsappLink && <a className="font-semibold underline underline-offset-4" href={whatsappLink} target="_blank" rel="noopener noreferrer">WhatsApp us</a>}
                        {emailLink && <a className="font-semibold underline underline-offset-4" href={emailLink}>Email us</a>}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-1 block text-sm text-ink-soft">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-md border border-ink/30 bg-paper px-2 py-1 text-sm outline-none focus:border-ink focus-visible:ring-2 focus-visible:ring-ink"
      />
    </label>
  );
}
