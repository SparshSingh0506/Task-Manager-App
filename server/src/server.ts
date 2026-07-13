import { env } from './config/env.config.js';

import app from './app.js';
import { connectToDb } from './config/db.config.js';


connectToDb();

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});