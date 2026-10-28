import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/config/site";

export function WhatsAppFloat() {
  const link = getWhatsAppLink("Hi! I'd like to ask about a website for my business.");
  if (!link) return null;

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="safe-bottom-offset fixed right-3 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-whatsapp text-white shadow-e2 transition-transform hover:scale-105"
    >
      <MessageCircle size={20} />
    </a>
  );
}
