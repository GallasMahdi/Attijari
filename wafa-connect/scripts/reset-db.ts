import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Manual .env.local loader
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach((line) => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
        process.env[key.trim()] = value;
      }
    });
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

async function resetDB() {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!);
    console.log('✅ Connected successfully.');

    // Use native collection to avoid schema issues in standalone script
    const guestCollection = mongoose.connection.collection('guests');
    
    console.log('🧹 Clearing guests collection...');
    const result = await guestCollection.deleteMany({});
    
    console.log(`✨ Success! Deleted ${result.deletedCount} documents.`);
    
  } catch (error) {
    console.error('❌ Error resetting database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB.');
    process.exit(0);
  }
}

resetDB();
