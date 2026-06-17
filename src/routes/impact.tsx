import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "الأثر المتوقع — RSIC" },
      { name: "description", content: "الأثر الاقتصادي والاجتماعي والجغرافي لمجمعات التنمية الريفية الصناعية." },
      { property: "og:title", content: "الأثر المتوقع — RSIC" },
      { property: "og:description", content: "أثر اقتصادي واجتماعي وجغرافي قابل للقياس." },
      { property: "og:url", content: "/impact" },
    ],
    links: [{ rel: "canonical", href: "/impact" }],
  }),
  component: ImpactPage,
});

const sections = [
  {
    title: "الأثر الاقتصادي",
    body: "أمن غذائي، فرص عمل ريفية، سيادة صناعية وطنية، وزيادة القيمة المضافة المحلية.",
  },
  {
    title: "الأثر الاجتماعي",
    body: "تنمية ريفية متوازنة، تقليل الهجرة للمدن، وبناء قدرات الكوادر المحلية.",
  },
  {
    title: "الأثر الجغرافي",
    body: "نموذج قابل للتوسع من المحلي إلى الوطني ثم إلى المجال الأوسع للأمة.",
  },
];

function ImpactPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="الأثر المتوقع" title="نتائج قابلة للقياس على ثلاثة مستويات" />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((s, i) => (
            <article key={s.title} className="rounded-lg border border-border bg-card p-6">
              <span className="section-number text-sm">0{i + 1}</span>
              <h2 className="mt-2 text-xl font-bold text-primary">{s.title}</h2>
              <p className="mt-3 leading-loose text-foreground/80">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
