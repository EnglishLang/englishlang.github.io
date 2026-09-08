import React, { useState } from "react";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import {
  Check,
  X,
  ShieldCheck,
  GitFork,
  Building2,
  Rocket,
  UserRound,
  FileText,
  ExternalLink,
  Loader2,
  Mail,
} from "lucide-react";
import Navbar from "@/components/home/Navbar";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// ---------------------------------------------------------------------------
// Stripe
// ---------------------------------------------------------------------------
// loadStripe only needs the *publishable* key, so it's safe on the client.
// Set VITE_STRIPE_PUBLISHABLE_KEY in your .env file.
//
// Creating the actual Checkout Session has to happen on a server, because it
// requires your Stripe *secret* key — that can never live in this bundle.
// This page POSTs to /api/create-checkout-session and expects back
// `{ sessionId }`. A minimal handler (Node/Express, a Vite/Nitro server
// route, or a Cloudflare/Vercel function) looks like:
//
//   const session = await stripe.checkout.sessions.create({
//     mode: "subscription", // or "payment" for a one-time license fee
//     line_items: [{ price: req.body.priceId, quantity: 1 }],
//     success_url: `${origin}/license/success`,
//     cancel_url: `${origin}/license`,
//   });
//   res.json({ sessionId: session.id });
//
// Swap in your real Price IDs from the Stripe dashboard via the env vars
// below once that route exists.
const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

const PRICE_IDS = {
  solo: import.meta.env.VITE_STRIPE_PRICE_SOLO,
  team: import.meta.env.VITE_STRIPE_PRICE_TEAM,
};

async function startCheckout(tierKey, setLoadingTier) {
  if (!stripePromise) {
    console.error(
      "Stripe isn't configured yet — set VITE_STRIPE_PUBLISHABLE_KEY."
    );
    return;
  }
  const priceId = PRICE_IDS[tierKey];
  if (!priceId) {
    console.error(
      `No Stripe price id set for "${tierKey}". Set VITE_STRIPE_PRICE_${tierKey.toUpperCase()}.`
    );
    return;
  }

  setLoadingTier(tierKey);
  try {
    const stripe = await stripePromise;
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    if (!res.ok) throw new Error("Could not start checkout session.");
    const { sessionId } = await res.json();
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) console.error(error.message);
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingTier(null);
  }
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const pathCards = [
  {
    icon: GitFork,
    eyebrow: "Free, forever",
    title: "Open everything",
    price: "$0",
    body: "Ship your whole application — not just your changes to English — under this same license. Anyone can read it, run it, and build on it, the same way you built on ours.",
    points: [
      { label: "Read, run, and modify the compiler", value: true },
      { label: "Use English in production", value: true },
      { label: "Your product's full source stays public", value: true },
      { label: "Keep any part of your stack closed", value: false },
    ],
    cta: { label: "View the compiler on GitHub", href: "https://github.com/EnglishCompiler/EnglishCompiler", external: true },
  },
  {
    icon: ShieldCheck,
    eyebrow: "Paid, proprietary",
    title: "Commercial license",
    price: "from $249/yr",
    body: "Keep your own application closed-source. You still get every line of the compiler to read and audit — you're just no longer required to open your product because of it.",
    points: [
      { label: "Read, run, and modify the compiler", value: true },
      { label: "Use English in production", value: true },
      { label: "Your product's full source stays public", value: false },
      { label: "Keep any part of your stack closed", value: true },
    ],
    cta: { label: "See pricing", href: "#pricing" },
  },
];

