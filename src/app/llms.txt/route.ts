import { absoluteUrl } from "@/config/site-url";
import { siteConfig } from "@/config/site";
import { studioDemos } from "@/config/studio-demos";
import { externalProjects } from "@/config/projects";
import { about } from "@/config/about";

/**
 * /llms.txt — a plain-markdown summary for language-model crawlers, following
 * the llmstxt.org convention. It is an optional, emerging convention (not a
 * ranking factor), and it is generated from the same data as the site so it
 * cannot describe pages that do not exist.
 */
export const dynamic = "force-static";

export function GET() {
  const demos = studioDemos
    .map((d) => `- [${d.name} (${d.industry})](${absoluteUrl(`/demos/${d.slug}`)}): ${d.summary}`)
    .join("\n");
  const projects = externalProjects
    .filter((p) => p.links.length > 0)
    .map((p) => `- [${p.name}${p.version ? ` (${p.version})` : ""}](${p.links[0].href}): ${p.summary}`)
    .join("\n");

  const body = `# ${siteConfig.companyName}

> ${siteConfig.description}

${siteConfig.companyName} is a small web studio founded by ${siteConfig.founder.name}. It builds websites for local businesses and shows a working demo for the visitor's industry before any commitment; the concept is free. The demo businesses below are fictional and exist to show design and development work.

## Studio
- [Homepage](${absoluteUrl("/")}): the studio, selected work, services, process and the demo request form
- [Website design and development services](${absoluteUrl("/website-design-and-development")}): what the studio designs and builds, how a project works, and common questions
- [About and live projects](${absoluteUrl("/#about")}): the founder and deployed projects

## Demo websites (fictional businesses)
${demos}

## Projects built by the founder
${projects}

## About the founder
${about.name}: ${about.role}. ${about.bio}

## Contact
- Request a demo: ${absoluteUrl("/#contact")}
- GitHub: ${siteConfig.links.github}
- LinkedIn: ${siteConfig.links.linkedin}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
