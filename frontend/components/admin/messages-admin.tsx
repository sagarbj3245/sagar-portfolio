"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminGet, adminSend } from "@/lib/admin-api";

interface AdminMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export function MessagesAdmin() {
  const qc = useQueryClient();

  const { data: messages = [], isLoading } = useQuery<AdminMessage[]>({
    queryKey: ["admin-messages"],
    queryFn: () => adminGet("/api/messages"),
  });

  const remove = useMutation({
    mutationFn: (id: string) => adminSend("DELETE", `/api/messages/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-messages"] }),
  });

  return (
    <section>
      <h2 className="font-serif text-2xl text-foreground">
        Messages{" "}
        <span className="text-base text-muted">({messages.length})</span>
      </h2>

      <div className="mt-4 flex flex-col gap-3">
        {isLoading && <p className="text-sm text-muted">Loading…</p>}
        {!isLoading && messages.length === 0 && (
          <p className="text-sm text-muted">No messages yet.</p>
        )}
        {messages.map((m) => (
          <div key={m.id} className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-foreground">
                  {m.name}{" "}
                  <a href={`mailto:${m.email}`} className="text-accent hover:underline">
                    &lt;{m.email}&gt;
                  </a>
                </p>
                {m.createdAt && (
                  <p className="text-xs text-muted">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => remove.mutate(m.id)}
                className="text-sm text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
            <p className="mt-2 whitespace-pre-line text-sm text-foreground/90">{m.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
