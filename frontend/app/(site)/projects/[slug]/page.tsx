import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, getProjects, prettyCategory } from "@/lib/projects";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title: project.title,
      description: project.summary,
      images: [{ url: project.coverImage, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <Link href="/#projects" className="text-sm text-muted transition-colors hover:text-accent">
        ← Back to projects
      </Link>

      <p className="mt-8 text-xs uppercase tracking-widest text-accent">
        {prettyCategory(project.category)}
      </p>
      <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">{project.title}</h1>
      <p className="mt-4 text-lg text-muted">{project.summary}</p>

      <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface-2">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.techTags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent-strong"
          >
            Live demo ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent"
          >
            View code ↗
          </a>
        )}
      </div>

      <p className="mt-8 whitespace-pre-line text-lg leading-relaxed text-foreground/90">
        {project.description}
      </p>
    </article>
  );
}
