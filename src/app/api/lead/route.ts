import { NextResponse } from "next/server";

/**
 * POST /api/lead — receives the homepage "Get a free demo" form.
 *
 * Delivery (configure at least one; both can run together):
 *   1. Email via Resend         RESEND_API_KEY + LEAD_TO_EMAIL
 *   2. Webhook (Slack, Discord, Make, Zapier, n8n …)   LEAD_WEBHOOK_URL
 *
 * If nothing is configured the route answers 503, so the form tells the
 * visitor honestly that it could not send instead of pretending it did.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Lead = {
  name: string;
  business: string;
  businessType: string;
  whatsapp: string;
  email: string;
  currentWebsite: string;
  details: string;
  needs: string[];
};

const MAX = { short: 120, details: 2000, needs: 10 };

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

function parse(body: unknown): { lead?: Lead; error?: string; spam?: boolean } {
  if (!body || typeof body !== "object") return { error: "Invalid request." };
  const b = body as Record<string, unknown>;
  // Honeypot: real visitors never see or fill this field.
  if (typeof b.company_site === "string" && b.company_site.trim() !== "") return { spam: true };

  const lead: Lead = {
    name: clean(b.name, MAX.short),
    business: clean(b.business, MAX.short),
    businessType: clean(b.businessType, MAX.short),
    whatsapp: clean(b.whatsapp, 40),
    email: clean(b.email, 200),
    currentWebsite: clean(b.currentWebsite, 200),
    details: typeof b.details === "string" ? b.details.trim().slice(0, MAX.details) : "",
    needs: Array.isArray(b.needs) ? b.needs.slice(0, MAX.needs).map((n) => clean(n, 60)).filter(Boolean) : [],
  };
  if (!lead.name || !lead.business || !lead.businessType || !lead.whatsapp)
    return { error: "Please fill in your name, business, business type and WhatsApp number." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return { error: "Please enter a valid email address." };
  if (lead.whatsapp.replace(/\D/g, "").length < 7) return { error: "Please enter a valid WhatsApp number." };
  return { lead };
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function asText(l: Lead): string {
  return [
    `New demo request`,
    ``,
    `Name: ${l.name}`,
    `Business: ${l.business} (${l.businessType})`,
    `WhatsApp: ${l.whatsapp}`,
    `Email: ${l.email}`,
    `Current website: ${l.currentWebsite || "none given"}`,
    `Looking for: ${l.needs.join(", ") || "not specified"}`,
    ``,
    l.details || "(no details given)",
  ].join("\n");
}

async function sendEmail(l: Lead): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  if (!key || !to) return false;
  const base = process.env.RESEND_API_BASE || "https://api.resend.com";
  const from = process.env.LEAD_FROM_EMAIL || "Gowra Studio <onboarding@resend.dev>";
  const res = await fetch(`${base}/emails`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: l.email,
      subject: `Demo request: ${l.business} (${l.businessType})`,
      text: asText(l),
      html: `<pre style="white-space:pre-wrap">${esc(asText(l))}</pre>`,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    // Log the provider's own explanation (status and message, never the key)
    // so a rejected send can be diagnosed from the host logs.
    const detail = await res.text().catch(() => "");
    console.error(`[lead] Resend rejected the email: HTTP ${res.status} ${detail.slice(0, 400)}`);
  }
  return res.ok;
}

async function sendWebhook(l: Lead): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  const text = asText(l);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // `text` suits Slack and Make, `content` suits Discord; `lead` is the raw data.
    body: JSON.stringify({ text, content: text.slice(0, 1900), lead: l }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) console.error(`[lead] Webhook rejected the message: HTTP ${res.status}`);
  return res.ok;
}

// Best-effort throttle. On serverless hosts each instance keeps its own
// counter, so this slows casual abuse; it is not a hard guarantee.
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) hits.clear();
  return recent.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many requests. Please try again in a few minutes." }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 }); }

  const { lead, error, spam } = parse(body);
  if (spam) return NextResponse.json({ ok: true }); // pretend success, deliver nothing
  if (!lead) return NextResponse.json({ ok: false, error }, { status: 400 });

  const configured = Boolean(
    (process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL) || process.env.LEAD_WEBHOOK_URL
  );
  if (!configured) {
    console.error("[lead] no delivery configured (set RESEND_API_KEY + LEAD_TO_EMAIL, or LEAD_WEBHOOK_URL)");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const results = await Promise.allSettled([sendEmail(lead), sendWebhook(lead)]);
  results.forEach((r, i) => r.status === "rejected" && console.error(`[lead] ${i === 0 ? "Email" : "Webhook"} send threw:`, String(r.reason)));
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);
  if (!delivered) {
    // Last resort so the lead is never silently lost: it stays in host logs.
    console.error("[lead] DELIVERY FAILED — lead follows\n" + asText(lead));
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
