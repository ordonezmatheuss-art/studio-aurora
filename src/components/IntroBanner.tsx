"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";

// Segundo em que o logo já está totalmente revelado.
// A partir daqui é só a aurora + estrelas em movimento — é o trecho que entra em loop.
const LOOP_START = 5.0;

export default function IntroBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoScrolled = useRef(false);
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // reduced-motion: não roda o vídeo — mantém só o poster estático
    if (reduce) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    // ao fim do 1º play, rola até o Hero (seção acima do manifesto)
    const goToHero = () => {
      if (autoScrolled.current) return;
      autoScrolled.current = true;
      if (window.scrollY > 40) return; // não puxa se já rolou manualmente
      const target = document.querySelector("#top");
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY;
      const l = lenisRef.current;
      if (l) l.scrollTo(y, { duration: 2.2 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    };

    // loop apenas do trecho revelado (não repete a revelação do logo)
    const loopTail = () => {
      try {
        video.currentTime = LOOP_START;
      } catch {}
      void video.play().catch(() => {});
    };

    const onTime = () => {
      if (video.duration && video.currentTime >= video.duration - 0.18) {
        goToHero();
        loopTail();
      }
    };
    const onEnded = () => {
      goToHero();
      loopTail();
    };

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", onEnded);
    };
  }, [reduce]);

  return (
    <section className="relative flex min-h-[72svh] w-full items-start justify-center overflow-hidden pt-24 md:h-[100svh] md:items-center md:pt-0">
      <video
        ref={videoRef}
        className="h-auto w-full object-contain md:absolute md:inset-0 md:h-full md:w-full md:object-cover"
        src="/brand/logo-reveal.mp4"
        poster="/brand/logo-reveal-poster.jpg"
        autoPlay={!reduce}
        muted
        playsInline
        preload={reduce ? "none" : "auto"}
        // costura invisível: o vídeo dissolve por completo ANTES da borda da seção,
        // então a faixa inferior do intro já é a aurora global — igual ao topo do hero.
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 56%, rgba(0,0,0,0.5) 72%, transparent 84%)",
          maskImage:
            "linear-gradient(to bottom, #000 56%, rgba(0,0,0,0.5) 72%, transparent 84%)",
        }}
      />

      {/* indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.2 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="label text-white/70">Role para entrar</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/70"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
