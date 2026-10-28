import Link from "next/link";
import { Container } from "./ui";
import { siteConfig } from "@/config/site";

const columns = [
  {
    title: "Studio",
    links: [
      { href: "/#work", label: "Selected work" },
      { href: "/#demos", label: "All 14 demos" },
      { href: "/#services", label: "Services" },
      { href: "/#about", label: "About and live projects" },
      { href: "/#how-it-works", label: "Process" },
      { href: "/#contact", label: "Contact" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { href: siteConfig.links.portfolio, label: "Portfolio" },
      { href: siteConfig.links.github, label: "GitHub" },
      { href: siteConfig.links.linkedin, label: "LinkedIn" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <Container className="grid gap-3 py-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-lg">{siteConfig.companyName}</p>
          <p className="mt-2 max-w-measure-narrow text-sm text-ink-soft">
            {siteConfig.tagline}
          </p>
          <p className="mt-4 text-sm text-ink-soft">
            Founded &amp; built by {siteConfig.founder.name}
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-medium text-ink-soft">{col.title}</p>
            <ul className="mt-1">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-6 items-center text-sm text-ink hover:text-brass-deep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="flex flex-col-reverse items-start justify-between gap-2 border-t border-line py-3 text-sm text-ink-soft md:flex-row md:items-center">
        <p>
          © {new Date().getFullYear()} {siteConfig.companyName}. All rights
          reserved.
        </p>
        <p>Independent web-development studio.</p>
      </Container>
    </footer>
  );
}
