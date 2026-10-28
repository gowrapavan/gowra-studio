import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "../ui";
import { ScaledFrame } from "../ScaledFrame";
import { demoBySlug } from "@/config/studio-demos";

/**
 * Selected work. Three demos shown running, in unequal sizes: the shop gets
 * the most room because it has the most behaviour (filtering, product
 * pages, a cart). Deployed projects outside the repo follow as a plain list.
 */

function Tile({ slug, ratio, large = false }: { slug: string; ratio: number; large?: boolean }) {
  const d = demoBySlug[slug];
  return (
    <Link href={`/demos/${slug}`} className="group block">
      <div className="plate plate-ink overflow-hidden bg-paper transition-transform group-hover:-translate-x-px group-hover:-translate-y-px">
        <ScaledFrame src={`/demos/${slug}`} title={`${d.name} demo preview`} ratio={ratio} phoneRatio={1} lazy />
      </div>
      <div className="mt-2 flex items-start justify-between gap-2">
        <div>
          <h3 className={`font-display font-bold ${large ? "text-xl" : "text-lg"}`}>
            {d.name} <span className="text-sm font-medium text-ink-soft">· {d.industry}</span>
          </h3>
          <p className="mt-1 max-w-measure-narrow text-sm text-ink-soft">
            {d.summary}
          </p>
        </div>
        <ArrowUpRight size={18} aria-hidden className="mt-1 shrink-0 text-ink-soft transition-transform group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-ink" />
      </div>
    </Link>
  );
}

export function Work() {
  return (
    <section id="work" className="border-b border-line bg-paper py-8 md:py-12">
      <Container>
        <SectionHeading title="Selected work">
          Three of the fourteen demo sites, running live. They are concept builds made to show our design and development, not paid client work.
        </SectionHeading>

        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-7 lg:row-span-2">
            <Tile slug="retail" ratio={1.1} large />
          </div>
          <div className="lg:col-span-5"><Tile slug="realestate" ratio={1.9} /></div>
          <div className="lg:col-span-5"><Tile slug="auto" ratio={1.9} /></div>
        </div>

      </Container>
    </section>
  );
}
