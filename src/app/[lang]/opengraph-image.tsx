import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Blinkin — family video diary in 30-second clips";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/logo.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

const TILES = [
  "linear-gradient(135deg, #fde68a, #fb923c, #f43f5e)",
  "linear-gradient(135deg, #bae6fd, #38bdf8, #6366f1)",
  "#0a0a0a",
  "linear-gradient(135deg, #d9f99d, #34d399, #0d9488)",
  "#0a0a0a",
  "linear-gradient(135deg, #fecdd3, #f472b6, #c026d3)",
  "linear-gradient(135deg, #fef9c3, #fcd34d, #f97316)",
  "#0a0a0a",
  "linear-gradient(135deg, #ccfbf1, #22d3ee, #2563eb)",
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          background: "radial-gradient(circle at 75% 50%, #25311e 0%, #000000 60%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <img src={logoSrc} width={198} height={123} alt="" />
          <div style={{ display: "flex", fontSize: 120, fontWeight: 700, letterSpacing: -4 }}>Blinkin</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 24px",
                borderRadius: 999,
                border: "2px solid rgba(255,255,255,0.15)",
                fontSize: 32,
              }}
            >
              <div style={{ width: 16, height: 16, borderRadius: 999, background: "#ef4444" }} />
              00:30
            </div>
            <div
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 999,
                background: "#ffffff",
                color: "#000000",
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              Android
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: 420,
            gap: 12,
            padding: 20,
            borderRadius: 40,
            border: "2px solid rgba(255,255,255,0.15)",
            background: "#000000",
          }}
        >
          {TILES.map((background, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                width: 116,
                height: 132,
                borderRadius: 20,
                border: "2px solid rgba(255,255,255,0.18)",
                background,
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
