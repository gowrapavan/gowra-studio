import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { ServiceMenu } from "./ServiceMenu";
import { CheckCircle2, ClipboardCheck, CalendarClock, Hammer, ShieldCheck, ArrowRight } from "lucide-react";
import { service } from "@/config/images";
import { demoContact, telHref, waHref } from "@/config/demos";
import { Photo, Frame } from "@/components/Photo";
import { DemoForm } from "@/components/DemoForm";
import { DemoFooter } from "@/components/DemoFooter";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { serviceFont } from "@/lib/fonts";

export const metadata: Metadata = withSocial({
  title: "Northline Home Services — Home services demo",
  description: "A demo home-services website: services, how a job works, sample project write-ups, FAQs and a quote request.",
});

const wrap = "mx-auto w-full max-w-page px-3 md:px-4";
const services = [
  { t: "Carpentry & joinery", b: "Doors, shelving, stairs and bespoke fitted work.", p: service.carpentry },
  { t: "Tiling", b: "Kitchens, bathrooms and floors, set and grouted properly.", p: service.tiling },
  { t: "Kitchen renovation", b: "Strip-out to finish, with one point of contact.", p: service.kitchen },
  { t: "Painting & decorating", b: "Careful prep, clean lines, tidy sites.", p: service.decorating },
  { t: "Structural work", b: "Openings, props and support, with engineer sign-off.", p: service.structural },
  { t: "Wall repair & prep", b: "Filling, skimming and sanding ready for finish.", p: service.wallPrep },
];
const steps = [
  { icon: ClipboardCheck, t: "Request a quote", b: "Tell us what's going on and send a few photos if you can." },
  { icon: CalendarClock, t: "We assess the job", b: "A technician reviews the details and gives you a clear, written price." },
  { icon: Hammer, t: "We get to work", b: "Scheduled for a time that suits you, with the same crew throughout." },
  { icon: ShieldCheck, t: "You sign it off", b: "We walk through the finished work together before it's closed." },
];
const cases = [
  { t: "Kitchen strip-out and refit", p: service.kitchen, problem: "A dated, closed-off kitchen with failing cabinets.", did: "Removed the old units, reconfigured the layout, and fitted new joinery, tiling and finishes.", result: "A single open room that the household actually uses." },
  { t: "Opening up a load-bearing wall", p: service.structural, problem: "Two small rooms that needed to become one.", did: "Propped the structure, installed support to the engineer's specification, and made good.", result: "One connected space, with the paperwork to prove it was done properly." },
];
const faqs = [
  ["How do you price a job?", "You get a written quote before any work starts. If the scope changes, we stop and agree the change with you first."],
  ["Who actually turns up?", "The technician who quoted the job, or someone from the same crew. You get a name before the day."],
  ["Do you clear up?", "Every day. Dust sheets down, tools packed, and the site left as tidy as we found it."],
  ["Can I send photos instead of booking a visit?", "Yes. Photos let us give a ballpark first; we confirm the price after seeing the job in person."],
];
const areas = ["Riverside", "Oakhill", "Millbrook", "Fairview", "Cedar Park", "Northgate"];
const f = "mt-1 w-full rounded-md border border-northline-navy/25 bg-white px-3 py-2 text-base text-northline-navy";

