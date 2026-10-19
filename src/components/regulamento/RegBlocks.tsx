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
              <h4 key={key} className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">
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
              <div key={key} className="overflow-x-auto rounded-2xl border border-ink/10">
                <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
                  <thead className="bg-ink text-paper">
                    <tr>
                      {block.head.map((cell) => (
                        <th key={cell} scope="col" className="px-4 py-3 font-medium">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row.join("|")} className="border-t border-ink/10 even:bg-paper-dim/40">
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`${cell}-${cellIndex}`}
                            className={cellIndex === 0 ? "px-4 py-3 text-ink" : "px-4 py-3 tabular-nums"}
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
