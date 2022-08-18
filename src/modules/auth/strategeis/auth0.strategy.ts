import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BackendLogger } from 'common/logger/backend-logger';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from './../interfaces/jwtPayload.interface';

// import { JwtPayload, IJwtPayload } from './interfaces/jwtPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new BackendLogger(JwtStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    });
  }

  validate(payload: JwtPayload): unknown {
    // const user = this.authService.validateUser(payload);
    // if (!user) {
    //   this.logger.debug(`Invalid/expired payload: ${JSON.stringify(payload)}`);
    //   throw new UnauthorizedException();
    // }
    // return user;
    return payload;
  }
}
