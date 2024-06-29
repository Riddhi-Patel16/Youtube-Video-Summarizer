// dbConfig.js

import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg; // Destructure Client from the pg package

// Initialize a new PostgreSQL client
const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Connect to the PostgreSQL database
db.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Export db as the default export
export default db;

