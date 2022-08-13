import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { BilletsModule } from './billets/billets.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Billet } from './billets/billets.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Billet],
      synchronize: true,
    }),
    UsersModule,
    BilletsModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
