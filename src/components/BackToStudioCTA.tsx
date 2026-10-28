import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * The band that closes every demo page. It inherits the demo's own type
 * family (passed in via `theme`) rather than forcing the studio serif in,
 * so it reads as the last row of that site rather than a foreign widget.
 */
export function BackToStudioCTA({
  theme,
  accentClass,
}: {
  theme: string;
  accentClass: string;
}) {
  return (
    <div className={`border-t py-6 md:py-6 ${theme}`}>
      <div className="mx-auto flex max-w-page flex-col items-start justify-between gap-3 px-3 md:flex-row md:items-center">
        <p className="max-w-measure-narrow text-lg">
          Want something like this for your business?
        </p>
        <Link
          href="/#contact"
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition ${accentClass}`}
        >
          Build my website <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
