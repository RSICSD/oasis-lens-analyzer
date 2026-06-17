import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {eyebrow && <p className="section-number mb-3 text-sm">{eyebrow}</p>}
        <h1 className="text-4xl font-bold text-primary sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{description}</p>
        )}
      </div>
    </section>
  );
}
