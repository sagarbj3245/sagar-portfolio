import { API_URL } from "./api";

async function parse(res: Response) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message ?? `Request failed (${res.status})`);
  }
  return json.data;
}

export async function adminLogin(username: string, password: string) {
  return parse(
    await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }),
  );
}

export async function adminLogout() {
  return parse(
    await fetch(`${API_URL}/api/auth/logout`, { method: "POST", credentials: "include" }),
  );
}

export async function adminMe(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/auth/me`, { credentials: "include" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function adminGet(path: string) {
  return parse(await fetch(`${API_URL}${path}`, { credentials: "include" }));
}

export async function adminSend(method: string, path: string, body?: unknown) {
  return parse(
    await fetch(`${API_URL}${path}`, {
      method,
      credentials: "include",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    }),
  );
}
