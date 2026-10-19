import { EcosystemNumbers } from "@/components/sections/EcosystemNumbers";
import { Footer } from "@/components/sections/Footer";
import { Governance } from "@/components/sections/Governance";
import { Hero } from "@/components/sections/Hero";
import { NowInEcosystem } from "@/components/sections/NowInEcosystem";
import { PhysicalSpace } from "@/components/sections/PhysicalSpace";
import { TwoPaths } from "@/components/sections/TwoPaths";

/**
 * Página única (Server Component) que apenas orquestra as seções.
 * Cada seção é um Client Component isolado com suas próprias animações,
 * mantendo o JS por seção e o HTML inicial renderizado no servidor.
 */
export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <EcosystemNumbers />
        <NowInEcosystem />
        <TwoPaths />
        <PhysicalSpace />
        <Governance />
      </main>
      <Footer />
    </>
  );
}
