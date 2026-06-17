import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "مشاريعنا — RSIC" },
      { name: "description", content: "استعرض المجمعات والمشاريع الريفية الصناعية النشطة والمخططة." },
      { property: "og:title", content: "مشاريعنا — RSIC" },
      { property: "og:description", content: "استعرض المجمعات والمشاريع الريفية الصناعية." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

const sample = [
  { name: "مجمع الصعيد الزراعي-الصناعي", region: "محافظة المنيا", status: "نشط", progress: 64 },
  { name: "مركز معالجة الألبان الريفية", region: "كفر الشيخ", status: "قيد التخطيط", progress: 12 },
  { name: "ورشة النخيل للتمور", region: "الوادي الجديد", status: "مكتمل", progress: 100 },
];

function ProjectsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="المشاريع"
        title="مجمعات قيد التنفيذ والتخطيط"
        description="قائمة المشاريع تُحدَّث ديناميكياً من إدارة المحتوى عند ربط Sanity."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sample.map((p) => (
            <article key={p.name} className="rounded-lg border border-border bg-card p-6">
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                {p.status}
              </span>
              <h3 className="mt-4 text-lg font-bold text-foreground">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.region}</p>
              <div className="mt-4">
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${p.progress}%` }}
                    aria-label={`نسبة الإنجاز ${p.progress}%`}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">نسبة الإنجاز: {p.progress}%</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
