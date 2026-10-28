import { Container } from "../ui";

const before = ["Searching for your business finds a map pin and nothing else.", "The website was built years ago and is slow on a phone.", "Opening hours and prices are buried in social posts.", "There is no obvious way to book, order or ask a question."];
const after = ["One page answers what you do, where you are and when you are open.", "It loads quickly and reads well on any phone.", "Prices, menus and services are where people expect them.", "One clear button to book, call, order or enquire."];

export function Problem() {
  return (
    <section className="bg-paper py-12 md:py-16">
      <Container>
        <h2 className="max-w-measure font-display text-3xl font-bold tracking-tight md:text-4xl">Most local businesses lose customers before anyone walks in.</h2>
        <p className="mt-3 max-w-measure text-ink-soft">The service can be excellent and the first impression still lets it down. This is the gap we close.</p>
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
          <div className="bg-paper p-6 md:p-8">
            <h3 className="font-display text-xl font-bold">What customers find today</h3>
            <ul className="mt-4 space-y-3 text-ink-soft">{before.map((x) => <li key={x} className="flex gap-3"><span aria-hidden className="mt-1 text-ink/40">×</span>{x}</li>)}</ul>
          </div>
          <div className="bg-ink p-6 text-paper md:p-8">
            <h3 className="font-display text-xl font-bold">What they find with a Gowra website</h3>
            <ul className="mt-4 space-y-3 text-paper/80">{after.map((x) => <li key={x} className="flex gap-3"><span aria-hidden className="mt-1 text-brass">✓</span>{x}</li>)}</ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
