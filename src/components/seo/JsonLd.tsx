interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Dados estruturados (schema.org). `<` é escapado para o JSON nunca fechar a tag script. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
