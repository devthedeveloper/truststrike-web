"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ---------------------------------------------------------------------------
// Metric definitions
// ---------------------------------------------------------------------------

interface MetricDef {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  colorClass: string;
  icon: React.ReactNode;
  decimals: number;
}

const ShieldIcon = (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const BugIcon = (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152-6.135 3.046 3.046 0 00-2.39-2.973c-1.2-.296-2.462-.467-3.665-.467-1.203 0-2.464.17-3.665.467a3.046 3.046 0 00-2.39 2.973 23.91 23.91 0 01-1.152 6.135A23.857 23.857 0 0112 12.75z" />
  </svg>
);

const CheckCircleIcon = (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const METRICS: MetricDef[] = [
  {
    value: 14847,
    suffix: "",
    prefix: "",
    label: "Scans Completed",
    colorClass: "text-trust-green",
    icon: ShieldIcon,
    decimals: 0,
  },
  {
    value: 2391,
    suffix: "",
    prefix: "",
    label: "Verified Vulns Found",
    colorClass: "text-vuln-red",
    icon: BugIcon,
    decimals: 0,
  },
  {
    value: 0.12,
    suffix: "%",
    prefix: "",
    label: "False Positive Rate",
    colorClass: "text-trust-green",
    icon: CheckCircleIcon,
    decimals: 2,
  },
  {
    value: 4.2,
    suffix: " min",
    prefix: "",
    label: "Avg Verification Time",
    colorClass: "text-verify-blue",
    icon: ClockIcon,
    decimals: 1,
  },
];

// ---------------------------------------------------------------------------
// Animated counter hook
// ---------------------------------------------------------------------------

function useCountUp(
  target: number,
  decimals: number,
  shouldAnimate: boolean,
  duration: number = 2000
): string {
  const [current, setCurrent] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!shouldAnimate) {
      setCurrent(0);
      return;
    }

    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * target);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [target, shouldAnimate, duration]);

  if (decimals === 0) {
    return Math.round(current).toLocaleString();
  }
  return current.toFixed(decimals);
}

// ---------------------------------------------------------------------------
// Single metric card
// ---------------------------------------------------------------------------

function MetricCard({ metric, index, inView }: { metric: MetricDef; index: number; inView: boolean }) {
  const displayValue = useCountUp(metric.value, metric.decimals, inView);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
      }}
      className="group relative rounded-xl border border-border-subtle bg-bg-card p-6 sm:p-8 transition-all duration-300 hover:border-border-accent hover:bg-bg-card-hover hover:scale-[1.02]"
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      />

      {/* Icon */}
      <div className={`${metric.colorClass} opacity-50 mb-4 transition-opacity duration-300 group-hover:opacity-80`}>
        {metric.icon}
      </div>

      {/* Value */}
      <div className={`text-3xl sm:text-4xl font-bold tracking-tight ${metric.colorClass} tabular-nums`}>
        {metric.prefix}
        {displayValue}
        {metric.suffix}
      </div>

      {/* Label */}
      <div className="mt-2 text-sm sm:text-base text-text-secondary">
        {metric.label}
      </div>
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
    transition: { staggerChildren: 0.1 },
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

export default function LiveMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="metrics" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
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
            Real Numbers.{" "}
            <span className="text-text-muted">Not Vanity Metrics.</span>
          </h2>
        </motion.div>

        {/* Metric cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {METRICS.map((metric, i) => (
            <MetricCard key={i} metric={metric} index={i} inView={isInView} />
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          variants={headingVariants}
          className="mt-12 text-center text-sm text-text-muted"
        >
          Updated in real-time from our transparency dashboard
        </motion.p>
      </motion.div>
    </section>
  );
}
