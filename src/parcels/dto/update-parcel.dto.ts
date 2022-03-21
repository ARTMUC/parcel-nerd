import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateParcelDto {
  @ApiProperty()
  @IsString()
  KW?: string;

  @ApiProperty()
  @IsString()
  class?: string;
}
