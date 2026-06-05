import dotenv from "dotenv";
dotenv.config();

import pg from "pg";

const { Pool } = pg;

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

try {
  const client = await pool.connect();
  console.log("✅ Connected to Neon");
  client.release();
} catch (err) {
  console.error("❌ DB Connection Error:", err);
}

export default pool;