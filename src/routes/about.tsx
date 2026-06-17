import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن المشروع — RSIC" },
      { name: "description", content: "مبادرة مجمعات التنمية الريفية الصناعية: الرؤية والرسالة والمنهجية." },
      { property: "og:title", content: "عن المشروع — RSIC" },
      { property: "og:description", content: "الرؤية والرسالة والمنهجية لمبادرة RSIC." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="عن المشروع"
        title="بنية ريفية صناعية متكاملة"
        description="نقدم نموذجاً متكاملاً يحوّل القرية من مستهلك للمنتجات إلى منتج لها، عبر دمج الزراعة والصناعة والمعرفة في مجمع واحد."
      />
      <section className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article>
          <h2 className="text-2xl font-bold text-primary">الرؤية</h2>
          <p className="mt-3 leading-loose text-foreground/85">
            ريف منتج وصناعة لامركزية تحقق السيادة الغذائية وتُبقي القيمة المضافة داخل المجتمع المحلي.
          </p>
        </article>
        <article>
          <h2 className="text-2xl font-bold text-primary">الرسالة</h2>
          <p className="mt-3 leading-loose text-foreground/85">
            تصميم وتشغيل مجمعات تجمع الإنتاج والتصنيع والتدريب والبنية الرقمية في موقع واحد، بمعايير حوكمة شفافة.
          </p>
        </article>
      </section>
    </PageShell>
  );
}
