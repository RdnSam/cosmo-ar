# Admin Management API

## Overview
Admin management endpoints for user creation and management. Super Admin can create and manage other admins and users.

## Roles
- **SUPER_ADMIN** - Full system access, can create/modify all users
- **ADMIN** - Can view users, manage products
- **SALES** - Sales team access
- **MARKETING** - Marketing team access
- **VIEWER** - Read-only access

## Setup

### 1. Run Prisma Migration
```bash
cd backend
npx prisma migrate dev --name add_user_model
npx prisma generate
```

### 2. Create First Super Admin
```bash
# Option 1: Using environment variables
SUPER_ADMIN_EMAIL="admin@yourcompany.com" \
SUPER_ADMIN_PASSWORD="YourSecurePassword123!" \
SUPER_ADMIN_NAME="Your Name" \
node prisma/seed-superadmin.js

# Option 2: Using defaults (change later!)
node prisma/seed-superadmin.js
```

## API Endpoints

### Base URL
```
http://localhost:3001/api/admin
```

---

## Authentication

### Login
```http
POST /api/admin/login
```

**Request Body:**
```json
{
  "email": "admin@cosmo.com",
  "password": "YourPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "admin@cosmo.com",
      "name": "Super Administrator",
      "role": "SUPER_ADMIN"
    }
  }
}
```

### Get Profile
```http
GET /api/admin/profile
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "admin@cosmo.com",
    "name": "Super Administrator",
    "role": "SUPER_ADMIN",
    "isActive": true
  }
}
```

---

## User Management (Super Admin Only)

### Create New User/Admin
```http
POST /api/admin/users
Authorization: Bearer {super_admin_token}
```

**Request Body:**
```json
{
  "email": "newadmin@cosmo.com",
  "password": "SecurePassword123!",
  "name": "New Admin Name",
  "role": "ADMIN"
}
```

**Valid Roles:** `ADMIN`, `SALES`, `MARKETING`, `VIEWER`

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 2,
    "email": "newadmin@cosmo.com",
    "name": "New Admin Name",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2024-11-04T16:30:00.000Z"
  }
}
```

### Get All Users
```http
GET /api/admin/users
Authorization: Bearer {admin_token}

# Optional filters
GET /api/admin/users?role=ADMIN
GET /api/admin/users?isActive=true
GET /api/admin/users?role=SALES&isActive=true
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "email": "admin@cosmo.com",
      "name": "Super Administrator",
      "role": "SUPER_ADMIN",
      "isActive": true,
      "createdAt": "2024-11-04T10:00:00.000Z",
      "updatedAt": "2024-11-04T10:00:00.000Z"
    }
  ]
}
```

### Get User by ID
```http
GET /api/admin/users/:id
Authorization: Bearer {admin_token}
```

### Update User
```http
PUT /api/admin/users/:id
Authorization: Bearer {super_admin_token}
```

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Name",
  "role": "SALES",
  "isActive": false,
  "password": "NewPassword123!"
}
```

### Delete User (Soft Delete)
```http
DELETE /api/admin/users/:id
Authorization: Bearer {super_admin_token}
```

**Response:**
```json
{
  "success": true,
  "message": "User deactivated successfully"
}
```

---

## Example Usage with cURL

### 1. Login
```bash
curl -X POST http://localhost:3001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "superadmin@cosmo.com",
    "password": "SuperAdmin123!"
  }'
```

### 2. Create New Admin
```bash
curl -X POST http://localhost:3001/api/admin/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "email": "newadmin@cosmo.com",
    "password": "SecurePass123!",
    "name": "John Doe",
    "role": "ADMIN"
  }'
```

### 3. Get All Users
```bash
curl -X GET http://localhost:3001/api/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Missing required fields: email, password, name, role"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Super admin only."
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

## Security Notes

1. **JWT Token** expires in 7 days (configurable in `.env`)
2. **Passwords** are hashed with bcrypt (10 rounds)
3. **Super Admin** cannot be modified or deleted through API
4. **SUPER_ADMIN role** cannot be assigned through API
5. All admin endpoints require authentication
6. User creation requires SUPER_ADMIN role

## Environment Variables

Add to your `.env` file:
```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# For initial super admin creation
SUPER_ADMIN_EMAIL=admin@yourcompany.com
SUPER_ADMIN_PASSWORD=YourSecurePassword123!
SUPER_ADMIN_NAME=Your Name
```
