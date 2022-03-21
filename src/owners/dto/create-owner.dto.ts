import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOwnerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname: string;

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
  @IsString()
  @IsNotEmpty()
  projectId?: string;
}
