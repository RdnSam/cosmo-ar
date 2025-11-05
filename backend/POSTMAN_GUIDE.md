# Postman Collection Guide

## 📦 Import to Postman

### Method 1: Import File
1. Open Postman
2. Click **Import** button (top left)
3. Select `COSMO-AR-Backend.postman_collection.json`
4. Click **Import**

### Method 2: Drag & Drop
- Drag the JSON file directly into Postman window

## 🎯 Collection Structure

The collection includes **6 main folders**:

### 1. **Health & Info**
- Health Check - Test if backend is running
- Root - Get API information

### 2. **Admin - Authentication**
- **Login** - Auto-saves token to collection variable
- Get Profile - Get current user info

### 3. **Admin - User Management** (Super Admin Only)
- Create New User/Admin
- Get All Users (with filters)
- Get User by ID
- Update User (name, role, status)
- Update User Password
- Deactivate User

### 4. **Products**
- Get All Products (with filters)
- Get Product by SKU
- Create Product
- Update Product
- Generate QR Code (single/bulk)

### 5. **Scans - Analytics**
- Log Scan Event
- Update Scan Interaction

### 6. **3D Models**
- Get Available Models

## 🔧 Collection Variables

The collection uses 2 variables:

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `base_url` | `http://localhost:3001` | Backend API URL |
| `admin_token` | (empty) | JWT token (auto-saved after login) |

### Update Base URL
If your backend runs on different port/domain:
1. Click collection name → **Variables** tab
2. Update `base_url` value
3. Click **Save**

## 🚀 Quick Start

### Step 1: Login
1. Open **Admin - Authentication** → **Login**
2. Default credentials:
   ```json
   {
     "email": "superadmin@cosmo.com",
     "password": "SuperAdmin123!"
   }
   ```
3. Click **Send**
4. Token will be **auto-saved** to `admin_token` variable

### Step 2: Test Protected Endpoint
1. Open **Admin - User Management** → **Get All Users**
2. Notice the `Authorization: Bearer {{admin_token}}` header
3. Click **Send**
4. Should return list of users

### Step 3: Create New Admin
1. Open **Admin - User Management** → **Create New User/Admin**
2. Modify the body if needed:
   ```json
   {
     "email": "admin@cosmo.com",
     "password": "AdminPass123!",
     "name": "Admin User",
     "role": "ADMIN"
   }
   ```
3. Click **Send**

## 🔐 Authentication

### How Token Auto-Save Works
The **Login** request includes a Test script that automatically saves the token:

```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.collectionVariables.set("admin_token", jsonData.data.token);
    console.log("Token saved:", jsonData.data.token);
}
```

### Manual Token Update (if needed)
1. Click collection name → **Variables** tab
2. Paste token in `admin_token` **Current Value**
3. Click **Save**

### Protected Endpoints
All endpoints with 🔒 require authentication:
```
Authorization: Bearer {{admin_token}}
```

## 📝 User Roles

| Role | Permissions |
|------|-------------|
| **SUPER_ADMIN** | Full access - Create/manage all users |
| **ADMIN** | View users, manage products |
| **SALES** | Sales team access |
| **MARKETING** | Marketing team access |
| **VIEWER** | Read-only access |

## 🧪 Testing Workflow

### Test All Endpoints:
1. ✅ Health Check
2. ✅ Login (saves token)
3. ✅ Get Profile
4. ✅ Create New Admin
5. ✅ Get All Users
6. ✅ Get All Products
7. ✅ Generate QR Code

### Test User Management:
```
1. Login as Super Admin
2. Create new ADMIN user
3. Get all users (should see 2 users)
4. Update user role to SALES
5. Deactivate user
6. Get all users with filter isActive=true
```

## 🎨 Tips & Tricks

### 1. Save Responses as Examples
- After successful request, click **Save as Example**
- Helps document expected responses

### 2. Use Environments for Multiple Servers
Create environments:
- **Local**: `http://localhost:3001`
- **Staging**: `https://staging-api.cosmo.com`
- **Production**: `https://api.cosmo.com`

### 3. Filter Collection
Use search bar to quickly find requests:
- Type "admin" → Shows all admin endpoints
- Type "qr" → Shows QR generation endpoints

### 4. Console for Debugging
- Open Postman Console (bottom left icon)
- See detailed request/response logs
- Check token save logs

## 🐛 Troubleshooting

### "Unauthorized" Error
- Check if you've logged in
- Verify token is saved in collection variables
- Token expires after 7 days - login again

### "403 Forbidden"
- Check user role permissions
- Only SUPER_ADMIN can create users
- Only ADMIN+ can view users

### "404 Not Found"
- Verify backend is running on port 3001
- Check `base_url` variable
- Test Health Check endpoint first

### Connection Refused
```bash
# Check if backend is running
pm2 status

# If not running, start it
cd backend
pm2 start ecosystem.config.cjs --env development
```

## 📊 Request Examples

### Create Product
```json
{
  "sku": "OA-250",
  "name": "Oil Absorbent Wipes",
  "category": "OIL",
  "description": "High-quality oil absorbent wipes",
  "modelUrl": "/models/oa-250.glb",
  "price": 150000,
  "currency": "IDR"
}
```

### Log Scan Event
```json
{
  "productId": 1,
  "sessionId": "uuid-123",
  "deviceInfo": "iPhone 14",
  "location": "Jakarta, Indonesia",
  "utmSource": "google"
}
```

## 🔗 Related Documentation

- [Admin API Documentation](./ADMIN_API.md)
- [Setup Guide](./SETUP_ADMIN.md)
- [Environment Variables](./.env.example)

## 💡 Pro Tips

1. **Use Pre-request Scripts** - Add custom logic before requests
2. **Add Tests** - Verify response status and data
3. **Share Collection** - Export and share with team
4. **Monitor Runs** - Schedule automated API tests

Enjoy testing! 🚀
