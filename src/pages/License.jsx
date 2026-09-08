import React from "react";
import { motion } from "framer-motion";
import { Check, Clock, Circle, Mail } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

// A repeating "caution tape" strip. Duplicated content + a CSS keyframe
// scroll it left forever — same ticker technique as CompilerFooter, just
// styled like hazard tape so a work-in-progress page feels intentional
// rather than broken.
function CautionTape({ text }) {
  const chunk = `${text} · `;
  const line = chunk.repeat(8);

  return (
    <div className="relative -mx-6 md:-mx-10 overflow-hidden -rotate-1 my-16">
      <div
        className="py-3 border-y-4 border-black"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #f5c400 0, #f5c400 22px, #111 22px, #111 44px)",
        }}
      >
        <div className="flex whitespace-nowrap animate-[caution-scroll_18s_linear_infinite]">
          <span className="font-mono text-xs md:text-sm font-bold tracking-wider text-black mx-4 flex-shrink-0">
            {line}
          </span>
          <span className="font-mono text-xs md:text-sm font-bold tracking-wider text-black mx-4 flex-shrink-0">
            {line}
          </span>
        </div>
      </div>
      <style>{`
        @keyframes caution-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

const status = [
  {
    icon: Check,
    state: "Decided",
    title: "It'll be dual-licensed",
    body: "Open your product under the same terms and it's free. Want to keep your product closed? That'll require a paid commercial license. There's no free-and-closed option.",
    tone: "done",
  },
  {
    icon: Clock,
    state: "Deciding",
    title: "Where the price actually sits",
    body: "We know there'll be a tier for a solo developer and a tier for a small team — we don't yet know what either should cost.",
    tone: "pending",
  },
  {
    icon: Clock,
    state: "Deciding",
    title: "Discounts for students & nonprofits",
    body: "Leaning yes. Haven't worked out the mechanics of how someone would actually claim one.",
    tone: "pending",
  },
  {
    icon: Circle,
    state: "Not started",
    title: "The actual legal text",
    body: "We're adapting an SSPL-style license rather than writing one from nothing, but nothing's been drafted yet.",
    tone: "todo",
  },
];

const toneStyles = {
  done: "border-primary/30 bg-primary/5",
  pending: "border-border bg-card",
  todo: "border-dashed border-border bg-transparent",
};

export default function License() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Licensing
            </p>
            <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-foreground">
              We're still figuring this part out.
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              English will ship under a dual license: open your product up
              under the same terms, or pay for a commercial license that lets
              it stay closed. The tiers, the pricing, and the legal text
              itself aren't locked yet — so treat everything below as a
              status update, not a price list.
            </p>
            <div className="mt-8">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                    What we already know
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-display">Where things stand</DialogTitle>
                    <DialogDescription>
                      The short version, as of today.
                    </DialogDescription>
                  </DialogHeader>
                  <ul className="space-y-3 py-2">
                    {status.map((s) => (
                      <li key={s.title} className="flex items-start gap-3">
                        <s.icon
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            s.tone === "done" ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                        <span className="text-sm text-foreground/80">
                          <span className="font-medium text-foreground">{s.title}.</span>{" "}
                          {s.body}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <DialogFooter className="sm:justify-start">
                    <a
                      href="mailto:licensing@english-lang.org"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      Ask us something specific
                    </a>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <CautionTape text="LICENSE TERMS PENDING — NOTHING BELOW IS FINAL — CHECK BACK SOON" />
        </div>

        {/* Status tracker */}
        <section className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Progress, honestly reported
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Here's what's settled and what isn't.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {status.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`rounded-lg border p-6 md:p-7 ${toneStyles[s.tone]}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <s.icon
                    className={`w-4 h-4 ${
                      s.tone === "done" ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {s.state}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="rounded-lg border border-border bg-secondary/50 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium tracking-wide text-primary mb-2">
                Want to know when this is final?
              </p>
              <p className="text-foreground font-medium max-w-xl">
                Email us — we'll let you know before anything here becomes
                official, not after.
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
