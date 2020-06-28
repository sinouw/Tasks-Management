import { Controller, Get, Res, HttpStatus, Post, Body, Put, NotFoundException, Delete, Param, Req, UseGuards } from '@nestjs/common';

import { UserService } from './users.service';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from 'src/core/config/config.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/models/user.model';

@Controller('user')
export class UserController {
    constructor(private userService: UserService,
        private configService: ConfigService) { }

    // add a user
    @Post('create')
    async addUser(@Res() res, @Body() createUserDto: CreateUserDto) {
        const user = await this.userService.addUser(createUserDto);
        return res.status(HttpStatus.OK).json({
            message: "User has been created successfully",
            user
        })
    }

    // Retrieve users list
    @Get('users')
    async getAllUser(@Res() res) {
        const users = await this.userService.getAllUser();
        return res.status(HttpStatus.OK).json(users);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getAllDto')
    async getAllUserSmallerDto(@Res() res,@Req() req) {
        const id = req.user._id
        const users = await this.userService.getAllUserDto(id);
        return res.status(HttpStatus.OK).json(users);
    }

    // Fetch a particular user using ID
    @Get(':id')
    async getUser(@Res() res, @Param('id') id) {
        const user = await this.userService.getUser(id);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }

    // Fetch a particular user using ID
    @Get('check/:id')
    async UserExists(@Res() res, @Param('id') id) {
        const result = await this.userService.UserExists(id);
        if (result == false) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(true);
    }

    // Update a user's details
    @Put('update/:id')
    async updateUser(@Res() res, @Param('id') id, @Body() createUserDTO: CreateUserDto) {
        const user = await this.userService.updateUser(id, createUserDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User has been successfully updated',
            user
        });
    }

    // Delete a user
    @Delete('delete/:id')
    async deleteUser(@Res() res, @Param('id') id) {
        const user = await this.userService.deleteUser(id);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'User has been deleted',
            user
        })
    }
    
    @Post('avatar')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './avatars',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        }
    ))
    async uploadAvatar(@Res() res, @UploadedFile() file,@Req() req) {
        const id = req.user._id
        const user = await this.userService.getUser(id);
        if (!user) throw new NotFoundException('User does not exist!');
        let originalpath = this.configService.get('APP_URI') + file.path
        let useravatar = file.path.split("\\")[1]
        let userBody = {
            avatarUrl: `${useravatar}`
        }
        this.userService.updateUser(id, userBody);
        return res.status(HttpStatus.OK).json(originalpath);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('avatar/url')
    async serveAvatar(@Res() res,@Req() req): Promise<any> {
        const id = req.user._id
        const user = await this.userService.getUser(id);
        if (!user) throw new NotFoundException('User does not exist!');
        let x = `${this.configService.get('APP_URI')}` + "avatars/" + user.avatarUrl;
        return res.status(HttpStatus.OK).json(x);

    }
}