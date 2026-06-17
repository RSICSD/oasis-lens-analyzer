import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "المدونة والأخبار — RSIC" },
      { name: "description", content: "آخر الأخبار والمقالات حول مبادرة مجمعات التنمية الريفية الصناعية." },
      { property: "og:title", content: "المدونة والأخبار — RSIC" },
      { property: "og:description", content: "مقالات وأخبار المبادرة." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="المدونة"
        title="مقالات وأخبار"
        description="سيتم تغذية هذه القائمة من Sanity بمجرد ربط نظام إدارة المحتوى."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-muted-foreground">لا توجد مقالات منشورة بعد.</p>
      </section>
    </PageShell>
  );
}
