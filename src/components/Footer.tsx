"use client";

import Image from "next/image";
import AuroraWave from "./AuroraWave";

const nav = {
  Navegação: [
    { label: "Manifesto", href: "#manifesto" },
    { label: "Método", href: "#metodo" },
    { label: "Trabalhos", href: "#trabalhos" },
    { label: "Contato", href: "#contato" },
  ],
  Social: [
    { label: "Instagram", href: "https://instagram.com/studioauroraia" },
    { label: "WhatsApp", href: "https://wa.me/5519994367137?text=Ol%C3%A1%2C%20gostaria%20de%20come%C3%A7ar%20um%20projeto%20novo." },
    { label: "E-mail", href: "mailto:studioauroramkt@gmail.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-abyss/30 pt-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="relative h-8 w-[170px]">
              <Image
                src="/brand/logo-h-branco.png"
                alt="STUDIO Aurora"
                fill
                sizes="170px"
                className="object-contain object-left"
              />
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-mist">
              O designer dirige. A IA acelera. Design com craft e a velocidade
              da tecnologia.
            </p>
          </div>

          {Object.entries(nav).map(([title, items]) => (
            <div key={title}>
              <p className="label mb-5 text-white/40">{title}</p>
              <ul className="space-y-3">
                {items.map((i) => (
                  <li key={i.label}>
                    <a
                      href={i.href}
                      className="text-mist transition-colors hover:text-white"
                    >
                      {i.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/8 py-7 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} STUDIO Aurora. Todos os direitos reservados.</p>
          <p>Feito com direção humana — acelerado por IA.</p>
        </div>
      </div>

      {/* assinatura interativa — onda da aurora gigante */}
      <div className="relative h-[18vh] w-full opacity-90 md:h-[22vh]">
        <AuroraWave bars={80} className="h-full w-full" />
      </div>
    </footer>
  );
}
