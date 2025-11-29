# PlanSync – Smart Planning for Stress-Free Events

PlanSync is a full-stack event management platform that couples a Django REST Framework backend with a modern React + Vite frontend. It helps planning teams coordinate milestones, collaborate with stakeholders, and surface analytics through a polished, glassmorphism-inspired interface.

## Project Structure

```
PlanSync/
├── backend/               # Django 5 project with DRF and JWT auth
│   ├── config/            # Global settings and URL routing
│   ├── users/             # Custom user model + auth endpoints
│   ├── events/            # Event CRUD APIs
│   ├── dashboard/         # Analytics/statistics endpoint
│   ├── requirements.txt   # Python dependencies
│   └── manage.py
└── frontend/              # React 18 app bootstrapped with Vite
    ├── src/
    │   ├── components/    # Reusable UI building blocks
    │   ├── context/       # Theme + authentication context
    │   ├── pages/         # Home, auth, and dashboard views
    │   └── utils/         # Axios instance and shared helpers
    ├── package.json
    └── vite.config.js
```

## Backend Setup (Django REST Framework)

1. **Create / activate the virtual environment** (already available at `PlanSync/venv`):
   ```powershell
   cd PlanSync
   .\venv\Scripts\activate
   ```

2. **Install dependencies**:
   ```powershell
   pip install -r backend/requirements.txt
   ```

3. **Apply database migrations** (SQLite by default):
   ```powershell
   cd backend
   ..\venv\Scripts\python.exe manage.py migrate
   ```

4. **Run the development server**:
   ```powershell
   ..\venv\Scripts\python.exe manage.py runserver 0.0.0.0:8000
   ```

   The API will be available at `http://localhost:8000/api/`.

### Available API Endpoints

- `POST /api/users/register/` – Register a new user
- `POST /api/users/login/` – Obtain JWT access + refresh tokens
- `POST /api/users/forgot-password/` – Request a password reset email (mock)
- `GET /api/users/profile/` – Retrieve the authenticated user profile
- `GET/POST /api/events/` – List (with role-aware filtering) or create events
- `GET/PATCH/DELETE /api/events/<id>/` – Manage individual events
- `POST /api/events/<id>/remind/` – Send a manual reminder email for an event
- `GET /api/dashboard/stats/` – Return analytics payload for the admin dashboard

**Seeded Admin Account**
```
Email:    admin@plansync.com
Password: admin123
```

## Frontend Setup (React + Vite + Tailwind)

1. **Install Node dependencies** (Node.js 18+ recommended):
   ```powershell
   cd PlanSync/frontend
   npm install
   ```

2. **Start the Vite dev server**:
   ```powershell
   npm run dev
   ```

   The app will open at `http://localhost:5173`.

### Frontend Highlights

- Responsive layout with pastel gradients, glass cards, and smooth Framer Motion transitions
- Dark/light mode toggle persisted via context
- JWT-authenticated routes with role-aware guards for user/admin dashboards
- Interactive calendar, real-time event table, and animated analytics chart (Recharts)

## Running Frontend & Backend Together

Launch both servers in separate terminals:

```powershell
# Terminal 1 – backend
cd PlanSync/backend
..\venv\Scripts\python.exe manage.py runserver 0.0.0.0:8000

# Terminal 2 – frontend
cd PlanSync/frontend
npm run dev
```

The React app will automatically proxy requests to `http://localhost:8000/api/` via Axios. Ensure the backend is running before authenticating.

## Environment Configuration

| Setting                         | Location / Variable              | Default                             |
|---------------------------------|----------------------------------|-------------------------------------|
| Allowed CORS origins            | `backend/config/settings.py`     | `http://localhost:5173`             |
| API base URL (frontend)         | `src/utils/constants.js`         | `http://localhost:8000/api`         |
| JWT token storage key           | `src/utils/constants.js`         | `plansync.tokens`                   |
| Gmail SMTP username             | `EMAIL_HOST_USER` env var        | _empty_ (email disabled)            |
| Gmail SMTP app password         | `EMAIL_HOST_PASSWORD` env var    | _empty_ (email disabled)            |
| Default sender email            | `DEFAULT_FROM_EMAIL` env var     | Matches `EMAIL_HOST_USER`           |

Adjust these values and Tailwind color tokens to suit production deployments.

---

### Gmail SMTP setup

1. **Create a Gmail App Password (required)**  
   - Enable 2FA on your Google account.  
   - Visit [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) and generate a new app password (choose "Mail" and "Other").  
   - Copy the 16-character password; you'll use it as `EMAIL_HOST_PASSWORD`.

2. **Export the credentials before starting Django** (PowerShell example):
   ```powershell
   $env:EMAIL_HOST_USER = "your-address@gmail.com"
   $env:EMAIL_HOST_PASSWORD = "abcd efgh ijkl mnop"  # The app password without spaces
   $env:DEFAULT_FROM_EMAIL = "PlanSync <your-address@gmail.com>"
   ```

3. **Launch the backend as usual.** Any successful user registration now triggers a welcome email through Gmail SMTP. Misconfigured credentials simply skip the email without blocking sign-ups (see logs for warnings).

4. **Trigger notifications**
   - Creating an event via `POST /api/events/` emails every registered user about the new schedule.
   - To send a manual reminder later, hit `POST /api/events/<event_id>/remind/` (available to the creator or admins) — perfect for wiring to a "Remind" button in the UI.

---

PlanSync is ready for local development. Extend the DRF serializers, add email integrations, or connect a production database to take it beyond the demo experience.
