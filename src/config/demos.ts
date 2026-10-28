/**
 * Contact details for the four demo businesses.
 *
 * These are fictional businesses, so by default they have no phone number,
 * no WhatsApp and no email. Nothing here falls back to a placeholder like
 * "(000) 000-0000" — an empty value means the component that would have
 * shown it renders nothing at all.
 *
 * When you adapt a demo for a real prospect, fill the values in here and the
 * call / WhatsApp / email affordances appear on their own.
 */

export type DemoContact = {
  /** E.164-ish number for tel: links. Empty = hide every call affordance. */
  phone: string;
  /** Digits only for wa.me. Empty = hide every WhatsApp affordance. */
  whatsapp: string;
  /** Empty = hide every mail affordance. */
  email: string;
};

const empty: DemoContact = { phone: "", whatsapp: "", email: "" };

export const demoContact: Record<
  | "restaurant"
  | "hotel"
  | "salon"
  | "service"
  | "retail"
  | "realestate"
  | "fitness"
  | "clinic"
  | "photography"
  | "travel"
  | "auto"
  | "wedding"
  | "education"
  | "construction",
  DemoContact
> = {
  restaurant: { ...empty },
  hotel: { ...empty },
  salon: { ...empty },
  service: { ...empty },
  retail: { ...empty },
  realestate: { ...empty },
  fitness: { ...empty },
  clinic: { ...empty },
  photography: { ...empty },
  travel: { ...empty },
  auto: { ...empty },
  wedding: { ...empty },
  education: { ...empty },
  construction: { ...empty },
};

/** Formats a tel: href, or null when no number is configured. */
export function telHref(contact: DemoContact): string | null {
  const digits = contact.phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
}

/** Formats a wa.me href, or null when no number is configured. */
export function waHref(
  contact: DemoContact,
  message?: string
): string | null {
  const digits = contact.whatsapp.replace(/\D/g, "");
  if (!digits) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

/** Formats a mailto: href, or null when no address is configured. */
export function mailHref(
  contact: DemoContact,
  subject?: string
): string | null {
  if (!contact.email) return null;
  const s = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${contact.email}${s}`;
}