const tiers = [
  {
    key: "community",
    icon: GitFork,
    name: "Community",
    price: "$0",
    period: "open source",
    description: "For anyone willing to open their own product in return.",
    features: [
      "Full compiler source access",
      "Unlimited production use",
      "Community support (GitHub Discussions)",
      "Must license your app under the same terms",
    ],
    cta: { type: "link", label: "Go open source", href: "https://github.com/EnglishCompiler/EnglishCompiler" },
  },
  {
    key: "solo",
    icon: UserRound,
    name: "Solo",
    price: "$249",
    period: "/ year",
    description: "One developer, one closed-source product.",
    features: [
      "Everything in Community",
      "Keep your product proprietary",
      "1 developer seat",
      "Email support, 3-business-day reply",
    ],
    cta: { type: "stripe", label: "Buy Solo license" },
  },
  {
    key: "team",
    icon: Rocket,
    name: "Team",
    price: "$990",
    period: "/ year",
    description: "Up to 10 developers on one closed-source product.",
    highlighted: true,
    features: [
      "Everything in Solo",
      "Up to 10 developer seats",
      "Priority email support, next-business-day reply",
      "Early access to release candidates",
    ],
    cta: { type: "stripe", label: "Buy Team license" },
  },
  {
    key: "enterprise",
    icon: Building2,
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Unlimited seats, multiple products, or resale rights.",
    features: [
      "Everything in Team",
      "Unlimited developer seats",
      "Indemnification & legal review support",
      "SLA-backed support with a named contact",
    ],
    cta: { type: "mailto", label: "Talk to sales", href: "mailto:licensing@english-lang.org" },
  },
];

const matrixRows = [
  { label: "Read every line of the compiler", community: true, solo: true, team: true, enterprise: true },
  { label: "Run English in production, no limit", community: true, solo: true, team: true, enterprise: true },
  { label: "Modify the compiler itself", community: true, solo: true, team: true, enterprise: true },
  { label: "Keep your product's source closed", community: false, solo: true, team: true, enterprise: true },
  { label: "Offer English as a hosted service to others", community: false, solo: false, team: false, enterprise: "By agreement" },
  { label: "Redistribute a modified compiler under your name", community: false, solo: false, team: false, enterprise: "By agreement" },
  { label: "Priority support with a reply-time guarantee", community: false, solo: false, team: true, enterprise: true },
  { label: "Legal indemnification", community: false, solo: false, team: false, enterprise: true },
];

const licenseAccordion = [
  {
    value: "summary",
    title: "The plain-language summary",
    body: "English's compiler is source-available under a license we adapted from the SSPL — the same approach MongoDB and a handful of other infrastructure projects use. You can read every line, run it in production, and modify it freely. The one thing you can't do for free is build a closed product on top of it: either your product opens up too, or you pay for a commercial license that lets it stay closed. There's no tier where you get both for nothing.",
  },
  {
    value: "competing-service",
    title: "What counts as \"offering it as a service\"",
    body: "If you're taking the compiler (or a meaningfully modified version of it) and making its core functionality available to third parties as a hosted product — the kind of thing a cloud provider would sell — that's the scenario this license is built to prevent, and it requires a separate commercial agreement rather than a standard Solo or Team license. Using English internally to build and ship your own application, even one you sell, is not this. If you're unsure which side of that line you're on, our licensing team will tell you plainly — see the FAQ below.",
  },
  {
    value: "contributions",
    title: "If you contribute a patch",
    body: "Code you contribute back to the compiler stays under the same license as the rest of the project — it doesn't get relicensed, resold, or pulled into a closed fork by anyone, including us. You keep authorship; the project keeps the protection.",
  },
  {
    value: "definitions",
    title: "Key terms, defined",
    body: "\"The compiler\" means the English source in this repository and any modified version of it. \"Your product\" means the application, service, or tool you build using the compiler — the thing your own users interact with. \"Open under the same terms\" means your product's complete source, not just your changes to English, is published under this license.",
  },
  {
    value: "full-text",
    title: "Read the full legal text",
    body: "This page is a plain-language guide, not the license itself. The binding legal text lives in LICENSE.md at the root of the repository, and is also linked from every release.",
    link: { label: "Open LICENSE.md on GitHub", href: "https://github.com/EnglishCompiler/EnglishCompiler/blob/main/LICENSE.md" },
  },
];

