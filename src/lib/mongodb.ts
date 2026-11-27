import dns from 'node:dns';
import mongoose from 'mongoose';

const DEFAULT_LOCAL_URI = 'mongodb://127.0.0.1:27017/zhi_dimension';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI || DEFAULT_LOCAL_URI;
  const isLocal = uri.includes('127.0.0.1') || uri.includes('localhost');

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Work around Windows Node c-ares defaulting to 127.0.0.1 when resolving SRV records
    if (uri.startsWith('mongodb+srv://')) {
      const isLoopbackOnly = (servers: string[]) =>
        servers.length === 0 || servers.every((ip) => ip === '127.0.0.1' || ip === '::1');

      if (isLoopbackOnly(dns.getServers())) {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
      }
      if (isLoopbackOnly(dns.promises.getServers())) {
        dns.promises.setServers(['8.8.8.8', '1.1.1.1']);
      }
    }

    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: isLocal ? 2000 : 10000,
      connectTimeoutMS: isLocal ? 2000 : 10000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      return mongooseInstance;
    }).catch((err) => {
      cached.promise = null;
      console.error('Failed to connect to MongoDB:', err);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

