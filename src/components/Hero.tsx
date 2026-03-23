"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Terminal line definitions
// ---------------------------------------------------------------------------

interface TerminalLine {
  text: string;
  color: string;
  bold?: boolean;
  pauseAfter?: number; // ms pause after this line finishes typing
}

const TERMINAL_LINES: TerminalLine[] = [
  {
    text: "$ truststrike scan https://shop.example.com",
    color: "text-trust-green",
    pauseAfter: 700,
  },
  { text: "", color: "", pauseAfter: 300 },
  {
    text: "[RECON] Mapping attack surface...",
    color: "text-verify-blue",
    pauseAfter: 600,
  },
  {
    text: "[RECON] Found: 12 endpoints, Express/Node.js, JWT auth",
    color: "text-verify-blue",
    pauseAfter: 400,
  },
  {
    text: "[RECON] Interesting: /api/user/{id}/orders \u2014 sequential IDs",
    color: "text-verify-blue",
    pauseAfter: 500,
  },
  { text: "", color: "", pauseAfter: 400 },
  {
    text: "[WEB AGENT] Hypothesis: IDOR on user orders endpoint",
    color: "text-highlight-purple",
    pauseAfter: 500,
  },
  {
    text: "[WEB AGENT] Creating test accounts...",
    color: "text-highlight-purple",
    pauseAfter: 600,
  },
  {
    text: "[WEB AGENT] Testing cross-account access...",
    color: "text-highlight-purple",
    pauseAfter: 700,
  },
  {
    text: "[WEB AGENT] \u26a0 User B accessed User A orders \u2014 IDOR confirmed",
    color: "text-vuln-red",
    pauseAfter: 600,
  },
  { text: "", color: "", pauseAfter: 400 },
  {
    text: "[VERIFY] Stage 1: Static \u2713 (pattern: sequential ID, no auth check)",
    color: "text-trust-green",
    pauseAfter: 400,
  },
  {
    text: "[VERIFY] Stage 2: Dynamic \u2713 (exploit reproduced in sandbox)",
    color: "text-trust-green",
    pauseAfter: 400,
  },
  {
    text: "[VERIFY] Stage 3: Adversarial \u2713 (confidence: 0.96)",
    color: "text-trust-green",
    pauseAfter: 500,
  },
  { text: "", color: "", pauseAfter: 400 },
  {
    text: "[FINDING] CRITICAL: IDOR on /api/user/{id}/orders",
    color: "text-vuln-red",
    bold: true,
    pauseAfter: 500,
  },
  {
    text: '[PROOF] curl -H "Authorization: Bearer <userB>" .../user/1547/orders',
    color: "text-text-secondary",
    pauseAfter: 400,
  },
  {
    text: "[PROOF] Response: 200 OK \u2014 User A PII exposed",
    color: "text-text-secondary",
    pauseAfter: 3000,
  },
];

// ---------------------------------------------------------------------------
// Typewriter hook
// ---------------------------------------------------------------------------

function useTypewriter(lines: TerminalLine[]) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<
    { text: string; color: string; bold?: boolean }[]
  >([]);
  const [isTyping, setIsTyping] = useState(true);

  const reset = useCallback(() => {
    setLineIndex(0);
    setCharIndex(0);
    setDisplayedLines([]);
    setIsTyping(true);
  }, []);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      // All lines done -- wait then loop
      const timeout = setTimeout(reset, 3000);
      return () => clearTimeout(timeout);
    }

    const currentLine = lines[lineIndex];

    // Empty line -- just push immediately
    if (currentLine.text === "") {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [
          ...prev,
          { text: "", color: "", bold: false },
        ]);
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, currentLine.pauseAfter ?? 300);
      return () => clearTimeout(timeout);
    }

    // Still typing characters
    if (charIndex < currentLine.text.length) {
      // Vary speed slightly for realism
      const baseSpeed = 35;
      const jitter = Math.random() * 45; // 35-80ms per char
      const timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, baseSpeed + jitter);
      return () => clearTimeout(timeout);
    }

    // Line finished typing -- pause then move to next
    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => [
        ...prev,
        {
          text: currentLine.text,
          color: currentLine.color,
          bold: currentLine.bold,
        },
      ]);
      setLineIndex((prev) => prev + 1);
      setCharIndex(0);
    }, currentLine.pauseAfter ?? 500);
    return () => clearTimeout(timeout);
  }, [lineIndex, charIndex, lines, reset]);

  const currentLine =
    lineIndex < lines.length ? lines[lineIndex] : null;
  const currentPartial =
    currentLine && currentLine.text !== ""
      ? currentLine.text.slice(0, charIndex)
      : null;

  return { displayedLines, currentPartial, currentLine, isTyping };
}

