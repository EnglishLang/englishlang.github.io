import React from "react";

const logLines = [
  "[english] reading your words ... ok",
  "[english] checking for mistakes ... ok",
  "[english] 412 sentences understood",
  "[english] translating to fast machine code ... ok",
  "[english] program ready ... ok",
  "[english] built in 0.31s",
  "[english] 0 warnings, 0 errors",
  "[english] everything ran exactly as written",
];

export default function CompilerFooter() {
  const ticker = [...logLines, ...logLines];

  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-display font-semibold text-xl mb-3">english.</p>
          <p className="text-sm text-background/60 max-w-xs leading-relaxed">
            Code anyone can understand. The programming language that reads
            like a sentence.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-background/40 mb-4">Language</p>
          <ul className="space-y-2.5 text-sm text-background/70">
            <li className="opacity-50 cursor-not-allowed">How it works</li>
            <li className="opacity-50 cursor-not-allowed">Word list</li>
            <li className="opacity-50 cursor-not-allowed">Example programs</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-background/40 mb-4">Try it</p>
          <ul className="space-y-2.5 text-sm text-background/70">
            <li className="opacity-50 cursor-not-allowed">Download</li>
            <li className="opacity-50 cursor-not-allowed">Your first program</li>
            <li className="opacity-50 cursor-not-allowed">Help & guides</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10 overflow-hidden py-3">
        <div className="flex whitespace-nowrap animate-[scroll_28s_linear_infinite]">
          {ticker.map((line, i) => (
            <span
              key={i}
              className="font-mono text-xs text-background/40 mx-6 flex-shrink-0"
            >
              {line}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
}