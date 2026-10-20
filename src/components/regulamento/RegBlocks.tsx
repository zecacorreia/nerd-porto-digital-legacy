import type { RegBlock } from "@/lib/regulamento";

/** Renderiza os blocos de um artigo. Listas usam letras (a, b, c…), como no documento oficial. */
export function RegBlocks({ blocks }: { blocks: readonly RegBlock[] }) {
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "paragraph":
            return <p key={key}>{block.text}</p>;

          case "subheading":
            return (
              <h4 key={key} className="mt-4 font-display text-lg font-semibold tracking-tight text-ink print:mt-2 print:text-[11pt]">
                {block.text}
              </h4>
            );

          case "note":
            return (
              <p key={key} className="text-sm text-ink/55">
                {block.text}
              </p>
            );

          case "list":
            return (
              <ol key={key} className="flex list-[lower-alpha] flex-col gap-2 pl-6 marker:text-ink/45">
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    {item}
                  </li>
                ))}
              </ol>
            );

          case "termList": {
            const items = block.items.map((item) => (
              <li key={item.term} className="pl-1">
                <strong className="font-semibold text-ink">{item.term}:</strong> {item.text}
              </li>
            ));
            return block.ordered === false ? (
              <ul key={key} className="flex flex-col gap-2">
                {items}
              </ul>
            ) : (
              <ol key={key} className="flex list-[lower-alpha] flex-col gap-2 pl-6 marker:text-ink/45">
                {items}
              </ol>
            );
          }

          case "table":
            return (
              <div key={key} className="overflow-x-auto rounded-2xl border border-ink/10 print:overflow-visible print:rounded-none print:border-ink/30">
                <table className="w-full min-w-[28rem] border-collapse text-left text-sm print:min-w-0 print:text-[9.5pt]">
                  <thead className="bg-ink text-paper print:border-b-2 print:border-ink print:bg-transparent print:text-ink">
                    <tr>
                      {block.head.map((cell) => (
                        <th key={cell} scope="col" className="px-4 py-3 font-medium print:px-3 print:py-1.5 print:font-semibold">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row.join("|")} className="border-t border-ink/10 even:bg-paper-dim/40 print:border-ink/20 print:even:bg-transparent">
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`${cell}-${cellIndex}`}
                            className={cellIndex === 0 ? "px-4 py-3 text-ink print:px-3 print:py-1.5" : "px-4 py-3 tabular-nums print:px-3 print:py-1.5"}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
