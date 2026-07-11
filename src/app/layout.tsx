import type { Metadata, Viewport } from "next";
import { Fredoka, Montserrat } from "next/font/google";
// import localFont from "next/font/local"; // ← descomente para usar a Apertura
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Display — substituto livre da Apertura (arredondada, humanista, com autoridade).
const display = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* ============================================================
   APERTURA (fonte oficial da marca) — pronto para swap.
   1) Coloque os arquivos em  src/app/fonts/  (ex.: Apertura-Black.woff2,
      Apertura-Medium.woff2, Apertura-Bold.woff2).
   2) Descomente o import localFont acima e o bloco abaixo.
   3) Troque `display.variable` por `display.variable` → mantenha o mesmo
      nome de variável (--font-display), então NADA mais muda no CSS.
   4) Use `apertura` no lugar de `display` no className do <html>.

const apertura = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "./fonts/Apertura-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Apertura-Bold.woff2",   weight: "700", style: "normal" },
    { path: "./fonts/Apertura-Black.woff2",  weight: "900", style: "normal" },
  ],
});
   ============================================================ */

const body = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = "https://studioaurora.ia";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "STUDIO Aurora — O designer dirige. A IA acelera.",
    template: "%s · STUDIO Aurora",
  },
  description:
    "Design com IA que acelera sem perder o craft. Honestidade técnica com estética de autoridade. O Photoshop é sempre a última camada — a assinatura humana.",
  keywords: [
    "studio aurora",
    "design com IA",
    "identidade visual",
    "direção de arte",
    "agência criativa",
  ],
  openGraph: {
    title: "STUDIO Aurora — O designer dirige. A IA acelera.",
    description:
      "Design com IA que acelera sem perder o craft. Honestidade técnica com estética de autoridade.",
    type: "website",
    locale: "pt_BR",
    siteName: "STUDIO Aurora",
  },
  twitter: {
    card: "summary_large_image",
    title: "STUDIO Aurora — O designer dirige. A IA acelera.",
    description: "Design com IA que acelera sem perder o craft.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050610",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} antialiased`}
    >
      <body className="bg-void text-white font-body selection:bg-roxo/40 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
