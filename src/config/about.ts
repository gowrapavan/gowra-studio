import { siteConfig } from "./site";

/**
 * About the developer, shown beside the live projects on the homepage.
 * Written by the owner; edit here, not in the component.
 */
export const about = {
  name: "Gowra Pavan Kumar",
  role: "Full-stack developer & automation engineer",
  availability: "Available for new opportunities",
  avatar: { src: "https://avatars.githubusercontent.com/u/160145497?s=160", alt: "Gowra Pavan Kumar" },
  bio:
    "B.Tech Information Technology graduate who builds and deploys production web applications with React, Next.js, Node.js and Python. I also build custom web-scraping and automation tools, including Apify Actors for freelance clients, and I take projects end to end: scoping, development, deployment, documentation and client communication.",
  skills: [
    "React.js", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS",
    "Node.js", "Express.js", "REST APIs", "MongoDB", "Supabase", "Python",
    "Playwright", "Apify Actors",
  ],
  links: [
    { label: "GitHub", href: siteConfig.links.github, external: true },
    { label: "LinkedIn", href: siteConfig.links.linkedin, external: true },
    { label: "Email", href: "mailto:gowrapavankumar2004@gmail.com", external: false },
  ],
} as const;
