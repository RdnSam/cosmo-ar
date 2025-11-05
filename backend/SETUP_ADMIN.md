# Quick Setup: Admin Management System

## Step-by-Step Setup

### 1. Run Database Migration
```bash
cd backend
npx prisma migrate dev --name add_user_model
npx prisma generate
```

### 2. Create Super Admin Account
```bash
# Using defaults (will show password in console)
node prisma/seed-superadmin.js

# OR with custom credentials
SUPER_ADMIN_EMAIL="admin@cosmo.com" \
SUPER_ADMIN_PASSWORD="YourSecurePassword123!" \
SUPER_ADMIN_NAME="Admin Name" \
node prisma/seed-superadmin.js
```

### 3. Test the Login
```bash
# Start the server
npm run dev

# In another terminal, test login
curl -X POST http://localhost:3001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "superadmin@cosmo.com",
    "password": "SuperAdmin123!"
  }'
```

### 4. Create First Admin User
```bash
# Save the token from login response
TOKEN="your_jwt_token_here"

# Create a new admin
curl -X POST http://localhost:3001/api/admin/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "email": "admin@cosmo.com",
    "password": "AdminPass123!",
    "name": "Admin User",
    "role": "ADMIN"
  }'
```

## API Endpoints Summary

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/api/admin/login` | ❌ | Public | Login |
| GET | `/api/admin/profile` | ✅ | Any | Get current user |
| POST | `/api/admin/users` | ✅ | SUPER_ADMIN | Create user |
| GET | `/api/admin/users` | ✅ | ADMIN+ | List users |
| GET | `/api/admin/users/:id` | ✅ | ADMIN+ | Get user |
| PUT | `/api/admin/users/:id` | ✅ | SUPER_ADMIN | Update user |
| DELETE | `/api/admin/users/:id` | ✅ | SUPER_ADMIN | Deactivate user |

## Testing with Postman/Insomnia

### 1. Login Request
```
POST http://localhost:3001/api/admin/login
Content-Type: application/json

{
  "email": "superadmin@cosmo.com",
  "password": "SuperAdmin123!"
}
```

### 2. Create Admin (use token from login)
```
POST http://localhost:3001/api/admin/users
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "email": "newadmin@cosmo.com",
  "password": "SecurePass123!",
  "name": "New Admin",
  "role": "ADMIN"
}
```

## User Roles

- **SUPER_ADMIN** - Full access, created via seed script only
- **ADMIN** - Can manage products, view users
- **SALES** - Sales team access
- **MARKETING** - Marketing team access  
- **VIEWER** - Read-only access

## Security Features

✅ JWT authentication with 7-day expiry  
✅ Bcrypt password hashing (10 rounds)  
✅ Role-based access control  
✅ Super admin protection (cannot be modified/deleted)  
✅ Email uniqueness validation  
✅ Soft delete (users deactivated, not removed)

## Troubleshooting

### Migration fails?
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset
npx prisma migrate dev --name add_user_model
```

### Super admin already exists?
The seed script will skip if a super admin already exists. To recreate:
1. Delete the existing super admin from database manually
2. Run seed script again

### Invalid token error?
- Check `JWT_SECRET` in `.env` file
- Token expires after 7 days by default
- Login again to get a new token

## Next Steps

1. ✅ Set up admin system
2. 📝 Integrate with your frontend dashboard
3. 🔐 Change default super admin password
4. 👥 Create admin accounts for your team
5. 🔒 Add 2FA (optional, for production)

For full API documentation, see [ADMIN_API.md](./ADMIN_API.md)
