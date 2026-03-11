# Smart Home Backend

Backend API cho hệ thống **Smart Home** – quản lý thiết bị IoT, dữ liệu cảm biến, xác thực người dùng.

## Mục tiêu

- Cung cấp REST API cho ứng dụng Smart Home Frontend
- Xác thực người dùng bằng JWT
- CRUD thiết bị (đèn, quạt, điều hoà, cửa…)
- Thu thập & truy vấn dữ liệu cảm biến (nhiệt độ, độ ẩm, ánh sáng)

## Công nghệ

| Thành phần | Công nghệ |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT + bcrypt |

## Cấu trúc thư mục

```
smart-home-backend/
├─ src/
│  ├─ controllers/    # Xử lý request/response
│  ├─ routes/         # Định nghĩa endpoint
│  ├─ models/         # Mongoose schema
│  ├─ middleware/     # Auth, error handler
│  ├─ services/      # Business logic
│  └─ app.js         # Entry point
├─ .env.example
├─ .gitignore
├─ package.json
└─ README.md
```

## Cách chạy local

```bash
# 1. Clone repo
git clone https://github.com/<your-username>/smart-home-backend.git
cd smart-home-backend

# 2. Cài dependencies
npm install

# 3. Tạo file .env từ .env.example
cp .env.example .env
# Sau đó sửa các giá trị trong .env cho phù hợp

# 4. Chạy development server
npm run dev

# Hoặc chạy production
npm start
```

## Biến môi trường (.env)

| Biến | Mô tả | Ví dụ |
|---|---|---|
| `PORT` | Port server | `5000` |
| `NODE_ENV` | Môi trường | `development` |
| `MONGODB_URI` | Connection string MongoDB | `mongodb://localhost:27017/smarthome` |
| `JWT_SECRET` | Secret key cho JWT | `my-super-secret-key` |
| `JWT_EXPIRES_IN` | Thời gian hết hạn token | `7d` |

> **Lưu ý:** Không push file `.env` thật lên GitHub. Chỉ commit `.env.example`.

## API chính

### Auth

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Đăng ký tài khoản | Không |
| POST | `/api/auth/login` | Đăng nhập, nhận JWT | Không |
| GET | `/api/auth/me` | Lấy thông tin user hiện tại | Bearer Token |

### Devices

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/api/devices` | Danh sách thiết bị | Bearer Token |
| GET | `/api/devices/:id` | Chi tiết 1 thiết bị | Bearer Token |
| POST | `/api/devices` | Thêm thiết bị mới | Bearer Token |
| PUT | `/api/devices/:id` | Cập nhật thiết bị | Bearer Token |
| PATCH | `/api/devices/:id/toggle` | Bật/tắt thiết bị | Bearer Token |
| DELETE | `/api/devices/:id` | Xoá thiết bị | Bearer Token |

### Sensors

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/api/sensors/latest` | Dữ liệu cảm biến mới nhất | Bearer Token |
| GET | `/api/sensors/history?from=&to=&limit=` | Lịch sử cảm biến | Bearer Token |
| POST | `/api/sensors` | Ghi dữ liệu cảm biến mới | Bearer Token |

### Health Check

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/health` | Kiểm tra server hoạt động |

## Branch strategy

```
main          ← branch ổn định, chỉ merge khi đã test kỹ
develop       ← branch tích hợp, merge feature vào đây
feature/*     ← branch theo tính năng (feature/auth-api, feature/sensor-dashboard)
fix/*         ← branch sửa lỗi (fix/login-bug)
```

**Quy ước:**
1. Không push thẳng vào `main`
2. Làm việc trên branch riêng (`feature/xxx` hoặc `fix/xxx`)
3. Tạo Pull Request merge vào `develop`
4. Khi `develop` ổn định → merge vào `main`

## Database

- **MongoDB** – NoSQL database
- Sử dụng **Mongoose** làm ODM
- 3 collection chính:
  - `users` – Thông tin người dùng
  - `devices` – Thiết bị IoT
  - `sensordatas` – Dữ liệu cảm biến theo thời gian
