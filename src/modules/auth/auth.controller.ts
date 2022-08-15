import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BackendLogger } from 'common/logger/backend-logger';
import { AuthService } from './auth.service';
import { TokenDTO } from './dtos/token.dto';

@Controller('api/auth')
export class AuthController {
  private readonly logger = new BackendLogger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(): Promise<TokenDTO> {
    return this.authService.login('hiepdh@owle.com', '123456aA@');
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/test')
  test(): Promise<TokenDTO> {
    return this.authService.login('hiepdh@owle.com', '123456aA@');
  }
}
