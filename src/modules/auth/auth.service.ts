import { TokenDTO } from './dtos/token.dto';
import { BackendLogger } from './../../common/logger/backend-logger';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { UserService } from 'modules/user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new BackendLogger(AuthService.name);

  constructor(private readonly userService: UserService) {}

  passwordLogin = async (email: string, password: string) => {
    const options = {
      grant_type: 'password',
      username: email,
      password: password,
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'offline_access',
    };
    const { data } = await axios.post(
      `${process.env.AUTH0_DOMAIN}/oauth/token`,
      options,
    );
    this.logger.log(`token: ${data.access_token}`);
    return new TokenDTO(data);
  };

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.userService.findOneUser({
      email: payload.email.toLowerCase(),
    });
    if (!user) {
      throw new UnprocessableEntityException('Invalid token');
    }
    return user;
  }
}
