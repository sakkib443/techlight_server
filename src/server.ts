// ===================================================================
// Techlight IT Institute LMS - Server Entry Point (Vercel Serverless Compatible)
// সার্ভার শুরু করার মূল ফাইল - MongoDB connect এবং server start
// ===================================================================

import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

// ==================== Uncaught Exception Handler ====================
process.on('uncaughtException', (error) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error('Error:', error.message);
  console.error(error.stack);
  process.exit(1);
});

// ==================== MongoDB Connection Caching ====================
// Vercel Serverless এর জন্য connection caching - গুরুত্বপূর্ণ!
interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: CachedConnection | undefined;
}

const cached: CachedConnection = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable buffering to fail fast if no connection
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000, // Lower timeout for faster failure/retry
      socketTimeoutMS: 45000,
    };

    console.log('🔌 Connecting to MongoDB...');
    cached.promise = mongoose.connect(config.database_url, opts).then((mongoose) => {
      console.log('✅ MongoDB Connected');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error('❌ MongoDB Connection Error:', error);
    throw error;
  }

  return cached.conn;
}

// ==================== Cleanup Stale Indexes ====================
async function cleanupStaleIndexes() {
  try {
    const db = mongoose.connection.db;
    if (!db) return;

    const collections = await db.listCollections().toArray();
    const usersCollection = collections.find(c => c.name === 'users');

    if (usersCollection) {
      const indexes = await db.collection('users').indexes();
      const staleIndex = indexes.find((idx: any) => idx.name === 'id_1');

      if (staleIndex) {
        await db.collection('users').dropIndex('id_1');
        console.log('🧹 Dropped stale id_1 index from users collection');
      }
    }
  } catch (error) {
    // Silently ignore if index doesn't exist
  }
}

// ==================== Connect DB immediately ====================
// Vercel এ এই connection serverless function start হওয়ার সাথে সাথে শুরু হবে
connectDB().then(() => {
  cleanupStaleIndexes();
}).catch((error) => {
  console.error('❌ Initial MongoDB connection failed:', error);
});

// ==================== Local Development Server ====================
// শুধুমাত্র local development এ server চালু হবে
if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(config.port, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║                                              ║');
    console.log('║   🎓 Techlight IT Institute LMS Server Started!        ║');
    console.log('║                                              ║');
    console.log(`║   🌐 URL: http://localhost:${config.port}               ║`);
    console.log(`║   🔧 Environment: ${config.env.padEnd(21)}   ║`);
    console.log('║                                              ║');
    console.log('╚══════════════════════════════════════════════╝');
    console.log('');
  });

  process.on('unhandledRejection', (error: Error) => {
    console.error('💥 UNHANDLED REJECTION! Shutting down...');
    console.error('Error:', error.message);
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received. Shutting down gracefully...');
    server.close(() => {
      console.log('💤 Process terminated.');
    });
  });
}

// ==================== Export for Vercel ====================
export default app;
