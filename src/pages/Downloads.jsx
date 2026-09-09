import React from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Laptop, 
  Monitor, 
  Terminal, 
  Check, 
  Clock, 
  Circle, 
  Mail,
  Download,
  Package,
  Code,
  Zap,
  Shield,
  Construction,
  Calendar,
  Users,
  FileText
} from "lucide-react";
import Navbar from "@/components/home/Navbar";

// Professional under-construction banner
function DownloadsBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20 my-12">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent dark:via-blue-900/30 opacity-50" />
      <div className="relative flex items-center justify-center py-4">
        <div className="flex items-center gap-4">
          <Download className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
              DOWNLOADS
            </p>
            <p className="text-xs text-blue-600/70 dark:text-blue-400/70 tracking-wide">
              Coming soon - Compiler under active development
            </p>
          </div>
          <Download className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    </div>
  );
}

// Status indicator component
function DownloadStatus({ status, className = "" }) {
  const variants = {
    available: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    coming: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    planned: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    unreleased: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };
  
  const labels = {
    available: "Available",
    coming: "Coming Soon",
    planned: "Planned",
    unreleased: "Not Yet Available",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${variants[status]} ${className}`}>
      {labels[status]}
    </span>
  );
}

// Platform card component
function PlatformCard({ 
  icon: Icon, 
  name, 
  detail,
  status,
  estimatedDate,
  requirements = [],
  features = []
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h3 className="font-display font-semibold text-lg text-foreground">{name}</h3>
            <DownloadStatus status={status} />
          </div>
          <p className="text-sm text-muted-foreground mb-4">{detail}</p>
          
          {estimatedDate && (
            <p className="text-xs text-muted-foreground/70 mb-4 flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              Estimated: {estimatedDate}
            </p>
          )}

          {requirements.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Requirements:</p>
              <ul className="space-y-1">
                {requirements.map((req, index) => (
                  <li key={index} className="text-sm text-muted-foreground/80 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-primary/60" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {features.length > 0 && (
            <div className="pt-4 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground mb-2">Features:</p>
              <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => (
                  <span 
                    key={index} 
                    className="text-xs px-2 py-1 bg-secondary rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Roadmap item component
function RoadmapItem({ 
  icon: Icon, 
  state, 
  title, 
  body, 
  tone,
  estimatedDate,
  dependencies = []
}) {
  const toneStyles = {
    done: "border-primary/30 bg-primary/5",
    pending: "border-border bg-card",
    todo: "border-dashed border-border bg-transparent",
  };

  const stateIcons = {
    Done: Check,
    "In progress \u2014 mostly there": Clock,
    "Not started": Circle,
  };

  const StateIcon = stateIcons[state] || Circle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className={`rounded-lg border p-6 md:p-7 flex items-start gap-5 ${toneStyles[tone]}`}
    >
      <div className="w-9 h-9 rounded-md bg-background border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
        <StateIcon
          className={`w-4 h-4 ${tone === "done" ? "text-primary" : "text-muted-foreground"}`}
        />
      </div>
      <div className="flex-1">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          {state}
        </span>
        <h3 className="font-display font-semibold text-lg text-foreground mt-1 mb-1.5">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{body}</p>
        
        {estimatedDate && (
          <p className="text-xs text-muted-foreground/70 mb-2 flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            {estimatedDate}
          </p>
        )}

        {dependencies.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground/70 mb-1">Dependencies:</p>
            <div className="flex flex-wrap gap-2">
              {dependencies.map((dep, index) => (
                <span 
                  key={index} 
                  className="text-xs px-2 py-1 bg-secondary rounded"
                >
                  {dep}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Release channel component
function ReleaseChannel({ 
  name, 
  description, 
  status,
  icon: Icon,
  features = [],
  audience
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-border bg-card p-6 text-center"
    >
      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="mb-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Audience:</p>
        <p className="text-sm text-foreground">{audience}</p>
      </div>
      {features.length > 0 && (
        <div className="pt-4 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground mb-2">Includes:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {features.map((feature, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 bg-secondary rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="mt-4">
        <DownloadStatus status={status} />
      </div>
    </motion.div>
  );
}

export default function Downloads() {
  const GITHUB_URL = "https://github.com/EnglishCompiler/EnglishCompiler";

  // Enhanced roadmap with more details
  const roadmap = [
    {
      icon: Check,
      state: "Done",
      title: "Language specification v1.0",
      body: "The grammar, the disambiguation rules, and the type system are written down \u2014 this is the exact spec the compiler is being built against.",
      tone: "done",
      estimatedDate: "Completed - Q2 2024",
      dependencies: []
    },
    {
      icon: Clock,
      state: "In progress \u2014 mostly there",
      title: 'Stage 0 \u2014 "Ember" (bootstrap compiler, written in C)',
      body: "The lexer and AST are fully written and it can already compile basic English programs \u2014 it's not trying to handle the whole language, just enough of it (\u00a724.1's S0 subset) to compile Stage 1. It's close to functionally complete: a few libc-interaction bugs are still being chased down before it's solid.",
      tone: "pending",
      estimatedDate: "Target: Q4 2024",
      dependencies: ["LibC integration", "Bug fixes"]
    },
    {
      icon: Circle,
      state: "Not started",
      title: 'Stage 1 \u2014 "Kindling" (written in English, built by Ember)',
      body: "The first English compiler written in English itself, adding modules, generics, and closures. Waiting on Ember to be reliable enough to compile it.",
      tone: "todo",
      estimatedDate: "Target: Q1 2025",
      dependencies: ["Ember completion", "Language stability"]
    },
    {
      icon: Circle,
      state: "Not started",
      title: 'Stage 2 \u2014 "Firebrand"',
      body: "Adds real concurrency, SIMD, and the full optimizer \u2014 built by Kindling, and the stage where the compiler starts writing real object files.",
      tone: "todo",
      estimatedDate: "Target: Q2 2025",
      dependencies: ["Kindling completion", "Concurrency design"]
    },
    {
      icon: Circle,
      state: "Not started",
      title: 'Stage 3 \u2014 "Hearthkeeper" (self-hosting)',
      body: "The point where English compiles itself, with no restriction to any earlier subset. This is the actual finish line for the compiler exists, and it's the furthest-out part of the whole roadmap.",
      tone: "todo",
      estimatedDate: "Target: Q3 2025",
      dependencies: ["Firebrand completion", "Full optimization"]
    },
    {
      icon: Circle,
      state: "Not started",
      title: "Public alpha release",
      body: "The first publicly available binary that can compile real English programs. Will include basic CLI and core standard library.",
      tone: "todo",
      estimatedDate: "Target: Q4 2025",
      dependencies: ["Hearthkeeper completion", "Packaging"]
    },
    {
      icon: Circle,
      state: "Not started",
      title: "Production-ready release",
      body: "Stable, optimized compiler with full standard library, documentation, and cross-platform support.",
      tone: "todo",
      estimatedDate: "Target: 2026",
      dependencies: ["Alpha testing", "Performance optimization", "Documentation"]
    },
  ];

  // Enhanced platform information
  const plannedPlatforms = [
    {
      id: "macos",
      name: "macOS",
      icon: Laptop,
      detail: "Apple Silicon & Intel",
      status: "planned",
      estimatedDate: "Q4 2025",
      requirements: [
        "macOS 12+ (Monterey)",
        "Xcode Command Line Tools",
        "64-bit processor"
      ],
      features: [
        "Native ARM64 support",
        "Intel x86_64 support",
        "Homebrew package",
        "Universal binary"
      ]
    },
    {
      id: "windows",
      name: "Windows",
      icon: Monitor,
      detail: "64-bit (Windows 10 & 11)",
      status: "planned",
      estimatedDate: "Q4 2025",
      requirements: [
        "Windows 10 or 11",
        "64-bit processor",
        "Visual Studio 2022 (optional)"
      ],
      features: [
        "MSI installer",
        "Chocolatey package",
        "Scoop package",
        "Portable ZIP"
      ]
    },
    {
      id: "linux",
      name: "Linux",
      icon: Terminal,
      detail: "x86_64 & arm64",
      status: "planned",
      estimatedDate: "Q4 2025",
      requirements: [
        "Glibc 2.31+",
        "64-bit processor",
        "GCC 10+ or Clang 12+"
      ],
      features: [
        "DEB packages",
        "RPM packages",
        "Snap package",
        "Flatpak package",
        "AppImage",
        "Tarball"
      ]
    },
  ];

  // Release channels
  const releaseChannels = [
    {
      name: "Nightly Builds",
      description: "Cutting-edge builds from the latest development branch.",
      status: "planned",
      icon: Zap,
      features: [
        "Latest features",
        "Unstable",
        "For testing only",
        "No support"
      ],
      audience: "Developers & Testers"
    },
    {
      name: "Alpha Releases",
      description: "Early access releases for brave testers and contributors.",
      status: "planned",
      icon: Construction,
      features: [
        "Basic functionality",
        "Known issues",
        "Limited support",
        "Feedback welcome"
      ],
      audience: "Early Adopters & Contributors"
    },
    {
      name: "Beta Releases",
      description: "Feature-complete releases for broader testing.",
      status: "planned",
      icon: Shield,
      features: [
        "Complete features",
        "Stable API",
        "Community support",
        "Bug reporting"
      ],
      audience: "Testers & Integrators"
    },
    {
      name: "Stable Releases",
      description: "Production-ready releases with full support.",
      status: "unreleased",
      icon: Check,
      features: [
        "Fully tested",
        "Documented",
        "Long-term support",
        "Security updates"
      ],
      audience: "Production Users"
    },
  ];

  // Package managers
  const packageManagers = [
    {
      name: "Homebrew",
      platform: "macOS & Linux",
      status: "planned",
      icon: Package,
      command: "brew install english"
    },
    {
      name: "Chocolatey",
      platform: "Windows",
      status: "planned",
      icon: Package,
      command: "choco install english"
    },
    {
      name: "Scoop",
      platform: "Windows",
      status: "planned",
      icon: Package,
      command: "scoop install english"
    },
    {
      name: "APT",
      platform: "Debian/Ubuntu",
      status: "planned",
      icon: Package,
      command: "sudo apt install english"
    },
    {
      name: "YUM/DNF",
      platform: "Fedora/RHEL",
      status: "planned",
      icon: Package,
      command: "sudo dnf install english"
    },
    {
      name: "Snap",
      platform: "Linux",
      status: "planned",
      icon: Package,
      command: "sudo snap install english"
    },
  ];

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
            className="max-w-3xl"
          >
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Downloads
            </p>
            <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-foreground">
              Get English
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              English is being actively built, not just designed. The compiler is
              under active development, and we're working through our carefully
              planned self-hosting stages. While there's nothing to download yet,
              you can follow our progress and be ready for when the first releases
              become available.
            </p>
          </motion.div>
        </section>

        {/* Downloads Banner */}
        <section className="max-w-7xl mx-auto px-6 md:px-10">
          <DownloadsBanner />
        </section>

        {/* Current Status */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-16">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Where We Are
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Current Development Status
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We're making excellent progress through our self-hosting compiler
              stages. Here's the complete roadmap with estimated timelines.
            </p>
          </div>
          <div className="space-y-4">
            {roadmap.map((r, i) => (
              <RoadmapItem key={r.title} {...r} />
            ))}
          </div>
        </section>

        {/* Planned platforms */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Supported Platforms
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Platform Support
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              English will be available on all major platforms. We're committed
              to providing first-class support for macOS, Windows, and Linux
              with multiple installation methods for each.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plannedPlatforms.map((p) => {
              const Icon = p.icon;
              return <PlatformCard key={p.id} {...p} icon={Icon} />;
            })}
          </div>
        </section>

        {/* Release Channels */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Distribution
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Release Channels
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              English will be distributed through multiple channels to suit
              different needs, from cutting-edge nightly builds to stable
              production releases.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {releaseChannels.map((channel, index) => (
              <ReleaseChannel key={index} {...channel} />
            ))}
          </div>
        </section>

        {/* Package Managers */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Easy Installation
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Package Manager Support
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Install English using your favorite package manager. We'll provide
              packages for all major package managers to make installation
              as simple as running a single command.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packageManagers.map((pm, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-lg border border-border bg-card p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <pm.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{pm.name}</h3>
                    <p className="text-xs text-muted-foreground">{pm.platform}</p>
                  </div>
                </div>
                <div className="text-right">
                  <DownloadStatus status={pm.status} className="mb-2" />
                  <code className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">
                    {pm.command}
                  </code>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Source Code */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              For Developers
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Source Code Access
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              While we don't have pre-built binaries yet, the English source
              code is available on GitHub. You can follow along with development,
              contribute to the project, or even build the compiler yourself.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Github className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    GitHub Repository
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The complete English source code, including the compiler,
                    standard library, and documentation.
                  </p>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Code className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    Build from Source
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Instructions for building English from source will be
                    available in our documentation once the bootstrap compiler
                    is stable.
                  </p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-foreground text-sm font-medium bg-secondary/50">
                    <Clock className="w-4 h-4" />
                    Coming Soon
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Follow along */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="rounded-lg border border-border bg-secondary/50 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium tracking-wide text-primary mb-2">
                Stay Updated
              </p>
              <p className="text-foreground font-medium max-w-xl">
                Star or watch the repo on GitHub \u2014 that's where actual
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
