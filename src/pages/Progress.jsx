import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Circle, 
  Zap, 
  Code, 
  Terminal, 
  Shield, 
  BookOpen,
  Construction,
  Mail,
  GitBranch,
  Cpu,
  MemoryStick
} from "lucide-react";
import Navbar from "@/components/home/Navbar";

// Professional progress indicator banner
function ProgressBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20 my-12">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent dark:via-blue-900/30 opacity-50" />
      <div className="relative flex items-center justify-center py-4">
        <div className="flex items-center gap-4">
          <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
              PROJECT PROGRESS
            </p>
            <p className="text-xs text-blue-600/70 dark:text-blue-400/70 tracking-wide">
              Active development - Check back regularly for updates
            </p>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    </div>
  );
}

// Status indicator component
function StatusIndicator({ status, className = "" }) {
  const variants = {
    complete: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    inProgress: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    planned: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    blocked: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };
  
  const labels = {
    complete: "Complete",
    inProgress: "In Progress",
    planned: "Planned",
    blocked: "Blocked",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${variants[status]} ${className}`}>
      {labels[status]}
    </span>
  );
}

// Progress card component
function ProgressCard({ 
  icon: Icon, 
  title, 
  description, 
  status, 
  progress = 0,
  timeline,
  dependencies = [],
  priority = "medium"
}) {
  const priorityColors = {
    high: "border-red-500",
    medium: "border-yellow-500",
    low: "border-green-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 ${priorityColors[priority]}`}>
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h3 className="font-display font-semibold text-lg text-foreground">{title}</h3>
            <StatusIndicator status={status} />
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          
          {progress > 0 && progress < 100 && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
          )}

          {timeline && (
            <p className="text-xs text-muted-foreground/70 mb-3">
              <Clock className="w-3 h-3 inline mr-1" />
              {timeline}
            </p>
          )}

          {dependencies.length > 0 && (
            <div className="mt-3">
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
      </div>
    </motion.div>
  );
}

