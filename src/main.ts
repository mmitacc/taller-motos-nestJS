import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import type { ConfigType } from '@nestjs/config';
import appConfig from './config/app.config.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfiguration = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const api_prefix = appConfiguration.apiPrefix;

  app.setGlobalPrefix(api_prefix ?? 'api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = appConfiguration.port ?? 3000;
  await app.listen(port);
  console.log(`🏍️  API escuchando en http://localhost:${port}`);
}
await bootstrap();
