import Image from "next/image";
import Link from "next/link";
import { getProjects, prettyCategory } from "@/lib/projects";
import { Reveal } from "./reveal";

export async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-8 bg-accent" aria-hidden />
          Projects
        </p>
      </Reveal>

      {projects.length === 0 ? (
        <p className="mt-6 text-muted">Coming soon.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <Link
                href={`/projects/${p.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest text-accent">
                    {prettyCategory(p.category)}
                  </p>
                  <h3 className="mt-2 font-serif text-xl text-foreground">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{p.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.techTags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
