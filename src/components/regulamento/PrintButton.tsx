"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink print:hidden"
    >
      <Printer className="h-4 w-4" aria-hidden />
      Imprimir / PDF
    </button>
  );
}
