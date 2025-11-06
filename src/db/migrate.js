import { pool } from './pool.js'

const schema = `
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery (
  id SERIAL PRIMARY KEY,
  title TEXT,
  category TEXT CHECK (category IN ('wedding','reception','birthday','family','other')) DEFAULT 'other',
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  event_type TEXT,
  event_date DATE,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
`

try {
  await pool.query(schema)
  console.log('Migration completed.')
} catch (e) {
  console.error('Migration failed:', e)
} finally {
  await pool.end()
}