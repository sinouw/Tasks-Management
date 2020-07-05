import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    
  ],
  providers: [
    UserService, 
  ],
  controllers: [],
  exports: [UserService],
})
export class UsersModule {
  
}
