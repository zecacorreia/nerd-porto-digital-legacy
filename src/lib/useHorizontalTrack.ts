"use client";

import { useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";

export interface HorizontalTrackMeasure {
  /** Distância horizontal total que o trilho percorre (px). */
  total: number;
  viewportWidth: number;
}

interface HorizontalTrackOptions {
  /** Chamado a cada medição (montagem e resize), p.ex. para calcular marcos do trilho. */
  onMeasure?: (measure: HorizontalTrackMeasure) => void;
}

const TRACK_SPRING = { stiffness: 160, damping: 32, mass: 0.3 } as const;

/**
 * Converte scroll vertical em deslocamento horizontal de um trilho dentro de um container sticky.
 * A seção ganha altura = distância do trilho + 1 viewport, então 1px de scroll = 1px de trilho.
 *
 * Uso: `<section ref={sectionRef} style={{ height: sectionHeight }}>` →
 * `<div className="sticky top-0 h-screen overflow-hidden">` → `<m.div ref={trackRef} style={{ x }}>`.
 */
export function useHorizontalTrack(
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  { onMeasure }: HorizontalTrackOptions = {},
) {
  const distance = useMotionValue(0);
  const [sectionHeight, setSectionHeight] = useState<number>();
  const onMeasureRef = useRef(onMeasure);

  useEffect(() => {
    onMeasureRef.current = onMeasure;
  }, [onMeasure]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function measure() {
      if (!track) return;
      const viewportWidth = window.innerWidth;
      const total = Math.max(track.scrollWidth - viewportWidth, 1);
      distance.set(total);
      setSectionHeight(total + window.innerHeight);
      onMeasureRef.current?.({ total, viewportWidth });
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distance, trackRef]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const rawX = useTransform(() => -scrollYProgress.get() * distance.get());
  const x = useSpring(rawX, TRACK_SPRING);

  return { x, scrollYProgress, sectionHeight };
}
