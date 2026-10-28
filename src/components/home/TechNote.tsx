import { Boxes, Database, GitBranch, Rocket } from "lucide-react";
import { Container } from "../ui";
import { Reveal } from "../Reveal";

const stack = [
  { icon: Boxes, label: "Next.js & React", note: "the site itself" },
  { icon: Database, label: "Supabase", note: "when data or bookings are involved" },
  { icon: Rocket, label: "Netlify or Vercel", note: "deployment" },
  { icon: GitBranch, label: "GitHub", note: "version control, always visible" },
];

/**
 * Composition: "info row" — icon+label pairs instead of a paragraph.
 * The only section on this page built from short facts rather than
 * prose or a card grid.
 */
export function TechNote() {
  return (
    <section className="border-t border-line bg-paper py-8 md:py-12">
      <Container>
        <h2 className="max-w-measure-narrow font-display text-xl tracking-tight md:text-2xl">
          Fast. Reliable. Built to grow. Chosen for what your business
          actually needs, not what looks impressive on a slide.
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:mt-8 md:grid-cols-4">
          {stack.map((t, i) => (
            <Reveal key={t.label} index={i} className="flex items-center gap-3">
              <t.icon size={20} className="shrink-0 text-brass-deep" />
              <div>
                <p className="font-medium text-ink">{t.label}</p>
                <p className="mt-1 text-sm text-ink-soft">{t.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
