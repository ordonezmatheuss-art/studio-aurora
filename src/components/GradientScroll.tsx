"use client";

import { useEffect } from "react";

/**
 * Rotaciona o ângulo de TODOS os gradientes da marca (textos, botões, bordas)
 * conforme a rolagem — via a CSS var --aurora-angle. Suavizado por rAF.
 */
export default function GradientScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const BASE = 110;
    const FACTOR = 0.18; // graus por pixel rolado
    let current = BASE;
    let raf = 0;

    const loop = () => {
      const target = BASE + window.scrollY * FACTOR;
      current += (target - current) * 0.08; // ease
      root.style.setProperty("--aurora-angle", `${current.toFixed(1)}deg`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
