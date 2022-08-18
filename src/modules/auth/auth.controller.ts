import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BackendLogger } from 'common/logger/backend-logger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { TokenDTO } from './dtos/token.dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

@Controller('/api/auth')
export class AuthController {
  private readonly logger = new BackendLogger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LoginGuard)
  @Get('/oidc-login')
  OIDCLogin() {
    this.logger.log(`User login successful`);
  }

  @Post('/password-login')
  passwordLogin(@Body() body): Promise<TokenDTO> {
    console.log(`🔥🔥🔥 => AuthController => passwordLogin => req`, body);
    return this.authService.passwordLogin(body.email, body.password);
  }

  @Get('/user')
  user(@Request() req) {
    return req.user;
  }

  @UseGuards(LoginGuard)
  @Get('/callback')
  loginCallback(@Res() res: Response) {
    res.redirect('/');
  }

  @UseGuards(AuthGuard)
  @Post('/test')
  test(): any {
    return { status: 'success' };
  }
}
