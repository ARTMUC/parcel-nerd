import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StatusName } from './create-parcel.dto';

export class UpdateParcelDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  KW?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  class?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(StatusName)
  statusName?: StatusName;
}
