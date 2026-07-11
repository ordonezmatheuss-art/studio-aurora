import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "STUDIO Aurora",
    short_name: "Aurora",
    description:
      "Design com IA que acelera sem perder o craft. O designer dirige. A IA acelera.",
    start_url: "/",
    display: "standalone",
    background_color: "#050610",
    theme_color: "#050610",
    icons: [
      { src: "/icon.png", sizes: "48x48", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
