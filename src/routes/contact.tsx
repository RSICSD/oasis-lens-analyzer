import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, CheckCircle2, Loader2 } from "lucide-react";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RSIC" },
      { name: "description", content: "Contact the RSIC initiative team." },
      { property: "og:title", content: "Contact — RSIC" },
      { property: "og:description", content: "Contact form and details." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const schema = z.object({
    name: z.string().trim().min(2, t("contact.f.err.name")).max(100),
    email: z.string().trim().email(t("contact.f.err.email")).max(255),
    message: z.string().trim().min(10, t("contact.f.err.message")).max(2000),
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const parsed = schema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        if (issue.path[0]) fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }
    setErrors({});
    setSubmitting(true);

    const { error } = await supabase.from("contact_submissions").insert(parsed.data);
    setSubmitting(false);
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("sent");
    form.reset();
  }

  return (
    <PageShell>
      <PageHeader eyebrow={t("contact.eyebrow")} title={t("contact.title")} />
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <aside className="space-y-4 lg:col-span-1">
          <a
            href={`tel:${site.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/60"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <Phone className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {t("contact.phone")}
              </span>
              <span dir="ltr" className="block truncate text-base font-semibold text-primary">
                {site.phone}
              </span>
            </span>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/60"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {t("contact.email")}
              </span>
              <span dir="ltr" className="block truncate text-base font-semibold text-primary">
                {site.email}
              </span>
            </span>
          </a>
        </aside>

        {status === "sent" ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-card p-10 text-center lg:col-span-2">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <p className="mt-4 text-lg font-bold text-primary">{t("contact.f.sent")}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-4 text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              {t("contact.f.again")}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8 lg:col-span-2"
            noValidate
          >
            <Field label={t("contact.f.name")} name="name" error={errors.name} />
            <Field label={t("contact.f.email")} name="email" type="email" error={errors.email} dir="ltr" />
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                {t("contact.f.message")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                aria-invalid={!!errors.message}
                className={`mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                  errors.message ? "border-destructive" : "border-input focus:border-ring"
                }`}
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("contact.f.submit")}
            </button>
            {status === "error" && Object.keys(errors).length === 0 && (
              <p className="text-sm text-destructive">{t("contact.f.err.generic")}</p>
            )}
          </form>
        )}
      </section>
    </PageShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  dir,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        dir={dir}
        aria-invalid={!!error}
        className={`mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring/40 ${
          error ? "border-destructive" : "border-input focus:border-ring"
        }`}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
