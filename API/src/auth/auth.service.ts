
import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, CreateUserDto, defaultUserDoc } from 'src/models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { DepartmentService } from 'src/shared/department/department.service';
import { threadId } from 'worker_threads';
import { defaultDoc } from 'src/models/department.model';


@Injectable()
export class AuthService implements OnModuleInit {

  onModuleInit() {
    this.createDefaultAdmin()
  }
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
    private departmentService: DepartmentService
  ) { }

  async createDefaultAdmin() {
    let department = await this.departmentService.getByTitle(defaultDoc.title);
    if (!department) {
      department = await this.departmentService.addNewDocument(defaultDoc)
    }

    const user = await this.userModel.findOne({ username: "admin" });
    if (!user) {
      let body :any = defaultUserDoc
      body.departmentId = department._id
      const newUser = await this.userModel(body);
      console.log("newUser : ", newUser)
      return newUser.save();
    }

  }


  async getFullProfil(user) {
    const userId = user._id
    const result = await this.userModel.aggregate([
      {
        '$match': {
          '_id': Types.ObjectId(userId)
        }
      },
      {
        '$addFields': {
          'objDepartmentId': '$departmentId'
        }
      },
      {
        '$lookup': {
          'from': 'departments',
          'localField': 'objDepartmentId',
          'foreignField': '_id',
          'as': 'department'
        }
      },
      {
        '$unwind': {
          'path': '$department'
        }
      },
      {
        '$project': {
          'password': 0,
        }
      },
    ])

    return result[0]
  }

  async validateUserMongo(usern: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ username: usern });
    const match = await bcrypt.compare(pass, user.password);
    if (user && match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // post a single user
  async create(createUserDTO: any): Promise<User> {
    const newUser = await this.userModel(createUserDTO);
    return newUser.save();
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.username, sub: user._id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getHelloAdmin() {
    return "You are in the admin panel"
  }
}


