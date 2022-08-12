import { Module } from '@nestjs/common';
import { BilletsController } from './billets.controller';

@Module({
  controllers: [BilletsController]
})
export class BilletsModule {}
