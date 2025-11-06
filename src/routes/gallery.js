import { Router } from 'express'
import { pool } from '../db/pool.js'
const router = Router()

router.get('/', async (req, res) => {
  const { category } = req.query
  let q = 'SELECT * FROM gallery'
  const params = []
  if (category) {
    q += ' WHERE category=$1'
    params.push(category)
  }
  q += ' ORDER BY id DESC'
  const { rows } = await pool.query(q, params)
  res.json(rows)
})

export default router
