import { env } from './env.config.js';

import pg, { Client } from 'pg';
import { AppError } from "../utils/errors/errors.util.js";

const { Pool } = pg;

export const db = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}); 


export const connectToDb = async () => {
  try {
    const client = await db.connect();
    console.log("Connected to the database successfully.");
    console.log(client)
  }

  catch(error) {
    throw new AppError(500, `Failed to connect to the database: ${error}`);
  }
}