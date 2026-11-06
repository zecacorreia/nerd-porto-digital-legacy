import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { MARK_PATH, siteConfig } from "@/lib/site";

/*
 * Renderizador compartilhado dos social previews (Open Graph / X / LinkedIn / WhatsApp).
 * Cada rota tem seu opengraph-image.tsx chamando renderOgImage com o próprio texto.
 * Usa as fontes e o logo reais da marca, lidos do disco no build.
 */

export const OG_SIZE = { width: 1200, height: 630 };

export interface OgImageOptions {
  /** Palavra grande ao lado do símbolo (ex.: "NERD", "Membership"). */
  display: string;
  displaySize?: number;
  headline: string;
  /** Final da frase, destacado em azul. */
  accent: string;
  stats: ReadonlyArray<{ value: string; label: string }>;
  cta: string;
}

const INK = "#191919";
const PAPER = "#f7fcfb";
const BRAND = siteConfig.brandColor;

async function loadAssets() {
  // Caminhos literais: com segmentos dinâmicos o bundler rastrearia o projeto inteiro no deploy.
  const [groteskBold, groteskMedium, interRegular, wordmark] = await Promise.all([
    readFile(join(process.cwd(), "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff")),
    readFile(join(process.cwd(), "src/assets/brand/porto-digital-nerd-white.png")),
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

export async function renderOgImage({
  display,
  displaySize = 210,
  headline,
  accent,
  stats,
  cta,
}: OgImageOptions): Promise<ImageResponse> {
  const { groteskBold, groteskMedium, interRegular, wordmarkSrc } = await loadAssets();

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
                fontSize: displaySize,
                lineHeight: 0.85,
                letterSpacing: -displaySize * 0.048,
              }}
            >
              {display}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 36,
              maxWidth: 980,
              fontFamily: "Space Grotesk",
              fontWeight: 500,
              fontSize: 46,
              lineHeight: 1.1,
              letterSpacing: -1.5,
            }}
          >
            {/* Uma span por palavra: no flex do Satori cada span quebra inteiro. */}
            {[
              ...headline.split(" ").map((word) => ({ word, accent: false })),
              ...accent.split(" ").map((word) => ({ word, accent: true })),
            ].map(({ word, accent: isAccent }, index) => (
              <span key={`${word}-${index}`} style={{ marginRight: 12, color: isAccent ? "#01a3f8" : undefined }}>
                {word}
              </span>
            ))}
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
          {stats.map((stat) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 34, color: PAPER }}>
                {stat.value}
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
            {cta}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Space Grotesk", data: groteskBold, weight: 700, style: "normal" },
        { name: "Space Grotesk", data: groteskMedium, weight: 500, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
      ],
    },
  );
}
