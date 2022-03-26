import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOwnerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  streetName?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  homeNumber?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postalCode?: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  parcels?: string[];
}
