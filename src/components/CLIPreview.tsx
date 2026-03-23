"use client";

import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Terminal line types and data
// ---------------------------------------------------------------------------

interface TermLine {
  text: string;
  className: string;
}

interface TerminalBlock {
  title: string;
  description: string;
  lines: TermLine[];
}

const TERMINAL_BLOCKS: TerminalBlock[] = [
  {
    title: "Scan a target",
    description:
      "Point TrustStrike at any URL. It maps the attack surface, exploits vulnerabilities, and verifies every finding automatically.",
    lines: [
      { text: "$ truststrike scan https://target.com", className: "text-trust-green" },
      { text: "[INFO] Starting autonomous pentest...", className: "text-text-secondary" },
      { text: "[RECON] Mapping attack surface...", className: "text-verify-blue" },
      { text: "[ATTACK] Running 4 agents concurrently...", className: "text-highlight-purple" },
      { text: "[VERIFY] 7 findings \u2192 5 verified (2 false positives eliminated)", className: "text-trust-green" },
      { text: "[REPORT] Report saved to ./truststrike-report.html", className: "text-trust-green" },
    ],
  },
  {
    title: "Pentest your codebase",
    description:
      "Hybrid mode keeps your code local while using AI to identify and verify vulnerabilities across static and dynamic analysis.",
    lines: [
      { text: "$ truststrike pentest --repo ./code --mode hybrid", className: "text-trust-green" },
      { text: "[INFO] Hybrid mode: code stays local, AI queries sanitized", className: "text-text-secondary" },
      { text: "[SAST] Analyzing source code...", className: "text-verify-blue" },
      { text: "[DAST] Spinning up test environment...", className: "text-highlight-purple" },
      { text: "[VERIFY] 12 findings \u2192 9 verified", className: "text-trust-green" },
      { text: "[REPORT] SARIF output: ./results.sarif", className: "text-trust-green" },
    ],
  },
  {
    title: "CI/CD integration",
    description:
      "Drop TrustStrike into your pipeline. Fail builds on high-severity findings, output SARIF for GitHub Security tab integration.",
    lines: [
      { text: "$ truststrike ci --fail-on high --format sarif", className: "text-trust-green" },
      { text: "[CI] Running in CI mode...", className: "text-text-secondary" },
      { text: "[SCAN] Testing against staging environment...", className: "text-verify-blue" },
      { text: "[RESULT] 0 HIGH findings \u2014 pipeline PASSED \u2713", className: "text-trust-green" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Single terminal block component
// ---------------------------------------------------------------------------

function TerminalWindow({ block, index }: { block: TerminalBlock; index: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.15,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
      }}
      className="relative group"
    >
      {/* Glow */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.1) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative rounded-xl border border-border-subtle overflow-hidden transition-colors duration-300 group-hover:border-border-accent"
        style={{
          boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
          background: "linear-gradient(180deg, #141420 0%, #0e0e18 100%)",
        }}
      >
        {/* macOS window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-[#0c0c14]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
          <span className="ml-3 text-xs text-text-muted font-mono select-none">
            {block.title}
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-4 sm:p-5 font-mono text-[13px] sm:text-sm leading-relaxed overflow-x-auto">
          {block.lines.map((line, i) => (
            <div key={i} className={`${line.className} whitespace-pre-wrap break-all`}>
              {line.text}
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm text-text-secondary leading-relaxed px-1">
        {block.description}
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section component
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function CLIPreview() {
  return (
    <section id="cli" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,255,136,0.03) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* Header */}
        <motion.div variants={headingVariants} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            Built for{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #00ff88 0%, #3b82f6 100%)",
              }}
            >
              Engineers
            </span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Powerful CLI that fits your workflow.
          </p>
        </motion.div>

        {/* Terminal blocks grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {TERMINAL_BLOCKS.map((block, i) => (
            <TerminalWindow key={i} block={block} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
