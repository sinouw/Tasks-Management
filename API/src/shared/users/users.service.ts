import { User, CreateUserDto } from "../../models/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model ,Types} from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    // fetch all users
    async getAllUser(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async getAllUserDto(userId): Promise<any> {
        console.log("userId : ",userId);
        
        const users = await this.userModel.aggregate([
            {
                '$project' : {
                    password : 0
                }
            },
            {
                '$match' : {
                    '_id' : {
                        '$ne' : Types.ObjectId(userId)
                    }
                }
            }
        ]);
        return users;
    }
    // Get a single user
    async getUser(userID): Promise<User> {
        const user = await this.userModel.findById(userID).exec();
        return user;
    }

    // Check if user exists
    async UserExists(userID): Promise<boolean> {
        const user = await this.userModel.findById(userID).exec();
        return user==null?false:true;
    }

    // post a single user
    async addUser(createUserDTO: CreateUserDto): Promise<User> {
        debugger
        const newUser = await this.userModel(createUserDTO);
        newUser.status =true
        return newUser.save();
    }
    // Edit user details
    async updateUser(userID, createUserDTO: any): Promise<User> {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(userID, createUserDTO, { new: true });
        return updatedUser;
    }
    // Delete a user
    async deleteUser(userID): Promise<any> {
        const deletedUser = await this.userModel.findByIdAndRemove(userID);
        return deletedUser;
    }

}