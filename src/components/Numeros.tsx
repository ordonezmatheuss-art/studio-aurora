"use client";

import { Reveal, Counter } from "./primitives";

/**
 * #4 — Faixa de prova/autoridade com contadores animados.
 *
 * ⚠️ TROQUE pelos números reais da STUDIO Aurora.
 * Os valores abaixo são honestos/estruturais (não inventam métrica):
 * ajuste `to`, `suffix`, `prefix` e `label` conforme a realidade.
 */
const stats: {
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
  hero?: boolean; // número-âncora: recebe destaque visual
}[] = [
  { to: 100, suffix: "%", label: "Toque humano antes de publicar" },
  { to: 7, label: "Etapas no nosso fluxo" },
  { to: 5, prefix: "+", label: "Marcas dirigidas", hero: true }, // ← edite com o nº real
  { to: 0, label: "Stock photo genérico" },
];

export default function Numeros() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-2 items-baseline gap-x-6 gap-y-12 border-y border-white/8 py-12 md:grid-cols-4 md:gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  className={`font-display font-semibold leading-none ${
                    s.hero
                      ? "text-[clamp(3.4rem,7vw,5.8rem)] text-teal [text-shadow:0_0_28px_color-mix(in_oklab,var(--color-teal)_45%,transparent)]"
                      : "text-[clamp(2.6rem,5.5vw,4.4rem)] text-aurora"
                  }`}
                >
                  {s.prefix}
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p
                  className={`mt-3 max-w-[14rem] text-sm leading-snug ${
                    s.hero ? "font-medium text-white/85" : "text-mist"
                  }`}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
