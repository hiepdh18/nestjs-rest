import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BackendLogger } from 'common/logger/backend-logger';
import { expressJwtSecret, GetVerificationKey } from 'jwks-rsa';
import { promisify } from 'util';
import { expressjwt } from 'express-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new BackendLogger(AuthGuard.name);
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);
    const checkJwt = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
        }) as GetVerificationKey,
        audience: process.env.AUTH0_AUDIENCE,
        algorithms: ['RS256'],
      }),
    );
    try {
      await checkJwt(req, res);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
