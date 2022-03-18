import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateParcelDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  voivodeship: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  county: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  commune: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  KW?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  class?: string;
}
