"use client";

import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PricingTier {
  name: string;
  price: string;
  priceSuffix?: string;
  priceLabel?: string;
  borderColor: string;
  features: string[];
  cta: string;
  ctaStyle: "outline" | "filled" | "outline-purple";
  featured?: boolean;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const tiers: PricingTier[] = [
  {
    name: "Community",
    price: "Free",
    priceLabel: "Open Source",
    borderColor: "border-border-subtle",
    features: [
      "Full local mode",
      "Local scanning",
      "CLI access",
      "Community support",
      "Open source core",
      "Self-hosted",
    ],
    cta: "Get Started",
    ctaStyle: "outline",
  },
  {
    name: "Pro",
    price: "$999",
    priceSuffix: "/mo",
    borderColor: "border-trust-green",
    features: [
      "Everything in Community",
      "Hybrid mode",
      "Cloud AI models",
      "Web dashboard",
      "CI/CD integration",
      "Priority support",
      "SARIF/JSON export",
    ],
    cta: "Start Free Trial",
    ctaStyle: "filled",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    borderColor: "border-highlight-purple",
    features: [
      "Everything in Pro",
      "Self-hosted deployment",
      "Air-gapped mode",
      "SOC2 compliance",
      "Custom SLA",
      "Dedicated support",
      "SSO/SAML",
    ],
    cta: "Contact Sales",
    ctaStyle: "outline-purple",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PricingCard({
  tier,
  index,
}: {
  tier: PricingTier;
  index: number;
}) {
  const isFeatured = tier.featured === true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className={`
        relative flex flex-col rounded-2xl border bg-bg-card p-6 sm:p-8
        transition-colors hover:bg-bg-card-hover
        ${tier.borderColor}
        ${isFeatured ? "lg:scale-105 lg:-my-4 z-10" : ""}
      `}
      style={
        isFeatured
          ? {
              boxShadow:
                "0 0 40px rgba(0,255,136,0.1), 0 0 80px rgba(0,255,136,0.05)",
            }
          : undefined
      }
    >
      {/* Most Popular badge */}
      {isFeatured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-trust-green px-4 py-1 text-xs font-bold uppercase tracking-wider text-bg-primary">
            Most Popular
          </span>
        </div>
      )}

      {/* Tier name */}
      <h3 className="text-lg font-semibold text-text-primary">{tier.name}</h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight text-text-primary">
          {tier.price}
        </span>
        {tier.priceSuffix && (
          <span className="text-base text-text-muted">{tier.priceSuffix}</span>
        )}
      </div>

      {/* Price label */}
      {tier.priceLabel && (
        <p className="mt-1 text-sm text-text-secondary">{tier.priceLabel}</p>
      )}

      {/* Divider */}
      <div className="my-6 h-px bg-border-subtle" />

      {/* Features */}
      <ul className="flex flex-1 flex-col gap-3" role="list">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <span
              className={
                isFeatured ? "text-trust-green" : "text-text-muted"
              }
            >
              <CheckIcon />
            </span>
            <span className="text-text-secondary">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-8">
        {tier.ctaStyle === "filled" ? (
          <a
            href="#early-access"
            className="group relative block w-full rounded-lg bg-trust-green px-6 py-3 text-center text-sm font-semibold text-bg-primary transition-all duration-300 hover:bg-trust-green-dim hover:scale-[1.02] active:scale-[0.98]"
            style={{
              boxShadow:
                "0 0 20px rgba(0,255,136,0.25), 0 0 60px rgba(0,255,136,0.1)",
            }}
          >
            {tier.cta}
          </a>
        ) : tier.ctaStyle === "outline-purple" ? (
          <a
            href="#early-access"
            className="block w-full rounded-lg border border-highlight-purple px-6 py-3 text-center text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-highlight-purple/10 hover:border-highlight-purple/60 hover:scale-[1.02] active:scale-[0.98]"
          >
            {tier.cta}
          </a>
        ) : (
          <a
            href="#early-access"
            className="block w-full rounded-lg border border-border-accent px-6 py-3 text-center text-sm font-semibold text-text-primary transition-all duration-300 hover:border-trust-green/40 hover:bg-trust-green/5 hover:scale-[1.02] active:scale-[0.98]"
          >
            {tier.cta}
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-trust-green/[0.02] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Security-conscious clients get the most private tier.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:items-center">
          {tiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
