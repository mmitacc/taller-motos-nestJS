import { registerAs } from '@nestjs/config';

export default registerAs('negocio', () => ({
  shopName: process.env.SHOP_NAME,
  currency: process.env.CURRENCY,
  maxDiscountPercent: Number(process.env.MAX_DISCOUNT_PERCENT),
}));
