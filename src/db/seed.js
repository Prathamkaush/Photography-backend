import { pool } from './pool.js'

try {
  await pool.query(
    "INSERT INTO products (name, price, image_url) VALUES ($1,$2,$3), ($4,$5,$6), ($7,$8,$9)",
    ['Custom T-Shirt', 299, '/tshirt.jpg',
     'Printed Mug', 199, '/mug.jpg',
     'Photo Frame', 399, '/frame.jpg']
  )
  await pool.query(
    "INSERT INTO gallery (title, category, image_url) VALUES ($1,$2,$3), ($4,$5,$6), ($7,$8,$9)",
    ['Bride & Groom', 'wedding', '/g1.jpg',
     'Birthday Cake', 'birthday', '/g2.jpg',
     'Reception Couple', 'reception', '/g3.jpg']
  )
  console.log('Seeded sample data.')
} catch (e) {
  console.error('Seed error:', e)
} finally {
  await pool.end()
}
