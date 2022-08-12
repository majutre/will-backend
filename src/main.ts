import { NestFactory } from '@nestjs/core';
import { BilletsModule } from './billets/billets.module';

async function bootstrap() {
  const app = await NestFactory.create(BilletsModule);
  await app.listen(3000);
}
bootstrap();
