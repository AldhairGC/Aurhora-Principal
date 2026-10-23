import { ImageResponse } from "next/og";
import { lockupDark } from "@/components/brand/logos";

export const alt = "Aurhora Agency: agentes de IA, tecnología y mantenimiento";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Shared social image for every page (articles reference it in their JSON-LD). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(80% 70% at 85% 10%, #1e1b4b 0%, #09090b 60%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={lockupDark} width={454} height={80} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 60, fontWeight: 600, lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 950 }}>
            Tú disfruta el resultado. Nosotros nos encargamos de lo complejo.
          </div>
          <div style={{ fontSize: 28, color: "#a1a1aa" }}>Digital · Integra · Facilities — CDMX y México</div>
        </div>
      </div>
    ),
    size,
  );
}
