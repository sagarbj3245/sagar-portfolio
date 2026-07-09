import { describe, it, expect, vi } from "vitest";
import request from "supertest";

// Mock the service layer so the route test needs no database.
vi.mock("../services/experience.service", () => ({
  getExperiences: vi.fn(async () => [
    {
      id: "1",
      org: "Byldd",
      role: "Associate Full Stack Engineer",
      kind: "work",
      startDate: "Jun 2026",
      endDate: null,
      order: 1,
      highlights: ["Building scalable web apps."],
    },
  ]),
}));

import { createApp } from "../app";

describe("GET /api/experiences", () => {
  it("returns experiences in the success envelope", async () => {
    const res = await request(createApp()).get("/api/experiences");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0]).toMatchObject({ org: "Byldd", kind: "work" });
  });
});
