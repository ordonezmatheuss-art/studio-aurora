import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Metadados da imagem
export const alt = "STUDIO Aurora — O designer dirige. A IA acelera.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG image gerada no build com o DNA da marca:
 * fundo abissal + mesh aurora (roxo × teal) + logo branca + slogan.
 * Aparece como preview ao compartilhar o link (WhatsApp, Insta, X...).
 */
export default async function Image() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/logo-h-branco.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050610",
          position: "relative",
          padding: "84px",
          fontFamily: "sans-serif",
        }}
      >
        {/* blobs de aurora */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -120,
            width: 620,
            height: 620,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle at 30% 30%, #8b2ec8, transparent 60%)",
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle at 70% 40%, #1b9bc0, transparent 60%)",
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: 280,
            width: 640,
            height: 640,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle at 50% 50%, #4828a0, transparent 62%)",
            opacity: 0.45,
          }}
        />

        {/* topo: logo */}
        <div style={{ display: "flex", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} height={64} alt="STUDIO Aurora" />
        </div>

        {/* slogan */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#f0f2ff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            O designer dirige.
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              background: "linear-gradient(100deg, #8b2ec8, #1b9bc0)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            A IA acelera.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#aeb4e0",
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            Design com IA que acelera sem perder o craft. O Photoshop é sempre a
            última camada — a assinatura humana.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
