import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Code, Terminal, Construction, Mail, Zap, Shield, FileText } from "lucide-react";
import Navbar from "@/components/home/Navbar";

// Professional under-construction banner component
function UnderConstructionBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-900/20 my-12">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-50 to-transparent dark:via-amber-900/30 opacity-50" />
      <div className="relative flex items-center justify-center py-4">
        <div className="flex items-center gap-4">
          <Construction className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
              BETA DOCUMENTATION
            </p>
            <p className="text-xs text-amber-600/70 dark:text-amber-400/70 tracking-wide">
              Early access - Content is being actively developed
            </p>
          </div>
          <Construction className="w-8 h-8 text-amber-600 dark:text-amber-400" />
        </div>
      </div>
    </div>
  );
}

// Status indicator component
function StatusBadge({ status, className = "" }) {
  const variants = {
    available: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    coming: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    planned: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  };
  
  const labels = {
    available: "Available",
    coming: "Coming Soon",
    planned: "Planned",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${variants[status]} ${className}`}>
      {labels[status]}
    </span>
  );
}

// Documentation section card
function DocSectionCard({ icon: Icon, title, description, status, features, link }) {
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
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-display font-semibold text-lg text-foreground">{title}</h3>
            <StatusBadge status={status} />
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          {features && features.length > 0 && (
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="text-sm text-muted-foreground/80 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-primary/60" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
          {link && (
            <a
              href={link}
              className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
            >
              Learn more
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Feature highlight component
function FeatureHighlight({ icon: Icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="text-center p-6"
    >
      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export default function BetaDocs() {
  const documentationSections = [
    {
      icon: BookOpen,
      title: "Language Reference",
      description: "Complete syntax documentation, type system overview, and language semantics.",
      status: "coming",
      features: [
        "Full grammar specification",
        "Type system documentation",
        "Control flow patterns",
        "Error handling guide"
      ]
    },
    {
      icon: Code,
      title: "Getting Started",
      description: "Step-by-step guides to set up your development environment and write your first English program.",
      status: "planned",
      features: [
        "Installation instructions",
        "Hello World tutorial",
        "Basic syntax introduction",
        "Development workflow"
      ]
    },
    {
      icon: Terminal,
      title: "Command Line Interface",
      description: "Comprehensive documentation for the English compiler CLI and its options.",
      status: "planned",
      features: [
        "Compiler flags and options",
        "Build configurations",
        "Debugging tools",
        "Performance tuning"
      ]
    },
    {
      icon: Shield,
      title: "Security Guidelines",
      description: "Best practices for writing secure English code and understanding the language's safety features.",
      status: "planned",
      features: [
        "Memory safety patterns",
        "Input validation",
        "Secure coding practices",
        "Audit guidelines"
      ]
    },
    {
      icon: FileText,
      title: "Standard Library",
      description: "API documentation for the English standard library and its modules.",
      status: "planned",
      features: [
        "Core modules reference",
        "Utility functions",
        "Data structures",
        "I/O operations"
      ]
    },
  ];

  const highlights = [
    {
      icon: Zap,
      title: "Performance Optimized",
      description: "Learn how to write English code that compiles to highly efficient native binaries."
    },
    {
      icon: Shield,
      title: "Memory Safe",
      description: "Understand English's built-in safety features and how to leverage them."
    },
    {
      icon: Code,
      title: "Expressive Syntax",
      description: "Discover the natural, readable syntax that makes code feel like prose."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Documentation
            </p>
            <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-foreground">
              English Language Documentation
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              Welcome to the early access documentation for English, the programming
              language that reads like a sentence. This is your comprehensive resource
              for learning, using, and mastering English. Content is being actively
              developed and expanded.
            </p>
          </motion.div>
        </section>

        {/* Under Construction Notice */}
        <section className="max-w-7xl mx-auto px-6 md:px-10">
          <UnderConstructionBanner />
        </section>

        {/* What's Available Now */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-16">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Current Status
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              What's Available Now
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              While we're actively building out the complete documentation, here's
              what you can expect to find as we progress through the beta phase.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentationSections.map((section, index) => (
              <DocSectionCard key={index} {...section} />
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Why English
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Key Documentation Highlights
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              English is designed from the ground up to be both powerful and
              approachable. Our documentation reflects these principles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <FeatureHighlight key={index} {...highlight} />
            ))}
          </div>
        </section>

        {/* Contribution Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="rounded-lg border border-border bg-secondary/50 p-8 md:p-12">
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wide text-primary mb-4">
                Help Us Improve
              </p>
              <h2 className="font-display font-semibold text-2xl md:text-3xl tracking-tight text-foreground mb-4">
                Contribute to the Documentation
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The English documentation is a community effort. If you're using
                English and want to help improve the docs, we'd love to have you
                involved. Your real-world experience is invaluable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/EnglishCompiler/EnglishCompiler"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors whitespace-nowrap"
                >
                  <Code className="w-4 h-4" />
                  View on GitHub
                </a>
                <a
                  href="mailto:docs@english-lang.org"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-border text-foreground text-sm font-medium hover:bg-secondary/50 transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Roadmap
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Documentation Timeline
            </h2>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-primary">Q4 2024</span>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  Foundation Documentation
                </h3>
                <p className="text-muted-foreground">
                  Core language reference, basic tutorials, and CLI documentation.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-start gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-primary">Q1 2025</span>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  Standard Library Docs
                </h3>
                <p className="text-muted-foreground">
                  Complete API reference for all standard library modules.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-start gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-primary">Q2 2025</span>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  Advanced Guides
                </h3>
                <p className="text-muted-foreground">
                  Performance optimization, security best practices, and advanced
                  patterns.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="rounded-lg border border-border bg-secondary/50 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium tracking-wide text-primary mb-2">
                Stay Updated
              </p>
              <p className="text-foreground font-medium max-w-xl">
                Subscribe to our documentation newsletter to be notified when
                new sections are published and major updates are released.
              </p>
            </div>
            <a
              href="mailto:docs@english-lang.org?subject=Subscribe to English Docs Updates"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors whitespace-nowrap"
            >
              <Mail className="w-4 h-4" />
              Subscribe to Updates
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
