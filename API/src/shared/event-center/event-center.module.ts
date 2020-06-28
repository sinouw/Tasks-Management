import { Event_CenterSchema } from './../../models/event_center.model';
import { Module } from '@nestjs/common';
import { EventCenterService } from './event-center.service';
import { EventCenterController } from './event-center.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'EventCenter', schema: Event_CenterSchema }]),
  ],
  providers: [EventCenterService],
  controllers: [EventCenterController]
})
export class EventCenterModule {}
