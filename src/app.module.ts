import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { BrandsModule } from './brands/brands.module.js';
import { MaintenanceModule } from './maintenance/maintenance.module.js';
import { MotorcyclesModule } from './motorcycles/motorcycles.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { SalesModule } from './sales/sales.module.js';
import { UsersModule } from './users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation.js';
import appConfig from './config/app.config.js';
import bdConfig from './config/bd.config.js';
import jwtConfig from './config/jwt.config.js';
import negocioConfig from './config/negocio.config.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      load: [appConfig, bdConfig, jwtConfig, negocioConfig],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    BrandsModule,
    MotorcyclesModule,
    SalesModule,
    MaintenanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
