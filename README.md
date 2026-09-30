# LuxeStrand Hair — Full-Stack Weavon Hair Shop

A complete starter online shop for a weavon/wig hair vendor.

## Included
- Customer registration and login with JWT authentication
- Customer account and order history
- Password hashing and customer/admin role foundation
- Next.js + TypeScript + Tailwind CSS storefront
- Responsive home, shop, product details, cart and checkout pages
- Search and category filtering
- Local cart persistence
- FastAPI backend
- PostgreSQL-ready SQLAlchemy models
- Product and order API endpoints
- Simple admin dashboard starter
- Paystack integration placeholder
- Docker Compose for PostgreSQL
- Environment examples

## Run

### Backend
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

API docs: http://127.0.0.1:8000/docs

## Database
For PostgreSQL:
```bash
docker compose up -d
```
Then copy `.env.example` to `.env` in backend and adjust DATABASE_URL if needed.

This is a production-oriented starter, not a finished payment/security implementation. Before accepting real payments, add authentication, server-side validation, payment verification, secure admin authorization, shipping logic, image storage, and HTTPS.


## Admin authentication

Create the first administrator from the backend:

```bash
cd backend
python create_admin.py
```

Then visit:

`http://localhost:3000/admin/login`

The admin dashboard calls protected `/api/admin/*` endpoints. The backend verifies the JWT and requires `role == "admin"` before allowing product, order, or customer management.

Do not expose the development `JWT_SECRET_KEY` or admin credentials in source control. Set a strong secret in your production environment.
