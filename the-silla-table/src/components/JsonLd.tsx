/** Renders a JSON-LD structured-data script (spec §3.1 Schema.org). */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is trusted (built from our own MDX front-matter).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
