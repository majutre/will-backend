import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BilletsController } from './billets.controller';
import { Billet } from './billets.entity';
import { BilletsService } from './billets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Billet])],
  controllers: [BilletsController],
  providers: [BilletsService],
})
export class BilletsModule {}
