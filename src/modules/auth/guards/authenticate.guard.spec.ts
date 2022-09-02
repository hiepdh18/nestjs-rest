import { AuthGuard } from './auth0.guard';

describe('AuthenticateGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
