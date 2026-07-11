"use client";

import { Reveal } from "./primitives";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40"
    >
      <Reveal>
        <span className="label text-roxo">O posicionamento</span>
      </Reveal>

      <div className="mt-8 grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-20">
        <Reveal>
          <h2 className="font-display text-[clamp(2.4rem,6vw,5.2rem)] font-medium leading-[0.98] tracking-tight text-white">
            IA não faz tudo.
            <br />
            <span className="text-aurora">Não sozinha.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col justify-end gap-6">
          <p className="text-lg leading-relaxed text-mist">
            A STUDIO Aurora ocupa o espaço que ninguém ocupa: honestidade
            técnica com estética de autoridade. Nenhuma agência com IA fala
            abertamente dos seus limites — e nenhuma tem o visual para sustentar
            essa posição.
          </p>
          <p className="text-lg leading-relaxed text-mist">
            A gente acelera com IA o que dá pra acelerar. E protege com a mão
            humana o que faz a diferença: direção, craft e a decisão final.
          </p>
        </Reveal>
      </div>

      {/* linha gradiente */}
      <Reveal delay={0.15}>
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-roxo/60 to-transparent" />
      </Reveal>
    </section>
  );
}
