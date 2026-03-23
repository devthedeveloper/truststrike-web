"use client";

import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Syntax-highlighted Go code
// ---------------------------------------------------------------------------

interface CodeToken {
  text: string;
  className: string;
}

type CodeLine = CodeToken[];

const CODE_LINES: CodeLine[] = [
  [{ text: "// TrustStrike Core — Open Source", className: "text-text-muted italic" }],
  [
    { text: "package", className: "text-highlight-purple" },
    { text: " engine", className: "text-text-primary" },
  ],
  [],
  [
    { text: "type", className: "text-highlight-purple" },
    { text: " ScanEngine", className: "text-verify-blue" },
    { text: " struct", className: "text-highlight-purple" },
    { text: " {", className: "text-text-primary" },
  ],
  [
    { text: "    Agents    []", className: "text-text-primary" },
    { text: "Agent", className: "text-verify-blue" },
  ],
  [
    { text: "    Verifier  *", className: "text-text-primary" },
    { text: "ThreeStageVerifier", className: "text-verify-blue" },
  ],
  [
    { text: "    Reporter  *", className: "text-text-primary" },
    { text: "ReportGenerator", className: "text-verify-blue" },
  ],
  [{ text: "}", className: "text-text-primary" }],
  [],
  [
    { text: "func", className: "text-highlight-purple" },
    { text: " (e *", className: "text-text-primary" },
    { text: "ScanEngine", className: "text-verify-blue" },
    { text: ") ", className: "text-text-primary" },
    { text: "Run", className: "text-trust-green" },
    { text: "(target ", className: "text-text-primary" },
    { text: "Target", className: "text-verify-blue" },
    { text: ") (*", className: "text-text-primary" },
    { text: "Report", className: "text-verify-blue" },
    { text: ", ", className: "text-text-primary" },
    { text: "error", className: "text-verify-blue" },
    { text: ") {", className: "text-text-primary" },
  ],
  [{ text: "    // 1. Reconnaissance", className: "text-text-muted italic" }],
  [
    { text: "    surface := e.Agents[", className: "text-text-primary" },
    { text: "0", className: "text-trust-green" },
    { text: "].Recon(target)", className: "text-text-primary" },
  ],
  [],
  [{ text: "    // 2. Multi-agent attack", className: "text-text-muted italic" }],
  [{ text: "    findings := e.AttackConcurrently(surface)", className: "text-text-primary" }],
  [],
  [{ text: "    // 3. Three-stage verification", className: "text-text-muted italic" }],
  [{ text: "    verified := e.Verifier.Verify(findings)", className: "text-text-primary" }],
  [],
  [{ text: "    // 4. Generate proven report", className: "text-text-muted italic" }],
  [
    { text: "    return", className: "text-highlight-purple" },
    { text: " e.Reporter.Generate(verified)", className: "text-text-primary" },
  ],
  [{ text: "}", className: "text-text-primary" }],
];

// ---------------------------------------------------------------------------
// GitHub icon SVG
// ---------------------------------------------------------------------------

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Star icon SVG
// ---------------------------------------------------------------------------

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function OpenSource() {
  return (
    <section id="open-source" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,92,246,0.04) 0%, transparent 70%)",
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
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            Open Source{" "}
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
            }}>
              Core
            </span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Audit every line of code. Run it locally, prove to yourself it does what we say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: GitHub CTA */}
          <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start">
            {/* Star counter */}
            <div className="flex items-center gap-3 mb-8">
              <GitHubIcon className="w-8 h-8 text-text-primary" />
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-subtle bg-bg-card">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-text-primary">2.4k</span>
              </div>
            </div>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-md text-center lg:text-left mb-8">
              Our scanning engine is fully open source. No black boxes, no &ldquo;trust us&rdquo;
              &mdash; read the code, run it yourself, and verify every finding independently.
            </p>

            {/* Star on GitHub button */}
            <a
              href="https://github.com/truststrike"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-lg border border-border-accent bg-transparent font-semibold text-text-primary transition-all duration-300 hover:border-highlight-purple/50 hover:bg-highlight-purple/5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <GitHubIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              Star on GitHub
              <StarIcon className="w-4 h-4 text-text-muted transition-colors duration-300 group-hover:text-yellow-400" />
            </a>
          </motion.div>

          {/* Right: Code block */}
          <motion.div variants={itemVariants} className="relative group">
            {/* Glow behind code block */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-30 blur-xl transition-opacity duration-700 group-hover:opacity-50"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)",
              }}
            />

            <div
              className="relative rounded-xl border border-border-subtle overflow-hidden"
              style={{
                boxShadow:
                  "0 0 30px rgba(139,92,246,0.06), 0 25px 50px rgba(0,0,0,0.5)",
                background:
                  "linear-gradient(180deg, #141420 0%, #0e0e18 100%)",
              }}
            >
              {/* macOS window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-[#0c0c14]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
                <span className="ml-3 text-xs text-text-muted font-mono select-none">
                  engine/scan.go
                </span>
              </div>

              {/* Code body */}
              <div className="p-4 sm:p-5 font-mono text-[13px] sm:text-sm leading-relaxed overflow-x-auto">
                {CODE_LINES.map((line, i) => (
                  <div key={i} className={line.length === 0 ? "h-5" : "whitespace-pre"}>
                    {line.map((token, j) => (
                      <span key={j} className={token.className}>
                        {token.text}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