// Milestone component
function Milestone({ 
  icon: Icon, 
  title, 
  description, 
  targetDate,
  status,
  achievements = []
}) {
  const statusVariants = {
    achieved: "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800",
    current: "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800",
    upcoming: "bg-gray-50 dark:bg-gray-900/10 border-gray-200 dark:border-gray-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border p-6 ${statusVariants[status]}`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-semibold text-lg text-foreground">{title}</h3>
            <span className="text-xs font-medium text-muted-foreground/70">
              {targetDate}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          
          {achievements.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Key Achievements:
              </p>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <li key={index} className="text-sm text-muted-foreground/80 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Stats component
function StatsGrid() {
  const stats = [
    {
      label: "Compiler Stages",
      value: "4",
      description: "Self-hosting stages planned",
      icon: GitBranch,
      color: "text-blue-600"
    },
    {
      label: "Platforms",
      value: "3",
      description: "macOS, Windows, Linux",
      icon: Terminal,
      color: "text-green-600"
    },
    {
      label: "Language Spec",
      value: "v1.0",
      description: "Complete and finalized",
      icon: BookOpen,
      color: "text-purple-600"
    },
    {
      label: "Contributors",
      value: "10+",
      description: "Active developers",
      icon: Code,
      color: "text-orange-600"
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="rounded-lg border border-border bg-card p-6 text-center"
        >
          <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
          <p className="text-xs text-muted-foreground/70">{stat.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function Progress() {
  const compilerStages = [
    {
      icon: Cpu,
      title: "Stage 0 - Ember",
      description: "Bootstrap compiler written in C. Handles the S0 subset of English and compiles Stage 1.",
      status: "inProgress",
      progress: 85,
      timeline: "Target: Q4 2024",
      dependencies: ["LibC integration"],
      priority: "high"
    },
    {
      icon: Code,
      title: "Stage 1 - Kindling",
      description: "First English compiler written in English. Adds modules, generics, and closures.",
      status: "planned",
      progress: 0,
      timeline: "Target: Q1 2025",
      dependencies: ["Ember completion"],
      priority: "high"
    },
    {
      icon: Zap,
      title: "Stage 2 - Firebrand",
      description: "Adds real concurrency, SIMD, and the full optimizer. Produces object files.",
      status: "planned",
      progress: 0,
      timeline: "Target: Q2 2025",
      dependencies: ["Kindling completion"],
      priority: "medium"
    },
    {
      icon: Shield,
      title: "Stage 3 - Hearthkeeper",
      description: "Self-hosting compiler with no restrictions. The official 'compiler exists' milestone.",
      status: "planned",
      progress: 0,
      timeline: "Target: Q3 2025",
      dependencies: ["Firebrand completion"],
      priority: "medium"
    },
  ];

  const additionalComponents = [
    {
      icon: Terminal,
      title: "CLI Interface",
      description: "Command-line interface for the English compiler with comprehensive options.",
      status: "inProgress",
      progress: 60,
      timeline: "Ongoing development",
      dependencies: ["Stage 0 completion"],
      priority: "high"
    },
    {
      icon: MemoryStick,
      title: "Standard Library",
      description: "Core library modules providing essential functionality for English programs.",
      status: "inProgress",
      progress: 40,
      timeline: "Parallel development",
      dependencies: ["Compiler stages"],
      priority: "medium"
    },
    {
      icon: Shield,
      title: "Security Features",
      description: "Memory safety guarantees and security-focused language features.",
      status: "planned",
      progress: 20,
      timeline: "Design phase",
      dependencies: ["Type system finalization"],
      priority: "high"
    },
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Comprehensive language documentation and tutorials.",
      status: "inProgress",
      progress: 30,
      timeline: "Beta phase",
      dependencies: ["Language stabilization"],
      priority: "medium"
    },
  ];

  const milestones = [
    {
      icon: BookOpen,
      title: "Language Specification Finalized",
      description: "The complete English language specification v1.0 has been written and approved. This serves as the foundation for all compiler development.",
      targetDate: "Completed - Q2 2024",
      status: "achieved",
      achievements: [
        "Grammar specification complete",
        "Disambiguation rules defined",
        "Type system fully specified",
        "Semantic rules documented"
      ]
    },
    {
      icon: Construction,
      title: "Bootstrap Compiler Development",
      description: "Stage 0 (Ember) is under active development. This is the critical first step in the self-hosting chain.",
      targetDate: "In Progress",
      status: "current",
      achievements: [
        "Lexer implementation complete",
        "AST generation working",
        "Basic program compilation functional",
        "LibC integration in progress"
      ]
    },
    {
      icon: TrendingUp,
      title: "First Self-Hosted Compiler",
      description: "Stage 1 (Kindling) will be the first English compiler written in English itself, marking a major milestone.",
      targetDate: "Q1 2025",
      status: "upcoming",
      achievements: []
    },
    {
      icon: Zap,
      title: "Production-Ready Compiler",
      description: "Stage 3 (Hearthkeeper) will be a fully self-hosting compiler capable of compiling any valid English program.",
      targetDate: "Q3 2025",
      status: "upcoming",
      achievements: []
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
              Development Progress
            </p>
            <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-foreground">
              English Language Development
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              Track the progress of English, the programming language that reads like
              a sentence. From the initial bootstrap compiler to the final
              self-hosting implementation, follow our journey to create a
              modern, efficient, and readable programming language.
            </p>
          </motion.div>
        </section>

        {/* Progress Banner */}
        <section className="max-w-7xl mx-auto px-6 md:px-10">
          <ProgressBanner />
        </section>

        {/* Current Stats */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-16">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Quick Overview
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Current Development Statistics
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Get a quick snapshot of where we are in the development process.
            </p>
          </div>
          <StatsGrid />
        </section>

        {/* Milestones */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Journey
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Development Milestones
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Major achievements and upcoming goals in the English language development timeline.
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <Milestone key={index} {...milestone} />
            ))}
          </div>
        </section>

        {/* Compiler Stages */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Self-Hosting Chain
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Compiler Development Stages
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              English achieves self-hosting through four carefully planned stages.
              Each stage's compiler is written in the previous stage's language,
              ensuring correctness and completeness at each step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {compilerStages.map((stage, index) => (
              <ProgressCard key={index} {...stage} />
            ))}
          </div>
        </section>

        {/* Additional Components */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Supporting Elements
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Additional Development Areas
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Beyond the compiler itself, we're developing the ecosystem that
              makes English a complete, production-ready language.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {additionalComponents.map((component, index) => (
              <ProgressCard key={index} {...component} />
            ))}
          </div>
        </section>

        {/* Project Timeline */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Schedule
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Project Timeline
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our estimated timeline for major development phases. Dates are
              targets and may shift as we prioritize quality and completeness.
            </p>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-6 p-4 rounded-lg border border-border bg-card"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Q2 2024 - Language Specification</h3>
                <p className="text-sm text-muted-foreground">Complete and approved</p>
              </div>
              <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                COMPLETED
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-6 p-4 rounded-lg border border-border bg-card"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Q3-Q4 2024 - Stage 0 (Ember)</h3>
                <p className="text-sm text-muted-foreground">Bootstrap compiler development</p>
              </div>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                IN PROGRESS
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-6 p-4 rounded-lg border border-border bg-card"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Circle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Q1 2025 - Stage 1 (Kindling)</h3>
                <p className="text-sm text-muted-foreground">First self-hosted compiler</p>
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                PLANNED
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-6 p-4 rounded-lg border border-border bg-card"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Circle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Q2 2025 - Stage 2 (Firebrand)</h3>
                <p className="text-sm text-muted-foreground">Concurrency and optimization</p>
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                PLANNED
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-6 p-4 rounded-lg border border-border bg-card"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Circle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Q3 2025 - Stage 3 (Hearthkeeper)</h3>
                <p className="text-sm text-muted-foreground">Full self-hosting compiler</p>
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                PLANNED
              </span>
            </motion.div>
          </div>
        </section>

        {/* Contribution Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="rounded-lg border border-border bg-secondary/50 p-8 md:p-12">
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wide text-primary mb-4">
                Get Involved
              </p>
              <h2 className="font-display font-semibold text-2xl md:text-3xl tracking-tight text-foreground mb-4">
                Contribute to English Development
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                English is an open-source project, and we welcome contributions
                from the community. Whether you're a developer, documentation
                writer, or just want to help test and provide feedback, your
                involvement is valuable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/EnglishCompiler/EnglishCompiler"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors whitespace-nowrap"
                >
                  <Code className="w-4 h-4" />
                  View Source on GitHub
                </a>
                <a
                  href="https://github.com/EnglishCompiler/EnglishCompiler/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-border text-foreground text-sm font-medium hover:bg-secondary/50 transition-colors whitespace-nowrap"
                >
                  <GitBranch className="w-4 h-4" />
                  Report Issues
                </a>
                <a
                  href="mailto:contribute@english-lang.org"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-border text-foreground text-sm font-medium hover:bg-secondary/50 transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4" />
                  Contact Team
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="rounded-lg border border-border bg-secondary/50 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium tracking-wide text-primary mb-2">
                Stay Informed
              </p>
              <p className="text-foreground font-medium max-w-xl">
                Follow our progress and be the first to know when new stages are
                completed and releases become available.
              </p>
            </div>
            <a
              href="mailto:updates@english-lang.org?subject=Subscribe to English Progress Updates"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors whitespace-nowrap"
            >
              <Mail className="w-4 h-4" />
              Subscribe to Progress Updates
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
