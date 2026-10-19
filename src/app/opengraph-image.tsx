import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { ecosystemStats } from "@/lib/content";
import { MARK_PATH, siteConfig } from "@/lib/site";

/*
 * Social preview (Open Graph / X / LinkedIn / WhatsApp), gerado no build como PNG 1200×630.
 * Usa as fontes e o logo reais da marca, lidos do disco.
 */

export const alt = "NERD · A plataforma de negócios do Porto Digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#07080a";
const PAPER = "#f2f1ec";
const BRAND = siteConfig.brandColor;

const fromRoot = (...parts: string[]) => join(process.cwd(), ...parts);

async function loadAssets() {
  const [groteskBold, groteskMedium, interRegular, wordmark] = await Promise.all([
    readFile(fromRoot("node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff")),
    readFile(fromRoot("node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff")),
    readFile(fromRoot("node_modules/@fontsource/inter/files/inter-latin-400-normal.woff")),
    readFile(fromRoot("src/assets/brand/porto-digital-nerd-white.png")),
  ]);
  return {
    groteskBold,
    groteskMedium,
    interRegular,
    wordmarkSrc: `data:image/png;base64,${wordmark.toString("base64")}`,
  };
}

function Mark({ size: markSize, opacity = 1 }: { size: number; opacity?: number }) {
  return (
    <svg width={markSize} height={markSize} viewBox="0 0 100 100" style={{ opacity }}>
      <rect width="100" height="100" rx="12" fill={BRAND} />
      <path d={MARK_PATH} fill="#ffffff" />
    </svg>
  );
}

export default async function OpengraphImage() {
  const { groteskBold, groteskMedium, interRegular, wordmarkSrc } = await loadAssets();
  const highlights = ecosystemStats.slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          backgroundColor: INK,
          backgroundImage: [
            `radial-gradient(circle at 88% 8%, rgba(20,80,239,0.85) 0%, rgba(20,80,239,0) 45%)`,
            `radial-gradient(circle at 70% 110%, rgba(107,149,255,0.35) 0%, rgba(107,149,255,0) 40%)`,
            `radial-gradient(circle at 0% 100%, rgba(11,47,158,0.6) 0%, rgba(11,47,158,0) 45%)`,
          ].join(", "),
          color: PAPER,
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* Símbolo gigante cortado à direita, como textura */}
        <div style={{ position: "absolute", right: -150, top: 120, display: "flex" }}>
          <Mark size={520} opacity={0.12} />
        </div>

        {/* Topo: assinatura + localização */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src={wordmarkSrc} width={235} height={44} alt="" />
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(242,241,236,0.6)",
            }}
          >
            Recife · Brasil · Portugal
          </div>
        </div>

        {/* Centro: marca + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <Mark size={150} />
            <div
              style={{
                display: "flex",
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: 210,
                lineHeight: 0.85,
                letterSpacing: -10,
              }}
            >
              NERD
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 36,
              maxWidth: 900,
              fontFamily: "Space Grotesk",
              fontWeight: 500,
              fontSize: 46,
              lineHeight: 1.1,
              letterSpacing: -1.5,
            }}
          >
            <span>A plataforma de negócios do&nbsp;</span>
            <span style={{ color: "#6b95ff" }}>Porto Digital.</span>
          </div>
        </div>

        {/* Rodapé: números do ecossistema */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            paddingTop: 24,
            borderTop: "1px solid rgba(242,241,236,0.18)",
          }}
        >
          {highlights.map((stat) => (
            <div key={stat.id} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 34, color: PAPER }}>
                {stat.value.toLocaleString("pt-BR")}
                {stat.suffix ?? ""}
              </span>
              <span style={{ fontSize: 20, color: "rgba(242,241,236,0.6)" }}>{stat.label}</span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              padding: "10px 22px",
              borderRadius: 999,
              backgroundColor: BRAND,
              fontSize: 18,
              fontWeight: 400,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Faça parte
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: groteskBold, weight: 700, style: "normal" },
        { name: "Space Grotesk", data: groteskMedium, weight: 500, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
      ],
    },
  );
}
