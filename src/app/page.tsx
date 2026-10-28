import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Hero } from "@/components/home/Hero";
import { Work } from "@/components/home/Work";
import { LiveProjects } from "@/components/home/LiveProjects";
import { DemoIndex } from "@/components/home/DemoIndex";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Contact } from "@/components/home/Contact";
import { absoluteUrl } from "@/config/site-url";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";

// Structured data describing the studio and what it sells, for search engines.
// Only facts already on the site. A service area, email and phone are included
// only when they are configured; nothing is guessed, and there are no ratings.
const digits = siteConfig.contact.whatsappNumber.replace(/[^\d]/g, "");
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": absoluteUrl("/#organization"),
      name: siteConfig.companyName,
      url: absoluteUrl("/"),
      description: siteConfig.description,
      founder: { "@type": "Person", name: siteConfig.founder.name },
      sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.portfolio],
      serviceType: services.map(([name]) => name),
      knowsAbout: ["Website design", "Website development", "Next.js", "React"],
      ...(siteConfig.serviceArea ? { areaServed: { "@type": "Place", name: siteConfig.serviceArea } } : {}),
      ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
      ...(digits ? { telephone: `+${digits}` } : {}),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website design and development",
        itemListElement: services.map(([name, description]) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, description },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"),
      name: siteConfig.companyName,
      publisher: { "@id": absoluteUrl("/#organization") },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output, escaped so it can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <LiveProjects />
        <DemoIndex />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
