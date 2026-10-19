import { ecosystemStats } from "@/lib/content";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "NERD · A plataforma de negócios do Porto Digital";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    display: "NERD",
    headline: "A plataforma de negócios do",
    accent: "Porto Digital.",
    stats: ecosystemStats.slice(0, 3).map((stat) => ({
      value: `${stat.value.toLocaleString("pt-BR")}${stat.suffix ?? ""}`,
      label: stat.label,
    })),
    cta: "Faça parte",
  });
}
