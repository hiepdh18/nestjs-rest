import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { JwtStrategy } from './strategies/auth0.strategy';
import { buildOpenIdClient, OidcStrategy } from './strategies/oidc.strategy';

const OidcStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async (authService: AuthService) => {
    const client = await buildOpenIdClient();
    const strategy = new OidcStrategy(authService, client);
    return strategy;
  },
  inject: [AuthService],
};
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule.register({ session: true, defaultStrategy: 'oidc' }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, OidcStrategyFactory, SessionSerializer, AuthService],
  exports: [PassportModule],
})
export class AuthModule {}
