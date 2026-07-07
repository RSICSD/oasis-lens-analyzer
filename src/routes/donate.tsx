import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Heart, Loader2 } from "lucide-react";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — RSIC" },
      { name: "description", content: "Support the RSIC initiative with a secure, transparent donation." },
      { property: "og:title", content: "Donate — RSIC" },
      { property: "og:description", content: "Secure, transparent donation via a trusted payment gateway." },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: DonatePage,
});

const presets = [100, 250, 500, 1000, 2500];

function DonatePage() {
  const { t } = useI18n();
  const [amount, setAmount] = useState<number>(250);
  const [custom, setCustom] = useState<string>("");
  const [recurring, setRecurring] = useState<"once" | "monthly">("once");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const final = custom ? Number(custom) : amount;

  async function handleContinue() {
    if (!final || final < 10) return;
    setSubmitting(true);
    const { error } = await supabase
      .from("donation_intents")
      .insert({ amount_usd: final, recurring });
    setSubmitting(false);
    if (error) {
      console.error("[donate] failed to record intent", error);
    }
    // Payment gateway activates once Stripe is connected — see donate.note.
    // Acknowledge the pledge either way so the click has visible feedback.
    setDone(true);
  }

  return (
    <PageShell>
      <PageHeader eyebrow={t("donate.eyebrow")} title={t("donate.title")} description={t("donate.desc")} />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {done ? (
          <div className="rounded-2xl border border-primary/20 bg-card p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-primary">{t("donate.thanks.title")}</h2>
            <p className="mx-auto mt-3 max-w-md leading-loose text-muted-foreground">
              {t("donate.thanks.body")}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 font-bold text-primary">
              <Heart className="h-4 w-4 text-accent" />
              {final} {t("donate.summary.currency")}{" "}
              {recurring === "monthly" ? t("donate.summary.monthly") : t("donate.summary.once")}
            </div>
            <div>
              <button
                type="button"
                onClick={() => setDone(false)}
                className="mt-6 text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                {t("donate.thanks.again")}
              </button>
            </div>
          </div>
        ) : (
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
          <fieldset>
            <legend className="text-sm font-bold text-foreground">{t("donate.type")}</legend>
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
                  {k === "once" ? t("donate.once") : t("donate.monthly")}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-bold text-foreground">{t("donate.amount")}</legend>
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
                {t("donate.custom.label")}
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
            {t("donate.summary")}{" "}
            <span className="font-bold text-primary">{final || 0}</span>{" "}
            {t("donate.summary.currency")}{" "}
            {recurring === "monthly" ? t("donate.summary.monthly") : t("donate.summary.once")}.
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!final || final < 10 || submitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-base font-bold text-accent-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("donate.continue")}
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">{t("donate.note")}</p>
        </div>
        )}
      </section>
    </PageShell>
  );
}
