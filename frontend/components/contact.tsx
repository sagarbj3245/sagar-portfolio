"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { contactMessageSchema, type ContactMessageInput } from "@portfolio/shared";
import { site } from "@/content/site";
import { SocialIcon } from "./social-icons";
import { Reveal } from "./reveal";

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ContactMessageInput>({
    resolver: zodResolver(contactMessageSchema),
  });

  const [intent, setIntent] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: ContactMessageInput) => {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message ?? "Failed to send message");
      return json.data as { id: string };
    },
    onSuccess: () => reset(),
  });

  const aiDraft = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/ai/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent, name: getValues("name") || undefined }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message ?? "Could not draft a message");
      return json.data.draft as string;
    },
    onSuccess: (draft) => setValue("message", draft, { shouldValidate: true }),
  });

  const inputClass =
    "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent focus:outline-none";

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-8 bg-accent" aria-hidden />
          Contact
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground/80">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
          </span>
          {site.availability}
        </div>

        <h2 className="mt-5 max-w-xl font-serif text-4xl text-foreground">
          Have a project or role in mind? Let&apos;s talk.
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-12 md:grid-cols-[1fr_320px]">
        {/* Direct-send form */}
        <Reveal>
          <form onSubmit={handleSubmit((d) => mutation.mutate(d))} noValidate className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm text-muted">Name</label>
              <input id="name" className={inputClass} placeholder="Your name" {...register("name")} />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-muted">Email</label>
              <input id="email" type="email" className={inputClass} placeholder="you@example.com" {...register("email")} />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
            </div>

            <div className="rounded-lg border border-dashed border-border p-3">
              <label htmlFor="intent" className="block text-sm text-foreground/80">
                ✨ Not sure what to write? Describe it and let AI draft it.
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  id="intent"
                  className={inputClass}
                  placeholder="e.g. hire you for a freelance Next.js project"
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => aiDraft.mutate()}
                  disabled={aiDraft.isPending || intent.trim().length < 3}
                  className="shrink-0 rounded-lg border border-accent px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-background disabled:opacity-50"
                >
                  {aiDraft.isPending ? "Drafting…" : "✨ Draft with AI"}
                </button>
              </div>
              {aiDraft.isError && (
                <p className="mt-1 text-sm text-red-400">{(aiDraft.error as Error).message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm text-muted">Message</label>
              <textarea id="message" rows={5} className={inputClass} placeholder="Tell me a little about it…" {...register("message")} />
              {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-fit rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent-strong disabled:opacity-60"
            >
              {mutation.isPending ? "Sending…" : "Send message"}
            </button>

            {mutation.isSuccess && (
              <p className="text-sm text-accent-2">Thanks — your message was sent. I&apos;ll get back to you soon.</p>
            )}
            {mutation.isError && (
              <p className="text-sm text-red-400">{(mutation.error as Error).message}</p>
            )}
          </form>
        </Reveal>

        {/* Direct email + socials */}
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-muted">Prefer to reach out directly?</p>
              <a href={`mailto:${site.email}`} className="mt-1 inline-block text-lg text-foreground transition-colors hover:text-accent">
                {site.email}
              </a>
              <p className="mt-1 text-sm text-muted">I usually reply within a day.</p>
            </div>

            <div>
              <p className="text-sm text-muted">Call or WhatsApp</p>
              <ul className="mt-1 flex flex-col gap-1">
                {site.phones.map((p) => (
                  <li key={p.href}>
                    <a
                      href={p.href}
                      target={p.href.startsWith("http") ? "_blank" : undefined}
                      rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-foreground transition-colors hover:text-accent"
                    >
                      <span className="text-muted">{p.label}:</span> {p.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm text-muted">Find me on</p>
              <nav aria-label="Social links" className="mt-2 flex items-center gap-3">
                {site.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <SocialIcon label={s.label} className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
