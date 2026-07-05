import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}); 


export const connectToDb = async () => {
  try {
    await db.connect();
    console.log("Connected to the database successfully.");
  }

  catch(error) {
    throw new Error(`[Error] Failed to connect to the database: ${error}`);
  }
}