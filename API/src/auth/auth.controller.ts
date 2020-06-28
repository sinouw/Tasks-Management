import { Controller, Request, UseGuards, Post, Get, Delete , Put, Body, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { MyAuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './jwt/roles.decorator';
import { CreateUserDto } from 'src/models/user.model';

@Controller('auth')
@Controller()
export class authController {
  constructor(
    private readonly authService: AuthService,
    ) {}


  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user._doc);
  }

  @Post('register')
  async create(@Body() user :CreateUserDto) {
     return this.authService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profil')
  getProfile(@Request() req) {
    return req.user;
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get('getFullProfil')
  getFullProfile(@Request() req) {
    return this.authService.getFullProfil(req.user);
  }


  @UseGuards(MyAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('/gethello')
  async getHelloAdmin(@Request() req) : Promise<string>  {
     return this.authService.getHelloAdmin();
  }


}
