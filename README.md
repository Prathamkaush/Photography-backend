# Kaushik Photography - Server

## Quick start
```bash
cp .env.example .env
# edit DATABASE_URL
npm install
npm run migrate
npm run seed
npm run dev
```
API routes:
- `GET /api/health`
- `GET /api/products`
- `POST /api/products`
- `GET /api/gallery?category=wedding|reception|birthday|family|other`
- `POST /api/bookings`
