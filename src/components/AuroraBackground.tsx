"use client";

import { useEffect, useRef } from "react";

/**
 * Aurora boreal de fundo — shader WebGL fixo cobrindo a página inteira.
 * As cortinas fluem com o tempo e se distorcem conforme o scroll.
 * Paleta da marca: navy → índigo → roxo → teal. Degrada para gradiente CSS
 * se WebGL não estiver disponível ou em prefers-reduced-motion.
 */

const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;   // 0..1 progresso de scroll na página
uniform float uVel;      // velocidade instantânea de scroll (distorção)

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

vec3 palette(float t){
  vec3 navy   = vec3(0.051, 0.086, 0.330);
  vec3 indigo = vec3(0.282, 0.157, 0.627);
  vec3 roxo   = vec3(0.545, 0.180, 0.784);
  vec3 teal   = vec3(0.106, 0.608, 0.753);
  vec3 c = mix(navy, indigo, smoothstep(0.0, 0.45, t));
  c = mix(c, roxo, smoothstep(0.40, 0.72, t));
  c = mix(c, teal, smoothstep(0.72, 1.0, t));
  return c;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * asp, uv.y);

  float t = uTime * 0.06;
  float scroll = uScroll;
  // distorção controlada — enriquece o movimento sem apagar a aurora
  float warp = 0.10 + scroll * 0.14 + min(uVel, 0.4) * 0.5;
  float drift = scroll * 2.2; // a aurora "viaja" conforme o scroll

  // cortinas de aurora — camadas fluindo (presentes na página inteira)
  float aurora = 0.0;
  float colMix = 0.0;
  for (int i = 0; i < 2; i++){
    float fi = float(i);
    float flow = fbm(vec2(p.x * 1.3 + fi * 4.7, t * 1.6 + fi + drift));
    float ripple = sin(p.x * 3.0 + t * 2.0 + fi * 1.7 + drift) * warp;
    float y = uv.y + ripple + flow * 0.35;
    float curtain = smoothstep(0.15, 1.0, flow);
    // brilha do topo, mas mantém um piso de glow em toda a tela
    float band = curtain * (smoothstep(1.2, 0.1, y) * 0.85 + 0.15);
    aurora += band * 0.5;
    colMix += band * (0.35 + fi * 0.28);
  }
  aurora = clamp(aurora, 0.0, 1.0);
  colMix = clamp(colMix, 0.0, 1.0);

  float hue = clamp(uv.y * 0.5 + colMix * 0.55 + scroll * 0.15, 0.0, 1.0);
  vec3 col = palette(hue) * aurora;

  // base abissal
  vec3 base = vec3(0.031, 0.035, 0.102);
  col = base + col * 1.15;

  // estrelas (mais densas no alto)
  vec2 sp = floor(uv * vec2(asp, 1.0) * 760.0);
  float s = hash(sp);
  float star = step(0.994, s);
  float tw = 0.5 + 0.5 * sin(uTime * 3.0 + s * 40.0);
  col += star * tw * 0.5 * smoothstep(0.45, 1.0, uv.y);

  // vinheta sutil p/ legibilidade do conteúdo
  float vig = smoothstep(1.25, 0.35, length(uv - 0.5));
  col *= mix(0.72, 1.0, vig);

  outColor = vec4(col, 1.0);
}`;

const VERT = `#version 300 es
in vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      // fallback: gradiente estático no próprio canvas via CSS
      canvas.style.background =
        "radial-gradient(120% 90% at 50% 0%, #4828a0 0%, #1b1340 45%, #08091a 80%)";
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uScroll = gl.getUniformLocation(prog, "uScroll");
    const uVel = gl.getUniformLocation(prog, "uVel");

    const dpr = Math.min(window.devicePixelRatio || 1, 1);
    const resize = () => {
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    let scroll = 0;
    let scrollTarget = 0;
    let vel = 0;
    let lastY = window.scrollY;
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollTarget = max > 0 ? window.scrollY / max : 0;
      vel = Math.min(Math.abs(window.scrollY - lastY) / 60, 1);
      lastY = window.scrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const start = performance.now();
    let raf = 0;
    let lastDraw = 0;
    const FRAME_MS = 1000 / 32; // ~32fps é suficiente para a aurora
    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (now - lastDraw < FRAME_MS) return;
      lastDraw = now;
      scroll += (scrollTarget - scroll) * 0.08;
      vel *= 0.9;
      gl.uniform1f(uTime, reduce ? 0 : (now - start) / 1000);
      gl.uniform1f(uScroll, scroll);
      gl.uniform1f(uVel, vel);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(render);

    // pausa o loop quando a aba está oculta — não gasta CPU/bateria sem ninguém ver
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        lastDraw = 0;
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
