// scratch/test-db-connection.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not defined');
  process.exit(1);
}

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGODB_URI as string);
    console.log('Successfully connected to MongoDB!');
    
    // Fix for 'mongoose.connection.db' is possibly 'undefined'
    // We check if it exists before using it to satisfy TypeScript
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection established but "db" object is undefined');
    }

    // List collections to verify access
    const collections = await db.listCollections().toArray();
    console.log('Collections in database:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

testConnection();
