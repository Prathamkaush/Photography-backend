import pkg from "pg";
import "dotenv/config";
const { Pool } = pkg;

const isNeon = process.env.DATABASE_URL?.includes("neon.tech");

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isNeon ? { rejectUnauthorized: false } : false,
});
