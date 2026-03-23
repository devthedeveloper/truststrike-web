"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TierCard {
  tier: string;
  badge: string;
  badgeColor: string;
  borderColor: string;
  accentColor: string;
  glowColor: string;
  headline: string;
  description: string;
  features: string[];
  visual: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Visuals per tier                                                    */
/* ------------------------------------------------------------------ */

function LocalVisual() {
  return (
    <div className="relative flex items-center justify-center py-8">
      {/* Shield glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-28 w-28 rounded-full bg-trust-green/5 blur-2xl" />
      </div>

      {/* Laptop with shield */}
      <div className="relative flex flex-col items-center gap-3">
        {/* Shield icon */}
        <svg
          width="48"
          height="56"
          viewBox="0 0 48 56"
          fill="none"
          className="relative z-10"
        >
          <path
            d="M24 2L4 12V26C4 40.36 12.64 49.72 24 54C35.36 49.72 44 40.36 44 26V12L24 2Z"
            stroke="#00ff88"
            strokeWidth="2"
            fill="rgba(0,255,136,0.06)"
          />
          <path
            d="M20 28L24 32L32 22"
            stroke="#00ff88"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Laptop icon */}
        <svg
          width="64"
          height="40"
          viewBox="0 0 64 40"
          fill="none"
          className="relative z-10"
        >
          {/* Screen */}
          <rect
            x="10"
            y="2"
            width="44"
            height="28"
            rx="3"
            stroke="#00ff88"
            strokeWidth="1.5"
            fill="rgba(0,255,136,0.03)"
          />
          {/* Base */}
          <path
            d="M4 34H60C60 37 57 38 54 38H10C7 38 4 37 4 34Z"
            stroke="#00ff88"
            strokeWidth="1.5"
            fill="none"
          />
          <line x1="4" y1="34" x2="60" y2="34" stroke="#00ff88" strokeWidth="1.5" />
          {/* Lock icon on screen */}
          <rect x="28" y="10" width="8" height="7" rx="1" stroke="#00ff88" strokeWidth="1" fill="rgba(0,255,136,0.1)" />
          <path d="M30 10V8C30 6 32 4 34 6V10" stroke="#00ff88" strokeWidth="1" fill="none" />
        </svg>

        {/* "No outgoing" indicator — crossed-out arrows */}
        <div className="mt-1 flex items-center gap-2 text-xs font-mono text-trust-green/60">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M8 13L4 9M8 13L12 9" stroke="#00ff88" strokeWidth="1.2" opacity="0.4" />
            <line x1="2" y1="14" x2="14" y2="2" stroke="#ff3366" strokeWidth="1.5" />
          </svg>
          <span>0 network calls</span>
        </div>
      </div>
    </div>
  );
}

