import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BackendLogger } from 'common/logger/backend-logger';
import { User } from 'modules/user/entities/user.entity';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  private readonly logger = new BackendLogger(RoleGuard.name);
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const hasRole = () =>
      user.roles.some(
        (role) =>
          !!roles.find(
            (item) =>
              item.toLowerCase() === role.name.toLowerCase() && role.enabled,
          ),
      );
    return user && user.roles && hasRole();
  }
}
