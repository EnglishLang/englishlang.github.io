import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, GitFork, LockOpen, Flame, Check, X } from "lucide-react";

const points = [
  {
    icon: GitFork,
    title: "Every line, out in the open",
    body: "The whole compiler is public. Read it, fork it, argue with it, learn from it — nothing about how English works is hidden behind a paywall or a patent.",
  },
  {
    icon: ShieldCheck,
    title: "Built so no one can steal it",
    body: "A big cloud company cannot take what this community built, slap a logo on it, and sell it back to you. The license makes that legally impossible — that's not a loophole, that's the point.",
  },
  {
    icon: Flame,
    title: "You contribute, you keep it",
    body: "Send a patch and it doesn't disappear into some corporate roadmap. It stays part of the commons, under the same protection, for every developer who comes after you.",
  },
];

const openSourceRows = [
  { label: "Anyone can read the code", value: true },
  { label: "Anyone can run it", value: true },
  { label: "Anyone can contribute", value: true },
  { label: "A corp can rebrand & resell it", value: true },
  { label: "A cloud giant can host it as their own paid service", value: true },
];

const sourceAvailableRows = [
  { label: "Anyone can read the code", value: true },
  { label: "Anyone can run it", value: true },
  { label: "Anyone can contribute", value: true },
  { label: "A corp can rebrand & resell it", value: false },
  { label: "A cloud giant can host it as their own paid service", value: false },
];

function Row({ label, value }) {
  return (
    <li className="flex items-start gap-3 py-2.5 border-b border-border/60 last:border-0">
      {value ? (
        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
      ) : (
        <X className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
      )}
      <span className="text-sm text-foreground/80 leading-snug">{label}</span>
    </li>
  );
}

export default function OpenInternals() {
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-sm font-medium tracking-wide text-primary mb-4">
            Not "open source." Owned source.
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight text-foreground">
            Built by everyone. Sold by no one.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            We didn't pick this license to sound clever. We picked it because
            we've all watched the same story play out — a community pours
            years into a project, then a company with more lawyers than
            conscience wraps it in a paid API and calls it theirs. English is
            built so that story can't happen here.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-lg border border-border bg-card p-7"
              >
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-sm font-medium tracking-wide text-primary mb-4">
            Why we didn't use MIT or Apache
          </p>
          <h3 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
            Permissive licenses protect companies. This one protects developers.
          </h3>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            MIT and Apache are generous to a fault — so generous that they let
            anyone, including a company with a thousand engineers and zero
            interest in giving back, take the community's work and turn it
            into their own closed, monetized product. That's a fine trade for
            some projects. It's a terrible trade for a language people are
            going to build their careers on. So English runs on a
            purpose-built, source-available license we wrote ourselves,
            adapted from the SSPL used by MongoDB and other projects that
            faced this exact threat before us. The source is wide open — read
            it, run it, ship it, modify it, teach with it. What you can't do
            is fence off a public good and put a toll booth on it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="rounded-lg border border-border bg-card p-7"
          >
            <p className="font-mono text-xs text-muted-foreground mb-1">
              Permissive open source (MIT / Apache)
            </p>
            <p className="text-sm text-muted-foreground mb-5">Generous right up until it isn't</p>
            <ul>
              {openSourceRows.map((r) => (
                <Row key={r.label} label={r.label} value={r.value} />
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              Free for everyone — including whoever wants to package your
              unpaid nights and weekends and bill you for the result.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="rounded-lg border-2 border-primary/30 bg-card p-7"
          >
            <p className="font-mono text-xs text-primary mb-1">
              English's license (SSPL-derived)
            </p>
            <p className="text-sm text-muted-foreground mb-5">Source-available, community-owned</p>
            <ul>
              {sourceAvailableRows.map((r) => (
                <Row key={r.label} label={r.label} value={r.value} />
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              Every line is yours to read, run, and build on. The one thing
              nobody gets to do is privatize a commons and sell tickets to it.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-lg border border-border bg-secondary/50 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <p className="font-mono text-xs text-primary mb-2">
              Who actually owns this
            </p>
            <p className="text-foreground font-medium max-w-xl">
              Not the English Foundation. Not me, the person who started it.
              English is infrastructure — like a bus stop, a library, a
              sidewalk. Nobody owns it because it's built to serve everyone
              who uses it, including whoever's still writing it in twenty
              years.
            </p>
          </div>
          <a
            href="#commitments"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-background text-sm font-medium hover:border-primary/40 transition-colors whitespace-nowrap"
          >
            Read the license
          </a>
        </motion.div>
      </div>
    </section>
  );
}