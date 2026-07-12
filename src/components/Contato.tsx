"use client";

import { Reveal, DecodeText } from "./primitives";

export default function Contato() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden py-28 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_120%,transparent_40%,color-mix(in_oklab,var(--color-void)_70%,transparent)_90%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="text-center">
          <DecodeText text="Bora?" className="label text-teal" />
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.6rem,8vw,7rem)] font-semibold leading-[0.95] tracking-tight text-white">
            Vamos ser <span className="text-aurora">parceiros</span>.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg text-mist">
            Sem promessa de mágica, sem automação total. Direção de arte de
            verdade com a velocidade da IA. Conta o que você precisa.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/5519994367137?text=Ol%C3%A1%2C%20gostaria%20de%20come%C3%A7ar%20um%20projeto%20novo."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-aurora px-8 py-4 font-semibold"
            >
              Falar no WhatsApp <span className="arrow">→</span>
            </a>
            <a
              href="mailto:studioauroramkt@gmail.com"
              className="rounded-full border border-white/15 px-8 py-4 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              studioauroramkt@gmail.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
