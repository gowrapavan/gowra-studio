import Link from "next/link";

/**
 * Footer primitive for the demo sites.
 *
 * This is a set of five *layouts*, not one footer with the colours swapped:
 * each variant arranges the same kinds of content (brand, navigation,
 * practical facts) differently, so a restaurant and a gym don't end on the
 * same shape. A demo picks the variant that suits its industry and passes
 * its own colour/type classes in `cls` — the classes are written out in
 * each page file so Tailwind can see them.
 *
 * Nothing here pretends to be real: there are no social links, because
 * these are fictional businesses with no accounts to link to, and every
 * footer says so.
 */

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export type FooterTheme = {
  /** Root: background + text colour. */
  root: string;
  /** De-emphasised text. */
  muted: string;
  /** Border colour utility, e.g. "border-wedding-line". */
  line: string;
  /** Link hover treatment. */
  hover: string;
  /** Display/heading font utility. */
  display: string;
};

type Props = {
  variant: "columns" | "centered" | "ledger" | "wordmark" | "band";
  brand: string;
  blurb: string;
  columns: FooterColumn[];
  /** Practical facts: address, hours, phone — shown as plain text. */
  facts?: string[];
  /** Only used by the "band" variant: the closing next step. */
  cta?: FooterLink & { lead: string };
  theme: FooterTheme;
};

const year = new Date().getFullYear();

function Disclaimer({ brand, theme }: { brand: string; theme: FooterTheme }) {
  return (
    <p className={`text-xs ${theme.muted}`}>
      © {year} {brand}. A demo website concept — the business, people, prices
      and contact details shown are fictional.
    </p>
  );
}

