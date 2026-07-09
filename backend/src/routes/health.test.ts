import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../app";

describe("GET /api/health", () => {
  const app = createApp();

  it("returns 200 with the ok status in the success envelope", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: { status: "ok" } });
  });

  it("returns the api info at /api root", async () => {
    const res = await request(app).get("/api");
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ status: "ok" });
  });
});
