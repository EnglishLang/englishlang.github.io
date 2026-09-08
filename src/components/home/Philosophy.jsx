import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

export default function Philosophy() {
  return (
    <section className="py-24 md:py-32 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-medium tracking-wide uppercase text-primary mb-4">
            It means what it says
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight text-foreground mb-6">
            It only looks like a sentence.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            English has a fixed dictionary of words and phrases it recognizes.
            If you write something that isn't one of them, it won't quietly
            guess what you meant — it stops and tells you exactly which word it
            expected next.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            So you're never left wondering why the computer did something
            strange. Either it understood you, or it told you plainly.
          </p>
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="font-mono text-xs text-muted-foreground mb-3">// English won't accept this</p>
            <p className="font-mono text-sm text-foreground/70">
              I guess we should probably make the counter
              <br />
              something around ten.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="rounded-xl overflow-hidden border border-border"
        >
          <Image
            src="https://media.base44.com/images/public/6aa0580066bf071d34f2bab8/7cfd43f0f_generated_17cdf579.jpg"
            alt="A glowing glass cube representing the English compiler's secure, reliable core"
            className="w-full aspect-[4/3]"
            fittingType="fill"
          />
        </motion.div>
      </div>
    </section>
  );
}