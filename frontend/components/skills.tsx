import { site } from "@/content/site";
import { Reveal } from "./reveal";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-8 bg-accent" aria-hidden />
          Skills
        </p>
      </Reveal>

      <div className="mt-10 flex flex-col gap-12">
        {site.skillGroups.map((group, i) => (
          <Reveal key={group.area} delay={i * 0.05}>
            <div className="grid gap-4 md:grid-cols-[240px_1fr]">
              <h3 className="font-serif text-3xl text-foreground sm:text-4xl">
                {group.area}
              </h3>
              <ul className="flex flex-wrap gap-2 self-center">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
