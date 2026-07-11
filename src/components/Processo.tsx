"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "./primitives";

const steps = [
  {
    n: "01",
    title: "Briefing",
    desc: "A gente escuta o parceiro de verdade. Objetivo, contexto, o que já existe e o que precisa mudar. Sem isso, nenhuma ferramenta resolve.",
  },
  {
    n: "02",
    title: "Conceito",
    desc: "Direção de arte e a declaração da peça — a frase que o concorrente não teria coragem de publicar. Aqui o designer dirige.",
  },
  {
    n: "03",
    title: "Texto",
    desc: "Copy na voz da marca: honesto sem ser rude, didático sem ser chato. A IA escreve a primeira versão, a revisão humana é obrigatória.",
  },
  {
    n: "04",
    title: "Imagem — IA & captação",
    desc: "Aqui a IA acelera: geração, variação e exploração visual. Tudo dentro da direção definida, nunca produção genérica sem arte.",
  },
  {
    n: "05",
    title: "Photoshop — a assinatura humana",
    desc: "Todo output de IA passa pela mão do designer antes de publicar. Esta é a última camada e o diferencial da STUDIO Aurora.",
  },
  {
    n: "06",
    title: "Aprovação",
    desc: "Gate humano obrigatório. Imagem e caption revisadas antes de qualquer publicação. Zero automação na decisão final.",
  },
  {
    n: "07",
    title: "Publicação",
    desc: "Peça no ar, no canal e horário certos, dentro de uma cadência editorial pensada para gerar resultado — não só volume.",
  },
];

export default function Processo() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="metodo"
      className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36"
    >
      <Reveal className="mb-14 text-center">
        <span className="label text-roxo">Como trabalhamos</span>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-medium leading-[1.02] text-white">
          Um fluxo onde a IA acelera e a mão humana assina.
        </h2>
      </Reveal>

      <div className="divide-y divide-white/8 border-t border-white/8">
        {steps.map((s, i) => {
          const open = active === i;
          return (
            <Reveal key={s.n} delay={i * 0.04}>
              <button
                onClick={() => setActive(open ? -1 : i)}
                aria-expanded={open}
                className="group flex w-full cursor-pointer items-start gap-6 py-7 text-left md:gap-10 md:py-8"
              >
                <span
                  className={`font-display text-xl font-medium tabular-nums transition-colors md:text-2xl ${
                    open ? "text-aurora" : "text-mist"
                  }`}
                >
                  {s.n}
                </span>

                <div className="flex-1">
                  <h3
                    className={`font-display text-2xl font-medium transition-colors md:text-4xl ${
                      open ? "text-white" : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.p
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-2xl overflow-hidden text-base leading-relaxed text-mist md:text-lg"
                      >
                        {s.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <span
                  className={`mt-2 text-2xl text-mist transition-transform duration-300 ${
                    open ? "rotate-45 text-roxo" : "group-hover:rotate-90"
                  }`}
                >
                  +
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
