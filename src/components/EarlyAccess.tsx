"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function EarlyAccess() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim() === "") return;
    setSubmitted(true);
  }

  return (
    <section
      id="early-access"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-trust-green/[0.03] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Headline */}
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Get Early Access
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Join security engineers who are tired of false positives.
          </p>

          {/* Form / success state */}
          <div className="mt-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-trust-green/20 bg-trust-green/5 px-6 py-8"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-trust-green/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-trust-green"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="mt-4 text-lg font-semibold text-text-primary">
                  Thanks! We&apos;ll be in touch.
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  Keep an eye on your inbox for early access details.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:flex-row sm:gap-3"
              >
                <label htmlFor="early-access-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="early-access-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 rounded-lg border border-border-subtle bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-trust-green/50 focus:ring-1 focus:ring-trust-green/30"
                />
                <button
                  type="submit"
                  className="group relative rounded-lg bg-trust-green px-6 py-3 text-sm font-semibold text-bg-primary transition-all duration-300 hover:bg-trust-green-dim hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  style={{
                    boxShadow:
                      "0 0 20px rgba(0,255,136,0.25), 0 0 60px rgba(0,255,136,0.1)",
                  }}
                >
                  Request Access
                </button>
              </motion.form>
            )}
          </div>

          {/* Disclaimer */}
          {!submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-4 text-xs text-text-muted"
            >
              No spam. No sharing. Just early access.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
