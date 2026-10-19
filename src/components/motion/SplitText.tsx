"use client";

import { m } from "framer-motion";
import { Fragment } from "react";

import { letterReveal, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

type SplitTag = "h1" | "h2" | "h3" | "p" | "span";

interface SplitTextProps {
  text: string;
  as?: SplitTag;
  className?: string;
  /** Palavras (exatas, incluindo pontuação) que recebem `highlightClassName`. */
  highlight?: readonly string[];
  highlightClassName?: string;
  delay?: number;
  stagger?: number;
  /**
   * `mount`: anima quando `play` vira true (ex.: após o preloader).
   * `inView`: anima ao entrar na viewport.
   */
  trigger?: "mount" | "inView";
  play?: boolean;
}

/**
 * Revela o texto letra por letra. Cada palavra é uma máscara (`overflow-hidden`)
 * para que as letras subam "de dentro" da linha. O texto completo fica
 * disponível para leitores de tela via `aria-label`.
 */
export function SplitText({
  text,
  as: Tag = "span",
  className,
  highlight = [],
  highlightClassName = "text-brand",
  delay = 0,
  stagger = 0.025,
  trigger = "mount",
  play = true,
}: SplitTextProps) {
  const words = text.split(" ");

  const animationProps =
    trigger === "inView"
      ? { whileInView: "visible", viewport: viewportOnce }
      : { animate: play ? "visible" : "hidden" };

  return (
    <Tag className={className} aria-label={text}>
      <m.span
        aria-hidden
        className="inline"
        variants={staggerContainer({ stagger, delay })}
        initial="hidden"
        {...animationProps}
      >
        {words.map((word, wordIndex) => (
          <Fragment key={`${word}-${wordIndex}`}>
            <span
              className={cn(
                "-mb-[0.12em] inline-block overflow-hidden whitespace-nowrap pb-[0.12em] align-top",
                highlight.includes(word) && highlightClassName,
              )}
            >
              {Array.from(word).map((char, charIndex) => (
                <m.span
                  key={`${char}-${charIndex}`}
                  variants={letterReveal}
                  className="inline-block origin-bottom-left"
                >
                  {char}
                </m.span>
              ))}
            </span>
            {wordIndex < words.length - 1 && " "}
          </Fragment>
        ))}
      </m.span>
    </Tag>
  );
}
