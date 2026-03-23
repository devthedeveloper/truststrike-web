"use client";

import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Stage {
  number: number;
  title: string;
  accent: string;
  accentRgb: string;
  tagline: string;
  details: string;
  icon: React.ReactNode;
  visual: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const stages: Stage[] = [
  {
    number: 1,
    title: "Static Analysis",
    accent: "verify-blue",
    accentRgb: "59, 130, 246",
    tagline: "Pattern matching, AST analysis, CVE cross-reference",
    details:
      "Scans code patterns against known vulnerability signatures. Cross-references with CVE databases. Analyzes abstract syntax trees for dangerous patterns.",
    icon: <StaticAnalysisIcon />,
    visual: <StaticAnalysisVisual />,
  },
  {
    number: 2,
    title: "Dynamic Sandbox",
    accent: "highlight-purple",
    accentRgb: "139, 92, 246",
    tagline: "Actual exploitation in isolated gVisor container",
    details:
      "Every potential finding is exploited in an isolated sandbox. If the exploit doesn\u2019t work, the finding is dropped. No theoretical vulnerabilities \u2014 only proven ones.",
    icon: <DynamicSandboxIcon />,
    visual: <DynamicSandboxVisual />,
  },
  {
    number: 3,
    title: "Adversarial Review",
    accent: "trust-green",
    accentRgb: "0, 255, 136",
    tagline: "Second AI challenges the finding",
    details:
      "An independent AI agent attempts to disprove the finding. It looks for false positive indicators, environmental dependencies, and edge cases. Only findings that survive this challenge are reported.",
    icon: <AdversarialReviewIcon />,
    visual: <AdversarialReviewVisual />,
  },
];

// ---------------------------------------------------------------------------
// Icons (inline SVG)
// ---------------------------------------------------------------------------

function StaticAnalysisIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 18l6 6" />
      <circle cx="11" cy="11" r="8" />
      <path d="M8 8l2 2m0-2l-2 2" />
      <path d="M12 8l2 2m0-2l-2 2" />
    </svg>
  );
}

function DynamicSandboxIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AdversarialReviewIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2l-8 4v6c0 5.25 3.4 10.15 8 11.25 4.6-1.1 8-6 8-11.25V6l-8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Mini visuals inside each card
// ---------------------------------------------------------------------------

function StaticAnalysisVisual() {
  return (
    <div className="mt-4 rounded-lg bg-bg-primary/60 border border-border-subtle p-3 font-mono text-xs leading-relaxed overflow-hidden">
      <div className="text-text-muted select-none mb-1">scan.rs:42</div>
      <div>
        <span className="text-text-muted">let&nbsp;</span>
        <span className="text-verify-blue">query</span>
        <span className="text-text-muted">&nbsp;=&nbsp;</span>
        <span className="text-vuln-red">format!</span>
        <span className="text-text-secondary">
          (&quot;SELECT * WHERE id=
        </span>
        <span className="text-vuln-red font-semibold">{`{input}`}</span>
        <span className="text-text-secondary">&quot;);</span>
      </div>
      <div className="mt-1.5 flex items-center gap-1.5 text-vuln-red">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-vuln-red animate-pulse" />
        <span className="text-[10px] uppercase tracking-wider font-semibold">
          SQL Injection &mdash; CVE-2024-3271
        </span>
      </div>
    </div>
  );
}

function DynamicSandboxVisual() {
  return (
    <div className="mt-4 rounded-lg bg-bg-primary/60 border border-border-subtle p-3 font-mono text-xs leading-relaxed overflow-hidden">
      <div className="text-text-muted select-none mb-1">
        gVisor sandbox
      </div>
      <div className="text-highlight-purple">
        $ exploit --target sql_inject
      </div>
      <div className="text-text-secondary mt-0.5">
        [*] Sending payload&hellip;
      </div>
      <div className="text-text-secondary">[*] Response: 200 OK</div>
      <div className="mt-1.5 flex items-center gap-1.5 text-trust-green">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-trust-green animate-pulse" />
        <span className="text-[10px] uppercase tracking-wider font-semibold">
          Exploit confirmed
        </span>
      </div>
    </div>
  );
}

