import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
}));
