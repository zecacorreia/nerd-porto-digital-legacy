"use client";

import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
} from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { Preloader } from "@/components/ui/Preloader";

interface IntroContextValue {
  /** `true` assim que o preloader começa a sair — seções de entrada animam a partir daqui. */
  isReady: boolean;
}

const IntroContext = createContext<IntroContextValue>({ isReady: false });

export function useIntro(): IntroContextValue {
  return useContext(IntroContext);
}

interface IntroProviderProps {
  children: ReactNode;
}

export function IntroProvider({ children }: IntroProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const handleComplete = useCallback(() => setIsReady(true), []);

  // Sempre começa do topo e trava o scroll enquanto o preloader está na tela.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = isReady ? "" : "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [isReady]);

  return (
    // LazyMotion + `m.*`: carrega só os recursos de animação usados (sem layout/drag),
    // reduzindo o JS inicial. `strict` acusa erro se alguém usar `motion.*` por engano.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <IntroContext.Provider value={{ isReady }}>
          <AnimatePresence>
            {!isReady && (
              <Preloader key="preloader" onComplete={handleComplete} />
            )}
          </AnimatePresence>
          {children}
        </IntroContext.Provider>
      </MotionConfig>
    </LazyMotion>
  );
}
