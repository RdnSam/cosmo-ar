export const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://cosmo.kiraproject.id',
      'https://cosmo.kiraproject.id',  // Tambah HTTPS
      'http://www.cosmo.kiraproject.id',
      'https://www.cosmo.kiraproject.id',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
    ];

    console.log('🔍 Request origin:', origin); // Untuk debug
    console.log('✅ Allowed origins:', allowedOrigins);

    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      console.log('✅ CORS allowed for:', origin);
      callback(null, true);
    } else {
      console.log('❌ CORS blocked for:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};