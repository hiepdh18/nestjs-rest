import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BackendLogger } from 'common/logger/backend-logger';
import { Response } from 'express';
import { Issuer } from 'openid-client';
import { AuthService } from './auth.service';
import { TokenDTO } from './dtos/token.dto';
// import { AuthenticatedGuard } from './guards/auth0.guard';
import { LoginGuard } from './guards/login.guard';

@Controller()
export class AuthController {
  private readonly logger = new BackendLogger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LoginGuard)
  @Get('/oidc-login')
  OIDCLogin() {
    this.logger.log(`User login successful`);
  }

  @UseGuards(LoginGuard)
  @Get('/callback')
  loginCallback(@Res() res: Response) {
    res.redirect('/');
  }

  @Post('/password-login')
  passwordLogin(@Body() body): Promise<TokenDTO> {
    return this.authService.passwordLogin(body.email, body.password);
  }

  @Get('/user')
  user(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/cats')
  test(): any {
    return { status: 'success' };
  }

  @Get('/logout')
  async logout(@Request() req, @Res() res: Response) {
    const id_token = req.user ? req.user.id_token : undefined;
    req.logout(() => console.log('done'));
    req.session.destroy(async (error: any) => {
      const TrustIssuer = await Issuer.discover(
        `${process.env.AUTH0_DOMAIN}/.well-known/openid-configuration`,
      );
      const end_session_endpoint = TrustIssuer.metadata.end_session_endpoint;
      if (end_session_endpoint) {
        res.redirect(
          end_session_endpoint +
            '?post_logout_redirect_uri=' +
            process.env.AUTH0_REDIRECT_LOGOUT_URI +
            (id_token ? '&id_token_hint=' + id_token : ''),
        );
      } else {
        res.redirect('/');
      }
    });
  }
}
