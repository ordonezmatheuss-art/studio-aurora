"use client";

import { noWidow } from "@/lib/text";
import { Reveal, Stagger, StaggerItem } from "./primitives";

const depoimentos = [
  {
    quote:
      "Pela primeira vez nosso perfil parece tão forte quanto a operação. O conteúdo virou referência na região.",
    name: "Carlos M.",
    role: "Franqueado · Panobianco Americana II",
  },
  {
    quote:
      "Eles entenderam o ritual da barbearia e traduziram em imagem. Ficou premium de verdade, sem perder a essência.",
    name: "Barbearia Bemvenutti",
    role: "Direção · Barbearia",
  },
  {
    quote:
      "Sensibilidade e autoridade na medida certa. As peças comunicam cuidado — exatamente o que a clínica representa.",
    name: "Dr. Ivo Barelli",
    role: "Barelli Oftalmologia",
  },
];

export default function Depoimentos() {
  return (
    <section
      id="depoimentos"
      className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32"
    >
      <Reveal className="mb-14 max-w-2xl">
        <span className="label text-roxo">Vozes dos parceiros</span>
        <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[1.04] text-white">
          Relação de colaboração — <span className="text-aurora">nunca só cliente</span>.
        </h2>
      </Reveal>

      <Stagger as="div" className="grid gap-5 md:grid-cols-3">
        {depoimentos.map((d) => (
          <StaggerItem
            as="div"
            key={d.name}
            className="border-aurora flex h-full flex-col justify-between rounded-3xl bg-card/60 p-8"
          >
            <p className="text-lg leading-relaxed text-white/90">
              <span className="mr-1 font-display text-2xl text-roxo">“</span>
              {noWidow(d.quote)}
            </p>
            <div className="mt-8 border-t border-white/8 pt-5">
              <span className="block font-medium text-white">{d.name}</span>
              <span className="block text-sm text-mist">{d.role}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

    </section>
  );
}
