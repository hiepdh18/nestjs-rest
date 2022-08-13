import { ApiProperty } from '@nestjs/swagger';
import { DTOMapper, MapFrom } from '../../../common/base/BaseDtoMapper';

export class CreateUserDto extends DTOMapper {
  @ApiProperty()
  @MapFrom((data) => data.email.email)
  email: string;

  @ApiProperty()
  @MapFrom()
  password: string;

  @ApiProperty({ required: false })
  @MapFrom()
  name: string;
}
