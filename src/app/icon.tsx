import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

/**
 * #12 — favicon gerado no build a partir do ícone de marca (53KB),
 * em vez do PNG de 2000px/1,4MB que era servido cru como /icon.png.
 */
export default async function Icon() {
  const mark = await readFile(
    join(process.cwd(), "public/brand/icon-branco.png"),
  );
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050610",
          borderRadius: 10,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={36} height={36} alt="" />
      </div>
    ),
    { ...size },
  );
}
