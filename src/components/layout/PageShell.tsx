import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import logoUrl from "@/assets/rsic-logo.png";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageBanner() {
  return (
    <div className="relative h-40 w-full overflow-hidden border-b border-border bg-gradient-to-l from-primary via-forest-deep to-graphite sm:h-56 lg:h-64">
      {/* Subtle dotted grain */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      {/* Gold glow accent */}
      <div className="absolute -end-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
      {/* Logo watermark */}
      <img
        src={logoUrl}
        alt=""
        aria-hidden="true"
        className="absolute end-6 top-1/2 h-32 w-auto -translate-y-1/2 opacity-90 drop-shadow-lg sm:h-40 lg:h-48"
      />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  banner = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  banner?: boolean;
}) {
  return (
    <>
      {banner && <PageBanner />}
      <section className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          {eyebrow && <p className="section-number mb-3 text-sm">{eyebrow}</p>}
          <h1 className="text-4xl font-bold text-primary sm:text-5xl">{title}</h1>
          {description && (
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{description}</p>
          )}
        </div>
      </section>
    </>
  );
}

