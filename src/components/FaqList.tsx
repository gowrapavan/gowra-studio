/**
 * Accessible FAQ list built on native <details>, so it works without
 * JavaScript and with the keyboard. Each demo passes its own class strings,
 * so the structure is shared but the look is not.
 */
export function FaqList({
  id = "faq",
  eyebrow,
  title,
  items,
  cls,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  items: readonly (readonly [string, string])[];
  cls: { section: string; eyebrow: string; h2: string; line: string; summary: string; answer: string; plus: string };
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={cls.section}>
      <div className="mx-auto grid w-full max-w-page grid-cols-1 gap-8 px-3 md:px-4 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className={cls.eyebrow}>{eyebrow}</p>
          <h2 id={`${id}-h`} className={cls.h2}>{title}</h2>
        </div>
        <div className={`lg:col-span-8 ${cls.line}`}>
          {items.map(([q, a]) => (
            <details key={q} className="group py-4">
              <summary className={`flex min-h-6 cursor-pointer list-none items-center justify-between gap-3 py-2 ${cls.summary}`}>
                {q}
                <span aria-hidden className={`transition-transform group-open:rotate-45 ${cls.plus}`}>+</span>
              </summary>
              <p className={`mt-2 max-w-measure ${cls.answer}`}>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
