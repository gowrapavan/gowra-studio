import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Container, SectionHeading, Button, buttonClass } from "@/components/ui";
import { withSocial } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { services, processSteps, stackNote } from "@/config/services";
import { studioDemos } from "@/config/studio-demos";

export const metadata: Metadata = withSocial({
  title: "Website Design and Development for Local Businesses",
  description:
    "Website design and development for salons, restaurants, hotels, shops, clinics and local businesses. See a working demo for your industry first; the concept is free.",
});

// Visible questions and answers; the same list feeds the FAQ structured data.
const faqs: [string, string][] = [
  ["Is the concept really free?", "Yes. We build a working concept of your website first, with no development fee for the concept. Domain registration, premium hosting, paid third-party services and advanced integrations such as booking systems or payment gateways may be charged separately, and we tell you exactly what is involved before anything is added."],
  ["What do you need from me to start?", "The name of your business, your services, your location, a few photos and anything you want included."],
  ["Can the website take bookings, payments or messages?", "Yes. We connect WhatsApp, Google Maps, contact forms, bookings and payments, depending on what your business needs."],
  ["Will you put the site online on my domain?", "Yes. We put the site live on your own domain, on hosting suited to your business, and we can look after changes once it is live."],
  ["Which technologies do you use?", stackNote],
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main id="main">
        <section className="border-b border-line bg-paper py-8 md:py-12">
          <Container>
            <h1 className="max-w-measure font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Website design and development for local businesses
            </h1>
            <p className="mt-3 max-w-measure-narrow text-lg text-ink-soft">
              {siteConfig.companyName} designs and builds websites for salons, restaurants, hotels, shops, clinics and other
              local businesses. You see a working demo for your industry first, and the concept is free.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button href="/#contact" variant="primary">Get a free demo</Button>
              <Link href="/#demos" className={buttonClass.tonal}>Browse all {studioDemos.length} demos</Link>
            </div>
          </Container>
        </section>

        <section aria-labelledby="what-h" className="border-b border-line bg-paper py-8 md:py-12">
          <Container className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 id="what-h" className="font-display text-2xl font-bold tracking-tight md:text-3xl">What we design and build</h2>
              <p className="mt-2 text-ink-soft">One small team handles the whole site, from the first concept to keeping it current.</p>
              <p className="mt-2 text-sm text-ink-soft">{stackNote}</p>
            </div>
            <dl className="divide-y divide-line border-y border-line lg:col-span-8">
              {services.map(([t, b]) => (
                <div key={t} className="grid grid-cols-1 gap-1 py-3 md:grid-cols-12 md:gap-6">
                  <dt className="font-display text-lg font-bold md:col-span-4">{t}</dt>
                  <dd className="text-ink-soft md:col-span-8">{b}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        <section aria-labelledby="demos-h" className="border-b border-line bg-paper py-8 md:py-12">
          <Container>
            <SectionHeading id="demos-h" title="Website demos by industry">
              Each is a complete working website with its own identity. The businesses are fictional and exist to show our design and development.
            </SectionHeading>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {studioDemos.map((d) => (
                <li key={d.slug}>
                  <Link href={`/demos/${d.slug}`} className="group grid grid-cols-1 gap-1 px-1 py-1 hover:bg-ink/5 md:grid-cols-12 md:items-center md:gap-4">
                    <span className="font-display text-lg font-bold md:col-span-4">{d.industry} website: {d.name}</span>
                    <span className="text-ink-soft md:col-span-7">{d.summary}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold md:col-span-1 md:justify-end">Open <ArrowUpRight size={16} aria-hidden /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section aria-labelledby="how-h" className="border-b border-line bg-paper py-8 md:py-12">
          <Container>
            <SectionHeading id="how-h" title="How a website project works" />
            <ol className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
              {processSteps.map(([t, b], i) => (
                <li key={t} className="border-t-2 border-brass pt-2">
                  <span className="font-display text-sm font-bold text-brass-deep">Step {i + 1}</span>
                  <h3 className="mt-1 font-display text-lg font-bold">{t}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{b}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section aria-labelledby="faq-h" className="bg-paper py-8 md:py-12">
          <Container>
            <SectionHeading id="faq-h" title="Questions about website design and development" />
            <div className="mt-4 divide-y divide-line border-y border-line">
              {faqs.map(([q, a]) => (
                <details key={q} className="group py-1">
                  <summary className="flex min-h-6 cursor-pointer list-none items-center justify-between gap-3 font-semibold [&::-webkit-details-marker]:hidden">
                    {q}
                    <span aria-hidden className="text-xl text-brass-deep group-open:hidden">+</span>
                    <span aria-hidden className="hidden text-xl text-brass-deep group-open:inline">−</span>
                  </summary>
                  <p className="max-w-measure pb-2 text-ink-soft">{a}</p>
                </details>
              ))}
            </div>
            <div className="mt-6">
              <Button href="/#contact" variant="primary">Get a free demo</Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
