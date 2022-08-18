import { BackendLogger } from 'common/logger/backend-logger';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  Client,
  UserinfoResponse,
  TokenSet,
  Issuer,
} from 'openid-client';
import { AuthService } from '../auth.service';

export const buildOpenIdClient = async () => {
  const trustIssuer = await Issuer.discover(
    `${process.env.AUTH0_DOMAIN}/.well-known/openid-configuration`,
  );
  const client = new trustIssuer.Client({
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
  });
  return client;
};

export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  private readonly logger = new BackendLogger(OidcStrategy.name);
  client: Client;

  constructor(private readonly authService: AuthService, client: Client) {
    super({
      client: client,
      params: {
        redirect_uri: process.env.AUTH0_REDIRECT_URI,
        scope: process.env.AUTH0_SCOPE,
      },
      passReqToCallback: false,
      usePKCE: false,
    });

    this.client = client;
  }

  async validate(tokenSet: TokenSet): Promise<any> {
    const userinfo: UserinfoResponse = await this.client.userinfo(tokenSet);
    try {
      const id_token = tokenSet.id_token;
      const access_token = tokenSet.access_token;
      const refresh_token = tokenSet.refresh_token;
      const user = {
        id_token,
        access_token,
        refresh_token,
        userinfo,
      };
      this.logger.log(JSON.stringify(user));
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
