import React from "react";
import { motion } from "framer-motion";
import { Github, Laptop, Monitor, Terminal, Check, Clock, Circle, Mail } from "lucide-react";
import Navbar from "@/components/home/Navbar";

const GITHUB_URL = "https://github.com/EnglishCompiler/EnglishCompiler";

// Same status-tracker vocabulary as the License page, applied to the
// compiler itself instead of the legal terms — keeps the "here's honestly
// where things stand" pattern consistent across both not-ready-yet pages.
// English self-hosts in four stages (see the spec, §24): each compiler's
// only job is to correctly compile the next stage's source, nothing more.
// This tracks real progress against those actual stages and codenames,
// rather than a generic "lexer / parser / codegen" placeholder list.
const roadmap = [
  {
    icon: Check,
    state: "Done",
    title: "Language specification v1.0",
    body: "The grammar, the disambiguation rules, and the type system are written down — this is the exact spec the compiler is being built against.",
    tone: "done",
  },
  {
    icon: Clock,
    state: "In progress — mostly there",
    title: 'Stage 0 — "Ember" (bootstrap compiler, written in C)',
    body: "The lexer and AST are fully written and it can already compile basic English programs — it's not trying to handle the whole language, just enough of it (§24.1's S0 subset) to compile Stage 1. It's close to functionally complete: a few libc-interaction bugs are still being chased down before it's solid.",
    tone: "pending",
  },
  {
    icon: Circle,
    state: "Not started",
    title: 'Stage 1 — "Kindling" (written in English, built by Ember)',
    body: "The first English compiler written in English itself, adding modules, generics, and closures. Waiting on Ember to be reliable enough to compile it.",
    tone: "todo",
  },
  {
    icon: Circle,
    state: "Not started",
    title: 'Stage 2 — "Firebrand"',
    body: "Adds real concurrency, SIMD, and the full optimizer — built by Kindling, and the stage where the compiler starts writing real object files.",
    tone: "todo",
  },
  {
    icon: Circle,
    state: "Not started",
    title: 'Stage 3 — "Hearthkeeper" (self-hosting)',
    body: "The point where English compiles itself, with no restriction to any earlier subset. This is the actual finish line for \"the compiler exists,\" and it's the furthest-out part of the whole roadmap.",
    tone: "todo",
  },
  {
    icon: Circle,
    state: "Not started",
    title: "A binary you could actually download",
    body: "Doesn't require self-hosting to happen first — once Ember is solid, an early alpha build becomes possible well before Stage 3. Nothing here today would run a real program yet.",
    tone: "todo",
  },
];

const toneStyles = {
  done: "border-primary/30 bg-primary/5",
  pending: "border-border bg-card",
  todo: "border-dashed border-border bg-transparent",
};

const plannedPlatforms = [
  { id: "macos", name: "macOS", icon: Laptop, detail: "Apple Silicon & Intel" },
  { id: "windows", name: "Windows", icon: Monitor, detail: "64-bit" },
  { id: "linux", name: "Linux", icon: Terminal, detail: "x86_64 & arm64" },
];

export default function Downloads() {
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
              Downloads
            </p>
            <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-foreground">
              There's nothing to download yet.
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              English is being actively built, not just designed. Right now
              that means Stage 0 — codename "Ember," the bootstrap compiler
              written in C — and it's genuinely close: the lexer and AST are
              done, it can already compile basic English programs, and it's
              nearly Turing-complete. It still has a handful of libc-related
              bugs to work out, and Ember is only the first of four
              self-hosting stages the language needs to go through (see the
              roadmap below). Realistically that full chain is a
              months-to-a-year timeline, not a few-weekends one — this is a
              long-term project, and we'd rather say that plainly than put up
              a download button that doesn't work.
            </p>
          </motion.div>
        </section>

        {/* Roadmap */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-20">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Where things actually stand
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              The honest version of the roadmap.
            </h2>
          </div>
          <div className="space-y-4">
            {roadmap.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`rounded-lg border p-6 md:p-7 flex items-start gap-5 ${toneStyles[r.tone]}`}
              >
                <div className="w-9 h-9 rounded-md bg-background border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                  <r.icon
                    className={`w-4 h-4 ${r.tone === "done" ? "text-primary" : "text-muted-foreground"}`}
                  />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {r.state}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-foreground mt-1 mb-1.5">
                    {r.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Planned platforms — honestly labeled as planned, not real links */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Once there's something to ship
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Platforms we're planning to support.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              This is the intended lineup, not a promise of exact timing for
              each one.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plannedPlatforms.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className="rounded-lg border border-border bg-card p-7 opacity-70"
                >
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-lg text-foreground">
                      {p.name}
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-border text-muted-foreground/70">
                      Planned
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.detail}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Follow along */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="rounded-lg border border-border bg-secondary/50 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium tracking-wide text-primary mb-2">
                Want to know when there's something real
              </p>
              <p className="text-foreground font-medium max-w-xl">
                Star or watch the repo on GitHub — that's where actual
                progress will show up first, long before this page changes.
              </p>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors whitespace-nowrap"
            >
              <Github className="w-4 h-4" />
              Watch on GitHub
            </a>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>Questions about timing or what's involved?</span>
            <a
              href="mailto:hello@english-lang.org"
              className="text-primary hover:underline"
            >
              hello@english-lang.org
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
