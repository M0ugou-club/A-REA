import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'userAuthDB';

let db;

const connectDB = async () => {
  if (db) return db;
  try {
    const client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
    console.log(`Connected to MongoDB: ${dbName}`);
    return db;
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    throw error;
  }
};

export default connectDB;