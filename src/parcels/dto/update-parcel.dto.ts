import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateParcelDto {
  @ApiProperty()
  @IsString()
  voivodeship: string;

  @ApiProperty()
  @IsString()
  county: string;

  @ApiProperty()
  @IsString()
  commune: string;

  @ApiProperty()
  @IsString()
  KW?: string;

  @ApiProperty()
  @IsString()
  class?: string;
}
