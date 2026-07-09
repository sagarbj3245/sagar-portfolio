import mongoose from "mongoose";

// The backend is the sole owner of MongoDB. This is the only place a
// database connection is opened.
export async function connectDb(uri: string): Promise<typeof mongoose> {
  const conn = await mongoose.connect(uri);
  // eslint-disable-next-line no-console
  console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  return conn;
}

export async function disconnectDb(): Promise<void> {
  await mongoose.disconnect();
}
