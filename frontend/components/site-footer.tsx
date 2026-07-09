import { site } from "@/content/site";
import { SocialIcon } from "./social-icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted">
          © {year} {site.name}
        </p>

        <nav aria-label="Social links" className="flex items-center gap-3">
          {site.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <SocialIcon label={s.label} className="h-4 w-4" />
            </a>
          ))}
        </nav>

        <a href="#top" className="text-sm text-muted transition-colors hover:text-foreground">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
