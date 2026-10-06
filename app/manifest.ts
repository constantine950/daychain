import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/app",
    name: "Daychain",
    short_name: "Daychain",
    description:
      "List your tasks and durations. Daychain chains them into a schedule for your whole day.",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    background_color: "#14151f",
    theme_color: "#14151f",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
