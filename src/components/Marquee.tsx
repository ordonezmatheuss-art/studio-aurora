"use client";

/**
 * #6 — Faixa de segmentos/serviços em marquee infinito.
 * Duas linhas rolando em sentidos opostos; borda esmaecida nas pontas;
 * pausa no hover; respeita prefers-reduced-motion (fica estática).
 */
const linha1 = [
  "Identidade Visual",
  "Social Media",
  "Motion Design",
  "Direção de Arte",
  "Campanhas",
  "Branding",
];
const linha2 = [
  "Key Visual",
  "Embalagem",
  "Conteúdo",
  "Ensaios com IA",
  "Retoque no Photoshop",
  "Lançamentos",
];

function Faixa({
  items,
  dir,
}: {
  items: string[];
  dir: "left" | "right";
}) {
  const anim = dir === "left" ? "animate-marquee-left" : "animate-marquee-right";
  return (
    <div className="flex w-max">
      <div className={`flex w-max ${anim}`}>
        {/* duas cópias = loop contínuo em translateX(-50%) */}
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {items.map((s, i) => (
              <li key={`${copy}-${i}`} className="flex items-center">
                <span className="px-6 font-display text-[clamp(1.8rem,4.5vw,3.4rem)] font-semibold text-white/85">
                  {s}
                </span>
                <span
                  aria-hidden
                  className="text-aurora text-[clamp(1.2rem,3vw,2rem)]"
                >
                  ◆
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="marquee-band relative overflow-hidden border-y border-white/8 py-10 md:py-14">
      <div className="flex flex-col gap-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <Faixa items={linha1} dir="left" />
        <Faixa items={linha2} dir="right" />
      </div>
    </section>
  );
}
