import { Router } from 'express'
import { pool } from '../db/pool.js'
const router = Router()

router.post('/', async (req, res) => {
  const { name, phone, email, event_type, event_date, message } = req.body
  if (!name || !phone) return res.status(400).json({ error: 'name and phone required' })
  const { rows } = await pool.query(
    `INSERT INTO bookings (name, phone, email, event_type, event_date, message)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [name, phone, email || null, event_type || null, event_date || null, message || null]
  )
  res.status(201).json(rows[0])
})

export default router
