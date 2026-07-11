"use client";

import { useEffect, useRef } from "react";

/**
 * #7 — Barra finíssima de progresso de leitura no topo.
 * Usa o gradiente aurora da marca e enche conforme o scroll.
 * Atualiza via scaleX direto no DOM (sem re-render por frame).
 */
export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[3px]"
    >
      <div
        ref={barRef}
        className="bg-aurora h-full w-full origin-left scale-x-0"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
