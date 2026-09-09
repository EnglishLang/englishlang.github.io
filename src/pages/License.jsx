import React from "react";
import { motion } from "framer-motion";
import { 
  Check, 
  Clock, 
  Circle, 
  Mail, 
  Shield, 
  FileText, 
  Users, 
  GraduationCap,
  Heart,
  Scale,
  Lock,
  Globe,
  Construction
} from "lucide-react";
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

// Professional under-construction banner
function LicenseBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-900/20 my-12">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-50 to-transparent dark:via-yellow-900/30 opacity-50" />
      <div className="relative flex items-center justify-center py-4">
        <div className="flex items-center gap-4">
          <Scale className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          <div>
            <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
              LICENSE INFORMATION
            </p>
            <p className="text-xs text-yellow-600/70 dark:text-yellow-400/70 tracking-wide">
              Draft version - Final terms coming soon
            </p>
          </div>
          <Scale className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
        </div>
      </div>
    </div>
  );
}

// Status indicator component
function LicenseStatus({ status, className = "" }) {
  const variants = {
    decided: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    deciding: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    pending: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  };
  
  const labels = {
    decided: "Decided",
    deciding: "Under Review",
    pending: "Not Started",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${variants[status]} ${className}`}>
      {labels[status]}
    </span>
  );
}

// Feature card component
function LicenseFeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  status,
  details = [],
  benefits = []
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
            <h3 className="font-display font-semibold text-lg text-foreground">{title}</h3>
            <LicenseStatus status={status} />
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          
          {details.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Details:</p>
              <ul className="space-y-2">
                {details.map((detail, index) => (
                  <li key={index} className="text-sm text-muted-foreground/80 flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary/60" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {benefits.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground mb-2">Benefits:</p>
              <div className="flex flex-wrap gap-2">
                {benefits.map((benefit, index) => (
                  <span 
                    key={index} 
                    className="text-xs px-2 py-1 bg-secondary rounded"
                  >
                    {benefit}
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

// Comparison table component
function LicenseComparisonTable() {
  const features = [
    { 
      name: "Source Code Access", 
      open: true, 
      commercial: true 
    },
    { 
      name: "Modify & Distribute", 
      open: true, 
      commercial: true 
    },
    { 
      name: "Use in Closed Products", 
      open: false, 
      commercial: true 
    },
    { 
      name: "Commercial Support", 
      open: false, 
      commercial: true 
    },
    { 
      name: "License Cost", 
      open: "Free", 
      commercial: "Paid (TBD)" 
    },
    { 
      name: "Warranty", 
      open: "As-is", 
      commercial: "Available" 
    },
    { 
      name: "Liability", 
      open: "Limited", 
      commercial: "Negotiable" 
    },
    { 
      name: "Patent Grant", 
      open: true, 
      commercial: true 
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-border bg-card overflow-hidden"
    >
      <div className="px-6 py-4 bg-secondary/50 border-b border-border">
        <h3 className="font-semibold text-foreground">License Comparison</h3>
        <p className="text-sm text-muted-foreground">Choose the right license for your use case</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground w-1/2">
                Feature
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground w-1/4">
                Open Source
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground w-1/4">
                Commercial
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr 
                key={index} 
                className={`border-b border-border ${index % 2 === 0 ? 'bg-background' : 'bg-secondary/30'}`}
              >
                <td className="px-6 py-4 text-sm text-foreground">{feature.name}</td>
                <td className="px-6 py-4 text-center">
                  {typeof feature.open === 'boolean' ? (
                    feature.open ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <Circle className="w-5 h-5 text-red-500 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm text-foreground">{feature.open}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {typeof feature.commercial === 'boolean' ? (
                    feature.commercial ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <Circle className="w-5 h-5 text-red-500 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm text-foreground">{feature.commercial}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-secondary/50 border-t border-border">
        <p className="text-xs text-muted-foreground/70">
          * Commercial license terms are still being finalized. Contact us for specific requirements.
        </p>
      </div>
    </motion.div>
  );
}

// FAQ component
function FAQSection() {
  const faqs = [
    {
      question: "Can I use English for free?",
      answer: "Yes! The open-source license allows you to use English for free, provided you open-source your own product under the same terms. This ensures the ecosystem remains open and collaborative."
    },
    {
      question: "What if I want to keep my product closed-source?",
      answer: "For closed-source products, you'll need to purchase a commercial license. This allows you to use English in proprietary software while supporting the continued development of the language."
    },
    {
      question: "Are there different tiers for commercial licenses?",
      answer: "Yes, we're planning multiple tiers to accommodate different needs: individual developers, small teams, and larger organizations. Pricing details are still being finalized."
    },
    {
      question: "Can students and nonprofits get discounts?",
      answer: "We're committed to supporting education and nonprofit work. Discount programs are under development, and we're exploring various options for making English accessible to these communities."
    },
    {
      question: "What's the difference between the open-source and commercial licenses?",
      answer: "The main difference is the reciprocity requirement. The open-source license requires you to share your modifications and products, while the commercial license allows you to keep your work proprietary."
    },
    {
      question: "Can I contribute to English without a license?",
      answer: "Absolutely! Contributions to the English project are welcome and typically require you to sign a Contributor License Agreement (CLA) to ensure we can properly manage and license the contributions."
    },
    {
      question: "How will the final license terms be communicated?",
      answer: "Once finalized, the complete license text will be published here, and all users will be notified through our mailing list and official communication channels."
    },
    {
      question: "What happens if I start using English now and the license changes?",
      answer: "Any changes to the license terms will include a transition period and clear guidance for existing users. We're committed to not disrupting ongoing projects."
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="rounded-lg border border-border bg-card p-6"
        >
          <h3 className="font-semibold text-lg text-foreground mb-3 flex items-start gap-3">
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-medium">{index + 1}</span>
            </span>
            {faq.question}
          </h3>
          <p className="text-muted-foreground leading-relaxed pl-11">{faq.answer}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function License() {
  const licenseStatus = [
    {
      icon: Check,
      state: "Decided",
      title: "Dual-licensing model",
      body: "Open your product under the same terms and it's free. Want to keep your product closed? That'll require a paid commercial license. There's no free-and-closed option.",
      tone: "done",
      details: [
        "Open source license available",
        "Commercial license for proprietary use",
        "No free closed-source option"
      ],
      benefits: ["Flexible", "Fair", "Sustainable"]
    },
    {
      icon: Clock,
      state: "Under Review",
      title: "Commercial license pricing",
      body: "We know there'll be a tier for a solo developer and a tier for a small team \u2014 we don't yet know what either should cost.",
      tone: "pending",
      details: [
        "Individual developer tier planned",
        "Small team tier planned",
        "Enterprise options considered"
      ],
      benefits: ["Affordable", "Scalable", "Transparent"]
    },
    {
      icon: Clock,
      state: "Under Review",
      title: "Educational & nonprofit discounts",
      body: "Leaning yes. Haven't worked out the mechanics of how someone would actually claim one.",
      tone: "pending",
      details: [
        "Student discounts under consideration",
        "Nonprofit discounts planned",
        "Verification process to be determined"
      ],
      benefits: ["Accessible", "Community-focused", "Supportive"]
    },
    {
      icon: Circle,
      state: "Not Started",
      title: "Final legal text",
      body: "We're adapting an SSPL-style license rather than writing one from nothing, but nothing's been drafted yet.",
      tone: "todo",
      details: [
        "Based on SSPL-style license",
        "Legal review required",
        "Community feedback period planned"
      ],
      benefits: ["Industry-standard", "Well-tested", "Community-approved"]
    },
  ];

  const licenseTypes = [
    {
      icon: Globe,
      title: "Open Source License",
      description: "Free to use for open-source projects that share their code under compatible terms.",
      status: "decided",
      details: [
        "Source code access included",
        "Modify and distribute freely",
        "Reciprocity requirement",
        "No licensing fees"
      ],
      benefits: ["Free", "Open", "Community-driven", "No restrictions"]
    },
    {
      icon: Lock,
      title: "Commercial License",
      description: "Paid license for using English in closed-source, proprietary products.",
      status: "deciding",
      details: [
        "Use in proprietary products",
        "No reciprocity requirement",
        "Commercial support available",
        "Warranty options"
      ],
      benefits: ["Proprietary use", "Support", "Warranty", "Indemnification"]
    },
    {
      icon: GraduationCap,
      title: "Educational License",
      description: "Special terms for students, teachers, and educational institutions.",
      status: "deciding",
      details: [
        "Discounted or free access",
        "Academic use encouraged",
        "Classroom-friendly terms",
        "Research use permitted"
      ],
      benefits: ["Affordable", "Educational", "Flexible", "Supportive"]
    },
    {
      icon: Heart,
      title: "Nonprofit License",
      description: "Special terms for nonprofit organizations and charitable projects.",
      status: "deciding",
      details: [
        "Discounted or free access",
        "Mission-aligned support",
        "Simplified terms",
        "Community benefits"
      ],
      benefits: ["Affordable", "Mission-focused", "Community-oriented", "Supportive"]
    },
  ];

  const toneStyles = {
    done: "border-primary/30 bg-primary/5",
    pending: "border-border bg-card",
    todo: "border-dashed border-border bg-transparent",
  };

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
              Licensing
            </p>
            <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-foreground">
              English Language Licensing
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              English will be available under a dual-licensing model, providing
              flexibility for both open-source and commercial use. We're
              committed to creating a sustainable ecosystem that supports
              both community collaboration and proprietary development.
            </p>
            <div className="mt-8">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                    Quick Summary
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-display">License Overview</DialogTitle>
                    <DialogDescription>
                      The essential information about English licensing.
                    </DialogDescription>
                  </DialogHeader>
                  <ul className="space-y-3 py-2">
                    {licenseStatus.map((s) => (
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

        {/* License Banner */}
        <section className="max-w-7xl mx-auto px-6 md:px-10">
          <LicenseBanner />
        </section>

        {/* License Types */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-16">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Available Options
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              License Types Overview
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              English offers different licensing options to accommodate various
              use cases, from open-source projects to commercial products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {licenseTypes.map((license, index) => (
              <LicenseFeatureCard key={index} {...license} />
            ))}
          </div>
        </section>

        {/* License Comparison */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Compare Options
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              License Feature Comparison
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              See how the different license types compare in terms of features
              and permissions.
            </p>
          </div>
          <LicenseComparisonTable />
        </section>

        {/* Status Tracker */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Current Status
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Licensing Progress
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Here's where we stand with the licensing decisions and documentation.
              Everything is transparent, and we'll keep the community updated.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {licenseStatus.map((s, i) => (
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

        {/* FAQ Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-wide text-primary mb-4">
              Common Questions
            </p>
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Got questions about licensing? We've compiled answers to the most
              common questions we receive.
            </p>
          </div>
          <FAQSection />
        </section>

        {/* Philosophy Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="rounded-lg border border-border bg-secondary/50 p-8 md:p-12">
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wide text-primary mb-4">
                Our Approach
              </p>
              <h2 className="font-display font-semibold text-2xl md:text-3xl tracking-tight text-foreground mb-4">
                Licensing Philosophy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our dual-licensing approach reflects our commitment to both the
                open-source community and sustainable development. We believe
                that a healthy ecosystem requires support from both individual
                contributors and commercial users.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The open-source license ensures that English remains accessible
                to everyone and fosters a collaborative environment where
                improvements benefit the entire community. The commercial
                license provides a path for businesses to use English while
                supporting its continued development and maintenance.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We're dedicated to finding the right balance that encourages
                adoption, supports contributors, and ensures the long-term
                success of the English language.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
          <div className="rounded-lg border border-border bg-secondary/50 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium tracking-wide text-primary mb-2">
                Need Clarification?
              </p>
              <p className="text-foreground font-medium max-w-xl">
                Have specific questions about licensing for your use case? Our
                licensing team is here to help. Contact us for personalized
                information and guidance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:licensing@english-lang.org"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors whitespace-nowrap"
              >
                <Mail className="w-4 h-4" />
                licensing@english-lang.org
              </a>
              <a
                href="mailto:legal@english-lang.org"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-foreground text-sm font-medium hover:bg-secondary/50 transition-colors whitespace-nowrap"
              >
                <Shield className="w-4 h-4" />
                Legal Inquiries
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
