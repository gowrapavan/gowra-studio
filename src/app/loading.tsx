/**
 * Shown while a page is being fetched on navigation. Deliberately neutral
 * (no demo's colours), because it can appear in front of any of them.
 */
export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-hero flex-col items-center justify-center gap-3 bg-paper text-ink">
      <span aria-hidden className="h-6 w-6 animate-spin rounded-full border-4 border-ink/20 border-t-brass motion-reduce:animate-none" />
      <p className="text-sm text-ink-soft">Loading…</p>
    </div>
  );
}
