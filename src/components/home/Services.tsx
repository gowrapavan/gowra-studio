import { Container, Button } from "../ui";
import { services } from "@/config/services";



export function Services() {
  return (
    <section id="services" className="border-b border-line bg-paper py-8 md:py-12">
      <Container className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-12">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Design, build, launch and look after</h2>
            <p className="mt-2 text-ink-soft">One small team handles the whole site, from the first concept to keeping it current.</p>
            <p className="mt-2 text-sm text-ink-soft">Built with Next.js and React, deployed on Netlify or Vercel, with Supabase when a site needs data or bookings. Code lives on GitHub.</p>
            <div className="mt-4"><Button href="/#contact" variant="solid">Start with a free demo</Button></div>
          </div>
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
  );
}
