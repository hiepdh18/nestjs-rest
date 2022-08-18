// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { SESSION_USER } from 'common/constant/constants';
// import { BackendLogger } from 'common/logger/backend-logger';
// import { SessionMiddleware } from 'common/middleware/session.middleware';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthService } from './auth.service';
// import { IJwtPayload } from './interfaces/jwtPayload.interface';
// // import { JwtPayload, IJwtPayload } from './interfaces/jwtPayload.interface';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   private readonly logger = new BackendLogger(JwtStrategy.name);

//   constructor(private readonly authService: AuthService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.APP_KEY,
//     });
//   }

//   async validate(payload: IJwtPayload) {
//     const user = await this.authService.validateUser(payload);
//     if (!user) {
//       this.logger.debug(`Invalid/expired payload: ${JSON.stringify(payload)}`);
//       throw new UnauthorizedException();
//     }
//     SessionMiddleware.set(SESSION_USER, user);
//     return user;
//   }
// }
