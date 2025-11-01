# COSMO AR - Architecture Documentation

## 📁 Project Structure

```
cosmo-ar/
├── frontend/                    # React + Vite Frontend
│   ├── src/
│   │   ├── config/             # ⭐ Configuration Layer
│   │   │   ├── app.config.js   # App settings & environment
│   │   │   └── constants.js    # Constants & enums
│   │   ├── services/           # ⭐ API Service Layer
│   │   │   └── api.js          # Centralized API calls with interceptors
│   │   ├── pages/              # Page Components
│   │   │   ├── HomePage.jsx    # Landing page with QR
│   │   │   └── ProductAR.jsx   # AR viewer page
│   │   ├── components/         # Reusable components
│   │   └── App.jsx             # Main app
│   ├── public/
│   │   └── test.html           # Standalone AR test (legacy)
│   ├── .env                    # Environment variables (dev)
│   └── .env.production.example # Production env template
│
├── backend/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── config/             # ⭐ Configuration Layer
│   │   │   ├── app.config.js   # Environment config
│   │   │   └── constants.js    # HTTP status, messages, etc
│   │   ├── routes/             # API Routes
│   │   ├── controllers/        # Business logic
│   │   ├── middleware/         # CORS, error handling
│   │   ├── prisma/             # Database schema & migrations
│   │   └── server.js           # Server entry point
│   ├── uploads/                # Static files
│   │   ├── models/             # 3D models (.glb)
│   │   └── qrcodes/            # Generated QR codes
│   ├── .env                    # Environment variables
│   ├── .env.production.example # Production env template
│   └── ecosystem.config.cjs    # ⭐ PM2 configuration
│
├── nginx-cosmo.kiraproject.id.conf  # Frontend nginx config
├── nginx-vr.kiraproject.id.conf     # Backend nginx config
└── ARCHITECTURE.md                  # This file
```

## 🏗️ Clean Architecture Principles

### 1. **Configuration Layer** (⭐ NEW)

#### Frontend: `src/config/app.config.js`
```javascript
export const APP_CONFIG = {
  env: 'production',
  isDev: false,
  isProd: true,

  api: {
    baseUrl: 'https://vr.kiraproject.id/api',
    timeout: 30000,
  },

  urls: {
    frontend: 'https://cosmo.kiraproject.id',
    backend: 'https://vr.kiraproject.id',
    models: 'https://vr.kiraproject.id/models',
  },

  ar: {
    defaultCameraOrbit: '0deg 75deg 105%',
    autoRotateSpeed: '30deg',
    modes: 'webxr scene-viewer quick-look',
  }
};
```

**Benefits:**
- ✅ No more hardcoded URLs scattered in code
- ✅ Easy to switch environments (dev/staging/prod)
- ✅ Single source of truth for settings

#### Backend: `src/config/app.config.js`
```javascript
export const APP_CONFIG = {
  env: process.env.NODE_ENV,

  server: {
    port: parseInt(process.env.PORT) || 3001,
    host: '0.0.0.0',
  },

  database: {
    url: process.env.DATABASE_URL,
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    enabled: !!process.env.OPENAI_API_KEY,
  }
};
```

### 2. **Constants & Enums** (⭐ NEW)

#### `src/config/constants.js`
```javascript
// Instead of: if (status === 404)
// Use: if (status === HTTP_STATUS.NOT_FOUND)

export const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const PRODUCTS = [
  {
    sku: 'OA-250',
    name: 'Oil Absorbent Wipes',
    icon: '🛢️',
    color: 'from-orange-400 to-red-500'
  }
];
```

**Benefits:**
- ✅ No magic strings/numbers
- ✅ Autocomplete & type safety
- ✅ Easy to maintain & update

### 3. **Service Layer** (⭐ NEW)

#### `src/services/api.js`
```javascript
// Centralized API calls with interceptors

export const productAPI = {
  getAll: async () => {
    const response = await api.get(API_ENDPOINTS.PRODUCTS.LIST);
    return response.data;
  },

  getBySku: async (sku) => {
    const response = await api.get(API_ENDPOINTS.PRODUCTS.DETAIL(sku));
    return response.data;
  }
};
```