const faqs = [
  {
    q: "Can I use English at my job for free?",
    a: "Yes, as long as whatever you build with it is itself published under the same open terms. If your employer's product needs to stay closed-source, that's exactly what the Solo, Team, and Enterprise tiers are for.",
  },
  {
    q: "I'm a solo developer with a side project. Which tier do I need?",
    a: "If you're comfortable open-sourcing the side project, Community costs nothing. If you want to keep it closed while you figure out whether it's a business, Solo is built for exactly that stage.",
  },
  {
    q: "Do Solo and Team licenses expire?",
    a: "They're annual subscriptions rather than perpetual licenses — the same model as most infrastructure tooling. Your commercial rights are active for as long as your subscription is, and we'll email you well before renewal.",
  },
  {
    q: "Can I switch from Community to a paid tier later?",
    a: "Yes. A lot of projects start open, find product-market fit, and then decide to close the source. You can upgrade at any point — nothing about starting on Community locks you out of buying a commercial license down the line.",
  },
  {
    q: "What happens if I stop paying?",
    a: "Your commercial license lapses and your product needs to either open its source under this license or stop using the compiler. We'll always reach out before that happens — we're not interested in surprising anyone.",
  },
  {
    q: "Do you offer discounts for students, nonprofits, or early-stage startups?",
    a: "Yes — reach out to licensing@english-lang.org with a bit of context and we'll work something out. This license exists to stop large companies from freeloading, not to squeeze people just getting started.",
  },
  {
    q: "I'm still not sure which path is right for me.",
    a: "Email licensing@english-lang.org with what you're building and we'll tell you plainly which tier fits — or whether you don't need a commercial license at all.",
  },
];

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function MatrixCell({ value }) {
  if (value === true) {
    return <Check className="w-4 h-4 text-primary mx-auto" />;
  }
  if (value === false) {
    return <X className="w-4 h-4 text-muted-foreground/50 mx-auto" />;
  }
  return <span className="text-xs text-muted-foreground">{value}</span>;
}

function PathCard({ card, i }) {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className={`rounded-lg border bg-card p-7 md:p-8 flex flex-col ${
        i === 1 ? "border-2 border-primary/30" : "border-border"
      }`}
    >
      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-5">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <p className="text-sm font-medium tracking-wide text-primary mb-1">{card.eyebrow}</p>
      <h3 className="font-display font-semibold text-2xl text-foreground mb-1">{card.title}</h3>
      <p className="font-mono text-sm text-muted-foreground mb-5">{card.price}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{card.body}</p>
      <ul className="space-y-2.5 mb-8">
        {card.points.map((p) => (
          <li key={p.label} className="flex items-start gap-3">
            {p.value ? (
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-muted-foreground/50 mt-0.5 flex-shrink-0" />
            )}
            <span className="text-sm text-foreground/80">{p.label}</span>
          </li>
        ))}
      </ul>
      <a
        href={card.cta.href}
        target={card.cta.external ? "_blank" : undefined}
        rel={card.cta.external ? "noreferrer" : undefined}
        className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors"
      >
        {card.cta.label}
        {card.cta.external && <ExternalLink className="w-3.5 h-3.5" />}
      </a>
    </motion.div>
  );
}

