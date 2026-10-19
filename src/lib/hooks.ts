"use client";

import { useSyncExternalStore } from "react";

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

/** Media query reativa, segura para SSR (retorna `serverFallback` no servidor). */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

/**
 * `true` quando o dispositivo tem ponteiro fino com hover (mouse/trackpad).
 * Efeitos de cursor, tilt e magnetismo só devem rodar nesse caso.
 */
export function useFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
