// #11 — placeholder de shimmer para next/image (imagens locais dinâmicas,
// sem import estático, então o Next não gera blurDataURL sozinho).
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#0f1030" offset="20%" />
      <stop stop-color="#221a52" offset="50%" />
      <stop stop-color="#0f1030" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#0f1030" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const shimmerPlaceholder = (
  w = 700,
  h = 875,
): `data:image/${string}` =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
