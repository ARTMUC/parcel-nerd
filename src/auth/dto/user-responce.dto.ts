import { ApiProperty } from '@nestjs/swagger';

export class UserResponce {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
}
