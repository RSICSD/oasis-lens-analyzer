import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { nav, siteI18n } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import logoAsset from "@/assets/rsic-logo-color.png.asset.json";

export function Header() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  return (
    <header className="sticky top-0 z-40 bg-background/96 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* ── Logo ── */}
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 p-1.5 ring-1 ring-primary/20">
            <img
              src={logoAsset.url}
              alt="RSIC"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="hidden sm:block leading-none">
            <p className="font-display text-sm font-bold text-primary">
              {siteI18n.name[lang]}
            </p>
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              RSIC
            </p>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative rounded-lg px-3 py-2 text-sm font-medium text-foreground/60 transition-colors hover:bg-primary/8 hover:text-primary"
              activeProps={{ className: "bg-primary/10 text-primary font-semibold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(`nav.${item.to}`)}
              {"live" in item && (item as { live?: boolean }).live && (
                <span className="absolute end-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
              )}
            </Link>
          ))}
        </nav>

        {/* ── Actions ── */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Language pill */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t("lang.aria")}
            className="flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 text-xs font-bold text-foreground/60 transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "ar" ? "EN" : "عر"}
          </button>

          {/* Donate CTA — gold accent */}
          <Link
            to="/donate"
            className="hidden items-center rounded-full bg-accent px-5 py-2 text-sm font-bold text-accent-foreground shadow-sm transition-opacity hover:opacity-90 md:inline-flex"
          >
            {t("cta.donate")}
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border/70 transition-colors hover:bg-secondary lg:hidden"
            aria-label={open ? t("menu.close") : t("menu.open")}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <div className="mx-auto max-w-7xl px-4 pb-5 pt-3">
            <nav className="flex flex-col gap-0.5">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="relative flex items-center rounded-xl px-4 py-3 text-base font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
                  activeProps={{ className: "bg-primary/10 text-primary font-semibold" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {t(`nav.${item.to}`)}
                  {"live" in item && (item as { live?: boolean }).live && (
                    <span className="ms-auto h-2 w-2 shrink-0 rounded-full bg-accent" />
                  )}
                </Link>
              ))}
            </nav>

            <Link
              to="/donate"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-center rounded-xl bg-accent px-4 py-3.5 text-base font-bold text-accent-foreground"
            >
              {t("cta.donate")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
