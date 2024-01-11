import { config } from 'dotenv';

const env = process.env.NODE_ENV || false;
if (!env) process.exit(100);

config({ path: `bin/.env.${env}` });

export default () => ({
  PORT: process.env.PORT,
  ENV: process.env.NODE_ENV,
  DB_URL: process.env.URI,
  DB_Name: process.env.DB_NAME,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_FROM: process.env.MAIL_FROM,
  MAIL_PORT: process.env.MAIL_PORT,
  BASE_URL: process.env.BASE_URL,
  STRIPE_SECRET: process.env.STRIPE_SECRET || '',
  STRIPE_IDENTITY_WEBHOOK_SECRET: process.env.STRIPE_IDENTITY_WEBHOOK_SECRET,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_INDEX: process.env.REDIS_INDEX,
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_KEY_SECRET: process.env.AWS_S3_KEY_SECRET,
  S3_REGION: process.env.S3_REGION,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  S3_FOLDER: process.env.S3_FOLDER,
  DEBUG: process.env.DEBUG,
  SEGMENT_API_KEY: process.env.SEGMENT_API_KEY,
});
