import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import type { ConfigType } from '@nestjs/config';
import bdConfig from '../config/bd.config.js';
import appConfig from '../config/app.config.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor(
    @Inject(bdConfig.KEY) bdConfiguration: ConfigType<typeof bdConfig>,
    @Inject(appConfig.KEY) appConfiguration: ConfigType<typeof appConfig>,
  ) {
    const adapter = new PrismaPg({
      connectionString: bdConfiguration.dataBaseUrl,
    });
    super({
      adapter,
      log:
        appConfiguration.nodeEnv === 'development'
          ? ['warn', 'error']
          : ['error'],
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
