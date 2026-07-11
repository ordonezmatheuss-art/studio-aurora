"use client";

import { Reveal, Stagger, StaggerItem } from "./primitives";

const acelera = [
  "Geração e variação de imagem",
  "Primeiras versões de copy",
  "Exploração de conceitos",
  "Volume de produção",
  "Captação de referências",
];

const naoFaz = [
  "Direção de arte e decisão",
  "A voz e o tom da marca",
  "O craft da última camada",
  "Curadoria do que vai ao ar",
  "Relação com o parceiro",
];

export default function Honestidade() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <span className="label text-teal">O que ninguém fala</span>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.8rem)] font-medium leading-tight text-white">
            A linha entre o que a IA acelera e o que ela
            <br />
            <span className="text-aurora">ainda não faz</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {/* acelera — teal */}
          <Reveal>
            <div className="border-aurora h-full rounded-3xl bg-card/60 p-8 md:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/15 text-teal">
                  ↑
                </span>
                <h3 className="font-display text-2xl font-medium text-white">
                  A IA acelera
                </h3>
              </div>
              <Stagger className="mt-7 space-y-4">
                {acelera.map((item) => (
                  <StaggerItem
                    key={item}
                    className="flex items-center gap-3 border-b border-white/5 pb-4 text-mist last:border-0"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    <span className="text-lg text-white/90">{item}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>

          {/* não faz — roxo */}
          <Reveal delay={0.12}>
            <div className="border-aurora h-full rounded-3xl bg-card/60 p-8 md:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-roxo/15 text-roxo">
                  ✦
                </span>
                <h3 className="font-display text-2xl font-medium text-white">
                  O designer dirige
                </h3>
              </div>
              <Stagger className="mt-7 space-y-4">
                {naoFaz.map((item) => (
                  <StaggerItem
                    key={item}
                    className="flex items-center gap-3 border-b border-white/5 pb-4 last:border-0"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-roxo" />
                    <span className="text-lg text-white/90">{item}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
