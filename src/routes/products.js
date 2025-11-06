import { Router } from 'express'
import { pool } from '../db/pool.js'
const router = Router()

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM products ORDER BY id ASC')
  res.json(rows)
})

router.post('/', async (req, res) => {
  const { name, price, image_url } = req.body
  if (!name || !price) return res.status(400).json({ error: 'name and price required' })
  const { rows } = await pool.query('INSERT INTO products (name, price, image_url) VALUES ($1,$2,$3) RETURNING *',
    [name, price, image_url || null])
  res.status(201).json(rows[0])
})

export default router
