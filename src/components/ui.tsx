import Link from "next/link";
import { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container-page ${className}`}>{children}</div>;
}

/**
 * Button language, used for every action on the studio pages.
 *   primary — brass, the one next step on a screen (ask for a demo)
 *   solid   — ink, a confident secondary action
 *   tonal   — tinted, for quiet alternatives
 * One shape (small corner radius), one height, and the same hover, active
 * and focus treatment everywhere. Corners are deliberately not pills.
 */
const base =
  "inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-md px-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export const buttonClass = {
  primary: `${base} bg-brass text-ink hover:bg-ink hover:text-paper active:bg-ink/90`,
  solid: `${base} bg-ink text-paper hover:bg-brass-deep active:bg-ink/90`,
  tonal: `${base} bg-ink/10 text-ink hover:bg-ink/20 active:bg-ink/25`,
  /* For dark sections */
  light: `${base} bg-paper text-ink hover:bg-brass active:bg-brass/90`,
  ghost: `${base} border border-paper/40 text-paper hover:border-paper hover:bg-paper/10 active:bg-paper/20`,
} as const;

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: keyof typeof buttonClass;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonClass[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/** Kept for existing imports. */
export const PrimaryButton = ({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) => (
  <Button href={href} variant="solid" className={className}>{children}</Button>
);
export const SecondaryButton = ({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) => (
  <Button href={href} variant="tonal" className={className}>{children}</Button>
);

export function SectionHeading({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-measure">
      <h2 id={id} className="font-display text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      {children && <p className="mt-2 text-ink-soft">{children}</p>}
    </div>
  );
}