function HybridVisual() {
  return (
    <div className="py-6">
      <div className="flex flex-col gap-3">
        {/* Before label */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-vuln-red/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-vuln-red">
            Before
          </span>
          <span className="text-xs text-text-muted">Your code</span>
        </div>
        <div className="overflow-x-auto rounded-lg border border-vuln-red/20 bg-bg-primary/80 px-3 py-2.5">
          <code className="block whitespace-nowrap font-mono text-xs leading-relaxed text-text-secondary">
            <span className="text-highlight-purple">func</span>{" "}
            <span className="text-verify-blue">processPayment</span>
            <span className="text-text-muted">(</span>
            <span className="text-trust-green">cardNum</span>{" "}
            <span className="text-text-muted">string,</span>{" "}
            <span className="text-trust-green">amount</span>{" "}
            <span className="text-text-muted">float64)</span>{" "}
            <span className="text-vuln-red">error</span>{" "}
            <span className="text-text-muted">{"{"}</span>
          </code>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path d="M10 2V18M10 18L5 13M10 18L15 13" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* After label */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-trust-green/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-trust-green">
            After
          </span>
          <span className="text-xs text-text-muted">What reaches the cloud</span>
        </div>
        <div className="overflow-x-auto rounded-lg border border-trust-green/20 bg-bg-primary/80 px-3 py-2.5">
          <code className="block whitespace-nowrap font-mono text-xs leading-relaxed text-text-secondary">
            <span className="text-highlight-purple">func</span>{" "}
            <span className="text-verify-blue">FUNC_1</span>
            <span className="text-text-muted">(</span>
            <span className="text-trust-green">VAR_1</span>{" "}
            <span className="text-text-muted">string,</span>{" "}
            <span className="text-trust-green">VAR_2</span>{" "}
            <span className="text-text-muted">float64)</span>{" "}
            <span className="text-vuln-red">error</span>{" "}
            <span className="text-text-muted">{"{"}</span>
          </code>
        </div>
      </div>
    </div>
  );
}

function CloudVisual() {
  return (
    <div className="relative flex items-center justify-center py-8">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-28 w-28 rounded-full bg-highlight-purple/5 blur-2xl" />
      </div>

      <div className="relative flex flex-col items-center gap-4">
        {/* Cloud with lock */}
        <svg width="72" height="52" viewBox="0 0 72 52" fill="none">
          <path
            d="M58 28C62.42 28 66 24.42 66 20C66 15.58 62.42 12 58 12C57.74 12 57.48 12.02 57.22 12.04C55.18 6.42 49.78 2 43 2C35.16 2 28.72 7.72 27.4 15.14C27 15.08 26.52 15 26 15C20.48 15 16 19.48 16 25C16 25.84 16.1 26.64 16.28 27.42C11.58 28.8 8 33.16 8 38.34C8 44.58 13.12 49.66 19.36 49.66H55.64C61.88 49.66 67 44.58 67 38.34C67 33.58 64 29.52 59.76 28.04"
            stroke="#8b5cf6"
            strokeWidth="2"
            fill="rgba(139,92,246,0.04)"
          />
          {/* Lock */}
          <rect x="30" y="27" width="12" height="10" rx="2" stroke="#8b5cf6" strokeWidth="1.5" fill="rgba(139,92,246,0.1)" />
          <path d="M33 27V24C33 21.24 35 19 37 21V27" stroke="#8b5cf6" strokeWidth="1.5" fill="none" />
          <circle cx="36" cy="32" r="1.5" fill="#8b5cf6" />
        </svg>

        {/* SOC2 badge */}
        <div className="flex items-center gap-1.5 rounded-full border border-highlight-purple/30 bg-highlight-purple/10 px-3 py-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1L1.5 3.5V6C1.5 9 3.5 11 6 12C8.5 11 10.5 9 10.5 6V3.5L6 1Z" stroke="#8b5cf6" strokeWidth="1" fill="rgba(139,92,246,0.2)" />
            <path d="M4.5 6.5L5.5 7.5L7.5 5" stroke="#8b5cf6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[10px] font-semibold tracking-wider text-highlight-purple">
            SOC2 TYPE II
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tier card data                                                     */
/* ------------------------------------------------------------------ */

const tiers: TierCard[] = [
  {
    tier: "LOCAL",
    badge: "Maximum Privacy",
    badgeColor: "bg-trust-green/10 text-trust-green border-trust-green/20",
    borderColor: "border-trust-green/20",
    accentColor: "text-trust-green",
    glowColor: "from-trust-green/20 to-transparent",
    headline: "Nothing leaves your machine",
    description:
      "Air-gapped capable. Verify with Wireshark \u2014 zero network calls.",
    features: ["Local models", "No internet required", "Full CLI"],
    visual: <LocalVisual />,
  },
  {
    tier: "HYBRID",
    badge: "Balanced",
    badgeColor: "bg-verify-blue/10 text-verify-blue border-verify-blue/20",
    borderColor: "border-verify-blue/20",
    accentColor: "text-verify-blue",
    glowColor: "from-verify-blue/20 to-transparent",
    headline: "Code stays local",
    description: "Only sanitized queries reach the cloud.",
    features: ["Local analysis", "Cloud AI models", "Code never leaves"],
    visual: <HybridVisual />,
  },
  {
    tier: "CLOUD",
    badge: "Fully Managed",
    badgeColor:
      "bg-highlight-purple/10 text-highlight-purple border-highlight-purple/20",
    borderColor: "border-highlight-purple/20",
    accentColor: "text-highlight-purple",
    glowColor: "from-highlight-purple/20 to-transparent",
    headline: "Zero retention",
    description:
      "Encrypted in transit and at rest. SOC2 Type II compliant.",
    features: [
      "Full platform",
      "Zero retention policy",
      "SOC2 compliant",
      "Encrypted",
    ],
    visual: <CloudVisual />,
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

const headlineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Privacy() {
  return (
    <section
      id="privacy"
      className="relative overflow-hidden bg-bg-primary px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      {/* Background noise */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.03)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.p
            className="mb-3 font-mono text-sm tracking-widest text-trust-green uppercase"
            variants={headlineVariants}
          >
            Privacy First
          </motion.p>
          <motion.h2
            className="mb-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
            variants={headlineVariants}
          >
            Your Code, Your Rules
          </motion.h2>
          <motion.p
            className="text-lg leading-relaxed text-text-secondary"
            variants={headlineVariants}
          >
            We don&apos;t ask you to trust us. We ask you to verify us.
          </motion.p>
        </motion.div>

        {/* Tier cards */}
        <motion.div
          className="grid gap-6 md:grid-cols-3 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.tier}
              className="group relative"
              variants={cardVariants}
            >
              {/* Gradient border wrapper */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  backgroundImage: `linear-gradient(to bottom, var(--color-${tier.tier === "LOCAL" ? "trust-green" : tier.tier === "HYBRID" ? "verify-blue" : "highlight-purple"}) / 0.3, transparent)`,
                }}
              />

              {/* Card body */}
              <div className="relative flex h-full flex-col rounded-2xl border border-border-subtle bg-bg-card p-6 transition-colors duration-300 hover:bg-bg-card-hover lg:p-8">
                {/* Tier label + badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold tracking-[0.2em] ${tier.accentColor}`}
                  >
                    {tier.tier}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${tier.badgeColor}`}
                  >
                    {tier.badge}
                  </span>
                </div>

                {/* Headline + description */}
                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  {tier.headline}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {tier.description}
                </p>

                {/* Visual */}
                <div className="my-2">{tier.visual}</div>

                {/* Feature list */}
                <ul className="mt-auto flex flex-col gap-2 border-t border-border-subtle pt-5">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-text-secondary"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className={`shrink-0 ${tier.accentColor}`}
                      >
                        <path
                          d="M3 7.5L5.5 10L11 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
