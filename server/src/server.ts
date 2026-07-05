import 'dotenv/config';
import app from './app.js';
import { connectToDb } from './config/db.config.js';

connectToDb();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server has started.");
});