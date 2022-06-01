import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusName } from './create-parcel.dto';

export class UpdateParcelDto {
  @ApiProperty()
  @IsString()
  KW?: string;

  @ApiProperty()
  @IsString()
  class?: string;

  @ApiProperty()
  @IsEnum({ type: StatusName })
  statusName: StatusName;
}
