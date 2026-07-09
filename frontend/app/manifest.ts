import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.name,
    description: site.bio,
    start_url: "/",
    display: "standalone",
    background_color: "#0f1011",
    theme_color: "#0f1011",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
