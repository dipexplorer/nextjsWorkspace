import mongoose from "mongoose";

const MONGO_URL = process.env.DB_URL;

if (!MONGO_URL) {
  throw new Error("❌ Missing MONGO_URL in environment variables");
}

// define type for mongoose connection instance
type MongooseType = typeof mongoose;

interface MongooseCache {
  conn: MongooseType | null;
  promise: Promise<MongooseType> | null;
}

// Initialize global cache
let cached = (global as any).mongoose as MongooseCache;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export default async function connectDB(): Promise<MongooseType> {
  // Return cached connection instantly if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // Start the connection ONCE
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URL!, { bufferCommands: false })
      .then(() => mongoose); // `mongoose` is the connected instance
  }

  // Wait for connection to finish & store it
  cached.conn = await cached.promise;
  return cached.conn;
}
