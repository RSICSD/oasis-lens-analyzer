import type { PocSnapshot } from "@/lib/poc-data";
import { Banknote, CheckCircle2, CalendarClock, FileCheck2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function KpiStrip({ data }: { data: PocSnapshot }) {
  const { lang, t } = useI18n();
  const numLocale = lang === "ar" ? "ar-EG" : "en-US";

  const allocated = data.funding.reduce((s, f) => s + f.allocated_usd, 0);
  const received = data.funding.reduce((s, f) => s + f.received_usd, 0);
  const fundingPct = allocated > 0 ? Math.round((received / allocated) * 100) : 0;

  const wpDone = data.work_packages.filter((w) => w.status === "done").length;
  const wpPct = data.work_packages.length
    ? Math.round((wpDone / data.work_packages.length) * 100)
    : 0;

  const done = data.work_packages.filter((w) => w.status === "done" && w.actual_end);
  const avgDelta = done.length
    ? Math.round(
        done.reduce((s, w) => {
          const d =
            (new Date(w.actual_end!).getTime() - new Date(w.planned_end).getTime()) /
            86400000;
          return s + d;
        }, 0) / done.length,
      )
    : 0;

  const docs = data.documents.length;

  const scheduleValue =
    avgDelta === 0
      ? t("poc.kpi.schedule.onTime")
      : avgDelta > 0
        ? t("poc.kpi.schedule.late", { n: avgDelta })
        : t("poc.kpi.schedule.early", { n: Math.abs(avgDelta) });

  const cards = [
    {
      label: t("poc.kpi.funding"),
      value: `${fundingPct}%`,
      sub: t("poc.kpi.funding.sub", { r: received.toLocaleString(numLocale), a: allocated.toLocaleString(numLocale) }),
      Icon: Banknote,
      color: "text-primary",
    },
    {
      label: t("poc.kpi.progress"),
      value: `${wpPct}%`,
      sub: t("poc.kpi.progress.sub", { d: wpDone, t: data.work_packages.length }),
      Icon: CheckCircle2,
      color: "text-primary",
    },
    {
      label: t("poc.kpi.schedule"),
      value: scheduleValue,
      sub: t("poc.kpi.schedule.sub"),
      Icon: CalendarClock,
      color: avgDelta > 5 ? "text-destructive" : "text-primary",
    },
    {
      label: t("poc.kpi.docs"),
      value: String(docs),
      sub: t("poc.kpi.docs.sub"),
      Icon: FileCheck2,
      color: "text-primary",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
            <c.Icon className={`h-5 w-5 ${c.color}`} />
          </div>
          <p className="mt-2 text-3xl font-bold text-primary">{c.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
