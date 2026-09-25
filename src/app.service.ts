import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import negocioConfig from './config/negocio.config.js';
import appConfig from './config/app.config.js';

@Injectable()
export class AppService {
  constructor(
    @Inject(negocioConfig.KEY)
    private negocioConfiguration: ConfigType<typeof negocioConfig>,
    @Inject(appConfig.KEY)
    private appConfiguration: ConfigType<typeof appConfig>,
  ) {}
  getInfo() {
    const shop = this.negocioConfiguration.shopName;
    const currency = this.negocioConfiguration.currency;
    const environment = this.appConfiguration.nodeEnv;
    return {
      shop,
      currency,
      environment,
      status: 'ok',
    };
  }
}