function AdversarialReviewVisual() {
  return (
    <div className="mt-4 rounded-lg bg-bg-primary/60 border border-border-subtle p-3 text-xs leading-relaxed overflow-hidden space-y-2">
      <div className="flex items-start gap-2">
        <span className="shrink-0 mt-0.5 inline-block w-4 h-4 rounded-full bg-vuln-red/20 text-vuln-red text-[9px] font-bold flex items-center justify-center">
          A
        </span>
        <p className="text-text-secondary">
          &ldquo;Input is sanitized by middleware at line 38.&rdquo;
        </p>
      </div>
      <div className="flex items-start gap-2">
        <span className="shrink-0 mt-0.5 inline-block w-4 h-4 rounded-full bg-trust-green/20 text-trust-green text-[9px] font-bold flex items-center justify-center">
          B
        </span>
        <p className="text-text-secondary">
          &ldquo;Middleware bypassed via multipart encoding. Finding holds.&rdquo;
        </p>
      </div>
      <div className="mt-1.5 flex items-center gap-1.5 text-trust-green">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-trust-green animate-pulse" />
        <span className="text-[10px] uppercase tracking-wider font-semibold font-mono">
          Verdict: confirmed &mdash; 0.98 confidence
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Connector line between cards (desktop only)
// ---------------------------------------------------------------------------

function Connector({ accentRgb }: { accentRgb: string }) {
  return (
    <div
      className="hidden lg:flex items-center justify-center self-center -mx-4 w-12 shrink-0"
      aria-hidden="true"
    >
      <div
        className="h-0.5 w-full rounded-full"
        style={{
          background: `linear-gradient(90deg, rgba(${accentRgb}, 0.6), rgba(${accentRgb}, 0.1))`,
        }}
      />
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        className="shrink-0 -ml-0.5"
        style={{ color: `rgba(${accentRgb}, 0.6)` }}
      >
        <polygon points="0,0 10,5 0,10" fill="currentColor" />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stage Card
// ---------------------------------------------------------------------------

interface StageCardProps {
  stage: Stage;
  index: number;
}

function StageCard({ stage, index }: StageCardProps) {
  const borderGradient = `linear-gradient(135deg, rgba(${stage.accentRgb}, 0.5), rgba(${stage.accentRgb}, 0.05) 60%, rgba(${stage.accentRgb}, 0.15))`;
  const glowShadow = `0 0 40px rgba(${stage.accentRgb}, 0.06)`;
  const hoverGlowShadow = `0 0 60px rgba(${stage.accentRgb}, 0.12)`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="group relative flex-1 min-w-0"
    >
      {/* Gradient border wrapper */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none transition-shadow duration-500"
        style={{
          background: borderGradient,
          boxShadow: glowShadow,
        }}
      />
      {/* Hover glow overlay */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: hoverGlowShadow }}
      />

      <div className="relative rounded-2xl bg-bg-card p-6 sm:p-8 h-full flex flex-col transition-colors duration-300 group-hover:bg-bg-card-hover">
        {/* Number badge */}
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold font-mono mb-5"
          style={{
            background: `rgba(${stage.accentRgb}, 0.1)`,
            color: `rgb(${stage.accentRgb})`,
            border: `1px solid rgba(${stage.accentRgb}, 0.25)`,
          }}
        >
          {stage.number}
        </div>

        {/* Icon + title */}
        <div className="flex items-center gap-3 mb-3">
          <span style={{ color: `rgb(${stage.accentRgb})` }}>
            {stage.icon}
          </span>
          <h3 className="text-lg sm:text-xl font-semibold text-text-primary">
            {stage.title}
          </h3>
        </div>

        {/* Tagline */}
        <p
          className="text-sm font-medium mb-3"
          style={{ color: `rgb(${stage.accentRgb})` }}
        >
          {stage.tagline}
        </p>

        {/* Details */}
        <p className="text-sm leading-relaxed text-text-secondary mb-auto">
          {stage.details}
        </p>

        {/* Visual */}
        {stage.visual}
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Confidence Formula
// ---------------------------------------------------------------------------

function ConfidenceFormula() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      className="mt-16 sm:mt-20 flex flex-col items-center gap-4"
    >
      <p className="text-sm text-text-muted uppercase tracking-wider font-medium">
        Confidence Scoring
      </p>

      <div className="relative">
        {/* Glow behind the formula */}
        <div
          className="absolute inset-0 rounded-2xl blur-2xl opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0,255,136,0.15), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative rounded-2xl border border-border-subtle bg-bg-card/80 backdrop-blur-sm px-6 py-5 sm:px-10 sm:py-6 flex flex-col items-center gap-3">
          {/* Formula */}
          <p className="font-mono text-sm sm:text-base text-text-secondary tracking-wide text-center">
            <span className="text-text-primary font-semibold">confidence</span>
            <span className="text-text-muted mx-2">=</span>
            <span className="text-verify-blue">
              P<sub>(static)</sub>
            </span>
            <span className="text-text-muted mx-1.5">&times;</span>
            <span className="text-highlight-purple">
              P<sub>(dynamic)</sub>
            </span>
            <span className="text-text-muted mx-1.5">&times;</span>
            <span className="text-trust-green">
              P<sub>(adversarial)</sub>
            </span>
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-border-subtle" aria-hidden="true" />

          {/* Example */}
          <p className="font-mono text-sm sm:text-base tracking-wide text-center">
            <span className="text-verify-blue">0.92</span>
            <span className="text-text-muted mx-1.5">&times;</span>
            <span className="text-highlight-purple">1.0</span>
            <span className="text-text-muted mx-1.5">&times;</span>
            <span className="text-trust-green">0.98</span>
            <span className="text-text-muted mx-2">=</span>
            <span
              className="font-bold text-trust-green text-base sm:text-lg"
              style={{
                textShadow: "0 0 20px rgba(0, 255, 136, 0.5)",
              }}
            >
              0.96
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function Verification() {
  return (
    <section
      id="verification"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background glow accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,136,1) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Three-Stage Verification
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            If we can&rsquo;t prove it, we don&rsquo;t report it.
          </p>
        </motion.div>

        {/* Stage cards */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 items-stretch">
          {stages.map((stage, i) => (
            <div key={stage.number} className="contents">
              <StageCard stage={stage} index={i} />
              {i < stages.length - 1 && (
                <Connector accentRgb={stages[i + 1].accentRgb} />
              )}
            </div>
          ))}
        </div>

        {/* Confidence formula */}
        <ConfidenceFormula />
      </div>
    </section>
  );
}
