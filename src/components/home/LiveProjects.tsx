import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Container, SectionHeading, buttonClass } from "../ui";
import { ProjectImage } from "./ProjectImage";
import { about } from "@/config/about";
import { externalProjects } from "@/config/projects";

const icons = { GitHub: Github, LinkedIn: Linkedin, Email: Mail } as const;

/**
 * "Also live on the web": who builds the studio's work, and the deployed
 * projects outside this repository. The About block sits beside the project
 * records on desktop and above them on phones.
 */
export function LiveProjects() {
  const projects = externalProjects.filter((p) => p.links.length > 0);
  return (
    <section id="about" aria-labelledby="live-h" className="scroll-mt-12 border-b border-line bg-paper py-8 md:py-12">
      <Container>
        <SectionHeading id="live-h" title="Also live on the web">
          Real projects built and deployed by the founder, alongside the studio&apos;s demo sites.
        </SectionHeading>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* ABOUT */}
          <aside aria-label="About the developer" className="lg:col-span-4">
            <div className="lg:sticky lg:top-12">
              <div className="flex items-center gap-3">
                <ProjectImage src={about.avatar.src} alt={about.avatar.alt} name={about.name} size="lg" />
                <div>
                  <h3 className="font-display text-lg font-bold">{about.name}</h3>
                  <p className="text-sm text-ink-soft">{about.role}</p>
                </div>
              </div>

              <p className="mt-3 flex items-center gap-2 text-sm font-semibold">
                <span aria-hidden className="h-1 w-1 rounded-full bg-brass-deep" />
                {about.availability}
              </p>

              <ul className="mt-3 flex flex-wrap gap-2">
                {about.links.map((l) => {
                  const Icon = icons[l.label as keyof typeof icons];
                  return (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={buttonClass.tonal}
                      >
                        <Icon size={16} aria-hidden />
                        {l.label}
                        {l.external && <span className="sr-only">(opens in a new tab)</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-4 text-ink-soft">{about.bio}</p>

              <ul aria-label="Skills" className="mt-3 flex flex-wrap gap-1">
                {about.skills.map((s) => (
                  <li key={s} className="rounded-md border border-line px-1 text-sm">{s}</li>
                ))}
              </ul>
            </div>
          </aside>

          {/* PROJECTS */}
          <ul className="divide-y divide-line border-y border-line lg:col-span-8">
            {projects.map((p) => (
              <li key={`${p.name}-${p.version ?? ""}`}>
                <article className="py-4 md:py-6">
                  <header className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl font-bold">
                      {p.name}
                      {p.version && <span className="ml-2 rounded-md border border-ink/30 px-1 align-middle text-sm font-semibold">{p.version}</span>}
                    </h3>
                    <p className="text-sm font-semibold text-brass-deep">{p.status}</p>
                  </header>
                  <p className="mt-1 text-ink-soft">{p.summary}</p>

                  {p.features.length > 0 && (
                    <>
                      <h4 className="mt-3 text-sm font-semibold">Features</h4>
                      <ul className="mt-1 space-y-1 text-sm">
                        {p.features.map((f) => <li key={f} className="border-l-2 border-brass pl-2">{f}</li>)}
                      </ul>
                    </>
                  )}

                  {p.technologies.length > 0 && (
                    <ul aria-label="Technologies" className="mt-3 flex flex-wrap gap-1">
                      {p.technologies.map((t) => <li key={t} className="rounded-md border border-line px-1 text-sm">{t}</li>)}
                    </ul>
                  )}

                  <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm md:grid-cols-4">
                    {[
                      ["Category", p.category],
                      ["Built", p.built],
                      ["Checked", p.checked],
                      ["Address", p.address],
                    ].filter(([, v]) => v).map(([k, v]) => (
                      <div key={k as string}><dt className="text-ink-soft">{k}</dt><dd className="font-semibold break-words">{v}</dd></div>
                    ))}
                  </dl>

                  {p.note && <p className="mt-3 text-sm text-ink-soft">{p.note}</p>}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.links.map((l, i) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={i === 0 ? buttonClass.solid : buttonClass.tonal}
                      >
                        {l.label}
                        <ArrowUpRight size={16} aria-hidden />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
