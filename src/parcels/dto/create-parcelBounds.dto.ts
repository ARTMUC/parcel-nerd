import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateParcelBoundsDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  x: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  y: number;
}
