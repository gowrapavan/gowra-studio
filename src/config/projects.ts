import { siteConfig } from "./site";

/**
 * Deployed projects that live outside this repository, shown under "Also
 * live on the web". Everything here is the owner's own record; the site
 * does not check these URLs at build time.
 *
 * TO ADD A PROJECT OR A NEW VERSION (e.g. Goal4u-v1, ZiloPlay-v1): append an
 * entry. Give a version its own entry and `version` label, so two versions of
 * one project are never presented as the same thing. Entries without any
 * link are skipped, so a half-filled entry cannot render a dead link.
 */

export type ProjectLink = { label: string; href: string };

export type ExternalProject = {
  name: string;
  /** e.g. "Original", "v1". Shown beside the name. */
  version?: string;
  /** Honest state: "Live" only for something the owner confirms is live. */
  status: "Live" | "In progress";
  summary: string;
  features: string[];
  technologies: string[];
  category: string;
  built: string;
  /** Date the owner last confirmed it was live. */
  checked?: string;
  /** Address shown as text, without protocol. */
  address?: string;
  note?: string;
  /** Optional picture; alt text is required with it. */
  image?: { src: string; alt: string };
  links: ProjectLink[];
};

export const externalProjects: ExternalProject[] = [
  {
    name: "Goal4u",
    version: "Original",
    status: "Live",
    summary: "A football web app for live scores, fixtures, statistics and streams.",
    features: [
      "Live scores, fixtures and statistics from football REST APIs",
      "Data refreshed automatically by GitHub Actions pipelines",
      "Streaming-related content",
    ],
    technologies: ["React", "Node.js", "REST APIs", "GitHub Actions"],
    category: "Entertainment",
    built: "Oct 2024 – Dec 2025",
    checked: "21 Oct 2026",
    address: "goal4u.netlify.app",
    note: "Its data comes from a serverless pipeline (Python, GitHub Actions, Playwright) that commits structured JSON to a repository, which acts as the data API for the frontend.",
    links: [
      { label: "View live project", href: "https://goal4u.netlify.app/" },
      { label: "Data pipeline repo", href: "https://github.com/gowrapavan/goal4u-data" },
    ],
  },
  {
    name: "ZiloPlay",
    status: "Live",
    summary: "A React interface for discovering movies, TV shows and anime.",
    features: [
      "Movie and TV discovery powered by the TMDb API",
      "Reusable responsive components and client-side state management",
      "Browse movies, TV shows and anime",
    ],
    technologies: ["React", "TMDb API", "Tailwind CSS"],
    category: "Entertainment",
    built: "Sep 2025 – Nov 2025",
    checked: "21 Oct 2026",
    address: "ziloplay.netlify.app",
    links: [
      { label: "View live project", href: "https://ziloplay.netlify.app/" },
      { label: "Source code", href: "https://github.com/gowrapavan/ziloplay" },
    ],
  },
  {
    name: "Portfolio",
    status: "Live",
    summary: "Gowra Pavan Kumar's personal portfolio.",
    features: [],
    technologies: [],
    category: "Portfolio",
    built: "",
    address: "gowra.netlify.app",
    links: [{ label: "Visit site", href: siteConfig.links.portfolio }],
  },
];
