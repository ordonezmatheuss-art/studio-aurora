"use client";

import Image from "next/image";
import { shimmerPlaceholder } from "@/lib/shimmer";
import { Reveal, Stagger, StaggerItem } from "./primitives";

/**
 * "Quem dirige" — os dois diretores/CEOs.
 * As fotos ficam em public/team/. Edite nome/cargo em `diretores`.
 */
const diretores = [
  { nome: "Matheus Barelli", cargo: "Diretor & CEO", foto: "/team/diretor-1.jpg" },
  { nome: "Matheus Ordonez", cargo: "Diretor & CEO", foto: "/team/diretor-2.jpg" },
];

export default function Sobre() {
  return (
    <section
      id="sobre"
      className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36"
    >
      <div className="grid items-center gap-12 md:grid-cols-[1.05fr_1fr] md:gap-16">
        {/* dois retratos / placeholders */}
        <Stagger as="div" className="grid grid-cols-2 gap-4 sm:gap-5">
          {diretores.map((d) => (
            <StaggerItem
              as="div"
              key={d.nome}
              className="border-aurora group/foto relative aspect-[4/5] overflow-hidden rounded-3xl bg-card"
            >
              <Image
                src={d.foto}
                alt={`${d.nome} — ${d.cargo}`}
                fill
                sizes="(max-width: 768px) 50vw, 28vw"
                placeholder={shimmerPlaceholder()}
                className="object-cover transition-transform duration-500 group-hover/foto:scale-[1.04]"
              />
              {/* tint split roxo × teal do DNA, sutil, por cima da foto */}
              <div className="pointer-events-none absolute inset-0 opacity-45 mix-blend-color bg-[linear-gradient(120deg,color-mix(in_oklab,var(--color-roxo)_55%,transparent),transparent_55%),linear-gradient(300deg,color-mix(in_oklab,var(--color-teal)_50%,transparent),transparent_55%)]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss via-abyss/70 to-transparent p-4 pt-10 text-center">
                <span className="block font-display text-base text-white">
                  {d.nome}
                </span>
                <span className="block text-xs text-mist">{d.cargo}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* texto */}
        <div>
          <Reveal>
            <span className="label text-teal">Quem dirige</span>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[1.04] text-white">
              Duas direções,{" "}
              <span className="text-aurora">uma mão humana</span>.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-mist">
              <p>
                A STUDIO Aurora é dirigida por dupla — direção criativa e direção
                de arte caminhando juntas. A IA é uma ferramenta poderosa, mas é
                o olhar de quem dirige que transforma output em significado.
              </p>
              <p>
                Cada projeto começa com escuta e termina com craft. A tecnologia
                acelera o caminho — a decisão, o gosto e a responsabilidade
                continuam humanos. Nenhuma peça vai ao ar sem passar pela última
                camada no Photoshop.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-8 font-display text-lg text-white">
              — Matheus Barelli & Matheus Ordonez
              <span className="mt-1 block text-sm font-normal text-mist">
                Direção, STUDIO Aurora
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
