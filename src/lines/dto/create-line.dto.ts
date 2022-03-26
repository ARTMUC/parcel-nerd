import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateLineCoordsDto } from './create-lineCoords.dto';

export class CreateLineDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  lineCoords: CreateLineCoordsDto[];
}
