import { Container } from "../ui";
import { Reveal } from "../Reveal";

const stages = [
  {
    n: "01",
    title: "Start with a demo",
    body: "No development fee for the initial concept.",
  },
  {
    n: "02",
    title: "Review",
    body: "See how your business could actually look online.",
  },
  {
    n: "03",
    title: "Customize",
    body: "Adjust the design, content and functionality with us.",
  },
  {
    n: "04",
    title: "Launch",
    body: "Go live on your own domain, with the infrastructure your business needs.",
  },
];

// Stage one is the entry point and carries double the width of the
// three that follow it — a deliberate asymmetric span, not a repeat of
// HowItWorks' equal-weight connected line above it on the page.
const spans = ["md:col-span-6", "md:col-span-2", "md:col-span-2", "md:col-span-2"];

/**
 * Composition: "asymmetric span grid". Distinct from HowItWorks' equal
 * connected-circle line — the same four-stage idea, given a different
 * shape so the two sections don't read as one repeated pattern.
 */
export function Model() {
  return (
    <section id="pricing" className="border-t border-line bg-ink py-8 text-paper md:py-12">
      <Container>
        <div className="max-w-measure-narrow">
          <h2 className="font-display text-xl tracking-tight md:text-2xl">
            We build your concept first. If you like it, we take it live.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-12">
          {stages.map((s, i) => (
            <Reveal
              key={s.n}
              index={i}
              className={`border-t border-paper/20 pt-3 ${spans[i]}`}
            >
              <p className="text-sm text-brass">{s.n}</p>
              <p className={`mt-2 font-medium ${i === 0 ? "text-lg" : "text-base"}`}>
                {s.title}
              </p>
              <p className="mt-1 text-sm text-paper/70">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-measure border-t border-paper/20 pt-4 text-sm text-paper/70">
          Domain registration, premium hosting, paid third-party APIs, and
          advanced integrations (booking systems, payment gateways, custom
          backends) may be charged separately depending on what your business
          needs. We&apos;ll always tell you exactly what's involved before
          any of that is added.
        </p>
      </Container>
    </section>
  );
}
