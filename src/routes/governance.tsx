import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/governance")({
  head: () => ({
    meta: [
      { title: "الحوكمة والتمويل — RSIC" },
      { name: "description", content: "هيكل الحوكمة، فرق العمل، ونموذج التمويل المختلط للمبادرة." },
      { property: "og:title", content: "الحوكمة والتمويل — RSIC" },
      { property: "og:description", content: "هيكل الحوكمة ونموذج التمويل المختلط." },
      { property: "og:url", content: "/governance" },
    ],
    links: [{ rel: "canonical", href: "/governance" }],
  }),
  component: GovernancePage,
});

function GovernancePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="الحوكمة والتمويل"
        title="شفافية في الهيكل والتمويل"
        description="نعتمد التمويل المختلط (Blended Finance) ونموذج عائد مجتمعي لضمان استدامة المشروعات."
      />
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article>
          <h2 className="text-2xl font-bold text-primary">الحوكمة</h2>
          <p className="mt-3 leading-loose text-foreground/85">
            مجلس أمناء مستقل، لجنة تدقيق، وفِرق تشغيل ميدانية لكل مجمع، مع تقارير ربعية متاحة للعموم.
          </p>
        </article>
        <article>
          <h2 className="text-2xl font-bold text-primary">التمويل</h2>
          <p className="mt-3 leading-loose text-foreground/85">
            مزيج من المنح والتمويل الاجتماعي والاستثمار المسؤول، مع آلية لإعادة جزء من العائد للمجتمع المحلي.
          </p>
        </article>
      </section>
    </PageShell>
  );
}
