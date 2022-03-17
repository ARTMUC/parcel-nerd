import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
  Res,
  ClassSerializerInterceptor,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './interfaces/request-with-user.interface';
import { LocalAuthenticationGuard } from './guards/local-auth.guard';
import { RequestHandler, Response } from 'express';
import JwtAuthenticationGuard from './guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { ApiBody } from '@nestjs/swagger';
import LoginDto from './dto/login.dto';

@Controller('auth')
// @UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authenticationService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.signup(registrationData);
  }

  @Get('confirm-email/:token/:id')
  async confirmEmail(@Param('token') token: string, @Param('id') id: string) {
    return this.authenticationService.confirmUserEmailWithToken(id, token);
  }
  @ApiBody({ type: LoginDto })
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('signin')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const jwtCookie = this.authenticationService.createToken(user.id);

    request.res.setHeader('Set-Cookie', [jwtCookie]);
    return user;
  }
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('signout')
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return 'you are logged out';
  }
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }
}
