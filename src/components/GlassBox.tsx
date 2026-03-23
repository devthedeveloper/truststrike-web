"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeatureItem {
  title: string;
  icon: React.ReactNode;
}

interface FindingSection {
  id: string;
  label: string;
  content: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const features: FeatureItem[] = [
  {
    title: "The exact HTTP request that broke in",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
  },
  {
    title: "The exact response proving the vulnerability",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "A curl command to reproduce it yourself",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    title: "The AI\u2019s reasoning chain",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
        <line x1="9" y1="21" x2="15" y2="21" />
        <line x1="10" y1="24" x2="14" y2="24" />
      </svg>
    ),
  },
  {
    title: "Confidence score with the math behind it",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="3" y="12" width="4" height="9" rx="1" />
        <rect x="10" y="7" width="4" height="14" rx="1" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    ),
  },
];

const findingSections: FindingSection[] = [
  {
    id: "request",
    label: "HTTP Request",
    content: `GET /api/user/1547/orders HTTP/1.1
Host: shop.example.com
Authorization: Bearer eyJ...userB_token`,
  },
  {
    id: "response",
    label: "Response",
    content: `200 OK
{"orders": [{"id": 3847, "user_id": 1547, "item": "Premium Plan", "amount": "$299.00"}]}`,
  },
  {
    id: "reproduce",
    label: "Reproduce It",
    content: `curl -H "Authorization: Bearer <userB_token>" \\
  https://shop.example.com/api/user/1547/orders`,
  },
  {
    id: "reasoning",
    label: "AI Reasoning",
    content:
      "Sequential user IDs detected \u2192 No authorization middleware on route \u2192 Created test accounts A (id:1547) and B (id:1548) \u2192 Used B\u2019s token to access A\u2019s orders \u2192 Access granted without ownership check \u2192 IDOR confirmed",
  },
  {
    id: "confidence",
    label: "Confidence: 0.96",
    content:
      "Static analysis: 0.92 (pattern match) \u00d7 Dynamic verification: 1.0 (exploited) \u00d7 Adversarial review: 0.98 (confirmed) \u2192 Combined: 0.96",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-text-secondary"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

function FeatureCard({ item, index }: { item: FeatureItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-card p-4 transition-colors hover:border-border-accent hover:bg-bg-card-hover"
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-trust-green/10 text-trust-green">
        {item.icon}
      </span>
      <span className="text-sm leading-snug text-text-secondary group-hover:text-text-primary transition-colors">
        {item.title}
      </span>
    </motion.div>
  );
}

function ExpandableSection({ section }: { section: FindingSection }) {
  const [open, setOpen] = useState(false);

  const isCode = ["request", "response", "reproduce"].includes(section.id);

  return (
    <div className="border-t border-border-subtle first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left text-sm font-medium text-text-primary hover:bg-bg-card-hover transition-colors cursor-pointer"
        aria-expanded={open}
        aria-controls={`section-${section.id}`}
      >
        <span className="flex items-center gap-2">
          {section.id === "confidence" && (
            <span className="inline-block h-2 w-2 rounded-full bg-trust-green animate-pulse" />
          )}
          {section.label}
        </span>
        <ChevronIcon open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`section-${section.id}`}
            key={section.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4">
              {isCode ? (
                <pre className="overflow-x-auto rounded-lg border border-border-subtle bg-bg-primary p-4 font-mono text-xs leading-relaxed text-trust-green/90">
                  <code>{section.content}</code>
                </pre>
              ) : (
                <div className="rounded-lg border border-border-subtle bg-bg-primary p-4 text-xs leading-relaxed text-text-secondary">
                  {section.id === "reasoning"
                    ? section.content.split(" \u2192 ").map((step, i, arr) => (
                        <span key={i}>
                          <span className="text-text-primary">{step}</span>
                          {i < arr.length - 1 && (
                            <span className="mx-1 text-trust-green">{"\u2192"}</span>
                          )}
                        </span>
                      ))
                    : section.content.split(" \u00d7 ").map((part, i, arr) => {
                        const isLast = i === arr.length - 1;
                        if (isLast) {
                          const [beforeArrow, after] = part.split(" \u2192 ");
                          return (
                            <span key={i}>
                              <span className="text-text-primary">{beforeArrow}</span>
                              {after && (
                                <>
                                  <span className="mx-1 text-trust-green">{"\u2192"}</span>
                                  <span className="font-semibold text-trust-green">{after}</span>
                                </>
                              )}
                            </span>
                          );
                        }
                        return (
                          <span key={i}>
                            <span className="text-text-primary">{part}</span>
                            <span className="mx-1 text-highlight-purple">{"\u00d7"}</span>
                          </span>
                        );
                      })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function GlassBox() {
  return (
    <section
      id="glass-box"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background glow effect */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-trust-green/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Most Security Vendors Give You a{" "}
            <span className="text-text-muted">Black Box.</span>
            <br />
            We Give You a{" "}
            <span className="relative inline-block text-trust-green">
              Glass Box.
              <span
                className="absolute -inset-x-2 -inset-y-1 -z-10 rounded-lg bg-trust-green/10"
                aria-hidden="true"
              />
            </span>
          </h2>
        </motion.div>

        {/* "Every finding includes" label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 text-center text-sm font-semibold uppercase tracking-widest text-text-muted"
        >
          Every finding includes:
        </motion.p>

        {/* Feature cards grid */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, i) => (
            <FeatureCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Interactive finding demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-16 max-w-2xl"
        >
          {/* Label above card */}
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-text-muted">
            Interactive demo &mdash; click to expand
          </p>

          {/* Finding card */}
          <div className="overflow-hidden rounded-2xl border border-border-subtle bg-bg-card shadow-[0_0_60px_-20px_rgba(0,255,136,0.07)]">
            {/* Card header */}
            <div className="flex flex-col gap-2 border-b border-border-subtle px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-md bg-vuln-red/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-vuln-red ring-1 ring-inset ring-vuln-red/25">
                  Critical
                </span>
                <span className="text-sm font-semibold text-text-primary">
                  IDOR on{" "}
                  <code className="rounded bg-bg-primary px-1.5 py-0.5 font-mono text-xs text-trust-green">
                    /api/user/{"{id}"}/orders
                  </code>
                </span>
              </div>

              {/* Severity indicator dots */}
              <div className="flex items-center gap-1.5" aria-label="Severity: critical">
                {[...Array(4)].map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-vuln-red"
                  />
                ))}
                <span className="h-1.5 w-1.5 rounded-full bg-border-subtle" />
              </div>
            </div>

            {/* Expandable sections */}
            <div>
              {findingSections.map((section) => (
                <ExpandableSection key={section.id} section={section} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
