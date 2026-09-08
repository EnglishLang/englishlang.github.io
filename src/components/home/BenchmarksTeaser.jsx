import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { Copy, Check } from "lucide-react";

export default function BenchmarksTeaser() {
  const [copied, setCopied] = useState(false);
  const command = "english run program.eng";

  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="rounded-xl overflow-hidden border border-border order-2 md:order-1"
        >
          <Image
            src="https://media.base44.com/images/public/6aa0580066bf071d34f2bab8/21dfa5129_generated_ceb65951.jpg"
            alt="Light refracting through a glass prism into straight, fast lines — English's speed made visible"
            className="w-full aspect-[4/3]"
            fittingType="fill"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="order-1 md:order-2"
        >
          <p className="text-sm font-medium tracking-wide uppercase text-primary mb-4">
            Built for speed
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight text-foreground mb-6">
            Fast when it matters. Safe by default.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            English runs as fast as the traditional languages the pros use —
            because it compiles to the same fast machine code. The difference
            is it also watches out for the common mistakes that usually crash a
            program. And when you genuinely need raw speed, a single word lets
            you switch the safety off.
          </p>
          <button
            onClick={copy}
            className="group inline-flex items-center gap-3 rounded-md border border-border bg-card pl-4 pr-3 py-3 font-mono text-sm text-foreground hover:border-primary/40 transition-colors"
          >
            <span className="text-primary">$</span> {command}
            {copied ? (
              <Check className="w-4 h-4 text-primary" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}