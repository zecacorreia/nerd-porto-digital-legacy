import { membershipPlans } from "@/lib/membership";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Membership NERD · Um plano anual para usar o ecossistema do seu jeito";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    display: "Membership",
    displaySize: 140,
    headline: "Um plano anual para usar o ecossistema do",
    accent: "seu jeito.",
    stats: membershipPlans.map((plan) => ({
      value: String(plan.points),
      label: `Pixels · ${plan.name.replace("NERD ", "")}`,
    })),
    cta: "Ver planos",
  });
}
