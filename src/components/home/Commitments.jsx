import React from "react";
import { motion } from "framer-motion";

const commitments = [
  { n: "01", title: "Every word means one thing", body: "There's no hidden double meaning. What you read is exactly what the computer does." },
  { n: "02", title: "Mistakes caught early", body: "Before your program ever runs, English spots the common slip-ups and tells you plainly." },
  { n: "03", title: "Built for speed", body: "Programs compile straight into fast machine code — no translator slowing them down at runtime." },
  { n: "04", title: "No hidden slowdowns", body: "Nothing pauses your program in the background. It runs at full speed, always." },
  { n: "05", title: "Light and instant", body: "Programs start immediately and stay small — no heavy machinery dragged in behind the scenes." },
  { n: "06", title: "No guessing, ever", body: "English follows clear, written rules. It never guesses what you meant — it does exactly what you said." },
  { n: "07", title: "One right way to say it", body: "Each phrase has a single spelling. You won't wonder which wording the computer prefers." },
  { n: "08", title: "Power when you need it", body: "Want to reach all the way down to the hardware? You can — it's there whenever you ask for it." },
  { n: "09", title: "Runs anywhere", body: "Write your program once. It runs on every major computer and device without rewriting." },
  { n: "10", title: "What you read is what it does", body: "No invisible work happens behind a line. Reading it tells you the whole story." },
  { n: "11", title: "Predictable, every time", body: "Run it a thousand times and you get the same result. No surprise behavior in everyday code." },
  { n: "12", title: "Complete control, clearly marked", body: "The few spots where you take the training wheels off are short, listed, and always your choice." },
];

export default function Commitments() {
  return (
    <section id="commitments" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-sm font-medium tracking-wide uppercase text-primary mb-4">
            The Twelve Commitments
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight text-foreground">
            Twelve promises we make to you.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {commitments.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="bg-background p-7 md:p-8"
            >
              <span className="font-mono text-xs text-primary">{c.n}</span>
              <h3 className="font-display font-semibold text-lg mt-3 mb-2 text-foreground">
                {c.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}