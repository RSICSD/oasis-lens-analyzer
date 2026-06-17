import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "تبرع الآن — RSIC" },
      { name: "description", content: "ادعم مبادرة مجمعات التنمية الريفية الصناعية بتبرع آمن وشفاف." },
      { property: "og:title", content: "تبرع الآن — RSIC" },
      { property: "og:description", content: "تبرع آمن وشفاف عبر بوابة دفع موثوقة." },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: DonatePage,
});

const presets = [100, 250, 500, 1000, 2500];

function DonatePage() {
  const [amount, setAmount] = useState<number>(250);
  const [custom, setCustom] = useState<string>("");
  const [recurring, setRecurring] = useState<"once" | "monthly">("once");

  const final = custom ? Number(custom) : amount;

  return (
    <PageShell>
      <PageHeader
        eyebrow="التبرع"
        title="ساهم في بناء مجمع كامل"
        description="كل مساهمة موثقة وتذهب لمشروع محدد بنتائج قابلة للقياس."
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
          <fieldset>
            <legend className="text-sm font-bold text-foreground">نوع التبرع</legend>
            <div className="mt-3 inline-flex rounded-md border border-border p-1">
              {(["once", "monthly"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setRecurring(k)}
                  className={`rounded px-4 py-2 text-sm font-semibold transition-colors ${
                    recurring === k
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {k === "once" ? "مرة واحدة" : "شهري"}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-bold text-foreground">المبلغ (جنيه مصري)</legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setAmount(p);
                    setCustom("");
                  }}
                  className={`rounded-md border px-3 py-3 text-base font-bold transition-colors ${
                    amount === p && !custom
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-background text-foreground hover:border-accent"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <label htmlFor="custom" className="block text-sm font-semibold text-foreground">
                أو أدخل مبلغاً مخصصاً
              </label>
              <input
                id="custom"
                type="number"
                min={10}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="0"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none"
              />
            </div>
          </fieldset>

          <div className="mt-8 rounded-md bg-secondary p-4 text-sm text-foreground">
            ستتبرع بمبلغ <span className="font-bold text-primary">{final || 0}</span> جنيه{" "}
            {recurring === "monthly" ? "شهرياً" : "كدفعة واحدة"}.
          </div>

          <button
            type="button"
            disabled={!final || final < 10}
            className="mt-6 w-full rounded-md bg-accent px-6 py-3.5 text-base font-bold text-accent-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            متابعة الدفع الآمن
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            بوابة الدفع ستفعّل عند ربط Stripe — يتطلب موافقتك ضمن المرحلة التالية.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
