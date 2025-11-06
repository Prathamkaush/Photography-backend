import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { pool } from './db/pool.js'
import productsRouter from './routes/products.js'
import galleryRouter from './routes/gallery.js'
import bookingsRouter from './routes/bookings.js'
import healthRouter from './routes/health.js'
import path from "path";
import { fileURLToPath } from "url";

const app = express()

const PORT = process.env.PORT || 5000
const ORIGIN = process.env.CORS_ORIGIN || '*'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: ORIGIN }))
app.use(express.json({ limit: '2mb' }))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "../client/dist")));

// routes
app.use('/api/health', healthRouter)
app.use('/api/products', productsRouter)
app.use('/api/gallery', galleryRouter)
app.use('/api/bookings', bookingsRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Kaushik Photography API' })
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
