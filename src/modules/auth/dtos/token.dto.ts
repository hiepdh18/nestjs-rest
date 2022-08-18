import { DTOMapper, MapFrom } from './../../../common/base/BaseDtoMapper';
export class TokenDTO extends DTOMapper {
  @MapFrom()
  access_token: string;

  @MapFrom()
  scope?: string;

  @MapFrom()
  expires_in?: number;

  @MapFrom()
  token_type?: string;

  @MapFrom()
  refresh_token?: string;
}
