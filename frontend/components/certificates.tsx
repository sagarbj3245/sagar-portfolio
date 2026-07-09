import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "./reveal";

export function Certificates() {
  return (
    <section id="certificates" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-8 bg-accent" aria-hidden />
          Certificates &amp; Achievements
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.certificates.map((cert, i) => (
          <Reveal key={cert.title} delay={i * 0.06}>
            <a
              href={cert.image}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                <Image
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg text-foreground">{cert.title}</h3>
                <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                <p className="mt-0.5 text-sm text-muted">{cert.date}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
