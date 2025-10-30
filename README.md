# COSMO Industrial Hygiene Wipes - WebAR Experience

WebAR + ChatGPT integrated solution untuk edukasi produk, training keselamatan, dan lead generation B2B.

## 🎯 Project Overview

Pengguna scan kemasan atau katalog COSMO → muncul AR demo 3D produk + overlay chat interaktif (ChatGPT) yang menjawab pertanyaan teknis, safety, rekomendasi produk, dan menghubungkan ke tim sales.

## 📁 Project Structure

```
cosmo-ar/
├── backend/          # Node.js + Express + Prisma
├── frontend/         # React + Vite + Model Viewer
├── docs/            # Documentation & assets
└── README.md
```

## 🚀 Features (Roadmap)

### Phase 1: Basic WebAR ✅ (Current)
- [x] Project setup
- [ ] Database schema (Product, Scan)
- [ ] QR code generator
- [ ] 3D model viewer (Model Viewer)
- [ ] Basic analytics

### Phase 2: ChatGPT Integration (Week 2)
- [ ] Chat UI component
- [ ] OpenAI API integration
- [ ] Basic product advisor prompts
- [ ] Chat logging

### Phase 3: RAG + Knowledge Base (Week 3)
- [ ] PDF parsing (katalog COSMO)
- [ ] Vector embeddings (Pinecone)
- [ ] Retrieval-Augmented Generation
- [ ] Safety guardrails

### Phase 4: Lead Generation (Week 4)
- [ ] Lead capture form
- [ ] WhatsApp notification
- [ ] Email confirmation
- [ ] Lead management

### Phase 5: Admin Dashboard (Week 5)
- [ ] Analytics overview
- [ ] Leads table & filters
- [ ] Chat transcripts
- [ ] Product management

### Phase 6: Polish & Testing (Week 6)
- [ ] Mobile optimization
- [ ] Multi-language (ID/EN)
- [ ] User testing
- [ ] Production deployment

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- Model Viewer (Google)
- MindAR.js (optional image tracking)
- TailwindCSS
- React Query

**Backend:**
- Node.js + Express
- Prisma ORM
- MySQL
- OpenAI API (ChatGPT)
- Pinecone (Vector DB)

**Integrations:**
- WhatsApp Business API (Twilio/Meta)
- QR Code generation
- Analytics tracking

## ⚙️ Environment Variables

### Backend (.env)
```
# Database
DATABASE_URL="mysql://user:password@localhost:3306/cosmo_ar_db"

# Server
PORT=3001
NODE_ENV=development

# OpenAI (Phase 2) - TODO: Get API key
OPENAI_API_KEY="sk-..."

# Pinecone (Phase 3) - TODO: Setup account
PINECONE_API_KEY="..."
PINECONE_ENVIRONMENT="..."
PINECONE_INDEX="cosmo-products"

# WhatsApp (Phase 4) - TODO: Setup Twilio
TWILIO_ACCOUNT_SID="..."
TWILIO_AUTH_TOKEN="..."
TWILIO_WHATSAPP_FROM="whatsapp:+..."
SALES_WHATSAPP_NUMBER="whatsapp:+62..."

# JWT
JWT_SECRET="your-secret-key-here"
JWT_EXPIRES_IN="7d"

# Frontend URL
FRONTEND_URL="http://localhost:5173"
```

### Frontend (.env)
```
VITE_API_BASE_URL="http://localhost:3001/api"
VITE_APP_NAME="COSMO AR Experience"
```

## 📝 TODO Reminders

### API Keys Needed (Nanti pas Phase 2+):
1. **OpenAI API Key** - https://platform.openai.com/api-keys
2. **Pinecone Account** - https://www.pinecone.io/
3. **Twilio/WhatsApp API** - https://www.twilio.com/whatsapp

### 3D Models Needed:
- OA-250 (Oil Absorbent) - .glb format
- CA-250 (Chemical Absorbent) - .glb format
- PSW (General Purpose) - .glb format

### Documents Needed:
- Katalog COSMO PDF (untuk RAG)
- Safety Data Sheets (SDS)
- Product photos untuk image targets

## 🚦 Getting Started

### Backend Setup
```bash
cd backend
yarn install
npx prisma generate
npx prisma migrate dev
yarn dev
```

### Frontend Setup
```bash
cd frontend
yarn install
yarn dev
```

## 📞 Support

For questions or issues, contact the development team.

---

**Built with ❤️ for PT Omecrom - COSMO Brand**
