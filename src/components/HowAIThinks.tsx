"use client";

import { motion } from "framer-motion";

interface AgentCard {
  name: string;
  description: string;
  color: string;
  colorClass: string;
  borderGlow: string;
  icon: React.ReactNode;
}

const agents: AgentCard[] = [
  {
    name: "Recon Agent",
    description:
      "Maps your attack surface. Discovers endpoints, tech stack, authentication patterns, and entry points.",
    color: "#3b82f6",
    colorClass: "text-verify-blue",
    borderGlow:
      "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
        <path d="M11 8a3 3 0 0 0-3 3" />
      </svg>
    ),
  },
  {
    name: "Web Attack Agent",
    description:
      "Tests for OWASP Top 10, business logic flaws, authentication bypasses, and access control issues.",
    color: "#8b5cf6",
    colorClass: "text-highlight-purple",
    borderGlow:
      "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5Z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "API Attack Agent",
    description:
      "Probes API endpoints for injection, IDOR, rate limiting gaps, and data exposure.",
    color: "#8b5cf6",
    colorClass: "text-highlight-purple",
    borderGlow:
      "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
        <circle cx="8" cy="6" r="1.5" fill="currentColor" />
        <circle cx="16" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="18" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Network Agent",
    description:
      "Scans for misconfigurations, exposed services, TLS issues, and network-level vulnerabilities.",
    color: "#8b5cf6",
    colorClass: "text-highlight-purple",
    borderGlow:
      "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="6" height="6" rx="1" />
        <rect x="16" y="2" width="6" height="6" rx="1" />
        <rect x="9" y="16" width="6" height="6" rx="1" />
        <path d="M5 8v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />
        <path d="M12 12v4" />
      </svg>
    ),
  },
  {
    name: "Verification Engine",
    description:
      "3-stage verification ensures every finding is proven, not guessed.",
    color: "#00ff88",
    colorClass: "text-trust-green",
    borderGlow:
      "hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    name: "Report Generator",
    description:
      "Produces actionable reports with proof, reproduction steps, and remediation guidance.",
    color: "#8a8a9a",
    colorClass: "text-text-secondary",
    borderGlow:
      "hover:shadow-[0_0_30px_rgba(138,138,154,0.1)]",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h8" />
        <path d="M8 9h2" />
      </svg>
    ),
  },
];

