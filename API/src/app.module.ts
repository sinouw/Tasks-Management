import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './shared/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './core/config/config.module';
import { ConfigService } from './core/config/config.service';
import { DepartmentModule } from './shared/department/department.module';
import { EventModule } from './shared/event/event.module';
import { TrainingCenterModule } from './shared/training-center/training-center.module';
import { NotificationModule } from './shared/notification/notification.module';
import { ReviewModule } from './shared/review/review.module';
import { EventCenterModule } from './shared/event-center/event-center.module';


@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // uri: `mongodb://${configService.get('DB_URI')}/${configService.get('DB_NAME')}`,
        uri: `mongodb+srv://${configService.get('DB_USER')}:${configService.get('DB_PWD')}@${configService.get('DB_URI')}/${configService.get('DB_NAME')}?${configService.get('DB_PARAMS')}`,
        useNewUrlParser: true
      }),
      inject: [ConfigService]
    }),



    AuthModule,
    UsersModule,
    ConfigModule,
    DepartmentModule,
    EventModule,
    TrainingCenterModule,
    NotificationModule,
    ReviewModule,
    EventCenterModule,
  ],
  controllers: [AppController],
  providers: [
  ],
})
export class AppModule {}
