import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { pool } from './db/pool.js';
import productsRouter from './routes/products.js';
import galleryRouter from './routes/gallery.js';
import bookingsRouter from './routes/bookings.js';
import healthRouter from './routes/health.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Allow localhost, main Vercel domain, and all vercel.app subdomains
// ✅ Safe and flexible CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin?.replace(/\/$/, ""); // remove trailing slash if exists

  const allowedOrigins = [
    "http://localhost:5173",
    "https://sumit-photography-pratham-kaushiks-projects.vercel.app",
    /\.vercel\.app$/,
  ];

  const isAllowed = allowedOrigins.some((o) =>
    typeof o === "string" ? o === origin : o.test(origin)
  );

  if (isAllowed) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "../client/dist")));

// ✅ API routes
app.use('/api/health', healthRouter);
app.use('/api/products', productsRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/bookings', bookingsRouter);

// ✅ Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Kaushik Photography API' });
});

// ✅ Fallback for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
