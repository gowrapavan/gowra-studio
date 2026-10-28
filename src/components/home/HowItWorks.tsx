import { Container } from "../ui";
import { Reveal } from "../Reveal";

const steps = [
  {
    n: "01",
    title: "Tell us about your business",
    body: "Send your business name, services, location, a few photos and anything you'd like included.",
  },
  {
    n: "02",
    title: "We create your website concept",
    body: "We design and build a working website based around your business, not a generic template.",
  },
  {
    n: "03",
    title: "You see it before committing",
    body: "You review the actual website — click through it, share it, sit with it — instead of imagining the result.",
  },
  {
    n: "04",
    title: "Launch when you're ready",
    body: "We connect your domain, hosting and any booking, payment or CMS features your business needs.",
  },
];

/**
 * Composition: "connected line, equal circles". Distinct from Model's
 * asymmetric span grid below it on the same page — a horizontal line
 * threading through four evenly-weighted numbered stops, rather than
 * cards of varying width.
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-line bg-paper py-8 md:py-12">
      <Container>
        <h2 className="font-display text-xl tracking-tight md:text-2xl">
          How it works
        </h2>

        <div className="timeline-rule relative mt-6 grid gap-4 text-ink md:mt-12 md:grid-cols-4 md:gap-4">
          <div className="absolute left-0 right-0 top-4 hidden h-px bg-line md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.n} index={i} className="relative flex gap-3 md:block">
              <div className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-ink bg-paper text-xs font-medium text-ink md:h-8 md:w-8 md:text-sm">
                {i + 1}
              </div>
              <div>
                <p className="text-base font-medium text-ink md:mt-3">{s.title}</p>
                <p className="mt-1 text-sm text-ink-soft md:mt-2">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
