// src/lib/db.ts
import mongoose from 'mongoose'

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env.local file')
}

let cached = global._mongooseCache

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null }
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 200,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
