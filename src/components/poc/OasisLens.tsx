// Oasis Lens — national rollout sub-dashboard for /poc.
// Interactive Sudan choropleth + global indices + roadmap + tasks.

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";
import geo from "@/lib/geo/sudan-states.json";
import {
  statesData,
  statusOrder,
  statusMeta,
  globalIndices,
  roadmapTasks,
  roadmapPhases,
  stateById,
  fmtNum,
  pickName,
  pickText,
  type RolloutStatus,
  type StateDatum,
  type TaskStatus,
} from "@/lib/oasis-data";
import { Radar, Map as MapIcon, CheckCircle2, CircleDashed, Loader2, MapPin } from "lucide-react";

const statusById = new Map(statesData.map((s) => [s.id, s.status]));

// Fill per rollout status (semantic tokens only).
const FILL: Record<RolloutStatus, string> = {
  active: "var(--accent)",
  committed: "var(--primary)",
  planned: "var(--secondary)",
};
const FILL_OPACITY: Record<RolloutStatus, number> = { active: 1, committed: 0.62, planned: 1 };

export function OasisLens() {
  const { t, lang } = useI18n();
  const [selected, setSelected] = useState<StateDatum | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const hoverName = hover
    ? pickName(statesData.find((s) => s.id === hover) ?? { name_ar: "", name_en: "" }, lang)
    : null;

  return (
    <section className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
            <Radar className="h-6 w-6" />
          </span>
          <div>
            <p className="section-number text-sm">{t("oasis.eyebrow")}</p>
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">{t("oasis.title")}</h2>
          </div>
        </div>
        <p className="mt-3 max-w-3xl leading-loose text-muted-foreground">{t("oasis.desc")}</p>

        {/* Global indices */}
        <GlobalIndicesStrip />

        {/* Map + roadmap */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="flex items-center gap-2 font-display font-bold text-foreground">
                  <MapIcon className="h-4 w-4 text-primary" />
                  {t("oasis.map.title")}
                </h3>
                <Legend />
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                {hoverName ?? t("oasis.map.hint")}
              </p>

              <SudanMap
                selectedId={selected?.id ?? null}
                hoverId={hover}
                onHover={setHover}
                onSelect={(id) => setSelected(stateById(id) ?? null)}
              />
            </div>
          </div>

          <div className="lg:col-span-4">
            <RoadmapSidebar />
          </div>
        </div>

        {/* Tasks */}
        <TasksPanel />
      </div>

      <StateDetailDrawer state={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </section>
  );
}

function Legend() {
  const { lang } = useI18n();
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
      {statusOrder.map((s) => (
        <li key={s} className="flex items-center gap-1.5">
          <span
            className="h-3 w-3 rounded-sm ring-1 ring-border"
            style={{ background: FILL[s], opacity: FILL_OPACITY[s] }}
          />
          <span className="text-muted-foreground">{pickText(statusMeta[s], lang)}</span>
        </li>
      ))}
    </ul>
  );
}

function SudanMap({
  selectedId,
  hoverId,
  onHover,
  onSelect,
}: {
  selectedId: string | null;
  hoverId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const { lang } = useI18n();
  return (
    <div className="mt-4 overflow-hidden">
      <svg
        viewBox={geo.viewBox}
        className="mx-auto h-auto w-full max-w-2xl"
        role="img"
        aria-label="Sudan states rollout map"
      >
        {geo.states.map((st) => {
          const status = (statusById.get(st.id) ?? "planned") as RolloutStatus;
          const isSel = selectedId === st.id;
          const isHover = hoverId === st.id;
          return (
            <path
              key={st.id}
              d={st.d}
              tabIndex={0}
              role="button"
              aria-label={pickName({ name_ar: st.name_ar, name_en: st.name_en }, lang)}
              onMouseEnter={() => onHover(st.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(st.id)}
              onBlur={() => onHover(null)}
              onClick={() => onSelect(st.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(st.id);
                }
              }}
              style={{
                fill: FILL[status],
                fillOpacity: isHover || isSel ? 1 : FILL_OPACITY[status],
                stroke: isSel ? "var(--accent)" : "var(--background)",
                strokeWidth: isSel ? 2.5 : 1,
                cursor: "pointer",
                outline: "none",
                transition: "fill-opacity .15s ease",
              }}
            />
          );
        })}

        {/* Pulsing marker on the active pilot state */}
        {geo.states
          .filter((s) => statusById.get(s.id) === "active")
          .map((s) => (
            <g key={`m-${s.id}`} style={{ pointerEvents: "none" }}>
              <circle cx={s.cx} cy={s.cy} r={14} fill="var(--accent)" opacity={0.25}>
                <animate attributeName="r" values="10;20;10" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.35;0;0.35" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx={s.cx} cy={s.cy} r={6} fill="var(--accent)" stroke="var(--card)" strokeWidth={2} />
            </g>
          ))}
      </svg>
    </div>
  );
}

function GlobalIndicesStrip() {
  const { lang } = useI18n();
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {globalIndices.map((idx) => (
        <div key={idx.id} className="rounded-xl border border-border bg-card p-4">
          <div className="font-display text-2xl font-bold text-primary sm:text-3xl" dir={lang === "ar" ? "rtl" : "ltr"}>
            {typeof idx.value === "number" ? fmtNum(idx.value, lang) : idx.value}
          </div>
          <div className="mt-1 text-sm font-semibold text-foreground">
            {lang === "ar" ? idx.label_ar : idx.label_en}
          </div>
          <div className="text-xs text-muted-foreground">
            {lang === "ar" ? idx.sub_ar : idx.sub_en}
          </div>
        </div>
      ))}
    </div>
  );
}

function RoadmapSidebar() {
  const { t, lang } = useI18n();
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="font-display font-bold text-foreground">{t("oasis.roadmap.title")}</h3>
      <ol className="mt-4 space-y-4 border-s-2 border-border ps-5">
        {roadmapPhases.map((p) => {
          const tasks = roadmapTasks.filter((tk) => tk.phase === p.phase);
          const done = tasks.every((tk) => tk.status === "done");
          const active = tasks.some((tk) => tk.status === "in_progress");
          return (
            <li key={p.phase} className="relative">
              <span
                className={`absolute -start-[1.65rem] top-1 h-3 w-3 rounded-full border-2 border-card ${
                  done ? "bg-primary" : active ? "bg-accent" : "bg-muted-foreground/40"
                }`}
              />
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {t("oasis.phase")} {fmtNum(p.phase, lang)}
              </p>
              <p className="font-semibold text-foreground">{lang === "ar" ? p.ar : p.en}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const TASK_ICON: Record<TaskStatus, typeof CheckCircle2> = {
  done: CheckCircle2,
  in_progress: Loader2,
  planned: CircleDashed,
};
const TASK_COLOR: Record<TaskStatus, string> = {
  done: "text-primary",
  in_progress: "text-accent",
  planned: "text-muted-foreground",
};

function TasksPanel() {
  const { t, lang } = useI18n();
  const label: Record<TaskStatus, string> = {
    done: t("oasis.task.done"),
    in_progress: t("oasis.task.progress"),
    planned: t("oasis.task.planned"),
  };
  return (
    <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="font-display font-bold text-foreground">{t("oasis.tasks.title")}</h3>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {roadmapTasks.map((tk) => {
          const Icon = TASK_ICON[tk.status];
          return (
            <li
              key={tk.id}
              className="flex items-start gap-3 rounded-xl border border-border bg-background p-3"
            >
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${TASK_COLOR[tk.status]} ${tk.status === "in_progress" ? "animate-spin" : ""}`} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{lang === "ar" ? tk.title_ar : tk.title_en}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t("oasis.phase")} {fmtNum(tk.phase, lang)} · {label[tk.status]}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StateDetailDrawer({
  state,
  onOpenChange,
}: {
  state: StateDatum | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { t, lang } = useI18n();
  const metrics = state
    ? [
        { label: t("oasis.state.localities"), value: state.localities },
        { label: t("oasis.state.complexes"), value: state.complexes },
        { label: t("oasis.state.factories"), value: state.factories },
      ]
    : [];

  return (
    <Sheet open={!!state} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="text-start">
          <SheetTitle className="flex items-center gap-2 text-primary">
            <MapPin className="h-5 w-5" />
            {state ? pickName(state, lang) : ""}
          </SheetTitle>
          <SheetDescription>
            {state ? pickText(statusMeta[state.status], lang) : ""}
          </SheetDescription>
        </SheetHeader>

        {state && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-3 gap-3">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-secondary/40 p-3 text-center">
                  <div className="font-display text-xl font-bold text-primary">{fmtNum(m.value, lang)}</div>
                  <div className="mt-1 text-[11px] leading-tight text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
            <p className="leading-loose text-foreground/85">{lang === "ar" ? state.note_ar : state.note_en}</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
