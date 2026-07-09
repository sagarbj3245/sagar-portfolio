import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "./reveal";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal className="grid items-center gap-10 md:grid-cols-[280px_1fr]">
        <Image
          src="/profile.jpg"
          alt={`Portrait of ${site.name}`}
          width={280}
          height={280}
          className="h-64 w-64 justify-self-center rounded-2xl object-cover md:h-[280px] md:w-[280px]"
        />

        <div>
          <p className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent" aria-hidden />
            About
          </p>
          <p className="mt-5 text-lg leading-relaxed text-foreground/90">{site.bio}</p>

          <a
            href={site.cvPath}
            download
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent-strong"
          >
            Download CV
          </a>
        </div>
      </Reveal>
    </section>
  );
}
