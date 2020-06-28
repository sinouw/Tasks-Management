import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from 'src/models/notification.model';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
  ],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
