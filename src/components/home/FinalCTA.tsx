import Link from "next/link";
import { Container } from "../ui";

export function FinalCTA() {
  return (
    <section className="bg-brass py-12 text-ink md:py-16">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <h2 className="max-w-measure font-display text-3xl font-bold tracking-tight md:text-4xl">Your customers are already looking. Give them somewhere good to land.</h2>
        <Link href="/#contact" className="shrink-0 rounded-full bg-ink px-8 py-4 text-sm font-bold text-paper hover:bg-paper hover:text-ink">Get my free demo</Link>
      </Container>
    </section>
  );
}
