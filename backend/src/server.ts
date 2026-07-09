import { createApp } from "./app";
import { env } from "./config/env";
import { connectDb } from "./config/db";

async function start() {
  await connectDb(env.mongoUri);

  const app = createApp();
  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${env.port}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", err);
  process.exit(1);
});
