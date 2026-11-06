"use client";

import { AnimatePresence, m, useMotionValue, useSpring, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

import { CURSOR_SPRING, transitions } from "@/lib/animations";
import { useFinePointer } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type CursorVariant = "hidden" | "default" | "link" | "label";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], label, summary, input, textarea, select";

const ringVariants: Variants = {
  hidden: { width: 12, height: 12, opacity: 0 },
  default: {
    width: 36,
    height: 36,
    opacity: 1,
    backgroundColor: "rgb(247 252 251 / 0)",
    borderColor: "rgb(247 252 251 / 1)",
  },
  link: {
    width: 64,
    height: 64,
    opacity: 1,
    backgroundColor: "rgb(247 252 251 / 1)",
    borderColor: "rgb(247 252 251 / 1)",
  },
  label: {
    width: 96,
    height: 96,
    opacity: 1,
    backgroundColor: "rgb(20 80 239 / 1)",
    borderColor: "rgb(20 80 239 / 1)",
  },
};

/**
 * Cursor customizado: um ponto preciso + um anel com atraso (spring).
 * - Sobre links/botões o anel cresce.
 * - Sobre elementos com `data-cursor-label="Texto"` vira um disco com o rótulo.
 * Só existe em dispositivos com ponteiro fino; no toque não renderiza nada.
 */
export function CustomCursor() {
  const finePointer = useFinePointer();
  const [variant, setVariant] = useState<CursorVariant>("hidden");
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, CURSOR_SPRING);
  const ringY = useSpring(y, CURSOR_SPRING);

  useEffect(() => {
    if (!finePointer) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    function handleMove(event: globalThis.PointerEvent) {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target instanceof Element ? event.target : null;
      const labelled = target?.closest<HTMLElement>("[data-cursor-label]");
      if (labelled) {
        setVariant("label");
        setLabel(labelled.dataset.cursorLabel ?? "");
      } else if (target?.closest(INTERACTIVE_SELECTOR)) {
        setVariant("link");
      } else {
        setVariant("default");
      }
    }

    function handleLeave(event: MouseEvent) {
      if (!event.relatedTarget) setVariant("hidden");
    }

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    document.addEventListener("mouseout", handleLeave);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, [finePointer, x, y]);

  if (!finePointer) return null;

  const showDot = variant === "default";

  return (
    <>
      {/*
       * Cada camada é `fixed` com seu próprio blend: o `mix-blend-difference`
       * só inverte contra a página se não estiver dentro de outro stacking context.
       */}
      <m.div
        aria-hidden
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[110] print:hidden",
          variant !== "label" && "mix-blend-difference",
        )}
        style={{ x: ringX, y: ringY }}
        animate={{ scale: pressed ? 0.85 : 1 }}
        transition={transitions.fast}
      >
        <m.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
          variants={ringVariants}
          initial="hidden"
          animate={variant}
          transition={transitions.fast}
        >
          <AnimatePresence>
            {variant === "label" && (
              <m.span
                key={label}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={transitions.fast}
              >
                {label}
              </m.span>
            )}
          </AnimatePresence>
        </m.div>
      </m.div>

      {/* Ponto preciso, sem atraso */}
      <m.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[111] mix-blend-difference print:hidden"
        style={{ x, y }}
      >
        <m.div
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper"
          animate={{ opacity: showDot ? 1 : 0, scale: showDot ? 1 : 0 }}
          transition={transitions.fast}
        />
      </m.div>
    </>
  );
}
