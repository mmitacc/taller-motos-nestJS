import { registerAs } from '@nestjs/config';

export default registerAs('bd', () => ({
  dataBaseUrl: process.env.DATABASE_URL,
}));
