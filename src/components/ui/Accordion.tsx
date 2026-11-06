"use client";

import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

import { EASE_OUT_EXPO, transitions } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  title: string;
  /** Texto curto à direita do título (ex.: contagem). */
  meta?: string;
  content: ReactNode;
}

interface AccordionProps {
  items: readonly AccordionItemData[];
  defaultOpenId?: string | null;
  className?: string;
}

/** Accordion de item único aberto, com altura animada e linha que cresce no item ativo. */
export function Accordion({ items, defaultOpenId = null, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);
  const baseId = useId();

  return (
    <div className={cn("border-b border-current/15", className)}>
      {items.map((item, index) => {
        const isOpen = item.id === openId;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id} className="relative border-t border-current/15">
            <m.span
              aria-hidden
              className="absolute -top-px left-0 h-px w-full origin-left bg-brand"
              initial={false}
              animate={{ scaleX: isOpen ? 1 : 0 }}
              transition={transitions.reveal}
            />
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="group flex w-full items-center gap-5 py-6 text-left md:gap-8 md:py-8"
              >
                <span className="w-8 font-display text-sm tabular-nums opacity-40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.02em] transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                  {item.title}
                </span>
                {item.meta && (
                  <span className="ml-auto hidden text-xs uppercase tracking-[0.12em] opacity-50 md:block">
                    {item.meta}
                  </span>
                )}
                <m.span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-current/25 transition-colors duration-500",
                    !item.meta && "ml-auto",
                    item.meta && "ml-auto md:ml-0",
                    isOpen && "border-brand bg-brand text-paper",
                  )}
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={transitions.fast}
                >
                  <Plus className="h-5 w-5" aria-hidden />
                </m.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ height: { duration: 0.6, ease: EASE_OUT_EXPO }, opacity: { duration: 0.3 } }}
                >
                  <div className="pb-10 md:pl-16">{item.content}</div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
