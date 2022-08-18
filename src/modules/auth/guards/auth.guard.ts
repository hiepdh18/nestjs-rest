import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BackendLogger } from 'common/logger/backend-logger';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
import { expressjwt } from 'express-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new BackendLogger(AuthGuard.name);
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const checkJwt = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
        }),
        audience: process.env.AUTH0_AUDIENCE,
        // issuer: process.env.AUTH0_REDIRECT_URI + '/.well-known/jwks.json',
        algorithms: ['RS256'],
      }),
    );
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    this.logger.debug(`REST ${req.method}, Path: ${req.path}`);
    try {
      await checkJwt(req, res);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
