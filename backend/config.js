import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 5000,

  env: process.env.NODE_ENV || 'development',

  mongoUri: process.env.MONGO_URI,

  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessTokenExpiry: '1h',
    refreshTokenExpiry: '7d',
    issuer: 'wellness-extract-auth'
  },

  msal: {
    clientId: process.env.CLIENT_ID,
    tenantId: process.env.TENANT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    scopes: ['User.Read']
  },

  azureGraph: {
    profileUrl: 'https://graph.microsoft.com/v1.0/me'
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: 'Too many login attempts'
  },

  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  backendUrl: process.env.BACKEND_URL || 'http://localhost:5000'
};

export default config;