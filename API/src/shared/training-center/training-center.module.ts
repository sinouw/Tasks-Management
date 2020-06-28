import { TrainingCenterSchema } from './../../models/trainingCenters.model';
import { Module } from '@nestjs/common';
import { TrainingCenterService } from './training-center.service';
import { TrainingCenterController } from './training-center.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'TrainingCenter', schema: TrainingCenterSchema }]),
  ],
  providers: [TrainingCenterService],
  controllers: [TrainingCenterController]
})
export class TrainingCenterModule {}
