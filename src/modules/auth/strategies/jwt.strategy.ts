import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './../interfaces/jwtPayload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BackendLogger } from 'common/logger/backend-logger';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new BackendLogger(JwtStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      this.logger.debug(`Invalid/expired payload: ${JSON.stringify(payload)}`);
      throw new UnauthorizedException();
    }
    return user;
  }
}
