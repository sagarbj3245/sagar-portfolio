"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProjectCategory, type Project } from "@portfolio/shared";
import { adminGet, adminSend } from "@/lib/admin-api";

interface FormValues {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  techTags: string;
  coverImage: string;
  liveUrl: string;
  githubUrl: string;
  order: number;
}

const empty: FormValues = {
  slug: "",
  title: "",
  category: ProjectCategory.FullStack,
  summary: "",
  description: "",
  techTags: "",
  coverImage: "/projects/",
  liveUrl: "",
  githubUrl: "",
  order: 0,
};

function toInput(v: FormValues) {
  return {
    slug: v.slug.trim(),
    title: v.title.trim(),
    category: v.category,
    summary: v.summary.trim(),
    description: v.description.trim(),
    techTags: v.techTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    coverImage: v.coverImage.trim(),
    liveUrl: v.liveUrl.trim() || null,
    githubUrl: v.githubUrl.trim() || null,
    order: Number(v.order) || 0,
  };
}

export function ProjectsAdmin() {
  const qc = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["admin-projects"],
    queryFn: () => adminGet("/api/projects"),
  });

  const { register, handleSubmit, reset } = useForm<FormValues>({ defaultValues: empty });

  const save = useMutation({
    mutationFn: (v: FormValues) =>
      editingId
        ? adminSend("PUT", `/api/projects/${editingId}`, toInput(v))
        : adminSend("POST", "/api/projects", toInput(v)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      reset(empty);
      setEditingId(null);
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => adminSend("DELETE", `/api/projects/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-projects"] }),
  });

  function edit(p: Project) {
    setEditingId(p.id);
    reset({
      slug: p.slug,
      title: p.title,
      category: p.category,
      summary: p.summary,
      description: p.description,
      techTags: p.techTags.join(", "),
      coverImage: p.coverImage,
      liveUrl: p.liveUrl ?? "",
      githubUrl: p.githubUrl ?? "",
      order: p.order,
    });
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none";

  return (
    <section>
      <h2 className="font-serif text-2xl text-foreground">Projects</h2>

      {/* List */}
      <div className="mt-4 flex flex-col gap-2">
        {isLoading && <p className="text-sm text-muted">Loading…</p>}
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-2"
          >
            <span className="text-foreground">{p.title}</span>
            <span className="flex gap-3 text-sm">
              <button onClick={() => edit(p)} className="text-accent hover:underline">
                Edit
              </button>
              <button
                onClick={() => remove.mutate(p.id)}
                className="text-red-400 hover:underline"
              >
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit((v) => save.mutate(v))}
        className="mt-6 grid gap-3 rounded-xl border border-border p-4 sm:grid-cols-2"
      >
        <h3 className="sm:col-span-2 text-sm text-muted">
          {editingId ? "Edit project" : "New project"}
        </h3>
        <input className={inputClass} placeholder="slug" {...register("slug")} />
        <input className={inputClass} placeholder="title" {...register("title")} />
        <select className={inputClass} {...register("category")}>
          {Object.values(ProjectCategory).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input className={inputClass} placeholder="order" type="number" {...register("order")} />
        <input
          className={`${inputClass} sm:col-span-2`}
          placeholder="summary"
          {...register("summary")}
        />
        <textarea
          className={`${inputClass} sm:col-span-2`}
          placeholder="description"
          rows={3}
          {...register("description")}
        />
        <input
          className={`${inputClass} sm:col-span-2`}
          placeholder="tech tags (comma separated)"
          {...register("techTags")}
        />
        <input className={inputClass} placeholder="coverImage path" {...register("coverImage")} />
        <input className={inputClass} placeholder="liveUrl (optional)" {...register("liveUrl")} />
        <input
          className={`${inputClass} sm:col-span-2`}
          placeholder="githubUrl (optional)"
          {...register("githubUrl")}
        />

        <div className="sm:col-span-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={save.isPending}
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-background hover:bg-accent-strong disabled:opacity-60"
          >
            {save.isPending ? "Saving…" : editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                reset(empty);
                setEditingId(null);
              }}
              className="text-sm text-muted hover:text-foreground"
            >
              Cancel
            </button>
          )}
          {save.isError && (
            <span className="text-sm text-red-400">{(save.error as Error).message}</span>
          )}
        </div>
      </form>
    </section>
  );
}
