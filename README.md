# Smart Home Backend

Backend API for the **Smart Home** system – IoT device management, sensor data, and user authentication.

## Goals

- Provide a REST API for the Smart Home Frontend application
- User authentication with JWT
- CRUD operations for devices (lights, fans, air conditioners, doors, etc.)
- Collect & query sensor data (temperature, humidity, light)

## Tech Stack

| Component | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT + bcrypt |

## Project Structure

```
smart-home-backend/
├─ src/
│  ├─ controllers/    # Handle request/response
│  ├─ routes/         # Define endpoints
│  ├─ models/         # Mongoose schemas
│  ├─ middleware/     # Auth, error handler
│  ├─ services/      # Business logic
│  └─ app.js         # Entry point
├─ .env.example
├─ .gitignore
├─ package.json
└─ README.md
```

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/smart-home-backend.git
cd smart-home-backend

# 2. Install dependencies
npm install

# 3. Create .env file from .env.example
cp .env.example .env
# Then update the values in .env as needed

# 4. Run the development server
npm run dev

# Or run in production
npm start
```

## Environment Variables (.env)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/smarthome` |
| `JWT_SECRET` | Secret key for JWT | `my-super-secret-key` |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |

> **Note:** Do not push the actual `.env` file to GitHub. Only commit `.env.example`.

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new account | No |
| POST | `/api/auth/login` | Log in and receive JWT | No |
| GET | `/api/auth/me` | Get current user info | Bearer Token |

### Devices

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/devices` | List all devices | Bearer Token |
| GET | `/api/devices/:id` | Get device details | Bearer Token |
| POST | `/api/devices` | Add a new device | Bearer Token |
| PUT | `/api/devices/:id` | Update a device | Bearer Token |
| PATCH | `/api/devices/:id/toggle` | Toggle device on/off | Bearer Token |
| DELETE | `/api/devices/:id` | Delete a device | Bearer Token |

### Sensors

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/sensors/latest` | Get latest sensor data | Bearer Token |
| GET | `/api/sensors/history?from=&to=&limit=` | Sensor data history | Bearer Token |
| POST | `/api/sensors` | Record new sensor data | Bearer Token |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check if the server is running |

## Branch Strategy

```
main          ← stable branch, only merge after thorough testing
develop       ← integration branch, merge features here
feature/*     ← feature branches (feature/auth-api, feature/sensor-dashboard)
fix/*         ← bug fix branches (fix/login-bug)
```

**Conventions:**
1. Do not push directly to `main`
2. Work on separate branches (`feature/xxx` or `fix/xxx`)
3. Create a Pull Request to merge into `develop`
4. When `develop` is stable → merge into `main`

## Database

- **MongoDB** – NoSQL database
- Uses **Mongoose** as the ODM
- 3 main collections:
  - `users` – User information
  - `devices` – IoT devices
  - `sensordatas` – Time-series sensor data