**Features:**
- ✅ Request/Response interceptors for logging
- ✅ Automatic error handling
- ✅ Centralized timeout & retry logic
- ✅ Auth token management

**Before (Bad):**
```javascript
// Scattered fetch calls everywhere
fetch('http://192.168.43.250:3001/api/products/OA-250')
  .then(r => r.json())
  .then(data => console.log(data));
```

**After (Good):**
```javascript
// Clean, reusable service
const product = await productAPI.getBySku('OA-250');
```

### 4. **Component Architecture**

#### HomePage.jsx
```javascript
// Uses config & constants
import { APP_CONFIG } from '../config/app.config';
import { PRODUCTS, AR_FEATURES } from '../config/constants';

const testUrl = `${APP_CONFIG.urls.frontend}/test.html`;
```

#### ProductAR.jsx
```javascript
// Proper state management & event tracking
const modelUrl = `${APP_CONFIG.urls.models}/${product.model3dPath}`;

<model-viewer
  src={modelUrl}
  ar-modes={APP_CONFIG.ar.modes}
  camera-orbit={APP_CONFIG.ar.defaultCameraOrbit}
/>
```

## 🚀 Deployment

### PM2 Ecosystem (⭐ NEW)
```javascript
// ecosystem.config.cjs
module.exports = {
  apps: [{
    name: 'cosmo-ar-backend',
    script: './src/server.js',
    instances: 1,
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    autorestart: true,
    max_memory_restart: '500M',
  }]
};
```

**Usage:**
```bash
# Start with ecosystem file
pm2 start ecosystem.config.cjs --env production

# Reload without downtime
pm2 reload cosmo-ar-backend
```

## 📊 Benefits of New Structure

### Before (❌ Bad)
```javascript
// Hardcoded URLs everywhere
src="http://192.168.43.250:3001/models/TissueCosmo.glb"

// Magic strings
if (event === 'qr_scanned') { }

// Scattered API calls
fetch('http://localhost:3001/api/products')
```

### After (✅ Good)
```javascript
// Clean config usage
src={`${APP_CONFIG.urls.models}/${product.model3dPath}`}

// Named constants
if (event === SCAN_EVENT.QR_SCANNED) { }

// Service layer
const products = await productAPI.getAll();
```

## 🎯 Key Improvements

1. **Maintainability**
   - Change API URL once in config, applies everywhere
   - Update constants in one place
   - Clear separation of concerns

2. **Scalability**
   - Easy to add new environments (staging, etc)
   - Feature flags for phases (ChatGPT, RAG, WhatsApp)
   - Modular service layer

3. **Developer Experience**
   - Autocomplete for constants
   - Better error messages
   - Centralized logging

4. **Production-Ready**
   - Environment-based configuration
   - PM2 process management
   - Proper error handling & logging
   - Request/response interceptors

## 📝 Development Workflow

### Local Development
```bash
# Frontend
cd frontend
npm run dev          # Uses .env (localhost URLs)

# Backend
cd backend
npm run dev          # Uses .env (localhost DB)
```

### Production Build
```bash
# Frontend
npm run build        # Uses VITE_API_BASE_URL from .env

# Backend
pm2 start ecosystem.config.cjs --env production
```

## 🔧 Configuration Management

### Environment Variables

**Frontend (.env)**
```env
VITE_API_BASE_URL=https://vr.kiraproject.id/api
VITE_APP_NAME=COSMO AR Experience
```

**Backend (.env)**
```env
NODE_ENV=production
PORT=3001
DATABASE_URL=mysql://user:pass@localhost:3306/cosmo_ar
JWT_SECRET=your-secret-key
FRONTEND_URL=https://cosmo.kiraproject.id

# Phase 2-4 (Optional)
OPENAI_API_KEY=
PINECONE_API_KEY=
TWILIO_ACCOUNT_SID=
```

## 📈 Future Enhancements

1. **TypeScript** - Add type safety
2. **Testing** - Unit & integration tests
3. **Monitoring** - APM integration
4. **CDN** - Serve 3D models from CDN
5. **Caching** - Redis for API responses
6. **Rate Limiting** - Protect API endpoints

---

**Last Updated:** 2025-10-31
**Version:** 1.0.0 (Production-Ready Architecture)
