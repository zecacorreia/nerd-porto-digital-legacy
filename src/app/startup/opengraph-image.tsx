import { OG_SIZE, renderOgImage } from "@/lib/og";
import { startupRoutes } from "@/lib/startup";

export const alt = "NERD para startups · Talentos, mercado e capital no Porto Digital";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    display: "Startups",
    displaySize: 170,
    headline: "Da ideia à expansão internacional, com",
    accent: "talentos, mercado e capital.",
    stats: startupRoutes.map((route, index) => ({
      value: String(index + 1).padStart(2, "0"),
      label: route.axis,
    })),
    cta: "Balcão de Empreendedorismo",
  });
}
