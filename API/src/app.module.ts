import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './shared/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './core/config/config.module';
import { ConfigService } from './core/config/config.service';
import { EventModule } from './shared/event/event.module';


@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot('mongodb://localhost/authNestJs'),
    AuthModule,
    UsersModule,
    ConfigModule,
    EventModule
  ],
  controllers: [AppController],
  providers: [
  ],
})
export class AppModule {}
