import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Portfólio Back-End .NET",
    short_name: "Portfolio",
    description: "Portfólio profissional para Back-End Developer .NET",
    start_url: "/",
    display: "standalone",
    background_color: "#1b1c22",
    theme_color: "#1b1c22",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
