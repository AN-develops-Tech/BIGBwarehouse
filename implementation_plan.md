# BIGB WAREHOUSE PARK - Implementation Plan

## Phase 1: Project Scaffolding & Architecture (CURRENT)
- [x] Initialized Vite + React frontend with Tailwind CSS v4.
- [x] Placed React Router DOM, Axios, and Lucide React dependencies into `package.json`.
- [x] Set up Django + Django REST Framework backend with virtual environment.
- [x] Installed `psycopg[binary]`, `rest_framework_simplejwt`, `python-dotenv`, and `django-cors-headers`.
- [x] Added `apps` directory with Django applications for `users`, `company`, `facilities`, `gallery`, and `enquiries`.
- [x] Configured environment variables out of `.env` using `python-dotenv`.
- [x] Prepared `.gitignore` and `.env.example` templates for strict security rules.

## Phase 2: Database Models & Django Admin
- Configure PostgreSQL connection safely using environment variables.
- Write Django models for User, Company Info, Facilities, Gallery, and Enquiries.
- Setup custom Django admin to strictly control data logic.
- Verify migrations and test Database interaction in terminal.

## Phase 3: REST API & Authentication
- Serialize database models properly for API response.
- Configure views for GET, POST, and PUT operations based on permission layers.
- Tie Simple JWT correctly to `users` app login mechanism.
- Validate the API using endpoints.

## Phase 4: Frontend UI Skeleton & Routing
- Set up React Router to construct page layout mappings (`Home`, `About`, `Facilities`, `Gallery`, `Location`, `Contact`).
- Create generic visual components (`Navbar`, `Footer`, `Buttons`, `HeroSection`) using Tailwind CSS.
- Stub out standard pages with mockup data layout.
- Validate responsive design features.

## Phase 5: Integration & API Consumption
- Wire up Axios interceptors to pass JWT tokens conditionally to the backend.
- Bring live backend data gracefully to frontend pages.
- Integrate Contact Form handling to submit inquiries to the backend.
- Wire authentication to a protected route Admin Dashboard for data manipulation.

## Phase 6: Polish & Deployment Settings
- Add final design refinements mirroring modern warehouse parks aesthetic themes.
- Wrap application with correct global catch-and-alert handlers.
- Secure frontend build to Vercel and backend to Render pipelines with correct CORS setup and environment settings.
- Conduct final walkthrough confirmation.