// ---------------------------------------------------------------------------
// Terminal component
// ---------------------------------------------------------------------------

function AnimatedTerminal() {
  const { displayedLines, currentPartial, currentLine } =
    useTypewriter(TERMINAL_LINES);

  return (
    <div className="relative group">
      {/* Glow effect behind terminal */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-40 blur-xl transition-opacity duration-700 group-hover:opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.12) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative rounded-xl border border-border-subtle overflow-hidden"
        style={{
          boxShadow:
            "0 0 30px rgba(0,255,136,0.06), 0 25px 50px rgba(0,0,0,0.5)",
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
            truststrike &mdash; scan
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-4 sm:p-5 font-mono text-[13px] sm:text-sm leading-relaxed h-[380px] sm:h-[420px] overflow-hidden">
          <div className="space-y-0">
            {displayedLines.map((line, i) => {
              if (line.text === "") {
                return <div key={i} className="h-4" />;
              }
              return (
                <div
                  key={i}
                  className={`${line.color} ${line.bold ? "font-bold" : ""} whitespace-pre-wrap break-all`}
                >
                  {line.text}
                </div>
              );
            })}

            {/* Currently typing line */}
            {currentPartial !== null && currentLine && (
              <div
                className={`${currentLine.color} ${currentLine.bold ? "font-bold" : ""} whitespace-pre-wrap break-all`}
              >
                {currentPartial}
                <span className="inline-block w-[8px] h-[16px] ml-[1px] align-middle bg-trust-green animate-pulse" />
              </div>
            )}

            {/* Blinking cursor when between lines and text is empty */}
            {currentPartial === null && currentLine?.text === "" && (
              <div>
                <span className="inline-block w-[8px] h-[16px] bg-trust-green animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero section
// ---------------------------------------------------------------------------

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient overlay top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,255,136,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Radial gradient overlay bottom — fades into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #0a0a0f 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-trust-green/20 bg-trust-green/5 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-trust-green animate-pulse" />
              <span className="text-xs font-medium text-trust-green tracking-wide uppercase">
                AI-Powered Pentesting
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-bold leading-[1.08] tracking-tight text-text-primary">
              Don&apos;t Trust Your{" "}
              <br className="hidden sm:block" />
              Security.{" "}
              <span className="relative">
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #00ff88 0%, #00cc6a 50%, #3b82f6 100%)",
                  }}
                >
                  Prove It.
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 text-lg sm:text-xl text-text-secondary leading-relaxed max-w-xl"
            >
              TrustStrike deploys autonomous AI agents that attack your systems
              like real hackers&nbsp;&mdash; then shows you exactly how, step by
              step, with proof you can verify yourself.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              {/* Primary CTA */}
              <a
                href="#early-access"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-semibold text-bg-primary bg-trust-green transition-all duration-300 hover:bg-trust-green-dim hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  boxShadow:
                    "0 0 20px rgba(0,255,136,0.25), 0 0 60px rgba(0,255,136,0.1)",
                }}
              >
                <span className="relative z-10">Get Early Access</span>
                {/* Glow intensifies on hover */}
                <span
                  className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "0 0 30px rgba(0,255,136,0.4), 0 0 80px rgba(0,255,136,0.15)",
                  }}
                />
              </a>

              {/* Secondary CTA */}
              <a
                href="#glass-box"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-semibold text-text-primary border border-border-accent bg-transparent transition-all duration-300 hover:border-trust-green/40 hover:bg-trust-green/5 hover:scale-[1.02] active:scale-[0.98]"
              >
                See How It Works
                <svg
                  className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-[600px] mx-auto lg:mx-0"
          >
            <AnimatedTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
