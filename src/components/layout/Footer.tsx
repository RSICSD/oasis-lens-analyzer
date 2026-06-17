import { Link } from "@tanstack/react-router";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="grain mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-accent text-accent-foreground">
              R
            </span>
            {site.nameAr}
          </div>
          <p className="mt-4 max-w-md text-sm leading-loose text-primary-foreground/80">
            {site.description}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
            روابط
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-primary-foreground/80 hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
            تواصل
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>
              <a href={`tel:${site.phone.replace(/\s+/g, "")}`} dir="ltr" className="hover:text-accent">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} dir="ltr" className="hover:text-accent">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-primary-foreground/60 sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} {site.nameShort}. جميع الحقوق محفوظة.</span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
