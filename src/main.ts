import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { BilletsModule } from './billets/billets.module';

async function bootstrap() {
  const app = await NestFactory.create(BilletsModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