function PricingCard({ tier, i, loadingTier, setLoadingTier }) {
  const Icon = tier.icon;
  const isLoading = loadingTier === tier.key;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className={`relative rounded-lg border bg-card p-7 flex flex-col ${
        tier.highlighted ? "border-2 border-primary/30" : "border-border"
      }`}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-7 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
          Most teams pick this
        </span>
      )}
      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-5">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-1">{tier.name}</h3>
      <p className="font-mono text-2xl text-foreground mb-1">
        {tier.price}
        <span className="text-sm text-muted-foreground font-sans"> {tier.period}</span>
      </p>
      <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
      <ul className="space-y-2.5 mb-8 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm text-foreground/80">{f}</span>
          </li>
        ))}
      </ul>

      {tier.cta.type === "stripe" && (
        <button
          onClick={() => startCheckout(tier.key, setLoadingTier)}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Redirecting…
            </>
          ) : (
            tier.cta.label
          )}
        </button>
      )}

      {tier.cta.type === "link" && (
        <a
          href={tier.cta.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md border border-border bg-background text-sm font-medium hover:border-primary/40 transition-colors"
        >
          {tier.cta.label}
        </a>
      )}

      {tier.cta.type === "mailto" && (
        <a
          href={tier.cta.href}
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md border border-border bg-background text-sm font-medium hover:border-primary/40 transition-colors"
        >
          <Mail className="w-4 h-4" />
          {tier.cta.label}
        </a>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function License() {
  const [loadingTier, setLoadingTier] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              The English license
            </p>
            <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-foreground">
              Free to read. Free to run. Not free to close.
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              Every line of the compiler is public. What you owe back depends
              on what you build with it: open your product under the same
              terms, or pay for a commercial license that lets it stay closed.
              There's no third option where you get both for nothing.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#pricing"
                className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                See pricing
              </a>
              <a
                href="#license-text"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border bg-card text-sm font-medium hover:border-primary/40 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Read the license
              </a>
            </div>
          </motion.div>
        </section>

        {/* Two paths */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Two honest paths
            </p>
            <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight text-foreground">
              Pick the one that fits what you're building.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {pathCards.map((card, i) => (
              <PathCard key={card.title} card={card} i={i} />
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="max-w-7xl mx-auto px-6 md:px-10 mt-24 scroll-mt-24">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Pricing
            </p>
            <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight text-foreground">
              Commercial licenses, priced for where you actually are.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Solo and Team are billed annually and processed securely through
              Stripe. Enterprise is a conversation, not a checkbox.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <PricingCard
                key={tier.key}
                tier={tier}
                i={i}
                loadingTier={loadingTier}
                setLoadingTier={setLoadingTier}
              />
            ))}
          </div>
        </section>

        {/* Full comparison matrix */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Every right, side by side
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              The full comparison, if you want it in one place.
            </h2>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="text-left font-medium text-muted-foreground py-4 px-5 min-w-[280px]">
                    Right
                  </th>
                  <th className="font-medium text-foreground py-4 px-5">Community</th>
                  <th className="font-medium text-foreground py-4 px-5">Solo</th>
                  <th className="font-medium text-foreground py-4 px-5">Team</th>
                  <th className="font-medium text-foreground py-4 px-5">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((row) => (
                  <tr key={row.label} className="border-b border-border/60 last:border-0">
                    <td className="text-left text-foreground/80 py-3.5 px-5">{row.label}</td>
                    <td className="text-center py-3.5 px-5"><MatrixCell value={row.community} /></td>
                    <td className="text-center py-3.5 px-5"><MatrixCell value={row.solo} /></td>
                    <td className="text-center py-3.5 px-5"><MatrixCell value={row.team} /></td>
                    <td className="text-center py-3.5 px-5"><MatrixCell value={row.enterprise} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* License text, plain-language */}
        <section id="license-text" className="max-w-7xl mx-auto px-6 md:px-10 mt-24 scroll-mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              In plain language
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              What the license actually says.
            </h2>
          </div>
          <div className="max-w-3xl rounded-lg border border-border bg-card px-6 md:px-8">
            <Accordion type="single" collapsible className="w-full">
              {licenseAccordion.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger className="font-display font-semibold text-left text-foreground">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                    {item.link && (
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-primary hover:underline"
                      >
                        {item.link.label}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Questions
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Common licensing questions.
            </h2>
          </div>
          <div className="max-w-3xl rounded-lg border border-border bg-card px-6 md:px-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((item, i) => (
                <AccordionItem key={item.q} value={`faq-${i}`}>
                  <AccordionTrigger className="font-display font-semibold text-left text-foreground">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="rounded-lg border border-border bg-secondary/50 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium tracking-wide text-primary mb-2">
                Still deciding?
              </p>
              <p className="text-foreground font-medium max-w-xl">
                Tell us what you're building and we'll tell you plainly which
                path fits — including if the honest answer is "you don't need
                to pay us anything."
              </p>
            </div>
            <a
              href="mailto:licensing@english-lang.org"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors whitespace-nowrap"
            >
              <Mail className="w-4 h-4" />
              licensing@english-lang.org
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
