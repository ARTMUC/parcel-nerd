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
  Param
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './interfaces/request-with-user.interface';
import { LocalAuthenticationGuard } from './guards/local-auth.guard';
import { RequestHandler, Response } from 'express';
import JwtAuthenticationGuard from './guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { ApiBody, ApiCreatedResponse, ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import LoginDto from './dto/login.dto';
import { UserResponce } from './dto/user-responce.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticationService: AuthService, private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: UserResponce })
  @Post('signup')
  async register(@Body() registrationData: RegisterDto) {
    const { id, name, email } = await this.authenticationService.signup(registrationData);
    return { id, name, email } as UserResponce;
  }
  @ApiOkResponse()
  @Get('confirm-email/:token/:id')
  async confirmEmail(@Param('token') token: string, @Param('id') id: string) {
    return this.authenticationService.confirmUserEmailWithToken(id, token);
  }

  @ApiOkResponse({ type: UserResponce })
  @ApiBody({ type: LoginDto })
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('signin')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const { id, name, email } = user;
    const jwtCookie = this.authenticationService.createToken(id);

    request.res.setHeader('Set-Cookie', [jwtCookie]);
    return { id, name, email } as UserResponce;
  }
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('signout')
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return 'you are logged out';
  }

  @ApiOkResponse({ type: UserResponce })
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    const { id, name, email } = user;
    return { id, name, email } as UserResponce;
  }
}
