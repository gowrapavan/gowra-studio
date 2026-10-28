// Central configuration for the studio's identity and contact details.
// Edit this file (or the environment variables it reads) to update the
// business name, founder credit, links and contact methods across the
// entire site without touching component code.

export const siteConfig = {
  // Temporary working brand — structured so it can be renamed in one place
  // once the business name is finalized.
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "Gowra Studio",
  tagline: "Websites built around your business.",
  description:
    "Website design and development for salons, restaurants, hotels, shops, clinics and other local businesses. See a working demo first; the concept is free.",
  /** Optional town or city the studio serves, e.g. "Guntur". Set NEXT_PUBLIC_SERVICE_AREA; nothing is assumed. */
  serviceArea: (process.env.NEXT_PUBLIC_SERVICE_AREA || "").trim(),

  founder: {
    name: "Gowra Pavan Kumar",
    role: "AI-Native Product Engineer · Automation Architect · Full-Stack Builder",
  },

  links: {
    portfolio: "https://gowra.netlify.app",
    github: "https://github.com/gowrapavan",
    linkedin: "https://www.linkedin.com/in/gowrapavan",
  },

  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  },
};

/** Builds a wa.me link with an optional prefilled message. Returns null if no number is configured. */
export function getWhatsAppLink(message?: string): string | null {
  const number = siteConfig.contact.whatsappNumber.replace(/[^\d]/g, "");
  if (!number) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

/** Returns a mailto link, or null if no contact email is configured. */
export function getEmailLink(subject?: string): string | null {
  const email = siteConfig.contact.email;
  if (!email) return null;
  const s = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${s}`;
}