const attackChainSteps = [
  "SSRF Discovery",
  "Internal Network Access",
  "Admin Panel Found",
  "Credential Extraction",
  "Full Breach",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const chainContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const chainStepVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const chainArrowVariants = {
  hidden: { opacity: 0, width: 0 },
  visible: {
    opacity: 1,
    width: "auto" as const,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

function FlowArrow({ color }: { color: string }) {
  return (
    <div className="hidden lg:flex items-center justify-center py-2 lg:py-0">
      <svg
        width="40"
        height="24"
        viewBox="0 0 40 24"
        fill="none"
        className="rotate-90 lg:rotate-0"
      >
        <path
          d="M2 12h32m0 0l-6-6m6 6l-6 6"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

function MobileFlowArrow({ color }: { color: string }) {
  return (
    <div className="flex lg:hidden items-center justify-center py-1">
      <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
        <path
          d="M12 2v24m0 0l-6-6m6 6l6-6"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

export default function HowAIThinks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.04)_0%,_transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
            Our AI Doesn&apos;t Scan.{" "}
            <span className="text-trust-green">It Thinks.</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Autonomous agents work together to find, verify, and prove
            vulnerabilities — just like an elite red team.
          </p>
        </motion.div>

        {/* Agent flow — top row: Recon, then 3 attack agents, then verification, then report */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center"
        >
          {/* Row 1: Recon Agent */}
          <motion.div variants={cardVariants} className="w-full max-w-sm">
            <AgentCardComponent agent={agents[0]} />
          </motion.div>

          <MobileFlowArrow color={agents[0].color} />
          <div className="hidden lg:block">
            <VerticalFlowArrow color={agents[0].color} />
          </div>

          {/* Row 2: Three attack agents side by side */}
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-4 lg:gap-6 w-full max-w-5xl">
            {agents.slice(1, 4).map((agent, i) => (
              <motion.div
                key={agent.name}
                variants={cardVariants}
                className="w-full max-w-sm lg:max-w-none lg:flex-1"
              >
                <AgentCardComponent agent={agent} />
                {i < 2 && <MobileFlowArrow color={agent.color} />}
              </motion.div>
            ))}
          </div>

          <MobileFlowArrow color="#00ff88" />
          <div className="hidden lg:block">
            <VerticalFlowArrow color="#00ff88" />
          </div>

          {/* Row 3: Verification Engine */}
          <motion.div variants={cardVariants} className="w-full max-w-sm">
            <AgentCardComponent agent={agents[4]} />
          </motion.div>

          <MobileFlowArrow color="#8a8a9a" />
          <div className="hidden lg:block">
            <VerticalFlowArrow color="#8a8a9a" />
          </div>

          {/* Row 4: Report Generator */}
          <motion.div variants={cardVariants} className="w-full max-w-sm">
            <AgentCardComponent agent={agents[5]} />
          </motion.div>
        </motion.div>

        {/* Attack Chain Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 md:mt-28"
        >
          <div className="text-center mb-10">
            <p className="text-sm font-mono uppercase tracking-widest text-text-muted mb-2">
              Example Attack Chain
            </p>
            <p className="text-text-secondary text-base max-w-lg mx-auto">
              Watch how our agents chain discoveries together to uncover
              critical vulnerabilities.
            </p>
          </div>

          {/* Chain */}
          <motion.div
            variants={chainContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col md:flex-row items-center justify-center gap-0 overflow-x-auto py-4 px-2"
          >
            {attackChainSteps.map((step, i) => (
              <div
                key={step}
                className="flex flex-col md:flex-row items-center shrink-0"
              >
                <motion.div
                  variants={chainStepVariants}
                  className="relative group"
                >
                  <div
                    className="absolute -inset-[1px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${getChainColor(i)}40, transparent 60%)`,
                    }}
                  />
                  <div className="relative px-4 py-3 rounded-lg bg-bg-card border border-border-subtle font-mono text-sm text-text-primary whitespace-nowrap transition-colors duration-200 group-hover:border-border-accent">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full mr-2"
                      style={{ backgroundColor: getChainColor(i) }}
                    />
                    {step}
                  </div>
                </motion.div>

                {i < attackChainSteps.length - 1 && (
                  <>
                    {/* Desktop arrow */}
                    <motion.div
                      variants={chainArrowVariants}
                      className="hidden md:flex items-center overflow-hidden mx-1"
                    >
                      <svg
                        width="36"
                        height="16"
                        viewBox="0 0 36 16"
                        fill="none"
                      >
                        <path
                          d="M2 8h28m0 0l-5-5m5 5l-5 5"
                          stroke={getChainColor(i + 1)}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity="0.5"
                        />
                      </svg>
                    </motion.div>
                    {/* Mobile arrow */}
                    <motion.div
                      variants={chainArrowVariants}
                      className="flex md:hidden items-center overflow-hidden my-1"
                    >
                      <svg
                        width="16"
                        height="28"
                        viewBox="0 0 16 28"
                        fill="none"
                      >
                        <path
                          d="M8 2v20m0 0l-5-5m5 5l5-5"
                          stroke={getChainColor(i + 1)}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity="0.4"
                        />
                      </svg>
                    </motion.div>
                  </>
                )}
              </div>
            ))}
          </motion.div>

          {/* Chain severity indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card border border-border-subtle">
              <span className="inline-block w-2 h-2 rounded-full bg-verify-blue" />
              <span className="text-xs font-mono text-text-muted">LOW</span>
              <span className="text-text-muted mx-1">→</span>
              <span className="inline-block w-2 h-2 rounded-full bg-highlight-purple" />
              <span className="text-xs font-mono text-text-muted">
                MEDIUM
              </span>
              <span className="text-text-muted mx-1">→</span>
              <span className="inline-block w-2 h-2 rounded-full bg-vuln-red" />
              <span className="text-xs font-mono text-text-muted">
                CRITICAL
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AgentCardComponent({ agent }: { agent: AgentCard }) {
  return (
    <div className={`relative group h-full ${agent.borderGlow}`}>
      {/* Gradient border */}
      <div
        className="absolute -inset-[1px] rounded-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${agent.color}30, transparent 50%, ${agent.color}10)`,
        }}
      />
      <div className="relative h-full rounded-xl bg-bg-card border border-border-subtle p-6 transition-all duration-300 group-hover:border-border-accent group-hover:bg-bg-card-hover">
        {/* Icon */}
        <div
          className={`${agent.colorClass} mb-4 transition-transform duration-300 group-hover:scale-110`}
        >
          {agent.icon}
        </div>
        {/* Name */}
        <h3
          className={`text-lg font-semibold mb-2 ${agent.colorClass} transition-colors duration-200`}
        >
          {agent.name}
        </h3>
        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed">
          {agent.description}
        </p>
      </div>
    </div>
  );
}

function VerticalFlowArrow({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center py-2">
      <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
        <path
          d="M12 2v28m0 0l-6-6m6 6l6-6"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

function getChainColor(index: number): string {
  const colors = [
    "#3b82f6", // verify-blue — discovery
    "#8b5cf6", // highlight-purple — escalation
    "#8b5cf6", // highlight-purple — deeper access
    "#ff3366", // vuln-red — critical
    "#ff3366", // vuln-red — full breach
  ];
  return colors[index] ?? "#8a8a9a";
}
