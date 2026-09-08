import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cLines = [
  "uint8_t buffer[8192];",
  "buffer[0] = 255;",
  "if (age >= 18) {",
  "  printf(\"Adult\\n\");",
  "}",
];

const engLines = [
  "make buffer an array of 8192",
  "  unsigned 8-bit integers",
  "set buffer at position 0 to 255",
  "when age is greater than",
  "  or equal to 18,",
  "  say 'Adult' and print to output",
  "end when",
];

export default function CodeMorphHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const cOpacity = useTransform(scrollYProgress, [0, 0.5, 0.85], [1, 1, 0]);
  const cX = useTransform(scrollYProgress, [0.4, 0.85], [0, -40]);
  const engOpacity = useTransform(scrollYProgress, [0.35, 0.8], [0, 1]);
  const engX = useTransform(scrollYProgress, [0.35, 0.8], [40, 0]);

  return (
    <section id="hero" ref={ref} className="relative pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium tracking-wide uppercase text-primary mb-6"
          >
            No programming experience required
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-semibold text-5xl md:text-7xl leading-[1.02] tracking-tight text-foreground"
          >
            Code anyone
            <br />
            can understand.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
          >
            English reads like a sentence — so you can write real programs
            without learning a programmer's dialect. Under the hood it compiles
            straight to fast machine code: the speed of the traditional
            languages, with none of the cryptic symbols.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#commitments"
              className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              See How It Works
            </a>
            <span className="font-mono text-sm text-muted-foreground border border-border rounded-md px-4 py-3 bg-card">
              say 'Hello World' and print to output
            </span>
          </motion.div>
        </div>

        <div className="mt-20 md:mt-28 grid md:grid-cols-2 gap-4 md:gap-0 relative">
          <motion.div
            style={{ opacity: cOpacity, x: cX }}
            className="relative rounded-l-lg md:rounded-r-none rounded-r-lg border border-border bg-card p-6 md:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
              The old way — meant for experts
            </p>
            <pre className="font-mono text-sm md:text-[15px] leading-7 text-foreground/80 whitespace-pre-wrap">
{cLines.join("\n")}
            </pre>
          </motion.div>

          <motion.div
            style={{ opacity: engOpacity, x: engX }}
            className="relative rounded-lg border-2 border-primary/30 bg-card p-6 md:p-8 md:-ml-px"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-primary mb-4">
              English — reads like a sentence
            </p>
            <pre className="font-mono text-sm md:text-[15px] leading-7 text-foreground whitespace-pre-wrap">
{engLines.join("\n")}
            </pre>
          </motion.div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6 tracking-wide">
          Scroll — watch the same idea, written plainly
        </p>
      </div>
    </section>
  );
}