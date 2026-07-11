"use client";

import { motion, type Variants } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const line: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.15 * i, ease: EASE },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28"
    >
      {/* véu sutil p/ legibilidade — deixa a aurora global respirar */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,transparent_30%,color-mix(in_oklab,var(--color-void)_82%,transparent)_85%)]" />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10">
        {/* badge */}
        <motion.div
          variants={line}
          custom={0}
          initial="hidden"
          animate="show"
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-teal/40 blur-[2px]" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)]" />
          </span>
          <span className="label text-mist">
            Honestidade técnica · Estética de autoridade
          </span>
        </motion.div>

        {/* headline */}
        <h1 className="font-display text-[clamp(3rem,11vw,9.5rem)] font-semibold leading-[0.92] tracking-tight">
          <motion.span
            variants={line}
            custom={1}
            initial="hidden"
            animate="show"
            className="block text-white"
          >
            O designer dirige.
          </motion.span>
          <motion.span
            variants={line}
            custom={2}
            initial="hidden"
            animate="show"
            className="block"
          >
            <span className="text-aurora">A IA acelera.</span>
          </motion.span>
        </h1>

        {/* sub + CTA */}
        <motion.div
          variants={line}
          custom={3}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-xl text-lg leading-relaxed text-mist md:text-xl">
            Estúdio criativo que usa IA para acelerar produção{" "}
            <span className="text-white">sem perder o craft</span>. Toda peça
            passa pela mão do designer antes de ir ao ar — o Photoshop é a última
            camada, a assinatura humana.
          </p>

          <div className="flex shrink-0 items-center gap-4">
            <a
              href="#trabalhos"
              className="btn-aurora px-7 py-3.5 font-semibold"
            >
              Ver trabalhos <span className="arrow">→</span>
            </a>
            <a
              href="#manifesto"
              className="rounded-full border border-white/15 px-7 py-3.5 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              O manifesto
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
