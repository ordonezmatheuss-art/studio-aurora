"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { cases, type Case, type Media } from "@/lib/cases";
import { shimmerPlaceholder } from "@/lib/shimmer";
import { noWidow } from "@/lib/text";
import { Reveal, DecodeText } from "./primitives";

function ringClass(accent: Case["accent"]) {
  return accent === "teal" ? "ring-teal/20" : "ring-roxo/20";
}

/* #3 — card com profundidade: parallax + brilho aurora seguindo o mouse */
function MediaCard({
  m,
  i,
  data,
  active,
}: {
  m: Media;
  i: number;
  data: Case;
  active: boolean;
}) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const glowColor =
    data.accent === "teal"
      ? "var(--color-teal)"
      : "var(--color-roxo)";

  const onMove = (e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (mediaRef.current) {
      mediaRef.current.style.transform = `scale(1.08) translate(${
        px * -14
      }px, ${py * -14}px)`;
    }
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(220px circle at ${
        e.clientX - r.left
      }px ${e.clientY - r.top}px, color-mix(in oklab, ${glowColor} 38%, transparent), transparent 70%)`;
      glowRef.current.style.opacity = "1";
    }
  };
  const onLeave = () => {
    if (mediaRef.current) mediaRef.current.style.transform = "";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      className={`group/card relative aspect-[4/5] w-[78vw] shrink-0 select-none overflow-hidden rounded-2xl bg-card sm:w-[44vw] md:w-[28vw] lg:w-[23vw] ${
        m.type === "video" ? "isolate [transform:translateZ(0)]" : ""
      }`}
      style={{ scrollSnapAlign: "start" }}
      initial={
        reduce
          ? { opacity: 0 }
          : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }
      }
      animate={
        active
          ? reduce
            ? { opacity: 1 }
            : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
          : undefined
      }
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay: reduce ? 0 : Math.min(i * 0.08, 0.4),
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        ref={mediaRef}
        className="absolute inset-0 transition-transform duration-300 ease-out [transform-origin:center] will-change-transform"
      >
        {m.type === "video" ? (
          <video
            src={m.src}
            poster={m.poster}
            muted
            loop
            playsInline
            preload="metadata"
            draggable={false}
            className="pointer-events-none h-full w-full object-cover [transform:translateZ(0)]"
          />
        ) : (
          <Image
            src={m.src}
            alt={`${data.client} — peça ${i + 1}`}
            fill
            draggable={false}
            sizes="(max-width: 768px) 78vw, 23vw"
            placeholder={shimmerPlaceholder()}
            className="pointer-events-none object-cover"
          />
        )}
      </div>

      {/* brilho aurora que segue o mouse */}
      <span
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 mix-blend-screen"
      />

      {m.type === "video" && (
        <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-void/65 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
          <span className="text-[8px]">▶</span> Vídeo
        </span>
      )}
      <span
        className={`absolute inset-0 rounded-2xl ring-1 ring-inset transition-all duration-300 group-hover/card:ring-2 ${ringClass(
          data.accent,
        )}`}
      />
    </motion.div>
  );
}

function CaseRow({
  data,
  index,
  onOpen,
}: {
  data: Case;
  index: number;
  onOpen: () => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const [overflow, setOverflow] = useState(false);

  // #8 — a fileira inteira revela em cascata ao entrar na viewport (scroll vertical),
  // não por posição horizontal — evita cards "pipocando" enquanto se arrasta o carrossel
  const carouselRef = useRef<HTMLDivElement>(null);
  const rowInView = useInView(carouselRef, { once: true, margin: "-10% 0px" });

  // #2 — cursor custom "arraste" que segue o mouse sobre o carrossel
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorOn, setCursorOn] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const moveCursor = (e: React.PointerEvent) => {
    const c = cursorRef.current;
    if (c) c.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  };

  const measure = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setOverflow(el.scrollWidth - el.clientWidth > 8);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // #10 — vídeos só tocam quando visíveis (economia de CPU/bateria)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const vids = Array.from(el.querySelectorAll("video"));
    if (!vids.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) void v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.25 },
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  // arrastar para rolar — SÓ no mouse. No touch, a rolagem nativa do
  // navegador (overflow-x) cuida do horizontal; sequestrar o ponteiro
  // aqui quebrava o deslize no celular.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el || el.scrollWidth - el.clientWidth <= 8) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture?.(e.pointerId);
    el.style.scrollSnapType = "none";
    if (e.pointerType === "mouse") setGrabbing(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (cursorOn) moveCursor(e);
    const el = scrollerRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (el) {
      el.releasePointerCapture?.(e.pointerId);
      el.style.scrollSnapType = "";
    }
    drag.current.active = false;
    setGrabbing(false);
  };

  const nudge = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="border-t border-white/8 py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-display text-sm font-medium tabular-nums text-mist">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="label text-roxo">{data.client}</span>
            </div>
            <h3 className="mt-5 max-w-xl font-display text-[clamp(1.6rem,3vw,2.8rem)] font-medium leading-[1.06] text-white">
              {noWidow(data.title)}
            </h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {data.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/12 px-3.5 py-1.5 text-xs font-medium text-mist"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-end gap-5">
            <div>
              <p className="label mb-2 text-white/40">O desafio</p>
              <p className="text-[15px] leading-relaxed text-mist">
                {noWidow(data.brief)}
              </p>
            </div>
            <div>
              <p className="label mb-2 text-white/40">O que fizemos</p>
              <p className="text-[15px] leading-relaxed text-mist">
                {noWidow(data.solution)}
              </p>
            </div>
            <button
              onClick={onOpen}
              className="group/btn mt-1 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
            >
              Ver case completo
              <span className="transition-transform group-hover/btn:translate-x-1">
                ↗
              </span>
            </button>
          </Reveal>
        </div>
      </div>

      {/* carrossel: arrastar + setas */}
      <div ref={carouselRef} className="group/carousel relative mt-12">
        <div
          ref={scrollerRef}
          className={`no-scrollbar flex gap-5 overflow-x-auto px-6 md:px-10 ${
            overflow ? "active:cursor-grabbing md:cursor-none" : "justify-center"
          }`}
          style={{
            scrollSnapType: overflow ? "x proximity" : "none",
            // permite deslize horizontal (carrossel) E vertical (página) no toque
            touchAction: "pan-x pan-y",
            WebkitOverflowScrolling: "touch",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerEnter={(e) => {
            if (overflow && e.pointerType === "mouse") {
              setCursorOn(true);
              moveCursor(e);
            }
          }}
          onPointerLeave={() => setCursorOn(false)}
          onClickCapture={(e) => {
            if (drag.current.moved) e.preventDefault();
          }}
        >
          {data.media.map((m, i) => (
            <MediaCard key={m.src} m={m} i={i} data={data} active={rowInView} />
          ))}
        </div>

        {/* #2 — cursor custom "arraste" */}
        <div
          ref={cursorRef}
          aria-hidden
          className={`pointer-events-none fixed left-0 top-0 z-[60] hidden md:block ${
            cursorOn ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "opacity 0.2s ease" }}
        >
          <div
            className={`flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-void/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-transform duration-200 ${
              grabbing ? "scale-90" : "scale-100"
            }`}
          >
            <span>←</span>
            arraste
            <span>→</span>
          </div>
        </div>

        {overflow && (
          <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-6 md:flex md:px-10">
            <button
              aria-label="Imagem anterior"
              onClick={() => nudge(-1)}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-void/60 text-white opacity-0 backdrop-blur-md transition-all hover:border-white/40 hover:bg-void/80 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal group-hover/carousel:opacity-100"
            >
              ←
            </button>
            <button
              aria-label="Próxima imagem"
              onClick={() => nudge(1)}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-void/60 text-white opacity-0 backdrop-blur-md transition-all hover:border-white/40 hover:bg-void/80 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal group-hover/carousel:opacity-100"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Modal: case completo ---------- */
function CaseModal({ data, onClose }: { data: Case; onClose: () => void }) {
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [lenis, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      data-lenis-prevent
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-void/92 p-4 backdrop-blur-xl md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`Case ${data.client}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto max-w-5xl rounded-3xl border border-white/10 bg-abyss/80 p-6 md:p-12"
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:border-white/40 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
        >
          ✕
        </button>

        <span className="label text-roxo">{data.client}</span>
        <h3 className="mt-4 max-w-3xl font-display text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.05] text-white">
          {noWidow(data.title)}
        </h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {data.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/12 px-3.5 py-1.5 text-xs font-medium text-mist"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-9 grid gap-8 md:grid-cols-2">
          <div>
            <p className="label mb-2 text-white/40">O desafio</p>
            <p className="text-[15px] leading-relaxed text-mist">{noWidow(data.brief)}</p>
          </div>
          <div>
            <p className="label mb-2 text-white/40">O que fizemos</p>
            <p className="text-[15px] leading-relaxed text-mist">
              {noWidow(data.solution)}
            </p>
          </div>
        </div>

        {/* todas as peças */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {data.media.map((m, i) => (
            <div
              key={m.src}
              className="relative aspect-[4/5] overflow-hidden rounded-xl bg-card"
            >
              {m.type === "video" ? (
                <video
                  src={m.src}
                  poster={m.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover [transform:translateZ(0)]"
                />
              ) : (
                <Image
                  src={m.src}
                  alt={`${data.client} — peça ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 30vw"
                  placeholder={shimmerPlaceholder()}
                  className="object-cover"
                />
              )}
              <span
                className={`absolute inset-0 rounded-xl ring-1 ring-inset ${ringClass(
                  data.accent,
                )}`}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [selected, setSelected] = useState<Case | null>(null);

  return (
    <section id="trabalhos" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <DecodeText text="Selected work" className="label text-teal" />
            <h2 className="mt-5 font-display text-[clamp(2.4rem,7vw,6rem)] font-semibold leading-[0.95] text-white">
              Trabalhos<span className="text-aurora">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-mist">
            Cada peça com uma declaração própria. Arraste ou use as setas — e
            abra o case completo.
          </p>
        </Reveal>
      </div>

      <div className="mt-14">
        {cases.map((c, i) => (
          <CaseRow
            key={c.slug}
            data={c}
            index={i}
            onOpen={() => setSelected(c)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <CaseModal data={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
