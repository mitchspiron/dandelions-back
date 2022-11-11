import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  Req,
} from '@nestjs/common';
import { Public } from '../common/decorators';
import { AuthUserService } from './auth-user.service';
import {
  AuthUserDtoSignin,
  AuthUserDtoSignup,
  forgotPasswordDto,
  resetPasswordDto,
} from './dto';
import { User, UserToken } from './types';

@Controller('auth-user')
export class AuthUserController {
  constructor(private authService: AuthUserService) {}

  @Public()
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: AuthUserDtoSignup) {
    return this.authService.signup(dto);
  }

  @Public()
  @Get('/signup/confirm/:token')
  @HttpCode(HttpStatus.CREATED)
  confirm(@Param('token') token, @Res() res, @Req() req): Promise<User> {
    return this.authService.confirm(token, res, req);
  }

  @Public()
  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(
    @Body() dto: AuthUserDtoSignin,
    @Res({ passthrough: true }) res,
  ): Promise<UserToken> {
    return this.authService.signin(dto, res);
  }

  @Public()
  @Get('/verify')
  @HttpCode(HttpStatus.OK)
  isLoggedIn(@Req() req): Promise<any> {
    return this.authService.isLoggedIn(req);
  }

  @Public()
  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() dto: forgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Post('/reset-password/:token')
  @HttpCode(HttpStatus.CREATED)
  resetPassword(
    @Body() dto: resetPasswordDto,
    @Param('token') token,
    @Res() res,
  ): Promise<User> {
    return this.authService.resetPassword(dto, token, res);
  }
}
