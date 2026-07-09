import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import { AppError, errorHandler, notFoundHandler } from "./error";
import { createApp } from "../app";

describe("error handling", () => {
  it("maps an unknown route to a 404 error envelope", async () => {
    const res = await request(createApp()).get("/api/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body.error).toMatchObject({ code: "NOT_FOUND" });
    expect(typeof res.body.error.message).toBe("string");
  });

  it("maps an AppError to its status and code via the central handler", async () => {
    const app = express();
    app.get("/boom", () => {
      throw new AppError(418, "TEAPOT", "I am a teapot");
    });
    app.use(notFoundHandler);
    app.use(errorHandler);

    const res = await request(app).get("/boom");
    expect(res.status).toBe(418);
    expect(res.body).toEqual({ error: { message: "I am a teapot", code: "TEAPOT" } });
  });

  it("maps an unexpected error to a 500 INTERNAL envelope", async () => {
    const app = express();
    app.get("/kaboom", () => {
      throw new Error("boom");
    });
    app.use(errorHandler);

    const res = await request(app).get("/kaboom");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: { message: "Internal Server Error", code: "INTERNAL" } });
  });
});
