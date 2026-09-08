import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Github,
  Copy,
  Check,
  Laptop,
  Monitor,
  Terminal,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/home/Navbar";

// This page reuses the same design tokens as Home.jsx (index.css variables,
// tailwind.config.js) so it drops straight into the same route tree —
// e.g. src/pages/Downloads.jsx, wired up wherever Home.jsx is routed.

const GITHUB_URL = "https://github.com/EnglishCompiler/EnglishCompiler";
const RELEASES_URL = `${GITHUB_URL}/releases`;
const VERSION = "0.9.2";

const platforms = [
  {
    id: "macos",
    name: "macOS",
    icon: Laptop,
    detail: "Apple Silicon & Intel, 12.0+",
    file: `english-${VERSION}-macos-universal.pkg`,
    size: "38 MB",
  },
  {
    id: "windows",
    name: "Windows",
    icon: Monitor,
    detail: "64-bit, Windows 10 & 11",
    file: `english-${VERSION}-windows-x64.msi`,
    size: "41 MB",
  },
  {
    id: "linux",
    name: "Linux",
    icon: Terminal,
    detail: "x86_64 & arm64, glibc 2.31+",
    file: `english-${VERSION}-linux-x86_64.tar.gz`,
    size: "35 MB",
  },
];

const packageManagers = [
  { name: "Homebrew", command: "brew install english-lang/tap/english" },
  { name: "Scoop", command: "scoop install english" },
  { name: "apt", command: "curl -fsSL https://get.english-lang.org/deb | sudo bash" },
  { name: "cargo", command: "cargo install english-cli" },
];

function useDetectedPlatform() {
  const [platform, setPlatform] = useState(null);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    if (/Mac/i.test(ua)) setPlatform("macos");
    else if (/Win/i.test(ua)) setPlatform("windows");
    else if (/Linux/i.test(ua)) setPlatform("linux");
  }, []);

  return platform;
}

function CopyableCommand({ command }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center justify-between w-full gap-4 rounded-md border border-border bg-background px-4 py-3 font-mono text-sm text-foreground/90 hover:border-primary/40 transition-colors text-left"
    >
      <span className="truncate">{command}</span>
      {copied ? (
        <Check className="w-4 h-4 text-primary flex-shrink-0" />
      ) : (
        <Copy className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-foreground transition-colors" />
      )}
    </button>
  );
}

export default function Downloads() {
  const detected = useDetectedPlatform();

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
              v{VERSION} — stable
            </p>
            <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-foreground">
              Get English running locally
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              One binary, no dependencies to fight with. Pick your platform
              below, or install with the tool you already use.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 max-w-xl"
          >
            <CopyableCommand command="curl -fsSL https://get.english-lang.org | sh" />
            <p className="mt-2 text-xs text-muted-foreground">
              Installs the latest stable build for macOS and Linux. Inspect
              the script first if you'd rather not pipe to a shell — it's the
              same source as the repo linked below.
            </p>
          </motion.div>
        </section>

        {/* Platform cards */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-20">
          <div className="grid md:grid-cols-3 gap-6">
            {platforms.map((p, i) => {
              const Icon = p.icon;
              const isDetected = detected === p.id;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className={`relative rounded-lg border bg-card p-7 ${
                    isDetected ? "border-2 border-primary/30" : "border-border"
                  }`}
                >
                  {isDetected && (
                    <span className="absolute -top-3 left-7 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      Detected
                    </span>
                  )}
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                    {p.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">{p.detail}</p>
                  <a
                    href={`${RELEASES_URL}/download/v${VERSION}/${p.file}`}
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <p className="mt-3 font-mono text-xs text-muted-foreground truncate">
                    {p.file} · {p.size}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Package managers */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Prefer a package manager
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Install with the tool already on your machine.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {packageManagers.map((pm) => (
              <div key={pm.name} className="rounded-lg border border-border bg-card p-5">
                <p className="text-sm font-medium text-foreground mb-3">{pm.name}</p>
                <CopyableCommand command={pm.command} />
              </div>
            ))}
          </div>
        </section>

        {/* Verify + requirements */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-border bg-card p-7">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                Verify what you downloaded
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Every release is signed. Check the binary against the
                published checksums before you run it — especially if you
                didn't get it from the link above.
              </p>
              <CopyableCommand
                command={`shasum -a 256 -c english-${VERSION}-checksums.txt`}
              />
            </div>

            <div className="rounded-lg border border-border bg-card p-7">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                System requirements
              </h3>
              <ul className="space-y-2.5 text-sm text-foreground/80">
                <li className="flex justify-between border-b border-border/60 pb-2.5">
                  <span className="text-muted-foreground">Disk space</span>
                  <span>120 MB</span>
                </li>
                <li className="flex justify-between border-b border-border/60 pb-2.5">
                  <span className="text-muted-foreground">Memory</span>
                  <span>512 MB minimum</span>
                </li>
                <li className="flex justify-between border-b border-border/60 pb-2.5">
                  <span className="text-muted-foreground">Architecture</span>
                  <span>x86_64, arm64</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">License</span>
                  <span>Source-available (SSPL-derived)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Source / GitHub */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="rounded-lg border border-border bg-secondary/50 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium tracking-wide text-primary mb-2">
                Building from source
              </p>
              <p className="text-foreground font-medium max-w-xl">
                Every release ships from the same public repo. Clone it, read
                it, or build a version nobody's packaged yet.
              </p>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-background text-sm font-medium hover:border-primary/40 transition-colors whitespace-nowrap"
            >
              <Github className="w-4 h-4" />
              github.com/EnglishCompiler/EnglishCompiler
            </a>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Looking for an older build?</span>
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Browse all releases
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}