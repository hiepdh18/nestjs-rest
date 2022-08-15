import { TokenDTO } from './dtos/token.dto';
import { BackendLogger } from './../../common/logger/backend-logger';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly logger = new BackendLogger(AuthService.name);

  login = async (email: string, password: string) => {
    const options = {
      grant_type: 'password',
      username: email,
      password: password,
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
    };
    console.log(process.env.AUTH0_DOMAIN);
    const { data } = await axios.post(
      `${process.env.AUTH0_DOMAIN}oauth/token`,
      options,
    );
    this.logger.log(`token: ${data.access_token}`);
    return new TokenDTO(data);
  };
}
