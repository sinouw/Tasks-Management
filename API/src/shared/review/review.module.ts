import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewSchema } from 'src/models/review.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]),
  ],
  providers: [ReviewService],
  controllers: [ReviewController]
})
export class ReviewModule {}
