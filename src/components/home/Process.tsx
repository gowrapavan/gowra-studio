import { Container } from "../ui";
import { processSteps as steps } from "@/config/services";



export function Process() {
  return (
    <section id="how-it-works" className="bg-ink py-8 text-paper md:py-12">
      <Container>
        <h2 className="max-w-measure font-display text-2xl font-bold tracking-tight md:text-3xl">We build your concept first. If you like it, we take it live.</h2>
        <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
          {steps.map(([t, b], i) => (
            <li key={t} className="border-t-2 border-brass pt-2">
              <span className="font-display text-sm font-bold text-brass">Step {i + 1}</span>
              <h3 className="mt-1 font-display text-lg font-bold">{t}</h3>
              <p className="mt-1 text-sm text-paper/80">{b}</p>
            </li>
          ))}
        </ol>
        <div id="pricing" className="mt-8 max-w-measure border-l-2 border-paper/40 pl-3">
          <h3 className="font-display text-lg font-bold">What costs extra</h3>
          <p className="mt-1 text-sm text-paper/80">Domain registration, premium hosting, paid third-party services and advanced integrations such as booking systems or payment gateways may be charged separately, depending on what your business needs. We tell you exactly what is involved before anything is added.</p>
        </div>
      </Container>
    </section>
  );
}
