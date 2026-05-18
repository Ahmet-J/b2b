import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 4000,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_change_me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '100d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://b2b-jk2e.vercel.app',
  
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
  EMAIL_PORT: Number(process.env.EMAIL_PORT) || 587,
  EMAIL_USER: process.env.EMAIL_USER!,
  EMAIL_PASS: process.env.EMAIL_PASS!,
  
CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
  

};