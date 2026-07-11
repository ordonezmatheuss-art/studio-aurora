"use client";

import { useRef } from "react";

/**
 * Onda da aurora — barras verticais que formam a curva do ícone da marca.
 * Reage ao cursor: as barras próximas do ponteiro "sobem".
 */
export default function AuroraWave({
  bars = 48,
  className,
  interactive = true,
}: {
  bars?: number;
  className?: string;
  interactive?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const W = 1000;
  const H = 260;
  const gap = W / bars;

  // arredonda para 2 casas — evita hydration mismatch por diferença de float
  const round = (n: number) => Math.round(n * 100) / 100;

  // curva base: vale ao centro, picos nas laterais (como o ícone)
  const baseHeight = (i: number) => {
    const t = i / (bars - 1); // 0..1
    const curve = Math.abs(Math.sin(t * Math.PI - Math.PI / 2)); // U
    return round(26 + curve * 150 + Math.sin(i * 1.7) * 10);
  };

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    ref.current.querySelectorAll<SVGRectElement>("rect[data-bar]").forEach((bar, i) => {
      const bx = i * gap + gap / 2;
      const dist = Math.abs(bx - x);
      const boost = Math.max(0, 1 - dist / 180) * 70;
      const h = baseHeight(i) + boost;
      bar.setAttribute("height", String(h));
      bar.setAttribute("y", String(H - h));
    });
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.querySelectorAll<SVGRectElement>("rect[data-bar]").forEach((bar, i) => {
      const h = baseHeight(i);
      bar.setAttribute("height", String(h));
      bar.setAttribute("y", String(H - h));
    });
  };

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={reset}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="auroraBars" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d1654" />
          <stop offset="35%" stopColor="#4828a0" />
          <stop offset="65%" stopColor="#8b2ec8" />
          <stop offset="100%" stopColor="#1b9bc0" />
        </linearGradient>
      </defs>
      {Array.from({ length: bars }).map((_, i) => {
        const h = baseHeight(i);
        return (
          <rect
            key={i}
            data-bar
            x={i * gap + gap * 0.22}
            y={H - h}
            width={gap * 0.5}
            height={h}
            rx={gap * 0.25}
            fill="url(#auroraBars)"
            style={{ transition: "height 0.35s cubic-bezier(0.16,1,0.3,1), y 0.35s cubic-bezier(0.16,1,0.3,1)" }}
          />
        );
      })}
    </svg>
  );
}
