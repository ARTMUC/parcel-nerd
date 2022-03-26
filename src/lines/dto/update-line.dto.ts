import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateLineDto } from './create-line.dto';
import { CreateLineCoordsDto } from './create-lineCoords.dto';

export class UpdateLineDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty()
  @IsNotEmpty()
  lineCoords?: CreateLineCoordsDto[];
}
