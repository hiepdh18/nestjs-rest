import { Controller, Get, Post } from '@nestjs/common';
import { BackendLogger } from 'common/logger/backend-logger';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  private readonly logger = new BackendLogger(AuthController.name);
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(): any {
    this.authService.login('hiepdh@owle.com', '123456aA@');
  }
}
