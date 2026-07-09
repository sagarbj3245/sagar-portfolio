"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminMe, adminLogout } from "@/lib/admin-api";
import { ProjectsAdmin } from "@/components/admin/projects-admin";
import { MessagesAdmin } from "@/components/admin/messages-admin";

export default function AdminDashboard() {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    adminMe().then((ok) => {
      if (!ok) router.replace("/admin/login");
      else setAuthed(true);
    });
  }, [router]);

  async function onLogout() {
    await adminLogout();
    router.replace("/admin/login");
  }

  if (authed === null) {
    return <p className="p-8 text-muted">Loading…</p>;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-foreground">Dashboard</h1>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-muted hover:text-foreground">
            View site ↗
          </Link>
          <button onClick={onLogout} className="text-muted hover:text-foreground">
            Log out
          </button>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-14">
        <ProjectsAdmin />
        <MessagesAdmin />
      </div>
    </div>
  );
}