function LinkList({ links, theme }: { links: FooterLink[]; theme: FooterTheme }) {
  return (
    <ul className="space-y-1">
      {links.map((l) => (
        <li key={l.label}>
          <Link
            href={l.href}
            className={`inline-flex min-h-6 items-center text-sm ${theme.muted} ${theme.hover}`}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function DemoFooter({ variant, brand, blurb, columns, facts = [], cta, theme }: Props) {
  if (variant === "centered") {
    return (
      <footer className={`border-t px-3 py-12 text-center md:px-4 ${theme.root} ${theme.line}`}>
        <p className={`text-xl ${theme.display}`}>{brand}</p>
        <p className={`mx-auto mt-2 max-w-measure-narrow text-sm ${theme.muted}`}>{blurb}</p>
        <nav aria-label={`${brand} footer`} className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {columns.flatMap((c) => c.links).map((l) => (
            <Link key={l.label} href={l.href} className={`inline-flex min-h-6 items-center text-sm ${theme.muted} ${theme.hover}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        {facts.length > 0 && (
          <p className={`mt-6 text-xs ${theme.muted}`}>{facts.join("  ·  ")}</p>
        )}
        <div className={`mx-auto mt-6 max-w-measure border-t pt-4 ${theme.line}`}>
          <Disclaimer brand={brand} theme={theme} />
        </div>
      </footer>
    );
  }

  if (variant === "ledger") {
    return (
      <footer className={`border-t px-3 py-8 md:px-4 md:py-12 ${theme.root} ${theme.line}`}>
        <div className="mx-auto max-w-page">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
            <p className={`text-lg uppercase tracking-wide ${theme.display}`}>{brand}</p>
            <p className={`max-w-measure-narrow text-sm ${theme.muted}`}>{blurb}</p>
          </div>
          <dl className={`mt-6 border-t ${theme.line}`}>
            {columns.map((c) => (
              <div key={c.title} className={`grid gap-1 border-b py-3 sm:grid-cols-4 ${theme.line}`}>
                <dt className={`text-xs uppercase tracking-wide ${theme.muted}`}>{c.title}</dt>
                <dd className="flex flex-wrap gap-x-4 sm:col-span-3">
                  {c.links.map((l) => (
                    <Link key={l.label} href={l.href} className={`inline-flex min-h-6 items-center text-sm ${theme.hover}`}>
                      {l.label}
                    </Link>
                  ))}
                </dd>
              </div>
            ))}
            {facts.length > 0 && (
              <div className={`grid gap-1 border-b py-3 sm:grid-cols-4 ${theme.line}`}>
                <dt className={`text-xs uppercase tracking-wide ${theme.muted}`}>Details</dt>
                <dd className="text-sm sm:col-span-3">
                  {facts.map((f) => (
                    <span key={f} className="mr-4 inline-block">{f}</span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
          <div className="mt-4">
            <Disclaimer brand={brand} theme={theme} />
          </div>
        </div>
      </footer>
    );
  }

  if (variant === "wordmark") {
    return (
      <footer className={`border-t px-3 pt-8 pb-6 md:px-4 ${theme.root} ${theme.line}`}>
        <div className="mx-auto max-w-page">
          <p className={`text-3xl uppercase leading-none tracking-tight ${theme.display}`}>{brand}</p>
          <p className={`mt-2 max-w-measure-narrow text-sm ${theme.muted}`}>{blurb}</p>
          <nav aria-label={`${brand} footer`} className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title}>
                <p className={`text-xs uppercase tracking-wide ${theme.muted}`}>{c.title}</p>
                <div className="mt-1">
                  <LinkList links={c.links} theme={theme} />
                </div>
              </div>
            ))}
          </nav>
          {facts.length > 0 && (
            <ul className={`mt-6 flex flex-wrap gap-x-4 gap-y-1 border-t pt-4 text-sm ${theme.line}`}>
              {facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
          <div className="mt-4">
            <Disclaimer brand={brand} theme={theme} />
          </div>
        </div>
      </footer>
    );
  }

  if (variant === "band") {
    return (
      <footer className={`${theme.root}`}>
        {cta && (
          <div className={`border-t px-3 py-8 md:px-4 md:py-12 ${theme.line}`}>
            <div className="mx-auto flex max-w-page flex-col justify-between gap-3 md:flex-row md:items-center">
              <p className={`max-w-measure-narrow text-xl ${theme.display}`}>{cta.lead}</p>
              <Link
                href={cta.href}
                className={`inline-flex w-fit items-center border px-4 py-2 text-sm font-medium ${theme.line} ${theme.hover}`}
              >
                {cta.label}
              </Link>
            </div>
          </div>
        )}
        <div className={`border-t px-3 py-6 md:px-4 ${theme.line}`}>
          <div className="mx-auto flex max-w-page flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <nav aria-label={`${brand} footer`} className="flex flex-wrap gap-x-4">
              {columns.flatMap((c) => c.links).map((l) => (
                <Link key={l.label} href={l.href} className={`inline-flex min-h-6 items-center text-sm ${theme.muted} ${theme.hover}`}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <Disclaimer brand={brand} theme={theme} />
          </div>
        </div>
      </footer>
    );
  }

  // "columns" — brand block left, link columns right, facts underneath.
  return (
    <footer className={`border-t px-3 py-8 md:px-4 md:py-12 ${theme.root} ${theme.line}`}>
      <div className="mx-auto grid max-w-page gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className={`text-xl ${theme.display}`}>{brand}</p>
          <p className={`mt-2 max-w-measure-narrow text-sm ${theme.muted}`}>{blurb}</p>
        </div>
        <nav aria-label={`${brand} footer`} className="grid grid-cols-2 gap-6 md:col-span-8 md:grid-cols-3">
          {columns.map((c) => (
            <div key={c.title}>
              <p className={`text-xs uppercase tracking-wide ${theme.muted}`}>{c.title}</p>
              <div className="mt-1">
                <LinkList links={c.links} theme={theme} />
              </div>
            </div>
          ))}
        </nav>
      </div>
      <div className={`mx-auto mt-8 flex max-w-page flex-col gap-2 border-t pt-4 ${theme.line}`}>
        {facts.length > 0 && <p className="text-sm">{facts.join("  ·  ")}</p>}
        <Disclaimer brand={brand} theme={theme} />
      </div>
    </footer>
  );
}
