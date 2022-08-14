import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import * as session from 'express-session';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { BilletsModule } from './billets/billets.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Billet } from './billets/billets.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [User, Billet],
          synchronize: true,
        };
      },
    }),
    UsersModule,
    BilletsModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: 'my-secret',
          resave: false,
          saveUninitialized: false,
        }),
      )
      .forRoutes('*');
  }
}
