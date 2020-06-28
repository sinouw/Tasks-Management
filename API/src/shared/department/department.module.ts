import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentSchema } from 'src/models/department.model';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Department', schema: DepartmentSchema }]),
  ],
  providers: [ DepartmentService],
  controllers: [DepartmentController],
  exports : [DepartmentService]
})
export class DepartmentModule {}
