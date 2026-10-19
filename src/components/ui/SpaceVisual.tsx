"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";

import { EASE_OUT_EXPO, staggerContainer } from "@/lib/animations";
import type { SpaceItem } from "@/lib/content";
import { cn } from "@/lib/utils";

const FLOORS = 4;

/** Cena gráfica usada enquanto não há foto do ambiente: gradiente + "prédio" de 4 andares. */
function SpaceScene({ space }: { space: SpaceItem }) {
  const { from, to, accent } = space.scene;

  return (
    <div
      className="absolute inset-0"
      style={{ background: `radial-gradient(120% 90% at 85% 15%, ${to} 0%, ${from} 60%, #07080a 100%)` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(242_241_236/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(242_241_236/0.07)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Andares empilhados em perspectiva */}
      <div className="absolute right-[8%] top-1/2 w-[46%] -translate-y-1/2 [perspective:900px] lg:left-[36%] lg:right-auto lg:w-[26%]">
        {/* Rotação fica num wrapper estático; os andares animam só `y` */}
        <div style={{ transform: "rotateX(52deg) rotateZ(-8deg)" }}>
          <m.div
            className="flex flex-col gap-4"
            variants={staggerContainer({ stagger: 0.08, delay: 0.15 })}
            initial="hidden"
            animate="visible"
          >
            {Array.from({ length: FLOORS }, (_, i) => (
              <m.div
                key={i}
                className="h-14 rounded-xl border md:h-20"
                style={{
                  borderColor: accent,
                  marginLeft: `${(FLOORS - 1 - i) * 6}%`,
                  background: `linear-gradient(90deg, ${accent}22, transparent)`,
                }}
                variants={{
                  hidden: { opacity: 0, y: -30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
                }}
              />
            ))}
          </m.div>
        </div>
      </div>

      <span
        aria-hidden
        className="hollow absolute -bottom-[0.15em] left-0 select-none whitespace-nowrap font-display text-[18vw] font-bold uppercase leading-none tracking-[-0.06em] text-paper/20 lg:text-[12vw]"
      >
        {space.name}
      </span>
    </div>
  );
}

interface SpaceVisualProps {
  space: SpaceItem;
  className?: string;
}

/** Visual do ambiente ativo, com crossfade + leve zoom-out na troca. */
export function SpaceVisual({ space, className }: SpaceVisualProps) {
  return (
    <div className={cn("relative overflow-hidden bg-ink", className)}>
      <AnimatePresence initial={false}>
        <m.div
          key={space.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.7, ease: "easeOut" }, scale: { duration: 1.4, ease: EASE_OUT_EXPO } }}
        >
          {space.image ? (
            <Image
              src={space.image}
              alt={space.name}
              fill
              sizes="(min-width: 1024px) 100vw, 90vw"
              className="object-cover"
            />
          ) : (
            <SpaceScene space={space} />
          )}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
