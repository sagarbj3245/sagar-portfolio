"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/admin-api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await adminLogin(username, password);
      router.push("/admin");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent focus:outline-none";

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <h1 className="font-serif text-3xl text-foreground">Admin</h1>
        <p className="mt-2 text-sm text-muted">Sign in to manage your portfolio.</p>

        <div className="mt-6 flex flex-col gap-4">
          <input
            className={inputClass}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            className={inputClass}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent-strong disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      </form>
    </div>
  );
}
