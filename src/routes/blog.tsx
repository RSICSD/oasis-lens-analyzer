import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import {
  FileText,
  Download,
  Calendar,
  Newspaper,
  BookOpen,
  ArrowUpLeft,
  Sparkles,
} from "lucide-react";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  articlesByLang,
  articlesQueryOptions,
  reportsQueryOptions,
  newsQueryOptions,
  formatDate,
} from "@/lib/content";
import { useI18n } from "@/lib/i18n";

const blogSearchSchema = z.object({
  tab: z.enum(["articles", "reports", "news"]).optional(),
});

export const Route = createFileRoute("/blog")({
  validateSearch: blogSearchSchema,
  head: () => ({
    meta: [
      { title: "Blog — RSIC articles, reports, and news" },
      { name: "description", content: "Articles, reports, and news about the RSIC initiative." },
      { property: "og:title", content: "Blog — RSIC" },
      { property: "og:description", content: "Articles, PDF reports, and initiative news." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "RSIC Blog",
          description: "Articles, reports, and news from the RSIC initiative.",
          inLanguage: "en",
          blogPost: articlesByLang.en.map((a) => ({
            "@type": "BlogPosting",
            headline: a.title,
            datePublished: a.date,
            author: { "@type": "Person", name: a.author },
            description: a.excerpt,
          })),
        }),
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { lang, t } = useI18n();
  const { data: articles } = useQuery(articlesQueryOptions(lang));
  const { data: news } = useQuery(newsQueryOptions(lang));
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();
  const activeTab = tab ?? "articles";

  useEffect(() => {
    if (activeTab !== "news") return;
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-accent");
      const timeout = setTimeout(() => el.classList.remove("ring-2", "ring-accent"), 2400);
      return () => clearTimeout(timeout);
    }
  }, [activeTab]);

  return (
    <PageShell>
      <PageHeader eyebrow={t("blog.eyebrow")} title={t("blog.title")} description={t("blog.desc")} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Tabs
          value={activeTab}
          onValueChange={(v) =>
            navigate({ search: { tab: v as "articles" | "reports" | "news" }, replace: true })
          }
          className="w-full"
        >
          <TabsList className="grid h-auto w-full max-w-xl grid-cols-3 gap-1 rounded-xl bg-secondary p-1.5">
            <TabsTrigger
              value="articles"
              className="gap-2 rounded-lg py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
            >
              <BookOpen className="h-4 w-4" />
              {t("blog.tab.articles")}
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="gap-2 rounded-lg py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
            >
              <FileText className="h-4 w-4" />
              {t("blog.tab.reports")}
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="gap-2 rounded-lg py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
            >
              <Newspaper className="h-4 w-4" />
              {t("blog.tab.news")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="mt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <article
                  key={a.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl"
                >
                  <span className="h-1.5 w-full bg-gradient-to-l from-accent to-primary" />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {a.author.trim().charAt(0)}
                      </span>
                      <div className="min-w-0 leading-tight">
                        <p className="truncate text-sm font-semibold text-foreground">{a.author}</p>
                        <p className="inline-flex items-center gap-1 text-xs text-muted-foreground" dir="ltr">
                          <Calendar className="h-3 w-3" />
                          {formatDate(a.date, lang)}
                        </p>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {a.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-loose text-muted-foreground">{a.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      {t("blog.readmore")}
                      <ArrowUpLeft className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-8">
            <ReportsViewer />
          </TabsContent>

          <TabsContent value="news" className="mt-8">
            {news.length > 0 && (
              <article
                id={`news-${news[0].id}`}
                className="group relative mb-6 scroll-mt-24 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-l from-primary via-forest-deep to-graphite p-8 text-primary-foreground shadow-lg transition-all"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: "radial-gradient(white 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />
                <div className="absolute -end-10 -top-10 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                      <Sparkles className="h-3.5 w-3.5" />
                      {t("blog.latest")}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/80" dir="ltr">
                      <Calendar className="h-4 w-4" />
                      {formatDate(news[0].date, lang)}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">{news[0].title}</h3>
                  <p className="mt-3 max-w-3xl text-base leading-loose text-primary-foreground/85">
                    {news[0].excerpt}
                  </p>
                </div>
              </article>
            )}

            <ol className="relative space-y-4 border-s-2 border-border ps-6">
              {news.slice(1).map((n) => (
                <li key={n.id} className="relative">
                  <span className="absolute -start-[1.7rem] top-6 h-3 w-3 rounded-full border-2 border-background bg-accent" />
                  <article
                    id={`news-${n.id}`}
                    className="scroll-mt-24 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
                  >
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground" dir="ltr">
                      <Calendar className="h-3 w-3" />
                      {formatDate(n.date, lang)}
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-foreground">{n.title}</h3>
                    <p className="mt-2 text-sm leading-loose text-muted-foreground">{n.excerpt}</p>
                  </article>
                </li>
              ))}
            </ol>
          </TabsContent>
        </Tabs>
      </section>
    </PageShell>
  );
}

function ReportsViewer() {
  const { lang, t } = useI18n();
  const { data: reports } = useQuery(reportsQueryOptions(lang));
  const [active, setActive] = useState(reports[0]);

  // re-sync when language changes
  useEffect(() => {
    setActive(reports[0]);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <aside className="lg:col-span-4">
        <ul className="space-y-3">
          {reports.map((r) => {
            const isActive = r.id === active.id;
            return (
              <li key={r.id}>
                <button
                  onClick={() => setActive(r)}
                  className={`w-full rounded-xl border p-4 text-start transition-all ${
                    isActive
                      ? "border-accent bg-accent/10 shadow-sm ring-1 ring-accent/30"
                      : "border-border bg-card hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors ${
                        isActive ? "bg-accent text-accent-foreground" : "bg-accent/10 text-accent"
                      }`}
                    >
                      <FileText className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground">{r.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {r.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1" dir="ltr">
                          <Calendar className="h-3 w-3" />
                          {formatDate(r.date, lang)}
                        </span>
                        <span>{r.pages} {t("blog.pages")}</span>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="lg:col-span-8">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary px-4 py-3">
            <h3 className="min-w-0 truncate font-bold text-foreground">{active.title}</h3>
            <a
              href={active.url}
              download
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              {t("blog.download")}
            </a>
          </div>
          <iframe
            key={active.id}
            src={`${active.url}#view=FitH`}
            title={active.title}
            className="h-[70vh] w-full bg-white"
          />
        </div>
      </div>
    </div>
  );
}
