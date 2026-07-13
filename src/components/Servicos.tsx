"use client";

import { noWidow } from "@/lib/text";
import { Reveal, Stagger, StaggerItem } from "./primitives";

/**
 * Serviços — os núcleos que a STUDIO Aurora entrega.
 * Versão escaneável e indexável dos serviços (o marquee é só o ritmo visual).
 * Tom da marca: honestidade técnica + autoridade. Uma frase por serviço.
 */
const servicos = [
  {
    n: "01",
    titulo: "Audiovisual & Motion Design",
    desc: "Vídeo, motion e edição com ritmo de cinema. A IA acelera a produção; o designer dirige cada frame até o corte final.",
  },
  {
    n: "02",
    titulo: "Campanhas & Social Media",
    desc: "Conteúdo editorial e campanhas com calendário estruturado — cada peça com uma declaração própria, pensada pra gerar resultado, não só volume.",
  },
  {
    n: "03",
    titulo: "Branding, Key Visual & Identidade Visual",
    desc: "Sistemas visuais do conceito ao key visual, que dão à marca a autoridade necessária pra ser levada a sério no seu mercado.",
  },
  {
    n: "04",
    titulo: "Web Design & UI/UX",
    desc: "Sites e interfaces que unem estética de autoridade e experiência funcional — bonitos de ver, óbvios de usar.",
  },
  {
    n: "05",
    titulo: "Aplicativos & Agentes",
    desc: "Produtos digitais e agentes de IA sob medida: a tecnologia acelerando, a direção humana garantindo que faça sentido.",
  },
];

export default function Servicos() {
  return (
    <section
      id="servicos"
      className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36"
    >
      <Reveal className="mb-14 max-w-2xl">
        <span className="label text-teal">O que fazemos</span>
        <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[1.04] text-white">
          Serviços com direção humana, <span className="text-aurora">acelerados por IA</span>.
        </h2>
      </Reveal>

      <Stagger as="div" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {servicos.map((s) => (
          <StaggerItem
            as="div"
            key={s.n}
            className="border-aurora group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card/60 p-8 transition-all duration-300 hover:bg-card"
          >
            {/* brilho aurora sutil no hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-aurora opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
            />
            <span className="font-display text-sm font-medium tabular-nums text-aurora">
              {s.n}
            </span>
            <h3 className="mt-4 font-display text-xl font-medium leading-snug text-white md:text-2xl">
              {s.titulo}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-mist">
              {noWidow(s.desc)}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
