import { ExperienceKind, type Experience } from "@portfolio/shared";
import { getExperiences } from "@/lib/experiences";
import { Reveal } from "./reveal";

function Entry({ e }: { e: Experience }) {
  return (
    <li className="relative border-l border-border pb-8 pl-6 last:pb-0">
      <span
        className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
        aria-hidden
      />
      <p className="text-sm text-muted">
        {e.startDate} — {e.endDate ?? "Present"}
      </p>
      <h4 className="mt-1 font-serif text-xl text-foreground">{e.role}</h4>
      <p className="text-accent">
        {e.org}
        {e.location ? ` · ${e.location}` : ""}
      </p>
      {e.highlights.length > 0 && (
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted">
          {e.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Column({ title, items }: { title: string; items: Experience[] }) {
  return (
    <div>
      <h3 className="mb-6 font-serif text-2xl text-foreground">{title}</h3>
      {items.length > 0 ? (
        <ul>
          {items.map((e) => (
            <Entry key={e.id} e={e} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">Coming soon.</p>
      )}
    </div>
  );
}

export async function ExperienceSection() {
  const all = await getExperiences();
  const work = all
    .filter((e) => e.kind === ExperienceKind.Work)
    .sort((a, b) => a.order - b.order);
  const education = all
    .filter((e) => e.kind === ExperienceKind.Education)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-8 bg-accent" aria-hidden />
          Experience
        </p>

        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <Column title="Work" items={work} />
          <Column title="Education" items={education} />
        </div>
      </Reveal>
    </section>
  );
}
