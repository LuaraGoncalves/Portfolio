import { ImageResponse } from "next/og";

import { profile } from "@/lib/portfolio";

export const alt = `Portfólio de ${profile.fullName}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", padding: 72, flexDirection: "column", justifyContent: "space-between", background: "#1b1c22", color: "#f2efed", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ color: "#c3aa70", fontSize: 26, letterSpacing: 8, textTransform: "uppercase" }}>Portfólio profissional</div>
        <div style={{ maxWidth: 1000, fontSize: 86, fontWeight: 700, lineHeight: 1.05 }}>{profile.fullName}</div>
        <div style={{ color: "#d7bda0", fontSize: 42 }}>{profile.role}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #67636a", paddingTop: 26, color: "#c3bdc1", fontSize: 25 }}>
        <span>C# · .NET · APIs · PostgreSQL</span>
        <span>{profile.githubUrl.replace("https://", "")}</span>
      </div>
    </div>,
    { ...size }
  );
}