export default function ServiceDemo() {
  const contact = demoContact.service;
  const tel = telHref(contact);
  const whatsapp = waHref(contact, "Hi — I'd like a quote for some work.");
  void whatsapp;
  return (
    <div id="top" className={`${serviceFont.variable} textured bg-northline-bg font-service text-northline-navy`}>
      {/*
        Utility bar. It carries a phone number only when one is configured —
        never a placeholder — so the strip simply narrows to the coverage
        line until then.
      */}
      <div className="bg-northline-navy py-1 text-center text-xs text-white/80">
        Written quotes · Serving Riverside, Oakhill &amp; four more areas
        {tel && (
          <>
            {" · Call "}
            <a href={tel} className="underline">
              {contact.phone}
            </a>
          </>
        )}
      </div>

      {/*
        Full-bleed trade header: one solid navy bar, flush under the utility
        strip, sticky on scroll. No floating capsule, so no page background
        shows around it and the hero starts exactly where the bar ends.
      */}
      <header className="sticky top-0 z-50 bg-northline-navy shadow-e1">
        <div className="relative mx-auto flex h-8 max-w-page items-center justify-between gap-2 px-3 md:px-4">
          <a href="#top" className="inline-flex h-6 shrink-0 items-center text-sm font-extrabold tracking-tight text-white sm:text-base">
            NORTHLINE{" "}
            <span className="ml-1 hidden font-medium text-northline-sky sm:inline">HOME SERVICES</span>
          </a>
          <nav aria-label="Sections" className="hidden gap-4 lg:flex">
            {[
              { href: "#services", label: "Services" },
              { href: "#work", label: "Recent work" },
              { href: "#process", label: "Process" },
              { href: "#areas", label: "Areas" },
              { href: "#faq", label: "FAQ" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="inline-flex h-6 items-center text-sm font-medium text-white/75 hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <a href="#quote" className="inline-flex h-6 items-center rounded-md bg-northline-amber px-2 text-sm font-bold text-northline-navy hover:brightness-95 sm:px-3">
              <span className="sm:hidden">Quote</span>
              <span className="hidden sm:inline">Get a free quote</span>
            </a>
            <ServiceMenu />
          </div>
        </div>
      </header>
      <main id="main">
        {/* 1 — Hero: the promise on the left, the quote form on the right, over a real job-site photograph */}
        <section aria-label="Get a quote" className="relative overflow-hidden bg-northline-navy text-white">
          <Photo photo={service.hero} grade="none" priority sizes="100vw" position="center 40%" />
          <div className="absolute inset-0 bg-northline-navy/80" />
          <div className={`${wrap} relative grid grid-cols-1 items-center gap-8 py-12 lg:grid-cols-12 lg:gap-16 md:py-16`}>
            <div className="lg:col-span-7">
              <p className="inline-block rounded-full bg-northline-amber px-4 py-1 text-xs font-bold uppercase tracking-ultra text-northline-navy">Home repairs &amp; renovations</p>
              <h1 className="fade-up mt-6 text-4xl font-extrabold leading-tight md:text-5xl">Done right the first time, with the price agreed up front.</h1>
              <p className="mt-6 max-w-measure text-lg text-white/85">Carpentry, tiling, kitchens, structural work and decorating — quoted in writing before anyone picks up a tool.</p>
              <ul className="mt-8 space-y-3 text-lg">
                {["A written quote before any work starts", "The same named crew from start to finish", "A tidy site, every single day"].map((x) => (
                  <li key={x} className="flex items-start gap-3"><CheckCircle2 size={24} className="mt-1 shrink-0 text-northline-amber" aria-hidden />{x}</li>
                ))}
              </ul>
              {tel && <a href={tel} className="mt-8 inline-block text-xl font-bold underline decoration-northline-amber decoration-2 underline-offset-4">Or call {contact.phone}</a>}
            </div>
            <div id="quote" className="lg:col-span-5">
              <div className="rounded-lg bg-white p-4 text-northline-navy shadow-e2 md:p-6">
                <h2 className="text-2xl font-extrabold">Get a free quote</h2>
                <p className="mt-1 text-sm text-northline-navy/70">Takes about a minute. We reply with next steps.</p>
                <DemoForm className="mt-3 grid gap-2" noteClassName="rounded-md bg-northline-bg p-3 text-sm">
                  <label className="text-sm font-medium">Your name<input required name="name" autoComplete="name" className={f} /></label>
                  <label className="text-sm font-medium">Phone or email<input required name="contact" autoComplete="email" className={f} /></label>
                  <label className="text-sm font-medium">What do you need?<select name="service" className={f}>{services.map((s) => <option key={s.t}>{s.t}</option>)}</select></label>
                  <label className="text-sm font-medium">Tell us a little<textarea name="details" rows={2} className={f} /></label>
                  <button className="rounded-md bg-northline-amber px-3 py-2 text-base font-bold text-northline-navy hover:brightness-95">Request my quote</button>
                </DemoForm>
              </div>
            </div>
          </div>
        </section>

        {/* 2 — Trust bar */}
        <section aria-label="Why people choose us" className="border-b border-northline-navy/10 bg-white">
          <ul className={`${wrap} grid grid-cols-2 gap-4 py-6 text-sm font-bold md:grid-cols-4`}>
            {["Written quotes", "Named crew", "Tidy sites", "Six areas covered"].map((x) => <li key={x} className="flex items-center gap-2"><ShieldCheck size={22} aria-hidden className="shrink-0 text-northline-sky" />{x}</li>)}
          </ul>
        </section>

        {/* 3 — Services */}
        <section id="services" aria-labelledby="svc-h" className="py-12 md:py-16">
          <div className={wrap}>
            <div className="max-w-measure"><p className="text-xs font-bold uppercase tracking-ultra text-northline-sky">What we do</p><h2 id="svc-h" className="mt-3 text-3xl font-extrabold md:text-4xl">Six trades, one point of contact</h2></div>
            <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <li key={s.t} className="zoom group overflow-hidden rounded-lg bg-white shadow-e1">
                  <Frame ratio="3 / 2"><Photo photo={s.p} grade="none" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" /></Frame>
                  <div className="p-6"><h3 className="text-xl font-bold">{s.t}</h3><p className="mt-2 text-northline-navy/70">{s.b}</p><a href="#quote" className="mt-4 inline-flex items-center gap-2 py-2 text-sm font-bold text-northline-sky hover:text-northline-navy">Get a quote <ArrowRight size={16} aria-hidden /></a></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4 — Why Northline */}
        <section aria-labelledby="why-h" className="bg-northline-navy py-12 text-white md:py-16">
          <div className={`${wrap} grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16`}>
            <div className="lg:col-span-5"><Frame ratio="4 / 5" mobileRatio="4 / 3" className="rounded-lg"><Photo photo={service.crew} grade="none" sizes="(min-width: 1024px) 40vw, 100vw" /></Frame></div>
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-ultra text-northline-amber">Why Northline</p>
              <h2 id="why-h" className="mt-3 text-3xl font-extrabold md:text-4xl">A small crew. The same faces. No surprises.</h2>
              <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[["Price agreed first", "You get a written quote before any work starts. If scope changes, we stop and agree it with you."], ["Someone you have met", "The technician who quoted the job, or one of their crew. You get a name before the day."], ["Tidy, every day", "Dust sheets down, tools packed, the site left as we found it."], ["Signed off together", "We walk the finished work with you before the job is closed."]].map(([k, v]) => (
                  <div key={k} className="border-t border-white/20 pt-4"><dt className="text-lg font-bold">{k}</dt><dd className="mt-2 text-sm text-white/75">{v}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 5 — Process */}
        <section id="process" aria-labelledby="proc-h" className="py-12 md:py-16">
          <div className={wrap}>
            <div className="mx-auto max-w-measure text-center"><p className="text-xs font-bold uppercase tracking-ultra text-northline-sky">How a job works</p><h2 id="proc-h" className="mt-3 text-3xl font-extrabold md:text-4xl">From first call to sign-off in four steps</h2></div>
            <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.t} className="rounded-lg bg-white p-6 shadow-e1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-northline-navy text-white"><s.icon size={24} aria-hidden /></span>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-northline-sky">Step {i + 1}</p>
                  <h3 className="mt-1 text-xl font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm text-northline-navy/70">{s.b}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6 — Sample projects */}
        <section id="work" aria-labelledby="work-h" className="bg-white py-12 md:py-16">
          <div className={wrap}>
            <div className="max-w-measure"><p className="text-xs font-bold uppercase tracking-ultra text-northline-sky">Recent work</p><h2 id="work-h" className="mt-3 text-3xl font-extrabold md:text-4xl">Sample project write-ups</h2><p className="mt-3 text-sm text-northline-navy/60">Written for this demo to show how a case study reads. They describe typical jobs, not real customers.</p></div>
            <div className="mt-12 space-y-12">
              {cases.map((c, i) => (
                <article key={c.t} className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-16">
                  <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}><Frame ratio="4 / 3" className="rounded-lg"><Photo photo={c.p} grade="none" sizes="(min-width: 1024px) 50vw, 100vw" /></Frame></div>
                  <div className="lg:col-span-6">
                    <h3 className="text-2xl font-extrabold md:text-3xl">{c.t}</h3>
                    <dl className="mt-6 space-y-4">
                      <div><dt className="text-xs font-bold uppercase tracking-wide text-northline-sky">The problem</dt><dd className="mt-1">{c.problem}</dd></div>
                      <div><dt className="text-xs font-bold uppercase tracking-wide text-northline-sky">What we did</dt><dd className="mt-1">{c.did}</dd></div>
                      <div><dt className="text-xs font-bold uppercase tracking-wide text-northline-sky">The result</dt><dd className="mt-1">{c.result}</dd></div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 7 — Mid-page call to action */}
        <section aria-label="Get in touch" className="bg-northline-amber text-northline-navy">
          <div className={`${wrap} flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center`}>
            <div><h2 className="text-3xl font-extrabold md:text-4xl">Not sure what the job needs?</h2><p className="mt-2 max-w-measure font-medium">Send a few photos with your quote request and we will give you a ballpark straight away.</p></div>
            <a href="#quote" className="inline-flex shrink-0 items-center gap-2 rounded-md bg-northline-navy px-6 py-2 font-bold text-white hover:bg-northline-sky">Get my quote <ArrowRight size={18} aria-hidden /></a>
          </div>
        </section>

        {/* 8 — Areas and FAQ */}
        <section aria-labelledby="areas-h" className="py-12 md:py-16">
          <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16`}>
            <div id="areas" className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-ultra text-northline-sky">Where we work</p>
              <h2 id="areas-h" className="mt-3 text-3xl font-extrabold md:text-4xl">Areas we cover</h2>
              <p className="mt-3 text-northline-navy/70">Not on the list? Ask — we sometimes make exceptions for larger jobs.</p>
              <ul className="mt-6 flex flex-wrap gap-2">{areas.map((a) => <li key={a} className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-e1">{a}</li>)}</ul>
            </div>
            <div id="faq" className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-ultra text-northline-sky">FAQ</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Common questions</h2>
              <div className="mt-6 divide-y divide-northline-navy/15 border-y border-northline-navy/15">
                {faqs.map(([q, a]) => (
                  <details key={q} className="group py-4">
                    <summary className="flex min-h-6 cursor-pointer list-none items-center justify-between gap-3 py-2 text-lg font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-northline-sky">{q}<span aria-hidden className="text-2xl text-northline-sky transition-transform group-open:rotate-45">+</span></summary>
                    <p className="mt-2 text-northline-navy/70">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <DemoFooter
        variant="ledger"
        brand="Northline Home Services"
        blurb="Home repairs and renovations with the price agreed in writing first."
        columns={[
          { title: "Services", links: [{ label: "What we do", href: "#services" }, { label: "Sample projects", href: "#work" }] },
          { title: "Help", links: [{ label: "How a job works", href: "#process" }, { label: "Questions", href: "#faq" }, { label: "Get a quote", href: "#quote" }] },
        ]}
        theme={{ root: "bg-white text-northline-navy", muted: "text-northline-navy/60", line: "border-northline-navy/15", hover: "hover:text-northline-sky", display: "font-service font-extrabold" }}
      />
      <BackToStudioCTA theme="bg-white text-northline-navy border-northline-navy/10 font-service" accentClass="bg-northline-navy text-white hover:bg-northline-sky" />
    </div>
  );
}
