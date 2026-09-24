# BigB Warehouse Park

This is the production-ready source code repository for BigB Warehouse Park comprising a React (Vite) Frontend and a Django REST Backend.

## 1. Frontend Installation

The frontend relies strictly on Node and `npm`.
```bash
cd frontend
npm install
```

## 2. Backend Installation

The backend runs on Python `>=3.10` and uses `pip` for packages.
```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate | Unix: source venv/bin/activate
pip install -r requirements.txt
```

## 3. Environment Variables

Create `.env` variables located at `backend/.env`. Refer to `backend/.env.example` regarding required configurations:
- `DEBUG=False` (Requires `DEBUG=False` explicitly for production otherwise will run development fallbacks).
- `SECRET_KEY="..."`
- `ALLOWED_HOSTS="..."`
- `CORS_ALLOWED_ORIGINS="..."`
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST` securely mapped to your PostgreSQL instance.

For the Frontend, copy `VITE_API_URL` locally placing it into `frontend/.env`. Example:
- `VITE_API_URL=https://api.bigbwarehouse.com/api`

## 4. Database Setup

Ensure there is an active PostgreSQL running locally or mapped correctly via AWS/Render mappings pointing towards `DB_URL`/`DB_NAME`. If `DB_NAME` strings are intentionally blank/omitted in `.env`, Django will reliably fall straight backward to standard `db.sqlite3` deployments allowing fast validations.

## 5. Migration Commands

To enforce layouts onto your DB schema:
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

## 6. Superuser Creation

To unlock administration dashboards locally or in production:
```bash
cd backend
python manage.py createsuperuser
```
 *(Follow the CLI prompts)*

## 7. Development Commands

### Frontend
```bash
cd frontend
npm run dev
```

### Backend
```bash
cd backend
python manage.py runserver
```

## 8. Production Deployment Steps

### Vercel (Frontend)
1. Initialize a new project on Vercel pointing directly towards your git `/frontend` folder repository.
2. In Vercel Project settings, assign Framework to `Vite`.
3. Provide Environment Variable `VITE_API_URL`.
4. Render. (A `vercel.json` rewrite file handles SPA bindings automatically).

### Render.com (Backend)
1. Form a Web Service mapping out of `/backend`.
2. Configure settings:
  - Command: `gunicorn config.wsgi:application`
  - Build Command: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
3. Environment mapping relies strictly on inputs assigned via their dashboard matching our explicit `.env.example`.
4. Deploy! HTTPs routes inherently redirect natively based automatically around Whitenoise hooks protecting endpoints permanently.
